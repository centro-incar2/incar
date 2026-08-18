import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/page-header";
import { buildMetadata } from "@/lib/seo";
import {
  getPublicationCards,
  getUsedResearchLines,
  getPublicationYears,
} from "@/lib/cms/publications";
import { PublicationsExplorer } from "@/components/publications/publications-explorer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Publications" });
  return buildMetadata({
    locale,
    pathname: "/publicaciones",
    title: t("title"),
    description: t("lead").slice(0, 155),
  });
}

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Publications");
  const cards = await getPublicationCards();

  return (
    <>
      <PageHeader
        title={t("title")}
        lead={t("lead")}
        leadSecondary={t("leadSecondary")}
      />

      {/* Explorador (buscador + filtros + rejilla) */}
      <section className="bg-navy px-5 pb-24 lg:px-10">
        <PublicationsExplorer
          publications={cards}
          lines={getUsedResearchLines(cards)}
          years={getPublicationYears(cards)}
        />
      </section>
    </>
  );
}
