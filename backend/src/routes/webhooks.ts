import { Hono } from 'hono';
import Stripe from 'stripe';
import { getDb } from '../db';
import { donations, campaigns } from '../db/schema';
import { eq, sql } from 'drizzle-orm';
import { sendDonationReceipt } from '../lib/brevo';

const webhooksRouter = new Hono<{ Bindings: { STRIPE_SECRET_KEY: string; STRIPE_WEBHOOK_SECRET: string; HYPERDRIVE: { connectionString: string }; BREVO_API_KEY?: string } }>();

webhooksRouter.post('/stripe', async (c) => {
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-04-22.dahlia' as any,
  });

  const sig = c.req.header('stripe-signature');
  if (!sig) return c.json({ error: 'Missing signature' }, 400);

  const body = await c.req.text();
  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(body, sig, c.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return c.json({ error: `Webhook Error: ${err.message}` }, 400);
  }

  const db = getDb(c.env.HYPERDRIVE.connectionString);

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const { campaignId, donorId, message } = paymentIntent.metadata;

    if (campaignId) {
      const existingResult = await db.select().from(donations).where(eq(donations.stripeTransactionId, paymentIntent.id)).limit(1);
      const existing = existingResult[0];

      if (!existing) {
        await db.insert(donations).values({
          campaignId,
          donorId: donorId === 'anonymous' ? null : donorId,
          amount: (paymentIntent.amount / 100).toString(),
          currency: paymentIntent.currency.toUpperCase(),
          stripeTransactionId: paymentIntent.id,
          status: 'completed',
          message,
        });

        await db.update(campaigns)
          .set({
            currentAmount: sql`${campaigns.currentAmount} + ${(paymentIntent.amount / 100).toString()}`
          })
          .where(eq(campaigns.id, campaignId));
      }
    }

    // Fire a thank-you receipt via Brevo. Pull the donor's email from the
    // charge's billing details so wallets (Apple Pay / Google Pay) work
    // without an extra email field. Errors here must not block the webhook
    // 200 response — Stripe would otherwise retry the whole event.
    if (c.env.BREVO_API_KEY) {
      try {
        const charges = await stripe.charges.list({ payment_intent: paymentIntent.id, limit: 1 });
        const charge = charges.data[0];
        // Prefer billing_details (wallet methods set it), fall back to the
        // email we captured at checkout via metadata, then receipt_email.
        const email = charge?.billing_details?.email
          || (paymentIntent.metadata?.donorEmail as string | undefined)
          || (paymentIntent.receipt_email as string | null | undefined);
        if (email) {
          await sendDonationReceipt({
            apiKey: c.env.BREVO_API_KEY,
            to: { email, name: charge.billing_details.name || undefined },
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
            paymentRef: paymentIntent.id,
          });
        }
      } catch (err) {
        console.error('Receipt email failed:', err);
      }
    }
  }

  return c.json({ received: true });
});

export default webhooksRouter;
