import { hasDatabase } from "./connection";

/**
 * Selector de fuente de contenido para Publicaciones y Noticias.
 *
 * - Con base de datos configurada, la fuente de verdad es Payload: el panel es
 *   editable y lo publicado ahí manda.
 * - Sin base de datos el contenido se genera al vuelo desde `src/content/*.ts`.
 *   Es la red de seguridad para que un build nunca falle por intentar conectarse
 *   a una base inexistente (previews, clones del repo sin credenciales).
 * - `CMS_SOURCE=static` fuerza esa segunda vía aunque haya base, útil para
 *   previsualizar sin tocar el contenido real.
 */
export const useStaticCms = (): boolean =>
  process.env.CMS_SOURCE === "static" || !hasDatabase();
