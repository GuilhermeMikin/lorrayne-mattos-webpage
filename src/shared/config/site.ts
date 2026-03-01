export const SITE_NAME = "Dra. Lorrayne Mattos";
export const SITE_TITLE = "Dra. Lorrayne Mattos | Biomédica Esteta";
export const SITE_DESCRIPTION =
  "Estética avançada, harmonização do olhar e rejuvenescimento facial natural em Uberlândia - MG.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://example.com";

export const INSTAGRAM_URL = "https://www.instagram.com/lorraynebmattos/";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Av+Ortizio+Borges+823+Santa+Monica+Uberlandia+MG";
export const ADDRESS_LABEL = "Uberlândia - MG";
export const ADDRESS_FULL =
  "Av. Ortizio Borges, 823 - Santa Monica, Uberlandia - MG";
export const WHATSAPP_HREF =
  process.env.NEXT_PUBLIC_WHATSAPP_HREF?.trim() ||
  "https://wa.me/5534998989263?text=Ol%C3%A1%2C%20Lorrayne!%20Vim%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20agendar%20um%20atendimento.";
export const DEFAULT_OG_IMAGE = "/lorrayne1.jpeg";

export function buildAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
