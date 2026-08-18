import { LinkButton } from "./button";
import type { StaticPathname } from "@/i18n/routing";

/**
 * Cabecera oscura estándar para páginas interiores: eyebrow + título (con acento
 * opcional) + bajada, con espacio para el header fijo y patrón de puntos decorativo.
 *
 * Es el arranque uniforme de todas las páginas que no son líneas de investigación:
 * título alineado a la izquierda dentro del mismo contenedor (`max-w-[1200px]`) que
 * usan las secciones siguientes, de modo que el borde izquierdo coincide.
 */
export function PageHeader({
  eyebrow,
  title,
  titleAccent,
  lead,
  leadSecondary,
  cta,
}: {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  lead?: string;
  leadSecondary?: string;
  cta?: { label: string; href: StaticPathname };
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 px-5 pb-14 pt-32 lg:px-10 lg:pb-20 lg:pt-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-[1200px]">
        {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
        <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">
          {title}
          {titleAccent ? (
            <>
              {" "}
              <span className="text-teal">{titleAccent}</span>
            </>
          ) : null}
        </h1>
        {lead ? (
          <p className="mt-5 max-w-3xl text-fs-400 leading-relaxed text-white/80">
            {lead}
          </p>
        ) : null}
        {leadSecondary ? (
          <p className="mt-4 max-w-3xl text-fs-300 leading-relaxed text-white/70">
            {leadSecondary}
          </p>
        ) : null}
        {cta ? (
          <div className="mt-7">
            <LinkButton href={cta.href} variant="primary" size="md">
              {cta.label}
            </LinkButton>
          </div>
        ) : null}
      </div>
    </section>
  );
}
