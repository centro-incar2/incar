import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/page-header";
import { buildMetadata } from "@/lib/seo";
import { getNewsPage } from "@/lib/cms/news";
import { NewsList } from "@/components/news/news-list";

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
  const { articles, page, totalPages } = await getNewsPage(1);

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />

      <NewsList
        articles={articles}
        locale={locale}
        page={page}
        totalPages={totalPages}
        readMoreLabel={t("readMore")}
        paginationLabels={{
          label: t("paginationLabel"),
          previous: t("previousPage"),
          next: t("nextPage"),
          goToPage: (n: number) => t("goToPage", { page: n }),
        }}
      />
    </>
  );
}
