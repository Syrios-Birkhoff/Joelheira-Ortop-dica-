# Replit MD

## Overview

This is a Brazilian Portuguese sales page (landing page) for an orthopedic knee brace ("Joelheira Ortopédica"). It's a direct-response, high-conversion sales page with a single purpose: collecting customer orders via a "Pay on Delivery" (OMNICASH/COD) payment model. The app consists of a React frontend with a persuasive sales layout and an Express backend that stores orders in a PostgreSQL database. There is no authentication — it's a public-facing single-page sales funnel.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router) — currently just `/` (Home) and a 404 page
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives with Tailwind CSS
- **Styling**: Tailwind CSS with CSS variables for theming. Custom fonts: Inter (body) and Montserrat (headings). Medical blue/green trust theme with aggressive orange/red CTAs
- **Animations**: Framer Motion for scroll reveal effects
- **Forms**: react-hook-form with Zod validation (shared schemas)
- **Data Fetching**: TanStack React Query with a custom mutation hook (`useCreateOrder`)
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`
- **Static Images**: Expected in `client/public/images/` (hero.webp, product.jpg, pair.webp, before-after-1.jpg, before-after-2.jpg, how-to-use.webp)

### Backend
- **Framework**: Express 5 on Node.js with TypeScript (run via tsx)
- **Architecture**: Single monolith — Express serves the API and static files
- **API**: Single endpoint `POST /api/orders` that validates input with Zod and inserts into PostgreSQL
- **API Contract**: Defined in `shared/routes.ts` — a typed route definition object that both client and server import, ensuring type safety
- **Dev Server**: Vite dev server middleware attached to Express in development (see `server/vite.ts`)
- **Production**: Vite builds static files to `dist/public`, server bundled with esbuild to `dist/index.cjs`

### Database
- **Database**: PostgreSQL (required — `DATABASE_URL` env var)
- **ORM**: Drizzle ORM with `drizzle-zod` for automatic Zod schema generation
- **Schema**: Single `orders` table with fields: id, name, phone, address, city, state, zip, quantity, totalPrice (cents), status, createdAt
- **Migrations**: Drizzle Kit with `db:push` command for schema sync
- **Storage Layer**: `DatabaseStorage` class in `server/storage.ts` implements `IStorage` interface

### Shared Code
- `shared/schema.ts` — Drizzle table definitions and Zod insert schemas
- `shared/routes.ts` — API route definitions with method, path, input/output schemas (used by both client and server)

### Build System
- **Dev**: `npm run dev` runs tsx with the Express server + Vite middleware
- **Build**: Custom `script/build.ts` — runs Vite build for client, esbuild for server, outputs to `dist/`
- **Type Check**: `npm run check` runs tsc with noEmit

## External Dependencies

### Required Services
- **PostgreSQL**: Required. Connection via `DATABASE_URL` environment variable. Used for order storage via Drizzle ORM with `connect-pg-simple` for session support (though sessions aren't actively used currently)

### Key NPM Packages
- **drizzle-orm** + **drizzle-kit**: Database ORM and migration tooling
- **express** (v5): HTTP server
- **@tanstack/react-query**: Client-side server state management
- **react-hook-form** + **@hookform/resolvers**: Form handling with Zod validation
- **framer-motion**: Animation library for scroll effects
- **wouter**: Lightweight client-side routing
- **shadcn/ui ecosystem**: Radix UI primitives, class-variance-authority, clsx, tailwind-merge, lucide-react icons
- **zod** + **drizzle-zod**: Schema validation shared between client and server

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in dev
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner`: Dev-only Replit integrations (conditionally loaded)

### No External APIs
- No payment gateway integration — the business model is Cash on Delivery (COD/OMNICASH)
- No authentication system
- No email service currently wired up (nodemailer is in build allowlist but not used)