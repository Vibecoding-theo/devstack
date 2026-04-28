# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- `npm run lint` — Run ESLint (no tests configured)

## Architecture

DevStack is a personal component library manager built with **Next.js 16.2** (App Router), React 19, Tailwind CSS v4, and TypeScript.

**Next.js version note:** This is Next.js 16.x which has breaking changes from earlier versions. Always consult `node_modules/next/dist/docs/` before writing Next.js-specific code.

### Routing

- `/` — Root page, currently renders the landing page (client component with marketing sections)
- `/app` — Main application: component CRUD, search, import/export (`src/app/app/page.tsx`)
- `/landing` — Landing page variant (`src/app/landing/page.tsx`) with its own layout

Both `/` and `/landing` currently render similar landing page content.

### Core modules (`src/lib/`)

- **types.ts** — `Component` and `ComponentFormData` interfaces. `ComponentLanguage` union type.
- **storage.ts** — Client-side CRUD using `localStorage` (key: `devstack_components`). All data lives in the browser.
- **aiService.ts** — Groq SDK integration for AI-powered code analysis. Uses `llama-3.3-70b-versatile`. Has fallback analysis when no API key is set. API key stored in `localStorage`.
- **fileParser.ts** — Parses uploaded files/directories: language detection, import extraction, dependency resolution.
- **promptGenerator.ts** — Generates prompts (integration, refactor, test) from saved components.

### Component structure (`src/components/`)

- **App components** (used in `/app`): `Header`, `Toolbar`, `ComponentGrid`, `ComponentCard`, `ComponentDetail`, `ComponentForm`, `EmptyState`, `SearchBar`, `SmartImportDialog`, `ApiKeyDialog`, `ThemeToggle`
- **Landing page components**: `HeaderLP`, `Hero`, `Features`, `Testimonials`, `Pricing`, `CTA`, `Footer`

### Key patterns

- All pages in this project are client components (`'use client'`).
- Path alias: `@/*` maps to `./src/*`.
- No server-side data fetching or API routes — everything runs in the browser.
- The app is entirely in French (UI text, descriptions, AI prompts).
