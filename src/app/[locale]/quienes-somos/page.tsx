import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/page-header";
import { LinkButton } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return buildMetadata({
    locale,
    pathname: "/quienes-somos",
    title: t("historyTitle"),
    description: t("history1").slice(0, 155),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  // El número de párrafos varía por idioma: el documento corregido en español
  // no incluye el párrafo de trayectoria que sí trae la versión en inglés.
  const historyParagraphs = t.raw("historyParagraphs") as string[];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("historyTitle")}
        lead={t("history1")}
      />

      {/* Sección 2: imagen + título grande */}
      <section className="bg-navy-800 px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal data-reveal-x="left" className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
            <Image src="/images/paginas/sede-concepcion.webp" alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div data-reveal data-reveal-x="right" className="flex flex-col gap-5">
            <h2 className="text-fs-700 font-extrabold leading-tight text-white sm:text-fs-800">
              {t("title2")}
            </h2>
            <p className="text-fs-300 leading-relaxed text-white/75">{t("text2")}</p>
          </div>
        </div>
      </section>

      {/* Sección 3: título grande + imagen + dos párrafos */}
      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <h2 data-reveal data-reveal-x="left" className="text-fs-700 font-extrabold leading-tight text-white sm:text-fs-800">
              {t("title3")}
            </h2>
            <div data-reveal data-reveal-x="right" className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
              <Image src="/images/paginas/laboratorio.webp" alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
          <div
            className={cn(
              "mt-10 grid gap-6 lg:gap-10",
              historyParagraphs.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2",
            )}
          >
            {historyParagraphs.map((paragraph, i) => (
              <p
                key={i}
                data-reveal
                data-reveal-delay={i || undefined}
                className="text-fs-300 leading-relaxed text-white/75"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 4: caja teal "8 líneas" + texto. La fotografía es la del equipo
          completo, porque acompaña al párrafo que habla de las ~90 personas. */}
      <section className="bg-navy-800 px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 lg:grid-cols-2">
          <div data-reveal data-reveal-x="left" className="relative overflow-hidden rounded-2xl">
            <Image src="/images/paginas/quienes-somos-equipo.webp" alt={t("teamImageAlt")} width={900} height={700} className="h-full w-full object-cover" />
            <div className="absolute left-6 top-6 max-w-xs rounded-2xl bg-teal p-6">
              <p className="text-fs-500 font-bold leading-snug text-white">{t("boxTitle")}</p>
            </div>
          </div>
          <div data-reveal data-reveal-x="right" className="flex flex-col gap-5">
            <p className="text-fs-300 leading-relaxed text-white/75">{t("text4")}</p>
            <div>
              <LinkButton href="/gobernanza" variant="primary" size="md">
                {t("cta")}
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 5: instituciones que conforman el centro */}
      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <p data-reveal className="max-w-3xl text-fs-300 leading-relaxed text-white/75">
            {t("institutionsText")}
          </p>
        </div>
      </section>
    </>
  );
}
