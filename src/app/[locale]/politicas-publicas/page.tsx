import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/page-header";
import { buildMetadata } from "@/lib/seo";
import {
  getPolicyBriefs,
  getAdvisories,
  getOtherDocuments,
} from "@/lib/cms/documents";
import { PolicyBriefCard } from "@/components/policy/policy-brief-card";
import { DocumentCard } from "@/components/policy/document-card";
import { PolicyTabs } from "@/components/policy/policy-tabs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PublicPolicy" });
  return buildMetadata({
    locale,
    pathname: "/politicas-publicas",
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
  const t = await getTranslations("PublicPolicy");

  // Los tres listados salen del panel; en paralelo porque son independientes.
  const [briefs, advisories, others] = await Promise.all([
    getPolicyBriefs(locale),
    getAdvisories(locale),
    getOtherDocuments(locale),
  ]);

  const axes = [
    { title: t("axis1Title"), text: t("axis1Text") },
    { title: t("axis2Title"), text: t("axis2Text") },
    { title: t("axis3Title"), text: t("axis3Text") },
  ];

  // ── Panel 1 · Policy Briefs (contenido existente, sin cambios) ────────────
  const policyBriefPanel = (
    <>
      {/* Intro + por qué comunicar ciencia: los tres ejes estratégicos */}
      <section className="bg-navy-800 px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <h2
            data-reveal
            className="max-w-4xl text-fs-700 font-extrabold leading-tight text-white sm:text-fs-800"
          >
            {t("heroTitle")}
          </h2>
          <p
            data-reveal
            data-reveal-delay="1"
            className="mt-6 max-w-3xl text-fs-300 leading-relaxed text-white/80"
          >
            {t("intro1")}
          </p>
          <p
            data-reveal
            data-reveal-delay="1"
            className="mt-4 max-w-3xl text-fs-300 leading-relaxed text-white/80"
          >
            {t("intro2")}
          </p>

          <h3
            data-reveal
            className="mt-14 max-w-3xl text-fs-500 font-bold leading-tight text-white sm:text-fs-600"
          >
            {t("whyTitle")}
          </h3>
          <p
            data-reveal
            data-reveal-delay="1"
            className="mt-4 max-w-3xl text-fs-300 leading-relaxed text-white/80"
          >
            {t("whyLead")}
          </p>

          <ul className="mt-10 grid gap-6 lg:grid-cols-3">
            {axes.map((axis, index) => (
              <li
                key={axis.title}
                data-reveal
                data-reveal-delay={String(index + 1)}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-navy-900/50 p-7"
              >
                <span
                  aria-hidden="true"
                  className="text-fs-500 font-extrabold text-teal"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="text-fs-400 font-bold leading-snug text-white">
                  {axis.title}
                </h4>
                <p className="text-fs-200 leading-relaxed text-white/70">
                  {axis.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Galería de Policy Briefs con descarga directa */}
      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <h3
            data-reveal
            className="text-fs-600 font-extrabold leading-tight text-white sm:text-fs-700"
          >
            {t("listTitle")}
          </h3>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {briefs.map((brief) => (
              <li key={brief.number}>
                <PolicyBriefCard
                  brief={brief}
                  labels={{
                    brief: t("briefLabel"),
                    download: t("download"),
                    downloadSummary: t("downloadSummary"),
                    downloadAria: t("downloadAria"),
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );

  // ── Panel 2 · Asesoría Técnica Parlamentaria (BCN) ────────────────────────
  const advisoryPanel = (
    <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <h2
          data-reveal
          className="max-w-4xl text-fs-700 font-extrabold leading-tight text-white sm:text-fs-800"
        >
          {t("advisoryTitle")}
        </h2>
        <div className="mt-6 grid max-w-4xl gap-4">
          {(["advisoryIntro1", "advisoryIntro2", "advisoryIntro3"] as const).map(
            (key, index) => (
              <p
                key={key}
                data-reveal
                data-reveal-delay={String(index + 1)}
                className="text-fs-300 leading-relaxed text-white/80"
              >
                {t(key)}
              </p>
            ),
          )}
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advisories.map((advisory) => (
            <li key={advisory.number}>
              <DocumentCard
                item={{
                  ghost: String(advisory.number).padStart(2, "0"),
                  eyebrow: `${t("advisoryLabel")} ${advisory.number}`,
                  title: advisory.title,
                  file: advisory.file,
                  sizeMB: advisory.sizeMB,
                  downloadName: advisory.downloadName,
                }}
                downloadLabel={t("download")}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );

  // ── Panel 3 · Otros Documentos ────────────────────────────────────────────
  const otherPanel = (
    <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <h2
          data-reveal
          className="max-w-4xl text-fs-700 font-extrabold leading-tight text-white sm:text-fs-800"
        >
          {t("otherTitle")}
        </h2>
        <div className="mt-6 grid max-w-4xl gap-4">
          <p data-reveal className="text-fs-300 leading-relaxed text-white/80">
            {t("otherIntro1")}
          </p>
          <p
            data-reveal
            data-reveal-delay="1"
            className="text-fs-300 leading-relaxed text-white/80"
          >
            {t("otherIntro2")}
          </p>
        </div>

        <ul className="mt-12 grid max-w-3xl gap-6">
          {others.map((doc) => (
            <li key={doc.file}>
              <DocumentCard
                item={{
                  eyebrow: t("otherDocLabel"),
                  title: doc.title,
                  date: doc.date,
                  description: doc.description,
                  file: doc.file,
                  sizeMB: doc.sizeMB,
                  downloadName: doc.downloadName,
                  extras: doc.annexes,
                }}
                downloadLabel={t("download")}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );

  return (
    <>
      <PageHeader eyebrow="INCAR²" title={t("title")} />

      <PolicyTabs
        tabs={[
          { id: "policy-briefs", label: t("tabPolicyBrief"), panel: policyBriefPanel },
          { id: "asesorias", label: t("tabAdvisory"), panel: advisoryPanel },
          { id: "otros", label: t("tabOther"), panel: otherPanel },
        ]}
      />
    </>
  );
}
