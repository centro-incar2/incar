"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CmsImage } from "@/components/ui/cms-image";
import type { CmsGalleryImage } from "@/lib/cms/news";
import type { Locale } from "@/i18n/routing";

interface Labels {
  region: string;
  previous: string;
  next: string;
  /** Prefijo del indicador; el número de imagen se añade al final. */
  goTo: string;
}

/**
 * Galería de la noticia: las imágenes adicionales que INCAR² carga además de la
 * destacada.
 *
 * Con una sola imagen se dibuja suelta, sin controles: un carrusel de un
 * elemento solo añade ruido. Desde dos, se muestra con flechas e indicadores.
 *
 * No rota sola. El carrusel de la portada sí lo hace porque compite por la
 * atención en un banner; aquí el lector llegó a leer, y una imagen que cambia
 * mientras lee es una molestia.
 *
 * Accesibilidad (patrón carousel de la APG): región etiquetada, flechas del
 * teclado para navegar, y las imágenes ocultas quedan fuera del foco.
 */
export function NewsGallery({
  images,
  locale,
  labels,
}: {
  images: CmsGalleryImage[];
  locale: Locale;
  labels: Labels;
}) {
  const [actual, setActual] = useState(0);
  const contenedor = useRef<HTMLDivElement>(null);

  const total = images.length;
  const ir = useCallback(
    (indice: number) => setActual(((indice % total) + total) % total),
    [total],
  );

  useEffect(() => {
    const nodo = contenedor.current;
    if (!nodo || total < 2) return;

    const alPulsar = (evento: KeyboardEvent) => {
      if (evento.key === "ArrowLeft") { evento.preventDefault(); ir(actual - 1); }
      if (evento.key === "ArrowRight") { evento.preventDefault(); ir(actual + 1); }
    };
    nodo.addEventListener("keydown", alPulsar);
    return () => nodo.removeEventListener("keydown", alPulsar);
  }, [actual, ir, total]);

  if (total === 0) return null;

  const unaSola = total === 1;

  return (
    <section
      ref={contenedor}
      // `group` sin `role` cuando hay una sola imagen: no es un carrusel.
      {...(unaSola ? {} : { role: "group", "aria-roledescription": "carrusel", tabIndex: 0 })}
      aria-label={labels.region}
      className="mx-auto mt-12 max-w-3xl px-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-navy-900">
        {images.map((imagen, i) => (
          <div
            key={imagen.url}
            className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${
              i === actual ? "opacity-100" : "opacity-0"
            }`}
            // Las láminas ocultas no deben ser navegables por teclado.
            {...(i === actual ? {} : { inert: "" as unknown as boolean })}
            aria-hidden={i === actual ? undefined : true}
          >
            <CmsImage
              src={imagen.url}
              alt={imagen.alt[locale]}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        ))}

        {!unaSola && (
          <>
            <button
              type="button"
              onClick={() => ir(actual - 1)}
              aria-label={labels.previous}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/70 text-white transition-colors hover:bg-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => ir(actual + 1)}
              aria-label={labels.next}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/70 text-white transition-colors hover:bg-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              <span aria-hidden="true">→</span>
            </button>
          </>
        )}
      </div>

      {!unaSola && (
        <ul className="mt-4 flex justify-center gap-2">
          {images.map((imagen, i) => (
            <li key={imagen.url}>
              <button
                type="button"
                onClick={() => ir(i)}
                aria-label={`${labels.goTo} ${i + 1}`}
                aria-current={i === actual ? "true" : undefined}
                className={`h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
                  i === actual ? "w-6 bg-teal" : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
