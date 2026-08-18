import { pageGlobal, section } from "./page-fields";

/**
 * Página Servicios y Tecnologías.
 *
 * Solo los textos de encabezado y cierre: las tres áreas con su listado de
 * servicios viven en `src/content/service-areas.ts` y quedan para una etapa
 * posterior del CMS.
 */
export const Services = pageGlobal({
  slug: "services",
  label: "Servicios y Tecnologías",
  description:
    "Textos de la página de servicios. Lo que se deje vacío conserva el texto actual del sitio.",
  fields: [
    section("Encabezado", [
      { name: "eyebrow", label: "Antetítulo" },
      { name: "title", label: "Título" },
      { name: "lead", label: "Bajada", kind: "textarea" },
    ]),
    section("Áreas", [
      { name: "areaLabel", label: "Etiqueta de área" },
      { name: "servicesTitle", label: "Título · Servicios" },
      { name: "futureTitle", label: "Título · Servicios estratégicos futuros" },
    ]),
    section("Llamado a la acción", [
      { name: "ctaTitle", label: "Título" },
      { name: "ctaText", label: "Texto", kind: "textarea" },
      { name: "ctaEmail", label: "Correo de contacto" },
    ]),
  ],
});
