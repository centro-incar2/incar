import { pageGlobal, section } from "./page-fields";

/**
 * Página Gobernanza.
 *
 * Solo los textos: las fotos del Consejo Académico salen de las fichas de cada
 * Investigador Principal (colección Integrantes) y los logotipos de las
 * instituciones y aliados siguen en `src/content/`, pendientes de una etapa
 * posterior del CMS.
 */
export const Governance = pageGlobal({
  slug: "governance",
  label: "Gobernanza",
  description:
    "Textos de la página Gobernanza. Lo que se deje vacío conserva el texto actual del sitio.",
  fields: [
    section("Encabezado", [
      { name: "eyebrow", label: "Antetítulo" },
      { name: "title", label: "Título" },
    ]),
    section("Consejo Académico", [
      { name: "councilEyebrow", label: "Antetítulo" },
      { name: "councilTitle", label: "Título" },
      { name: "councilText", label: "Texto", kind: "textarea" },
    ]),
    section("Instituciones que conforman el centro", [
      { name: "institutionsTitle", label: "Título" },
      { name: "institutionsText", label: "Texto", kind: "textarea" },
    ]),
    section("Directorio", [
      { name: "boardTitle", label: "Título" },
      { name: "boardText1", label: "Texto 1", kind: "textarea" },
      { name: "boardText2", label: "Texto 2", kind: "textarea" },
    ]),
    section("Alianzas estratégicas", [
      { name: "alliancesEyebrow", label: "Antetítulo" },
      { name: "alliancesTitle", label: "Título" },
      { name: "alliancesText1", label: "Texto 1", kind: "textarea" },
      { name: "alliancesText2", label: "Texto 2", kind: "textarea" },
    ]),
    section("Comité Asesor Nacional", [
      { name: "advisoryTitle", label: "Título" },
      { name: "advisoryText1", label: "Texto 1", kind: "textarea" },
      { name: "advisoryText2", label: "Texto 2", kind: "textarea" },
      { name: "advisoryImageAlt", label: "Texto alternativo de la imagen", kind: "textarea" },
    ]),
  ],
});
