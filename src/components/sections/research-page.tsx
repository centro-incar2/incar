import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SplitHero } from "@/components/ui/split-hero";
import { NumberedGrid } from "@/components/ui/numbered-grid";
import { LinkButton } from "@/components/ui/button";
import { MembersGrid } from "@/components/sections/members-grid";

import {
  NAMESPACE_LINE,
  type ResearchNamespace,
} from "@/content/research-namespaces";

/**
 * Plantilla compartida de las páginas de línea de investigación (RL1/RL2).
 * Replica la estructura del sitio original: hero dividido → ENFOQUE (caja teal)
 * → Objetivos Principales (cards numeradas) → Aplicaciones (sección teal) →
 * cierre "referente". Todo el texto proviene del namespace indicado (verbatim).
 */
export async function ResearchPage({
  namespace,
  heroImage,
  focusImage,
  closingImage,
}: {
  namespace: ResearchNamespace;
  heroImage: string;
  focusImage: string;
  closingImage: string;
}) {
  const t = await getTranslations(namespace);
  const objectives = t.raw("objectives") as string[];
  const transferItems = t.raw("transferItems") as string[];
  const hasAccentTitle = namespace === "Vaccines";

  return (
    <>
      <SplitHero
        image={heroImage}
        imageSide="left"
        eyebrow={t("eyebrow")}
        title={t("title")}
        titleAccent={hasAccentTitle ? t("titleAccent") : undefined}
        lead={t("lead")}
        cta={{ label: t("heroCta"), href: "/publicaciones" }}
      />

      {/* Integrantes de la línea: van inmediatamente bajo el hero, antes del
          contenido de la línea (petición de INCAR²). */}
      <MembersGrid lineSlug={NAMESPACE_LINE[namespace]} />

      {/* ENFOQUE: caja teal + imagen */}
      <section className="bg-navy-800 px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 lg:grid-cols-2">
          <div data-reveal data-reveal-x="left" className="rounded-2xl bg-teal p-8 lg:p-10">
            <p className="mb-4 text-fs-100 font-bold uppercase tracking-[0.2em] text-white/80">
              {t("focusEyebrow")}
            </p>
            <p className="text-fs-300 leading-relaxed text-white">
              {t("focusText")}
            </p>
          </div>
          <div data-reveal data-reveal-x="right" className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
            <Image
              src={focusImage}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Objetivos Principales */}
      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div data-reveal className="mb-12 text-center">
            <p className="eyebrow mb-4">{t("objEyebrow")}</p>
            <h2 className="text-fs-800 font-extrabold text-white">
              {t("objTitle")}
            </h2>
          </div>
          <NumberedGrid items={objectives} tone="navy" />
        </div>
      </section>

      {/* Aplicaciones tecnológicas (fondo teal) */}
      <section className="bg-teal px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <p data-reveal className="mb-4 text-fs-100 font-bold uppercase tracking-[0.2em] text-white/80">
            {t("transferEyebrow")}
          </p>
          <h2 data-reveal className="text-fs-700 font-extrabold text-white sm:text-fs-800">
            {t("transferTitle")}
          </h2>
          <p data-reveal className="mt-5 max-w-3xl text-fs-300 leading-relaxed text-white/90">
            {t("transferText")}
          </p>
          <div className="mt-10">
            <NumberedGrid items={transferItems} tone="teal" />
          </div>
        </div>
      </section>

      {/* Cierre: referente (imagen a sangre completa) */}
      <section className="bg-navy pb-4">
        <div className="grid items-stretch lg:grid-cols-2">
          <div data-reveal data-reveal-x="left" className="relative min-h-[300px] lg:min-h-[440px]">
            <Image
              src={closingImage}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-5 px-5 py-12 sm:px-8 lg:py-20 lg:pl-14 lg:pr-10">
            <div className="max-w-xl">
              <p data-reveal className="eyebrow mb-4">{t("closingEyebrow")}</p>
              <h2 data-reveal data-reveal-delay="1" className="text-fs-700 font-extrabold text-white sm:text-fs-800">
                {t("closingTitle")}{" "}
                <span className="text-teal">{t("closingTitleAccent")}</span>
              </h2>
              <p data-reveal data-reveal-delay="2" className="mt-5 text-fs-300 leading-relaxed text-white/80">
                {t("closingText")}
              </p>
              <div data-reveal data-reveal-delay="3" className="mt-6">
                <LinkButton href="/comunicaciones-y-vinculacion" variant="primary" size="md">
                  {t("closingCta")}
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
