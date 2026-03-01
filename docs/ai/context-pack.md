# AI Context Pack

Purpose: help AI assistants work on the Lorrayne Mattos site with minimal tokens and minimal regressions.

## Start Here

For most tasks, load in this order:

1. `docs/business-specs/lorrayne-mattos-site-spec.md`
2. `docs/tech-specs/content-routing-spec.md`
3. `docs/architecture/overview.md`
4. Relevant ADRs in `docs/decisions/`
5. Only then load code files directly related to the task

## Task-Specific Context

Copy/content edits:

- Load `src/shared/lang/en-us.json` first when schema changes
- Load `src/shared/lang/pt-br.json` to mirror structure and localized wording
- Load Prismic type definitions only if content shape changes

Routing/navigation edits:

- Load `src/middleware.ts`
- Load route helpers such as `src/shared/utils/routing/*`
- Load navigation shell component
- Load locale loader and supported-locale definitions

Prismic/content-model edits:

- Load `prismicio.ts`
- Load `src/lib/prismic/*` or equivalent adapters
- Load `customtypes/*`
- Load the target page and the content mapper feeding it

Visual/layout edits:

- Load `src/app/layout.tsx`
- Load target route files
- Load `src/app/globals.css` and theme/token files

## Guardrails

1. Do not edit files inside `docs/template-specs/`.
2. Keep canonical slugs stable unless an ADR explicitly changes them.
3. Preserve locale key parity across all `src/shared/lang/*.json` files.
4. Keep `pt-br` hidden from public URLs and `en-us` prefixed.
5. Keep booking flows centered on WhatsApp, with Instagram and Maps as secondary paths.
6. Prefer small, reversible changes over speculative structure.

## Definition of Done

1. Relevant spec docs still match implementation.
2. No locale key drift is introduced.
3. Route generation, alias redirects, and locale alternates stay coherent.
4. Prismic-backed pages degrade safely when content is missing.
5. `npm run lint` and `npm run build` pass once those scripts exist.
