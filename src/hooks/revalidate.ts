import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";
import { routing } from "@/i18n/routing";

/**
 * Revalidación del sitio público tras editar contenido en el panel.
 *
 * Las páginas se generan estáticamente en el build. Sin estos hooks, lo que un
 * editor publica en `/admin` no aparecería en el sitio hasta el siguiente
 * despliegue. Al guardar o borrar se invalidan las rutas afectadas en ambos
 * idiomas y Next las regenera en la siguiente visita.
 *
 * `revalidatePath` solo existe dentro del runtime de Next: el seed y el CLI de
 * Payload corren en Node puro, donde la importación falla. Por eso se importa de
 * forma diferida y se degrada a un aviso en el log en vez de romper la escritura.
 */

/** Documento mínimo del que se derivan las rutas a invalidar. */
type Doc = { slug?: unknown; line?: unknown } | null | undefined;

const str = (value: unknown): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

/**
 * Rutas CANÓNICAS afectadas por cada colección, es decir las carpetas bajo
 * `app/[locale]/`.
 *
 * Ojo: no son las URLs públicas. Con `localePrefix: "as-needed"` y `pathnames`
 * localizados, el middleware de next-intl reescribe `/noticias` y `/en/news`
 * hacia `/es/noticias` y `/en/noticias`, y la caché de Next se indexa por esa
 * ruta interna. Revalidar la URL pública no invalida nada.
 */
const AFFECTED_PATHS = {
  // El listado está paginado y se ordena por fecha, así que una nota nueva no
  // entra necesariamente en la primera página: si trae fecha antigua aparece en
  // la última. Por eso se invalida la ruta dinámica completa —`[pagina]` con
  // tipo "page" alcanza todas sus instancias— y no solo `/noticias`.
  news: (doc: Doc) => {
    const slug = str(doc?.slug);
    return [
      "/noticias",
      "/noticias/pagina/[pagina]",
      ...(slug ? [`/noticias/${slug}`] : []),
    ];
  },
  publications: (doc: Doc) => {
    const slug = str(doc?.slug);
    return ["/publicaciones", ...(slug ? [`/publicaciones/${slug}`] : [])];
  },
  // Un integrante aparece en su perfil y en el grid de su línea; el índice de
  // investigación y Gobernanza también listan personas.
  "research-members": (doc: Doc) => {
    const slug = str(doc?.slug);
    const line = str(doc?.line);
    return [
      "/investigacion",
      "/gobernanza",
      ...(line ? [`/investigacion/${line}`] : []),
      ...(slug ? [`/investigacion/equipo/${slug}`] : []),
    ];
  },
  "management-team": (doc: Doc) => {
    const slug = str(doc?.slug);
    return ["/equipo-de-gestion", ...(slug ? [`/equipo-de-gestion/${slug}`] : [])];
  },
  // Los documentos se listan en Políticas Públicas, y la portada enlaza a esa
  // sección desde el carrusel de destacados.
  "policy-documents": () => ["/politicas-publicas", "/"],
} as const;

type RevalidatableCollection = keyof typeof AFFECTED_PATHS;

type Logger = { warn: (msg: string) => void; info: (msg: string) => void };

/**
 * Invalida una lista de rutas; devuelve `false` si Next no estaba disponible.
 *
 * Una ruta con corchetes es una plantilla dinámica: se invalida con el tipo
 * "page" para alcanzar todas sus instancias de una vez, en vez de tener que
 * enumerarlas.
 */
const revalidatePaths = async (paths: string[], logger: Logger): Promise<boolean> => {
  try {
    const { revalidatePath } = await import("next/cache");
    for (const path of paths) {
      if (path.includes("[")) revalidatePath(path, "page");
      else revalidatePath(path);
    }
    return true;
  } catch (error) {
    // Escenario esperado fuera de Next (seed, CLI): la escritura ya ocurrió y el
    // contenido se tomará en el próximo build, así que no se propaga el error.
    logger.warn(
      `Revalidación omitida (fuera del runtime de Next): ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return false;
  }
};

/** Rutas internas con prefijo de idioma para cada idioma configurado. */
const localized = (collection: RevalidatableCollection, doc: Doc): string[] =>
  AFFECTED_PATHS[collection](doc).flatMap((path) =>
    routing.locales.map((locale) => `/${locale}${path}`),
  );

/**
 * Revalida tras crear o actualizar. Incluye las rutas del documento anterior
 * cuando cambió de slug o de línea, para que no quede una página huérfana.
 */
export const revalidateAfterChange =
  (collection: RevalidatableCollection): CollectionAfterChangeHook =>
  async ({ doc, previousDoc, req }) => {
    const paths = new Set([
      ...localized(collection, doc as Doc),
      ...localized(collection, previousDoc as Doc),
    ]);

    const done = await revalidatePaths([...paths], req.payload.logger);
    if (done) {
      req.payload.logger.info(
        `Revalidado ${collection}: ${str((doc as Doc)?.slug) ?? "(sin slug)"}`,
      );
    }
    return doc;
  };

/**
 * Revalida el sitio COMPLETO. Lo usan los globals de página: sus textos se
 * fusionan sobre las traducciones, que se cargan en el layout raíz, así que un
 * cambio puede afectar a cualquier página (el pie y el menú están en todas).
 */
const revalidateEverything = async (logger: Logger): Promise<void> => {
  try {
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/", "layout");
    logger.info("Revalidado el sitio completo tras editar una página.");
  } catch (error) {
    logger.warn(
      `Revalidación omitida (fuera del runtime de Next): ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
};

/** Versión para globals de página. */
export const revalidateSite: GlobalAfterChangeHook = async ({ doc, req }) => {
  await revalidateEverything(req.payload.logger);
  return doc;
};

/**
 * Versión para colecciones cuyo contenido también se fusiona sobre las
 * traducciones (los textos de las líneas de investigación). Payload tipa los
 * hooks de colección y de global por separado, así que no se puede reutilizar
 * el mismo callback.
 */
export const revalidateSiteFromCollection: CollectionAfterChangeHook = async ({
  doc,
  req,
}) => {
  await revalidateEverything(req.payload.logger);
  return doc;
};

/** Revalida tras borrar, para que el documento desaparezca de los listados. */
export const revalidateAfterDelete =
  (collection: RevalidatableCollection): CollectionAfterDeleteHook =>
  async ({ doc, req }) => {
    await revalidatePaths(localized(collection, doc as Doc), req.payload.logger);
    return doc;
  };
