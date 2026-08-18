/**
 * Migra los documentos de Políticas Públicas desde `src/content/*.ts` a Payload:
 * sube cada PDF a la biblioteca de archivos y crea su ficha.
 *
 * Cubre los tres listados de la página: Policy Briefs, Asesorías Parlamentarias
 * (BCN) y Otros Documentos, incluidos los resúmenes ejecutivos y los anexos.
 *
 * El PESO ya no se copia: se calcula desde el archivo subido. Antes estaba
 * escrito a mano en el contenido y quedaba obsoleto al reemplazar un PDF.
 *
 * Es idempotente: limpia ambas colecciones antes de recrear.
 *
 * Ejecutar con:  npm run seed:documents
 */
import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";
import config from "@payload-config";

import { policyBriefs } from "@/content/policy-briefs";
import { parliamentaryAdvisories } from "@/content/parliamentary-advisories";
import { otherDocuments } from "@/content/other-documents";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const seed = async () => {
  const payload = await getPayload({ config });

  for (const collection of ["policy-documents", "document-files"] as const) {
    await payload.delete({ collection, where: { id: { exists: true } } });
  }
  payload.logger.info("Colecciones de documentos limpiadas.");

  const cache = new Map<string, number>();

  /** Sube un PDF una sola vez y devuelve su id. */
  const upload = async (publicPath: string, label: string): Promise<number | undefined> => {
    const cached = cache.get(publicPath);
    if (cached !== undefined) return cached;

    const filePath = path.join(PROJECT_ROOT, "public", publicPath.replace(/^\//, ""));
    if (!existsSync(filePath)) {
      payload.logger.warn(`PDF no encontrado, se omite: ${publicPath}`);
      return undefined;
    }

    const created = await payload.create({
      collection: "document-files",
      data: { label },
      filePath,
    });
    cache.set(publicPath, created.id);
    return created.id;
  };

  let total = 0;

  // ── Policy Briefs ─────────────────────────────────────────────────────────
  for (const brief of policyBriefs) {
    const file = await upload(brief.file, `Policy Brief ${brief.number}`);
    if (!file) continue;
    const summaryFile = brief.summaryFile
      ? await upload(brief.summaryFile, `Resumen Policy Brief ${brief.number}`)
      : undefined;

    await payload.create({
      collection: "policy-documents",
      data: {
        kind: "policy-brief",
        number: brief.number,
        title: brief.title,
        file,
        summaryFile,
      },
      locale: "es",
    });
    total += 1;
  }
  payload.logger.info(`Policy Briefs migrados: ${policyBriefs.length}.`);

  // ── Asesorías parlamentarias ──────────────────────────────────────────────
  for (const advisory of parliamentaryAdvisories) {
    const file = await upload(advisory.file, `Asesoría ${advisory.number}`);
    if (!file) continue;

    await payload.create({
      collection: "policy-documents",
      data: {
        kind: "advisory",
        number: advisory.number,
        title: advisory.title,
        file,
      },
      locale: "es",
    });
    total += 1;
  }
  payload.logger.info(`Asesorías migradas: ${parliamentaryAdvisories.length}.`);

  // ── Otros documentos ──────────────────────────────────────────────────────
  for (const doc of otherDocuments) {
    const file = await upload(doc.file, doc.title.slice(0, 60));
    if (!file) continue;

    const annexes = [];
    for (const annex of doc.annexes ?? []) {
      const annexFile = await upload(annex.file, annex.label);
      if (annexFile) annexes.push({ label: annex.label, file: annexFile });
    }

    await payload.create({
      collection: "policy-documents",
      data: {
        kind: "other",
        title: doc.title,
        date: doc.date,
        description: doc.description,
        file,
        annexes,
      },
      locale: "es",
    });
    total += 1;
  }
  payload.logger.info(`Otros documentos migrados: ${otherDocuments.length}.`);

  payload.logger.info(`Fichas creadas: ${total}. PDF subidos: ${cache.size}.`);
  payload.logger.info("✓ Seed de documentos completado.");
  process.exit(0);
};

seed().catch((error) => {
  console.error("Falló el seed de documentos:", error);
  process.exit(1);
});
