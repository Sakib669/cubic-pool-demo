<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Cubic Pools Group

## Stack

- **Language / Runtime**: TypeScript, Node 24
- **Framework**: Next.js 16 (App Router, React 19)
- **Key dependencies**: Tailwind CSS, Radix UI and shadcn primitives, clsx, tailwind-merge
- **Package manager**: pnpm

## Build approach

Tracer Bullet, vertical end to end slices, thin but complete through every layer

## Commands

```bash
# Install
pnpm install

# Dev server
pnpm dev

# Build
pnpm build

# Lint
pnpm lint
```

## Tooling

- Linter and formatter: ESLint 9 with Next.js core web vitals and Prettier
- Pre commit checks: lint, format, and typecheck before each commit
- Testing: Vitest for data logic and integration, Playwright for interactive UI

## Git

- integration: on
- branch prefix: feat/
- commit: per-milestone

## Specs

Stored in `docs/specs/`. Format: `docs/specs/NNNN-title/index.md`.

## Rules

- Organize codebase around domain contexts (components, lib/data, types, styles) with decoupled presentation and data layers
- Strict TypeScript: no any, exhaustive type checks, and strict null checks
- Accessibility baseline on all UI components conforming to WCAG 2.2 AA
- Validate environment variables at application startup
- Use conventional git commit messages
- Provide consistent error handling with accessible fallback UI

## Agent skills

- [vercel-react-best-practices](.agents/skills/vercel-react-best-practices/): `vercel-labs/agent-skills`, Vercel React and Next.js best practices

## Context files

<!-- Nested AGENTS.md files are listed here as they are created -->

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
