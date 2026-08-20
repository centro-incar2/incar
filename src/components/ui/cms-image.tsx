import Image, { type ImageProps } from "next/image";
import { isCmsAsset } from "@/lib/cms/media";

/**
 * Quita del `className` las utilidades que compiten con el marcador.
 *
 * El contenedor original suele traer `object-cover` y un zoom al pasar el
 * cursor, pensados para una fotografía a sangre. Sobre el isotipo se verían mal
 * —lo recortarían— y como Tailwind genera ambas reglas con la misma
 * especificidad, no basta con añadir `object-contain` después: cuál gana
 * dependería del orden en la hoja de estilos.
 */
const sinAjusteDeImagen = (className?: string): string =>
  (className ?? "")
    .split(/\s+/)
    .filter((c) => c && !/^(object-|group-hover:scale-|transition-|duration-)/.test(c))
    .join(" ");

/** Marca de agua que se muestra cuando falta la imagen. */
const ISOTIPO = "/images/logos/incar2-isotipo-blanco.png";

/**
 * Imagen que puede provenir del panel de administración.
 *
 * Se diferencia de `next/image` en dos cosas, ambas por razones operativas:
 *
 * 1. **No pasa por el optimizador de Next si la fuente es del panel.** El
 *    optimizador de Vercel tiene cuota mensual: las imágenes estáticas se
 *    procesan una vez y quedan cacheadas, pero las del panel se suben DESPUÉS
 *    del build y se optimizan a demanda, así que crecen sin techo con cada
 *    contenido que carga INCAR². En agosto de 2026 esa cuota se agotó,
 *    `/_next/image` devolvió 402 y desaparecieron las fotos de las noticias y
 *    del equipo aunque los archivos estaban intactos. Optimizarlas era además
 *    redundante: Payload ya genera variantes WebP (400/768/1600) al subir.
 *
 * 2. **Tolera que no haya imagen.** `next/image` con `src=""` rompe el render.
 *    Aquí se dibuja el isotipo del centro sobre el fondo del contenedor, igual
 *    que hace `PersonAvatar` con quien no tiene fotografía. Así una ficha sin
 *    imagen se ve incompleta pero la página sigue en pie.
 *
 * Para imágenes estáticas (`/images/...`) se comporta como `next/image` normal,
 * así que puede usarse sin condicionales donde la fuente sea mixta.
 */
export function CmsImage({ src, alt, className, ...props }: ImageProps) {
  const vacia = typeof src === "string" ? src.trim().length === 0 : !src;

  if (vacia) {
    return (
      <Image
        {...props}
        src={ISOTIPO}
        alt={alt}
        aria-hidden={alt ? undefined : true}
        className={sinAjusteDeImagen(className) + " object-contain p-[12%] opacity-25"}
      />
    );
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      className={className}
      unoptimized={isCmsAsset(src) || undefined}
    />
  );
}
