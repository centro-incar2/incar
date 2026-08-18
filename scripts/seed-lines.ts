/**
 * Carga en la colección de líneas de investigación los textos que hoy viven en
 * los namespaces `Vaccines`, `Diseases`, `Omics`, `Welfare`, `Ecosystems`,
 * `Resilience`, `Interactions` y `Socioeconomic` de `src/messages/*.json`.
 *
 * Idempotente: limpia la colección antes de recrear las ocho fichas.
 *
 * Ejecutar con:  npm run seed:lines
 */
import path from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";
import config from "@payload-config";
import { NAMESPACE_LINE, type ResearchNamespace } from "@/content/research-namespaces";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

type Messages = Record<string, Record<string, unknown>>;

const readMessages = (locale: "es" | "en") =>
  JSON.parse(
    readFileSync(path.join(PROJECT_ROOT, "src", "messages", `${locale}.json`), "utf8"),
  ) as Messages;

const MESSAGES: Record<"es" | "en", Messages> = {
  es: readMessages("es"),
  en: readMessages("en"),
};

/** Claves que son listas; el resto son textos simples. */
const LIST_KEYS = new Set(["objectives", "transferItems"]);

const buildData = (source: Record<string, unknown>): Record<string, unknown> => {
  const data: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(source)) {
    if (LIST_KEYS.has(key) && Array.isArray(value)) {
      data[key] = value.map((item) => ({ value: String(item) }));
    } else if (typeof value === "string") {
      data[key] = value;
    }
  }
  return data;
};

const seed = async () => {
  const payload = await getPayload({ config });

  await payload.delete({
    collection: "research-line-content",
    where: { id: { exists: true } },
  });
  payload.logger.info("Colección de líneas limpiada.");

  for (const [namespace, slug] of Object.entries(NAMESPACE_LINE) as [
    ResearchNamespace,
    string,
  ][]) {
    const es = MESSAGES.es[namespace] ?? {};
    const en = MESSAGES.en[namespace] ?? {};

    await payload.create({
      collection: "research-line-content",
      data: { line: slug as never, ...buildData(es) },
      locale: "es",
    });

    await payload.update({
      collection: "research-line-content",
      where: { line: { equals: slug } },
      data: buildData(en),
      locale: "en",
    });

    payload.logger.info(
      `${namespace} → ${slug}: ${Object.keys(es).length} claves ES / ${Object.keys(en).length} EN.`,
    );
  }

  payload.logger.info("✓ Seed de líneas completado.");
  process.exit(0);
};

seed().catch((error) => {
  console.error("Falló el seed de líneas:", error);
  process.exit(1);
});
