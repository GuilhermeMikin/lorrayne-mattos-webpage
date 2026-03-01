# Architecture Overview

This architecture serves a multilingual aesthetics marketing site focused on lead generation, trust building, and scalable CMS-backed service content for **Dra. Lorrayne Mattos**.

## Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS for styling
- Prismic CMS for procedures, before/after media, course content, and selected editorial pages

## Application Shape

- Global wrapper: `src/app/layout.tsx`
- Root redirect fallback: `src/app/page.tsx`
- Middleware: `src/middleware.ts` hides `pt-br`, preserves `en-us`, and handles alias redirects
- Locale-scoped shell and pages:
  - `src/app/[locale]/layout.tsx`
  - `src/app/[locale]/page.tsx`
  - `src/app/[locale]/about/page.tsx`
  - `src/app/[locale]/procedures/page.tsx`
  - `src/app/[locale]/procedures/[slug]/page.tsx`
  - `src/app/[locale]/course/lm/page.tsx`
  - `src/app/[locale]/contact/page.tsx`
  - `src/app/[locale]/privacy-policy/page.tsx`
  - `src/app/[locale]/[slug]/page.tsx` for localized alias redirects and fallback
- Shared route helpers for canonical slugs, localized aliases, and alternate metadata

## Rendering Boundaries

- Server components:
  - Route pages
  - Locale layout
  - Prismic fetch/adapters
  - Metadata builders
- Client components:
  - Navigation shell with locale switch and theme switch
  - WhatsApp CTA entry points
  - Procedure gallery or before/after interactions
  - FAQ accordion, testimonial carousel, and minor interactive slices as needed

## Localization Model

- Locale JSON files live in `src/shared/lang/*.json` for fixed UI labels.
- `pt-br` is the default published locale and hidden in public URLs.
- `en-us` remains explicitly prefixed.
- Locale typing lives in `src/shared/types/`.
- `transformLocaleData` or equivalent loader handles supported locale registration and fallback behavior.
- Document-level content comes from Prismic localizations for `pt-br` and `en-us`.

## Navigation and URL Behavior

- Route helpers should generate canonical English slugs regardless of locale.
- Public URLs hide `pt-br`, while internal route resolution stays locale-aware.
- Localized aliases such as `/sobre` or `/procedimentos` should redirect to canonical routes, not render independently.
- Procedure detail pages should map to Prismic `uid` values under `/procedures/[slug]` and `/en-us/procedures/[slug]`.

## Content Boundaries

- Locale JSON:
  - Header/footer labels
  - CTA labels
  - Small structural copy
  - Validation and UI states
- Prismic:
  - Procedure content
  - Before/after galleries
  - Testimonials if editorially managed
  - Course content
  - Optional About/Contact rich sections

## Prismic Model Notes

Initial content model target:

- `site_settings` singleton for global CTAs, links, SEO defaults, and business metadata
- `procedure` repeatable type for procedure detail pages
- `course` singleton or repeatable type for `Curso Presencial LM`
- `page` type only if About/Contact need editorial flexibility beyond locale JSON

## Responsive Navigation

- **Mobile:** Hamburger menu or sheet with immediate access to booking CTA, procedures, course, and about/contact.
- **Desktop:** Primary nav plus persistent booking CTA in header.
- Minimum interactive target size should be `44px`.

## Theme Behavior

- Theme is controlled by class-based dark mode on the root HTML element (`html.dark`).
- Header toggle writes user preference to `localStorage` under `lorrayne-mattos-theme`.
- Initial theme is applied early in `src/app/layout.tsx` to reduce hydration flash.

## SEO and Discovery Shape

- Metadata is route-aware and locale-aware.
- Canonical URLs should favor the locale-hidden `pt-br` path.
- Alternate tags should expose both `pt-BR` and `en-US`.
- Sitemap generation should include static pages plus Prismic-driven procedure detail pages.

## CSS Compatibility Note

- Prefer CSS variables with explicit fallbacks for critical surfaces and borders.
- Avoid brittle color functions for essential contrast states.
- Keep touch-device background behavior stable on iPhone Safari and Android browsers.

## Known Constraints

- Supported locales are duplicated across middleware, route helpers, and locale loaders, so sync discipline matters.
- Prismic adoption introduces an external dependency; the project keeps a static fallback path in the adapters for boot safety.
- The current content is intentionally placeholder-level; production copy, media, and final CTA targets still need business confirmation.
