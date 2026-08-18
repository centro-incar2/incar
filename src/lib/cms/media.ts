import type { Media } from "@/payload-types";

/**
 * Resuelve la URL servible de una imagen de la colección Media.
 *
 * En local Payload la expone en `/api/media/file/<archivo>` (misma-origin). En
 * producción el plugin de Vercel Blob reescribe `url` a la URL absoluta del
 * store, ya contemplada en los `remotePatterns` de `next.config.ts`. En ambos
 * casos el valor viene resuelto en el documento, así que no hay que componerlo.
 */
export const mediaUrl = (
  value: number | Media | null | undefined,
): string | undefined => {
  if (value && typeof value === "object" && typeof value.url === "string") {
    return value.url;
  }
  return undefined;
};
