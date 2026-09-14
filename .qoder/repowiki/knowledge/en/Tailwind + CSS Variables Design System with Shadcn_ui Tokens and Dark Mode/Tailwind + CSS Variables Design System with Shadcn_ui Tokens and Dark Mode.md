---
kind: frontend_style
name: Tailwind + CSS Variables Design System with Shadcn/ui Tokens and Dark Mode
category: frontend_style
scope:
    - '**'
source_files:
    - tailwind.config.ts
    - app/globals.css
    - styles/digentic-tokens.css
    - components/layout/ThemeProvider.tsx
    - app/layout.tsx
    - postcss.config.js
    - components.json
---

## What system/approach is used

The project uses **Tailwind CSS** as the primary styling framework, combined with a **CSS custom properties (variables) design-token layer** for theming. It follows the **Shadcn/ui token convention** (neutral base color, CSS variables for semantic tokens like `--background`, `--primary`, `--card`, etc.) and extends it with a brand-specific `dt:` palette and orange accent system. Theme switching is implemented via a client-side `ThemeProvider` that toggles a `dark` class on `<html>` (`darkMode: 'class'` in Tailwind config). PostCSS processes Tailwind plus Autoprefixer.

## Key files and packages

- `tailwind.config.ts` — Tailwind configuration: content globs, extended theme (colors, gradients, border radius, keyframes/animations), `darkMode: 'class'`, and `tailwindcss-animate` plugin.
- `app/globals.css` — Root CSS entry: imports `digentic-tokens.css`, declares `@tailwind` directives, defines light/dark CSS variable sets under `:root` and `.dark`, applies base styles (`border-border`, `bg-background text-foreground`), and provides component/utility layers with brand utilities (`.text-orange-gradient`, `.glow-orange`, `.card-hover`, `.article-content` prose styles).
- `styles/digentic-tokens.css` — Brand token file defining `--dt-*` variables (dark background, surface, border, hover, text, muted, orange shades, and alpha variants).
- `components/layout/ThemeProvider.tsx` — Client context provider that persists theme to `localStorage` (`digentic-theme`) and adds/removes the `dark` class on `document.documentElement`.
- `app/layout.tsx` — Root layout that wraps children in `ThemeProvider`, starts with `className="dark"` on `<html>`, and injects Inter font.
- `postcss.config.js` — Enables `tailwindcss` and `autoprefixer` plugins.
- `components.json` — Shadcn/ui configuration pointing at `tailwind.config.ts` and `app/globals.css`, with aliases (`@/components`, `@/lib/utils`, `@/components/ui`, `@/hooks`).

## Architecture and conventions

1. **Token-driven theming**: All colors are expressed as HSL CSS variables (`--background`, `--foreground`, `--primary`, `--accent`, `--destructive`, `--muted`, `--border`, `--input`, `--ring`, `--chart-*`) defined in `app/globals.css` under both `:root` (light) and `.dark` (dark). Tailwind maps these names to utility classes (e.g., `bg-background`, `text-primary`, `border-border`).
2. **Brand tokens separate from semantic tokens**: The `dt:` namespace in `tailwind.config.ts` and `--dt-*` variables in `digentic-tokens.css` encapsulate Digentic's proprietary palette (dark surfaces, borders, orange accents, alpha overlays). These are referenced via direct hex values in components rather than through semantic tokens.
3. **Dark mode strategy**: Uses Tailwind's `class` strategy. The root `<html>` defaults to `dark`, and `ThemeProvider` toggles the class based on `localStorage('digentic-theme')`. Components can rely on the `dark:` prefix for dark-mode overrides.
4. **Layered CSS organization**: `globals.css` uses Tailwind's `@layer base/components/utilities` pattern. Base resets apply global border/background; components define reusable UI primitives (gradients, glow effects, card hover); utilities add niche helpers (`.no-scrollbar`).
5. **Prose/content styling**: Blog article content is styled via a dedicated `.article-content` rule set in `globals.css` covering headings, paragraphs, links, code blocks, preformatted blocks, and blockquotes, with explicit dark-mode overrides.
6. **Animation system**: Custom keyframes (`accordion-down/up`, `fade-in`, `glow-pulse`, `blink`) and corresponding animation utilities are declared in `tailwind.config.ts` and consumed via `animate-*` classes.
7. **Gradient system**: Brand orange gradients are exposed as Tailwind utilities (`orange-gradient`, `orange-gradient-diagonal`, `orange-gradient-hover`) and also as inline CSS classes (`.bg-orange-gradient`, `.bg-orange-gradient-hover`) for reuse outside Tailwind contexts.
8. **Inter font**: The Inter typeface is loaded via `next/font/google` and applied to `<body>` in the root layout.

## Conventions and constraints

- **Use semantic Tailwind color classes** (`bg-background`, `text-foreground`, `border-border`, `bg-card`, `text-muted-foreground`, etc.) instead of hard-coded colors so that theme switches propagate automatically.
- **Theme persistence**: Theme state must be stored in `localStorage` under the key `digentic-theme` and reflected by adding/removing the `dark` class on `document.documentElement`; this is enforced by the shared `ThemeProvider`.
- **Brand colors go through the `dt:` palette or `--dt-*` variables**; ad-hoc hex literals should be avoided in favor of the centralized orange scale (`#ff8c00`, `#ff6b35`, `#ff5733`) and alpha variants (`--dt-o10`, `--dt-o20`).
- **New visual tokens should be added to `app/globals.css` under both `:root` and `.dark`** to maintain consistent light/dark support.
- **Reusable UI pieces belong in `@/components/**`** and should compose Tailwind utilities rather than introducing new global CSS rules; global CSS is reserved for base resets, theme variables, and cross-cutting utilities.
- **Blog prose content must use the `.article-content` wrapper class** so that heading, link, code, and blockquote styles apply consistently across posts.