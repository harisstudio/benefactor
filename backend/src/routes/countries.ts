import { Hono } from 'hono';
import { getDb } from '../db';
import { countries } from '../db/schema';

const countriesRouter = new Hono<{ Bindings: { DATABASE_URL: string } }>();

countriesRouter.get('/', async (c) => {
  const db = getDb(c.env.DATABASE_URL);
  const allCountries = await db.select().from(countries);
  return c.json(allCountries);
});

export default countriesRouter;
