import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import {
  getNewsDetail,
  getNewsSlugs,
  getRelatedNews,
} from "@/lib/cms/news";
import { NewsCard } from "@/components/news/news-card";
import { ShareButtons } from "@/components/publications/share-buttons";
import { ExternalLinkButton } from "@/components/ui/button";
import { RichContent } from "@/components/ui/rich-text";
import { CmsImage } from "@/components/ui/cms-image";

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getNewsDetail(slug);
  if (!article) return {};
  return buildMetadata({
    locale,
    pathname: "/noticias/[slug]",
    params: { slug },
    title: article.title[locale],
    description: article.excerpt[locale].slice(0, 155),
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = await getNewsDetail(slug);
  if (!article || !article.content) notFound();

  const t = await getTranslations("News");
  const related = await getRelatedNews(article);
  const formattedDate = new Intl.DateTimeFormat(
    locale === "es" ? "es-CL" : "en-US",
    { day: "numeric", month: "long", year: "numeric" },
  ).format(new Date(article.date));

  return (
    <>
      <article className="bg-navy pt-28 lg:pt-36">
        <div className="mx-auto max-w-3xl px-5">
          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 text-fs-100 font-semibold text-teal transition-all hover:gap-3"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t("backToList")}
          </Link>

          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {article.title[locale]}
          </h1>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-white/10 py-4 text-fs-100 text-white/60">
            <time dateTime={article.date} className="flex items-center gap-2">
              <CalendarIcon /> {formattedDate}
            </time>
          </div>
        </div>

        {/* Imagen destacada (a sangre completa) */}
        <figure className="relative mx-auto mt-10 aspect-[21/9] w-full max-w-5xl overflow-hidden bg-navy-900 lg:rounded-2xl">
          <CmsImage
            src={article.image}
            alt={article.imageAlt[locale]}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </figure>

        {/* Contenido verbatim */}
        <div className="mx-auto max-w-3xl px-5 py-12">
          <RichContent data={article.content[locale]} />

          <div className="mt-8">
            <ExternalLinkButton
              href={article.sourceUrl}
              target="_blank"
              variant="outline"
              size="md"
            >
              {t("sourceLink")}
            </ExternalLinkButton>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <ShareButtons title={article.title[locale]} />
          </div>
        </div>
      </article>

      {/* Otras noticias */}
      {related.length > 0 ? (
        <section className="bg-navy-900 px-5 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-10 text-fs-600 font-extrabold text-white sm:text-fs-700">
              {t("relatedTitle")}
            </h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((rel) => (
                <li key={rel.slug}>
                  <NewsCard article={rel} locale={locale} readMoreLabel={t("readMore")} />
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
