import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withPayload } from "@payloadcms/next/withPayload";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Fija la raíz del proyecto (hay otros lockfiles en el sistema del usuario).
  turbopack: { root: import.meta.dirname },
  images: {
    // El optimizador de Vercel queda DESACTIVADO en todo el sitio.
    //
    // Tiene una cuota mensual y la configuracion por defecto de Next la agota
    // sola: genera 15 anchos por imagen en 2 formatos, o sea hasta 570
    // transformaciones en una pagina como Gobernanza. En agosto de 2026 se
    // acabo, `/_next/image` empezo a devolver 402 y el sitio quedo con las
    // fotos rotas aunque los archivos estaban intactos.
    //
    // Servirlas sin optimizar sale barato porque ya vienen optimizadas: las
    // estaticas pesan 41 KB de media y la pagina mas cargada suma 1,1 MB, y las
    // del panel las convierte Payload a WebP al subirlas. A cambio, el sitio
    // deja de depender de una cuota que no controlamos.
    //
    // Si algun dia se pasa a un plan de pago, basta con quitar esta linea.
    unoptimized: true,
    remotePatterns: [
      // Imágenes migradas temporalmente desde el sitio WordPress original.
      // En Fase 3 se reemplazan por assets locales gestionados en el panel.
      {
        protocol: "https",
        hostname: "lake-9070.banahosting.com",
        pathname: "/~hixovric/wp-content/uploads/**",
      },
      // Imágenes subidas desde el panel: en producción las sirve Vercel Blob,
      // que entrega cada archivo en un subdominio propio del store.
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    // El dominio con www servía una copia completa del sitio (200, no 301).
    // Se resuelve en código y no en el panel de Vercel para que la regla viaje
    // con el repositorio cuando el proyecto se traspase a INCAR².
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.incar2.cl" }],
        destination: "https://incar2.cl/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    // Cabeceras de seguridad (CLAUDE.md §4/§8). La CSP definitiva se afina en Fase 3
    // cuando se integre Payload (necesita nonce para el panel admin).
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

// `withPayload` habilita el panel/API de Payload dentro de la app Next (route group
// `(payload)`). Se compone con el plugin de next-intl para conservar el i18n del sitio.
export default withPayload(withNextIntl(nextConfig));
