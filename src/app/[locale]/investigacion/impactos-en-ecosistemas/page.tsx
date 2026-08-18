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
  const t = await getTranslations({ locale, namespace: "Ecosystems" });
  return buildMetadata({
    locale,
    pathname: "/investigacion/impactos-en-ecosistemas",
    title: t("title"),
    description: t("lead").slice(0, 155),
  });
}

export default async function EcosystemsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <ResearchPage
      namespace="Ecosystems"
      heroImage="/images/lineas/rl5-1.webp"
      focusImage="/images/lineas/rl5-2.webp"
      closingImage="/images/lineas/rl5-3.webp"
    />
  );
}
