/**
 * Compara las fichas migradas a Payload contra la fuente original
 * (`src/content/*.ts`), campo por campo y en ambos idiomas.
 *
 * Sirve para probar que el traspaso al CMS no perdió ni alteró contenido: los
 * textos de INCAR² son verbatim y una diferencia silenciosa sería invisible en
 * el sitio hasta que alguien la notara meses después.
 *
 * Ejecutar con:  npm run verify:members
 */
import { getPayload } from "payload";
import config from "@payload-config";

import { researchMembers, memberPhoto } from "@/content/research-members";
import { managementGroups } from "@/content/management-team";
import { getResearchMembers, getManagementGroups } from "@/lib/cms/members";

const problems: string[] = [];

const report = (context: string, field: string, expected: unknown, actual: unknown) => {
  problems.push(
    `${context} · ${field}\n    esperado: ${JSON.stringify(expected)?.slice(0, 160)}\n    obtenido: ${JSON.stringify(actual)?.slice(0, 160)}`,
  );
};

const same = (context: string, field: string, expected: unknown, actual: unknown) => {
  if (JSON.stringify(expected) !== JSON.stringify(actual)) {
    report(context, field, expected, actual);
  }
};

/**
 * Compara objetos ignorando el orden de las claves. El CMS emite los enlaces
 * siempre en el mismo orden (LinkedIn, ORCID, Scholar, ResearchGate) mientras
 * que en el archivo original venían en el orden en que se escribieron: comparar
 * el JSON crudo marcaría diferencias donde los valores son idénticos.
 */
const sameUnordered = (
  context: string,
  field: string,
  expected: object = {},
  actual: object = {},
) => {
  const sort = (obj: object) =>
    Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)));
  same(context, field, sort(expected), sort(actual));
};

const verify = async () => {
  // getPayload calienta la conexión que usan las funciones de lectura.
  await getPayload({ config });

  // ── Integrantes de investigación ──────────────────────────────────────────
  const cmsMembers = await getResearchMembers();
  console.log(`Integrantes — origen: ${researchMembers.length}, CMS: ${cmsMembers.length}`);

  if (cmsMembers.length !== researchMembers.length) {
    problems.push(`Cantidad de integrantes distinta.`);
  }

  // El ORDEN importa: INCAR² lo definió por jerarquía y debe conservarse.
  const expectedOrder = researchMembers.map((m) => m.slug).join(",");
  const actualOrder = cmsMembers.map((m) => m.slug).join(",");
  if (expectedOrder !== actualOrder) {
    problems.push("El ORDEN de los integrantes cambió respecto del original.");
  }

  for (const expected of researchMembers) {
    const actual = cmsMembers.find((m) => m.slug === expected.slug);
    const ctx = `Integrante ${expected.slug}`;
    if (!actual) {
      problems.push(`${ctx} · NO EXISTE en el CMS`);
      continue;
    }
    same(ctx, "name", expected.name, actual.name);
    same(ctx, "line", expected.line, actual.line);
    same(ctx, "email", expected.email, actual.email);
    same(ctx, "role", expected.role, actual.role);
    same(ctx, "bio", expected.bio, actual.bio);
    same(ctx, "degrees", expected.degrees, actual.degrees);
    same(ctx, "projects", expected.projects, actual.projects);
    sameUnordered(ctx, "links", expected.links, actual.links);

    // La foto cambia de ruta (pasa a la biblioteca de medios); solo se comprueba
    // que quien tenía foto la conserve y quien no tenía siga sin ella.
    const hadPhoto = memberPhoto(expected) !== null;
    const hasPhoto = actual.photo !== null;
    if (hadPhoto !== hasPhoto) {
      report(ctx, "presencia de foto", hadPhoto, hasPhoto);
    }
  }

  // ── Equipo de gestión ─────────────────────────────────────────────────────
  const cmsGroups = await getManagementGroups();
  const flatStatic = managementGroups.flatMap((g) =>
    g.members.map((m) => ({ ...m, labelKey: g.labelKey })),
  );
  const flatCms = cmsGroups.flatMap((g) => g.members.map((m) => ({ ...m, labelKey: g.labelKey })));
  console.log(`Equipo de gestión — origen: ${flatStatic.length}, CMS: ${flatCms.length}`);

  for (const expected of flatStatic) {
    const actual = flatCms.find((m) => m.name === expected.name);
    const ctx = `Gestión ${expected.name}`;
    if (!actual) {
      problems.push(`${ctx} · NO EXISTE en el CMS`);
      continue;
    }
    same(ctx, "grupo", expected.labelKey, actual.labelKey);
    same(ctx, "role", expected.role, actual.role);
    same(ctx, "memberSlug", expected.memberSlug, actual.memberSlug);
    if (expected.bio) same(ctx, "bio", expected.bio, actual.bio);
    if (expected.degrees) same(ctx, "degrees", expected.degrees, actual.degrees);
    if (expected.projects) same(ctx, "projects", expected.projects, actual.projects);
    if ((expected.photo !== null) !== (actual.photo !== null)) {
      report(ctx, "presencia de foto", expected.photo !== null, actual.photo !== null);
    }
  }

  console.log("");
  if (problems.length === 0) {
    console.log("✓ Sin diferencias: el contenido migrado es idéntico al original.");
    process.exit(0);
  }
  console.log(`✗ ${problems.length} diferencia(s):\n`);
  for (const problem of problems.slice(0, 25)) console.log("  " + problem);
  if (problems.length > 25) console.log(`  … y ${problems.length - 25} más.`);
  process.exit(1);
};

verify().catch((error) => {
  console.error("Falló la verificación:", error);
  process.exit(1);
});
