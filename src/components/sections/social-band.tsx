import { getTranslations } from "next-intl/server";
import { SocialLinks } from "@/components/ui/social-links";

/**
 * Cierre del home: canales oficiales del centro (redes sociales y WikINCAR).
 */
export async function SocialBand() {
  const t = await getTranslations("Home");

  return (
    <section className="border-t border-white/10 bg-navy px-5 py-14 lg:px-10 lg:py-16">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center">
        <div data-reveal>
          <p className="eyebrow mb-3">{t("socialEyebrow")}</p>
          <h2 className="text-fs-600 font-extrabold text-white sm:text-fs-700">
            {t("socialTitle")}
          </h2>
          <p className="mt-4 max-w-xl text-fs-300 leading-relaxed text-white/70">
            {t("socialText")}
          </p>
        </div>
        <SocialLinks variant="band" className="mt-2" />
      </div>
    </section>
  );
}
