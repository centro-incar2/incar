import type { CollectionConfig } from "payload";
import { slugField } from "@/fields/slug";
import { personFields } from "@/fields/person";
import { editorialAccess } from "@/access/editorial";
import { revalidateAfterChange, revalidateAfterDelete } from "@/hooks/revalidate";

/**
 * Equipo de gestión del centro (`/equipo-de-gestion`).
 *
 * Se divide en dos grupos —Dirección y Equipo ejecutivo— y se ordena dentro de
 * cada uno con `order`, igual que los integrantes de línea.
 *
 * `memberSlug` cubre a quienes además integran una línea de investigación (el
 * Director y el Director Alterno): en vez de duplicar su ficha, la tarjeta
 * enlaza a su perfil de investigador.
 */
export const ManagementTeam: CollectionConfig = {
  slug: "management-team",
  labels: {
    singular: "Integrante de gestión",
    plural: "Equipo de gestión",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "team", "role", "order"],
    group: "Equipo",
  },
  access: editorialAccess,
  hooks: {
    afterChange: [revalidateAfterChange("management-team")],
    afterDelete: [revalidateAfterDelete("management-team")],
  },
  defaultSort: "order",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nombre",
      required: true,
    },
    slugField("name"),
    {
      name: "team",
      type: "select",
      label: "Grupo",
      required: true,
      defaultValue: "executive",
      options: [
        { label: "Dirección", value: "direction" },
        { label: "Equipo ejecutivo", value: "executive" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "order",
      type: "number",
      label: "Orden dentro del grupo",
      required: true,
      defaultValue: 0,
      admin: { position: "sidebar", step: 1 },
    },
    {
      name: "memberSlug",
      type: "text",
      label: "Perfil de investigador",
      admin: {
        position: "sidebar",
        description:
          "Solo si la persona también integra una línea: identificador de su ficha de investigador. La tarjeta enlazará ahí en vez de crear un perfil aparte.",
      },
    },
    ...personFields,
  ],
};
