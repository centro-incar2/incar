import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/page-header";
import { buildMetadata } from "@/lib/seo";
import { getNewsCards } from "@/lib/cms/news";
import { NewsCard } from "@/components/news/news-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "News" });
  return buildMetadata({
    locale,
    pathname: "/noticias",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("News");
  const articles = await getNewsCards();

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />

      <section className="bg-navy px-5 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((article) => (
              <li key={article.slug}>
                <NewsCard
                  article={article}
                  locale={locale}
                  readMoreLabel={t("readMore")}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
