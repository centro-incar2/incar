import { pageGlobal, section } from "./page-fields";

/** Página Colaboración Nacional e Internacional. */
export const Collaborations = pageGlobal({
  slug: "collaborations",
  label: "Colaboraciones",
  description:
    "Textos de la página de colaboración nacional e internacional. Lo que se deje vacío conserva el texto actual.",
  fields: [
    section("Encabezado", [
      { name: "eyebrow", label: "Antetítulo" },
      { name: "title", label: "Título" },
      { name: "lead", label: "Bajada", kind: "textarea" },
    ]),
    section("Colaboración nacional", [
      { name: "nationalTitle", label: "Título" },
      { name: "nationalText", label: "Texto", kind: "textarea" },
    ]),
    section("Red internacional", [
      { name: "internationalTitle", label: "Título" },
      { name: "internationalText", label: "Texto", kind: "textarea" },
    ]),
    section("Mecanismos de colaboración", [
      { name: "mechanismsTitle", label: "Título" },
      { name: "mechanismsIntro", label: "Introducción", kind: "textarea" },
      {
        name: "mechanisms",
        label: "Mecanismos",
        kind: "pairs",
        description: "El título se destaca y la descripción lo completa en la misma línea.",
      },
      { name: "ecosText", label: "Proyecto ECOS-ANID", kind: "textarea" },
      { name: "internshipsText", label: "Pasantías", kind: "textarea" },
    ]),
    section("Alianza con NATIH", [
      { name: "natihTitle", label: "Título" },
      { name: "natihText1", label: "Texto 1", kind: "textarea" },
      { name: "natihText2", label: "Texto 2", kind: "textarea" },
    ]),
    section("Franja de logotipos", [
      { name: "logosEyebrow", label: "Antetítulo" },
      { name: "logosTitle", label: "Título" },
      { name: "groupSponsor", label: "Grupo · Patrocinante y asociadas" },
      { name: "groupNational", label: "Grupo · Nacionales" },
      { name: "groupAllies", label: "Grupo · Aliados estratégicos" },
      { name: "groupInternational", label: "Grupo · Internacionales" },
    ]),
  ],
});
