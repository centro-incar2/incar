import type { CollectionConfig } from "payload";
import { researchLines } from "@/content/research-lines";
import { editorialAccess } from "@/access/editorial";
import { revalidateSiteFromCollection } from "@/hooks/revalidate";

/**
 * Textos de las ocho líneas de investigación.
 *
 * Es una colección y no ocho "globals" porque las ocho páginas comparten
 * exactamente la misma estructura: en el panel se ve una lista de ocho líneas
 * con un mismo formulario, en vez de ocho entradas casi idénticas.
 *
 * `line` identifica a cuál corresponde cada ficha y es la clave que usa
 * `src/lib/cms/pages.ts` para fusionar estos textos sobre el namespace de
 * traducción correspondiente. NO se administran aquí el nombre, el número ni la
 * URL de la línea: eso es estructura (`src/content/research-lines.ts`), de la
 * que dependen el selector de Publicaciones y la ficha de cada integrante.
 */
export const ResearchLineContent: CollectionConfig = {
  slug: "research-line-content",
  labels: {
    singular: "Línea de investigación",
    plural: "Líneas de investigación",
  },
  admin: {
    useAsTitle: "adminTitle",
    defaultColumns: ["adminTitle", "line"],
    group: "Páginas",
    description:
      "Textos de cada línea. Lo que se deje vacío conserva el texto actual del sitio.",
  },
  access: editorialAccess,
  versions: { drafts: false, maxPerDoc: 50 },
  hooks: {
    afterChange: [revalidateSiteFromCollection],
  },
  defaultSort: "line",
  fields: [
    {
      name: "line",
      type: "select",
      label: "Línea",
      required: true,
      unique: true,
      index: true,
      options: researchLines.map((line) => ({
        label: `RL${line.number} · ${line.title.es}`,
        value: line.slug,
      })),
      admin: {
        position: "sidebar",
        description: "Cada línea puede tener una sola ficha de textos.",
      },
    },
    {
      // Payload necesita un campo de texto plano para titular la fila del
      // listado; `line` es un select y mostraría el slug crudo.
      name: "adminTitle",
      type: "text",
      label: "Nombre de la línea",
      admin: {
        readOnly: true,
        description: "Se completa solo a partir de la línea seleccionada.",
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            const slug = (siblingData as { line?: unknown })?.line;
            const match = researchLines.find((item) => item.slug === slug);
            return match ? `RL${match.number} · ${match.title.es}` : undefined;
          },
        ],
      },
    },
    {
      type: "collapsible",
      label: "Portada de la línea",
      admin: { initCollapsed: true },
      fields: [
        { name: "eyebrow", type: "text", label: "Antetítulo", localized: true },
        { name: "title", type: "textarea", label: "Título", localized: true },
        {
          name: "titleAccent",
          type: "text",
          label: "Palabra destacada del título",
          localized: true,
          admin: {
            description:
              "Solo la usa RL1, cuyo título se parte en dos colores. Dejar vacío en las demás.",
          },
        },
        { name: "lead", type: "textarea", label: "Bajada", localized: true },
        { name: "heroCta", type: "text", label: "Botón", localized: true },
      ],
    },
    {
      type: "collapsible",
      label: "Enfoque",
      admin: { initCollapsed: true },
      fields: [
        { name: "focusEyebrow", type: "text", label: "Antetítulo", localized: true },
        { name: "focusText", type: "textarea", label: "Texto", localized: true },
      ],
    },
    {
      type: "collapsible",
      label: "Objetivos principales",
      admin: { initCollapsed: true },
      fields: [
        { name: "objEyebrow", type: "text", label: "Antetítulo", localized: true },
        { name: "objTitle", type: "text", label: "Título", localized: true },
        {
          name: "objectives",
          type: "array",
          label: "Objetivos",
          localized: true,
          labels: { singular: "Objetivo", plural: "Objetivos" },
          fields: [{ name: "value", type: "textarea", label: "Texto", required: true }],
        },
      ],
    },
    {
      type: "collapsible",
      label: "Transferencia tecnológica",
      admin: { initCollapsed: true },
      fields: [
        { name: "transferEyebrow", type: "text", label: "Antetítulo", localized: true },
        { name: "transferTitle", type: "text", label: "Título", localized: true },
        { name: "transferText", type: "textarea", label: "Texto", localized: true },
        {
          name: "transferItems",
          type: "array",
          label: "Aplicaciones",
          localized: true,
          labels: { singular: "Aplicación", plural: "Aplicaciones" },
          fields: [{ name: "value", type: "textarea", label: "Texto", required: true }],
        },
      ],
    },
    {
      type: "collapsible",
      label: "Cierre",
      admin: { initCollapsed: true },
      fields: [
        { name: "closingEyebrow", type: "text", label: "Antetítulo", localized: true },
        { name: "closingTitle", type: "text", label: "Título", localized: true },
        {
          name: "closingTitleAccent",
          type: "text",
          label: "Palabra destacada del título",
          localized: true,
        },
        { name: "closingText", type: "textarea", label: "Texto", localized: true },
        { name: "closingCta", type: "text", label: "Botón", localized: true },
      ],
    },
  ],
};
