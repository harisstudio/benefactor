import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "./db";
import * as schema from "./db/schema";

const toHex = (arr: Uint8Array) =>
  Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');

const fromHex = (hex: string) =>
  new Uint8Array(hex.match(/.{2}/g)!.map(b => parseInt(b, 16)));

// Uses globalThis.crypto.subtle (Web Crypto) which runs natively off-thread in Cloudflare
// Workers and does NOT count toward the 10ms CPU time limit.
const hashPassword = async (password: string): Promise<string> => {
  const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
  const key = await globalThis.crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']
  );
  const bits = await globalThis.crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 100000 }, key, 256
  );
  return `pbkdf2:${toHex(salt)}:${toHex(new Uint8Array(bits))}`;
};

const verifyPassword = async ({ hash: stored, password }: { hash: string; password: string }): Promise<boolean> => {
  if (!stored.startsWith('pbkdf2:')) return false;
  const [, saltHex, hashHex] = stored.split(':');
  const salt = fromHex(saltHex);
  const expected = fromHex(hashHex);
  const key = await globalThis.crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']
  );
  const bits = await globalThis.crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 100000 }, key, 256
  );
  const derived = new Uint8Array(bits);
  let diff = 0;
  for (let i = 0; i < derived.length; i++) diff |= derived[i] ^ expected[i];
  return diff === 0;
};

interface AuthOptions {
  googleClientId?: string;
  googleClientSecret?: string;
}

export const getAuth = (
  databaseUrl: string,
  baseURL: string = "https://api.benefactorteam.com/api/auth",
  secret: string = "fallback-secret-benefactor-team-auth-2024",
  options: AuthOptions = {},
) => {
  const db = getDb(databaseUrl);
  const socialProviders =
    options.googleClientId && options.googleClientSecret
      ? {
          google: {
            clientId: options.googleClientId,
            clientSecret: options.googleClientSecret,
          },
        }
      : undefined;

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
      enabled: true,
      password: {
        hash: hashPassword,
        verify: verifyPassword,
      }
    },
    socialProviders,
    trustedOrigins: [
      "https://benefactorteam.com",
      "https://api.benefactorteam.com",
      "https://benefactor-ui.pages.dev"
    ],
    user: {
      additionalFields: {
        role: { type: "string", defaultValue: "user" },
        status: { type: "string", defaultValue: "active" }
      }
    }
  });
};
