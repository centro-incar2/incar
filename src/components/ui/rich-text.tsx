import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

/**
 * Renderiza contenido enriquecido (Lexical) de Payload con los estilos del tema
 * navy del sitio (clase `.prose-incar`, definida en globals.css). Se usa para el
 * cuerpo de publicaciones y noticias.
 */
export function RichContent({ data }: { data: SerializedEditorState }) {
  return (
    <div className="prose-incar">
      <RichText data={data} />
    </div>
  );
}
