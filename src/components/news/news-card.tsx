import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { CmsNewsArticle } from "@/lib/cms/news";
import { CmsImage } from "@/components/ui/cms-image";

/**
 * Tarjeta de noticia (tema navy). Imagen destacada arriba, fecha, título y un
 * breve extracto. Diseñada para una rejilla de hasta 4 columnas. Componente
 * presentacional: recibe `locale` y los labels ya traducidos.
 *
 * La imagen destacada se recorta siempre a 750 × 490 (horizontal), sea cual sea
 * el original: las notas migradas traen fotos verticales y cuadradas, y sin un
 * marco fijo la rejilla queda despareja. `object-cover` centra el recorte y la
 * proporción declarada reserva el espacio, así que no hay salto de layout.
 */
export function NewsCard({
  article,
  locale,
  readMoreLabel,
  priority = false,
}: {
  article: CmsNewsArticle;
  locale: Locale;
  readMoreLabel: string;
  /** Carga inmediata para las tarjetas visibles al entrar (LCP). */
  priority?: boolean;
}) {
  const formattedDate = new Intl.DateTimeFormat(
    locale === "es" ? "es-CL" : "en-US",
    { day: "numeric", month: "long", year: "numeric" },
  ).format(new Date(article.date));

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-800/60 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[var(--shadow-card-hover)]">
      <div className="relative aspect-[750/490] overflow-hidden bg-navy-900">
        <CmsImage
          src={article.image}
          alt={article.imageAlt[locale]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
          priority={priority}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <time
          dateTime={article.date}
          className="flex items-center gap-1.5 text-fs-100 font-medium text-teal"
        >
          <CalendarIcon />
          {formattedDate}
        </time>

        <h3 className="text-fs-400 font-bold leading-snug text-white">
          <Link
            href={{ pathname: "/noticias/[slug]", params: { slug: article.slug } }}
            className="transition-colors after:absolute after:inset-0 group-hover:text-teal"
          >
            {article.title[locale]}
          </Link>
        </h3>

        <p className="line-clamp-3 text-fs-200 leading-relaxed text-white/60">
          {article.excerpt[locale]}
        </p>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-fs-100 font-semibold text-teal transition-all group-hover:gap-2.5">
          {readMoreLabel}
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal/15">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M5 11L11 5m0 0H6m5 0v5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
      </div>
    </article>
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
