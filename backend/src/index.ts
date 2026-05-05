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

const app = new Hono();

app.use('*', cors());

app.get('/', (c) => {
  return c.text('Benefactor API is running');
});

// Mount auth routes
app.on(['POST', 'GET'], '/api/auth/**', (c) => {
  const auth = getAuth(c.env.DATABASE_URL);
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
