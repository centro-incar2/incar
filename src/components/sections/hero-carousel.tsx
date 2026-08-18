"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";

export interface HeroSlideData {
  id: string;
  /** Ruta de la imagen (assets existentes del sitio). */
  image: string;
  /**
   * Encuadre. `event` es para las láminas gráficas de congresos, cuyo logo y
   * fechas están impresos en el costado derecho del arte: en escritorio se ancla
   * a la derecha para que ese bloque se vea completo junto al texto del sitio, y
   * en móvil a la izquierda, donde el arte es limpio y el texto se lee mejor.
   */
  focus?: "center" | "event";
  /** Texto alternativo. Vacío si es decorativa; descriptivo si aporta información. */
  imageAlt?: string;
  /** Contenido ya traducido y renderizado en el servidor (título, texto, CTA). */
  content: ReactNode;
}

interface Labels {
  region: string;
  previous: string;
  next: string;
  /** Prefijo del indicador; el número de lámina se añade al final. */
  goToSlide: string;
}

const AUTOPLAY_MS = 7000;

/**
 * Carrusel del Hero del Home. Mantiene la estética del banner original
 * (imagen a sangre + overlay navy + texto a la izquierda) y añade rotación
 * automática, flechas e indicadores.
 *
 * Accesibilidad: patrón carousel de la APG — región etiquetada, láminas
 * inactivas ocultas con `inert` (no focusables), navegación por teclado con
 * flechas, y la rotación automática se detiene al pasar el puntero o al
 * enfocar, y se desactiva por completo con `prefers-reduced-motion`.
 *
 * Rendimiento: solo se montan las imágenes ya vistas y la siguiente, para no
 * descargar las cinco al cargar la página.
 */
export function HeroCarousel({
  slides,
  labels,
}: {
  slides: HeroSlideData[];
  labels: Labels;
}) {
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));

  const goTo = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  // Respeta la preferencia de movimiento reducido del sistema.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) =>
      setReduceMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Rotación automática.
  useEffect(() => {
    if (paused || reduceMotion || total <= 1) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % total),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, total]);

  // Monta la lámina actual y precarga la siguiente.
  useEffect(() => {
    const upcoming = (index + 1) % total;
    setLoaded((current) => {
      if (current.has(index) && current.has(upcoming)) return current;
      const updated = new Set(current);
      updated.add(index);
      updated.add(upcoming);
      return updated;
    });
  }, [index, total]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={labels.region}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-950"
      // No se pausa al pasar el cursor: el hero ocupa toda la pantalla, así que
      // el puntero está casi siempre encima y el carrusel quedaba detenido.
      // Sí se pausa al enfocar con teclado, para no mover el foco bajo el usuario.
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          prev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          next();
        }
      }}
    >
      {slides.map((slide, i) => {
        const isActive = i === index;
        return (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${total}`}
            aria-hidden={!isActive}
            inert={!isActive}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            {loaded.has(i) ? (
              <Image
                src={slide.image}
                alt={slide.imageAlt ?? ""}
                fill
                priority={i === 0}
                sizes="100vw"
                className={`object-cover ${
                  slide.focus === "event"
                    ? "object-left sm:object-right"
                    : "object-center"
                }`}
              />
            ) : null}
            {/* Overlay navy (más denso a la izquierda) para legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/70 to-navy-900/30" />
            <div className="absolute inset-0 bg-navy-950/25" />

            <div className="relative flex min-h-[100svh] items-center">
              <div className="mx-auto w-full max-w-[1400px] px-5 pt-24 sm:px-8 lg:px-10">
                <div className="max-w-2xl">{slide.content}</div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Controles: indicadores a la izquierda, flechas a la derecha */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 lg:bottom-10">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
          <ul className="pointer-events-auto flex items-center gap-2.5">
            {slides.map((slide, i) => (
              <li key={slide.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${labels.goToSlide} ${i + 1}`}
                  aria-current={i === index}
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-8 bg-teal"
                      : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              </li>
            ))}
          </ul>

          <div className="pointer-events-auto flex items-center gap-3">
            <ArrowButton label={labels.previous} onClick={prev} direction="left" />
            <ArrowButton label={labels.next} onClick={next} direction="right" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowButton({
  label,
  onClick,
  direction,
}: {
  label: string;
  onClick: () => void;
  direction: "left" | "right";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/50 text-white transition-all duration-200 hover:border-teal hover:bg-teal hover:text-white"
    >
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d={direction === "left" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
