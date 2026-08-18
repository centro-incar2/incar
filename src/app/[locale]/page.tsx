import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { HomeHero } from "@/components/sections/home-hero";
import { QuickLinks } from "@/components/sections/quick-links";
import { ResearchGrid } from "@/components/sections/research-grid";
import { ServicesTransfer } from "@/components/sections/services-transfer";
import { CollaborationBand } from "@/components/sections/collaboration-band";
import { InstitutionalLogos } from "@/components/sections/institutional-logos";
import { SocialBand } from "@/components/sections/social-band";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    locale,
    pathname: "/",
    title: t("titleDefault"),
    description: t("description"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomeHero />
      <QuickLinks />
      <ResearchGrid />
      <ServicesTransfer />
      <CollaborationBand />
      <SocialBand />
      <InstitutionalLogos />
    </>
  );
}
