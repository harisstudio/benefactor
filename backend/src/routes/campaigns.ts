import { Hono } from 'hono';
import { getDb } from '../db';
import { campaigns, users, donations } from '../db/schema';
import { eq, desc } from 'drizzle-orm';

const campaignsRouter = new Hono<{ Bindings: { HYPERDRIVE: { connectionString: string } } }>();

campaignsRouter.get('/', async (c) => {
  const db = getDb(c.env.HYPERDRIVE.connectionString);
  const allCampaigns = await db.select().from(campaigns)
    .where(eq(campaigns.status, 'active'))
    .orderBy(desc(campaigns.createdAt));
  return c.json(allCampaigns);
});

campaignsRouter.get('/:id', async (c) => {
  const db = getDb(c.env.HYPERDRIVE.connectionString);
  const id = c.req.param('id');
  const result = await db.select().from(campaigns).where(eq(campaigns.id, id)).limit(1);
  if (!result.length) return c.json({ error: 'Campaign not found' }, 404);
  return c.json(result[0]);
});

campaignsRouter.get('/:id/donors', async (c) => {
  const db = getDb(c.env.HYPERDRIVE.connectionString);
  const id = c.req.param('id');
  
  const campaignDonations = await db.select({
    id: donations.id,
    amount: donations.amount,
    message: donations.message,
    createdAt: donations.createdAt,
    donorName: users.name,
    donorImage: users.image,
  })
  .from(donations)
  .leftJoin(users, eq(donations.donorId, users.id))
  .where(eq(donations.campaignId, id))
  .orderBy(desc(donations.createdAt));

  return c.json(campaignDonations);
});

export default campaignsRouter;
