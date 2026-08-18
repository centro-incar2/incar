import type { Metadata } from "next";
import Image from "next/image";
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
  const t = await getTranslations({ locale, namespace: "Initiatives" });
  return buildMetadata({
    locale,
    pathname: "/iniciativas",
    title: t("title"),
    description: t("caligusText").slice(0, 155),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Initiatives");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} />

      {/* Iniciativa 01 — Caligus: imagen a la izquierda, texto a la derecha */}
      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div
            data-reveal
            data-reveal-x="left"
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
          >
            <Image
              src="/images/paginas/iniciativa-caligus.webp"
              alt=""
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div data-reveal data-reveal-x="right" className="flex flex-col gap-5">
            <p className="eyebrow">{t("sectionLabel")} · 01</p>
            <h2 className="text-fs-700 font-extrabold leading-tight text-white sm:text-fs-800">
              {t("caligusTitle")}
            </h2>
            <p className="text-fs-300 leading-relaxed text-white/75">
              {t("caligusText")}
            </p>
          </div>
        </div>
      </section>

      {/* Iniciativa 02 — SRS y Tenacibaculum: texto a la izquierda, imagen a la derecha */}
      <section className="bg-navy-800 px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div
            data-reveal
            data-reveal-x="left"
            className="order-last flex flex-col gap-5 lg:order-first"
          >
            <p className="eyebrow">{t("sectionLabel")} · 02</p>
            <h2 className="text-fs-700 font-extrabold leading-tight text-white sm:text-fs-800">
              {t("srsTitle")}
            </h2>
            <p className="text-fs-300 leading-relaxed text-white/75">
              {t("srsText1")}
            </p>
            <p className="text-fs-300 leading-relaxed text-white/75">
              {t("srsText2")}
            </p>
          </div>
          <div
            data-reveal
            data-reveal-x="right"
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
          >
            <Image
              src="/images/paginas/iniciativa-srs.webp"
              alt=""
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Iniciativa 03 — Acuicultura Restaurativa: contenido en preparación */}
      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div
            data-reveal
            className="flex flex-col items-center gap-5 rounded-2xl border border-teal/25 bg-teal/5 px-6 py-14 text-center lg:px-10"
          >
            <p className="eyebrow">{t("sectionLabel")} · 03</p>
            <h2 className="text-fs-700 font-extrabold leading-tight text-white sm:text-fs-800">
              {t("restorativeTitle")}
            </h2>
            <p className="max-w-2xl text-fs-300 leading-relaxed text-white/70">
              {t("restorativeNote")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
