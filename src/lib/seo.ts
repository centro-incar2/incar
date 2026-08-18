import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

/**
 * Genera metadata SEO por página con canonical + hreflang alternates por idioma,
 * usando las rutas localizadas. Centraliza el SEO técnico (CLAUDE.md §5).
 */
export async function buildMetadata({
  locale,
  pathname,
  params,
  title,
  description,
}: {
  locale: Locale;
  pathname: AppPathname;
  /** Params para rutas dinámicas (p. ej. { slug } en /publicaciones/[slug]). */
  params?: Record<string, string>;
  title: string;
  description: string;
}): Promise<Metadata> {
  const tMeta = await getTranslations({ locale, namespace: "Meta" });

  // Construye el href para getPathname: simple si no hay params, o { pathname, params }.
  // El cast unifica la ruta estática y la dinámica ([slug]) en un solo argumento.
  type GetPathnameArg = Parameters<typeof getPathname>[0];
  const hrefFor = (loc: Locale) =>
    getPathname({
      href: params ? { pathname, params } : pathname,
      locale: loc,
    } as GetPathnameArg);

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = SITE_URL + hrefFor(loc);
  }
  const canonical = SITE_URL + hrefFor(locale);
  // Imagen social única del sitio (1200×630, CLAUDE.md §5).
  const ogImage = {
    url: `${SITE_URL}/og.jpg`,
    width: 1200,
    height: 630,
    alt: tMeta("siteName"),
  };

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { ...languages, "x-default": languages[routing.defaultLocale] },
    },
    openGraph: {
      type: "website",
      siteName: tMeta("siteName"),
      locale: locale === "es" ? "es_CL" : "en_US",
      url: canonical,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}
