/**
 * Diagnóstico de la base de datos configurada: cuenta documentos, muestra el
 * origen real de las imágenes y lista los usuarios del panel con su rol.
 *
 * Sirve para confirmar el estado de un entorno sin abrir el panel. Es de solo
 * lectura. Ejecutar apuntando al entorno que se quiera inspeccionar:
 *   npm run check-db                                   (local, usa .env.local)
 *   node --import ./scripts/payload-loader.mjs --env-file=<archivo> scripts/check-db.ts
 */
import { getPayload } from "payload";
import config from "@payload-config";

const check = async () => {
  const payload = await getPayload({ config });

  const [publications, news, media, users] = await Promise.all([
    payload.count({ collection: "publications" }),
    payload.count({ collection: "news" }),
    payload.count({ collection: "media" }),
    payload.find({ collection: "users", limit: 50 }),
  ]);

  console.log("Publicaciones:", publications.totalDocs);
  console.log("Noticias:     ", news.totalDocs);
  console.log("Imágenes:     ", media.totalDocs);

  const sample = await payload.find({ collection: "media", limit: 3 });
  console.log("\nOrigen de las imágenes:");
  for (const item of sample.docs) {
    const url = typeof item.url === "string" ? item.url : "(sin url)";
    const remote = url.startsWith("http");
    console.log(`  ${remote ? "nube" : "disco"} → ${url.slice(0, 95)}`);
  }

  console.log("\nUsuarios del panel:");
  if (users.docs.length === 0) console.log("  (ninguno — hay que crear el administrador)");
  for (const user of users.docs) console.log(`  ${user.email} → ${user.role}`);

  process.exit(0);
};

check().catch((error) => {
  console.error("No se pudo consultar la base:", error);
  process.exit(1);
});
