# `.well-known/` — Stripe wallet verification

Files in this folder are served as-is by Next.js at the website root:

```
https://YOUR_DOMAIN/.well-known/<filename>
```

Stripe (and Apple) require certain files to live at fixed paths under
`/.well-known/` so they can verify that we own the domain before turning on
wallet payments.

---

## 1. Current status of wallets in this project

Stripe is already installed and wired up (`@stripe/react-stripe-js`,
`@stripe/stripe-js`). The donate form uses Stripe's `PaymentElement` in
`layout: "tabs"` mode, which **automatically** surfaces the right wallet
button for the visitor:

| Wallet      | Shown when                                                                 |
|-------------|----------------------------------------------------------------------------|
| Apple Pay   | Visitor is on Safari (macOS/iOS) **AND** the domain has been verified (see below) |
| Google Pay  | Visitor is on Chrome with a saved card **AND** Google Pay is enabled in Stripe Dashboard |
| Card        | Always — fallback                                                          |
| PayPal      | Always — handled by a separate PayPal tile (not Stripe)                    |

You do **not** need to write JS for `paymentRequest` / `PaymentRequestButton`
manually — `PaymentElement` does it for you. The publishable key is loaded
from `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (see `.env.local`).

---

## 2. Enabling Apple Pay on your production domain

Apple Pay requires Stripe to prove we own the domain. This is a one-time
setup per domain.

### Steps

1. Go to <https://dashboard.stripe.com/settings/payment_methods>.
2. Make sure **Apple Pay** is toggled on under "Wallets".
3. Click **Apple Pay → Web domains → Add a new domain**.
4. Enter the production domain (e.g. `benefactor.com`).
5. Stripe will give you a file called
   `apple-developer-merchantid-domain-association` (no extension).
   **Download it.**
6. Replace the contents of
   [`apple-developer-merchantid-domain-association`](./apple-developer-merchantid-domain-association)
   in this folder with the **raw blob** Stripe gave you — strip out the
   placeholder comments, keep only the token. Commit and deploy.
7. Back in the Stripe dashboard, click **Verify**. Stripe will fetch
   `https://YOUR_DOMAIN/.well-known/apple-developer-merchantid-domain-association`
   over HTTPS. Once it returns 200 with the matching content, the domain
   turns green.

After verification, Apple Pay will appear automatically inside the
`PaymentElement` on Safari and iOS — no code changes needed.

### Gotchas

- The file **must** be served as plain text with HTTP 200 over **HTTPS**.
  Next.js serves `public/.well-known/*` correctly out of the box.
- Apple Pay will **not** appear on `http://localhost`. Test on a real
  HTTPS deployment (e.g. a Vercel preview URL — but you'd have to verify
  that preview domain too, which usually isn't worth it; verify the
  production domain and test there).
- If the file 404s in the browser, check that there is no trailing dot in
  the filename and that no `next.config` rule is blocking dotfile folders.

---

## 3. Enabling Google Pay

Google Pay needs **no domain verification file** — but it must be enabled
in the Stripe Dashboard.

### Steps

1. Go to <https://dashboard.stripe.com/settings/payment_methods>.
2. Toggle **Google Pay** on under "Wallets".
3. That's it. The button will start appearing in `PaymentElement` for
   visitors using:
   - Chrome on Android with a saved card, or
   - Chrome desktop with a saved card in their Google account.

There is nothing else to deploy.

---

## 4. Local & production testing checklist

### Localhost

- Apple Pay: ❌ Will not appear (HTTPS required).
- Google Pay: ⚠️ Will only appear in Chrome with a Google account that
  has a real saved card. In most local-dev setups you'll see the **Card**
  tab only — that's expected.
- PayPal: ✅ Tile is always visible regardless of environment.
- Card: ✅ Use Stripe test cards (`4242 4242 4242 4242`, any future date,
  any CVC, any postcode).

### Production (after Apple Pay domain verification)

1. Open the donate page in **Safari on macOS or iOS** → Apple Pay button
   should be the top tab inside the Stripe PaymentElement.
2. Open the donate page in **Chrome with a saved card** → Google Pay
   button should appear inside the Stripe PaymentElement.
3. Open in Firefox / Chrome without saved cards → only the card form
   should appear. This is correct.
4. Make a small real or test-mode donation through each tile and confirm
   the payment shows up in the Stripe Dashboard with the correct
   `payment_method_type` (`card`, `apple_pay`, `google_pay`).

### Required env vars

```bash
# .env.local — set these for the donate flow to work
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_or_test_...
NEXT_PUBLIC_API_URL=https://api.your-backend.com   # Worker URL that exposes /donations/create-intent
```

The publishable key is read in `src/lib/stripe.ts` (`getStripe()`). The
backend Worker creates the PaymentIntent in
`src/lib/api.ts` (`createPaymentIntent()`).

---

## 5. Files in this folder

| File | Purpose |
|------|---------|
| `apple-developer-merchantid-domain-association` | Stripe-issued blob proving we own this domain for Apple Pay. Replace its contents per the steps in section 2. |
| `README.md` | This file. |
