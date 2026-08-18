import type { CollectionConfig } from "payload";
import { isAdmin, isEditor } from "@/access/editorial";

/**
 * Buzón del formulario de contacto del sitio.
 *
 * Los mensajes NO se crean por la API pública: `create` está cerrado y la
 * escritura ocurre solo desde la acción de servidor `enviarMensajeContacto`,
 * que usa la API local de Payload con `overrideAccess`. De ese modo el endpoint
 * REST `/api/contact-messages` no acepta envíos anónimos y el único camino de
 * entrada es el formulario, donde sí se valida y se filtra el spam.
 *
 * No se guarda la IP del visitante: es un dato personal que no aporta nada a
 * quien responde el mensaje.
 */
export const ContactMessages: CollectionConfig = {
  slug: "contact-messages",
  labels: {
    singular: "Mensaje de contacto",
    plural: "Mensajes de contacto",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "createdAt", "handled"],
    group: "Buzón",
    description:
      "Mensajes recibidos desde el formulario de la página de Contacto. Marca «Atendido» cuando ya se respondió.",
  },
  access: {
    read: isEditor,
    // Solo la acción de servidor escribe aquí.
    create: () => false,
    // Se permite editar para poder marcar «Atendido», no para alterar el texto.
    update: isEditor,
    delete: isAdmin,
  },
  defaultSort: "-createdAt",
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", label: "Nombre", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "phone", label: "Teléfono", type: "text" },
        { name: "city", label: "Ciudad", type: "text" },
        { name: "country", label: "País", type: "text" },
      ],
    },
    {
      name: "message",
      label: "Mensaje",
      type: "textarea",
      required: true,
    },
    {
      name: "handled",
      label: "Atendido",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Marca esta casilla cuando el mensaje ya fue respondido.",
      },
    },
    {
      name: "locale",
      label: "Idioma del visitante",
      type: "select",
      options: [
        { label: "Español", value: "es" },
        { label: "Inglés", value: "en" },
      ],
      admin: {
        position: "sidebar",
        description: "Idioma en que se envió el formulario; úsalo para responder.",
      },
    },
  ],
};
