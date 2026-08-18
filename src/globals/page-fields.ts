import type { Field, GlobalConfig } from "payload";
import { revalidateSite } from "@/hooks/revalidate";
import { isEditor } from "@/access/editorial";

/**
 * Constructor de los "globals" de página: una entrada en el panel por cada
 * página institucional del sitio.
 *
 * Cada campo se llama IGUAL que su clave de traducción en `src/messages/*.json`,
 * porque el contenido del panel se fusiona sobre esas traducciones en
 * `src/i18n/request.ts`. Consecuencias de ese diseño, todas deliberadas:
 *
 * - Las páginas y los componentes NO cambian: siguen usando `useTranslations`.
 * - Un campo vacío en el panel NO borra nada: cae al texto del archivo. Eso
 *   evita que una edición a medias deje la página en blanco.
 * - Solo se exponen los textos editoriales. Las etiquetas de accesibilidad y de
 *   interfaz (controles del carrusel, por ejemplo) siguen en el archivo, porque
 *   no son contenido y romperlas degradaría la navegación por teclado.
 */

/**
 * Tipo de campo según cómo se muestra el texto en la página.
 * - `list`  → lista de textos sueltos (objetivos, viñetas).
 * - `pairs` → lista de ítems con título y descripción (mecanismos, tarjetas).
 */
export type FieldKind = "text" | "textarea" | "list" | "pairs";

export interface FieldSpec {
  /** Debe coincidir EXACTAMENTE con la clave de traducción. */
  name: string;
  label: string;
  kind?: FieldKind;
  description?: string;
}

const buildField = ({ name, label, kind = "text", description }: FieldSpec): Field => {
  if (kind === "pairs") {
    return {
      name,
      type: "array",
      label,
      localized: true,
      labels: { singular: "Ítem", plural: "Ítems" },
      admin: { description, initCollapsed: false },
      fields: [
        { name: "title", type: "text", label: "Título", required: true },
        { name: "text", type: "textarea", label: "Descripción", required: true },
      ],
    };
  }

  if (kind === "list") {
    return {
      name,
      type: "array",
      label,
      localized: true,
      labels: { singular: "Ítem", plural: "Ítems" },
      admin: { description, initCollapsed: false },
      fields: [{ name: "value", type: "textarea", label: "Texto", required: true }],
    };
  }
  // Las ramas se escriben por separado porque `type` es el discriminante de la
  // unión de campos de Payload: una expresión ternaria produce `"text" |
  // "textarea"` y deja de calzar con cualquiera de los dos.
  if (kind === "textarea") {
    return { name, type: "textarea", label, localized: true, admin: { description } };
  }
  return { name, type: "text", label, localized: true, admin: { description } };
};

/** Agrupa campos bajo un título colapsable, para que el panel sea legible. */
export const section = (label: string, specs: FieldSpec[]): Field => ({
  type: "collapsible",
  label,
  admin: { initCollapsed: true },
  fields: specs.map(buildField),
});

/** Define el global de una página con la configuración común ya resuelta. */
export const pageGlobal = (config: {
  slug: string;
  label: string;
  description: string;
  fields: Field[];
}): GlobalConfig => ({
  slug: config.slug,
  label: config.label,
  admin: {
    group: "Páginas",
    description: config.description,
  },
  access: {
    read: () => true,
    update: isEditor,
  },
  // Historial de cambios: estos textos son institucionales y verbatim, así que
  // debe poder verse quién cambió qué y volver atrás desde el panel.
  versions: { drafts: false, max: 50 },
  hooks: {
    afterChange: [revalidateSite],
  },
  fields: config.fields,
});
