---
kind: configuration_system
name: Environment-Driven Configuration via Next.js .env and Centralized Config Modules
category: configuration_system
scope:
    - '**'
source_files:
    - .env.example
    - next.config.js
    - auth.config.ts
    - auth.ts
    - proxy.ts
    - lib/mongodb.ts
    - lib/email.ts
    - lib/constants.ts
    - tailwind.config.ts
    - components.json
---

## What system/approach is used

The application uses a **plain `.env` environment-variable + TypeScript config module** approach, with no dedicated configuration library (no `dotenv`, `config`, `conf`, or YAML/JSON config files). Configuration is split into two layers:

1. **Runtime secrets & service endpoints** — loaded from `.env` (documented in `.env.example`) and consumed directly via `process.env` at the boundaries where they are needed (NextAuth providers, MongoDB client, Nodemailer).
2. **Application behavior / feature flags** — defined as plain TypeScript exports in `lib/constants.ts` (`SITE_CONFIG`, `NAV_LINKS`, `FOOTER_LINKS`, mock data sets) and consumed by components.

This is a minimal, framework-native pattern: Next.js automatically loads `.env*` files, and the code reads values inline rather than through a central typed config object.

## Key files and packages

- `.env.example` — single source of truth for all required environment variables; documents every secret and its purpose.
- `next.config.js` — Next.js runtime config (only `images.unoptimized: true` here).
- `auth.config.ts` — shared NextAuth configuration (providers, callbacks, pages) that is reused by both `auth.ts` and `proxy.ts`.
- `auth.ts` — NextAuth instance wiring credentials provider, MongoDB adapter, JWT session strategy, and temporary admin login using `TEMP_ADMIN_EMAIL` / `TEMP_ADMIN_PASSWORD`.
- `proxy.ts` — middleware-style route guard that enforces enrollment/purchase checks based on `session.user.role`, `enrolledCourses`, and `purchasedDigital`.
- `lib/mongodb.ts` — MongoDB client singleton built around `MONGODB_URI` (falls back to local `mongodb://127.0.0.1:27017/digentic`).
- `lib/email.ts` — Nodemailer transport configured from `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`; falls back to console logging when SMTP vars are missing.
- `tailwind.config.ts` — design-system tokens (colors, radii, animations) plus `darkMode: 'class'`.
- `components.json` — shadcn/ui configuration pointing at Tailwind and aliases.
- `lib/constants.ts` — site metadata, navigation links, footer links, and large mock-data blocks used throughout the app.

## Architecture and conventions

### Environment variable naming and sourcing

- All secrets use uppercase kebab-free names: `AUTH_SECRET`, `NEXTAUTH_URL`, `MONGODB_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `SMTP_*`, `TEMP_ADMIN_*`, `NEXT_PUBLIC_SITE_URL`.
- The `NEXT_PUBLIC_` prefix is used only for `NEXT_PUBLIC_SITE_URL`, following Next.js convention for client-exposed env vars.
- There is no `.env` committed to the repo; `.env.example` is the authoritative template.
- Optional SMTP settings are guarded: `sendPasswordResetEmail` only builds a Nodemailer transport if `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS` are all present; otherwise it logs the reset URL to stdout so development works without an SMTP server.

### NextAuth configuration layering

- `auth.config.ts` holds the *declarative* part of NextAuth setup (pages, providers, callbacks) and is imported by both `auth.ts` (the auth handler) and `proxy.ts` (route guards), ensuring consistent provider/session shape.
- `auth.ts` composes the final NextAuth instance by spreading `authConfig`, adding the Credentials provider and MongoDB adapter, and defining `createUser` / `linkAccount` events.
- Temporary admin access is implemented as a hard-coded fallback path: if `TEMP_ADMIN_EMAIL` / `TEMP_ADMIN_PASSWORD` match the incoming credentials, a synthetic user with `role: 'admin'`, `enrolledCourses: ['all']`, and `purchasedDigital: ['all']` is returned — bypassing the database entirely.
- Role-based privileges flow through the JWT: `auth.config.ts`'s `jwt` callback writes `token.role`, `token.enrolledCourses`, `token.purchasedDigital`; the `session` callback copies them onto `session.user` so `proxy.ts` can read them.

### Database connection configuration

- `lib/mongodb.ts` creates a single `MongoClient` instance per process, reusing it in development via `global._mongoClientPromise` to avoid hot-reload connection churn.
- Connection URI defaults to `mongodb://127.0.0.1:27017/digentic` when `MONGODB_URI` is unset, enabling local development out of the box.
- Server API v1 is enforced with `strict: false` and `deprecationErrors: true`.

### Route-level authorization as configuration

- `proxy.ts` acts as a centralized policy file: it declares which routes require authentication and what additional claims (`enrolledCourses`, `purchasedDigital`) are checked, redirecting unauthenticated users to `/auth/login?callbackUrl=...` and unauthorized users to the resource page with a `notice` query parameter.
- The matcher array explicitly enumerates protected paths (`/dashboard/*`, `/courses/:id/learn*`, `/digital/download*`, `/digital/downloads*`).

### UI / design-time configuration

- `tailwind.config.ts` defines the visual design system: CSS custom properties for semantic colors (`--primary`, `--background`, etc.), a custom `dt.*` palette, orange gradient utilities, and animation keyframes.
- Dark mode is class-based (`darkMode: 'class'`), toggled via the `ThemeProvider` / `ThemeToggle` components.
- `components.json` pins shadcn/ui to use Tailwind with CSS variables and maps `@/components`, `@/lib`, `@/hooks` aliases.

### Site content configuration

- `lib/constants.ts` centralizes site identity (`SITE_CONFIG.name`, `tagline`, `author`, `email`, `social`), navigation (`NAV_LINKS`), and footer structure (`FOOTER_LINKS`). These are plain TS objects — not loaded from a CMS or env — so changing them requires a code change and redeploy.

## Conventions and constraints

- **No runtime config parsing library**: every value is read directly from `process.env`. There is no schema validation, default-value merging, or type-safe config loader.
- **Secrets live exclusively in `.env`**: there are no JSON/YAML/TOML config files for runtime settings; `next.config.js` contains only build-time Next.js options.
- **Optional features gate themselves**: email sending is disabled gracefully when SMTP env vars are absent; the app still runs locally.
- **Temporary admin credentials are first-class config**: `TEMP_ADMIN_EMAIL` and `TEMP_ADMIN_PASSWORD` are documented in `.env.example` and treated as privileged overrides everywhere they are checked (`auth.ts`, `auth.config.ts`).
- **Protected routes are declared in one place**: `proxy.ts` is the single source of truth for which paths require auth/enrollment/purchase, using a matcher array plus explicit role/claim checks.
- **Design tokens are CSS variables**: Tailwind references `var(--*)` tokens defined in `app/globals.css` (referenced by `styles/digentic-tokens.css`), keeping color/font/radius values centralized outside component code.
- **shadcn/ui is configured once**: `components.json` fixes style, RSC, TSX, Tailwind config path, base color, and path aliases for the entire component library.