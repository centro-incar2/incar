import { defineRouting } from "next-intl/routing";

/**
 * Configuración central de idiomas y rutas del sitio.
 *
 * Las claves de `pathnames` son la ruta canónica (basada en el árbol de carpetas
 * de `app/[locale]`). Cada clave mapea a su slug localizado por idioma, lo que
 * genera URLs amigables e independientes por idioma con SEO propio:
 *   ES → /quienes-somos     EN → /en/about-us
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // El prefijo del idioma por defecto (es) se omite para URLs más limpias.
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    // Quiénes Somos + subpáginas
    "/quienes-somos": { es: "/quienes-somos", en: "/about-us" },
    "/gobernanza": { es: "/gobernanza", en: "/governance" },
    "/mision-y-vision": { es: "/mision-y-vision", en: "/mission-and-vision" },
    "/equipo-de-gestion": { es: "/equipo-de-gestion", en: "/management-team" },
    "/equipo-de-gestion/[slug]": {
      es: "/equipo-de-gestion/[slug]",
      en: "/management-team/[slug]",
    },
    // Líneas de Investigación (índice + 8 líneas)
    "/investigacion": { es: "/investigacion", en: "/research" },
    "/investigacion/nuevas-vacunas-para-peces": {
      es: "/investigacion/nuevas-vacunas-para-peces",
      en: "/research/new-fish-vaccines",
    },
    "/investigacion/enfermedades-y-resistencia-antimicrobiana": {
      es: "/investigacion/enfermedades-y-resistencia-antimicrobiana",
      en: "/research/fish-diseases-antimicrobial-resistance",
    },
    "/investigacion/soluciones-omicas": {
      es: "/investigacion/soluciones-omicas",
      en: "/research/omics-solutions",
    },
    "/investigacion/estres-y-bienestar-animal": {
      es: "/investigacion/estres-y-bienestar-animal",
      en: "/research/stress-and-animal-welfare",
    },
    "/investigacion/impactos-en-ecosistemas": {
      es: "/investigacion/impactos-en-ecosistemas",
      en: "/research/ecosystem-impacts",
    },
    "/investigacion/resiliencia-de-la-acuicultura": {
      es: "/investigacion/resiliencia-de-la-acuicultura",
      en: "/research/aquaculture-resilience",
    },
    "/investigacion/interacciones-sustentables": {
      es: "/investigacion/interacciones-sustentables",
      en: "/research/sustainable-interactions",
    },
    "/investigacion/impactos-socioeconomicos": {
      es: "/investigacion/impactos-socioeconomicos",
      en: "/research/socioeconomic-impacts",
    },
    // Perfil individual de integrante (ruta dinámica compartida por todas las líneas)
    "/investigacion/equipo/[slug]": {
      es: "/investigacion/equipo/[slug]",
      en: "/research/team/[slug]",
    },
    // Secciones de primer nivel
    "/iniciativas": { es: "/iniciativas", en: "/initiatives" },
    "/publicaciones": { es: "/publicaciones", en: "/publications" },
    "/publicaciones/[slug]": {
      es: "/publicaciones/[slug]",
      en: "/publications/[slug]",
    },
    "/colaboraciones": { es: "/colaboraciones", en: "/collaborations" },
    "/servicios-y-tecnologia": {
      es: "/servicios-y-tecnologia",
      en: "/services-and-technology",
    },
    "/politicas-publicas": {
      es: "/politicas-publicas",
      en: "/public-policy",
    },
    "/transferencia-tecnologica": {
      es: "/transferencia-tecnologica",
      en: "/technology-transfer",
    },
    "/comunicaciones-y-vinculacion": {
      es: "/comunicaciones-y-vinculacion",
      en: "/communications-and-outreach",
    },
    "/eventos": { es: "/eventos", en: "/events" },
    "/noticias": { es: "/noticias", en: "/news" },
    "/noticias/[slug]": {
      es: "/noticias/[slug]",
      en: "/news/[slug]",
    },
    "/contacto": { es: "/contacto", en: "/contact" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
/** Rutas sin segmentos dinámicos (navegables con un href simple, sin params). */
export type StaticPathname = Exclude<AppPathname, `${string}[slug]${string}`>;
