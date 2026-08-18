import type { Locale } from "@/i18n/routing";
import { LINE_NAMESPACE } from "@/content/research-namespaces";
import { getCms } from "./payload";
import { useStaticCms } from "./source";

/**
 * Textos de página administrados desde el panel.
 *
 * Cada global de `src/globals/` corresponde a un namespace de traducción y sus
 * campos se llaman igual que las claves. Aquí se leen y se convierten en un
 * objeto de mensajes parcial que `src/i18n/request.ts` fusiona SOBRE los
 * archivos `src/messages/*.json`.
 *
 * Regla central: solo se emiten los valores con contenido. Un campo vacío en el
 * panel no borra el texto del sitio, cae al del archivo. Así una edición a
 * medias nunca deja una sección en blanco, y el sitio sigue funcionando aunque
 * el global no se haya creado todavía.
 */

/** Global de Payload → namespace de traducción. */
const GLOBAL_NAMESPACES = {
  home: "Home",
  about: "About",
  governance: "Governance",
  collaborations: "Collaborations",
  transfer: "Transfer",
  events: "Events",
  initiatives: "Initiatives",
  communications: "Communications",
  contact: "Contact",
  services: "Services",
  "public-policy": "PublicPolicy",
  "publications-page": "Publications",
  "news-page": "News",
  "research-index": "ResearchIndex",
  "management-page": "Management",
  "mission-vision": "MissionVision",
} as const;

type GlobalSlug = keyof typeof GLOBAL_NAMESPACES;

type MessageValue = string | string[] | { title: string; text: string }[];
type Messages = Record<string, Record<string, MessageValue>>;

const isRows = (value: unknown): value is Record<string, unknown>[] =>
  Array.isArray(value) && value.every((row) => typeof row === "object" && row !== null);

/** Filas `{ value }` de los campos de lista simple → arreglo de textos. */
const isRowList = (value: unknown): value is { value?: unknown }[] =>
  isRows(value) && value.every((row) => "value" in row);

/** Filas `{ title, text }` de los campos de lista con título. */
const isPairList = (value: unknown): value is { title?: unknown; text?: unknown }[] =>
  isRows(value) && value.every((row) => "title" in row && "text" in row);

/**
 * Convierte un documento de global en claves de traducción, descartando lo
 * vacío y los metadatos internos de Payload.
 */
const toMessages = (doc: Record<string, unknown>): Record<string, MessageValue> => {
  const result: Record<string, MessageValue> = {};

  for (const [key, value] of Object.entries(doc)) {
    if (key === "id" || key === "globalType" || key === "createdAt" || key === "updatedAt") {
      continue;
    }

    if (typeof value === "string") {
      if (value.trim().length > 0) result[key] = value;
      continue;
    }

    // El orden importa: `pairs` se comprueba antes que la lista simple, porque
    // una fila con título y texto también es un objeto.
    if (isPairList(value)) {
      const items = value
        .map((row) => ({
          title: typeof row.title === "string" ? row.title : "",
          text: typeof row.text === "string" ? row.text : "",
        }))
        .filter((item) => item.title.length > 0 || item.text.length > 0);
      if (items.length > 0) result[key] = items;
      continue;
    }

    if (isRowList(value)) {
      const items = value
        .map((row) => (typeof row.value === "string" ? row.value : ""))
        .filter((entry) => entry.trim().length > 0);
      if (items.length > 0) result[key] = items;
    }
  }

  return result;
};

/**
 * Textos administrados para un idioma, listos para fusionar sobre los mensajes.
 * Devuelve `{}` cuando no hay base de datos o si la lectura falla: el sitio debe
 * renderizar con los textos del archivo antes que caerse.
 */
export const getManagedMessages = async (locale: Locale): Promise<Messages> => {
  if (useStaticCms()) return {};

  try {
    const cms = await getCms();

    const globalEntries = await Promise.all(
      (Object.keys(GLOBAL_NAMESPACES) as GlobalSlug[]).map(async (slug) => {
        // Cada global tiene su propio tipo generado; aquí se recorre de forma
        // genérica clave por clave, así que se trata como un objeto plano.
        const doc = (await cms.findGlobal({ slug, locale, depth: 0 })) as unknown as Record<
          string,
          unknown
        >;
        return [GLOBAL_NAMESPACES[slug], toMessages(doc)] as const;
      }),
    );

    // Las ocho líneas de investigación son una colección, no globals: cada ficha
    // declara a qué línea pertenece y de ahí sale su namespace.
    const { docs } = await cms.find({
      collection: "research-line-content",
      locale,
      depth: 0,
      limit: 20,
    });

    const result: Messages = {};

    for (const [namespace, values] of globalEntries) {
      if (Object.keys(values).length > 0) result[namespace] = values;
    }

    for (const doc of docs as unknown as Record<string, unknown>[]) {
      const namespace = LINE_NAMESPACE[String(doc.line ?? "")];
      if (!namespace) continue;
      // `line` y `adminTitle` identifican la ficha en el panel; no son textos
      // de la página y no deben entrar como claves de traducción.
      const { line: _line, adminTitle: _adminTitle, ...content } = doc;
      const values = toMessages(content);
      if (Object.keys(values).length > 0) result[namespace] = values;
    }

    return result;
  } catch (error) {
    console.error("No se pudieron leer los textos del panel; se usan los del archivo.", error);
    return {};
  }
};
