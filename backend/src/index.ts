import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { getAuth } from './auth';

import categoriesRouter from './routes/categories';
import countriesRouter from './routes/countries';
import campaignsRouter from './routes/campaigns';
import usersRouter from './routes/users';
import donationsRouter from './routes/donations';
import webhooksRouter from './routes/webhooks';
import adminRouter from './routes/admin';

const app = new Hono<{ Bindings: { DATABASE_URL: string; BETTER_AUTH_SECRET?: string } }>();

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

// Mount auth routes
app.on(['POST', 'GET'], '/api/auth/**', (c) => {
  const url = new URL(c.req.url);
  const baseURL = `${url.protocol}//${url.host}/api/auth`;
  const auth = getAuth(c.env.DATABASE_URL, baseURL, c.env.BETTER_AUTH_SECRET);
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
