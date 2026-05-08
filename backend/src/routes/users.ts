import { Hono } from 'hono';
import { getAuth } from '../auth';
import { getDb } from '../db';
import { users, campaigns } from '../db/schema';
import { eq } from 'drizzle-orm';

const usersRouter = new Hono<{ Bindings: { DATABASE_URL: string; BETTER_AUTH_SECRET?: string } }>();

usersRouter.get('/me', async (c) => {
  const url = new URL(c.req.url);
  const baseURL = `${url.protocol}//${url.host}/api/auth`;
  const auth = getAuth(c.env.DATABASE_URL, baseURL, c.env.BETTER_AUTH_SECRET);
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) return c.json({ error: 'Unauthorized' }, 401);
  return c.json(session.user);
});

usersRouter.get('/me/campaigns', async (c) => {
  const url = new URL(c.req.url);
  const baseURL = `${url.protocol}//${url.host}/api/auth`;
  const auth = getAuth(c.env.DATABASE_URL, baseURL, c.env.BETTER_AUTH_SECRET);
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) return c.json({ error: 'Unauthorized' }, 401);

  const db = getDb(c.env.DATABASE_URL);
  const userCampaigns = await db.query.campaigns.findMany({
    where: eq(campaigns.beneficiaryId, session.user.id),
  });
  return c.json(userCampaigns);
});

export default usersRouter;
