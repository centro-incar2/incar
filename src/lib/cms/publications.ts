import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { Locale } from "@/i18n/routing";
import type { Media } from "@/payload-types";
import { researchLines, type ResearchLine } from "@/content/research-lines";
import { publications as staticPublications } from "@/content/publications";
import { getCms } from "./payload";
import { mediaUrl } from "./media";
import { paragraphsToLexical } from "./lexical";
import { useStaticCms } from "./source";

/** Modelo de vista de una publicación (fuente: Payload). */
export interface CmsPublication {
  slug: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  date: string;
  line: string;
  url?: string;
  image?: string;
  summary?: Record<Locale, string>;
  /** Presente solo en el detalle (no se envía en los listados). */
  content?: Record<Locale, SerializedEditorState>;
  /** Si tiene contenido interno → hay página de detalle; si no, la tarjeta enlaza al DOI. */
  hasDetail: boolean;
  featured: boolean;
}

// ── Forma cruda que devuelve Payload con `locale: "all"` (campos localizados
//    como objeto por idioma). Los tipos generados asumen un solo idioma. ──────
type PerLocale<T> = Partial<Record<Locale, T | null>>;
interface RawPublication {
  slug: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  date: string;
  line: string;
  url?: string | null;
  image?: number | Media | null;
  featured?: boolean | null;
  summary?: PerLocale<string>;
  content?: PerLocale<SerializedEditorState>;
}

const isNonEmptyState = (state?: SerializedEditorState | null): boolean =>
  Boolean(state?.root?.children?.length);

const hasContent = (content?: PerLocale<SerializedEditorState>): boolean =>
  Boolean(content && (isNonEmptyState(content.es) || isNonEmptyState(content.en)));

/** Devuelve un `Record<Locale,string>` con relleno cruzado, o `undefined` si vacío. */
const pickText = (value?: PerLocale<string>): Record<Locale, string> | undefined => {
  if (!value) return undefined;
  const es = value.es ?? value.en ?? "";
  const en = value.en ?? value.es ?? "";
  if (!es && !en) return undefined;
  return { es, en };
};

const pickContent = (
  value?: PerLocale<SerializedEditorState>,
): Record<Locale, SerializedEditorState> | undefined => {
  if (!hasContent(value)) return undefined;
  const es = value?.es ?? value?.en;
  const en = value?.en ?? value?.es;
  if (!es || !en) return undefined;
  return { es, en };
};

const toCard = (doc: RawPublication): CmsPublication => ({
  slug: doc.slug,
  title: doc.title,
  authors: doc.authors,
  journal: doc.journal,
  year: doc.year,
  date: doc.date,
  line: doc.line,
  url: doc.url ?? undefined,
  image: mediaUrl(doc.image),
  summary: pickText(doc.summary),
  hasDetail: hasContent(doc.content),
  featured: Boolean(doc.featured),
});

const toDetail = (doc: RawPublication): CmsPublication => ({
  ...toCard(doc),
  content: pickContent(doc.content),
});

const fetchAll = async (): Promise<RawPublication[]> => {
  const cms = await getCms();
  const { docs } = await cms.find({
    collection: "publications",
    locale: "all",
    depth: 1,
    limit: 200,
    sort: "-date",
  });
  return docs as unknown as RawPublication[];
};

// ── Fuente estática (deploy sin base de datos): construye el modelo de vista
//    directamente desde `src/content/publications.ts`. ─────────────────────────
type StaticPublication = (typeof staticPublications)[number];

const staticCard = (p: StaticPublication): CmsPublication => ({
  slug: p.slug,
  title: p.title,
  authors: p.authors,
  journal: p.journal,
  year: p.year,
  date: p.date,
  line: p.line,
  url: p.url,
  image: p.image, // ruta pública `/images/...` (servida estáticamente)
  summary: p.summary,
  hasDetail: Boolean(p.content),
  featured: Boolean(p.featured),
});

const staticDetail = (p: StaticPublication): CmsPublication => ({
  ...staticCard(p),
  content: p.content
    ? {
        es: paragraphsToLexical(p.content.es),
        en: paragraphsToLexical(p.content.en),
      }
    : undefined,
});

const staticSorted = (): StaticPublication[] =>
  [...staticPublications].sort((a, b) => b.date.localeCompare(a.date));

/** Tarjetas de todas las publicaciones (sin contenido pesado), más recientes primero. */
export const getPublicationCards = async (): Promise<CmsPublication[]> => {
  if (useStaticCms()) return staticSorted().map(staticCard);
  return (await fetchAll()).map(toCard);
};

/** Detalle de una publicación por slug (incluye el contenido enriquecido). */
export const getPublicationDetail = async (
  slug: string,
): Promise<CmsPublication | null> => {
  if (useStaticCms()) {
    const p = staticPublications.find((pub) => pub.slug === slug);
    return p ? staticDetail(p) : null;
  }
  const cms = await getCms();
  const { docs } = await cms.find({
    collection: "publications",
    locale: "all",
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
  });
  const doc = docs[0] as unknown as RawPublication | undefined;
  return doc ? toDetail(doc) : null;
};

/** Publicaciones relacionadas: misma línea, excluye la actual. */
export const getRelatedPublications = async (
  pub: CmsPublication,
  limit = 3,
): Promise<CmsPublication[]> =>
  (await getPublicationCards())
    .filter((p) => p.line === pub.line && p.slug !== pub.slug)
    .slice(0, limit);

/** Slugs con página de detalle (para `generateStaticParams`). */
export const getPublicationDetailSlugs = async (): Promise<string[]> => {
  if (useStaticCms()) {
    return staticPublications.filter((p) => p.content).map((p) => p.slug);
  }
  return (await fetchAll()).filter((d) => hasContent(d.content)).map((d) => d.slug);
};

/** Años presentes (descendente) para el filtro "Año". */
export const getPublicationYears = (cards: CmsPublication[]): number[] =>
  Array.from(new Set(cards.map((p) => p.year))).sort((a, b) => b - a);

/** Líneas de investigación con al menos una publicación. */
export const getUsedResearchLines = (cards: CmsPublication[]): ResearchLine[] => {
  const used = new Set(cards.map((p) => p.line));
  return researchLines.filter((line) => used.has(line.slug));
};
