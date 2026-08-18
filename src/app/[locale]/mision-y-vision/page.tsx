import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/page-header";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return buildMetadata({
    locale,
    pathname: "/mision-y-vision",
    title: `${t("missionTitle")} & ${t("visionTitle")}`,
    description: t("missionText").slice(0, 155),
  });
}

export default async function MissionVisionPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  // El contenido de Misión/Visión/Objetivos vive en el namespace "About".
  const t = await getTranslations("About");
  const tmv = await getTranslations("MissionVision");
  const objectives = t.raw("objectives") as string[];

  return (
    <>
      <PageHeader eyebrow="INCAR²" title={tmv("title")} />

      {/* Misión / Visión */}
      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-2">
          <article data-reveal data-reveal-x="left" className="rounded-3xl border-l-4 border-teal bg-navy-800/60 p-8 lg:p-10">
            <h2 className="text-fs-600 font-extrabold text-white">{t("missionTitle")}</h2>
            <p className="mt-4 text-fs-300 leading-relaxed text-white/75">{t("missionText")}</p>
          </article>
          <article data-reveal data-reveal-x="right" className="rounded-3xl border-l-4 border-peach bg-navy-800/60 p-8 lg:p-10">
            <h2 className="text-fs-600 font-extrabold text-white">{t("visionTitle")}</h2>
            <p className="mt-4 text-fs-300 leading-relaxed text-white/75">{t("visionText")}</p>
          </article>
        </div>
      </section>

      {/* Objetivo General */}
      <section className="bg-navy-800 px-5 py-16 lg:px-10 lg:py-20">
        <div data-reveal className="mx-auto max-w-[900px]">
          <h2 className="text-fs-600 font-extrabold text-white sm:text-fs-700">{t("objGeneralTitle")}</h2>
          <p className="mt-4 text-fs-400 leading-relaxed text-white/80">{t("objGeneralText")}</p>
        </div>
      </section>

      {/* Objetivos Específicos */}
      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="mb-12 text-center text-fs-700 font-extrabold text-white sm:text-fs-800">
            {t("objTitle")}
          </h2>
          <ol className="grid gap-6 md:grid-cols-2">
            {objectives.map((obj, i) => (
              <li key={i} data-reveal data-reveal-delay={(i % 2) + 1} className="flex gap-4 rounded-2xl border border-white/10 bg-navy-800/60 p-6">
                <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-teal">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <p className="text-fs-200 leading-relaxed text-white/80">{obj}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
