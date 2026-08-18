import { pageGlobal, section } from "./page-fields";

/**
 * Página Eventos.
 *
 * Nota de contenido: `srsText1` conserva el typo del documento original de
 * INCAR² (“SRS 202” en vez de “SRS 2026”). Está así a propósito, por la regla
 * de cargar los textos verbatim; corregirlo es decisión de INCAR², no nuestra.
 */
export const Events = pageGlobal({
  slug: "events",
  label: "Eventos",
  description:
    "Textos de la página de eventos. Lo que se deje vacío conserva el texto actual del sitio.",
  fields: [
    section("Encabezado", [
      { name: "eyebrow", label: "Antetítulo" },
      { name: "title", label: "Título" },
      { name: "intro1", label: "Introducción 1", kind: "textarea" },
      { name: "intro2", label: "Introducción 2", kind: "textarea" },
      { name: "intro3", label: "Introducción 3", kind: "textarea" },
      { name: "listEyebrow", label: "Antetítulo del listado" },
      { name: "visitSite", label: "Etiqueta del botón del evento" },
    ]),
    section("SRS 2026", [
      { name: "srsName", label: "Nombre" },
      { name: "srsText1", label: "Texto 1", kind: "textarea" },
      { name: "srsText2", label: "Texto 2", kind: "textarea" },
      { name: "srsText3", label: "Texto 3", kind: "textarea" },
      { name: "srsText4", label: "Texto 4", kind: "textarea" },
      { name: "srsText5", label: "Texto 5", kind: "textarea" },
      { name: "srsUrl", label: "Sitio del evento" },
    ]),
    section("EPIMAR 2027", [
      { name: "epimarName", label: "Nombre" },
      { name: "epimarText1", label: "Texto 1", kind: "textarea" },
      { name: "epimarText2", label: "Texto 2", kind: "textarea" },
      { name: "epimarText3", label: "Texto 3", kind: "textarea" },
      { name: "epimarDatesTitle", label: "Título · Fechas clave" },
      { name: "epimarDates", label: "Fechas clave", kind: "textarea" },
      { name: "epimarUrl", label: "Sitio del evento" },
    ]),
  ],
});
