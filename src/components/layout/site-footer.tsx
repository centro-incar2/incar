import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { mainNavigation } from "@/content/navigation";
import { SocialLinks } from "@/components/ui/social-links";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const tContact = await getTranslations("Contact");
  const footerLinks = mainNavigation.filter((item) => item.href).slice(0, 8);

  return (
    <footer className="bg-gradient-to-b from-navy-700 to-navy text-white/70">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {/* Marca — el logo va al final de la columna para que quede a la misma
            altura que el lockup MinCiencia·ANID de la columna Contacto. */}
        <div className="flex flex-col">
          <div className="mt-8 flex h-20 items-center lg:mt-auto lg:pt-8">
            <Image
              src="/images/logos/incar2-blanco.png"
              alt="INCAR²"
              width={900}
              height={360}
              className="h-14 w-auto"
            />
          </div>
        </div>

        {/* MENÚ */}
        <nav aria-label={t("menuTitle")}>
          <h2 className="eyebrow mb-5 text-white/60">{t("menuTitle")}</h2>
          <ul className="flex flex-col gap-2.5">
            {footerLinks.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href ?? "/"}
                  className="text-fs-200 text-white/70 transition-colors hover:text-teal"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* SÍGUENOS */}
        <div>
          <h2 className="eyebrow mb-4 text-white/60">{t("socialTitle")}</h2>
          <SocialLinks variant="compact" />
        </div>

        {/* CONTACTO */}
        <div className="flex flex-col">
          <h2 className="eyebrow mb-5 text-white/60">{t("contactTitle")}</h2>
          <ul className="flex flex-col gap-2.5">
            <li>
              <a
                href={`mailto:${tContact("email")}`}
                className="text-fs-200 text-white/70 transition-colors hover:text-teal [overflow-wrap:anywhere]"
              >
                {tContact("email")}
              </a>
            </li>
            <li>
              <Link
                href="/contacto"
                className="text-fs-200 font-semibold text-teal transition-colors hover:text-white"
              >
                {t("contactCta")} →
              </Link>
            </li>
          </ul>
          <div className="mt-8 flex h-20 items-center lg:mt-auto lg:pt-8">
            <Image
              src="/images/logos/minciencia-anid.png"
              alt="Ministerio de Ciencia, Tecnología, Conocimiento e Innovación · ANID — Agencia Nacional de Investigación y Desarrollo"
              width={800}
              height={432}
              className="h-20 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Declaración institucional (texto oficial exigido por INCAR², a ancho completo) */}
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[1100px] px-5 py-8 text-center text-fs-200 leading-relaxed text-white/65 sm:px-8 lg:px-10">
          {t("aboutText")}
        </p>
      </div>

      {/* El acceso al panel NO se enlaza desde el sitio: se entra escribiendo
          la URL /admin, igual que /wp-admin en WordPress (decisión del cliente). */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-5 py-6 text-center text-fs-100 text-white/45 sm:px-8 lg:px-10">
          {t("credit")}
        </div>
      </div>
    </footer>
  );
}
