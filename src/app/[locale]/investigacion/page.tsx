import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale, StaticPathname } from "@/i18n/routing";
import { PageHeader } from "@/components/ui/page-header";
import { researchLines } from "@/content/research-lines";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const accentBar: Record<string, string> = {
  teal: "bg-teal",
  navy: "bg-sky-400",
  peach: "bg-peach",
  slate: "bg-slate-muted",
};
const accentText: Record<string, string> = {
  teal: "text-teal",
  navy: "text-sky-400",
  peach: "text-peach",
  slate: "text-slate-muted",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ResearchIndex" });
  return buildMetadata({
    locale,
    pathname: "/investigacion",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function ResearchIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ResearchIndex");
  const activeLocale = (await getLocale()) as Locale;

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <section className="bg-navy px-5 pb-24 lg:px-10">
        <ul className="mx-auto grid max-w-[1200px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {researchLines.map((line) => (
            <li key={line.slug}>
              <Link
                href={line.href as StaticPathname}
                data-reveal
                data-reveal-delay={((line.number - 1) % 4) + 1}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-800/60 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[var(--shadow-card-hover)]"
              >
                <span className={cn("block h-1.5 w-full", accentBar[line.accent])} aria-hidden="true" />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <span className={cn("text-fs-800 font-extrabold leading-none tabular-nums", accentText[line.accent])}>
                    {String(line.number).padStart(2, "0")}
                  </span>
                  <h2 className="text-fs-400 font-bold leading-snug text-white">
                    {line.title[activeLocale]}
                  </h2>
                  <p className="text-fs-100 leading-relaxed text-white/60">
                    {line.summary[activeLocale]}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-fs-100 font-semibold text-teal transition-all group-hover:gap-2.5">
                    RL{line.number}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h9m0 0L8 4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
