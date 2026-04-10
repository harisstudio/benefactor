# AGENTS.md — Benefactor Platform

## What is this project?

Benefactor is a worldwide fundraising platform (similar to GoFundMe). This is a full-stack application featuring a modern React-based frontend and a robust backend.

The project has recently migrated from a vanilla JS prototype to a production-ready stack:
- **Frontend**: Next.js (App Router) with Tailwind CSS v4.
- **Backend**: NestJS (Node.js framework) with PostgreSQL and Better Auth.

## Project structure

```
benefactor/
├── ui/                        # Next.js Frontend (App Router)
│   ├── src/
│   │   ├── app/               # Routes, layouts, and global styles
│   │   ├── components/        # Reusable React components
│   │   ├── lib/               # Shared utilities and configurations
│   │   ├── context/           # React Context providers
│   │   ├── data/              # Static data and mockups
│   │   └── types/             # TypeScript definitions
│   ├── public/                # Static assets (images, fonts, icons)
│   ├── next.config.ts         # Next.js configuration
│   ├── tsconfig.json          # TypeScript configuration
│   └── package.json           # Frontend dependencies
├── backend/                   # NestJS Backend
│   ├── src/                   # Server source code (controllers, services, modules)
│   ├── test/                  # E2E and unit tests
│   ├── nest-cli.json          # NestJS configuration
│   ├── tsconfig.json          # TypeScript configuration
│   └── package.json           # Backend dependencies
└── DOKPLOY.md                 # Deployment guide (Hostinger VPS + Cloudflare)
```

## Tech stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| UI / Frontend | Next.js 15+ | React 19, App Router, TypeScript |
| Styling | Tailwind CSS v4 | Using modern `@theme` variables |
| Backend | NestJS 11 | TypeScript, Modular architecture |
| Database | PostgreSQL | Managed via Better Auth and standard drivers |
| Auth | Better Auth | Integrated with NestJS |
| Deployment | Dokploy on Hostinger | Docker-based deployment |
| Version control | GitHub | `git@github.com:harisstudio/benefactor.git` |

## Commands

### UI / Frontend
```bash
cd ui
npm install
npm run dev          # Next.js dev server (localhost:3000)
npm run build        # Production build
npm run start        # Run production build
```

### Backend
```bash
cd backend
npm install
npm run start:dev    # NestJS dev server with watch mode (localhost:3001)
npm run build        # Compile project
npm run start:prod   # Run production build
```

## Architecture decisions

### CSS architecture (Tailwind CSS 4)
- **Global Styles**: Defined in `ui/src/app/globals.css`.
- **Design Tokens**: Controlled via the `@theme` block in `globals.css`. Use CSS variables for colors, spacing, and radius.
- **Utility-First**: Leverage Tailwind utility classes for layout and component styling.

### Design Tokens
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary-yellow` | `#FFC800` | CTAs, highlights, badges |
| `--color-primary-navy` | `#0E3347` | Headings, navbar, footer |
| `--color-text-dark` | `#002538` | Body text |
| `--color-text-gray` | `#666666` | Secondary text |

### Component Architecture
- **React Components**: Located in `ui/src/components`. Prefer functional components with hooks.
- **Server Components**: Use Next.js Server Components by default for better performance and SEO.
- **Client Components**: Use `"use client"` only when interactivity (state, effects) is required.

## Guidelines for agents

- **Respect the Stack**: Use Next.js 15 features (Server Components, Actions) and Tailwind 4 standards.
- **Type Safety**: Everything should be strictly typed with TypeScript.
- **Design Consistency**: Always use the design tokens defined in `globals.css` via Tailwind classes (e.g., `bg-primary-yellow`).
- **Standard Breakpoints**: Follow the Tailwind 4 defaults or the custom ones in `@theme` (480px, 768px, 1024px, 1200px).
- **Clean Backend**: Follow NestJS modular patterns. Ensure controllers handle requests and services handle business logic.
- **Authentication**: Use `better-auth` for any user-related features.
- **No Documentation Bloat**: Don't create new READMEs or extra documentation unless requested.
- **Productivity**: `ui/` is the only frontend directory. `frontend/` has been removed.
