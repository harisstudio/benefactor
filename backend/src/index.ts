import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { getAuth } from './auth';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import categoriesRouter from './routes/categories';
import countriesRouter from './routes/countries';
import campaignsRouter from './routes/campaigns';
import usersRouter from './routes/users';
import donationsRouter from './routes/donations';
import webhooksRouter from './routes/webhooks';
import adminRouter from './routes/admin';

const app = new Hono<{ Bindings: { HYPERDRIVE: { connectionString: string }; BETTER_AUTH_SECRET?: string } }>();

app.onError((err, c) => {
  console.error('GLOBAL ERROR:', err);
  return c.json({ 
    success: false, 
    error: err.message, 
    stack: err.stack,
    cause: err.cause 
  }, 500);
});

app.use('*', cors({
  origin: (origin) => {
    // Allow any origin ending with benefactor-ui.pages.dev or exactly benefactorteam.com
    if (origin.endsWith('benefactor-ui.pages.dev') || origin === 'https://benefactorteam.com') {
      return origin;
    }
    return 'https://benefactorteam.com'; // Default
  },
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'x-better-auth-agent'],
  exposeHeaders: ['set-cookie'],
}));

app.get('/', (c) => {
  return c.text('Benefactor API is running');
});

import * as schema from './db/schema';

app.get('/api/test-db', async (c) => {
  try {
    const queryClient = postgres(c.env.HYPERDRIVE.connectionString, { prepare: false });
    const db = drizzle(queryClient, { schema });
    const result = await db.select().from(schema.users).limit(1);
    return c.json({ success: true, message: "Connected!" });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// Mount auth routes
app.on(['POST', 'GET'], '/api/auth/**', (c) => {
  const url = new URL(c.req.url);
  const baseURL = `${url.protocol}//${url.host}/api/auth`;
  const auth = getAuth(c.env.HYPERDRIVE.connectionString, baseURL, c.env.BETTER_AUTH_SECRET || "fallback-secret-benefactor-team-auth-2024");
  return auth.handler(c.req.raw);
});

// Mount routers
app.route('/api/categories', categoriesRouter);
app.route('/api/countries', countriesRouter);
app.route('/api/campaigns', campaignsRouter);
app.route('/api/users', usersRouter);
app.route('/api/donations', donationsRouter);
app.route('/api/webhooks', webhooksRouter);
app.route('/api/admin', adminRouter);

export default app;
