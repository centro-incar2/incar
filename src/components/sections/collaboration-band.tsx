import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LinkButton } from "@/components/ui/button";

/**
 * Sección "Ciencia sin Fronteras" del Home: título (izq) y una única tarjeta de
 * colaboración (der). Lo nacional y lo internacional se presentan juntos porque
 * en el sitio son una sola sección.
 */
export async function CollaborationBand() {
  const t = await getTranslations("Home");
  const tc = await getTranslations("Common");

  return (
    <section className="relative overflow-hidden bg-steel px-5 py-20 lg:px-10 lg:py-28">
      <Image
        src="/images/home/colaboracion.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 to-navy-900/55" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-reveal data-reveal-x="left">
          <p className="eyebrow mb-5">{t("collaborationEyebrow")}</p>
          <h2 className="text-fs-700 font-extrabold leading-tight text-white sm:text-fs-800">
            {t("collaborationTitle")}
          </h2>
        </div>

        <article
          data-reveal
          data-reveal-x="right"
          className="flex flex-col gap-5 rounded-2xl border border-white/15 bg-navy-900/60 p-7 backdrop-blur-sm lg:p-9"
        >
          <span className="w-fit rounded-full bg-teal/20 px-4 py-1.5 text-fs-100 font-bold uppercase tracking-wider text-teal">
            {t("collabLabel")}
          </span>
          <p className="text-fs-400 font-medium leading-snug text-white">
            {t("collabText")}
          </p>
          <div>
            <LinkButton href="/colaboraciones" variant="primary" size="md">
              {tc("readMore")}
            </LinkButton>
          </div>
        </article>
      </div>
    </section>
  );
}
