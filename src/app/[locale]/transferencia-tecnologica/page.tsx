import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/page-header";
import { NumberedGrid } from "@/components/ui/numbered-grid";
import { ExternalLinkButton } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Transfer" });
  return buildMetadata({
    locale,
    pathname: "/transferencia-tecnologica",
    title: t("title"),
    description: t("missionText1").slice(0, 155),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Transfer");
  const objectives = t.raw("objectives") as string[];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("missionText1")}
      />

      {/* Continuación de la misión (párrafo 2) */}
      <section className="bg-navy-800 px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <p
            data-reveal
            className="text-fs-400 leading-relaxed text-white/80"
          >
            {t("missionText2")}
          </p>
        </div>
      </section>

      {/* Programas: SFERA e INAH (bloques alternos) */}
      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div data-reveal className="mb-12 text-center">
            <p className="eyebrow mb-4">{t("programsEyebrow")}</p>
            <h2 className="text-fs-800 font-extrabold text-white">
              {t("programsTitle")}
            </h2>
          </div>

          {/* SFERA: imagen izquierda + texto derecha */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div
              data-reveal
              data-reveal-x="left"
              className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
            >
              <Image
                src="/images/paginas/estudiantes-lab.webp"
                alt=""
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div data-reveal data-reveal-x="right" className="flex flex-col gap-4">
              <div>
                <span className="text-fs-800 font-extrabold leading-none text-teal">
                  {t("sferaName")}
                </span>
                <p className="mt-2 text-fs-300 font-semibold text-white/90">
                  {t("sferaFull")}
                </p>
              </div>
              <p className="eyebrow">{t("whatIs")}</p>
              <p className="text-fs-300 leading-relaxed text-white/75">
                {t("sferaText")}
              </p>
            </div>
          </div>

          {/* INAH: texto izquierda + imagen derecha */}
          <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div
              data-reveal
              data-reveal-x="left"
              className="order-last flex flex-col gap-4 lg:order-first"
            >
              <div>
                <span className="text-fs-800 font-extrabold leading-none text-teal">
                  {t("inahName")}
                </span>
                <p className="mt-2 text-fs-300 font-semibold text-white/90">
                  {t("inahFull")}
                </p>
              </div>
              <p className="eyebrow">{t("whatIs")}</p>
              <p className="text-fs-300 leading-relaxed text-white/75">
                {t("inahText1")}
              </p>
              <p className="text-fs-300 leading-relaxed text-white/75">
                {t("inahText2")}
              </p>
              <p className="text-fs-300 leading-relaxed text-white/75">
                {t("inahText3")}
              </p>
            </div>
            <div
              data-reveal
              data-reveal-x="right"
              className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
            >
              <Image
                src="/images/paginas/planta-proceso.webp"
                alt=""
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programa SFERA – INAH (sinergia) */}
      <section className="bg-navy-800 px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1000px]">
          <h2
            data-reveal
            className="text-fs-700 font-extrabold text-white sm:text-fs-800"
          >
            {t("synergyTitle")}
          </h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-10">
            <p data-reveal className="text-fs-300 leading-relaxed text-white/80">
              {t("synergyText1")}
            </p>
            <p
              data-reveal
              data-reveal-delay="1"
              className="text-fs-300 leading-relaxed text-white/80"
            >
              {t("synergyText2")}
            </p>
          </div>
        </div>
      </section>

      {/* Objetivos (fondo teal) */}
      <section className="bg-teal px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto max-w-3xl text-center">
            <p
              data-reveal
              className="mb-4 text-fs-100 font-bold uppercase tracking-[0.2em] text-white/80"
            >
              {t("objGeneralTitle")}
            </p>
            <p
              data-reveal
              className="text-fs-400 leading-relaxed text-white"
            >
              {t("objGeneralText")}
            </p>
          </div>
          <h2
            data-reveal
            className="mt-14 mb-8 text-center text-fs-700 font-extrabold text-white sm:text-fs-800"
          >
            {t("objSpecificTitle")}
          </h2>
          <NumberedGrid items={objectives} tone="teal" />
        </div>
      </section>

      {/* CTA de contacto */}
      <section className="bg-navy px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h2
            data-reveal
            className="text-fs-700 font-extrabold leading-tight text-white sm:text-fs-800"
          >
            {t("contactText")}
          </h2>
          <div data-reveal data-reveal-delay="1">
            <ExternalLinkButton
              href={`mailto:${t("contactEmail")}`}
              variant="primary"
              size="lg"
            >
              {t("contactEmail")}
            </ExternalLinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
