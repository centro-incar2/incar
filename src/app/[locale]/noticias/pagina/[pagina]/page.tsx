import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/page-header";
import { buildMetadata } from "@/lib/seo";
import { getNewsPage, getNewsPageNumbers } from "@/lib/cms/news";
import { NewsList } from "@/components/news/news-list";

/**
 * Páginas 2..N del listado de noticias. La primera se sirve en `/noticias`, así
 * que aquí se rechaza el 1 para no publicar la misma lista en dos URL.
 */
const parsePagina = (valor: string): number | null => {
  if (!/^[2-9]\d*$/.test(valor)) return null;
  return Number(valor);
};

export async function generateStaticParams() {
  const numbers = await getNewsPageNumbers();
  return routing.locales.flatMap((locale) =>
    numbers
      .filter((n) => n > 1)
      .map((n) => ({ locale, pagina: String(n) })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; pagina: string }>;
}): Promise<Metadata> {
  const { locale, pagina } = await params;
  const numero = parsePagina(pagina);
  if (numero === null) notFound();

  const t = await getTranslations({ locale, namespace: "News" });
  return buildMetadata({
    locale,
    pathname: "/noticias/pagina/[pagina]",
    params: { pagina },
    // El título distingue cada página para que no compitan entre sí en el índice.
    title: `${t("title")} · ${t("pageNumber", { page: numero })}`,
    description: t("lead"),
  });
}

export default async function NewsPaginatedPage({
  params,
}: {
  params: Promise<{ locale: Locale; pagina: string }>;
}) {
  const { locale, pagina } = await params;
  setRequestLocale(locale);

  const numero = parsePagina(pagina);
  if (numero === null) notFound();

  const t = await getTranslations("News");
  const { articles, page, totalPages } = await getNewsPage(numero);
  // Un número fuera de rango no debe devolver la última página con 200.
  if (page !== numero) notFound();

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
