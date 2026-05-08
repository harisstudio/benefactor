import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "./db";
import * as schema from "./db/schema";

export const getAuth = (databaseUrl: string, baseURL: string = "https://api.benefactorteam.com/api/auth", secret: string = "fallback-secret-benefactor-team-auth-2024") => {
  const db = getDb(databaseUrl);
  return betterAuth({
    secret,
    baseURL,
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
    trustedOrigins: [
      "https://benefactorteam.com",
      "https://api.benefactorteam.com",
      "https://benefactor-ui.pages.dev"
    ],
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
