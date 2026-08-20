import path from "path";
import { fileURLToPath } from "url";
import type { CollectionConfig } from "payload";

// Ancla la carpeta de subidas al proyecto (no al CWD): incar/public/media.
const dirname = path.dirname(fileURLToPath(import.meta.url));
const MEDIA_DIR = path.resolve(dirname, "../../public/media");

/**
 * Biblioteca de medios (imágenes) gestionada desde el panel.
 *
 * Los archivos se guardan en `public/media`, de modo que Next los sirve como
 * assets estáticos. Payload genera automáticamente variantes optimizadas
 * (miniatura y tamaños responsive) que el frontend consume vía `<picture>`.
 */
export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Imagen",
    plural: "Imágenes",
  },
  admin: {
    group: "Contenido",
    // Vercel corta la petición en 4,5 MB antes de que llegue a Payload, y el
    // panel solo muestra un error genérico. El aviso va aquí para que el
    // editor lo lea ANTES de intentarlo. Ver la trampa 12 de CLAUDE.md.
    description:
      "Peso máximo por archivo: 4 MB. Si la foto pesa más, redúcela antes de subirla (1600 px de ancho basta) o la carga fallará sin explicación.",
  },
  access: {
    // Las imágenes son públicas (sitio institucional); la escritura queda
    // restringida a usuarios autenticados por defecto.
    read: () => true,
  },
  upload: {
    staticDir: MEDIA_DIR,
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: undefined, position: "centre" },
      { name: "card", width: 768, height: undefined, position: "centre" },
      { name: "wide", width: 1600, height: undefined, position: "centre" },
    ],
    // Formato de salida moderno; conserva el original para descargas.
    formatOptions: {
      format: "webp",
      options: { quality: 82 },
    },
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Texto alternativo",
      localized: true,
      admin: {
        description:
          "Descripción de la imagen para accesibilidad y SEO. Vacío solo si es puramente decorativa.",
      },
    },
  ],
};
