/**
 * Auditoría del buzón de documentos: compara el número de cada ficha con el
 * nombre del archivo que tiene enlazado.
 *
 * SOLO LECTURA. No modifica nada — sirve para ver el desajuste completo antes
 * de decidir la reparación.
 *
 * Origen del problema: Payload renombra el archivo al subir si el nombre ya
 * está ocupado, incrementando el número. Los PDF estaban duplicados en dos
 * carpetas, así que cada uno se subió dos veces y la ficha quedó apuntando a
 * la copia renombrada.
 */
import { getCms } from "@/lib/cms/payload";

const cms = await getCms();

const { docs: fichas } = await cms.find({
  collection: "policy-documents",
  limit: 200,
  depth: 1,
  overrideAccess: true,
});

const { docs: archivos } = await cms.find({
  collection: "document-files",
  limit: 500,
  overrideAccess: true,
});

const referenciados = new Set<number>();
let desajustados = 0;

console.log(`\nFichas: ${fichas.length} · Archivos: ${archivos.length}\n`);
console.log("KIND        NÚM  ARCHIVO ENLAZADO              ESPERADO");
console.log("─".repeat(72));

for (const ficha of fichas) {
  const archivo = ficha.file;
  const id = typeof archivo === "object" && archivo ? archivo.id : archivo;
  if (typeof id === "number") referenciados.add(id);

  const actual =
    typeof archivo === "object" && archivo ? String(archivo.filename ?? "?") : "(sin archivo)";

  // El número vive en el título de la ficha ("Policy Brief N°21 — …").
  const num = String(ficha.title ?? "").match(/\d+/)?.[0] ?? "?";
  const prefijo =
    ficha.kind === "policy-brief" ? "policy-brief" :
    ficha.kind === "advisory" ? "asesoria" : "otro";
  const esperado = ficha.kind === "policy-brief" ? `${prefijo}-${num}.pdf` : "(sin convención)";

  const ok = ficha.kind !== "policy-brief" || actual.replace(/-0+/, "-") === esperado.replace(/-0+/, "-");
  if (!ok) desajustados++;

  console.log(
    `${String(ficha.kind).padEnd(12)}${String(num).padEnd(5)}${actual.padEnd(30)}${ok ? "✓" : "✗ " + esperado}`,
  );
}

const huerfanos = archivos.filter((a) => !referenciados.has(a.id as number));

console.log("─".repeat(72));
console.log(`Fichas con nombre desajustado: ${desajustados}`);
console.log(`Archivos huérfanos (subidos pero que ninguna ficha usa): ${huerfanos.length}`);
for (const h of huerfanos) console.log(`   · ${h.filename} (${Math.round(Number(h.filesize) / 1024 / 1024 * 10) / 10} MB)`);

process.exit(0);
