# Documentation Index

This repository uses a lean, spec-driven docs structure to guide the Lorrayne Mattos website scaffold and future implementation work. Active docs live outside `docs/template-specs/`; templates remain untouched as reusable references.

## Reality Check

- Repository root currently contains `docs/`, `package.json`, `package-lock.json`, and root `README.md` as the working project files, plus `.git`.
- Reference assets confirmed:
  - `docs/references/Lorrayne Mattos — Bio Sites.pdf`
  - `docs/references/instagram.png`
- Package manager for this project: `npm`

## Active Docs

| Path | Status | Purpose |
|------|--------|---------|
| `docs/business-specs/lorrayne-mattos-site-spec.md` | Active | Business intent, audience, positioning, initial copy, and page scope |
| `docs/tech-specs/content-routing-spec.md` | Active | Locale, routing, slug, SEO, and content-shape rules |
| `docs/architecture/overview.md` | Active | Current app structure, routing model, and technical boundaries |
| `docs/guidelines/content-guidelines.md` | Active | Writing, localization, and maintenance guardrails |
| `docs/ai/context-pack.md` | Active | Minimal context-loading order for future AI-assisted work |
| `docs/decisions/0001-locale-url-policy.md` | Active | ADR for hidden default locale in public URLs |
| `docs/decisions/0002-content-source-strategy.md` | Active | ADR for Prismic-backed content and locale JSON split |
| `docs/decisions/0003-contact-conversion-strategy.md` | Active | ADR for WhatsApp-first conversion flow |
| `docs/plans/00-project-init.md` | Active | Initialization checks, environment versions, scaffold validation, and command results |
| `docs/plans/01-build-plan.md` | Active | Step-by-step build plan for the final website with Prismic |

## References

| Path | Role |
|------|------|
| `docs/references/Lorrayne Mattos — Bio Sites.pdf` | Initial content reference captured from the current Bio Site |
| `docs/references/instagram.png` | Instagram bio screenshot used to confirm niche, proof points, and location |
| `docs/template-specs/README.md` | Template project README reference |
| `docs/template-specs/docsREADME.md` | Template documentation index reference |
| `docs/template-specs/prismic-slice-machine-setup-guide.md` | Reference guide for future Prismic/Slice Machine setup |
| `docs/template-specs/first-prompt.md` | Prompting/reference material kept untouched |

## Workflow

1. Start with `docs/business-specs/lorrayne-mattos-site-spec.md`.
2. Confirm routing and locale constraints in `docs/tech-specs/content-routing-spec.md`.
3. Check architectural assumptions in `docs/architecture/overview.md`.
4. Use ADRs when a trade-off needs a durable record.
5. Update `docs/plans/` as implementation begins and blockers change.

## Guardrails

- Do not edit files inside `docs/template-specs/` for this project.
- Keep `pt-br` as the default locale hidden from public URLs.
- Keep canonical slugs in English; localized aliases should redirect.
- Treat Prismic as the source for procedures, portfolio, and course-like editorial content once implementation starts.
