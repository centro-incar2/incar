"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Cambia el idioma manteniendo la ruta actual (usa pathnames localizados).
 * Preserva los params dinámicos para rutas con segmentos variables.
 */
export function LanguageSwitcher({ tone = "light" }: { tone?: "light" | "dark" }) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      // @ts-expect-error -- params dinámicos se propagan tal cual a la ruta destino.
      router.replace({ pathname, params }, { locale: next });
    });
  }

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border p-0.5"
      role="group"
      aria-label={t("label")}
      style={{
        borderColor: tone === "light" ? "rgba(255,255,255,0.3)" : "var(--color-border, #e2e8f0)",
      }}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            disabled={isPending}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 text-fs-100 font-bold uppercase transition-colors",
              active
                ? "bg-teal text-white"
                : tone === "light"
                  ? "text-white/80 hover:text-white"
                  : "text-navy-700 hover:text-teal",
            )}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
