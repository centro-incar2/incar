import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/page-header";
import { ExternalLinkButton } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Events" });
  return buildMetadata({
    locale,
    pathname: "/eventos",
    title: t("title"),
    description: t("intro1").slice(0, 155),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Events");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("intro1")} />

      {/* Introducción (párrafos 2 y 3) */}
      <section className="bg-navy-800 px-5 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-6 lg:grid-cols-2 lg:gap-14">
          <p data-reveal className="text-fs-300 leading-relaxed text-white/80">
            {t("intro2")}
          </p>
          <p
            data-reveal
            data-reveal-delay="1"
            className="text-fs-300 leading-relaxed text-white/80"
          >
            {t("intro3")}
          </p>
        </div>
      </section>

      {/* Listado de eventos */}
      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <p data-reveal className="eyebrow mb-10">
            {t("listEyebrow")}
          </p>

          {/* SRS 2026 International Conference */}
          <article
            data-reveal
            className="overflow-hidden rounded-2xl border border-white/10 bg-navy-800/60 shadow-[var(--shadow-card)]"
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/images/paginas/eventos-fiordo.webp"
                alt=""
                fill
                sizes="(max-width:768px) 100vw, 768px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
            </div>
            <div className="flex flex-col gap-4 p-7 sm:p-10">
              <h2 className="text-fs-600 font-extrabold leading-tight text-white sm:text-fs-700">
                {t("srsName")}
              </h2>
              <p className="text-fs-300 leading-relaxed text-white/80">
                {t("srsText1")}
              </p>
              <p className="text-fs-300 leading-relaxed text-white/75">
                {t("srsText2")}
              </p>
              <p className="text-fs-300 leading-relaxed text-white/75">
                {t("srsText3")}
              </p>
              <p className="text-fs-300 leading-relaxed text-white/75">
                {t("srsText4")}
              </p>
              <p className="text-fs-300 leading-relaxed text-white/75">
                {t("srsText5")}
              </p>
              <div className="mt-2">
                <ExternalLinkButton
                  href={t("srsUrl")}
                  target="_blank"
                  variant="primary"
                  size="md"
                >
                  {t("visitSite")}
                </ExternalLinkButton>
              </div>
            </div>
          </article>

          {/* EPIMAR 2027 */}
          <article
            data-reveal
            className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-navy-800/60 shadow-[var(--shadow-card)]"
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/images/eventos/epimar-2027.jpg"
                alt=""
                fill
                sizes="(max-width:768px) 100vw, 768px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
            </div>
            <div className="flex flex-col gap-4 p-7 sm:p-10">
              <h2 className="text-fs-600 font-extrabold leading-tight text-white sm:text-fs-700">
                {t("epimarName")}
              </h2>
              <p className="text-fs-300 leading-relaxed text-white/80">
                {t("epimarText1")}
              </p>
              <p className="text-fs-300 leading-relaxed text-white/75">
                {t("epimarText2")}
              </p>
              <p className="text-fs-300 leading-relaxed text-white/75">
                {t("epimarText3")}
              </p>
              <div className="mt-1 rounded-xl border border-teal/25 bg-navy-950/40 p-5">
                <h3 className="eyebrow mb-2">{t("epimarDatesTitle")}</h3>
                <p className="text-fs-200 leading-relaxed text-white/75">
                  {t("epimarDates")}
                </p>
              </div>
              <div className="mt-2">
                <ExternalLinkButton
                  href={t("epimarUrl")}
                  target="_blank"
                  variant="primary"
                  size="md"
                >
                  {t("visitSite")}
                </ExternalLinkButton>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
