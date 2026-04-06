# CLAUDE.md — Benefactor UI (Next.js)

## Quick context

Next.js 16 frontend for the Benefactor fundraising platform. Replaces the vanilla JS frontend in `/frontend`.

## Commands

```bash
cd ui && npm run dev    # Dev server (localhost:3000)
cd ui && npm run build  # Production build
```

Requires Node.js 22 (see .nvmrc). Run `nvm use` before commands.

## Key rules

- **Read Next.js 16 docs** at `node_modules/next/dist/docs/` before using unfamiliar APIs
- `params` and `searchParams` are `Promise` in Next.js 16 — always `await` them
- Server Components by default — only add `'use client'` when interactivity is needed
- Use Tailwind v4 CSS-first config (`@theme` block in globals.css) — no tailwind.config.ts
- Use design tokens: `text-primary-navy`, `bg-primary-yellow`, `rounded-btn`, etc.
- Use `cn()` from `@/lib/utils` for conditional class merging
- Use `next/image` for all raster images
- All mock data lives in `src/data/` — components don't hardcode content
- Standard breakpoints: xs:480 / md:768 / lg:1024 / xl:1200px (mobile-first)
- Minimum touch target: 44x44px. Minimum font size: 12px.
