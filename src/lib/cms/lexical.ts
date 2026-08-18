import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { NewsBlock } from "@/content/news";

/**
 * Constructores de estado Lexical (nodos por defecto del editor de Payload).
 *
 * Se usan en dos lugares que deben producir EXACTAMENTE la misma estructura:
 *  1. El seed, al migrar el contenido de `src/content/*.ts` a la base de datos.
 *  2. La fuente estática (`CMS_SOURCE=static`), que genera el mismo Lexical al
 *     vuelo desde esos archivos para el deploy sin base de datos.
 */

type LexicalNode = Record<string, unknown>;

const textNode = (text: string): LexicalNode => ({
  type: "text",
  text,
  detail: 0,
  format: 0,
  mode: "normal",
  style: "",
  version: 1,
});

const paragraphNode = (text: string): LexicalNode => ({
  type: "paragraph",
  direction: "ltr",
  format: "",
  indent: 0,
  version: 1,
  textFormat: 0,
  textStyle: "",
  children: text.length > 0 ? [textNode(text)] : [],
});

const headingNode = (text: string, tag: "h2" | "h3" = "h2"): LexicalNode => ({
  type: "heading",
  tag,
  direction: "ltr",
  format: "",
  indent: 0,
  version: 1,
  children: [textNode(text)],
});

const listItemNode = (text: string, value: number): LexicalNode => ({
  type: "listitem",
  value,
  direction: "ltr",
  format: "",
  indent: 0,
  version: 1,
  children: [textNode(text)],
});

const listNode = (items: string[]): LexicalNode => ({
  type: "list",
  listType: "bullet",
  tag: "ul",
  start: 1,
  direction: "ltr",
  format: "",
  indent: 0,
  version: 1,
  children: items.map((item, index) => listItemNode(item, index + 1)),
});

/** Envuelve una lista de nodos en un estado Lexical completo. */
const lexicalRoot = (children: LexicalNode[]): SerializedEditorState =>
  ({
    root: {
      type: "root",
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
      children,
    },
  }) as unknown as SerializedEditorState;

/** Convierte un arreglo de párrafos (Publicaciones) a estado Lexical. */
export const paragraphsToLexical = (paragraphs: string[]): SerializedEditorState =>
  lexicalRoot(paragraphs.map(paragraphNode));

/** Convierte los bloques estructurados de una noticia a estado Lexical. */
export const blocksToLexical = (
  blocks: NewsBlock[],
  locale: "es" | "en",
): SerializedEditorState =>
  lexicalRoot(
    blocks.map((block) => {
      if (block.type === "h") return headingNode(block.text[locale]);
      if (block.type === "ul") return listNode(block.items[locale]);
      return paragraphNode(block.text[locale]);
    }),
  );
