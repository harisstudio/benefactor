import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const getDb = (databaseUrl: string) => {
  const queryClient = postgres(databaseUrl, { prepare: false, ssl: 'require' });
  return drizzle(queryClient, { schema });
};
