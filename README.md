# lorrayne-mattos-webpage

Marketing and portfolio website for **Lorrayne Mattos**

A multilingual lead-generation website for **Lorrayne Mattos**, a **Biomedica Esteta** based in **Uberlandia - MG**. The final site is planned to showcase procedures, support the `Curso Presencial LM`, build trust around natural facial rejuvenation and harmonizacao do olhar, and drive **WhatsApp-first booking**.

Current repository status: scaffolded Next.js app with App Router, locale-aware shell, minimal route placeholders, and Prismic adapters with safe fallbacks.

## Tech Stack

Current stack:

- **Next.js 15** (App Router)
- **React 19** + TypeScript
- **Tailwind CSS** for styling
- **Prismic CMS** for procedures, portfolio/before-after media, and course content
- Static, server-rendered pages with client-side navigation and theme switching

Current package manager:

- **npm**

## Getting Started

```bash
npm ci
npm run dev
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm ci` | Install dependencies from the lockfile |
| `npm run dev` | Start the Next.js development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run slicemachine` | Start Slice Machine |

## Project Structure

Current structure:

```text
docs/
├── README.md
├── ai/
├── architecture/
├── business-specs/
├── decisions/
├── guidelines/
├── plans/
├── references/
├── tech-specs/
└── template-specs/
customtypes/
├── course/
├── procedure/
└── site_settings/
public/
└── lorrayne.png
src/
├── app/
├── shared/
├── prismicio.ts
└── middleware.ts
README.md
package.json
package-lock.json
```

## Features

Current features:

- **Multilingual:** `pt-br` as the default locale and `en-us` as the secondary locale
- **Hidden default locale:** public URLs hide `pt-br`, while `en-us` remains prefixed
- **WhatsApp-first conversion:** booking as the main CTA, with Instagram and Maps as secondary paths
- **Prismic CMS:** procedures, course content, and visual portfolio media managed outside the repo
- **Theme switching:** light/dark mode with persisted user preference
- **Localized routing:** canonical English slugs with localized aliases handled via redirects

## Supported Locales

- `pt-br` (default, hidden in public URLs)
- `en-us`

## Documentation

| Document | Purpose |
|----------|---------|
| [docs/README.md](docs/README.md) | Documentation system overview and active-doc index |
| [docs/business-specs/lorrayne-mattos-site-spec.md](docs/business-specs/lorrayne-mattos-site-spec.md) | Business intent, audience, copy direction, and page scope |
| [docs/tech-specs/content-routing-spec.md](docs/tech-specs/content-routing-spec.md) | Locale, routing, slug, and SEO contract |
| [docs/architecture/overview.md](docs/architecture/overview.md) | Planned application structure and boundaries |
| [docs/guidelines/content-guidelines.md](docs/guidelines/content-guidelines.md) | Writing, localization, and maintenance guardrails |
| [docs/ai/context-pack.md](docs/ai/context-pack.md) | Efficient context loading for future AI-assisted work |
| [docs/plans/00-project-init.md](docs/plans/00-project-init.md) | Initialization checks, environment versions, and current blockers |
| [docs/plans/01-build-plan.md](docs/plans/01-build-plan.md) | Step-by-step build plan for the full website |
| [docs/template-specs/prismic-slice-machine-setup-guide.md](docs/template-specs/prismic-slice-machine-setup-guide.md) | Reference guide for future Prismic/Slice Machine setup |
| [docs/template-specs/README.md](docs/template-specs/README.md) | Template README reference used to shape this file |

## Quality Gates

Current phase:

1. Keep active docs aligned with project decisions.
2. Do not edit files inside `docs/template-specs/`.
3. Preserve the locale policy: hidden `pt-br`, prefixed `en-us`.
4. Run `npm run lint`
5. Run `npm run build`
6. Confirm no broken links in booking, Instagram, and location flows
7. Verify theme and language switching on all pages
8. Validate rendering on iPhone Safari and one Android browser for major visual changes
