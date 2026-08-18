import { pageGlobal, section } from "./page-fields";

/**
 * Página Políticas Públicas.
 *
 * Los documentos (21 policy briefs, asesorías parlamentarias y otros PDF) viven
 * en `src/content/` y se sirven desde `public/`; pasarlos al panel es una etapa
 * aparte. Aquí solo están los textos que los enmarcan.
 */
export const PublicPolicy = pageGlobal({
  slug: "public-policy",
  label: "Políticas Públicas",
  description:
    "Textos de la página de políticas públicas. Lo que se deje vacío conserva el texto actual.",
  fields: [
    section("Encabezado", [
      { name: "title", label: "Título" },
      { name: "heroTitle", label: "Título principal", kind: "textarea" },
      { name: "intro1", label: "Introducción 1", kind: "textarea" },
      { name: "intro2", label: "Introducción 2", kind: "textarea" },
    ]),
    section("Por qué comunicar ciencia", [
      { name: "whyTitle", label: "Título", kind: "textarea" },
      { name: "whyLead", label: "Bajada", kind: "textarea" },
      { name: "axis1Title", label: "Eje 1 · Título", kind: "textarea" },
      { name: "axis1Text", label: "Eje 1 · Texto", kind: "textarea" },
      { name: "axis2Title", label: "Eje 2 · Título", kind: "textarea" },
      { name: "axis2Text", label: "Eje 2 · Texto", kind: "textarea" },
      { name: "axis3Title", label: "Eje 3 · Título", kind: "textarea" },
      { name: "axis3Text", label: "Eje 3 · Texto", kind: "textarea" },
    ]),
    section("Pestañas y listados", [
      { name: "listTitle", label: "Título del listado", kind: "textarea" },
      { name: "tabPolicyBrief", label: "Pestaña · Policy Brief" },
      { name: "tabAdvisory", label: "Pestaña · Asesoría parlamentaria" },
      { name: "tabOther", label: "Pestaña · Otros documentos" },
      { name: "briefLabel", label: "Etiqueta · Policy Brief" },
      { name: "advisoryLabel", label: "Etiqueta · Asesoría parlamentaria" },
      { name: "otherDocLabel", label: "Etiqueta · Documento" },
      { name: "download", label: "Botón · Descargar PDF" },
      { name: "downloadSummary", label: "Botón · Descargar resumen" },
    ]),
    section("Asesorías parlamentarias", [
      { name: "advisoryTitle", label: "Título", kind: "textarea" },
      { name: "advisoryIntro1", label: "Texto 1", kind: "textarea" },
      { name: "advisoryIntro2", label: "Texto 2", kind: "textarea" },
      { name: "advisoryIntro3", label: "Texto 3", kind: "textarea" },
    ]),
    section("Otros documentos", [
      { name: "otherTitle", label: "Título" },
      { name: "otherIntro1", label: "Texto 1", kind: "textarea" },
      { name: "otherIntro2", label: "Texto 2", kind: "textarea" },
    ]),
  ],
});
