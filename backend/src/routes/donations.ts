import { Hono } from 'hono';
import Stripe from 'stripe';
import { getAuth } from '../auth';

const donationsRouter = new Hono<{ Bindings: { STRIPE_SECRET_KEY: string; DATABASE_URL: string; BETTER_AUTH_SECRET?: string } }>();

donationsRouter.post('/create-intent', async (c) => {
  const body = await c.req.json();
  const { amount, campaignId, message } = body;
  
  if (!amount || !campaignId) {
    return c.json({ error: 'Missing amount or campaignId' }, 400);
  }

  const url = new URL(c.req.url);
  const baseURL = `${url.protocol}//${url.host}/api/auth`;
  const auth = getAuth(c.env.DATABASE_URL, baseURL, c.env.BETTER_AUTH_SECRET || "fallback-secret-benefactor-team-auth-2024");
  
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  
  if (!c.env.STRIPE_SECRET_KEY) {
    return c.json({ error: 'Server configuration error: STRIPE_SECRET_KEY is missing' }, 500);
  }

  try {
    const stripe = new Stripe(c.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-04-22.dahlia' as any,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
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

export default donationsRouter;
