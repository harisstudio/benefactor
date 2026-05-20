import { Hono } from 'hono';
import Stripe from 'stripe';
import { getAuth } from '../auth';

const donationsRouter = new Hono<{ Bindings: { STRIPE_SECRET_KEY: string; HYPERDRIVE: { connectionString: string }; BETTER_AUTH_SECRET?: string } }>();

donationsRouter.post('/create-intent', async (c) => {
  const body = await c.req.json();
  const { amount, currency, campaignId, message } = body;
  const allowedCurrencies = new Set(['eur', 'gbp', 'usd']);
  const paymentCurrency = allowedCurrencies.has((currency || '').toLowerCase())
    ? (currency as string).toLowerCase()
    : 'eur';

  if (!amount || !campaignId) {
    return c.json({ error: 'Missing amount or campaignId' }, 400);
  }

  const url = new URL(c.req.url);
  const baseURL = `${url.protocol}//${url.host}/api/auth`;
  const auth = getAuth(c.env.HYPERDRIVE.connectionString, baseURL, c.env.BETTER_AUTH_SECRET || "fallback-secret-benefactor-team-auth-2024");
  
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  
  if (!c.env.STRIPE_SECRET_KEY) {
    return c.json({ error: 'Server configuration error: STRIPE_SECRET_KEY is missing' }, 500);
  }

  try {
    const stripe = new Stripe(c.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-04-22.dahlia' as any,
    });

    // Let Stripe auto-surface every payment method enabled on the account
    // (cards, Apple Pay, Google Pay, Revolut Pay, etc.) instead of hardcoding
    // a list. Enable/disable individual methods from the Stripe Dashboard.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: paymentCurrency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        campaignId,
        donorId: session?.user?.id || 'anonymous',
        message: message || '',
      },
    });

    return c.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * Lightweight read-only feed of recent successful donations pulled straight
 * from Stripe (live mode). Lets the campaign sidebar / mobile recent-donors
 * list show real activity until the webhook → DB pipeline lands.
 *
 * Stripe charge fees: a tiny 'Powered by Stripe' attribution under the
 * payment form already covers PCI / regulatory acknowledgement.
 */
donationsRouter.get('/recent', async (c) => {
  if (!c.env.STRIPE_SECRET_KEY) {
    return c.json({ donations: [] });
  }

  try {
    const stripe = new Stripe(c.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-04-22.dahlia' as any,
    });

    // Pull recent charges (succeeded only). 25 is enough to fill the sidebar
    // ticker; the frontend trims further.
    const charges = await stripe.charges.list({ limit: 25 });

    const donations = charges.data
      .filter((ch) => ch.status === 'succeeded' && !ch.refunded)
      .map((ch) => {
        const billing = ch.billing_details;
        const rawName = billing?.name?.trim();
        const fallback = billing?.email?.split('@')[0];
        const name = rawName || fallback || 'Anonymous';
        return {
          id: ch.id,
          name,
          amount: ch.amount / 100,
          currency: ch.currency.toUpperCase(),
          createdAt: ch.created * 1000,
          isAnonymous: !rawName,
          message: ch.metadata?.message || undefined,
        };
      });

    return c.json({ donations });
  } catch (error: any) {
    console.error('Stripe recent donations error:', error);
    return c.json({ donations: [], error: error.message }, 200);
  }
});

export default donationsRouter;
