/**
 * Comprueba que cada documento se descargue con su nombre canónico.
 *
 * Compara el archivo tal como quedó almacenado (`file`) con el nombre que el
 * enlace fuerza vía `download` (`downloadName`). Es de solo lectura: no toca
 * la base ni el almacenamiento.
 */
import { getPolicyBriefs, getAdvisories, getOtherDocuments } from "../src/lib/cms/documents";

const basename = (ruta: string) => ruta.split("/").pop() ?? ruta;

let sinNombre = 0;
let corregidos = 0;

const revisar = async (
  etiqueta: string,
  cargar: () => Promise<Awaited<ReturnType<typeof getPolicyBriefs>>>,
) => {
  const docs = await cargar();
  console.log(`\n── ${etiqueta} (${docs.length}) ──`);
  for (const doc of docs) {
    const almacenado = basename(doc.file);
    const descarga = doc.downloadName;
    if (!descarga) {
      sinNombre += 1;
      console.log(`  ⚠️  SIN NOMBRE  ${almacenado}  ← "${doc.title.slice(0, 60)}"`);
      continue;
    }
    if (descarga !== almacenado) corregidos += 1;
    const marca = descarga === almacenado ? "  ok " : "  ↻ ";
    console.log(`${marca} ${almacenado.padEnd(38)} → ${descarga}`);
    if (doc.summaryFile) {
      console.log(
        `       resumen: ${basename(doc.summaryFile).padEnd(31)} → ${doc.summaryDownloadName ?? "⚠️ sin nombre"}`,
      );
    }
    for (const anexo of doc.annexes ?? []) {
      console.log(
        `       anexo:   ${basename(anexo.file).padEnd(31)} → ${anexo.downloadName ?? "⚠️ sin nombre"}`,
      );
    }
  }
};

await revisar("Policy Briefs", () => getPolicyBriefs("es"));
await revisar("Asesorías parlamentarias", () => getAdvisories("es"));
await revisar("Otros documentos", () => getOtherDocuments("es"));

console.log(`\nRenombrados al descargar: ${corregidos}   ·   Sin nombre canónico: ${sinNombre}`);
process.exit(sinNombre > 0 ? 1 : 0);
