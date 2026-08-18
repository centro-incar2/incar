import type { CollectionConfig } from "payload";
import { editorialAccess } from "@/access/editorial";
import { revalidateAfterChange, revalidateAfterDelete } from "@/hooks/revalidate";

/**
 * Fichas de los documentos publicados en Políticas Públicas.
 *
 * Una sola colección cubre los tres listados de la página —Policy Briefs,
 * Asesorías Parlamentarias (BCN) y Otros Documentos— porque comparten la misma
 * ficha; `kind` decide en qué pestaña aparece cada uno.
 *
 * Los títulos NO están localizados: INCAR² los entregó solo en español y son
 * verbatim, incluidas sus mayúsculas y tildes originales. La descripción sí se
 * localiza, por si más adelante se traduce.
 */
export const PolicyDocuments: CollectionConfig = {
  slug: "policy-documents",
  labels: {
    singular: "Documento",
    plural: "Documentos",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "kind", "number"],
    group: "Documentos",
    description:
      "Policy Briefs, asesorías parlamentarias y otros documentos de la página Políticas Públicas.",
  },
  access: editorialAccess,
  hooks: {
    afterChange: [revalidateAfterChange("policy-documents")],
    afterDelete: [revalidateAfterDelete("policy-documents")],
  },
  // Más recientes primero: es el orden con que INCAR² los publica.
  defaultSort: "-number",
  fields: [
    {
      name: "kind",
      type: "select",
      label: "Tipo",
      required: true,
      defaultValue: "policy-brief",
      options: [
        { label: "Policy Brief", value: "policy-brief" },
        { label: "Asesoría Parlamentaria (BCN)", value: "advisory" },
        { label: "Otro documento", value: "other" },
      ],
      admin: { position: "sidebar", description: "Define en qué pestaña aparece." },
    },
    {
      name: "number",
      type: "number",
      label: "Número",
      admin: {
        position: "sidebar",
        step: 1,
        description:
          "Correlativo que se muestra en la tarjeta. Los “otros documentos” no lo usan.",
      },
    },
    {
      name: "title",
      type: "text",
      label: "Título",
      required: true,
      admin: { description: "Verbatim, tal como lo entregó INCAR²." },
    },
    {
      name: "date",
      type: "text",
      label: "Fecha",
      admin: {
        description: "Texto libre, como “Octubre 2020”. Solo lo usan los otros documentos.",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Descripción",
      localized: true,
      admin: { description: "Solo la muestran los otros documentos." },
    },
    {
      name: "file",
      type: "upload",
      relationTo: "document-files",
      label: "Archivo PDF",
      required: true,
    },
    {
      name: "summaryFile",
      type: "upload",
      relationTo: "document-files",
      label: "Resumen ejecutivo (PDF)",
      admin: {
        description: "Opcional. Añade un segundo botón de descarga en la tarjeta.",
      },
    },
    {
      name: "annexes",
      type: "array",
      label: "Anexos",
      labels: { singular: "Anexo", plural: "Anexos" },
      admin: { description: "Archivos adicionales que acompañan al documento." },
      fields: [
        { name: "label", type: "text", label: "Nombre del anexo", required: true },
        {
          name: "file",
          type: "upload",
          relationTo: "document-files",
          label: "Archivo",
          required: true,
        },
      ],
    },
  ],
};
