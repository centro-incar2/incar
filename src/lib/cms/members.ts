import type { Locale } from "@/i18n/routing";
import type { Media } from "@/payload-types";
import {
  researchMembers as staticMembers,
  memberPhoto as staticMemberPhoto,
  type ResearchMember,
  type MemberLinks,
} from "@/content/research-members";
import { managementGroups as staticGroups } from "@/content/management-team";
import { getCms } from "./payload";
import { mediaUrl } from "./media";
import { useStaticCms } from "./source";

/**
 * Lectura de personas (integrantes de línea y equipo de gestión).
 *
 * Devuelve la MISMA forma que antes exponía `src/content/research-members.ts`
 * —`Record<Locale, …>` por campo— para que las páginas y los componentes no
 * tengan que cambiar de modelo. Si no hay base de datos configurada se cae a la
 * fuente estática, igual que Noticias y Publicaciones.
 */

/** Integrante ya normalizado, con la foto resuelta a una URL servible. */
export interface CmsMember extends Omit<ResearchMember, "photo"> {
  photo: string | null;
}

/** Persona del equipo de gestión (puede no tener ficha propia). */
export interface CmsManagementMember {
  name: string;
  role: Record<Locale, string>;
  photo: string | null;
  slug?: string;
  memberSlug?: string;
  email?: string;
  links?: MemberLinks;
  bio?: Record<Locale, string>;
  degrees?: Record<Locale, string[]>;
  projects?: Record<Locale, string[]>;
}

export interface CmsManagementGroup {
  labelKey: "directionTitle" | "executiveTitle";
  members: CmsManagementMember[];
}

// ── Normalización de los documentos de Payload ──────────────────────────────

type PerLocale<T> = Partial<Record<Locale, T | null>>;
type ListRow = { value?: string | null };

interface RawPerson {
  slug: string;
  name: string;
  line?: string | null;
  team?: string | null;
  memberSlug?: string | null;
  role?: PerLocale<string>;
  email?: string | null;
  photo?: number | Media | null;
  links?: Partial<MemberLinks> | null;
  bio?: PerLocale<string>;
  degrees?: PerLocale<ListRow[]>;
  projects?: PerLocale<ListRow[]>;
}

/**
 * Campos cortos y obligatorios (cargo): si falta un idioma se usa el otro,
 * porque una tarjeta sin cargo se ve rota.
 */
const text = (value?: PerLocale<string>): Record<Locale, string> => ({
  es: value?.es ?? value?.en ?? "",
  en: value?.en ?? value?.es ?? "",
});

/**
 * Campos largos (biografía): SIN relleno entre idiomas.
 *
 * Parte del material de INCAR² llegó solo en español (p. ej. Felipe Quezada), y
 * el comportamiento acordado es ocultar la sección en el idioma que falta. Si se
 * rellenara con el otro idioma, la página en inglés mostraría un párrafo en
 * español bajo un título en inglés.
 */
const textStrict = (value?: PerLocale<string>): Record<Locale, string> => ({
  es: value?.es ?? "",
  en: value?.en ?? "",
});

/** Las filas del `array` localizado se aplanan a los `string[]` que espera la UI. */
const list = (value?: PerLocale<ListRow[]>): Record<Locale, string[]> => {
  const pick = (rows?: ListRow[] | null): string[] =>
    (rows ?? []).map((row) => row.value ?? "").filter((entry) => entry.length > 0);
  return { es: pick(value?.es), en: pick(value?.en) };
};

/** Descarta las claves vacías para no emitir enlaces rotos. */
const links = (value?: Partial<MemberLinks> | null): MemberLinks => {
  const result: MemberLinks = {};
  for (const key of ["linkedin", "orcid", "scholar", "researchgate"] as const) {
    const url = value?.[key];
    if (typeof url === "string" && url.length > 0) result[key] = url;
  }
  return result;
};

const toMember = (doc: RawPerson): CmsMember => ({
  slug: doc.slug,
  line: doc.line ?? "",
  name: doc.name,
  role: text(doc.role),
  email: doc.email ?? "",
  photo: mediaUrl(doc.photo) ?? null,
  links: links(doc.links),
  bio: textStrict(doc.bio),
  degrees: list(doc.degrees),
  projects: list(doc.projects),
});

const fetchPeople = async (collection: "research-members" | "management-team") => {
  const cms = await getCms();
  const { docs } = await cms.find({
    collection,
    locale: "all",
    depth: 1,
    limit: 500,
    sort: "order",
  });
  return docs as unknown as RawPerson[];
};

// ── Fuente estática (deploy sin base de datos) ──────────────────────────────

const staticToMember = (member: ResearchMember): CmsMember => ({
  ...member,
  photo: staticMemberPhoto(member),
});

// ── API pública ─────────────────────────────────────────────────────────────

/** Todos los integrantes de investigación, en el orden jerárquico definido. */
export const getResearchMembers = async (): Promise<CmsMember[]> => {
  if (useStaticCms()) return staticMembers.map(staticToMember);
  return (await fetchPeople("research-members")).map(toMember);
};

/** Integrantes de una línea, respetando el orden. */
export const getMembersByLine = async (lineSlug: string): Promise<CmsMember[]> =>
  (await getResearchMembers()).filter((member) => member.line === lineSlug);

/** Ficha individual por slug. */
export const getMember = async (slug: string): Promise<CmsMember | null> =>
  (await getResearchMembers()).find((member) => member.slug === slug) ?? null;

/** Slugs de todos los integrantes (para `generateStaticParams`). */
export const getMemberSlugs = async (): Promise<string[]> =>
  (await getResearchMembers()).map((member) => member.slug);

const toManagementMember = (doc: RawPerson): CmsManagementMember => {
  const bio = textStrict(doc.bio);
  const hasBio = bio.es.length > 0 || bio.en.length > 0;
  return {
    name: doc.name,
    role: text(doc.role),
    photo: mediaUrl(doc.photo) ?? null,
    // Solo estrena página propia quien tiene ficha; el resto es solo tarjeta.
    slug: hasBio ? doc.slug : undefined,
    memberSlug: doc.memberSlug ?? undefined,
    email: doc.email ?? undefined,
    links: links(doc.links),
    bio: hasBio ? bio : undefined,
    degrees: list(doc.degrees),
    projects: list(doc.projects),
  };
};

/** Equipo de gestión agrupado en Dirección y Equipo ejecutivo. */
export const getManagementGroups = async (): Promise<CmsManagementGroup[]> => {
  if (useStaticCms()) {
    return staticGroups.map((group) => ({
      labelKey: group.labelKey,
      members: group.members.map((member) => ({ ...member })),
    }));
  }

  const docs = await fetchPeople("management-team");
  const byTeam = (team: string) =>
    docs.filter((doc) => doc.team === team).map(toManagementMember);

  return [
    { labelKey: "directionTitle", members: byTeam("direction") },
    { labelKey: "executiveTitle", members: byTeam("executive") },
  ];
};

/** Personas del equipo de gestión con ficha propia (para `generateStaticParams`). */
export const getManagementSlugs = async (): Promise<string[]> =>
  (await getManagementGroups())
    .flatMap((group) => group.members)
    .map((member) => member.slug)
    .filter((slug): slug is string => Boolean(slug));

/** Persona del equipo de gestión por slug. */
export const getManagementMember = async (
  slug: string,
): Promise<CmsManagementMember | null> =>
  (await getManagementGroups())
    .flatMap((group) => group.members)
    .find((member) => member.slug === slug) ?? null;
