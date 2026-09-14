---
kind: build_system
name: Next.js App Router Build & Dev Toolchain
category: build_system
scope:
    - '**'
source_files:
    - package.json
    - next.config.js
    - tsconfig.json
    - tailwind.config.ts
    - postcss.config.js
    - .eslintrc.json
    - .gitignore
    - .env.example
---

## Build System Overview

This repository is a **Next.js App Router** application (Next.js ^16.3.5, React 19) with no custom build orchestrator — the entire build pipeline is driven by Next.js's built-in tooling plus TypeScript and Tailwind CSS.

### Core Scripts (`package.json`)
- `dev`: `next dev` — development server with hot reload.
- `build`: `next build` — production build producing `.next/` output.
- `start`: `next start` — serves the production build.
- `lint`: `next lint` — ESLint via `eslint-config-next`.
- `typecheck`: `tsc --noEmit` — strict TypeScript checking without emitting JS.

There are no publish/release scripts; the package is marked `"private": true`, so this is a deploy-to-hosting project rather than an npm package.

### Next.js Configuration (`next.config.js`)
Minimal config: only `images.unoptimized = true` is set, disabling Next.js image optimization (likely to support external/static image hosting or non-Vercel deployments).

### TypeScript (`tsconfig.json`)
- Target: ES2017, lib includes DOM + ESNext.
- Strict mode enabled, `skipLibCheck: true`, `isolatedModules: true`, incremental builds on.
- JSX transform: `react-jsx` (React 17+ automatic runtime).
- Path alias `@/*` resolves to root directory, used throughout the app for absolute imports.
- Includes generated types under `.next/types`.

### Styling Pipeline
- **Tailwind CSS 3.3.3** configured in `tailwindcss.config.ts` with dark mode via `class` strategy, custom orange palette, design tokens from CSS variables, and `tailwindcss-animate` plugin.
- **PostCSS** (`postcss.config.js`) runs Tailwind then Autoprefixer.
- Global theme tokens live in `styles/digentic-tokens.css` and are consumed via HSL variables.

### Linting
ESLint is configured via `eslint-config-next` (v13.5.1) through `.eslintrc.json`; no custom rules beyond Next.js defaults are evident.

### Dependency Management
- Lockfile: `package-lock.json` pins all versions.
- Runtime deps include NextAuth v5 beta, Mongoose v9, MongoDB driver v7, Zod for validation, Framer Motion, Recharts, etc.
- Dev-only TypeScript 7.0.2 (used purely for type-checking; Next.js compiles at runtime).

### Deployment / CI
- No Dockerfile, Makefile, shell build scripts, or CI workflow files exist in the repo.
- `.gitignore` excludes `.vercel/`, indicating Vercel as the intended deployment target (zero-config Next.js deployment).
- The `.env.example` file documents required environment variables for runtime configuration (e.g., database, auth secrets).
- Blog content references Vercel deployment guides, reinforcing that Vercel is the expected host.

### Versioning Strategy
- Package version is `0.1.0` and static in `package.json`; there is no automated version bumping script or changelog convention visible.
- Dependencies use caret ranges (`^`) allowing minor/patch upgrades within major bounds.

### Conventions Observed
- All source code is TypeScript (`.ts`/`.tsx`); JavaScript is allowed but not used for application logic.
- Absolute imports via `@/` path alias are preferred over relative paths.
- Build artifacts go into `.next/` (standard Next.js output), which is gitignored.
- Environment configuration is externalized via `.env*` files (`.env.example` provided as template).
- No separate test runner scripts are defined; testing infrastructure is not present in this snapshot.