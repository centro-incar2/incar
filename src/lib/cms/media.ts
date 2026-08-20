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

/**
 * `true` si la URL apunta a un archivo administrado por el panel.
 *
 * Sirve para decidir si una imagen debe pasar por el optimizador de Next. Las
 * del panel NO deben: Payload ya genera variantes WebP al subirlas, y volver a
 * optimizarlas consume la cuota de Image Optimization de Vercel. Ver
 * `CmsImage`.
 */
export const isCmsAsset = (src: unknown): boolean =>
  typeof src === "string" &&
  (src.includes("/api/media/") ||
    src.includes("/api/document-files/") ||
    src.includes(".public.blob.vercel-storage.com"));
