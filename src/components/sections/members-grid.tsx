import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getMembersByLine } from "@/lib/cms/members";
import { PersonAvatar } from "@/components/ui/person-avatar";

/**
 * Sección "Integrantes" de una línea de investigación: grid de tarjetas con
 * avatar (iniciales), nombre y cargo, cada una enlazando a su perfil individual.
 * Reutiliza el estilo de tarjeta de la página de Gobernanza (visual aprobado).
 * No renderiza nada si la línea aún no tiene integrantes cargados.
 */
export async function MembersGrid({ lineSlug }: { lineSlug: string }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("Members");
  const members = await getMembersByLine(lineSlug);
  if (members.length === 0) return null;

  return (
    // Fondo navy para alternar con la sección "Enfoque" que viene a continuación.
    <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div data-reveal className="mb-12 text-center">
          <p className="eyebrow mb-4">{t("sectionEyebrow")}</p>
          <h2 className="text-fs-800 font-extrabold text-white">
            {t("sectionTitle")}
          </h2>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => {
            const photo = member.photo;
            return (
            <li key={member.slug} data-reveal data-reveal-delay={(i % 3) + 1}>
              <Link
                href={{
                  pathname: "/investigacion/equipo/[slug]",
                  params: { slug: member.slug },
                }}
                className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-white/10 bg-navy-950/50 p-6 text-center transition-colors hover:border-teal/50 focus-visible:border-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                <PersonAvatar photo={photo} name={member.name} />
                <h3 className="text-fs-300 font-bold leading-snug text-white">
                  {member.name}
                </h3>
                <span className="text-fs-100 leading-snug text-teal">
                  {member.role[locale]}
                </span>
                <span className="mt-2 text-fs-100 font-semibold uppercase tracking-[0.15em] text-white/50 transition-colors group-hover:text-white">
                  {t("viewProfile")} →
                </span>
              </Link>
            </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
