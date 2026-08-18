import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { offices } from "@/content/offices";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return buildMetadata({
    locale,
    pathname: "/contacto",
    title: t("title"),
    description: t("lead").slice(0, 155),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      {/* Formulario + correo institucional */}
      <section className="bg-navy px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div data-reveal>
            <h2 className="mb-8 text-fs-600 font-extrabold text-white sm:text-fs-700">
              {t("formTitle")}
            </h2>
            <ContactForm />
          </div>

          <aside
            data-reveal
            data-reveal-delay="1"
            className="h-fit rounded-2xl border border-teal/25 bg-navy-950/50 p-7 lg:p-8"
          >
            <h2 className="eyebrow mb-4">{t("emailTitle")}</h2>
            <a
              href={`mailto:${t("email")}`}
              className="text-fs-400 font-semibold text-teal underline-offset-4 transition-colors hover:text-white hover:underline [overflow-wrap:anywhere]"
            >
              {t("email")}
            </a>
          </aside>
        </div>
      </section>

      {/* ¿Dónde estamos? — reparticiones y laboratorios a lo largo de Chile */}
      <section className="bg-navy-800 px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <h2
            data-reveal
            className="mb-10 text-fs-700 font-extrabold text-white sm:text-fs-800"
          >
            {t("officesTitle")}
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((office, index) => (
              <li
                key={office.city}
                data-reveal
                data-reveal-delay={(index % 3) + 1}
                className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-navy-950/40 p-7"
              >
                <h3 className="text-fs-400 font-bold text-teal">{office.city}</h3>
                <address className="flex flex-col gap-1 not-italic text-fs-200 leading-relaxed text-white/75">
                  {office.address.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
                {office.phone ? (
                  <p className="text-fs-200 text-white/75">
                    <span className="font-semibold text-white/85">
                      {t("phoneLabel")}:
                    </span>{" "}
                    <a
                      href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
                      className="transition-colors hover:text-teal"
                    >
                      {office.phone}
                    </a>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
