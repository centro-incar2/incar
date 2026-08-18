/**
 * Correspondencia entre cada línea de investigación y su namespace de
 * traducción.
 *
 * Vive aparte porque la necesitan tres piezas que no deben depender entre sí:
 * la página de la línea (`ResearchPage`), la colección que administra sus textos
 * y la capa que fusiona el contenido del panel sobre los mensajes. Tenerla
 * duplicada haría que agregar una novena línea funcionara a medias.
 */
export type ResearchNamespace =
  | "Vaccines"
  | "Diseases"
  | "Omics"
  | "Welfare"
  | "Ecosystems"
  | "Resilience"
  | "Interactions"
  | "Socioeconomic";

/** Namespace → slug de la línea. */
export const NAMESPACE_LINE: Record<ResearchNamespace, string> = {
  Vaccines: "nuevas-vacunas-para-peces",
  Diseases: "enfermedades-y-resistencia-antimicrobiana",
  Omics: "soluciones-omicas",
  Welfare: "estres-y-bienestar-animal",
  Ecosystems: "impactos-en-ecosistemas",
  Resilience: "resiliencia-de-la-acuicultura",
  Interactions: "interacciones-sustentables",
  Socioeconomic: "impactos-socioeconomicos",
};

/** Slug de la línea → namespace. */
export const LINE_NAMESPACE: Record<string, ResearchNamespace> = Object.fromEntries(
  Object.entries(NAMESPACE_LINE).map(([namespace, slug]) => [slug, namespace]),
) as Record<string, ResearchNamespace>;
