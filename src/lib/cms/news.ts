import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { Locale } from "@/i18n/routing";
import type { Media } from "@/payload-types";
import { news as staticNews } from "@/content/news";
import { getCms } from "./payload";
import { mediaUrl } from "./media";
import { blocksToLexical } from "./lexical";
import { useStaticCms } from "./source";

/** Modelo de vista de una noticia (fuente: Payload). */
export interface CmsNewsArticle {
  slug: string;
  title: Record<Locale, string>;
  date: string;
  image: string;
  imageAlt: Record<Locale, string>;
  sourceUrl: string;
  excerpt: Record<Locale, string>;
  /** Presente solo en el detalle. */
  content?: Record<Locale, SerializedEditorState>;
  featured: boolean;
}

type PerLocale<T> = Partial<Record<Locale, T | null>>;
interface RawNews {
  slug: string;
  title?: PerLocale<string>;
  date: string;
  image?: number | Media | null;
  imageAlt?: PerLocale<string>;
  sourceUrl?: string | null;
  excerpt?: PerLocale<string>;
  content?: PerLocale<SerializedEditorState>;
  featured?: boolean | null;
}

const text = (value?: PerLocale<string>): Record<Locale, string> => ({
  es: value?.es ?? value?.en ?? "",
  en: value?.en ?? value?.es ?? "",
});

const pickContent = (
  value?: PerLocale<SerializedEditorState>,
): Record<Locale, SerializedEditorState> | undefined => {
  const es = value?.es ?? value?.en;
  const en = value?.en ?? value?.es;
  if (!es || !en) return undefined;
  return { es, en };
};

const toCard = (doc: RawNews): CmsNewsArticle => ({
  slug: doc.slug,
  title: text(doc.title),
  date: doc.date,
  image: mediaUrl(doc.image) ?? "",
  imageAlt: text(doc.imageAlt),
  sourceUrl: doc.sourceUrl ?? "",
  excerpt: text(doc.excerpt),
  featured: Boolean(doc.featured),
});

const fetchAll = async (): Promise<RawNews[]> => {
  const cms = await getCms();
  const { docs } = await cms.find({
    collection: "news",
    locale: "all",
    depth: 1,
    limit: 200,
    sort: "-date",
  });
  return docs as unknown as RawNews[];
};

// ── Fuente estática (deploy sin base de datos): desde `src/content/news.ts`. ──
type StaticNews = (typeof staticNews)[number];

const staticSorted = (): StaticNews[] =>
  [...staticNews].sort((a, b) => +new Date(b.date) - +new Date(a.date));

const staticCard = (a: StaticNews): CmsNewsArticle => ({
  slug: a.slug,
  title: a.title,
  date: a.date,
  image: a.image, // ruta pública `/images/...` (servida estáticamente)
  imageAlt: a.imageAlt,
  sourceUrl: a.sourceUrl,
  excerpt: a.excerpt,
  featured: Boolean(a.featured),
});

/** Noticias ordenadas por fecha (más recientes primero). */
export const getNewsCards = async (): Promise<CmsNewsArticle[]> => {
  if (useStaticCms()) return staticSorted().map(staticCard);
  return (await fetchAll()).map(toCard);
};

/** Detalle de una noticia por slug (incluye el cuerpo enriquecido). */
export const getNewsDetail = async (
  slug: string,
): Promise<CmsNewsArticle | null> => {
  if (useStaticCms()) {
    const a = staticNews.find((article) => article.slug === slug);
    if (!a) return null;
    return {
      ...staticCard(a),
      content: {
        es: blocksToLexical(a.content, "es"),
        en: blocksToLexical(a.content, "en"),
      },
    };
  }
  const cms = await getCms();
  const { docs } = await cms.find({
    collection: "news",
    locale: "all",
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
  });
  const doc = docs[0] as unknown as RawNews | undefined;
  if (!doc) return null;
  return { ...toCard(doc), content: pickContent(doc.content) };
};

/** Noticias por página del listado. */
export const NEWS_PER_PAGE = 15;

export interface NewsPage {
  articles: CmsNewsArticle[];
  page: number;
  totalPages: number;
}

/**
 * Tramo de noticias de una página del listado.
 *
 * Se pagina en memoria sobre la lista ya ordenada: son decenas de notas, no
 * miles, y así el listado, el detalle y el sitemap comparten una única consulta
 * y el mismo criterio de orden.
 */
export const getNewsPage = async (page: number): Promise<NewsPage> => {
  const all = await getNewsCards();
  const totalPages = Math.max(1, Math.ceil(all.length / NEWS_PER_PAGE));
  const actual = Math.min(Math.max(1, page), totalPages);
  const desde = (actual - 1) * NEWS_PER_PAGE;
  return {
    articles: all.slice(desde, desde + NEWS_PER_PAGE),
    page: actual,
    totalPages,
  };
};

/** Números de página existentes (para `generateStaticParams`). */
export const getNewsPageNumbers = async (): Promise<number[]> => {
  const { totalPages } = await getNewsPage(1);
  return Array.from({ length: totalPages }, (_, i) => i + 1);
};

/** Otras noticias recientes (excluye la actual). */
export const getRelatedNews = async (
  article: CmsNewsArticle,
  limit = 4,
): Promise<CmsNewsArticle[]> =>
  (await getNewsCards())
    .filter((n) => n.slug !== article.slug)
    .slice(0, limit);

/** Slugs de todas las noticias (para `generateStaticParams`). */
export const getNewsSlugs = async (): Promise<string[]> => {
  if (useStaticCms()) return staticNews.map((a) => a.slug);
  return (await fetchAll()).map((d) => d.slug);
};
