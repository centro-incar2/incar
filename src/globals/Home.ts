import { pageGlobal, section } from "./page-fields";

/**
 * Página de inicio.
 *
 * Los controles del carrusel (`carouselLabel`, `carouselPrev`, `carouselNext`,
 * `carouselGoTo`) se dejan FUERA a propósito: son etiquetas de accesibilidad
 * para lectores de pantalla, no contenido, y editarlas por error degradaría la
 * navegación por teclado sin que se note en pantalla.
 */
export const Home = pageGlobal({
  slug: "home",
  label: "Inicio",
  description:
    "Textos de la portada. Lo que se deje vacío conserva el texto actual del sitio.",
  fields: [
    section("Portada (hero)", [
      { name: "heroTitle", label: "Título", kind: "textarea" },
      {
        name: "heroTitleAccent",
        label: "Palabra destacada del título",
        description: "Se muestra en color teal, a continuación del título.",
      },
      { name: "heroSubtitle", label: "Bajada", kind: "textarea" },
      { name: "heroCta1", label: "Botón principal" },
      { name: "heroCta2", label: "Botón secundario" },
    ]),
    section("Accesos rápidos", [
      { name: "quickTour", label: "Acceso 1" },
      { name: "quickNetworks", label: "Acceso 2" },
      { name: "quickNews", label: "Acceso 3" },
      { name: "quickDocuments", label: "Acceso 4" },
      { name: "quickPolicy", label: "Acceso 5" },
      { name: "quickEvents", label: "Acceso 6" },
    ]),
    section("Carrusel de destacados", [
      { name: "slideSrsTitle", label: "SRS 2026 · Título" },
      { name: "slideSrsText", label: "SRS 2026 · Texto", kind: "textarea" },
      { name: "slideSrsAlt", label: "SRS 2026 · Texto alternativo de la imagen", kind: "textarea" },
      { name: "slideEpimarTitle", label: "EPIMAR 2027 · Título" },
      { name: "slideEpimarText", label: "EPIMAR 2027 · Texto", kind: "textarea" },
      { name: "slideEpimarAlt", label: "EPIMAR 2027 · Texto alternativo", kind: "textarea" },
      { name: "slidePolicyTitle", label: "Policy Briefs · Título" },
      { name: "slidePolicyText", label: "Policy Briefs · Texto", kind: "textarea" },
      { name: "slidePolicyCta", label: "Policy Briefs · Botón" },
      { name: "slideInitiativesTitle", label: "Iniciativas · Título" },
      { name: "slideInitiativesText", label: "Iniciativas · Texto", kind: "textarea" },
      { name: "slideInitiativesCta", label: "Iniciativas · Botón" },
      { name: "slideMoreInfo", label: "Etiqueta “Más información”" },
    ]),
    section("Líneas de investigación", [
      { name: "researchEyebrow", label: "Antetítulo" },
      { name: "researchTitle", label: "Título", kind: "textarea" },
      { name: "researchText", label: "Texto", kind: "textarea" },
      { name: "researchCta", label: "Botón" },
      { name: "researchImageAlt", label: "Texto alternativo de la imagen", kind: "textarea" },
    ]),
    section("Servicios y transferencia", [
      { name: "stEyebrow", label: "Antetítulo" },
      { name: "stTitle", label: "Título", kind: "textarea" },
      { name: "stText", label: "Texto", kind: "textarea" },
      { name: "stImageAlt", label: "Texto alternativo de la imagen", kind: "textarea" },
      { name: "stWhatIs", label: "Etiqueta “¿Qué es?”" },
      { name: "stSferaFull", label: "SFERA · Nombre completo", kind: "textarea" },
      { name: "stSferaText", label: "SFERA · Descripción", kind: "textarea" },
      { name: "stInahFull", label: "INAH · Nombre completo", kind: "textarea" },
      { name: "stInahText", label: "INAH · Descripción", kind: "textarea" },
      { name: "stSummaryTitle", label: "Título de “En resumen”" },
      { name: "stSummary", label: "En resumen", kind: "list" },
      { name: "stCtaServices", label: "Botón · Servicios" },
      { name: "stCtaTransfer", label: "Botón · Transferencia" },
    ]),
    section("Colaboración", [
      { name: "collaborationEyebrow", label: "Antetítulo de la franja" },
      { name: "collaborationTitle", label: "Título de la franja", kind: "textarea" },
      { name: "collabLabel", label: "Etiqueta de la tarjeta" },
      { name: "collabText", label: "Texto de la tarjeta", kind: "textarea" },
    ]),
    section("Redes sociales e instituciones", [
      { name: "socialEyebrow", label: "Antetítulo" },
      { name: "socialTitle", label: "Título", kind: "textarea" },
      { name: "socialText", label: "Texto", kind: "textarea" },
      { name: "sponsorTitle", label: "Título · Institución patrocinante" },
      { name: "associatedTitle", label: "Título · Instituciones asociadas" },
    ]),
  ],
});
