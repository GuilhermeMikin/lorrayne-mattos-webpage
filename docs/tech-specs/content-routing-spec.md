# Content and Routing Technical Spec

Status: Active  
Last updated: 2026-03-01

## Technical Baseline

- Framework: Next.js 15 App Router
- Runtime model: mostly static server-rendered pages with client-side navigation widgets
- Content source split:
  - `src/shared/lang/*.json` for fixed UI strings and microcopy
  - Prismic for procedures, portfolio/before-after content, course content, and optional editorial pages

## Route Contract

1. `/` serves the default locale (`pt-br`) with no locale segment in the public URL.
2. `/pt-br` and `/pt-br/*` redirect to the locale-hidden equivalent path.
3. `/en-us` renders localized home for English.
4. `/about`, `/procedures`, `/procedures/[slug]`, `/course/lm`, `/contact`, and `/privacy-policy` serve `pt-br`.
5. `/en-us/about`, `/en-us/procedures`, `/en-us/procedures/[slug]`, `/en-us/course/lm`, `/en-us/contact`, and `/en-us/privacy-policy` serve English.
6. Localized alias paths redirect to canonical English slugs:
   - `/sobre` -> `/about`
   - `/procedimentos` -> `/procedures`
   - `/contato` and `/agendamento` -> `/contact`
   - `/curso-presencial-lm` -> `/course/lm`
   - Equivalent `/en-us/*` aliases may exist only if needed for marketing compatibility.
7. Unknown localized slugs should resolve to a localized not-found or under-construction fallback, not a silent redirect.

## Locale Contract

Each locale file in `src/shared/lang/` must include the same key set. Initial scope:

- `SEO`
- `footer`
- `header`
- `common`
- `pages.home`
- `pages.about`
- `pages.procedures`
- `pages.procedure_detail`
- `pages.course`
- `pages.contact`
- `pages.privacy_policy`
- `under_construction`

The expected shape should be typed in `src/shared/types/` and loaded by `transformLocaleData`.

## Localization Rules

1. Supported locale keys must be declared in `transformLocaleData`.
2. Language selector options must stay synchronized with the supported locale keys.
3. Fallback locale is `pt-br` when key or locale is unsupported.
4. Public URLs hide the default locale, but internal helpers should still operate against a locale-aware route model.
5. Canonical page slugs remain English for route stability: `about`, `procedures`, `contact`, `privacy-policy`, and `course/lm`.
6. Localized aliases are redirect-only. They are not canonical and should not be used for generated links.
7. Prismic documents must support `pt-br` and `en-us`; English may launch with partial coverage but schema parity must hold.

## Slug Policy

- Canonical slugs are authored in English for structural stability.
- Prismic `uid` values for repeatable content should match canonical English slugs where practical.
- Localized marketing aliases should be maintained in route config or middleware redirects.
- If a localized alias changes, only redirect rules change; canonical links, metadata, and sitemap entries remain tied to the English slug.

## SEO and Metadata Contract

1. Canonical URLs for `pt-br` omit the locale segment.
2. Alternate language URLs use `hreflang` with `pt-BR` and `en-US`.
3. Title templates should prioritize procedure/course names followed by brand and city.
4. OG images may start with a site-wide default and later move to per-document assets from Prismic.
5. Sitemap generation must include canonical URLs only, plus locale alternates.
6. Robots configuration should allow public marketing pages and block preview-only or webhook-only endpoints.

## Theme Contract

1. Theme switch must be visible in the header, next to the language selector.
2. Theme must use class-based dark mode (`html.dark`), default to light when no preference is stored, and persist preference in `localStorage` under `lorrayne-mattos-theme`.
3. Theme labels are localized in `header.theme` for each locale file.
4. Light and dark styles must render correctly on every localized route, including fallback pages.

## Middleware and Routing Notes

- Use middleware to normalize locale prefixes and hide `pt-br` from public URLs.
- Route helpers should provide `getLocalePath(locale, path)` behavior so navigation stays consistent.
- Redirect logic should preserve query strings for campaign attribution and booking flows.
- Default-locale stripping must be safe for direct visits, shared links, and sitemap-generated URLs.

## Change Workflow

For content or navigation changes:

1. Update `en-us` key structure first when schema changes.
2. Mirror equivalent keys to `pt-br`.
3. Validate route, locale switching, alias redirects, and theme switching manually.
4. Run `npm run lint` and `npm run build` once scripts exist.

## Quality Gates

- No missing locale keys across `src/shared/lang/*.json`
- No broken links in WhatsApp, Instagram, or location flows
- No route regressions for hidden-default-locale handling
- No regressions in canonical tags, alternate tags, or sitemap generation
- Metadata stays accurate for aesthetics, facial rejuvenation, and local discovery in Uberlandia
