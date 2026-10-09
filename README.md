# Verdant Press

A design demonstration for **Verdant Press** — a concept cold-pressed juice brand for Indian mornings. It is an editorial marketing site (hero, ingredient gallery, signature juices, journal, cart demo) with scroll-driven animation.

> This is a demo. The cart lives in your browser only — it does not check out, ship, or take any payment. Prices and reviews are placeholders.

## Tech stack

- [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) (React 19)
- [Vite](https://vite.dev/) 8
- [Tailwind CSS](https://tailwindcss.com/) 4
- [GSAP](https://gsap.com/) (ScrollTrigger) for scroll animation
- [Nitro](https://nitro.build/) (Vercel preset) for the production build
- Deploys to [Vercel](https://vercel.com/)

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:8080.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (port 8080) |
| `npm run build` | Production build (`.vercel/output`) + run migrations |
| `npm run preview` | Preview the production build (port 8081) |
| `npm run typecheck` | Type-check with `tsc` |
| `npm run lint` | Lint with ESLint |
| `npm run format` | Format with Prettier |
| `npm test` | Run the test suite |

## Configuration

`app-env.json` carries build-time `VITE_`-prefixed flags (e.g. `VITE_AUTH_ENABLED`) into dev, build, and preview. A real `process.env` value always wins, so deployment hosts set their own.

## Deployment

The build targets Vercel via Nitro. After `npm run build`, deploy the prebuilt output:

```bash
npx nitro deploy --prebuilt
```

Or connect the repository to Vercel and let it build with `npm run build`.
