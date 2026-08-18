import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/page-header";
import { PersonAvatar } from "@/components/ui/person-avatar";
import type { MemberLinks } from "@/content/research-members";
import { researchLines } from "@/content/research-lines";
import { getMember, getMemberSlugs } from "@/lib/cms/members";

/** Enlaces de perfil externos, en orden de presentación con su etiqueta. */
const LINK_LABELS: { key: keyof MemberLinks; label: string }[] = [
  { key: "linkedin", label: "LinkedIn" },
  { key: "orcid", label: "ORCID" },
  { key: "scholar", label: "Google Scholar" },
  { key: "researchgate", label: "ResearchGate" },
];

export async function generateStaticParams() {
  return (await getMemberSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const member = await getMember(slug);
  if (!member) return {};
  return buildMetadata({
    locale,
    pathname: "/investigacion/equipo/[slug]",
    params: { slug },
    title: `${member.name} — INCAR²`,
    description: (member.bio[locale] || member.role[locale]).slice(0, 155),
  });
}

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const member = await getMember(slug);
  if (!member) notFound();

  const t = await getTranslations("Members");
  const line = researchLines.find((item) => item.slug === member.line);
  const bio = member.bio[locale];
  const degrees = member.degrees[locale];
  const projects = member.projects[locale];
  const profileLinks = LINK_LABELS.filter(({ key }) => member.links[key]);
  const photo = member.photo;

  return (
    <>
      <PageHeader
        eyebrow={line ? `RL${line.number}` : undefined}
        title={member.name}
        lead={member.role[locale]}
      />

      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          {/* Columna lateral: avatar + contacto */}
          <aside className="flex flex-col gap-6">
            <PersonAvatar
              photo={photo}
              name={member.name}
              variant="panel"
              priority
            />
            <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-6">
              <h2 className="mb-4 text-fs-100 font-bold uppercase tracking-[0.18em] text-white/60">
                {t("contactTitle")}
              </h2>
              <ul className="flex flex-col gap-3">
                {/* El correo es opcional en el panel: sin él no se emite el enlace. */}
                {member.email ? (
                  <li>
                    <a
                      href={`mailto:${member.email}`}
                      className="break-all text-fs-200 text-teal underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                    >
                      {member.email}
                    </a>
                  </li>
                ) : null}
                {profileLinks.map(({ key, label }) => (
                  <li key={key}>
                    <a
                      href={member.links[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fs-200 text-teal underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {line ? (
              <Link
                href={line.href as never}
                className="text-fs-200 font-semibold text-white/60 transition-colors hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                ← {t("backToLine")}
              </Link>
            ) : null}
          </aside>

          {/* Columna principal: bio, títulos, proyectos */}
          <div className="flex flex-col gap-12">
            {bio ? (
              <div>
                <h2 className="mb-4 text-fs-600 font-extrabold text-white">
                  {t("bioTitle")}
                </h2>
                <div className="flex flex-col gap-4">
                  {bio.split("\n\n").map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-fs-300 leading-relaxed text-white/80"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}

            {degrees.length > 0 ? (
              <div>
                <h2 className="mb-5 text-fs-600 font-extrabold text-white">
                  {t("degreesTitle")}
                </h2>
                <ul className="flex flex-col gap-3">
                  {degrees.map((degree) => (
                    <li
                      key={degree}
                      className="border-l-2 border-teal/50 pl-4 text-fs-300 leading-relaxed text-white/80"
                    >
                      {degree}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {projects.length > 0 ? (
              <div>
                <h2 className="mb-5 text-fs-600 font-extrabold text-white">
                  {t("projectsTitle")}
                </h2>
                <ul className="flex flex-col gap-4">
                  {projects.map((project) => (
                    <li
                      key={project}
                      className="rounded-2xl border border-white/10 bg-navy-800/50 p-5 text-fs-200 leading-relaxed text-white/80 [overflow-wrap:anywhere]"
                    >
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
