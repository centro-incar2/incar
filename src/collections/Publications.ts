import type { CollectionConfig } from "payload";
import { researchLines } from "@/content/research-lines";
import { slugField } from "@/fields/slug";
import { revalidateAfterChange, revalidateAfterDelete } from "@/hooks/revalidate";
import { editorialAccess } from "@/access/editorial";

/** Opciones del selector de línea, derivadas de la única fuente `research-lines.ts`. */
const lineOptions = researchLines.map((line) => ({
  label: `RL${line.number} · ${line.title.es}`,
  value: line.slug,
}));

/**
 * Publicaciones científicas de INCAR² (papers).
 *
 * Los datos bibliográficos (título, autores, revista) son verbatim y comunes a
 * ambos idiomas → campos NO localizados. El resumen y el cuerpo (`summary`,
 * `content`) sí varían por idioma → localizados. `content` es richText (Lexical)
 * para permitir edición enriquecida del abstract desde el panel.
 */
export const Publications: CollectionConfig = {
  slug: "publications",
  labels: {
    singular: "Publicación",
    plural: "Publicaciones",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "year", "line", "featured"],
    group: "Contenido",
  },
  access: editorialAccess,
  hooks: {
    afterChange: [revalidateAfterChange("publications")],
    afterDelete: [revalidateAfterDelete("publications")],
  },
  defaultSort: "-date",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Título",
      required: true,
    },
    slugField("title"),
    {
      type: "row",
      fields: [
        {
          name: "year",
          type: "number",
          label: "Año",
          required: true,
          min: 1900,
          max: 2100,
          admin: { width: "33%" },
        },
        {
          name: "date",
          type: "date",
          label: "Fecha",
          required: true,
          admin: {
            width: "33%",
            date: { pickerAppearance: "dayOnly", displayFormat: "yyyy-MM-dd" },
          },
        },
        {
          name: "line",
          type: "select",
          label: "Línea de investigación",
          required: true,
          options: lineOptions,
          admin: { width: "34%" },
        },
      ],
    },
    {
      name: "authors",
      type: "textarea",
      label: "Autores",
      required: true,
    },
    {
      name: "journal",
      type: "text",
      label: "Revista / referencia",
      required: true,
    },
    {
      name: "url",
      type: "text",
      label: "DOI / enlace al artículo original",
      admin: {
        description:
          "Si no hay contenido interno, la tarjeta enlaza directamente aquí.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Imagen",
      // Las publicaciones ya no muestran fotografía: cada una se identifica con
      // el ícono de su línea de investigación. El campo se oculta del panel (en
      // vez de eliminarlo) para no alterar el esquema de la base de datos.
      admin: { hidden: true },
    },
    {
      name: "summary",
      type: "textarea",
      label: "Resumen breve",
      localized: true,
      admin: {
        description: "Síntesis para la tarjeta y metadatos. Distinto por idioma.",
      },
    },
    {
      name: "content",
      type: "richText",
      label: "Contenido (abstract)",
      localized: true,
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Destacada",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
  ],
};
