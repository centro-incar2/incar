/**
 * Estado del formulario de contacto.
 *
 * Vive fuera de `contact.ts` porque un archivo `"use server"` solo puede
 * exportar funciones asíncronas: el valor inicial exportado desde allí rompe la
 * compilación.
 */
export type ContactState = {
  status: "idle" | "success" | "error";
  /** Errores por campo; la clave es el `name` del input. */
  errors?: Partial<Record<"name" | "email" | "message" | "form", string>>;
  /** Valores tecleados, para no vaciar el formulario si algo falla. */
  values?: Record<string, string>;
};

export const initialContactState: ContactState = { status: "idle" };
