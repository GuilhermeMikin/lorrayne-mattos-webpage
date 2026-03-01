# ADR 0001: Locale URL Policy

- Status: Active
- Date: 2026-03-01

## Context

The site needs multilingual support with `pt-br` as the default audience language and `en-us` as a secondary locale. The reference behavior from the Debora Lima site hides the default locale from public URLs while still supporting locale-aware routing internally. This improves URL cleanliness for the primary audience without giving up predictable locale handling in code.

## Decision

Hide `pt-br` in public URLs and keep locale-prefixed internal routes as the routing model. Use middleware to strip `/pt-br` from public requests and redirect locale aliases to canonical English slugs. Keep `en-us` explicitly prefixed in public URLs.

## Alternatives

- Expose all locales publicly, including `/pt-br/*`
- Keep only locale-prefixed routes and redirect `/` to `/pt-br`
- Remove locale prefixes entirely and infer locale from browser/session

## Consequences

- Public URLs stay shorter for the primary market.
- Middleware and route helpers become a required part of the architecture.
- Canonical and alternate URL metadata need explicit handling.
- QA must cover direct visits to `/pt-br/*`, hidden-default-locale redirects, and shared links.

## Rollback

If this policy causes operational or SEO issues, revert to explicit locale-prefixed public URLs for all locales. Remove the middleware rule that strips `pt-br`, update canonical URLs and sitemap generation, and regenerate internal links to include `/pt-br`.
