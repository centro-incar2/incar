/** URL pública canónica del sitio. Configurable por entorno (sin barra final). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://incar2.cl"
).replace(/\/$/, "");
