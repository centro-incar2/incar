import type { Access, CollectionConfig } from "payload";
import type { User } from "@/payload-types";

/**
 * Control de acceso por rol para el panel de INCAR².
 *
 * Dos perfiles, pensados para entregar el panel al equipo de comunicaciones sin
 * darle el control de la instalación:
 *
 * - `admin`  → todo, incluida la gestión de usuarios.
 * - `editor` → crea, edita y borra contenido (Noticias, Publicaciones, Medios),
 *              pero no puede crear ni modificar cuentas.
 *
 * El contenido publicado es de lectura pública: el sitio lo consume sin sesión.
 */

/** Rol efectivo del usuario; sin sesión no hay rol. */
const roleOf = (user: unknown): User["role"] | null => {
  const role = (user as User | null | undefined)?.role;
  return role === "admin" || role === "editor" ? role : null;
};

/** Cualquier usuario autenticado con rol válido (editor o admin). */
export const isEditor: Access = ({ req }) => roleOf(req.user) !== null;

/** Solo administradores. */
export const isAdmin: Access = ({ req }) => roleOf(req.user) === "admin";

/** Lectura pública, escritura para el equipo editorial. */
export const editorialAccess: CollectionConfig["access"] = {
  read: () => true,
  create: isEditor,
  update: isEditor,
  delete: isEditor,
};
