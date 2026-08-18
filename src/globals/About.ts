import { pageGlobal, section } from "./page-fields";

/**
 * Página Quiénes Somos.
 *
 * `historyParagraphs` es una lista porque el documento corregido de INCAR² ya
 * no trae la misma cantidad de párrafos en español y en inglés (2 y 3), y la
 * grilla de la sección elige 2 o 3 columnas según cuántos haya.
 */
export const About = pageGlobal({
  slug: "about",
  label: "Quiénes Somos",
  description:
    "Textos de la página Quiénes Somos. Lo que se deje vacío conserva el texto actual del sitio.",
  fields: [
    section("Encabezado", [{ name: "eyebrow", label: "Antetítulo" }]),
    section("Historia", [
      { name: "historyTitle", label: "Título de la sección" },
      { name: "history1", label: "Párrafo de apertura", kind: "textarea" },
      { name: "title2", label: "Subtítulo 2", kind: "textarea" },
      { name: "text2", label: "Texto 2", kind: "textarea" },
      { name: "title3", label: "Subtítulo 3", kind: "textarea" },
      {
        name: "historyParagraphs",
        label: "Párrafos de historia",
        kind: "list",
        description:
          "La sección se muestra en 2 o 3 columnas según la cantidad de párrafos.",
      },
    ]),
    section("El centro hoy", [
      { name: "boxTitle", label: "Título del recuadro", kind: "textarea" },
      { name: "text4", label: "Texto del recuadro", kind: "textarea" },
      { name: "institutionsText", label: "Instituciones", kind: "textarea" },
      { name: "cta", label: "Botón" },
      { name: "teamImageAlt", label: "Texto alternativo de la foto de equipo", kind: "textarea" },
    ]),
    section("Misión y visión", [
      { name: "missionTitle", label: "Título · Misión" },
      { name: "missionText", label: "Texto · Misión", kind: "textarea" },
      { name: "visionTitle", label: "Título · Visión" },
      { name: "visionText", label: "Texto · Visión", kind: "textarea" },
    ]),
    section("Objetivos", [
      { name: "objGeneralTitle", label: "Título · Objetivo general" },
      { name: "objGeneralText", label: "Texto · Objetivo general", kind: "textarea" },
      { name: "objTitle", label: "Título · Objetivos específicos" },
      { name: "objectives", label: "Objetivos específicos", kind: "list" },
    ]),
  ],
});
