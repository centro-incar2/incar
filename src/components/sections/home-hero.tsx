import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { LinkButton, ExternalLinkButton } from "@/components/ui/button";
import { HeroCarousel, type HeroSlideData } from "./hero-carousel";

/** Clases del titular, compartidas por la lámina principal (h1) y las promocionales (h2). */
const HEADING = "text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl";

/** Estructura común de las láminas promocionales: título, texto opcional y CTA. */
function PromoSlide({
  title,
  text,
  cta,
}: {
  title: string;
  text?: string;
  cta: ReactNode;
}) {
  return (
    <>
      <h2 className={HEADING}>{title}</h2>
      {text ? (
        <p className="mt-6 max-w-xl text-fs-300 leading-relaxed text-white/85">
          {text}
        </p>
      ) : null}
      <div className="mt-8">{cta}</div>
    </>
  );
}


/**
 * Hero principal del Home: carrusel de 5 láminas sobre imagen a sangre con
 * overlay navy. La primera lámina conserva el banner original (h1 del sitio,
 * subtítulo y doble CTA); las siguientes destacan eventos y secciones clave.
 */
export async function HomeHero() {
  const t = await getTranslations("Home");

  const slides: HeroSlideData[] = [
    {
      id: "main",
      image: "/images/home/hero.webp",
      content: (
        <>
          <h1 className={`animate-[var(--animate-fade-up)] ${HEADING}`}>
            {t("heroTitle")}{" "}
            <span className="text-teal">{t("heroTitleAccent")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-fs-300 leading-relaxed text-white/85 [animation-delay:120ms] animate-[var(--animate-fade-up)]">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-3 [animation-delay:240ms] animate-[var(--animate-fade-up)] sm:flex-row">
            <LinkButton href="/investigacion" variant="primary" size="lg">
              {t("heroCta1")}
            </LinkButton>
            <LinkButton href="/quienes-somos" variant="outline" size="lg">
              {t("heroCta2")}
            </LinkButton>
          </div>
        </>
      ),
    },
    {
      id: "srs2026",
      // Lámina gráfica oficial del evento (entregada por INCAR), recortada para
      // eliminar la banda derecha sin contenido.
      image: "/images/eventos/srs-2026.jpg",
      focus: "event",
      imageAlt: t("slideSrsAlt"),
      content: (
        <PromoSlide
          title={t("slideSrsTitle")}
          text={t("slideSrsText")}
          cta={
            <ExternalLinkButton
              href="https://www.srs2026conference.cl"
              target="_blank"
              variant="primary"
              size="lg"
            >
              {t("slideMoreInfo")}
            </ExternalLinkButton>
          }
        />
      ),
    },
    {
      id: "epimar2027",
      // Lámina gráfica oficial del evento (entregada por INCAR).
      image: "/images/eventos/epimar-2027.jpg",
      focus: "event",
      imageAlt: t("slideEpimarAlt"),
      content: (
        <PromoSlide
          title={t("slideEpimarTitle")}
          text={t("slideEpimarText")}
          cta={
            <ExternalLinkButton
              href="https://centroincar.cl/epimar2027/"
              target="_blank"
              variant="primary"
              size="lg"
            >
              {t("slideMoreInfo")}
            </ExternalLinkButton>
          }
        />
      ),
    },
    {
      id: "policy-briefs",
      image: "/images/home/slide-politicas.webp",
      content: (
        <PromoSlide
          title={t("slidePolicyTitle")}
          text={t("slidePolicyText")}
          cta={
            <LinkButton href="/politicas-publicas" variant="primary" size="lg">
              {t("slidePolicyCta")}
            </LinkButton>
          }
        />
      ),
    },
    {
      id: "initiatives",
      image: "/images/home/slide-iniciativas.webp",
      content: (
        <PromoSlide
          title={t("slideInitiativesTitle")}
          text={t("slideInitiativesText")}
          cta={
            <LinkButton href="/iniciativas" variant="primary" size="lg">
              {t("slideInitiativesCta")}
            </LinkButton>
          }
        />
      ),
    },
  ];

  return (
    <HeroCarousel
      slides={slides}
      labels={{
        region: t("carouselLabel"),
        previous: t("carouselPrev"),
        next: t("carouselNext"),
        goToSlide: t("carouselGoTo"),
      }}
    />
  );
}
