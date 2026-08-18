/**
 * Corrige el aviso bajo el formulario de contacto en la base de datos.
 *
 * El valor del panel manda sobre el archivo de mensajes, y el texto sembrado
 * decía que el envío «aún no está habilitado». Al habilitarlo, ese aviso queda
 * desactualizado en la base aunque el archivo ya esté corregido.
 *
 * Solo toca ese campo: no reescribe el resto del global, para no pisar los
 * textos que INCAR² haya editado desde el panel.
 */
import { getCms } from "@/lib/cms/payload";
import esMessages from "@/messages/es.json" with { type: "json" };
import enMessages from "@/messages/en.json" with { type: "json" };

const NUEVO = {
  es: esMessages.Contact.formNotice,
  en: enMessages.Contact.formNotice,
} as const;

const cms = await getCms();

for (const locale of ["es", "en"] as const) {
  const antes = await cms.findGlobal({ slug: "contact", locale, overrideAccess: true });
  await cms.updateGlobal({
    slug: "contact",
    locale,
    overrideAccess: true,
    data: { formNotice: NUEVO[locale] },
  });
  const despues = await cms.findGlobal({ slug: "contact", locale, overrideAccess: true });
  console.log(`[${locale}] antes:  ${String(antes.formNotice ?? "(vacío)").slice(0, 70)}`);
  console.log(`[${locale}] ahora:  ${String(despues.formNotice ?? "(vacío)").slice(0, 70)}`);
}

process.exit(0);
