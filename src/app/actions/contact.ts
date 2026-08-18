"use server";

import { getTranslations } from "next-intl/server";
import { getCms } from "@/lib/cms/payload";
import { routing, type Locale } from "@/i18n/routing";
import type { ContactState } from "./contact-state";

const LIMITS = {
  name: 120,
  email: 200,
  phone: 60,
  city: 120,
  country: 120,
  message: 5000,
} as const;

const MESSAGE_MIN = 10;

/**
 * Umbral de envíos por minuto en toda la instalación. No es un control por IP
 * —no guardamos IPs— sino un freno para que un bot no inunde la base. Diez
 * mensajes en un minuto en un sitio institucional es tráfico anómalo.
 */
const MAX_PER_MINUTE = 10;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (value: FormDataEntryValue | null, max: number): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const resolveLocale = (value: FormDataEntryValue | null): Locale =>
  routing.locales.includes(value as Locale) ? (value as Locale) : routing.defaultLocale;

export async function enviarMensajeContacto(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const locale = resolveLocale(formData.get("locale"));
  const t = await getTranslations({ locale, namespace: "Contact" });

  const values = {
    name: clean(formData.get("name"), LIMITS.name),
    email: clean(formData.get("email"), LIMITS.email),
    phone: clean(formData.get("phone"), LIMITS.phone),
    city: clean(formData.get("city"), LIMITS.city),
    country: clean(formData.get("country"), LIMITS.country),
    message: clean(formData.get("message"), LIMITS.message),
  };

  // Trampa para bots: el campo va oculto y ninguna persona puede rellenarlo.
  // Se responde «éxito» a propósito para no enseñarle al bot que fue detectado.
  if (clean(formData.get("website"), 200) !== "") {
    return { status: "success" };
  }

  const errors: NonNullable<ContactState["errors"]> = {};
  if (!values.name) errors.name = t("errorRequired");
  if (!values.email) errors.email = t("errorRequired");
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = t("errorEmail");
  if (!values.message) errors.message = t("errorRequired");
  else if (values.message.length < MESSAGE_MIN) errors.message = t("errorMessageShort");

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  try {
    const cms = await getCms();

    const recientes = await cms.count({
      collection: "contact-messages",
      where: { createdAt: { greater_than: new Date(Date.now() - 60_000).toISOString() } },
      overrideAccess: true,
    });

    if (recientes.totalDocs >= MAX_PER_MINUTE) {
      return { status: "error", errors: { form: t("errorTooMany") }, values };
    }

    await cms.create({
      collection: "contact-messages",
      // La colección tiene `create` cerrado: el formulario es la única vía de
      // entrada y por eso escribe saltándose el control de acceso.
      overrideAccess: true,
      data: { ...values, locale, handled: false },
    });

    return { status: "success" };
  } catch (error) {
    console.error("[contacto] no se pudo guardar el mensaje", error);
    return { status: "error", errors: { form: t("errorServer") }, values };
  }
}
