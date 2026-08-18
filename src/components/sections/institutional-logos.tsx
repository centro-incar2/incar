import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  associatedInstitutions,
  sponsoringInstitutions,
  type Institution,
} from "@/content/institutions";

/**
 * Franja de cierre del Home: institución patrocinante e instituciones asociadas,
 * cada grupo con su propio rótulo. ANID no aparece aquí porque su lockup oficial
 * ya está en el header y en el footer de todas las páginas.
 */
export async function InstitutionalLogos() {
  const t = await getTranslations("Home");

  return (
    <section className="border-t border-white/10 bg-navy-950 px-5 py-14 lg:px-10 lg:py-16">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
        <LogoGroup title={t("sponsorTitle")} institutions={sponsoringInstitutions} />
        <LogoGroup title={t("associatedTitle")} institutions={associatedInstitutions} />
      </div>
    </section>
  );
}

function LogoGroup({
  title,
  institutions,
}: {
  title: string;
  institutions: Institution[];
}) {
  return (
    <div className="flex flex-col items-center gap-7">
      <h2 className="eyebrow text-center text-white/55">{title}</h2>
      <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 sm:gap-x-16 lg:gap-x-20">
        {institutions.map((institution) => (
          <li key={institution.name} data-reveal>
            <a
              href={institution.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded opacity-80 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100"
            >
              <Image
                src={institution.logo}
                alt={institution.name}
                width={institution.width}
                height={institution.height}
                className={institution.heightClass}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
