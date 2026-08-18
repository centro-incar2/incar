import type { ComponentType } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { StaticPathname } from "@/i18n/routing";
import { OceanThree } from "@/components/ui/ocean-three";

type QuickLink = {
  key: "quickNews" | "quickTour" | "quickPolicy" | "quickEvents";
  href: StaticPathname;
  Icon: ComponentType<{ className?: string }>;
  /** Desplazamiento vertical para el layout escalonado (desktop). */
  offset: string;
};

const links: QuickLink[] = [
  { key: "quickNews", href: "/noticias", Icon: NewsIcon, offset: "lg:mt-0" },
  { key: "quickTour", href: "/servicios-y-tecnologia", Icon: TourIcon, offset: "lg:-mt-10" },
  { key: "quickPolicy", href: "/politicas-publicas", Icon: PolicyIcon, offset: "lg:mt-16" },
  { key: "quickEvents", href: "/eventos", Icon: EventsIcon, offset: "lg:mt-6" },
];

/**
 * Accesos rápidos escalonados sobre el océano de partículas (WebGL).
 *
 * Cada tarjeta abre con un badge de ícono (fondo teal, bordes redondeados) que
 * se intensifica en el hover, para dar más presencia visual a la sección.
 */
export async function QuickLinks() {
  const t = await getTranslations("Home");
  const tc = await getTranslations("Common");

  return (
    <section className="relative overflow-hidden bg-[#041a28] pb-[180px] pt-[200px] lg:pb-[212px] lg:pt-[232px]">
      {/* Fondo: océano de partículas en WebGL (Three.js, carga diferida) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <OceanThree className="h-full w-full" />
        {/* Fundido al navy de la sección siguiente, para que el corte no sea seco */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-navy" />
      </div>

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-6 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {links.map((link, i) => (
          // `reveal-card` (globals.css) unifica la transición del revelado y la
          // del hover en una curva larga. El `data-reveal` debe ir en la propia
          // tarjeta: si estuviera en un contenedor, su `transform` anularía el
          // `backdrop-blur` que difumina el oleaje bajo la caja.
          <Link
            key={link.key}
            href={link.href}
            data-reveal
            data-reveal-delay={(i % 3) + 1}
            // Alto fijo: el escalonado sólo desplaza, no redimensiona.
            className={`reveal-card group flex h-56 flex-col justify-between self-start rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-md hover:border-teal hover:bg-white/10 hover:shadow-[0_0_28px_rgba(36,163,160,0.45),inset_0_0_28px_rgba(36,163,160,0.12)] ${link.offset}`}
          >
            <div className="flex flex-col gap-5">
              {/* Badge de ícono: fondo teal + borde redondeado, ícono al centro */}
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-teal/40 bg-teal/20 text-teal transition-colors duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-teal group-hover:bg-teal group-hover:text-white">
                <link.Icon className="h-7 w-7" />
              </span>
              <span className="text-fs-500 font-bold leading-snug text-white">
                {t(link.key)}
              </span>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-fs-100 font-semibold text-teal transition-[gap] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:gap-3">
              {tc("goToPage")}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h9m0 0L8 4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ── Íconos (stroke, heredan color del badge) ─────────────────────────────── */

function NewsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5h12v14H5a1 1 0 01-1-1V5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M16 8h3a1 1 0 011 1v9a1 1 0 01-1 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 9h6M7 12.5h6M7 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TourIcon({ className }: { className?: string }) {
  // Panorámica 360°: sugiere el recorrido virtual de los laboratorios.
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="9" ry="5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 3v3.5M12 17.5V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.5 11.5l3-1.8 3 1.8v3l-3 1.8-3-1.8v-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function PolicyIcon({ className }: { className?: string }) {
  // Institución (columnas): alude a impactos y políticas públicas.
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9.5L12 4l8 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v7M10 10v7M14 10v7M18 10v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EventsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 9.5h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="14.5" r="1.6" fill="currentColor" />
    </svg>
  );
}
