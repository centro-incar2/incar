import { pageGlobal, section } from "./page-fields";

/**
 * Página Contacto.
 *
 * El formulario es VISUAL: no envía nada todavía (decisión del cliente), y
 * `formNotice` es el aviso que lo explica en pantalla. Las sedes viven en
 * `src/content/offices.ts` y quedan para una etapa posterior del CMS.
 */
export const Contact = pageGlobal({
  slug: "contact",
  label: "Contacto",
  description:
    "Textos de la página de contacto. Lo que se deje vacío conserva el texto actual del sitio.",
  fields: [
    section("Encabezado", [
      { name: "eyebrow", label: "Antetítulo" },
      { name: "title", label: "Título" },
      { name: "lead", label: "Bajada", kind: "textarea" },
    ]),
    section("Formulario", [
      { name: "formTitle", label: "Título del formulario" },
      { name: "fieldName", label: "Campo · Nombre" },
      { name: "fieldEmail", label: "Campo · Email" },
      { name: "fieldPhone", label: "Campo · Teléfono" },
      { name: "fieldCity", label: "Campo · Ciudad" },
      { name: "fieldCountry", label: "Campo · País" },
      { name: "fieldMessage", label: "Campo · Mensaje" },
      { name: "submit", label: "Botón de envío" },
      {
        name: "formNotice",
        label: "Aviso bajo el formulario",
        kind: "textarea",
        description: "Explica que el envío todavía no está habilitado.",
      },
    ]),
    section("Datos de contacto", [
      { name: "emailTitle", label: "Título del correo" },
      { name: "email", label: "Correo de contacto" },
      { name: "officesTitle", label: "Título de las sedes" },
      { name: "phoneLabel", label: "Etiqueta de teléfono" },
    ]),
  ],
});
