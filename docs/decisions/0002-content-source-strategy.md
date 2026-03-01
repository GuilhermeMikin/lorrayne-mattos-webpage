# ADR 0002: Content Source Strategy

- Status: Active
- Date: 2026-03-01

## Context

The site needs a simple developer-controlled layer for fixed UI copy plus an editor-friendly CMS for procedures, course content, and visual portfolio material. Procedures and before/after content are likely to evolve after launch, so hardcoding everything in locale JSON would make updates slower and more error-prone.

## Decision

Use **Prismic** for procedures, portfolio/before-after content, and optional blog/editorial pages. Keep small fixed UI strings, navigation labels, button labels, and validation messages in locale JSON files under `src/shared/lang/*.json`.

## Alternatives

- Store all content in locale JSON files within the repository
- Use Prismic for every string, including navigation/UI microcopy
- Use a different headless CMS or a local Markdown/MDX workflow

## Consequences

- Editors can update procedures and media without code changes.
- The application must handle Prismic availability, content drafts, and sparse `en-us` content.
- Schema parity between locales becomes a planning requirement.
- A static JSON fallback should remain documented for rollback and incident response.

## Rollback

If Prismic integration becomes a blocker, switch repeatable content to local static JSON files while preserving the same content adapters in code. Remove live Prismic fetches, replace them with file-backed loaders, and keep the locale JSON split for fixed UI strings.
