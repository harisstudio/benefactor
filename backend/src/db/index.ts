import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const getDb = (databaseUrl: string) => {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is missing. Check your Cloudflare Worker environment variables.");
  }
  const queryClient = postgres(databaseUrl, { prepare: false });
  return drizzle(queryClient, { schema });
};
