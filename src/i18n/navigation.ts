import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Wrappers de navegación con conocimiento de idioma (Link, redirect, usePathname,
 * useRouter, getPathname). Usar SIEMPRE estos en lugar de los de `next/navigation`
 * para que las URLs se localicen automáticamente.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
