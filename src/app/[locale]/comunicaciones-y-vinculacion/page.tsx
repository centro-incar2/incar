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
  const t = await getTranslations({ locale, namespace: "Communications" });
  return buildMetadata({
    locale,
    pathname: "/comunicaciones-y-vinculacion",
    title: t("title"),
    description: t("lead").slice(0, 155),
  });
}

export default async function CommunicationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Communications");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        cta={{ label: t("heroCta"), href: "/gobernanza" }}
      />

      {/* Diseminación */}
      <section className="bg-navy-800 px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal data-reveal-x="left">
            <p className="eyebrow mb-5">{t("disseminationEyebrow")}</p>
            <p className="text-fs-400 leading-relaxed text-white/85">{t("disseminationText")}</p>
          </div>
          <div
            data-reveal
            data-reveal-x="right"
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
          >
            <Image
              src="/images/paginas/vinculacion-2.webp"
              alt={t("disseminationImageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vinculación Social */}
      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div
            data-reveal
            data-reveal-x="left"
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
          >
            <Image
              src="/images/paginas/vinculacion-1.webp"
              alt={t("outreachImageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div data-reveal data-reveal-x="right">
            <p className="eyebrow mb-5">{t("outreachEyebrow")}</p>
            <h2 className="text-fs-700 font-extrabold text-white">{t("outreachTitle")}</h2>
            <p className="mt-5 text-fs-400 leading-relaxed text-white/85">{t("outreachText")}</p>
          </div>
        </div>
      </section>

      {/* Ecosistema de actores */}
      <section className="bg-navy-800 px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="eyebrow mb-4">{t("ecosystemEyebrow")}</p>
          <h2 className="text-fs-600 font-extrabold text-white sm:text-fs-700">{t("ecosystemTitle")}</h2>
          <div className="mt-10">
            <p className="mb-4 text-fs-100 font-bold uppercase tracking-[0.2em] text-teal">{t("mapeoEyebrow")}</p>
            <h3 className="mb-8 text-fs-500 font-bold text-white">{t("mapeoTitle")}</h3>
            {/* La infografía viene sobre fondo claro: se monta en una tarjeta blanca
                para no perder contraste sobre el tema oscuro del sitio. */}
            <div data-reveal className="overflow-hidden rounded-2xl bg-white p-4 shadow-[var(--shadow-card)] sm:p-6">
              <Image
                src="/images/paginas/ecosistema-actores.webp"
                alt={t("mapeoImageAlt")}
                width={1600}
                height={892}
                sizes="(max-width: 1100px) 100vw, 1100px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
