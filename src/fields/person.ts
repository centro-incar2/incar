import type { Field } from "payload";

/**
 * Campos compartidos por las fichas de personas (integrantes de línea y equipo
 * de gestión). Ambas colecciones muestran la misma tarjeta y la misma página de
 * perfil, así que comparten forma para no duplicar definiciones ni divergir.
 *
 * Criterio de localización: el nombre y el correo son iguales en ambos idiomas;
 * el cargo, la biografía, los títulos y los proyectos sí cambian.
 */

/** Enlaces académicos y profesionales, todos opcionales. */
export const linksField: Field = {
  name: "links",
  type: "group",
  label: "Enlaces",
  admin: {
    description: "Perfiles externos. Dejar vacío el que la persona no tenga.",
  },
  fields: [
    { name: "linkedin", type: "text", label: "LinkedIn" },
    { name: "orcid", type: "text", label: "ORCID" },
    { name: "scholar", type: "text", label: "Google Scholar" },
    { name: "researchgate", type: "text", label: "ResearchGate" },
  ],
};

/**
 * Lista de textos por idioma (títulos académicos, proyectos).
 *
 * Es un `array` localizado: cada idioma guarda sus propias filas, porque el
 * material de INCAR² a veces trae distinta cantidad de ítems en español y en
 * inglés (e incluso alguno solo en un idioma).
 */
export const textListField = (
  name: string,
  label: string,
  description: string,
): Field => ({
  name,
  type: "array",
  label,
  localized: true,
  admin: { description, initCollapsed: true },
  labels: { singular: "Ítem", plural: "Ítems" },
  fields: [{ name: "value", type: "textarea", label: "Texto", required: true }],
});

/** Bloque común: cargo, correo, foto, enlaces y ficha larga. */
export const personFields: Field[] = [
  {
    name: "role",
    type: "text",
    label: "Cargo",
    localized: true,
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Correo electrónico",
  },
  {
    name: "photo",
    type: "upload",
    relationTo: "media",
    label: "Fotografía",
    admin: {
      description:
        "Retrato vertical. Si se deja vacío se muestra el isotipo de INCAR² en su lugar.",
    },
  },
  linksField,
  {
    name: "bio",
    type: "textarea",
    label: "Biografía",
    localized: true,
    admin: {
      description:
        "Separar los párrafos con una línea en blanco. Si queda vacía, la sección no aparece en el perfil.",
    },
  },
  textListField(
    "degrees",
    "Títulos y grados académicos",
    "Un ítem por título, del más reciente al más antiguo.",
  ),
  textListField(
    "projects",
    "Proyectos",
    "Un ítem por proyecto. Si la persona tiene muchos, cargar los más relevantes.",
  ),
];
