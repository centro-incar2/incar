/**
 * Seed inicial de la Fase 3 (Payload CMS).
 *
 * Migra el contenido que hasta ahora vivía hardcodeado en `src/content/*.ts`
 * (Publicaciones y Noticias, más sus imágenes) a la base de datos de Payload,
 * que pasa a ser la fuente de verdad. Es idempotente: limpia las colecciones
 * antes de recrear, de modo que puede ejecutarse varias veces sin duplicar.
 *
 * Ejecutar con:  npm run seed   (usa el loader nativo de Node + .env.local)
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Publication as PublicationDoc } from "@/payload-types";

import { publications } from "@/content/publications";
import { news, type NewsBlock } from "@/content/news";
import {
  paragraphsToLexical as toParagraphs,
  blocksToLexical as toBlocks,
} from "@/lib/cms/lexical";

/** Estado del editor Lexical tal como lo tipan los tipos generados de Payload. */
type EditorState = NonNullable<PublicationDoc["content"]>;
/** Slugs válidos del campo `line` (unión generada). */
type LineSlug = PublicationDoc["line"];

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Conversores Lexical compartidos con la fuente estática (`src/lib/cms/lexical`).
// Se ajusta el tipo al que exigen los tipos generados de Payload en el `create`.
const paragraphsToLexical = (paragraphs: string[]): EditorState =>
  toParagraphs(paragraphs) as unknown as EditorState;

const blocksToLexical = (blocks: NewsBlock[], locale: "es" | "en"): EditorState =>
  toBlocks(blocks, locale) as unknown as EditorState;

// ── Seed ────────────────────────────────────────────────────────────────────

const seed = async () => {
  const payload = await getPayload({ config });

  // 1. Limpiar colecciones (idempotencia).
  for (const collection of ["publications", "news", "media"] as const) {
    await payload.delete({ collection, where: { id: { exists: true } } });
  }
  payload.logger.info("Colecciones limpiadas.");

  // 2. Subir imágenes una sola vez, cacheadas por ruta pública.
  const mediaCache = new Map<string, number>();
  const uploadImage = async (
    publicPath: string,
    alt?: { es: string; en: string },
  ): Promise<number> => {
    const cached = mediaCache.get(publicPath);
    if (cached !== undefined) return cached;

    const filePath = path.join(PROJECT_ROOT, "public", publicPath.replace(/^\//, ""));
    const created = await payload.create({
      collection: "media",
      locale: "es",
      filePath,
      data: { alt: alt?.es ?? "" },
    });
    const id = Number(created.id);
    if (alt) {
      await payload.update({
        collection: "media",
        id,
        locale: "en",
        data: { alt: alt.en },
      });
    }
    mediaCache.set(publicPath, id);
    return id;
  };

  // 3. Publicaciones.
  for (const pub of publications) {
    const imageId = pub.image ? await uploadImage(pub.image) : undefined;
    const created = await payload.create({
      collection: "publications",
      locale: "es",
      data: {
        title: pub.title,
        slug: pub.slug,
        authors: pub.authors,
        journal: pub.journal,
        year: pub.year,
        date: new Date(pub.date).toISOString(),
        line: pub.line as LineSlug,
        url: pub.url,
        featured: pub.featured ?? false,
        ...(imageId ? { image: imageId } : {}),
        ...(pub.summary ? { summary: pub.summary.es } : {}),
        ...(pub.content ? { content: paragraphsToLexical(pub.content.es) } : {}),
      },
    });
    await payload.update({
      collection: "publications",
      id: created.id,
      locale: "en",
      data: {
        ...(pub.summary ? { summary: pub.summary.en } : {}),
        ...(pub.content ? { content: paragraphsToLexical(pub.content.en) } : {}),
      },
    });
  }
  payload.logger.info(`Publicaciones migradas: ${publications.length}.`);

  // 4. Noticias.
  for (const article of news) {
    const imageId = await uploadImage(article.image, article.imageAlt);
    const created = await payload.create({
      collection: "news",
      locale: "es",
      data: {
        slug: article.slug,
        title: article.title.es,
        date: new Date(article.date).toISOString(),
        image: imageId,
        imageAlt: article.imageAlt.es,
        sourceUrl: article.sourceUrl,
        excerpt: article.excerpt.es,
        content: blocksToLexical(article.content, "es"),
        featured: article.featured ?? false,
      },
    });
    await payload.update({
      collection: "news",
      id: created.id,
      locale: "en",
      data: {
        title: article.title.en,
        imageAlt: article.imageAlt.en,
        excerpt: article.excerpt.en,
        content: blocksToLexical(article.content, "en"),
      },
    });
  }
  payload.logger.info(`Noticias migradas: ${news.length}.`);

  payload.logger.info("✓ Seed completado.");
  process.exit(0);
};

seed().catch((error) => {
  console.error("✗ Error en el seed:", error);
  process.exit(1);
});
