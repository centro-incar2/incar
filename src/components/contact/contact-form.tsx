"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { enviarMensajeContacto } from "@/app/actions/contact";
import { initialContactState } from "@/app/actions/contact-state";

/** Campos del formulario, en el orden del documento oficial de contacto. */
const FIELDS = [
  { name: "name", labelKey: "fieldName", type: "text", autoComplete: "name", required: true },
  { name: "email", labelKey: "fieldEmail", type: "email", autoComplete: "email", required: true },
  { name: "phone", labelKey: "fieldPhone", type: "tel", autoComplete: "tel", required: false },
  { name: "city", labelKey: "fieldCity", type: "text", autoComplete: "address-level2", required: false },
  { name: "country", labelKey: "fieldCountry", type: "text", autoComplete: "country-name", required: false },
] as const;

const INPUT_CLASS =
  "w-full rounded-lg border border-white/15 bg-navy-950/60 px-4 py-3 text-fs-300 text-white placeholder:text-white/35 transition-colors hover:border-white/25 focus:border-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal aria-[invalid=true]:border-danger";

/**
 * Formulario de contacto.
 *
 * El envío va a una acción de servidor que guarda el mensaje en el buzón del
 * panel (colección «Mensajes de contacto»). La validación se repite en el
 * servidor: la de aquí solo evita viajes innecesarios.
 */
export function ContactForm() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const [state, formAction, isPending] = useActionState(
    enviarMensajeContacto,
    initialContactState,
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-teal/40 bg-teal/10 px-5 py-6 text-fs-300 leading-relaxed text-white"
      >
        <p className="font-semibold">{t("successTitle")}</p>
        <p className="mt-2 text-white/80">{t("successText")}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <input type="hidden" name="locale" value={locale} />

      {/* Trampa para bots: fuera de la vista y del recorrido por teclado. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website">No completar</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => {
          const error = state.errors?.[field.name as "name" | "email"];
          return (
            <div key={field.name} className="flex flex-col gap-2">
              <label
                htmlFor={`contact-${field.name}`}
                className="text-fs-200 font-semibold text-white/85"
              >
                {t(field.labelKey)}
                {field.required ? (
                  <span className="text-peach"> *</span>
                ) : (
                  <span className="font-normal text-white/50"> {t("optional")}</span>
                )}
              </label>
              <input
                id={`contact-${field.name}`}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                required={field.required}
                defaultValue={state.values?.[field.name] ?? ""}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `contact-${field.name}-error` : undefined}
                className={INPUT_CLASS}
              />
              {error && (
                <p
                  id={`contact-${field.name}-error`}
                  role="alert"
                  className="text-fs-200 text-danger"
                >
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-fs-200 font-semibold text-white/85"
        >
          {t("fieldMessage")}
          <span className="text-peach"> *</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          defaultValue={state.values?.message ?? ""}
          aria-invalid={state.errors?.message ? true : undefined}
          aria-describedby={
            state.errors?.message ? "contact-message-error" : undefined
          }
          className={`${INPUT_CLASS} resize-y`}
        />
        {state.errors?.message && (
          <p id="contact-message-error" role="alert" className="text-fs-200 text-danger">
            {state.errors.message}
          </p>
        )}
      </div>

      {state.errors?.form && (
        <p
          role="alert"
          className="rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-fs-200 leading-relaxed text-white"
        >
          {state.errors.form}
        </p>
      )}

      <p className="text-fs-200 leading-relaxed text-white/70">
        {t("formNotice")}{" "}
        <a
          href={`mailto:${t("email")}`}
          className="font-semibold text-peach underline underline-offset-2 hover:text-white"
        >
          {t("email")}
        </a>
      </p>

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-teal px-7 py-3.5 text-fs-200 font-bold uppercase tracking-wide text-white transition-colors hover:bg-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:cursor-progress disabled:opacity-60"
        >
          {isPending ? t("sending") : t("submit")}
        </button>
      </div>
    </form>
  );
}
