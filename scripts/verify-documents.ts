/**
 * Compara los documentos migrados a Payload contra la fuente original
 * (`src/content/policy-briefs.ts`, `parliamentary-advisories.ts`,
 * `other-documents.ts`).
 *
 * El PESO se compara con tolerancia: antes estaba escrito a mano y ahora se
 * calcula del archivo real, así que pequeñas diferencias son esperables y de
 * hecho significan que el dato quedó MÁS exacto. Una diferencia grande sí
 * indicaría que se subió un archivo equivocado.
 *
 * Ejecutar con:  npm run verify:documents
 */
import { getPayload } from "payload";
import config from "@payload-config";

import { policyBriefs } from "@/content/policy-briefs";
import { parliamentaryAdvisories } from "@/content/parliamentary-advisories";
import { otherDocuments } from "@/content/other-documents";
import { getPolicyBriefs, getAdvisories, getOtherDocuments } from "@/lib/cms/documents";

const problems: string[] = [];
const notes: string[] = [];

/** Diferencia de peso aceptable entre el dato manual y el real. */
const SIZE_TOLERANCE_MB = 0.6;

const verify = async () => {
  await getPayload({ config });

  const briefs = await getPolicyBriefs("es");
  const advisories = await getAdvisories("es");
  const others = await getOtherDocuments("es");

  console.log(`Policy Briefs — origen: ${policyBriefs.length}, CMS: ${briefs.length}`);
  console.log(`Asesorías     — origen: ${parliamentaryAdvisories.length}, CMS: ${advisories.length}`);
  console.log(`Otros         — origen: ${otherDocuments.length}, CMS: ${others.length}`);

  for (const expected of policyBriefs) {
    const actual = briefs.find((doc) => doc.number === expected.number);
    const ctx = `Policy Brief ${expected.number}`;
    if (!actual) {
      problems.push(`${ctx} · NO EXISTE en el CMS`);
      continue;
    }
    if (actual.title !== expected.title) {
      problems.push(`${ctx} · título distinto\n    origen: ${expected.title}\n    CMS   : ${actual.title}`);
    }
    if (Boolean(expected.summaryFile) !== Boolean(actual.summaryFile)) {
      problems.push(`${ctx} · el resumen ejecutivo no coincide`);
    }
    if (!actual.file) problems.push(`${ctx} · sin archivo`);
    const diff = Math.abs(actual.sizeMB - expected.sizeMB);
    if (diff > SIZE_TOLERANCE_MB) {
      problems.push(`${ctx} · peso muy distinto: ${expected.sizeMB} MB → ${actual.sizeMB} MB`);
    } else if (diff > 0.05) {
      notes.push(`${ctx}: peso ajustado ${expected.sizeMB} → ${actual.sizeMB} MB`);
    }
  }

  for (const expected of parliamentaryAdvisories) {
    const actual = advisories.find((doc) => doc.number === expected.number);
    const ctx = `Asesoría ${expected.number}`;
    if (!actual) {
      problems.push(`${ctx} · NO EXISTE en el CMS`);
      continue;
    }
    if (actual.title !== expected.title) problems.push(`${ctx} · título distinto`);
    if (!actual.file) problems.push(`${ctx} · sin archivo`);
  }

  for (const expected of otherDocuments) {
    const actual = others.find((doc) => doc.title === expected.title);
    const ctx = `Otro documento “${expected.title.slice(0, 40)}…”`;
    if (!actual) {
      problems.push(`${ctx} · NO EXISTE en el CMS`);
      continue;
    }
    if (actual.date !== expected.date) problems.push(`${ctx} · fecha distinta`);
    if (actual.description !== expected.description) {
      problems.push(`${ctx} · descripción distinta`);
    }
    const expectedAnnexes = expected.annexes?.length ?? 0;
    const actualAnnexes = actual.annexes?.length ?? 0;
    if (expectedAnnexes !== actualAnnexes) {
      problems.push(`${ctx} · anexos: ${expectedAnnexes} → ${actualAnnexes}`);
    }
  }

  if (notes.length > 0) {
    console.log(`\nPesos recalculados desde el archivo real (${notes.length}):`);
    for (const note of notes.slice(0, 10)) console.log("  " + note);
  }

  console.log("");
  if (problems.length === 0) {
    console.log("✓ Sin diferencias: los documentos migrados coinciden con el original.");
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
