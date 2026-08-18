/**
 * Loader ESM para ejecutar el CLI de Payload y los scripts (seed) con el runtime
 * NATIVO de Node 24 (`--disable-transpile`), evitando el conflicto entre el loader
 * `tsx` de Payload y `require(esm)` + top-level await en Node 24.
 *
 * Node nativo carga TypeScript (type stripping) pero NO resuelve el alias `@/`
 * ni las importaciones sin extensión. Este hook añade ambas resoluciones para que
 * `payload.config.ts` y las colecciones se importen igual que en Next.
 *
 * Uso: node --import ./scripts/payload-loader.mjs <script-o-bin> --disable-transpile
 */
import { registerHooks } from "node:module";
import { existsSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const SRC = path.resolve(process.cwd(), "src");
const EXTENSIONS = ["", ".ts", ".tsx", ".js", ".mjs"];

/** Devuelve la primera ruta existente probando extensiones e índice de carpeta. */
function resolveFile(base) {
  const candidates = [
    ...EXTENSIONS.map((ext) => base + ext),
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
    path.join(base, "index.js"),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    // Alias especial de Payload para su configuración.
    if (specifier === "@payload-config") {
      return {
        url: pathToFileURL(path.join(SRC, "payload.config.ts")).href,
        shortCircuit: true,
      };
    }

    // Alias del proyecto: `@/algo` → `src/algo`.
    if (specifier.startsWith("@/")) {
      const resolved = resolveFile(path.join(SRC, specifier.slice(2)));
      if (resolved) {
        return { url: pathToFileURL(resolved).href, shortCircuit: true };
      }
    }

    // Importaciones relativas sin extensión → añadir `.ts`/índice.
    if (
      (specifier.startsWith("./") || specifier.startsWith("../")) &&
      context.parentURL &&
      !path.extname(specifier)
    ) {
      const parentDir = path.dirname(fileURLToPath(context.parentURL));
      const resolved = resolveFile(path.resolve(parentDir, specifier));
      if (resolved) {
        return { url: pathToFileURL(resolved).href, shortCircuit: true };
      }
    }

    return nextResolve(specifier, context);
  },
});
