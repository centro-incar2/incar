import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/page-header";
import { ExternalLinkButton } from "@/components/ui/button";
import { serviceAreas, type ServiceArea } from "@/content/service-areas";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  return buildMetadata({
    locale,
    pathname: "/servicios-y-tecnologia",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Services");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
      />

      {serviceAreas.map((area, index) => (
        <AreaSection
          key={area.slug}
          area={area}
          locale={locale}
          alternate={index % 2 === 1}
          labels={{
            area: t("areaLabel"),
            services: t("servicesTitle"),
            future: t("futureTitle"),
          }}
        />
      ))}

      {/* CTA de contacto comercial */}
      <section className="bg-teal px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h2
            data-reveal
            className="text-fs-700 font-extrabold leading-tight text-white sm:text-fs-800"
          >
            {t("ctaTitle")}
          </h2>
          <p data-reveal className="text-fs-300 leading-relaxed text-white/90">
            {t("ctaText")}
          </p>
          <div data-reveal data-reveal-delay="1">
            <ExternalLinkButton
              href={`mailto:${t("ctaEmail")}`}
              variant="outline"
              size="lg"
            >
              {t("ctaEmail")}
            </ExternalLinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

/** Bloque de un área: imagen + servicio principal, detalle y servicios futuros. */
function AreaSection({
  area,
  locale,
  alternate,
  labels,
}: {
  area: ServiceArea;
  locale: Locale;
  alternate: boolean;
  labels: { area: string; services: string; future: string };
}) {
  return (
    <section
      className={`px-5 py-16 lg:px-10 lg:py-24 ${alternate ? "bg-navy-800" : "bg-navy"}`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div
            data-reveal
            data-reveal-x={alternate ? "right" : "left"}
            className={`relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-card)] ${
              alternate ? "lg:order-last" : ""
            }`}
          >
            <Image
              src={area.image}
              alt={area.imageAlt[locale]}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div
            data-reveal
            data-reveal-x={alternate ? "left" : "right"}
            className="flex flex-col gap-4"
          >
            <p className="eyebrow">
              {labels.area} {area.number}
            </p>
            <h2 className="text-fs-700 font-extrabold leading-tight text-white sm:text-fs-800">
              {area.name[locale]}
            </h2>
            <p className="text-fs-400 font-semibold leading-snug text-teal">
              {area.headline[locale]}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          <div data-reveal>
            <h3 className="eyebrow mb-5 text-white/60">{labels.services}</h3>
            <ul className="flex flex-col gap-3">
              {area.services[locale].map((service) => (
                <ServiceItem key={service} text={service} />
              ))}
            </ul>
          </div>

          <div
            data-reveal
            data-reveal-delay="1"
            className="h-fit rounded-2xl border border-teal/25 bg-navy-950/50 p-7"
          >
            <h3 className="eyebrow mb-5">{labels.future}</h3>
            <ul className="flex flex-col gap-3">
              {area.future[locale].map((service) => (
                <ServiceItem key={service} text={service} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
      />
      <span className="text-fs-300 leading-relaxed text-white/80">{text}</span>
    </li>
  );
}
