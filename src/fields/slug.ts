import type { Field } from "payload";

/** Normaliza un texto a slug URL-safe (minúsculas, guiones, sin acentos). */
export const slugify = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "") // quita diacríticos combinantes (á → a)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Campo `slug` reutilizable. Es la clave pública de la URL (`/publicaciones/[slug]`).
 * Si se deja vacío al crear, se autogenera desde `sourceField`. Único e indexado
 * para búsquedas rápidas y para garantizar URLs sin colisiones.
 */
export const slugField = (sourceField: string): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description:
      "Identificador de la URL. Se genera automáticamente desde el título si se deja vacío.",
  },
  hooks: {
    beforeValidate: [
      ({ value, siblingData }) => {
        if (typeof value === "string" && value.length > 0) {
          return slugify(value);
        }
        const source = (siblingData as Record<string, unknown>)?.[sourceField];
        if (typeof source === "string" && source.length > 0) {
          return slugify(source);
        }
        return value;
      },
    ],
  },
});
