import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/page-header";
import { LogoGrid } from "@/components/ui/logo-grid";
import { PersonAvatar } from "@/components/ui/person-avatar";
import { buildMetadata } from "@/lib/seo";
import { academicCouncil, boardSeats } from "@/content/governance";
import { memberInstitutions, strategicAllyLogos } from "@/content/collaborators";
import { getResearchMembers } from "@/lib/cms/members";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Governance" });
  return buildMetadata({
    locale,
    pathname: "/gobernanza",
    title: t("title"),
    description: t("institutionsText").slice(0, 155),
  });
}

export default async function GovernancePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Governance");
  const activeLocale = (await getLocale()) as Locale;
  // Las fotos del Consejo Académico se toman de la ficha de cada PI en el CMS.
  const membersBySlug = new Map(
    (await getResearchMembers()).map((member) => [member.slug, member]),
  );

  return (
    <>
      {/* La cabecera va sin bajada: el texto de las instituciones abre la página
          en su propia sección, por indicación de INCAR². */}
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} />

      {/* Instituciones que conforman el Centro */}
      <section className="bg-navy-800 px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div data-reveal className="max-w-3xl">
            <h2 className="mb-5 text-fs-600 font-extrabold text-white sm:text-fs-700">
              {t("institutionsTitle")}
            </h2>
            <p className="text-fs-300 leading-relaxed text-white/80">
              {t("institutionsText")}
            </p>
          </div>
          <div className="mt-10">
            <LogoGrid logos={memberInstitutions} columns={5} />
          </div>
        </div>
      </section>

      {/* Consejo Académico: los Investigadores Principales, con su fotografía */}
      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-4">{t("councilEyebrow")}</p>
            <h2 className="text-fs-700 font-extrabold text-white sm:text-fs-800">
              {t("councilTitle")}
            </h2>
            <p className="mt-5 text-fs-300 leading-relaxed text-white/75">
              {t("councilText")}
            </p>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {academicCouncil.map((seat, i) => {
              const photo = membersBySlug.get(seat.memberSlug)?.photo ?? null;
              return (
                <li key={seat.name} data-reveal data-reveal-delay={(i % 4) + 1}>
                  <Link
                    href={{
                      pathname: "/investigacion/equipo/[slug]",
                      params: { slug: seat.memberSlug },
                    }}
                    className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-white/10 bg-navy-800/60 p-6 text-center transition-colors hover:border-teal/50 focus-visible:border-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                  >
                    <PersonAvatar photo={photo} name={seat.name} />
                    <h3 className="text-fs-200 font-bold leading-snug text-white">
                      {seat.name}
                    </h3>
                    <span className="text-fs-100 leading-snug text-teal">
                      {seat.role[activeLocale]}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Directorio: cada asiento con el logo de la institución que representa */}
      <section className="bg-navy-800 px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div data-reveal className="max-w-3xl">
            <h2 className="mb-5 text-fs-600 font-extrabold text-white sm:text-fs-700">
              {t("boardTitle")}
            </h2>
            <p className="text-fs-300 leading-relaxed text-white/80">
              {t("boardText1")}
            </p>
            <p className="mt-4 text-fs-300 leading-relaxed text-white/80">
              {t("boardText2")}
            </p>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {boardSeats.map((seat, i) => (
              <li
                key={seat.role[activeLocale] + seat.logo}
                data-reveal
                data-reveal-delay={(i % 3) + 1}
                className="flex items-center gap-5 rounded-2xl border border-white/10 bg-navy-800/60 p-5"
              >
                <span className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-white p-2">
                  <Image
                    src={`/images/collab/${seat.logo}.png`}
                    alt={seat.institution}
                    width={200}
                    height={120}
                    sizes="96px"
                    className="h-full w-auto max-w-full object-contain"
                  />
                </span>
                <div>
                  <p className="text-fs-200 font-semibold leading-snug text-white">
                    {seat.role[activeLocale]}
                  </p>
                  <p className="mt-1 text-fs-100 leading-snug text-teal">
                    {seat.institution}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Alianzas estratégicas */}
      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div data-reveal className="max-w-3xl">
            <p className="eyebrow mb-4">{t("alliancesEyebrow")}</p>
            <h2 className="mb-5 text-fs-600 font-extrabold text-white sm:text-fs-700">
              {t("alliancesTitle")}
            </h2>
            <p className="text-fs-300 leading-relaxed text-white/80">
              {t("alliancesText1")}
            </p>
            <p className="mt-4 text-fs-300 leading-relaxed text-white/80">
              {t("alliancesText2")}
            </p>
          </div>
          <div className="mt-10">
            <LogoGrid logos={strategicAllyLogos} columns={4} />
          </div>
        </div>
      </section>

      {/* Comité Asesor Nacional */}
      <section className="bg-teal px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div
            data-reveal
            className="relative min-h-[320px] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
          >
            <Image
              src="/images/paginas/centro-cultivo.webp"
              alt={t("advisoryImageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div data-reveal data-reveal-x="right">
            <h2 className="text-fs-600 font-extrabold text-white sm:text-fs-700">
              {t("advisoryTitle")}
            </h2>
            <p className="mt-5 text-fs-200 leading-relaxed text-white/90">
              {t("advisoryText1")}
            </p>
            <p className="mt-4 text-fs-200 leading-relaxed text-white/90">
              {t("advisoryText2")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
