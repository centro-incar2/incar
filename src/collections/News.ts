import type { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";
import { revalidateAfterChange, revalidateAfterDelete } from "@/hooks/revalidate";
import { editorialAccess } from "@/access/editorial";

/**
 * Noticias del centro (migradas de centroincar.cl).
 *
 * Título, extracto, texto alternativo y cuerpo varían por idioma → localizados.
 * El texto en español es verbatim de la nota original; el inglés es traducción
 * fiel (INCAR aportará las oficiales). `content` es richText (Lexical) para
 * preservar la estructura de párrafos, subtítulos y listas de la nota.
 */
export const News: CollectionConfig = {
  slug: "news",
  labels: {
    singular: "Noticia",
    plural: "Noticias",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "featured"],
    group: "Contenido",
  },
  access: editorialAccess,
  hooks: {
    afterChange: [revalidateAfterChange("news")],
    afterDelete: [revalidateAfterDelete("news")],
  },
  defaultSort: "-date",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Título",
      localized: true,
      required: true,
    },
    slugField("title"),
    {
      name: "date",
      type: "date",
      label: "Fecha de publicación",
      required: true,
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly", displayFormat: "yyyy-MM-dd" },
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Imagen destacada",
      required: true,
    },
    {
      name: "imageAlt",
      type: "text",
      label: "Texto alternativo de la imagen",
      localized: true,
    },
    {
      name: "sourceUrl",
      type: "text",
      label: "Enlace a la nota original",
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Extracto",
      localized: true,
      required: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Cuerpo de la noticia",
      localized: true,
      required: true,
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
