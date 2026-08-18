"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { CmsPublication } from "@/lib/cms/publications";
import type { ResearchLine } from "@/content/research-lines";
import { PublicationCard } from "./publication-card";

export function PublicationsExplorer({
  publications,
  lines,
  years,
}: {
  publications: CmsPublication[];
  lines: ResearchLine[];
  years: number[];
}) {
  const t = useTranslations("Publications");
  const locale = useLocale() as Locale;

  const [query, setQuery] = useState("");
  const [line, setLine] = useState<string>("all");
  const [year, setYear] = useState<string>("all");

  const lineTitle = useMemo(() => {
    const map = new Map<string, string>();
    for (const l of lines) map.set(l.slug, l.title[locale]);
    return map;
  }, [lines, locale]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications
      .filter((p) => {
        if (line !== "all" && p.line !== line) return false;
        if (year !== "all" && String(p.year) !== year) return false;
        if (q) {
          const haystack = [
            p.title,
            p.authors,
            p.journal,
            p.summary?.[locale] ?? "",
            lineTitle.get(p.line) ?? "",
          ]
            .join(" ")
            .toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [publications, query, line, year, locale, lineTitle]);

  const hasActiveFilters = query !== "" || line !== "all" || year !== "all";
  const resetFilters = () => {
    setQuery("");
    setLine("all");
    setYear("all");
  };

  return (
    <>
      {/* Buscador (título, autor, palabra clave) */}
      <div className="mx-auto -mt-16 max-w-4xl rounded-2xl border border-white/10 bg-navy-800/80 p-5 shadow-2xl backdrop-blur-md sm:p-6">
        <div className="relative">
          <SearchIcon />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchPlaceholder")}
            className="w-full rounded-xl border border-white/15 bg-navy-900/70 py-3.5 pl-12 pr-4 text-fs-200 text-white placeholder:text-white/40 focus:border-teal focus:outline-none"
          />
        </div>
      </div>

      {/* Barra de resultados: conteo + selectores (Línea de Investigación, Año) */}
      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-fs-300 font-semibold text-white">
          {t("count", { count: filtered.length })}
        </p>
        <div className="flex flex-wrap gap-3">
          <SelectField
            value={line}
            onChange={setLine}
            options={[
              { value: "all", label: t("filterByLine") },
              // Nombre completo de la línea (no la etiqueta corta): es el que
              // se muestra en las tarjetas y por el que se busca.
              ...lines.map((l) => ({ value: l.slug, label: l.title[locale] })),
            ]}
          />
          <SelectField
            value={year}
            onChange={setYear}
            options={[
              { value: "all", label: t("filterByYear") },
              ...years.map((y) => ({ value: String(y), label: String(y) })),
            ]}
          />
        </div>
      </div>

      {/* Rejilla de tarjetas */}
      {filtered.length > 0 ? (
        <ul className="mx-auto mt-8 grid max-w-6xl gap-6 md:grid-cols-2">
          {filtered.map((pub) => (
            <li key={pub.slug}>
              <PublicationCard
                pub={pub}
                locale={locale}
                readMoreLabel={t("readMore")}
                externalLabel={t("viewPublication")}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mx-auto mt-12 max-w-md rounded-2xl border border-white/10 bg-navy-800/60 p-10 text-center">
          <h2 className="text-fs-400 font-bold text-white">
            {t("noResultsTitle")}
          </h2>
          <p className="mt-2 text-fs-200 text-white/60">{t("noResultsText")}</p>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-full bg-teal px-5 py-2.5 text-fs-200 font-semibold text-white transition-colors hover:bg-teal-600"
            >
              {t("clearFilters")}
            </button>
          ) : null}
        </div>
      )}
    </>
  );
}

function SelectField({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={options[0]?.label}
        className="max-w-[22rem] appearance-none truncate rounded-lg border border-white/15 bg-navy-800/80 py-2.5 pl-4 pr-10 text-fs-200 text-white/85 focus:border-teal focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-navy-900 text-white">
            {o.label}
          </option>
        ))}
      </select>
      <svg className="pointer-events-none absolute right-3 h-4 w-4 text-white/50" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
