import { Hono } from 'hono';
import Stripe from 'stripe';
import { getAuth } from '../auth';

const donationsRouter = new Hono<{ Bindings: { STRIPE_SECRET_KEY: string; DATABASE_URL: string } }>();

donationsRouter.post('/create-intent', async (c) => {
  const body = await c.req.json();
  const { amount, campaignId, message } = body;
  
  if (!amount || !campaignId) {
    return c.json({ error: 'Missing amount or campaignId' }, 400);
  }

  const auth = getAuth(c.env.DATABASE_URL);
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-04-22.dahlia' as any,
  });

  try {
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
    return c.json({ error: error.message }, 500);
  }
});

export default donationsRouter;
