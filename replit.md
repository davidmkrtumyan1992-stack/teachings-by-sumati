# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Teachings By Sumati (`artifacts/teachings-by-sumati`)
- **Type**: react-vite, frontend-only
- **Preview path**: `/`
- **Description**: Multi-page Buddhist educational website for Lama Sumati's 18 ACI Foundation Courses
- **Design**: Premium minimalist — Playfair Display headings, Inter body, white + burgundy (#7A1B2E) + gold (#C4973B)
- **Features**:
  - Homepage: hero video background (mountains), biography, "Find a Teaching" random video picker, projects grid
  - ACI Courses page: 18 course cards with gradient covers
  - Course detail page: list of class cards with burgundy left border
  - Class page: YouTube embed with EN/RU language switcher, materials, transcript section
  - Practice Modules, Retreats, Events, Projects pages
  - Collapsible sidebar navigation with EN/RU language toggle
  - Mobile bottom tab bar
  - Scroll animations via IntersectionObserver
- **Data**: Loaded from `attached_assets/courses_1775506217848.json`
- **Key files**:
  - `src/App.tsx` — router with all page routes
  - `src/index.css` — theme, fonts (Playfair Display, Inter), animations
  - `src/pages/` — all page components
  - `src/components/layout/` — SiteLayout, Sidebar, Header, HamburgerButton, Footer, BottomTabBar, LanguageContext
  - `src/hooks/useScrollAnimation.ts` — IntersectionObserver hook

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
