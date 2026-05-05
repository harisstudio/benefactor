import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const getDb = (databaseUrl: string) => {
  const queryClient = postgres(databaseUrl);
  return drizzle(queryClient, { schema });
};
