# Dra. Lorrayne Mattos Business Spec

**Status:** Active  
**Last updated:** 2026-03-03

---

## Mission

Create a multilingual marketing and portfolio website for **Dra. Lorrayne Mattos**, a **Biomédica Esteta** based in **Uberlândia - MG**, focused on estética avançada, harmonização do olhar, and rejuvenescimento facial natural. The site should help prospective clients understand the procedures, build trust through positioning and results, and convert quickly into **WhatsApp-first appointments**.

---

## Primary Goals

1. **Drive bookings:** Turn visitors into appointment requests through WhatsApp with minimal friction.
2. **Build trust:** Present Lorrayne's positioning, proof points, and treatment philosophy with a natural-results emphasis.
3. **Showcase services and education:** Organize procedures and the `Curso Presencial LM` offer in a way that can scale through Prismic CMS.

---

## Target Audiences

1. **Local aesthetics clients:** People in Uberlandia and nearby areas looking for facial, skin, and brow/eye-area procedures.
2. **Trust-seeking first-timers:** Visitors who need reassurance around safety, personalization, and natural outcomes before booking.
3. **Beauty professionals/students:** People interested in the `Curso Presencial LM` offer and Lorrayne's professional authority.

---

## Core User Journeys

1. **The Curious Client:** Lands on Home, scans the hero and trust signals, reviews procedures, then taps WhatsApp to ask about availability.
2. **The Procedure-Led Visitor:** Opens a procedure list or detail page from search/social, evaluates benefits and fit, then books via WhatsApp.
3. **The Confidence Builder:** Reads About, checks proof points and visible results, confirms location/Instagram presence, then schedules.
4. **The Course Prospect:** Lands on the course page, reviews modules/format, and contacts Lorrayne for enrollment details.

---

## Site Pages

| Page | Route (default locale) | Route (other locales) | Description |
|------|------------------------|------------------------|-------------|
| **Home** | `/` | `/en-us` | Brand positioning, trust signals, featured procedures, course teaser, and primary CTAs |
| **About** | `/about` | `/en-us/about` | Lorrayne's bio, philosophy, credentials, and care approach |
| **Procedures** | `/procedures` | `/en-us/procedures` | Category/listing page for all procedures managed in Prismic |
| **Procedure detail** | `/procedures/[slug]` | `/en-us/procedures/[slug]` | Detail page with summary, indications, media, and CTA |
| **Curso Presencial LM** | `/course/lm` | `/en-us/course/lm` | Course landing page with modules, format, FAQs, and CTA |
| **Contact / Booking** | `/contact` | `/en-us/contact` | WhatsApp-first booking page with Instagram and location links |
| **Privacy Policy** | `/privacy-policy` | `/en-us/privacy-policy` | Optional legal/compliance page |

The public root (`/`) serves `pt-br` content directly. Internal route handling remains locale-aware, and `/pt-br/*` should redirect to the locale-hidden equivalent.

### URL Aliases (redirects)

- **About:** `sobre`, `quem-somos`
- **Contact:** `contato`, `agendamento`, `agende-seu-horario`
- **Procedures:** `procedimentos`
- **Course:** `curso-presencial-lm`, `curso-lm`
- **Privacy policy:** `politica-de-privacidade`

---

## Home Page Sections

1. **Hero:** Strong promise around self-care, facial aesthetics, and natural results; primary CTA to WhatsApp booking; secondary CTA to procedures.
2. **Trust strip:** Quick proof points such as `+3 mil atendimentos`, personalized planning, and safe natural outcomes.
3. **Featured procedures:** Highlight core services from the Bio Site with a path to the full procedures catalog.
4. **Course teaser:** Intro block for `Curso Presencial LM` with CTA to the dedicated page.
5. **Quick contact:** WhatsApp, Instagram, and location/map entry points.
6. **Floating action button:** Persistent WhatsApp CTA on mobile and desktop.

---

## Procedures and Content Inventory

The current Bio Site exposes three high-level sections: `Procedimentos`, `Curso Presencial LM`, and `Agende seu Horario`.

Visible procedures captured from the Bio Site PDF:

| Procedure | Notes |
|-----------|-------|
| Lash Lifting | Visible in Bio Site card |
| Epilacao Buco Cera | Visible in Bio Site card |
| Epilacao Buco Linha | Visible in Bio Site card |
| Limpeza de Pele | Visible in Bio Site card |
| Design de Sobrancelhas (Tecnica LM) | Visible in Bio Site card |
| Design de Sobrancelhas + Tintura | Visible in Bio Site card |
| Design de Sobrancelhas + Henna | Visible in Bio Site card |
| Design Personalizado LM (Reconstrutor de Falhas) | Visible in Bio Site card |
| Brow Lamination | Visible in Bio Site card |

Initial taxonomy proposal for Prismic:

- **Olhar e sobrancelhas**
- **Pele e rejuvenescimento**
- **Depilacao facial**
- **Cursos**

---

## Contact Form

The booking/contact page should collect only the minimum needed for conversion:

- **Nome** (required)
- **Procedimento ou interesse** (required)
- **Mensagem** (optional)

On submit: open **WhatsApp** with a pre-filled message.

The visitor can also use:

- Direct Instagram profile link
- Maps/location link
- Optional click-to-copy WhatsApp number if exposed later

---

## Color Palette

Initial palette direction is based on the current Bio Site gradient and beauty/clinical positioning.

### Light mode (default theme)

| Color name | HEX code | Use |
|------------|----------|-----|
| Page background | `#F8F1F4` | Main background |
| Primary text | `#2B1620` | Headings and strong body text |
| Surface | `#FFF9FB` | Cards and panels |
| Soft surface | `#F2E4EA` | Secondary sections |
| Soft border | `#DFC5D0` | Subtle borders |
| Secondary text | `#5E4050` | Supporting text |
| Muted text | `#856877` | Lower-emphasis text |
| **Brand primary** | `#A34768` | Main buttons and strong accents |
| Brand dark | `#6E213F` | Hover states and contrast accents |
| Brand light | `#E7B9CA` | Soft highlights |
| Accent 1 | `#D7A36A` | Warm accent |
| Accent 2 | `#C77DA1` | Secondary accent |

### Dark mode

| Color name | HEX code | Use |
|------------|----------|-----|
| Page background | `#170C12` | Main background |
| Primary text | `#F8EEF2` | Headings and strong body text |
| Surface | `#24131B` | Cards and panels |
| Soft surface | `#301A24` | Secondary sections |
| Soft border | `#563040` | Subtle borders |
| Secondary text | `#D9BEC9` | Supporting text |
| Muted text | `#B894A3` | Lower-emphasis text |
| **Brand primary** | `#D06B91` | Main buttons and strong accents |
| Brand dark | `#A34768` | Hover states and strong accents |
| Brand light | `#E8B8CB` | Highlight surfaces |
| Accent 1 | `#E0AE78` | Warm accent |
| Accent 2 | `#E39AB9` | Secondary accent |

---

## Languages and Themes

- **Languages:** Portuguese (`pt-br`) default and English (`en-us`) secondary.
- **Public locale policy:** `pt-br` hidden from public URLs; `en-us` remains prefixed.
- **Language selector:** HeroUI-style dropdown (`LocaleDropdown`) showing the current locale label (e.g. "Português", "English"); no visible "Idioma"/"Language" label. Used in both desktop header and mobile slide-out menu.
- **Themes:** Light and dark mode. Icon-only button: sun when in light mode, moon when in dark mode. No visible "Tema"/"Theme" label. Persisted in `localStorage`. Works on all pages.

## Navigation and Responsive Behavior

- **Mobile menu:** Hamburger menu with quick access to booking CTA, procedures, course, and about/contact pages. Language dropdown and theme button appear at the bottom of the slide-out panel.
- **Header priority:** Brand name, language dropdown, theme button, and an always-visible booking action.

---

## Contact Information (business)

- **Primary channel:** WhatsApp booking link placeholder pending confirmation
- **Instagram:** `@lorraynebmattos`
- **Location:** Uberlandia - MG
- **Address reference from Instagram screenshot:** `Av Ortizio Borges, 823 - Santa Monica, Uberlandia 38408263` pending confirmation/format cleanup

---

## Product Scope

**In scope:**
- Multilingual marketing site with `pt-br` and `en-us`
- WhatsApp-first booking flow
- Procedure listing/detail content managed via Prismic
- Course page content managed via Prismic
- Theme accessibility: light and dark modes, toggle next to language selection, works on all pages

**Out of scope:**
- Ecommerce checkout
- Patient portal or authentication
- Complex CRM flows
- Advanced blog/editorial system in the first delivery, unless later approved

## Initial Copy Drafts

### Hero (Home)

**Headline:** Apaixone-se pelo ato de se cuidar.  
**Subheadline:** Estetica avancada e harmonizacao do olhar com foco em resultados naturais, seguros e personalizados.  
**Primary CTA:** Agendar atendimento  
**Secondary CTA:** Ver procedimentos

### Short bio (Home/About)

Sou a **Dra. Lorrayne Mattos**, **Biomedica Esteta** em Uberlandia-MG. Atuo com procedimentos faciais e do olhar, unindo tecnica, avaliacao individualizada e cuidado em cada etapa para realcar sua beleza com naturalidade.

### Trust bullets

- +3 mil atendimentos
- Planejamento individualizado
- Resultados naturais e seguros

### Procedures intro

Procedimentos para realcar sua beleza com leveza e precisao, do cuidado com a pele a harmonizacao do olhar.

### Course (Curso Presencial LM) intro

O **Curso Presencial LM** e uma experiencia pratica e completa para quem busca dominar tecnicas com seguranca, atendimento humanizado e visao de resultado.

### Contact section

Agende seu horario de forma rapida:

- WhatsApp para agendamento
- Instagram para novidades e resultados
- Localizacao para chegar ate o espaco

Links, telefone, WhatsApp number, and map destination stay as placeholders until the final business data is confirmed.

## Success Signals

- Increase in WhatsApp booking starts
- Higher visits to procedures and course pages from social/search traffic
- Clear handoff from discovery content to appointment/contact actions

## Change Acceptance Criteria

A change is complete when:

1. A visitor can reach WhatsApp booking in no more than two interactions from primary pages.
2. The site positioning clearly communicates aesthetics expertise, natural results, and location in Uberlandia.
3. Procedures and course content are structured so they can move into Prismic without route changes.
4. Theme and locale behavior remain consistent across Home, About, Procedures, Course, and Contact pages.
