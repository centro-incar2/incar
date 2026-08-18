import Script from "next/script";

import { GA_MEASUREMENT_ID, isAnalyticsEnabled } from "@/lib/analytics";

/**
 * Etiqueta de Google Analytics 4.
 *
 * Se carga con `afterInteractive` para no competir con el LCP: el script sale
 * después de la hidratación, no bloquea el render inicial.
 *
 * No se envían vistas de página manuales en cada cambio de ruta. La medición
 * optimizada de GA4 ("cambios de página basados en eventos del historial del
 * navegador", activa por defecto) ya cubre la navegación cliente de Next; un
 * `page_view` propio duplicaría cada visita.
 *
 * Solo se monta en el layout público: el panel `/admin` vive en el route group
 * `(payload)`, con su propio layout, y queda fuera de la medición.
 */
export function GoogleAnalytics() {
  if (!isAnalyticsEnabled()) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
