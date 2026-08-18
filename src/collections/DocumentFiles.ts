import path from "path";
import { fileURLToPath } from "url";
import type { CollectionConfig } from "payload";
import { editorialAccess } from "@/access/editorial";

// Ancla la carpeta de subidas al proyecto (no al CWD): incar/public/documentos.
const dirname = path.dirname(fileURLToPath(import.meta.url));
const FILES_DIR = path.resolve(dirname, "../../public/documentos");

/**
 * Archivos PDF de la sección Políticas Públicas.
 *
 * Es una colección aparte de `media` porque esa acepta solo imágenes y les
 * genera miniaturas: un PDF no admite ese procesamiento. En producción los
 * archivos van a Vercel Blob (ver el plugin en `payload.config.ts`), igual que
 * las imágenes, porque el disco de Vercel es efímero.
 *
 * El peso NO se guarda a mano: Payload registra `filesize` al subir y la capa
 * de lectura lo convierte a MB para mostrarlo en el botón de descarga.
 */
export const DocumentFiles: CollectionConfig = {
  slug: "document-files",
  labels: {
    singular: "Archivo PDF",
    plural: "Archivos PDF",
  },
  admin: {
    group: "Documentos",
    description: "Biblioteca de PDF. Se enlazan desde las fichas de documentos.",
  },
  access: editorialAccess,
  upload: {
    staticDir: FILES_DIR,
    mimeTypes: ["application/pdf"],
  },
  fields: [
    {
      name: "label",
      type: "text",
      label: "Descripción del archivo",
      admin: {
        description: "Referencia interna para encontrarlo. No se muestra en el sitio.",
      },
    },
  ],
};
