# CLAUDE.md — Benefactor Platform

## Quick context

Benefactor is a fundraising platform UI prototype (vanilla JS + Vite, no framework). Backend integration has not started yet. See [AGENTS.md](./AGENTS.md) for full project documentation including architecture, design system, file structure, and agent guidelines.

## Commands

```bash
cd frontend && npm run dev      # Dev server (localhost:5173)
cd frontend && npm run build    # Production build
cd backend && npm run dev       # Backend dev (localhost:3000)
```

Requires Node.js 20.19+ or 22.12+.

## Key rules

- Keep it vanilla JS — no frameworks unless explicitly asked
- Use CSS design tokens (`var(--primary-navy)`, `var(--space-md)`, etc.) — never hardcode colors or spacing
- Standard breakpoints: 480 / 768 / 1024 / 1200px. Prefer `min-width` (mobile-first)
- Minimum font size: 12px. Minimum touch target: 44x44px
- Don't inline `<style>` in HTML — use the `src/{page}.css` + `src/{page}-entry.js` pattern
- New pages must be added to `vite.config.js` rollup inputs
- All content is hardcoded HTML — there are no API calls or database yet
