import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // Los archivos que sirve el CMS (policy briefs, imágenes) SÍ deben
      // indexarse: se listan aparte porque el buscador aplica la regla más
      // específica, y un `Disallow: /api/` a secas sacaría de Google los 28
      // PDF de Políticas Públicas.
      allow: ["/", "/api/media/file/", "/api/document-files/file/"],
      // El panel y la API REST/GraphQL no aportan nada al índice.
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
