# ADR 0003: Contact Conversion Strategy

- Status: Active
- Date: 2026-03-01

## Context

The business operates with a strong booking/contact flow around direct messaging and social proof. The current Bio Site already prioritizes `Agende seu Horario`, Instagram, and location. The final website should reduce friction and match the existing user behavior instead of forcing a heavy lead form.

## Decision

Use **WhatsApp-first booking** as the primary conversion path. Add Instagram and Maps/location links as secondary conversion/support paths. Keep forms lightweight and focused on pre-filling a WhatsApp conversation rather than collecting extensive structured data.

## Alternatives

- Use a traditional long contact form as the primary conversion flow
- Route all leads through Instagram DMs
- Add an embedded booking platform as the main CTA from day one

## Consequences

- Conversion remains fast and familiar for the local audience.
- WhatsApp link quality and message prefills become operationally important.
- Analytics should track booking-start clicks rather than only form submissions.
- The design should keep WhatsApp visible in header, page sections, and mobile sticky affordances.

## Rollback

If WhatsApp-first conversion underperforms or business operations change, switch the primary CTA to a form or booking platform while preserving Instagram and Maps as secondary actions. Update CTA labels, event tracking, and page layouts without changing the core page inventory.
