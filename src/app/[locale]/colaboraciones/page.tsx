import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/page-header";
import { LogoGrid } from "@/components/ui/logo-grid";
import { nationalCollaborators } from "@/content/collaborators";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Collaborations" });
  return buildMetadata({
    locale,
    pathname: "/colaboraciones",
    title: t("title"),
    description: t("lead").slice(0, 155),
  });
}

export default async function CollaborationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Collaborations");
  const mechanisms = t.raw("mechanisms") as { title: string; text: string }[];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      {/* Colaboración nacional: texto + sus logos */}
      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div data-reveal className="max-w-3xl">
            <h2 className="mb-4 text-fs-600 font-extrabold text-white sm:text-fs-700">
              {t("nationalTitle")}
            </h2>
            <p className="text-fs-300 leading-relaxed text-white/80">
              {t("nationalText")}
            </p>
          </div>
          <div className="mt-10">
            <LogoGrid logos={nationalCollaborators} />
          </div>
        </div>
      </section>

      {/* Red internacional: texto + franja de logos internacionales */}
      <section className="bg-navy-800 px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div data-reveal className="max-w-3xl">
            <h2 className="mb-4 text-fs-600 font-extrabold text-white sm:text-fs-700">
              {t("internationalTitle")}
            </h2>
            <p className="text-fs-300 leading-relaxed text-white/80">
              {t("internationalText")}
            </p>
          </div>
          {/* Franja única: INCAR² entregó estos logos en una sola imagen. Se
              muestra a tamaño legible y se desplaza en horizontal si no cabe. */}
          <div data-reveal className="mt-10 overflow-x-auto rounded-2xl bg-white p-6 lg:p-9">
            <Image
              src="/images/collab/internacionales.png"
              alt={t("groupInternational")}
              width={2012}
              height={371}
              sizes="(max-width: 768px) 760px, 1100px"
              className="mx-auto h-auto w-full min-w-[720px]"
            />
          </div>
        </div>
      </section>

      {/* Mecanismos de colaboración */}
      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div data-reveal className="mb-10 max-w-3xl">
            <p className="eyebrow mb-4">{t("mechanismsTitle")}</p>
            <p className="text-fs-400 leading-relaxed text-white/85">
              {t("mechanismsIntro")}
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-3">
            {mechanisms.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                data-reveal-delay={i + 1}
                className="rounded-2xl border border-white/10 bg-navy-950/50 p-7"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-teal/15 text-fs-500 font-bold text-teal">
                  {i + 1}
                </span>
                <h3 className="mb-2 text-fs-400 font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-fs-200 leading-relaxed text-white/75">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <p
              data-reveal
              className="rounded-2xl border-l-2 border-teal/60 bg-navy-950/40 p-6 text-fs-200 leading-relaxed text-white/80"
            >
              {t("ecosText")}
            </p>
            <p
              data-reveal
              data-reveal-delay="1"
              className="rounded-2xl border-l-2 border-teal/60 bg-navy-950/40 p-6 text-fs-200 leading-relaxed text-white/80"
            >
              {t("internshipsText")}
            </p>
          </div>
        </div>
      </section>

      {/* Alianza estratégica con NATIH */}
      <section className="bg-teal px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[900px]">
          <h2
            data-reveal
            className="text-fs-700 font-extrabold text-white sm:text-fs-800"
          >
            {t("natihTitle")}
          </h2>
          <p
            data-reveal
            data-reveal-delay="1"
            className="mt-5 text-fs-300 leading-relaxed text-white/90"
          >
            {t("natihText1")}
          </p>
          <p
            data-reveal
            data-reveal-delay="2"
            className="mt-4 text-fs-300 leading-relaxed text-white/90"
          >
            {t("natihText2")}
          </p>
        </div>
      </section>

    </>
  );
}
