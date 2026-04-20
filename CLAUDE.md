# CLAUDE.md

Guidance for Claude Code when working on this Next.js frontend.

## Commands

```bash
pnpm run dev        # Start dev server on port 3002 with Turbopack
pnpm run build      # Production build
pnpm run start      # Start production server on port 3002
pnpm run lint       # Run ESLint
```

No test runner is configured.

## Stack

- **Next.js 15** with React 19 and TypeScript
- **Tailwind CSS 4** with PostCSS
- **State Management**: Zustand (global state)
- **Form Handling**: Formik + Yup validation
- **HTTP Client**: Axios with custom base service
- **UI Components**: Chart.js, TinyMCE editor, Swiper, react-icons
- **Error Tracking**: Bugsnag

## Architecture

**Entry point**: `app/layout.tsx` (Next.js App Router) → `app/(site)` and `app/panel`.

**Routing**:
- `app/(site)/` - Public site routes (home, products, cart, etc.)
- `app/panel/` - Admin panel routes
- `app/auth/` - Authentication routes
- Middleware: `middleware.ts` handles auth/redirects

Global styles: `app/globals.css` (Tailwind import).

### Folder structure

| Folder | Purpose |
|--------|---------|
| `app/` | Next.js App Router routes. Structure mirrors URL paths. |
| `containers/site/` | API request logic for site features. Fetches data and passes to `components/site/` via props. |
| `containers/panel/` | API request logic for admin panel features. Fetches data and passes to `components/panel/` via props. |
| `components/shared/` | Reusable, generic UI primitives (Button, Input, Modal, etc.). Used by both site and panel. |
| `components/site/` | Feature-specific UI components for the public site. Used directly by `containers/site/`. |
| `components/panel/` | Feature-specific UI components for the admin panel. Used directly by `containers/panel/`. |
| `services/` | Axios-based API layer. All containers use `base.service.ts` as the HTTP client. |
| `stores/` | Global state with **Zustand**. |
| `types/` | TypeScript type definitions. **One file per type**. |
| `hooks/` | Custom React hooks. |
| `utils/` | Utility functions and external service integrations. |
| `public/` | Static assets (images, fonts, etc.). |

### Key conventions

- **Component hierarchy (strict):**
  - Site: `containers/site` → `components/site` → `components/shared`
  - Panel: `containers/panel` → `components/panel` → `components/shared`
  - Containers must use their respective feature components. Mixing site/panel components is not allowed.
- **API Communication**: `base.service.ts` is the single Axios instance. Reads `NEXT_PUBLIC_API_URL` from env and attaches `Bearer` token from `localStorage`.
- **One type per file** in `types/` — no exceptions.
- **Next.js specifics**:
  - Use `app/` router for new routes (no `pages/` directory).
  - Server/Client components: Use `"use client"` directive in components that need client-side features.
  - Environment: Use `NEXT_PUBLIC_*` prefix for client-side variables in `.env.local`.
- Use **pnpm** for all package management.
