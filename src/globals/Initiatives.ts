import { pageGlobal, section } from "./page-fields";

/** Página Iniciativas. */
export const Initiatives = pageGlobal({
  slug: "initiatives",
  label: "Iniciativas",
  description:
    "Textos de la página de iniciativas. Lo que se deje vacío conserva el texto actual del sitio.",
  fields: [
    section("Encabezado", [
      { name: "eyebrow", label: "Antetítulo" },
      { name: "title", label: "Título" },
      { name: "sectionLabel", label: "Etiqueta de cada tarjeta" },
    ]),
    section("Iniciativa Caligus", [
      { name: "caligusTitle", label: "Título" },
      { name: "caligusText", label: "Texto", kind: "textarea" },
    ]),
    section("Iniciativa SRS y Tenacibaculum", [
      { name: "srsTitle", label: "Título" },
      { name: "srsText1", label: "Texto 1", kind: "textarea" },
      { name: "srsText2", label: "Texto 2", kind: "textarea" },
    ]),
    section("Acuicultura Restaurativa", [
      { name: "restorativeTitle", label: "Título" },
      {
        name: "restorativeNote",
        label: "Aviso",
        kind: "textarea",
        description: "Mensaje mientras la iniciativa esté en preparación.",
      },
    ]),
  ],
});
