import { Hono } from 'hono';
import Stripe from 'stripe';
import { getDb } from '../db';
import { donations, campaigns } from '../db/schema';
import { eq, sql } from 'drizzle-orm';

const webhooksRouter = new Hono<{ Bindings: { STRIPE_SECRET_KEY: string; STRIPE_WEBHOOK_SECRET: string; DATABASE_URL: string } }>();

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

  const db = getDb(c.env.DATABASE_URL);

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const { campaignId, donorId, message } = paymentIntent.metadata;

    if (campaignId) {
      const existing = await db.query.donations.findFirst({
        where: eq(donations.stripeTransactionId, paymentIntent.id)
      });

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
  }

  return c.json({ received: true });
});

export default webhooksRouter;
