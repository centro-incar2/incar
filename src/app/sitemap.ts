import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname, type StaticPathname } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import { getPublicationCards } from "@/lib/cms/publications";
import { getResearchMembers } from "@/lib/cms/members";
import { getNewsCards, getNewsPageNumbers } from "@/lib/cms/news";

/**
 * Sitemap con una entrada por página y sus alternates por idioma (hreflang).
 * Incluye las páginas estáticas y cada publicación (ruta dinámica).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  // Solo las publicaciones con página de detalle interno entran al sitemap.
  const publications = (await getPublicationCards()).filter((p) => p.hasDetail);
  const news = await getNewsCards();

  // Páginas estáticas (excluye las plantillas con segmentos dinámicos).
  const staticPaths = (Object.keys(routing.pathnames) as AppPathname[]).filter(
    (p): p is StaticPathname => !p.includes("["),
  );

  for (const pathname of staticPaths) {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = SITE_URL + getPathname({ href: pathname, locale });
    }
    entries.push({
      url: SITE_URL + getPathname({ href: pathname, locale: routing.defaultLocale }),
      lastModified: new Date(),
      changeFrequency: pathname === "/" ? "weekly" : "monthly",
      priority: pathname === "/" ? 1 : 0.7,
      alternates: { languages },
    });
  }

  // Publicaciones (ruta dinámica /publicaciones/[slug]).
  for (const pub of publications) {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] =
        SITE_URL +
        getPathname({
          href: { pathname: "/publicaciones/[slug]", params: { slug: pub.slug } },
          locale,
        });
    }
    entries.push({
      url:
        SITE_URL +
        getPathname({
          href: { pathname: "/publicaciones/[slug]", params: { slug: pub.slug } },
          locale: routing.defaultLocale,
        }),
      lastModified: new Date(pub.date),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages },
    });
  }

  // Noticias (ruta dinámica /noticias/[slug]).
  for (const article of news) {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] =
        SITE_URL +
        getPathname({
          href: { pathname: "/noticias/[slug]", params: { slug: article.slug } },
          locale,
        });
    }
    entries.push({
      url:
        SITE_URL +
        getPathname({
          href: { pathname: "/noticias/[slug]", params: { slug: article.slug } },
          locale: routing.defaultLocale,
        }),
      lastModified: new Date(article.date),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages },
    });
  }

  // Páginas 2..N del listado de noticias: son las que dan acceso rastreable a
  // las notas antiguas, que ya no aparecen en /noticias.
  for (const numero of (await getNewsPageNumbers()).filter((n) => n > 1)) {
    const href = {
      pathname: "/noticias/pagina/[pagina]" as const,
      params: { pagina: String(numero) },
    };
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = SITE_URL + getPathname({ href, locale });
    }
    entries.push({
      url: SITE_URL + getPathname({ href, locale: routing.defaultLocale }),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages },
    });
  }

  // Perfiles de integrantes (ruta dinámica /investigacion/equipo/[slug]).
  for (const member of await getResearchMembers()) {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] =
        SITE_URL +
        getPathname({
          href: {
            pathname: "/investigacion/equipo/[slug]",
            params: { slug: member.slug },
          },
          locale,
        });
    }
    entries.push({
      url:
        SITE_URL +
        getPathname({
          href: {
            pathname: "/investigacion/equipo/[slug]",
            params: { slug: member.slug },
          },
          locale: routing.defaultLocale,
        }),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages },
    });
  }

  return entries;
}
