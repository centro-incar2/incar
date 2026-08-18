import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Sora } from "next/font/google";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import "../globals.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    applicationName: t("siteName"),
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      locale: locale === "es" ? "es_CL" : "en_US",
      title: t("titleDefault"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleDefault"),
      description: t("description"),
    },
    robots: { index: true, follow: true },
    // Verificación de propiedad en Google Search Console. El token es público
    // (viaja en el HTML) y debe permanecer mientras la propiedad exista: si se
    // quita, Google revoca la verificación y se pierde el acceso a los informes.
    verification: { google: "Wmq5Ukcya0BML_2WvSVOVK8smes5uuVGzyFsKT3TRTE" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("Nav");

  return (
    <html lang={locale} className={sora.variable}>
      <body>
        <NextIntlClientProvider>
          <a
            href="#contenido-principal"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[2000] focus:rounded-md focus:bg-teal focus:px-4 focus:py-2 focus:text-white"
          >
            {t("skipToContent")}
          </a>
          <SiteHeader />
          <ScrollReveal />
          <main id="contenido-principal">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
