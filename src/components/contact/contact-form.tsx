import { getTranslations } from "next-intl/server";

/** Campos del formulario, en el orden del documento oficial de contacto. */
const FIELDS = [
  { name: "nombre", labelKey: "fieldName", type: "text", autoComplete: "name" },
  { name: "email", labelKey: "fieldEmail", type: "email", autoComplete: "email" },
  { name: "telefono", labelKey: "fieldPhone", type: "tel", autoComplete: "tel" },
  { name: "ciudad", labelKey: "fieldCity", type: "text", autoComplete: "address-level2" },
  { name: "pais", labelKey: "fieldCountry", type: "text", autoComplete: "country-name" },
] as const;

const INPUT_CLASS =
  "w-full rounded-lg border border-white/15 bg-navy-950/60 px-4 py-3 text-fs-300 text-white placeholder:text-white/35 transition-colors hover:border-white/25 focus:border-teal focus:outline-none";

/**
 * Formulario de contacto — presentación.
 *
 * El envío todavía no está habilitado (falta definir con INCAR² el destino de
 * los mensajes), así que el botón permanece deshabilitado y el aviso ofrece el
 * correo institucional como vía alternativa. Los campos quedan operativos para
 * que el formulario se vea y se pueda recorrer con teclado.
 */
export async function ContactForm() {
  const t = await getTranslations("Contact");

  return (
    <form
      className="flex flex-col gap-5"
      aria-describedby="contact-form-notice"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
            <label
              htmlFor={`contact-${field.name}`}
              className="text-fs-200 font-semibold text-white/85"
            >
              {t(field.labelKey)}
            </label>
            <input
              id={`contact-${field.name}`}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              className={INPUT_CLASS}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-mensaje"
          className="text-fs-200 font-semibold text-white/85"
        >
          {t("fieldMessage")}
        </label>
        <textarea
          id="contact-mensaje"
          name="mensaje"
          rows={6}
          className={`${INPUT_CLASS} resize-y`}
        />
      </div>

      <p
        id="contact-form-notice"
        className="rounded-lg border border-peach/30 bg-peach/10 px-4 py-3 text-fs-200 leading-relaxed text-white/80"
      >
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
          disabled
          className="rounded-lg bg-teal px-7 py-3.5 text-fs-200 font-bold uppercase tracking-wide text-white opacity-50"
        >
          {t("submit")}
        </button>
      </div>
    </form>
  );
}
