import "server-only";
import { cache } from "react";
import type * as prismic from "@prismicio/client";
import { createPrismicClient } from "./client";
import { toPrismicLocale } from "./locales";
import { readTextField } from "./helpers";
import type {
  CourseAdapter,
  CourseData,
  PrismicDocumentData,
} from "./types";
import type { SupportedLocale } from "@/shared/types/locale";

const COURSE_TYPE = "course";

const FALLBACK_COURSE: Record<SupportedLocale, Omit<CourseData, "locale" | "source">> = {
  "pt-br": {
    slug: "lm",
    title: "Curso Presencial LM",
    description:
      "Experiência prática e completa para quem busca dominar técnicas com segurança, atendimento humanizado e visão de resultado.",
    modules: [
      "Fundamentos de avaliação e planejamento individualizado",
      "Técnicas de olhar e sobrancelhas com foco em naturalidade",
      "Atendimento, posicionamento e experiência da cliente",
    ],
    faq: [
      {
        question: "Para quem este curso é indicado?",
        answer: "A versão final detalhará público, pré-requisitos e formato diretamente no CMS.",
      },
      {
        question: "O que será atualizado depois?",
        answer: "Datas, local, módulos finais e CTA de inscrição serão preenchidos via Prismic.",
      },
    ],
    ctaLabel: "Falar sobre o curso",
  },
  "en-us": {
    slug: "lm",
    title: "LM In-Person Course",
    description:
      "A practical learning experience for professionals seeking confident technique, client care, and result-driven execution.",
    modules: [
      "Assessment and individualized planning foundations",
      "Eye area and brow techniques with a natural-result focus",
      "Client service, positioning, and experience design",
    ],
    faq: [
      {
        question: "Who is this course for?",
        answer: "The final content will define target audience, prerequisites, and delivery format in Prismic.",
      },
      {
        question: "What will be updated later?",
        answer: "Dates, venue, final modules, and enrollment CTA will be populated through the CMS.",
      },
    ],
    ctaLabel: "Ask about the course",
  },
};

function buildFallbackCourse(locale: SupportedLocale): CourseData {
  return {
    ...FALLBACK_COURSE[locale],
    locale,
    source: "fallback",
  };
}

const getCourseUncached = async (locale: SupportedLocale): Promise<CourseData> => {
  const fallback = buildFallbackCourse(locale);
  const client = createPrismicClient();
  if (!client) {
    return fallback;
  }

  try {
    const document = (await client.getSingle(COURSE_TYPE, {
      lang: toPrismicLocale(locale),
    })) as prismic.PrismicDocument<PrismicDocumentData>;
    const data = (document.data ?? {}) as Record<string, unknown>;
    const modulesField = Array.isArray(data.modules) ? data.modules : [];
    const modules = modulesField
      .map((item: unknown) => {
        if (!item || typeof item !== "object" || !("module_title" in item)) {
          return null;
        }
        return readTextField((item as { module_title?: unknown }).module_title);
      })
      .filter((item: string | null): item is string => Boolean(item));
    const faqField = Array.isArray(data.faq_items) ? data.faq_items : [];
    const faq = faqField
      .map((item: unknown) => {
        if (!item || typeof item !== "object") {
          return null;
        }
        const question = "question" in item ? readTextField((item as { question?: unknown }).question) : null;
        const answer = "answer" in item ? readTextField((item as { answer?: unknown }).answer) : null;
        if (!question || !answer) {
          return null;
        }
        return { question, answer };
      })
      .filter((item: { question: string; answer: string } | null): item is { question: string; answer: string } => Boolean(item));

    return {
      ...fallback,
      title: readTextField(data.title) ?? fallback.title,
      description: readTextField(data.summary) ?? fallback.description,
      modules: modules.length > 0 ? modules : fallback.modules,
      faq: faq.length > 0 ? faq : fallback.faq,
      ctaLabel: readTextField(data.cta_label) ?? fallback.ctaLabel,
      source: "prismic",
    };
  } catch (error) {
    console.error(`[prismic] Failed to load course for locale '${locale}'.`, error);
    return fallback;
  }
};

const getCourse =
  process.env.NODE_ENV === "development" ? getCourseUncached : cache(getCourseUncached);

const courseAdapter: CourseAdapter = {
  async get(locale) {
    return getCourse(locale);
  },
};

export function createCourseAdapter(): CourseAdapter {
  return courseAdapter;
}
