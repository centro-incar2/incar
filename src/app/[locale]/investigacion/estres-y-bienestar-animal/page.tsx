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
  const t = await getTranslations({ locale, namespace: "Welfare" });
  return buildMetadata({
    locale,
    pathname: "/investigacion/estres-y-bienestar-animal",
    title: t("title"),
    description: t("lead").slice(0, 155),
  });
}

export default async function WelfarePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <ResearchPage
      namespace="Welfare"
      heroImage="/images/lineas/rl4-1.webp"
      focusImage="/images/lineas/rl4-2.webp"
      closingImage="/images/lineas/rl4-3.webp"
    />
  );
}
