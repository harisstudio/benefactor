import { Hono } from 'hono';
import { getDb } from '../db';
import { categories } from '../db/schema';

const categoriesRouter = new Hono<{ Bindings: { DATABASE_URL: string } }>();

categoriesRouter.get('/', async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  const allCategories = await db.select().from(categories);
  return c.json(allCategories);
});

export default categoriesRouter;
