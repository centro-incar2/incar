import type { CollectionConfig } from "payload";
import { isAdmin, isEditor } from "@/access/editorial";

/** Acceso al panel: cualquier rol reconocido. */
const canEnterAdmin = (role: unknown): boolean => role === "admin" || role === "editor";

/**
 * Usuarios del panel de administración (Payload).
 *
 * Colección con autenticación habilitada: gobierna el acceso al CMS. El campo
 * `role` separa a quien administra la instalación de quien solo carga contenido,
 * de modo que el equipo de comunicaciones de INCAR² pueda publicar noticias sin
 * poder crear cuentas ni alterar la configuración.
 */
export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    // Payload bloquea la cuenta por defecto tras 5 intentos fallidos durante 10
    // minutos. En la práctica dejó fuera al equipo de INCAR² —que no tiene
    // recuperación por correo— sin que el mensaje dejara claro qué pasaba: se
    // leía como que el panel estaba caído. Diez intentos y dos minutos siguen
    // frenando un ataque por fuerza bruta (que además necesita acertar el
    // correo) sin dejar a nadie fuera de su propio sitio por un tipeo.
    maxLoginAttempts: 10,
    lockTime: 2 * 60 * 1000,
  },
  labels: {
    singular: "Usuario",
    plural: "Usuarios",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    group: "Sistema",
  },
  access: {
    // Solo los administradores gestionan cuentas; un editor puede ver y
    // actualizar la suya (para cambiar su contraseña) pero no las ajenas.
    create: isAdmin,
    delete: isAdmin,
    read: isEditor,
    update: ({ req }) =>
      req.user?.role === "admin" ? true : { id: { equals: req.user?.id } },
    // Ambos roles entran al panel; lo que ven dentro lo decide cada colección.
    admin: ({ req }) => canEnterAdmin(req.user?.role),
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nombre",
      required: true,
    },
    {
      name: "role",
      type: "select",
      label: "Rol",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Administrador", value: "admin" },
        { label: "Editor de contenido", value: "editor" },
      ],
      // Un editor no puede ascenderse a administrador.
      access: { update: ({ req }) => req.user?.role === "admin" },
      admin: {
        position: "sidebar",
        description:
          "Editor: crea y publica Noticias, Publicaciones y Medios. Administrador: además gestiona las cuentas de usuario.",
      },
    },
    // Los campos de autenticación (email, password) los añade `auth: true`.
  ],
};
