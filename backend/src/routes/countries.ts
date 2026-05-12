import { Hono } from 'hono';
import { getDb } from '../db';
import { countries } from '../db/schema';

const countriesRouter = new Hono<{ Bindings: { HYPERDRIVE: { connectionString: string } } }>();

countriesRouter.get('/', async (c) => {
  const db = getDb(c.env.HYPERDRIVE.connectionString);
  const allCountries = await db.select().from(countries);
  return c.json(allCountries);
});

export default countriesRouter;
