import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { ResearchPage } from "@/components/sections/research-page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Omics" });
  return buildMetadata({
    locale,
    pathname: "/investigacion/soluciones-omicas",
    title: t("title"),
    description: t("lead").slice(0, 155),
  });
}

export default async function OmicsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <ResearchPage
      namespace="Omics"
      heroImage="/images/lineas/rl3-1.webp"
      focusImage="/images/lineas/rl3-2.webp"
      closingImage="/images/lineas/rl3-3.webp"
    />
  );
}
