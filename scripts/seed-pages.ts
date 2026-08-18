/**
 * Carga en los globals de página los textos que hoy viven en
 * `src/messages/{es,en}.json`.
 *
 * Sin esto el panel abriría con todos los campos vacíos: el sitio se vería bien
 * (los campos vacíos caen al archivo), pero quien edite no vería el texto actual
 * y tendría que reescribirlo desde cero. Sembrando, el panel muestra lo que hay
 * publicado y editar es modificar, no redactar.
 *
 * Es idempotente: sobrescribe el global completo en cada corrida.
 *
 * Ejecutar con:  npm run seed:pages
 */
import path from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";
import config from "@payload-config";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

type Messages = Record<string, Record<string, unknown>>;

// Los mensajes se leen del disco en vez de importarse: el runtime nativo de Node
// exige `with { type: "json" }` para importar JSON, y leerlos evita depender de
// esa sintaxis y de cómo la resuelva el bundler.
const readMessages = (locale: "es" | "en") =>
  JSON.parse(
    readFileSync(path.join(PROJECT_ROOT, "src", "messages", `${locale}.json`), "utf8"),
  ) as Messages;

/** Global → namespace de traducción. Debe coincidir con `src/lib/cms/pages.ts`. */
const GLOBALS = [
  { slug: "home", namespace: "Home" },
  { slug: "about", namespace: "About" },
  { slug: "governance", namespace: "Governance" },
  { slug: "collaborations", namespace: "Collaborations" },
  { slug: "transfer", namespace: "Transfer" },
  { slug: "events", namespace: "Events" },
  { slug: "initiatives", namespace: "Initiatives" },
  { slug: "communications", namespace: "Communications" },
  { slug: "contact", namespace: "Contact" },
  { slug: "services", namespace: "Services" },
  { slug: "public-policy", namespace: "PublicPolicy" },
  { slug: "publications-page", namespace: "Publications" },
  { slug: "news-page", namespace: "News" },
  { slug: "research-index", namespace: "ResearchIndex" },
  { slug: "management-page", namespace: "Management" },
  { slug: "mission-vision", namespace: "MissionVision" },
] as const;

const MESSAGES: Record<"es" | "en", Messages> = {
  es: readMessages("es"),
  en: readMessages("en"),
};

const seed = async () => {
  const payload = await getPayload({ config });

  for (const { slug, namespace } of GLOBALS) {
    // Los nombres de campo del global son un subconjunto de las claves del
    // namespace: se siembra solo lo que el global define, para no inyectar
    // etiquetas de accesibilidad que a propósito quedaron fuera del panel.
    const definition = payload.config.globals.find((global) => global.slug === slug);
    if (!definition) {
      payload.logger.warn(`Global "${slug}" no está registrado; se omite.`);
      continue;
    }

    const fieldNames = new Set<string>();
    const collect = (fields: { name?: string; fields?: unknown }[]) => {
      for (const field of fields) {
        if (typeof field.name === "string") fieldNames.add(field.name);
        // Los `collapsible` agrupan campos y no tienen nombre propio.
        if (Array.isArray(field.fields)) {
          collect(field.fields as { name?: string; fields?: unknown }[]);
        }
      }
    };
    collect(definition.fields as { name?: string; fields?: unknown }[]);

    for (const locale of ["es", "en"] as const) {
      const source = MESSAGES[locale][namespace] ?? {};
      const data: Record<string, unknown> = {};

      for (const name of fieldNames) {
        const value = source[name];
        if (typeof value === "string") {
          data[name] = value;
        } else if (Array.isArray(value)) {
          // Dos formas de lista en los mensajes: textos sueltos (objetivos) y
          // objetos con título y descripción (mecanismos de colaboración). Cada
          // una calza con un tipo de campo distinto del panel.
          data[name] = value.map((item) =>
            item !== null && typeof item === "object"
              ? {
                  title: String((item as Record<string, unknown>).title ?? ""),
                  text: String((item as Record<string, unknown>).text ?? ""),
                }
              : { value: String(item) },
          );
        }
      }

      await payload.updateGlobal({ slug, data: data as never, locale });
      payload.logger.info(
        `${namespace} (${locale}): ${Object.keys(data).length} campos cargados.`,
      );
    }
  }

  payload.logger.info("✓ Seed de páginas completado.");
  process.exit(0);
};

seed().catch((error) => {
  console.error("Falló el seed de páginas:", error);
  process.exit(1);
});
