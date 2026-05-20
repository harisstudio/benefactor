-- Benefactor initial schema + seed
-- Run this once in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- It is idempotent: CREATE TABLE IF NOT EXISTS + INSERT ... ON CONFLICT.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Auth tables (Better Auth) ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "user" (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  "emailVerified" boolean NOT NULL,
  image text,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  role varchar(50) NOT NULL DEFAULT 'user',
  status varchar(50) NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS "session" (
  id text PRIMARY KEY,
  "expiresAt" timestamp NOT NULL,
  token text NOT NULL UNIQUE,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  "ipAddress" text,
  "userAgent" text,
  "userId" text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "account" (
  id text PRIMARY KEY,
  "accountId" text NOT NULL,
  "providerId" text NOT NULL,
  "userId" text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamp,
  "refreshTokenExpiresAt" timestamp,
  scope text,
  password text,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "verification" (
  id text PRIMARY KEY,
  identifier text NOT NULL,
  value text NOT NULL,
  "expiresAt" timestamp NOT NULL,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

-- ─── Domain tables ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(100) NOT NULL,
  slug varchar(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS countries (
  code varchar(2) PRIMARY KEY,
  name varchar(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  description text NOT NULL,
  goal_amount decimal(12, 2) NOT NULL,
  current_amount decimal(12, 2) NOT NULL DEFAULT 0,
  status varchar(50) NOT NULL DEFAULT 'active',
  category_id uuid REFERENCES categories(id),
  country_code varchar(2) REFERENCES countries(code),
  beneficiary_id text REFERENCES "user"(id),
  image_url text,
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id),
  donor_id text REFERENCES "user"(id),
  amount decimal(12, 2) NOT NULL,
  currency varchar(3) NOT NULL DEFAULT 'USD',
  stripe_transaction_id varchar(255) UNIQUE,
  status varchar(50) NOT NULL DEFAULT 'pending',
  message text,
  created_at timestamp DEFAULT NOW()
);

-- ─── Seed: the live "House reconstruction" campaign ────────────────────────
INSERT INTO categories (slug, name) VALUES
  ('family', 'Family'),
  ('medical', 'Medical'),
  ('emergency', 'Emergency'),
  ('education', 'Education'),
  ('animals', 'Animals')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO countries (code, name) VALUES
  ('LT', 'Lithuania'),
  ('GB', 'United Kingdom'),
  ('US', 'United States')
ON CONFLICT (code) DO NOTHING;

-- Fixed UUID so the frontend can address this campaign at /campaigns/:uuid
-- and the create-intent default works.
INSERT INTO campaigns (id, title, description, goal_amount, current_amount, status, country_code)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'House reconstruction',
  'Winter is approaching in Lithuania, and for one family the cold brings fear instead of comfort. Help fund critical structural repairs and insulation so they can stay safe and warm through the season.',
  26000,
  13762,
  'active',
  'LT'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  goal_amount = EXCLUDED.goal_amount;
