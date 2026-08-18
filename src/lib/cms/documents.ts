import type { Locale } from "@/i18n/routing";
import type { DocumentFile } from "@/payload-types";
import { policyBriefs as staticBriefs } from "@/content/policy-briefs";
import { parliamentaryAdvisories as staticAdvisories } from "@/content/parliamentary-advisories";
import { otherDocuments as staticOthers } from "@/content/other-documents";
import { getCms } from "./payload";
import { useStaticCms } from "./source";

/**
 * Lectura de los documentos de Políticas Públicas.
 *
 * Devuelve las mismas formas que antes exponían `src/content/policy-briefs.ts`,
 * `parliamentary-advisories.ts` y `other-documents.ts`, para que la página y las
 * tarjetas no cambien de modelo. Sin base de datos configurada se cae a esas
 * fuentes estáticas.
 */

export interface CmsAnnex {
  label: string;
  file: string;
  sizeMB: number;
}

export interface CmsDocument {
  number: number;
  title: string;
  file: string;
  sizeMB: number;
  summaryFile?: string;
  date?: string;
  description?: string;
  annexes?: CmsAnnex[];
}

type FileRef = number | DocumentFile | null | undefined;

interface RawDocument {
  kind: string;
  number?: number | null;
  title: string;
  date?: string | null;
  description?: string | null;
  file?: FileRef;
  summaryFile?: FileRef;
  annexes?: { label?: string | null; file?: FileRef }[] | null;
}

/** URL servible del PDF (ruta de Payload en local, URL del store en producción). */
const fileUrl = (value: FileRef): string | undefined =>
  value && typeof value === "object" && typeof value.url === "string" ? value.url : undefined;

/**
 * Peso en MB con un decimal, derivado de `filesize` que Payload registra al
 * subir. Antes se escribía a mano en el archivo de contenido y quedaba
 * desactualizado al reemplazar un PDF.
 */
const fileSizeMB = (value: FileRef): number => {
  if (!value || typeof value !== "object" || typeof value.filesize !== "number") return 0;
  return Math.round((value.filesize / (1024 * 1024)) * 10) / 10;
};

const toDocument = (doc: RawDocument, locale: Locale): CmsDocument | null => {
  const file = fileUrl(doc.file);
  // Sin archivo la tarjeta sería un botón de descarga roto: se omite.
  if (!file) return null;

  const annexes = (doc.annexes ?? [])
    .map((annex) => {
      const url = fileUrl(annex.file);
      if (!url) return null;
      return { label: annex.label ?? "", file: url, sizeMB: fileSizeMB(annex.file) };
    })
    .filter((annex): annex is CmsAnnex => annex !== null);

  void locale;

  return {
    number: doc.number ?? 0,
    title: doc.title,
    file,
    sizeMB: fileSizeMB(doc.file),
    summaryFile: fileUrl(doc.summaryFile),
    date: doc.date ?? undefined,
    description: doc.description ?? undefined,
    annexes: annexes.length > 0 ? annexes : undefined,
  };
};

const fetchByKind = async (kind: string, locale: Locale): Promise<CmsDocument[]> => {
  const cms = await getCms();
  const { docs } = await cms.find({
    collection: "policy-documents",
    locale,
    depth: 1,
    limit: 200,
    sort: "-number",
    where: { kind: { equals: kind } },
  });
  return (docs as unknown as RawDocument[])
    .map((doc) => toDocument(doc, locale))
    .filter((doc): doc is CmsDocument => doc !== null);
};

/** Policy Briefs, del más reciente al más antiguo. */
export const getPolicyBriefs = async (locale: Locale): Promise<CmsDocument[]> => {
  if (useStaticCms()) return staticBriefs.map((brief) => ({ ...brief }));
  return fetchByKind("policy-brief", locale);
};

/** Asesorías parlamentarias (BCN). */
export const getAdvisories = async (locale: Locale): Promise<CmsDocument[]> => {
  if (useStaticCms()) return staticAdvisories.map((advisory) => ({ ...advisory }));
  return fetchByKind("advisory", locale);
};

/** Otros documentos (libros, manuales, informes). */
export const getOtherDocuments = async (locale: Locale): Promise<CmsDocument[]> => {
  if (useStaticCms()) {
    return staticOthers.map((doc) => ({ ...doc, number: 0 }));
  }
  return fetchByKind("other", locale);
};
