import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LinkButton } from "@/components/ui/button";

/**
 * Sección "Servicios y Transferencia" del Home: presenta los dos programas del
 * centro —SFERA (apoyo a grupos emergentes) e INAH (hub de aceleración)— y
 * enlaza a las páginas de Servicios y Tecnologías y de Transferencia
 * Tecnológica. Los textos son los de las fichas oficiales SFERA – INAH.
 */
export async function ServicesTransfer() {
  const t = await getTranslations("Home");
  const summary = t.raw("stSummary") as string[];

  return (
    <section className="bg-navy-800 px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal data-reveal-x="left" className="flex flex-col gap-5">
            <p className="eyebrow">{t("stEyebrow")}</p>
            <h2 className="text-fs-700 font-extrabold text-white sm:text-fs-800">
              {t("stTitle")}
            </h2>
            <p className="text-fs-300 leading-relaxed text-white/75">
              {t("stText")}
            </p>
          </div>

          <div
            data-reveal
            data-reveal-x="right"
            className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
          >
            <Image
              src="/images/home/servicios.webp"
              alt={t("stImageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2">
          <ProgramCard
            name="SFERA"
            full={t("stSferaFull")}
            whatIs={t("stWhatIs")}
            text={t("stSferaText")}
          />
          <ProgramCard
            name="INAH"
            full={t("stInahFull")}
            whatIs={t("stWhatIs")}
            text={t("stInahText")}
          />
        </div>

        <div
          data-reveal
          className="mt-10 rounded-2xl border border-teal/25 bg-navy-950/50 p-7 lg:p-9"
        >
          <p className="eyebrow mb-4">{t("stSummaryTitle")}</p>
          <ul className="flex flex-col gap-3">
            {summary.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-2 w-2 shrink-0 rounded-sm bg-teal"
                />
                <span className="text-fs-300 leading-relaxed text-white/80">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/servicios-y-tecnologia" variant="primary" size="md">
              {t("stCtaServices")}
            </LinkButton>
            <LinkButton href="/transferencia-tecnologica" variant="outline" size="md">
              {t("stCtaTransfer")}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramCard({
  name,
  full,
  whatIs,
  text,
}: {
  name: string;
  full: string;
  whatIs: string;
  text: string;
}) {
  return (
    <article
      data-reveal
      data-reveal-delay="1"
      className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-navy-950/40 p-7 backdrop-blur-sm lg:p-9"
    >
      <div>
        <span className="text-fs-800 font-extrabold leading-none text-teal">
          {name}
        </span>
        <p className="mt-2 text-fs-300 font-semibold text-white/90">{full}</p>
      </div>
      <p className="eyebrow">{whatIs}</p>
      <p className="text-fs-300 leading-relaxed text-white/75">{text}</p>
    </article>
  );
}
