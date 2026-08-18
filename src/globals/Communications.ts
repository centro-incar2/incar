import { pageGlobal, section } from "./page-fields";

/** Página Comunicaciones y Vinculación. */
export const Communications = pageGlobal({
  slug: "communications",
  label: "Comunicaciones y Vinculación",
  description:
    "Textos de la página de comunicaciones y vinculación. Lo que se deje vacío conserva el texto actual.",
  fields: [
    section("Encabezado", [
      { name: "eyebrow", label: "Antetítulo" },
      { name: "title", label: "Título" },
      { name: "lead", label: "Bajada", kind: "textarea" },
      { name: "heroCta", label: "Botón" },
    ]),
    section("Diseminación", [
      { name: "disseminationEyebrow", label: "Antetítulo" },
      { name: "disseminationText", label: "Texto", kind: "textarea" },
      { name: "disseminationImageAlt", label: "Texto alternativo de la imagen", kind: "textarea" },
    ]),
    section("Vinculación social (Outreach)", [
      { name: "outreachEyebrow", label: "Antetítulo" },
      { name: "outreachTitle", label: "Título" },
      { name: "outreachText", label: "Texto", kind: "textarea" },
      { name: "outreachImageAlt", label: "Texto alternativo de la imagen", kind: "textarea" },
    ]),
    section("Ecosistema de actores", [
      { name: "ecosystemEyebrow", label: "Antetítulo" },
      { name: "ecosystemTitle", label: "Título", kind: "textarea" },
      { name: "mapeoEyebrow", label: "Mapeo · Antetítulo" },
      { name: "mapeoTitle", label: "Mapeo · Título", kind: "textarea" },
      {
        name: "mapeoImageAlt",
        label: "Mapeo · Texto alternativo de la infografía",
        kind: "textarea",
        description:
          "Describe el contenido de la infografía para quien no puede verla. Conviene que sea detallado.",
      },
    ]),
  ],
});
