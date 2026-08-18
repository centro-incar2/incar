"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export interface PolicyTab {
  /** Slug estable para el deep-link por hash (#asesorias, …). */
  id: string;
  label: string;
  /** Contenido del panel, renderizado en el servidor. */
  panel: ReactNode;
}

/**
 * Navegación por pestañas de la página de Políticas Públicas (patrón "tabs" de
 * la APG): lista con `role="tablist"`, navegación por flechas y paneles con
 * `role="tabpanel"`. Todos los paneles se renderizan en el DOM (los inactivos
 * con `hidden`) para conservar el contenido indexable y accesible.
 *
 * Deep-link: la pestaña activa se refleja en el hash de la URL, de modo que
 * `/politicas-publicas#asesorias` abre directamente esa pestaña y el enlace es
 * compartible.
 */
export function PolicyTabs({ tabs }: { tabs: PolicyTab[] }) {
  const base = useId();
  const [active, setActive] = useState(tabs[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Sincroniza la pestaña inicial con el hash (tras el montaje, para no romper
  // la hidratación).
  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    if (fromHash && tabs.some((t) => t.id === fromHash)) {
      setActive(fromHash);
    }
  }, [tabs]);

  const selectTab = (id: string, { focus = false } = {}) => {
    setActive(id);
    // Actualiza el hash sin provocar salto de scroll.
    history.replaceState(null, "", `#${id}`);
    if (focus) {
      const index = tabs.findIndex((t) => t.id === id);
      tabRefs.current[index]?.focus();
    }
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = tabs.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next !== null) {
      event.preventDefault();
      selectTab(tabs[next].id, { focus: true });
    }
  };

  return (
    <>
      {/* Barra de pestañas */}
      <div className="border-b border-white/10 bg-navy-900">
        <div
          role="tablist"
          aria-label="Categorías de políticas públicas"
          className="mx-auto flex max-w-[1200px] gap-1 overflow-x-auto px-5 lg:px-10"
        >
          {tabs.map((tab, index) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                id={`${base}-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${base}-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectTab(tab.id)}
                onKeyDown={(e) => onKeyDown(e, index)}
                className={`relative shrink-0 whitespace-nowrap border-b-2 px-4 py-4 text-fs-200 font-semibold transition-colors duration-200 ${
                  selected
                    ? "border-teal text-white"
                    : "border-transparent text-white/55 hover:text-white/85"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Paneles */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${base}-panel-${tab.id}`}
          aria-labelledby={`${base}-tab-${tab.id}`}
          hidden={tab.id !== active}
          tabIndex={0}
        >
          {tab.panel}
        </div>
      ))}
    </>
  );
}
