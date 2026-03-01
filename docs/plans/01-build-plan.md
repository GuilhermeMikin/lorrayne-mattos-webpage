# Dra. Lorrayne Mattos Website Build Plan

- Status: Active
- Date: 2026-03-01

## Objective

Build a multilingual marketing and portfolio website for **Dra. Lorrayne Mattos** modeled after the Debora Lima structure, with `pt-br` hidden in public URLs, `en-us` prefixed, and Prismic as the primary source for procedures, portfolio media, and course content.

## 5.1 Information Architecture

Required pages for the first complete release:

- **Home:** positioning, trust, featured procedures, course teaser, quick contact
- **Sobre:** biography, expertise, care philosophy, trust reinforcement
- **Procedimentos:** category listing and overview of services
- **Procedimento:** individual detail page for each procedure
- **Curso Presencial LM:** dedicated landing page for training offer
- **Contato / Agendamento:** WhatsApp-first booking path plus Instagram and location
- **Politica de Privacidade:** recommended legal page

Initial navigation proposal:

- Home
- Sobre
- Procedimentos
- Curso Presencial LM
- Contato

## 5.2 Content Model (Prismic)

Create these initial custom types:

### `site_settings` (singleton)

- Brand name
- Primary CTA label
- Primary CTA link
- Secondary CTA label/link
- Instagram URL
- WhatsApp number/link
- Maps URL
- Address string
- SEO default title
- SEO default description
- Default OG image
- Footer/legal fields

### `procedure` (repeatable)

- Title
- UID / slug
- Category
- Summary
- Rich text body
- Hero image
- Before/after gallery
- CTA label
- CTA link
- Display order
- SEO title/description override

### `course` (singleton or repeatable)

- Title
- UID / slug if repeatable
- Summary
- Rich text description
- Modules
- Dates or date note
- Location
- CTA label/link
- FAQ items
- Hero image

### `page` (repeatable or singleton)

- Title
- UID
- Intro
- Rich text body
- SEO fields
- Optional slice zone if more flexibility is needed

Recommendation:

- Start with `site_settings`, `procedure`, and `course`.
- Add `page` only if About/Contact need editorial flexibility beyond locale JSON plus settings.

## 5.3 Slice Strategy

Minimal slice/component set for the first implementation:

- **Hero**
- **FeatureCards / ServicesGrid**
- **BeforeAfterGallery**
- **Testimonials**
- **FAQ**
- **CTA Band**
- **RichText**

Implementation order:

1. Build slice-like presentational components locally first.
2. Decide whether all of them should become Prismic slices or remain fixed layout sections with typed fields.
3. Keep the first Prismic rollout simple; use fixed fields where layout variation is not needed.

## 5.4 Locale Strategy

- Keep locale JSON in `src/shared/lang/*.json` for UI labels, navigation labels, validation text, and microcopy.
- Use Prismic localized documents for `pt-br` and `en-us`.
- Launch can tolerate sparse `en-us` content if the UX degrades gracefully.
- Parity policy:
  - `en-us` keys are the schema source for locale JSON structure.
  - `pt-br` must mirror the same JSON keys.
  - Missing `en-us` document content may warn in logs initially, but schema mismatch should be prevented.
- Add a future CI check to compare locale JSON key parity.

## 5.5 Routing + SEO

- Implement middleware to hide the default locale (`pt-br`) from public URLs.
- Keep canonical slugs stable and in English.
- Support localized aliases through redirects only.
- Metadata rules:
  - Global template: `{page_or_procedure_title} | Dra. Lorrayne Mattos`
  - Local pages should mention `Uberlandia - MG` where useful for discovery
  - Procedure detail pages should pull title, summary, and media from Prismic
  - Alternate tags should expose `pt-BR` and `en-US`
- OG image plan:
  - Phase 1: site-wide default OG image
  - Phase 2: per-procedure/per-course OG images from Prismic
- Sitemap/robots plan:
  - Include all canonical static pages
  - Include all published procedure detail pages
  - Add alternate locale links where supported
  - Exclude preview and webhook endpoints from indexing

## 5.6 Delivery Milestones

- **M0: Repo boots, docs/specs locked, CI green**
  - Create the actual app scaffold
  - Add `lint` and `build` scripts
  - Confirm docs are the authoritative plan
- **M1: Shell + navigation + theme + locale switch**
  - Implement app shell, header, footer, mobile nav, locale switch, and theme switch
  - Add middleware for hidden default locale
- **M2: Prismic wired + listing/detail pages**
  - Configure Prismic client
  - Create custom types
  - Build procedures listing and detail routes
  - Add course page wiring
- **M3: Content population + QA**
  - Populate `pt-br` content
  - Add initial `en-us` coverage
  - Validate links, content states, and responsiveness
- **M4: Performance pass + launch checklist**
  - Optimize media and metadata
  - Final accessibility checks
  - Launch readiness review

## 5.7 Acceptance Criteria

The implementation is acceptable when all of the following are true:

- Mobile navigation is usable and the primary booking CTA is visible without hunting.
- All tap/click targets for core navigation and CTAs meet a minimum `44px` target size.
- Light and dark mode both render correctly across all pages.
- Keyboard navigation works for header, locale switcher, theme switcher, FAQ, and primary CTAs.
- Procedure listing and detail pages render from Prismic content without layout breakage.
- Missing or sparse `en-us` content fails gracefully and does not break routing.
- Canonical tags, alternate tags, and sitemap entries match the locale policy.
- Lighthouse budget target for primary pages:
  - Performance: `>= 85`
  - Accessibility: `>= 90`
  - Best Practices: `>= 90`
  - SEO: `>= 90`
- Core pages remain readable and functional on iPhone Safari and one Android browser.

## 5.8 Rollback Plan

### Disable Prismic dependency

1. Keep a content adapter boundary between page components and the CMS client.
2. If Prismic fails or launch risk becomes too high, replace the adapter with static JSON or TS fixtures in-repo.
3. Preserve route shapes and component contracts so the fallback does not require route rewrites.
4. Disable or remove webhook/revalidation logic while the static fallback is active.

### Revert locale URL policy safely

1. Stop stripping `/pt-br` in middleware.
2. Regenerate internal links to use explicit locale-prefixed paths.
3. Update canonical URLs, alternate tags, and sitemap generation.
4. Add redirects from locale-hidden old URLs to the new explicit `pt-br` paths if needed to preserve traffic continuity.

## Recommended Build Sequence

1. Scaffold the actual Next.js app and add standard scripts.
2. Implement locale and route helpers before page development.
3. Build the shell and static page skeletons with placeholder JSON data.
4. Integrate Prismic and migrate procedures/course content loading.
5. Populate content, then run QA and launch hardening.
