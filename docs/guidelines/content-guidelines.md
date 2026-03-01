# Content and Contribution Guidelines

## Writing Style

- Use direct, professional language with a beauty/clinical tone.
- Prefer short sentences and concrete benefit statements.
- Avoid exaggerated claims, medical overpromises, or vague luxury filler.
- Emphasize safety, personalization, and natural-looking results.

## Dra. Lorrayne Mattos Brand Consistency

- Position Lorrayne as a **Biomedica Esteta** with authority in harmonizacao do olhar and facial rejuvenation.
- Keep procedure descriptions clear, practical, and client-centered.
- Reinforce trust through proof points such as `+3 mil atendimentos`, individualized evaluation, and natural results.
- Keep calls to action explicit and fast: WhatsApp first, Instagram second, location third.

## Localization Rules

1. Keep the same semantic meaning across locales.
2. Keep JSON key structure identical in all locale files.
3. Use `en-us` as the source of truth for locale schema changes.
4. Keep public `pt-br` URLs locale-hidden and `en-us` prefixed in generated links.

## Procedure Content Rules

1. Separate quick marketing copy from deeper treatment explanation.
2. Avoid adding contraindications or medical claims unless business-approved.
3. Keep before/after captions factual and respectful.
4. Distinguish clearly between service pages and course/training pages.

## Technical Hygiene

1. Keep canonical route slugs in English: `about`, `procedures`, `contact`, `privacy-policy`, and `course/lm`.
2. Keep supported locales synchronized between middleware, route helpers, locale loaders, and navigation.
3. Keep `header.theme` labels synchronized across locale files.
4. Avoid adding dependencies unless they solve a clear recurring need.
5. For critical surfaces, borders, and overlays, prefer broadly supported CSS values with explicit fallbacks.

## Update Checklist

Before finishing a change:

1. Confirm relevant docs still match code.
2. Confirm no broken links in WhatsApp, Instagram, Maps, and primary CTA sections.
3. Run `npm run lint` when available.
4. Run `npm run build` for structural changes when available.
5. For visual/style changes, test at least one iPhone Safari device/emulator and one Android browser.
