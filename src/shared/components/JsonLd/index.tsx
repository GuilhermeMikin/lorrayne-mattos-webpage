import {
  ADDRESS_LABEL,
  DEFAULT_OG_IMAGE,
  INSTAGRAM_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/shared/config/site";

const PROFESSIONAL_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  jobTitle: "Biomédica Esteta",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  sameAs: [INSTAGRAM_URL],
  knowsAbout: [
    "Estética avançada",
    "Harmonização do olhar",
    "Rejuvenescimento facial natural",
    "Lash lifting",
    "Brow lamination",
    "Limpeza de pele",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Uberlândia",
    addressRegion: "MG",
    addressCountry: "BR",
  },
  areaServed: ADDRESS_LABEL,
} as const;

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(PROFESSIONAL_JSON_LD) }}
    />
  );
}
