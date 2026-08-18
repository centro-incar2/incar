"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

/**
 * Revela los elementos con `data-reveal` a medida que entran en el viewport,
 * añadiéndoles la clase `is-visible` (transición fade + desplazamiento).
 * Enfoque basado en scroll (rAF): es a prueba de fallos —cualquier elemento cuyo
 * borde superior supere el 90% de la altura visible se revela y nunca queda oculto.
 * Se coloca una sola vez en el layout y se re-evalúa al cambiar de ruta.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const getPending = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"),
      );

    if (prefersReduced) {
      getPending().forEach((el) => el.classList.add("is-visible"));
      return;
    }

    let ticking = false;

    const reveal = () => {
      ticking = false;
      const trigger = window.innerHeight * 0.9;
      for (const el of getPending()) {
        if (el.getBoundingClientRect().top < trigger) {
          el.classList.add("is-visible");
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(reveal);
    };

    // Revelado inicial (contenido ya visible al cargar).
    reveal();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    // Red de seguridad: si algo quedara sin observar, se revela tras 1.2 s.
    const safety = window.setTimeout(reveal, 1200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(safety);
    };
  }, [pathname]);

  return null;
}
