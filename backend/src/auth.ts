import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "./db";
import * as schema from "./db/schema";

export const getAuth = (databaseUrl: string) => {
  const db = getDb(databaseUrl);
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: {
        user: schema.users,
        session: schema.sessions,
        account: schema.accounts,
        verification: schema.verifications,
      }
    }),
    emailAndPassword: {
      enabled: true
    },
    user: {
      additionalFields: {
        role: {
          type: "string",
          defaultValue: "user"
        },
        status: {
          type: "string",
          defaultValue: "active"
        }
      }
    }
  });
};
