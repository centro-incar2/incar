/**
 * Copia todos los archivos de un store de Vercel Blob a otro.
 *
 * Se usa al traspasar el proyecto a la cuenta de INCAR²: el store pertenece a
 * la CUENTA, no al proyecto, así que no viaja con una transferencia de Vercel.
 * Si no se copia, el sitio nuevo queda sin ninguna imagen ni PDF.
 *
 * Conserva el `pathname` de cada archivo, que es lo que importa: la base de
 * datos guarda rutas relativas del propio sitio (`/api/media/file/<archivo>`),
 * nunca la URL absoluta del store. Por eso NO hay que reescribir nada en la
 * base después de copiar.
 *
 * Es idempotente: los archivos que ya existen en el destino se omiten, de modo
 * que puede reanudarse si se corta a medias.
 *
 * Uso:
 *   BLOB_ORIGEN=vercel_blob_rw_... BLOB_DESTINO=vercel_blob_rw_... \
 *     node scripts/migrate-blob.mjs [--dry-run]
 */
import { list, put, head } from "@vercel/blob";

const ORIGEN = process.env.BLOB_ORIGEN;
const DESTINO = process.env.BLOB_DESTINO;
const SIMULAR = process.argv.includes("--dry-run");

if (!ORIGEN || !DESTINO) {
  console.error("Faltan BLOB_ORIGEN y/o BLOB_DESTINO (tokens read-write de cada store).");
  process.exit(1);
}
if (ORIGEN === DESTINO) {
  console.error("El origen y el destino son el mismo store.");
  process.exit(1);
}

/** Recorre el store completo; la API pagina de a 1000. */
const listarTodo = async (token) => {
  const todos = [];
  let cursor;
  do {
    const pagina = await list({ token, cursor, limit: 1000 });
    todos.push(...pagina.blobs);
    cursor = pagina.cursor;
  } while (cursor);
  return todos;
};

/** `true` si el archivo ya está en el destino con el mismo tamaño. */
const yaEsta = async (pathname, size, existentes) => {
  const previo = existentes.get(pathname);
  return Boolean(previo) && previo.size === size;
};

const run = async () => {
  console.log("Leyendo el store de origen…");
  const origen = await listarTodo(ORIGEN);
  const bytes = origen.reduce((t, b) => t + b.size, 0);
  console.log(`  ${origen.length} archivos · ${(bytes / 1048576).toFixed(1)} MB`);

  console.log("Leyendo el store de destino…");
  const destino = await listarTodo(DESTINO);
  const existentes = new Map(destino.map((b) => [b.pathname, b]));
  console.log(`  ${destino.length} archivos ya presentes`);

  if (SIMULAR) {
    const faltan = [];
    for (const b of origen) if (!(await yaEsta(b.pathname, b.size, existentes))) faltan.push(b);
    console.log(`\nSimulación: se copiarían ${faltan.length} archivos.`);
    for (const b of faltan.slice(0, 15)) console.log("   " + b.pathname);
    if (faltan.length > 15) console.log(`   … y ${faltan.length - 15} más`);
    return;
  }

  let copiados = 0, omitidos = 0;
  const fallidos = [];

  for (const [i, blob] of origen.entries()) {
    const etiqueta = `[${i + 1}/${origen.length}] ${blob.pathname}`;
    if (await yaEsta(blob.pathname, blob.size, existentes)) {
      omitidos += 1;
      continue;
    }
    try {
      const res = await fetch(blob.url);
      if (!res.ok) throw new Error(`descarga ${res.status}`);
      const cuerpo = Buffer.from(await res.arrayBuffer());

      await put(blob.pathname, cuerpo, {
        token: DESTINO,
        access: "public",
        // Sin sufijo aleatorio: el nombre debe coincidir con el de la base.
        addRandomSuffix: false,
        contentType: blob.contentType || undefined,
      });
      copiados += 1;
      if (copiados % 25 === 0) console.log(`  ${etiqueta} — ${copiados} copiados`);
    } catch (error) {
      fallidos.push(`${blob.pathname}: ${error.message}`);
      console.error(`  ✗ ${etiqueta} → ${error.message}`);
    }
  }

  console.log(`\ncopiados : ${copiados}`);
  console.log(`omitidos : ${omitidos} (ya estaban)`);
  console.log(`fallidos : ${fallidos.length}`);
  for (const f of fallidos.slice(0, 20)) console.log("   " + f);

  // Comprobación final: el destino debe contener todo lo del origen.
  const finales = new Map((await listarTodo(DESTINO)).map((b) => [b.pathname, b]));
  const ausentes = origen.filter((b) => !finales.has(b.pathname));
  console.log(`\nverificación: ${origen.length - ausentes.length}/${origen.length} presentes en el destino`);
  if (ausentes.length) {
    console.log("FALTAN:");
    for (const a of ausentes.slice(0, 20)) console.log("   " + a.pathname);
    process.exit(1);
  }
  console.log("✓ El destino tiene todos los archivos del origen.");
};

run().catch((error) => {
  console.error("Falló la copia:", error);
  process.exit(1);
});
