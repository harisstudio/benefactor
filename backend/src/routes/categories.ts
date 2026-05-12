import { Hono } from 'hono';
import { getDb } from '../db';
import { categories } from '../db/schema';

const categoriesRouter = new Hono<{ Bindings: { HYPERDRIVE: { connectionString: string } } }>();

categoriesRouter.get('/', async (c) => {
  const db = getDb(c.env.HYPERDRIVE.connectionString);
  const allCategories = await db.select().from(categories);
  return c.json(allCategories);
});

export default categoriesRouter;
