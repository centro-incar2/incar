import type { Locale } from "@/i18n/routing";
import type { CmsNewsArticle } from "@/lib/cms/news";
import { NewsCard } from "./news-card";
import { NewsPagination, type NewsPaginationLabels } from "./news-pagination";

/**
 * Rejilla de noticias con su paginación. La comparten la página 1 (`/noticias`)
 * y las siguientes (`/noticias/pagina/N`) para que ambas rindan idéntico.
 */
export function NewsList({
  articles,
  locale,
  page,
  totalPages,
  readMoreLabel,
  paginationLabels,
}: {
  articles: CmsNewsArticle[];
  locale: Locale;
  page: number;
  totalPages: number;
  readMoreLabel: string;
  paginationLabels: NewsPaginationLabels;
}) {
  return (
    <section className="bg-navy px-5 pb-24 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article, index) => (
            <li key={article.slug}>
              <NewsCard
                article={article}
                locale={locale}
                readMoreLabel={readMoreLabel}
                // Las primeras de la página entran en pantalla: se cargan sin
                // esperar al scroll para no penalizar el LCP.
                priority={index < 4}
              />
            </li>
          ))}
        </ul>

        <NewsPagination page={page} totalPages={totalPages} labels={paginationLabels} />
      </div>
    </section>
  );
}
