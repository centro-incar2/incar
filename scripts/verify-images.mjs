/**
 * Comprueba que ninguna imagen subida por el panel pase por el optimizador de
 * Next, y que todas las imágenes del sitio respondan.
 *
 * Por qué existe: el optimizador de Vercel tiene cuota mensual. Las imágenes
 * estáticas se optimizan una vez y quedan cacheadas, pero las del panel se
 * suben después del build y se optimizan a demanda, así que crecen sin techo
 * con cada contenido que carga INCAR². En agosto de 2026 esa cuota se agotó,
 * `/_next/image` empezó a devolver 402 y desaparecieron las fotos de las
 * noticias y del equipo aunque los archivos estaban intactos.
 *
 * El arreglo fue servir las imágenes del panel sin optimizar (ver `CmsImage`).
 * Este script vigila que nadie lo deshaga sin darse cuenta.
 *
 * Uso:
 *   node scripts/verify-images.mjs                    # contra producción
 *   BASE=http://localhost:3100 node scripts/verify-images.mjs
 */
const BASE = process.env.BASE || "https://incar2.cl";

const PAGINAS = [
  "/", "/noticias", "/quienes-somos", "/gobernanza", "/investigacion",
  "/equipo-de-gestion", "/publicaciones", "/colaboraciones", "/eventos",
  "/politicas-publicas", "/contacto", "/investigacion/nuevas-vacunas-para-peces",
  "/en", "/en/news",
];

/** Marca de un archivo administrado por el panel dentro de una URL. */
const esDelPanel = (url) =>
  /api%2Fmedia|api\/media|api%2Fdocument-files|api\/document-files|public\.blob\.vercel-storage\.com/.test(url);

const run = async () => {
  const optimizadasDelPanel = [];
  const rotas = [];
  let totalImagenes = 0;

  for (const pagina of PAGINAS) {
    let html;
    try {
      const res = await fetch(BASE + pagina);
      if (!res.ok) { rotas.push(`${pagina} → la página respondió ${res.status}`); continue; }
      html = await res.text();
    } catch (error) {
      rotas.push(`${pagina} → no se pudo cargar: ${error.message}`);
      continue;
    }

    // 1. Imágenes del panel que van por el optimizador: es la regresión a evitar.
    for (const m of html.matchAll(/\/_next\/image\?url=([^"'&]+)/g)) {
      if (esDelPanel(m[1])) optimizadasDelPanel.push(`${pagina} → ${decodeURIComponent(m[1])}`);
    }

    // 2. Que las imágenes del panel respondan de verdad.
    const urls = new Set([...html.matchAll(/src="((?:\/api\/(?:media|document-files)|https:\/\/[^"]*blob\.vercel-storage\.com)[^"]+)"/g)].map((m) => m[1]));
    for (const url of urls) {
      totalImagenes++;
      const absoluta = url.startsWith("http") ? url : BASE + url;
      try {
        // GET con Range, no HEAD: la ruta de archivos de Payload no implementa
        // HEAD y responde 404 aunque el archivo exista (falso negativo).
        const r = await fetch(absoluta, { headers: { Range: "bytes=0-0" }, redirect: "follow" });
        if (!r.ok) rotas.push(`${pagina} → ${r.status} ${url}`);
      } catch (error) {
        rotas.push(`${pagina} → error ${url}: ${error.message}`);
      }
    }
  }

  console.log(`Imágenes del panel comprobadas: ${totalImagenes}`);
  console.log(`Pasando por el optimizador    : ${optimizadasDelPanel.length}  (debe ser 0)`);
  console.log(`Que no responden              : ${rotas.length}`);

  if (optimizadasDelPanel.length) {
    console.log("\n✗ REGRESIÓN: hay imágenes del panel optimizadas por Next.");
    console.log("  Consumen la cuota de Vercel y volverán a romperse con un 402.");
    console.log("  Usa el componente CmsImage en vez de next/image.\n");
    for (const x of optimizadasDelPanel.slice(0, 15)) console.log("   " + x);
  }
  if (rotas.length) {
    console.log("\n✗ Imágenes que no cargan:\n");
    for (const x of rotas.slice(0, 20)) console.log("   " + x);
  }

  if (!optimizadasDelPanel.length && !rotas.length) {
    console.log("\n✓ Todo correcto: ninguna imagen del panel usa el optimizador y todas responden.");
    process.exit(0);
  }
  process.exit(1);
};

run().catch((error) => {
  console.error("Falló la verificación:", error);
  process.exit(1);
});
