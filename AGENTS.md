# AGENTS.md — Benefactor Platform

## What is this project?

Benefactor is a worldwide fundraising platform (similar to GoFundMe). This is a **UI prototype** — the frontend shows the full user experience but has no real backend integration yet. Backend integration starts soon.

The frontend is a **multi-page vanilla JS app** built with Vite. There is no framework (no React, Vue, Angular). The backend is a minimal Express.js server with only a health check endpoint.

## Project structure

```
benefactor/
├── ui/                        # Vite multi-page app (ACTIVE WORKING DIRECTORY)
│   ├── index.html             # Homepage (hero, campaigns, fundraisers)
│   ├── donate.html            # Campaign donation detail page
│   ├── checkout.html          # Payment/checkout flow
│   ├── dashboard.html         # User dashboard
│   ├── start.html             # Create a campaign
│   ├── signin.html            # Authentication
│   ├── about-benefactor.html  # About page
│   ├── careers.html           # Careers page
│   ├── how-benefactor-works.html # How it works
│   ├── src/
│   │   ├── base.css           # Shared reset, CSS variables, typography, buttons
│   │   ├── style.css          # Main stylesheet (index + donate pages)
│   │   ├── nav.js             # Shared navbar logic (scroll effect + mobile menu)
│   │   ├── main.js            # index.html JS (imports nav.js + style.css)
│   │   ├── donate.js          # donate.html JS (imports nav.js + style.css)
│   │   ├── {page}.css         # Page-specific styles (signin, dashboard, checkout, start, about, careers, how)
│   │   └── {page}-entry.js    # Page entry points (import base.css + page.css)
│   ├── assets/                # SVGs for checkout/payment UI
│   ├── public/assets/         # Images, logos, icons (served as static)
│   ├── vite.config.js         # Multi-page input config
│   ├── package.json
│   └── (other config files)
├── frontend/                  # V2 READONLY DIRECTORY (To be removed after full 'ui' switch)
│   └── (Same structure as 'ui' directory, but do not edit here. Root design is here but live version is 'ui')
├── backend/
│   ├── server.js              # Express 5 — only /api/health exists
│   └── package.json
└── DOKPLOY.md                 # Deployment guide (Hostinger VPS + Cloudflare)
```

**❗️ IMPORTANT DIRECTORY RULE:**
- **`ui/` is the ACTIVE front-end directory.** The live version uses this content. **ALL edits and development should happen in `ui/`.**
- **`frontend/` is READONLY.** The root design resides here, but no edits should be made in this folder. Think of it as a reference. It will be removed in the future after the full transition to "ui".

## Tech stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| UI / Frontend | Vanilla JS + Vite 5 | No framework. Multi-page app with 9 HTML entry points |
| Styling | Custom CSS | CSS variables for design tokens. No Tailwind/SCSS |
| Fonts | DM Sans + Outfit | Loaded via Google Fonts in each HTML `<head>` |
| Backend | Express.js 5.2 | Minimal — only health check. Backend integration pending |
| Deployment | Dokploy on Hostinger VPS | Docker build (Nginx) for frontend |
| DNS/CDN | Cloudflare | A records, proxy enabled |
| Version control | GitHub | `git@github.com:harisstudio/benefactor.git` |

## Commands

```bash
# UI / Frontend
cd ui
npm install
npm run dev          # Vite dev server (localhost:5173)
npm run build        # Production build to dist/
npm run preview      # Preview production build
npm run deploy       # Build + deploy to GitHub Pages

# Backend
cd backend
npm install
npm run dev          # nodemon (localhost:3000)
npm start            # node server.js
```

**Node version**: Requires Node.js 20.19+ or 22.12+ (Vite 5 requirement).

## Architecture decisions

### CSS architecture
- **`base.css`** contains the shared design system: CSS variables, reset, typography, `.container`, `.btn` base. Every page imports it.
- **`style.css`** (~3000 lines) is the main stylesheet used by `index.html` and `donate.html`. It covers the navbar, hero, campaigns, fundraisers, footer, and all shared page components.
- **Page-specific CSS files** (`signin.css`, `dashboard.css`, etc.) were extracted from inline `<style>` blocks. Each is imported via a tiny `{page}-entry.js` file.
- Pages that use `style.css` (index, donate) import it via `main.js` / `donate.js`. All other pages use `base.css` + their own CSS.

### CSS conventions
- **Design tokens** in `:root` — use `var(--primary-yellow)`, `var(--space-md)`, etc.
- **Breakpoints**: `480px` (small phone), `768px` (tablet), `1024px` (small desktop), `1200px` (desktop), `1440px` (large desktop — used sparingly).
- **Mobile-first** preferred for new code (`min-width`). Some legacy `max-width` queries exist.
- **Fluid sizing** with `clamp()` for typography and spacing where possible.
- No CSS class naming framework (BEM-ish but informal).

### JavaScript architecture
- **No framework, no bundled libraries.** Pure vanilla JS with ES modules.
- `nav.js` exports `initNavbar()` — handles scroll effect + mobile hamburger menu. Imported by both `main.js` and `donate.js`.
- `main.js` — fundraiser slider (scrollBy), campaign gallery (image swap), topic pills (cross-fade).
- `donate.js` — detail gallery slider, fundraiser carousel (transform-based with dynamic card width).
- Page-specific JS is minimal — entry files just import CSS.

### Navigation
- **index.html and donate.html** use the full navbar (3-column grid: nav-left / logo / nav-right) with a mobile hamburger drawer at `<768px`.
- **about, careers, how-it-works, checkout** have simplified navbars (logo + back link). No hamburger needed.
- **signin, dashboard, start** are standalone layouts with their own minimal headers.

## Design system

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--primary-yellow` | `#FFC800` | CTAs, highlights, badges |
| `--primary-navy` | `#0E3347` | Headings, navbar, footer, navy bar |
| `--text-dark` | `#002538` | Body text |
| `--text-gray` | `#666666` | Secondary text |
| `--bg-light` | `#FFFFFF` | Page background |
| `--bg-off-white` | `#F8F9FA` | Section backgrounds |

### Spacing scale
`--space-xs: 8px`, `--space-sm: 16px`, `--space-md: 24px`, `--space-lg: 32px`, `--space-xl: 48px`, `--space-2xl: 64px`, `--space-3xl: 96px`

### Radius
`--radius-sm: 8px`, `--radius-md: 16px`, `--radius-lg: 24px`, `--radius-full: 9999px`, `--radius-btn: 28px`

## Current state and what's next

### What exists (UI only)
- Homepage with hero, floating hearts, globe animation, stats bar, campaign discovery, featured fundraisers, topic filtering, footer
- Donate page with campaign detail, video embed, image gallery, donation sidebar, related fundraisers
- Checkout page with payment form UI (amount selection, payment methods, card form)
- Dashboard with stats, campaign list, recent donations
- Start a campaign page with multi-step form UI
- Sign in page
- About, Careers, How it Works — informational pages

### What's NOT real yet
- **No authentication** — signin page is UI only
- **No database** — all content is hardcoded HTML
- **No payment processing** — checkout is UI only
- **No API endpoints** — backend has only `/api/health`
- **No user accounts, no campaign CRUD, no donations**
- **No file uploads** — start page upload area is UI only

### Backend integration (upcoming)
The backend will be built out with real API endpoints. When working on backend integration:
- The Express server is at `backend/server.js`
- CORS is already configured
- Environment variables load via `dotenv` (no `.env.example` yet — create one when adding real config)
- The frontend (UI) will need to call API endpoints — currently there are zero `fetch()` calls in the codebase

## Environment variables

### Backend (`backend/.env`)
| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |

More will be added during backend integration (database URL, auth secrets, payment keys, etc.).

### Frontend
| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_BASE_PATH` | `/` | Base path for deployment (set to `/Benefactor-Project/` for GitHub Pages) |

## Deployment

Frontend deploys as a Docker container via Dokploy on Hostinger VPS:
1. Dockerfile: `node:20-alpine` builds, `nginx:alpine` serves
2. Build path: `/ui`
3. Nginx handles SPA routing (`try_files $uri $uri.html $uri/ /index.html`)
4. Static assets cached 30 days
5. HTTPS via Let's Encrypt through Dokploy
6. DNS managed in Cloudflare (A record → VPS IP, proxy enabled)

See `DOKPLOY.md` for full deployment instructions.

## Guidelines for agents

- **This is a UI prototype.** Don't add complex state management, routing libraries, or frameworks unless explicitly asked. Keep it vanilla JS.
- **No tests exist.** There's no test framework configured.
- **Don't create README.md or documentation files** unless asked.
- **Respect the CSS architecture**: shared tokens in `base.css`, main layout in `style.css`, page-specific styles in `{page}.css`. Don't inline styles back into HTML.
- **Use the design tokens** (`var(--primary-navy)`, `var(--space-md)`, etc.) — don't hardcode colors or spacing.
- **Use standard breakpoints**: 480 / 768 / 1024 / 1200px. Prefer `min-width` for new media queries.
- **Touch targets**: minimum 44x44px for interactive elements.
- **Font sizes**: minimum 12px. Use `clamp()` for fluid typography.
- When adding new pages, follow the pattern: create `{page}.css` + `{page}-entry.js`, add the HTML file to `vite.config.js` rollup inputs.
