import "server-only";
import { cache } from "react";
import type * as prismic from "@prismicio/client";
import { createPrismicClient } from "./client";
import { toPrismicLocale } from "./locales";
import { readTextField } from "./helpers";
import type {
  PrismicDocumentData,
  ProcedureAdapter,
  ProcedureDetailData,
  ProcedureRouteRef,
  ProcedureSummaryData,
} from "./types";

import type { SupportedLocale } from "@/shared/types/locale";

type FallbackProcedure = Omit<ProcedureDetailData, "locale" | "source">;

const FALLBACK_PROCEDURES: Record<SupportedLocale, FallbackProcedure[]> = {
  "pt-br": [
    {
      slug: "lash-lifting",
      title: "Lash Lifting",
      category: "Harmonização do olhar",
      description: "Curvatura e realce dos cílios naturais com acabamento leve e elegante.",
      ctaLabel: "Agendar procedimento",
      body: [
        "Procedimento com foco em valorizar o olhar sem pesar o resultado.",
        "A página final vai receber orientações, indicações e galeria antes/depois via Prismic.",
      ],
      beforeAfterImages: [],
    },
    {
      slug: "brow-lamination",
      title: "Brow Lamination",
      category: "Harmonização do olhar",
      description: "Alinhamento dos fios com desenho mais definido e visual natural.",
      ctaLabel: "Agendar procedimento",
      body: [
        "Estrutura pensada para detalhar benefícios, cuidados e expectativas do procedimento.",
      ],
      beforeAfterImages: [],
    },
    {
      slug: "design-de-sobrancelhas",
      title: "Design de Sobrancelhas",
      category: "Harmonização do olhar",
      description: "Avaliação personalizada para realçar o rosto com leveza e precisão.",
      ctaLabel: "Agendar procedimento",
      body: [
        "O conteúdo definitivo será populado no CMS, mantendo esta rota e este modelo.",
      ],
      beforeAfterImages: [],
    },
    {
      slug: "limpeza-de-pele",
      title: "Limpeza de Pele",
      category: "Estética facial",
      description: "Cuidado facial com abordagem personalizada para renovação e equilíbrio da pele.",
      ctaLabel: "Agendar procedimento",
      body: [
        "A descrição final deve explicar a proposta do atendimento e seus diferenciais.",
      ],
      beforeAfterImages: [],
    },
  ],
  "en-us": [
    {
      slug: "lash-lifting",
      title: "Lash Lifting",
      category: "Eye area harmonization",
      description: "Natural lash enhancement with lifted definition and a soft finish.",
      ctaLabel: "Book procedure",
      body: [
        "This page will later receive full benefits, expectations, and before/after media from Prismic.",
      ],
      beforeAfterImages: [],
    },
    {
      slug: "brow-lamination",
      title: "Brow Lamination",
      category: "Eye area harmonization",
      description: "Brow alignment and definition designed to keep the result polished and natural.",
      ctaLabel: "Book procedure",
      body: [
        "The final content will be managed in Prismic without changing this route contract.",
      ],
      beforeAfterImages: [],
    },
    {
      slug: "design-de-sobrancelhas",
      title: "Brow Design",
      category: "Eye area harmonization",
      description: "Personalized brow shaping focused on balance, softness, and facial harmony.",
      ctaLabel: "Book procedure",
      body: [
        "This placeholder keeps the route stable until the final content is populated.",
      ],
      beforeAfterImages: [],
    },
    {
      slug: "limpeza-de-pele",
      title: "Skin Cleansing",
      category: "Facial aesthetics",
      description: "Personalized facial care focused on skin renewal and balanced appearance.",
      ctaLabel: "Book procedure",
      body: [
        "The page will later include richer details, media, and FAQ content from Prismic.",
      ],
      beforeAfterImages: [],
    },
  ],
};

const PROCEDURE_TYPE = "procedure";

function mapFallbackProcedure(locale: SupportedLocale, procedure: FallbackProcedure): ProcedureDetailData {
  return {
    ...procedure,
    locale,
    source: "fallback",
  };
}

function mapPrismicProcedureDocument(
  locale: SupportedLocale,
  document: prismic.PrismicDocument<PrismicDocumentData>,
  fallback: ProcedureDetailData,
): ProcedureDetailData {
  const galleryField = Array.isArray(document.data.before_after_gallery)
    ? document.data.before_after_gallery
    : [];
  const beforeAfterImages = galleryField
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const image = "image" in item ? (item as { image?: { url?: string } }).image : null;
      const alt = "image_alt" in item ? readTextField((item as { image_alt?: unknown }).image_alt) : null;

      if (!image?.url) {
        return null;
      }

      return {
        src: image.url,
        alt: alt ?? fallback.title,
      };
    })
    .filter((item): item is { src: string; alt: string } => Boolean(item));

  const bodyValue = document.data.body;
  const body = Array.isArray(bodyValue)
    ? bodyValue
        .map((entry) => readTextField(entry))
        .filter((entry): entry is string => Boolean(entry))
    : fallback.body;

  return {
    ...fallback,
    slug: document.uid ?? fallback.slug,
    locale,
    title: readTextField(document.data.title) ?? fallback.title,
    category: readTextField(document.data.category) ?? fallback.category,
    description: readTextField(document.data.summary) ?? fallback.description,
    ctaLabel: readTextField(document.data.cta_label) ?? fallback.ctaLabel,
    body: body.length > 0 ? body : fallback.body,
    beforeAfterImages,
    source: "prismic",
  };
}

async function listFallbackProcedures(locale: SupportedLocale): Promise<ProcedureDetailData[]> {
  return FALLBACK_PROCEDURES[locale].map((procedure) => mapFallbackProcedure(locale, procedure));
}

const listProceduresUncached = async (locale: SupportedLocale): Promise<ProcedureDetailData[]> => {
  const fallback = await listFallbackProcedures(locale);
  const client = createPrismicClient();
  if (!client) {
    return fallback;
  }

  try {
    const documents = (await client.getAllByType(PROCEDURE_TYPE, {
      lang: toPrismicLocale(locale),
      orderings: [{ field: "my.procedure.title", direction: "asc" }],
    })) as prismic.PrismicDocument<PrismicDocumentData>[];

    if (documents.length === 0) {
      return fallback;
    }

    return documents.map((document, index) =>
      mapPrismicProcedureDocument(locale, document, fallback[index] ?? fallback[0]),
    );
  } catch (error) {
    console.error(`[prismic] Failed to load procedures for locale '${locale}'.`, error);
    return fallback;
  }
};

const listProcedures =
  process.env.NODE_ENV === "development"
    ? listProceduresUncached
    : cache(listProceduresUncached);

const procedureAdapter: ProcedureAdapter = {
  async list(locale) {
    const procedures = await listProcedures(locale);
    return procedures.map<ProcedureSummaryData>(
      ({ slug, locale: procedureLocale, title, category, description, ctaLabel, source }) => ({
        slug,
        locale: procedureLocale,
        title,
        category,
        description,
        ctaLabel,
        source,
      }),
    );
  },

  async getBySlug(locale, slug) {
    const procedures = await listProcedures(locale);
    return procedures.find((procedure) => procedure.slug === slug) ?? null;
  },

  async listRouteRefs() {
    const entries = await Promise.all(
      (["pt-br", "en-us"] as const).map(async (locale) => {
        const procedures = await listProcedures(locale);
        return procedures.map<ProcedureRouteRef>((procedure) => ({
          locale,
          slug: procedure.slug,
          source: procedure.source,
        }));
      }),
    );

    return entries.flat();
  },
};

export function createProcedureAdapter(): ProcedureAdapter {
  return procedureAdapter;
}
