/**
 * Compara los textos cargados en los globals de página contra los archivos
 * `src/messages/*.json`, en ambos idiomas.
 *
 * Es la garantía de que abrir las páginas a edición no cambió ni una palabra:
 * el sitio debe verse EXACTAMENTE igual que antes de la migración.
 *
 * Ejecutar con:  npm run verify:pages
 */
import path from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";
import config from "@payload-config";
import { getManagedMessages } from "@/lib/cms/pages";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

type Messages = Record<string, Record<string, unknown>>;

const readMessages = (locale: "es" | "en") =>
  JSON.parse(
    readFileSync(path.join(PROJECT_ROOT, "src", "messages", `${locale}.json`), "utf8"),
  ) as Messages;

const problems: string[] = [];

const verify = async () => {
  await getPayload({ config });

  for (const locale of ["es", "en"] as const) {
    const base = readMessages(locale);
    const managed = await getManagedMessages(locale);

    for (const [namespace, values] of Object.entries(managed)) {
      let checked = 0;
      for (const [key, value] of Object.entries(values)) {
        const expected = base[namespace]?.[key];
        if (JSON.stringify(expected) !== JSON.stringify(value)) {
          problems.push(
            `${locale} · ${namespace}.${key}\n    archivo: ${JSON.stringify(expected)?.slice(0, 130)}\n    panel  : ${JSON.stringify(value)?.slice(0, 130)}`,
          );
        }
        checked += 1;
      }
      console.log(`${locale} · ${namespace}: ${checked} claves comparadas`);
    }
  }

  console.log("");
  if (problems.length === 0) {
    console.log("✓ Los textos del panel son idénticos a los del sitio actual.");
    process.exit(0);
  }
  console.log(`✗ ${problems.length} diferencia(s):\n`);
  for (const problem of problems.slice(0, 20)) console.log("  " + problem);
  process.exit(1);
};

verify().catch((error) => {
  console.error("Falló la verificación:", error);
  process.exit(1);
});
