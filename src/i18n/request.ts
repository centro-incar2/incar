import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { getManagedMessages } from "@/lib/cms/pages";

/**
 * Carga los mensajes (traducciones) para el idioma de la request.
 * Se ejecuta en cada render de servidor dentro de `[locale]`.
 *
 * Los archivos `src/messages/*.json` son la BASE, y encima se fusionan los
 * textos que el equipo de INCAR² edita en el panel. Se fusiona por namespace y
 * solo con los valores que tienen contenido, de modo que un campo vacío en el
 * panel conserva el texto del archivo en vez de dejar la página en blanco.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const base = (await import(`../messages/${locale}.json`)).default as Record<
    string,
    Record<string, unknown>
  >;
  const managed = await getManagedMessages(locale);

  const messages = { ...base };
  for (const [namespace, values] of Object.entries(managed)) {
    messages[namespace] = { ...base[namespace], ...values };
  }

  return { locale, messages };
});
