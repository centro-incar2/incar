import { pageGlobal, section } from "./page-fields";

/** Página Transferencia Tecnológica (CIA-INCAR²). */
export const Transfer = pageGlobal({
  slug: "transfer",
  label: "Transferencia Tecnológica",
  description:
    "Textos de la página de transferencia tecnológica. Lo que se deje vacío conserva el texto actual.",
  fields: [
    section("Encabezado", [
      { name: "eyebrow", label: "Antetítulo" },
      { name: "title", label: "Título" },
      { name: "missionText1", label: "Misión · Texto 1", kind: "textarea" },
      { name: "missionText2", label: "Misión · Texto 2", kind: "textarea" },
    ]),
    section("Programas SFERA e INAH", [
      { name: "programsEyebrow", label: "Antetítulo" },
      { name: "programsTitle", label: "Título" },
      { name: "whatIs", label: "Etiqueta “¿Qué es?”" },
      { name: "sferaName", label: "SFERA · Sigla" },
      { name: "sferaFull", label: "SFERA · Nombre completo", kind: "textarea" },
      { name: "sferaText", label: "SFERA · Descripción", kind: "textarea" },
      { name: "inahName", label: "INAH · Sigla" },
      { name: "inahFull", label: "INAH · Nombre completo", kind: "textarea" },
      { name: "inahText1", label: "INAH · Texto 1", kind: "textarea" },
      { name: "inahText2", label: "INAH · Texto 2", kind: "textarea" },
      { name: "inahText3", label: "INAH · Texto 3", kind: "textarea" },
    ]),
    section("Sinergia SFERA – INAH", [
      { name: "synergyTitle", label: "Título" },
      { name: "synergyText1", label: "Texto 1", kind: "textarea" },
      { name: "synergyText2", label: "Texto 2", kind: "textarea" },
    ]),
    section("Objetivos", [
      { name: "objGeneralTitle", label: "Título · Objetivo general" },
      { name: "objGeneralText", label: "Texto · Objetivo general", kind: "textarea" },
      { name: "objSpecificTitle", label: "Título · Objetivos específicos" },
      { name: "objectives", label: "Objetivos específicos", kind: "list" },
    ]),
    section("Llamado a la acción", [
      { name: "contactText", label: "Texto", kind: "textarea" },
      { name: "contactEmail", label: "Correo de contacto" },
    ]),
  ],
});
