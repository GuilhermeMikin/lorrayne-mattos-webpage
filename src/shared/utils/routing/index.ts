import type { CanonicalPagePath, SupportedLocale } from "@/shared/types/locale";

const aliasToCanonicalMap: Record<SupportedLocale, Record<string, CanonicalPagePath>> = {
  "en-us": {
    "about-us": "about",
    aboutus: "about",
    services: "procedures",
    booking: "contact",
    "book-now": "contact",
    "contact-us": "contact",
    privacy: "privacy-policy",
    course: "course/lm"
  },
  "pt-br": {
    sobre: "about",
    "quem-somos": "about",
    procedimentos: "procedures",
    contato: "contact",
    agendamento: "contact",
    "agende-seu-horario": "contact",
    "curso-presencial-lm": "course/lm",
    "curso-lm": "course/lm",
    "politica-de-privacidade": "privacy-policy"
  }
};

export function resolveCanonicalPathAlias(locale: SupportedLocale, slug: string): CanonicalPagePath | null {
  const normalizedSlug = slug.trim().toLowerCase();
  return aliasToCanonicalMap[locale][normalizedSlug] ?? null;
}
