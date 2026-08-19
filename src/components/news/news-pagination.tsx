import { Link } from "@/i18n/navigation";

/**
 * Paginación del listado de noticias.
 *
 * Son enlaces reales (no botones con JavaScript) para que cada página sea
 * navegable, compartible e indexable. La página 1 vive en `/noticias`; el resto
 * en `/noticias/pagina/N`, para no tener dos URL con el mismo contenido.
 */
export interface NewsPaginationLabels {
  /** Nombre accesible del bloque de navegación. */
  label: string;
  previous: string;
  next: string;
  /** Texto accesible de cada número ("Ir a la página 3"). */
  goToPage: (page: number) => string;
}

/** Ventana de páginas alrededor de la actual, con saltos (`null`) si hay muchas. */
const pageWindow = (current: number, total: number): (number | null)[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const around = [current - 1, current, current + 1].filter(
    (n) => n > 1 && n < total,
  );
  const numbers = [1, ...around, total];

  return numbers.flatMap((n, i) => {
    const previous = numbers[i - 1];
    return previous !== undefined && n - previous > 1 ? [null, n] : [n];
  });
};

const linkFor = (page: number) =>
  page === 1
    ? ("/noticias" as const)
    : ({
        pathname: "/noticias/pagina/[pagina]" as const,
        params: { pagina: String(page) },
      });

const baseItem =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-fs-200 font-semibold transition-colors";

export function NewsPagination({
  page,
  totalPages,
  labels,
}: {
  page: number;
  totalPages: number;
  labels: NewsPaginationLabels;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label={labels.label} className="mt-12 flex justify-center">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          {page > 1 ? (
            <Link
              href={linkFor(page - 1)}
              rel="prev"
              className={`${baseItem} gap-1.5 border border-white/15 text-white hover:border-teal/50 hover:text-teal`}
            >
              <Arrow direction="left" />
              {labels.previous}
            </Link>
          ) : (
            <span
              className={`${baseItem} gap-1.5 border border-white/5 text-white/25`}
              aria-hidden="true"
            >
              <Arrow direction="left" />
              {labels.previous}
            </span>
          )}
        </li>

        {pageWindow(page, totalPages).map((n, index) =>
          n === null ? (
            <li key={`salto-${index}`} aria-hidden="true" className="px-1 text-white/40">
              …
            </li>
          ) : (
            <li key={n}>
              {n === page ? (
                <span aria-current="page" className={`${baseItem} bg-teal text-white`}>
                  {n}
                </span>
              ) : (
                <Link
                  href={linkFor(n)}
                  aria-label={labels.goToPage(n)}
                  className={`${baseItem} border border-white/15 text-white/80 hover:border-teal/50 hover:text-teal`}
                >
                  {n}
                </Link>
              )}
            </li>
          ),
        )}

        <li>
          {page < totalPages ? (
            <Link
              href={linkFor(page + 1)}
              rel="next"
              className={`${baseItem} gap-1.5 border border-white/15 text-white hover:border-teal/50 hover:text-teal`}
            >
              {labels.next}
              <Arrow direction="right" />
            </Link>
          ) : (
            <span
              className={`${baseItem} gap-1.5 border border-white/5 text-white/25`}
              aria-hidden="true"
            >
              {labels.next}
              <Arrow direction="right" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className={`h-3.5 w-3.5 shrink-0 ${direction === "left" ? "rotate-180" : ""}`}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10m0 0l-4-4m4 4l-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
