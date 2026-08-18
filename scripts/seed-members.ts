/**
 * Migra las fichas de personas desde `src/content/*.ts` a Payload.
 *
 * Cubre las dos colecciones de la etapa 1 del CMS ampliado:
 *   - `research-members`  ← src/content/research-members.ts (51 fichas)
 *   - `management-team`   ← src/content/management-team.ts
 *
 * Dos invariantes que NO se pueden perder al pasar a base de datos:
 *   1. El SLUG de cada persona, porque es su URL pública y ya está indexada.
 *   2. El ORDEN del grid, que INCAR² definió por jerarquía y en el archivo
 *      venía dado por la posición en el arreglo. Aquí se materializa en `order`.
 *
 * Es idempotente: limpia ambas colecciones antes de recrear, así que puede
 * ejecutarse varias veces sin duplicar.
 *
 * Ejecutar con:  npm run seed:members
 * Contra producción: usar un env-file con la conexión de Neon (ver README).
 */
import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";
import config from "@payload-config";

import { researchMembers, memberPhoto } from "@/content/research-members";
import { managementGroups } from "@/content/management-team";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Las listas por idioma se guardan como filas `{ value }` del array localizado. */
const rows = (values: string[] | undefined) =>
  (values ?? []).map((value) => ({ value }));

/** Texto vacío → `undefined`, para no crear campos en blanco en el panel. */
const clean = (value: string | undefined) =>
  value && value.trim().length > 0 ? value : undefined;

const seed = async () => {
  const payload = await getPayload({ config });

  for (const collection of ["research-members", "management-team"] as const) {
    await payload.delete({ collection, where: { id: { exists: true } } });
  }
  payload.logger.info("Colecciones de personas limpiadas.");

  // Las fotos se suben una sola vez y se reutilizan: el Director y el Director
  // Alterno aparecen tanto en su línea como en el equipo de gestión.
  const photoCache = new Map<string, number>();

  const uploadPhoto = async (
    publicPath: string | null,
    alt: string,
  ): Promise<number | undefined> => {
    if (!publicPath) return undefined;

    const cached = photoCache.get(publicPath);
    if (cached !== undefined) return cached;

    const filePath = path.join(PROJECT_ROOT, "public", publicPath.replace(/^\//, ""));
    if (!existsSync(filePath)) {
      payload.logger.warn(`Foto no encontrada, se omite: ${publicPath}`);
      return undefined;
    }

    const created = await payload.create({
      collection: "media",
      data: { alt: `Retrato de ${alt}` },
      filePath,
    });
    photoCache.set(publicPath, created.id);
    return created.id;
  };

  // ── Integrantes de investigación ──────────────────────────────────────────
  let index = 0;
  for (const member of researchMembers) {
    const photo = await uploadPhoto(memberPhoto(member), member.name);

    await payload.create({
      collection: "research-members",
      // El orden del arreglo ES la jerarquía definida por INCAR²: se preserva
      // multiplicando por 10 para poder intercalar gente después sin renumerar.
      data: {
        slug: member.slug,
        name: member.name,
        line: member.line as never,
        order: index * 10,
        email: clean(member.email),
        photo,
        links: member.links,
        role: member.role.es,
        bio: clean(member.bio.es),
        degrees: rows(member.degrees.es),
        projects: rows(member.projects.es),
      },
      locale: "es",
    });

    await payload.update({
      collection: "research-members",
      where: { slug: { equals: member.slug } },
      data: {
        role: member.role.en,
        bio: clean(member.bio.en),
        degrees: rows(member.degrees.en),
        projects: rows(member.projects.en),
      },
      locale: "en",
    });

    index += 1;
  }
  payload.logger.info(`Integrantes de investigación migrados: ${researchMembers.length}.`);

  // ── Equipo de gestión ─────────────────────────────────────────────────────
  let total = 0;
  for (const group of managementGroups) {
    const team = group.labelKey === "directionTitle" ? "direction" : "executive";

    let position = 0;
    for (const member of group.members) {
      const photo = await uploadPhoto(member.photo, member.name);
      // Quien no trae ficha propia igual necesita slug (clave única): se deriva
      // del nombre, y la capa de lectura decide si le corresponde página.
      const slug =
        member.slug ??
        member.name
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

      await payload.create({
        collection: "management-team",
        data: {
          slug,
          name: member.name,
          team,
          order: position * 10,
          memberSlug: clean(member.memberSlug),
          email: clean(member.email),
          photo,
          links: member.links ?? {},
          role: member.role.es,
          bio: clean(member.bio?.es),
          degrees: rows(member.degrees?.es),
          projects: rows(member.projects?.es),
        },
        locale: "es",
      });

      await payload.update({
        collection: "management-team",
        where: { slug: { equals: slug } },
        data: {
          role: member.role.en,
          bio: clean(member.bio?.en),
          degrees: rows(member.degrees?.en),
          projects: rows(member.projects?.en),
        },
        locale: "en",
      });

      position += 1;
      total += 1;
    }
  }
  payload.logger.info(`Equipo de gestión migrado: ${total}.`);
  payload.logger.info(`Fotos subidas: ${photoCache.size}.`);
  payload.logger.info("✓ Seed de personas completado.");

  process.exit(0);
};

seed().catch((error) => {
  console.error("Falló el seed de personas:", error);
  process.exit(1);
});
