/**
 * Google Analytics 4.
 *
 * El identificador de medición se inyecta por entorno (`NEXT_PUBLIC_GA_ID`) para
 * que el sitio pueda construirse sin analítica —local, previsualizaciones— sin
 * tocar código ni dejar el ID versionado.
 */

/** Formato oficial del ID de medición de GA4: `G-` + alfanumérico en mayúsculas. */
const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]{4,}$/;

export const GA_MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA_ID ?? "").trim();

/**
 * La medición solo se activa en el dominio real: en desarrollo y en los
 * despliegues de vista previa los eventos ensuciarían la propiedad de INCAR².
 *
 * `VERCEL_ENV` vale "production" únicamente en el despliegue de producción;
 * fuera de Vercel no existe y decide `NODE_ENV`.
 */
export function isAnalyticsEnabled(): boolean {
  if (!MEASUREMENT_ID_PATTERN.test(GA_MEASUREMENT_ID)) return false;
  if (process.env.NODE_ENV !== "production") return false;

  const vercelEnv = process.env.VERCEL_ENV;
  return vercelEnv === undefined || vercelEnv === "production";
}
