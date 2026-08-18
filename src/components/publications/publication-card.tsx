import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { CmsPublication } from "@/lib/cms/publications";
import { getResearchLine } from "@/content/research-lines";
import { lineAccentStyles } from "@/lib/accent";
import { LineIcon } from "@/components/ui/line-icon";

/**
 * Tarjeta de publicación (tema navy): barra de acento, ícono y nombre completo
 * de la línea de investigación, título, autores, revista, año y "Leer más".
 *
 * Las tarjetas no llevan fotografía: la línea se identifica con su ícono, y su
 * nombre completo (no la etiqueta corta) facilita la búsqueda por nombre.
 * Componente presentacional (recibe locale + labels).
 */
export function PublicationCard({
  pub,
  locale,
  readMoreLabel,
  externalLabel,
}: {
  pub: CmsPublication;
  locale: Locale;
  readMoreLabel: string;
  externalLabel: string;
}) {
  const line = getResearchLine(pub.line);
  const accent = lineAccentStyles[line?.accent ?? "teal"];
  // Con contenido enriquecido enlaza al detalle interno; con solo DOI, al artículo externo.
  const isExternal = !pub.hasDetail && Boolean(pub.url);
  const actionLabel = isExternal ? externalLabel : readMoreLabel;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-800/60 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[var(--shadow-card-hover)]">
      <span className={`block h-1.5 w-full ${accent.bar}`} aria-hidden="true" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        {line ? (
          <div className="flex items-center gap-3">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent.pillBg} ${accent.pillText}`}
            >
              <LineIcon slug={line.slug} className="h-6 w-6" />
            </span>
            <span className={`text-fs-100 font-semibold leading-snug ${accent.pillText}`}>
              {line.title[locale]}
            </span>
          </div>
        ) : null}

        <h3 className="text-fs-400 font-bold leading-snug text-white">
          {isExternal ? (
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors after:absolute after:inset-0 group-hover:text-teal"
            >
              {pub.title}
            </a>
          ) : (
            <Link
              href={{ pathname: "/publicaciones/[slug]", params: { slug: pub.slug } }}
              className="transition-colors after:absolute after:inset-0 group-hover:text-teal"
            >
              {pub.title}
            </Link>
          )}
        </h3>

        <p className="flex items-start gap-2 text-fs-100 leading-relaxed text-white/60">
          <UsersIcon />
          <span className="line-clamp-2">{pub.authors}</span>
        </p>

        <p className="flex items-start gap-2 text-fs-100 italic leading-relaxed text-white/45">
          <BookIcon />
          <span>{pub.journal}</span>
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="flex items-center gap-1.5 text-fs-100 text-white/50">
            <CalendarIcon />
            {pub.year}
          </span>
          <span className="inline-flex items-center gap-1.5 text-fs-100 font-semibold text-teal transition-all group-hover:gap-2.5">
            {actionLabel}
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal/15">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M5 11L11 5m0 0H6m5 0v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

function UsersIcon() {
  return (
    <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 19a5.5 5.5 0 0111 0M16 6a3 3 0 010 6m4.5 7a5.5 5.5 0 00-4-5.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/35" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9h16M9 3v4M15 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
