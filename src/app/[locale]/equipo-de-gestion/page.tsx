import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/page-header";
import { PersonAvatar } from "@/components/ui/person-avatar";
import { getManagementGroups, type CmsManagementMember } from "@/lib/cms/members";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Management" });
  return buildMetadata({
    locale,
    pathname: "/equipo-de-gestion",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function ManagementTeamPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Management");
  const activeLocale = (await getLocale()) as Locale;
  const managementGroups = await getManagementGroups();

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      {managementGroups.map((group, groupIndex) => (
        <section
          key={group.labelKey}
          className={`px-5 py-16 lg:px-10 lg:py-24 ${
            groupIndex % 2 === 0 ? "bg-navy" : "bg-navy-800"
          }`}
        >
          <div className="mx-auto max-w-[1200px]">
            <h2
              data-reveal
              className="mb-10 text-fs-600 font-extrabold text-white sm:text-fs-700"
            >
              {t(group.labelKey)}
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {group.members.map((member, i) => (
                <li key={member.name} data-reveal data-reveal-delay={(i % 4) + 1}>
                  <MemberCard member={member} locale={activeLocale} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}

/**
 * Tarjeta del equipo. Enlaza a la ficha de gestión de la persona si INCAR²
 * entregó su perfil, o a su ficha de investigador si además integra una línea;
 * quien no tiene ninguna de las dos se muestra como tarjeta simple.
 */
function MemberCard({
  member,
  locale,
}: {
  member: CmsManagementMember;
  locale: Locale;
}) {
  const inner = (
    <>
      <PersonAvatar photo={member.photo} name={member.name} />
      <h3 className="text-fs-200 font-bold leading-snug text-white">
        {member.name}
      </h3>
      <span className="text-fs-100 leading-snug text-teal">
        {member.role[locale]}
      </span>
    </>
  );

  const shared =
    "flex h-full flex-col items-center gap-3 rounded-2xl border border-white/10 bg-navy-950/50 p-6 text-center";
  const interactive = `${shared} transition-colors hover:border-teal/50 focus-visible:border-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal`;

  if (member.slug && member.bio) {
    return (
      <Link
        href={{
          pathname: "/equipo-de-gestion/[slug]",
          params: { slug: member.slug },
        }}
        className={interactive}
      >
        {inner}
      </Link>
    );
  }

  if (member.memberSlug) {
    return (
      <Link
        href={{
          pathname: "/investigacion/equipo/[slug]",
          params: { slug: member.memberSlug },
        }}
        className={interactive}
      >
        {inner}
      </Link>
    );
  }

  return <div className={shared}>{inner}</div>;
}
