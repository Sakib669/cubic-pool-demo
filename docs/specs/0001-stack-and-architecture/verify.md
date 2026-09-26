# Verify: Stack and architecture · spec 0001 · updated 2026-09-26
_Steps derived from spec 0001 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

## Commands
- [ ] `pnpm build` → production build compiles and generates static routes cleanly → AC-1
- [ ] `pnpm lint` → ESLint runs across source files with zero errors → AC-2

## Acceptance-criteria coverage
- AC-1 pnpm build passes covered by commands step 1 · AC-2 pnpm lint passes covered by commands step 2
