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
  const t = await getTranslations({ locale, namespace: "Socioeconomic" });
  return buildMetadata({
    locale,
    pathname: "/investigacion/impactos-socioeconomicos",
    title: t("title"),
    description: t("lead").slice(0, 155),
  });
}

export default async function SocioeconomicPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <ResearchPage
      namespace="Socioeconomic"
      heroImage="/images/lineas/rl8-1.webp"
      focusImage="/images/lineas/rl8-2.webp"
      closingImage="/images/lineas/rl8-3.webp"
    />
  );
}
