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
  const t = await getTranslations({ locale, namespace: "Vaccines" });
  return buildMetadata({
    locale,
    pathname: "/investigacion/nuevas-vacunas-para-peces",
    title: `${t("title")} ${t("titleAccent")}`,
    description: t("lead").slice(0, 155),
  });
}

export default async function VaccinesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <ResearchPage
      namespace="Vaccines"
      heroImage="/images/lineas/rl1-1.webp"
      focusImage="/images/lineas/rl1-2.webp"
      closingImage="/images/lineas/rl1-3.webp"
    />
  );
}
