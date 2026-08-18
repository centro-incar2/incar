import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import {
  getPublicationDetail,
  getPublicationDetailSlugs,
  getRelatedPublications,
} from "@/lib/cms/publications";
import { getResearchLine } from "@/content/research-lines";
import { lineAccentStyles } from "@/lib/accent";
import { PublicationCard } from "@/components/publications/publication-card";
import { ShareButtons } from "@/components/publications/share-buttons";
import { ExternalLinkButton } from "@/components/ui/button";
import { LineIcon } from "@/components/ui/line-icon";
import { RichContent } from "@/components/ui/rich-text";

export async function generateStaticParams() {
  // Solo las publicaciones con contenido enriquecido tienen página de detalle.
  const slugs = await getPublicationDetailSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const pub = await getPublicationDetail(slug);
  if (!pub) return {};
  return buildMetadata({
    locale,
    pathname: "/publicaciones/[slug]",
    params: { slug },
    title: pub.title,
    description: (pub.summary?.[locale] ?? pub.journal).slice(0, 155),
  });
}

export default async function PublicationDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const pub = await getPublicationDetail(slug);
  // Sin contenido enriquecido no hay detalle interno (la tarjeta enlaza al DOI).
  if (!pub || !pub.content || !pub.summary) notFound();

  const t = await getTranslations("Publications");
  const line = getResearchLine(pub.line);
  const accent = lineAccentStyles[line?.accent ?? "teal"];
  const related = await getRelatedPublications(pub);
  const formattedDate = new Intl.DateTimeFormat(
    locale === "es" ? "es-CL" : "en-US",
    { day: "numeric", month: "long", year: "numeric" },
  ).format(new Date(pub.date));

  return (
    <>
      {/* Cabecera */}
      <article className="bg-navy pt-28 lg:pt-36">
        <div className="mx-auto max-w-3xl px-5">
          <Link
            href="/publicaciones"
            className="inline-flex items-center gap-2 text-fs-100 font-semibold text-teal transition-all hover:gap-3"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t("backToList")}
          </Link>

          {line ? (
            <div className="mt-6 flex items-center gap-3">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accent.pillBg} ${accent.pillText}`}
              >
                <LineIcon slug={line.slug} className="h-7 w-7" />
              </span>
              <span className={`text-fs-200 font-semibold leading-snug ${accent.pillText}`}>
                {line.title[locale]}
              </span>
            </div>
          ) : null}

          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {pub.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-white/10 py-4 text-fs-100 text-white/60">
            <span className="flex items-center gap-2">
              <CalendarIcon /> {formattedDate}
            </span>
            <span className="italic">{pub.journal}</span>
          </div>

          <p className="mt-4 text-fs-200 text-white/70">
            <span className="font-semibold text-white/80">{t("authorsLabel")}: </span>
            {pub.authors}
          </p>
        </div>

        {/* Contenido enriquecido */}
        <div className="mx-auto max-w-3xl px-5 py-12">
          <p className="text-fs-400 font-medium leading-relaxed text-white/90">
            {pub.summary[locale]}
          </p>
          <div className="mt-6">
            <RichContent data={pub.content[locale]} />
          </div>

          {pub.url ? (
            <div className="mt-8">
              <ExternalLinkButton
                href={pub.url}
                target="_blank"
                variant="outline"
                size="md"
              >
                {t("originalArticle")}
              </ExternalLinkButton>
            </div>
          ) : null}

          <div className="mt-10 border-t border-white/10 pt-6">
            <ShareButtons title={pub.title} />
          </div>
        </div>
      </article>

      {/* Relacionadas */}
      {related.length > 0 ? (
        <section className="bg-navy-900 px-5 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-10 text-fs-600 font-extrabold text-white sm:text-fs-700">
              {t("relatedTitle")}
            </h2>
            <ul className="grid gap-6 md:grid-cols-3">
              {related.map((rel) => (
                <li key={rel.slug}>
                  <PublicationCard
                    pub={rel}
                    locale={locale}
                    readMoreLabel={t("readMore")}
                    externalLabel={t("viewPublication")}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9h16M9 3v4M15 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
