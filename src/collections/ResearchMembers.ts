import type { CollectionConfig } from "payload";
import { researchLines } from "@/content/research-lines";
import { slugField } from "@/fields/slug";
import { personFields } from "@/fields/person";
import { editorialAccess } from "@/access/editorial";
import { revalidateAfterChange, revalidateAfterDelete } from "@/hooks/revalidate";

/** Opciones del selector de línea, derivadas de la única fuente `research-lines.ts`. */
const lineOptions = researchLines.map((line) => ({
  label: `RL${line.number} · ${line.title.es}`,
  value: line.slug,
}));

/**
 * Integrantes de las líneas de investigación.
 *
 * Aparecen en el grid de su línea (justo bajo el hero, según pidió INCAR²) y
 * tienen página propia en `/investigacion/equipo/[slug]`.
 *
 * El orden del grid lo dictó INCAR² por jerarquía y NO es alfabético, así que
 * se guarda explícitamente en `order`: en la base de datos no existe el "orden
 * de definición" que antes daba el archivo `research-members.ts`.
 */
export const ResearchMembers: CollectionConfig = {
  slug: "research-members",
  labels: {
    singular: "Integrante",
    plural: "Integrantes de investigación",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "line", "role", "order"],
    group: "Equipo",
  },
  access: editorialAccess,
  hooks: {
    afterChange: [revalidateAfterChange("research-members")],
    afterDelete: [revalidateAfterDelete("research-members")],
  },
  defaultSort: "order",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nombre",
      required: true,
      admin: { description: "Con título académico, tal como debe verse: “Dra. Ana Pérez”." },
    },
    slugField("name"),
    {
      name: "line",
      type: "select",
      label: "Línea de investigación",
      options: lineOptions,
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "order",
      type: "number",
      label: "Orden en el grid",
      required: true,
      defaultValue: 0,
      admin: {
        position: "sidebar",
        step: 1,
        description:
          "Menor número, antes en la grilla. INCAR² define el orden por jerarquía (PI primero), no alfabético.",
      },
    },
    ...personFields,
  ],
};
