import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LinkButton } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { researchLines } from "@/content/research-lines";

/**
 * Sección "Investigación" del Home: texto e imagen, más las 8 líneas como
 * enlaces directos a su página de detalle.
 */
export async function ResearchGrid() {
  const t = await getTranslations("Home");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="bg-navy px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-reveal data-reveal-x="left" className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <p className="eyebrow">{t("researchEyebrow")}</p>
            <h2 className="text-fs-700 font-extrabold text-white sm:text-fs-800">
              {t("researchTitle")}
            </h2>
            <p className="text-fs-300 leading-relaxed text-white/75">
              {t("researchText")}
            </p>
          </div>

          <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {researchLines.map((line) => (
              <li key={line.slug}>
                <Link
                  href={line.href as never}
                  className="group flex items-start gap-2.5 rounded-lg py-1.5 text-fs-200 leading-snug text-white/85 transition-colors hover:text-teal"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-teal transition-transform group-hover:scale-125"
                  />
                  <span>{line.title[locale]}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div>
            <LinkButton href="/investigacion" variant="primary" size="md">
              {t("researchCta")}
            </LinkButton>
          </div>
        </div>

        <div
          data-reveal
          data-reveal-x="right"
          className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
        >
          <Image
            src="/images/home/lineas.webp"
            alt={t("researchImageAlt")}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
