/** Une clases condicionales filtrando valores falsy. Ligero, sin dependencias. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Iniciales de un nombre para el avatar de respaldo cuando un integrante no
 * tiene foto (ignora prefijos Dr./Dra.). "Camila Godoy Díaz" → "CG".
 */
export function getInitials(name: string): string {
  return name
    .replace(/^(Dr\.|Dra\.)\s*/, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
