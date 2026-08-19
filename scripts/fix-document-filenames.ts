/**
 * Repara el nombre con que están almacenados los PDF de Políticas Públicas.
 *
 * Al sembrarlos, un borrado en bloque dejó los archivos en el almacenamiento y
 * Payload renombró cada subida al número libre siguiente: el Policy Brief 21
 * quedó guardado como `policy-brief-22.pdf`. El contenido siempre fue correcto,
 * pero el archivo se descarga con un número que no le corresponde, porque el
 * nombre lo impone la cabecera `Content-Disposition` que emite el servidor.
 *
 * Para cada archivo mal nombrado vuelve a subir el PDF original de `public/`
 * con su nombre correcto, apunta la ficha al nuevo archivo y borra el anterior.
 * Las fichas NO se recrean: se conservan títulos, fechas, descripciones y
 * traducciones editados en el panel.
 *
 * Es idempotente: en una segunda corrida no hace nada.
 *
 * Ejecutar con:  npm run fix:document-filenames
 */
import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { getPayload, type Payload } from "payload";
import config from "@payload-config";

import { policyBriefs } from "@/content/policy-briefs";
import { parliamentaryAdvisories } from "@/content/parliamentary-advisories";
import { otherDocuments } from "@/content/other-documents";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

type FileRef = number | { id: number; filename?: string | null } | null | undefined;

const basename = (ruta: string) => ruta.split("/").pop() ?? ruta;

const fix = async () => {
  const payload: Payload = await getPayload({ config });

  const { docs: fichas } = await payload.find({
    collection: "policy-documents",
    depth: 1,
    limit: 500,
    locale: "es",
    overrideAccess: true,
  });

  let reparados = 0;
  let correctos = 0;
  const huerfanos: number[] = [];

  /** Sube un PDF exigiendo que se almacene con su nombre real. */
  const subir = async (publicPath: string, label: string): Promise<number> => {
    const filePath = path.join(PROJECT_ROOT, "public", publicPath.replace(/^\//, ""));
    if (!existsSync(filePath)) throw new Error(`No existe el PDF de origen: ${filePath}`);

    const created = await payload.create({
      collection: "document-files",
      data: { label },
      filePath,
      overrideAccess: true,
    });

    const esperado = basename(publicPath);
    if (created.filename !== esperado) {
      // El nombre correcto seguía ocupado: abortar antes de dejar otra ficha
      // apuntando a un archivo mal nombrado.
      await payload.delete({ collection: "document-files", id: created.id, overrideAccess: true });
      throw new Error(
        `El nombre "${esperado}" sigue ocupado en el almacenamiento (Payload guardó "${created.filename}"). ` +
          `Borra ese archivo desde el panel, en Archivos PDF, y vuelve a ejecutar.`,
      );
    }
    return created.id;
  };

  /**
   * Deja `ref` apuntando a un archivo llamado como el original. Devuelve el id
   * nuevo, o `undefined` si ya estaba bien.
   */
  const reparar = async (ref: FileRef, publicPath: string, label: string) => {
    const esperado = basename(publicPath);
    const actual = typeof ref === "object" && ref ? ref.filename : undefined;

    if (actual === esperado) {
      correctos += 1;
      return undefined;
    }

    const nuevoId = await subir(publicPath, label);
    if (typeof ref === "object" && ref) huerfanos.push(ref.id);
    console.log(`  ↻ ${String(actual ?? "(sin archivo)").padEnd(38)} → ${esperado}`);
    reparados += 1;
    return nuevoId;
  };

  const buscarFicha = (kind: string, criterio: { number?: number; title?: string }) =>
    fichas.find((ficha) => {
      if (ficha.kind !== kind) return false;
      if (criterio.number !== undefined) return ficha.number === criterio.number;
      return ficha.title?.trim().toLowerCase() === criterio.title?.trim().toLowerCase();
    });

  console.log("\n── Policy Briefs ──");
  for (const brief of policyBriefs) {
    const ficha = buscarFicha("policy-brief", { number: brief.number });
    if (!ficha) {
      console.log(`  ⚠️ sin ficha en la base: Policy Brief ${brief.number}`);
      continue;
    }
    const data: Record<string, unknown> = {};
    const file = await reparar(ficha.file as FileRef, brief.file, `Policy Brief ${brief.number}`);
    if (file) data.file = file;
    if (brief.summaryFile) {
      const summaryFile = await reparar(
        ficha.summaryFile as FileRef,
        brief.summaryFile,
        `Resumen Policy Brief ${brief.number}`,
      );
      if (summaryFile) data.summaryFile = summaryFile;
    }
    if (Object.keys(data).length > 0) {
      await payload.update({ collection: "policy-documents", id: ficha.id, data, overrideAccess: true });
    }
  }

  console.log("\n── Asesorías parlamentarias ──");
  for (const advisory of parliamentaryAdvisories) {
    const ficha = buscarFicha("advisory", { number: advisory.number });
    if (!ficha) {
      console.log(`  ⚠️ sin ficha en la base: Asesoría ${advisory.number}`);
      continue;
    }
    const file = await reparar(ficha.file as FileRef, advisory.file, `Asesoría ${advisory.number}`);
    if (file) {
      await payload.update({
        collection: "policy-documents",
        id: ficha.id,
        data: { file },
        overrideAccess: true,
      });
    }
  }

  console.log("\n── Otros documentos ──");
  for (const doc of otherDocuments) {
    const ficha = buscarFicha("other", { title: doc.title });
    if (!ficha) {
      console.log(`  ⚠️ sin ficha en la base: ${doc.title.slice(0, 50)}`);
      continue;
    }
    const data: Record<string, unknown> = {};
    const file = await reparar(ficha.file as FileRef, doc.file, doc.title.slice(0, 60));
    if (file) data.file = file;

    const anexosFicha = (ficha.annexes ?? []) as { label?: string | null; file?: FileRef }[];
    const anexos = [];
    let cambioAnexo = false;
    for (const [index, annex] of (doc.annexes ?? []).entries()) {
      const actual = anexosFicha[index];
      const nuevo = await reparar(actual?.file, annex.file, annex.label);
      if (nuevo) cambioAnexo = true;
      const id = nuevo ?? (typeof actual?.file === "object" ? actual.file?.id : actual?.file);
      anexos.push({ label: actual?.label ?? annex.label, file: id });
    }
    if (cambioAnexo) data.annexes = anexos;

    if (Object.keys(data).length > 0) {
      await payload.update({ collection: "policy-documents", id: ficha.id, data, overrideAccess: true });
    }
  }

  // Los archivos viejos se borran al final: si algo falla antes, las fichas
  // siguen apuntando a un PDF que existe.
  for (const id of huerfanos) {
    await payload.delete({ collection: "document-files", id, overrideAccess: true });
  }

  console.log(
    `\nArchivos reparados: ${reparados}   ·   ya correctos: ${correctos}   ·   antiguos eliminados: ${huerfanos.length}`,
  );
  console.log(reparados > 0 ? "✓ Nombres corregidos." : "✓ Nada que corregir.");
  process.exit(0);
};

fix().catch((error) => {
  console.error("Falló la reparación de nombres:", error);
  process.exit(1);
});
