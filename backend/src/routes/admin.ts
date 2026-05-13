import { Hono } from 'hono';
import { getAuth } from '../auth';
import { getDb } from '../db';
import { users, campaigns } from '../db/schema';
import { eq, desc } from 'drizzle-orm';

const adminRouter = new Hono<{ Bindings: { HYPERDRIVE: { connectionString: string }; BETTER_AUTH_SECRET?: string } }>();

adminRouter.use('*', async (c, next) => {
  const url = new URL(c.req.url);
  const baseURL = `${url.protocol}//${url.host}/api/auth`;
  const auth = getAuth(c.env.HYPERDRIVE.connectionString, baseURL, c.env.BETTER_AUTH_SECRET || "fallback-secret-benefactor-team-auth-2024");
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) return c.json({ error: 'Unauthorized' }, 401);

  const db = getDb(c.env.HYPERDRIVE.connectionString);
  const result = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);
  const dbUser = result[0];

  if (!dbUser || dbUser.role !== 'admin') {
    return c.json({ error: 'Forbidden: Admin access required' }, 403);
  }

  await next();
});

adminRouter.get('/users', async (c) => {
  const db = getDb(c.env.HYPERDRIVE.connectionString);
  const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));
  return c.json(allUsers);
});

adminRouter.post('/campaigns', async (c) => {
  const db = getDb(c.env.HYPERDRIVE.connectionString);
  const body = await c.req.json();

  const newCampaign = await db.insert(campaigns)
    .values({
      title: body.title,
      description: body.description,
      goalAmount: body.goalAmount,
      categoryId: body.categoryId,
      beneficiaryId: body.beneficiaryId,
      countryCode: body.countryCode,
      imageUrl: body.imageUrl,
      status: body.status || 'active',
    })
    .returning();

  return c.json(newCampaign[0]);
});

export default adminRouter;
