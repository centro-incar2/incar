# CLAUDE.md — Sitio institucional INCAR²

Guía para cualquier instancia de Claude Code que trabaje en este repositorio.
Léela completa antes de modificar código.

Sitio en producción: **https://incar2.cl** · Panel: **https://incar2.cl/admin**

---

## 1. Qué es este proyecto

Sitio institucional del Centro Interdisciplinario para la Investigación
Acuícola (INCAR²), financiado por ANID. Migrado desde WordPress/Elementor a un
desarrollo propio. **Es una réplica fiel del sitio validado por el cliente, no
un rediseño**: los textos científicos son verbatim y el diseño oscuro está
aprobado. No resumas, no reescribas ni "mejores" contenido institucional.

## 2. Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Estilos | Tailwind CSS v4 (configuración en CSS) |
| Idiomas | next-intl v4 — español (sin prefijo) e inglés (`/en`) |
| CMS | Payload 3 embebido, en el route group `src/app/(payload)` |
| Base de datos | PostgreSQL — Neon en producción, `embedded-postgres` en local |
| Archivos subidos | Vercel Blob |
| Despliegue | Vercel |

## 3. Comandos

```bash
npm run db            # Postgres local aislado (terminal aparte, datos en .postgres-data/)
npm run dev           # sitio + panel en localhost:3000
npm run build         # build de producción (requiere la base levantada)
npm run typecheck     # tsc --noEmit
npm run payload:types # regenera src/payload-types.ts tras cambiar colecciones
npm run payload:importmap
npm run create-admin -- <email> <pass> "<nombre>"
```

## 4. Reglas del cliente (innegociables)

1. **"INCAR²" siempre con el 2 en superíndice.** Nunca "INCAR2".
2. **El logotipo de ANID nunca va solo**: la marca correcta es el conjunto
   MinCiencia + ANID.
3. **El panel no se enlaza desde el sitio.** El cliente quiere el
   comportamiento de WordPress: se entra escribiendo `/admin`. Ya se intentó
   agregar un enlace en el pie y fue rechazado; hay un comentario en
   `site-footer.tsx` explicando por qué no debe volver.
4. **En las líneas de investigación, los integrantes van justo debajo del
   hero**, no al final.
5. El pie de página lleva un texto institucional exacto (`Footer.aboutText`).

## 5. Cómo se organiza el contenido

Hay **tres fuentes** y conviene no confundirlas:

- `src/messages/{es,en}.json` — textos de la interfaz y de las páginas.
- **Globals de Payload** (`src/globals/`) — un global por página, con campos
  que se llaman **igual** que las claves del JSON. `src/i18n/request.ts` fusiona
  lo del panel **sobre** el archivo: si un campo del panel está vacío, cae al
  texto del archivo. Por eso las páginas no se tocan al hacerlas editables.
- **Colecciones** (`src/collections/`) — noticias, publicaciones, integrantes,
  equipo de gestión, documentos y contenido de las 8 líneas.

> Consecuencia práctica: **cambiar un texto en el JSON no basta si ese mismo
> valor ya está sembrado en la base de datos**, porque el panel manda. Hay que
> corregirlo también en el panel o con un script dirigido.

## 6. Trampas conocidas

Todas costaron tiempo real. No las redescubras.

1. **Tras tocar plugins, colecciones o componentes de Payload hay que correr
   `npm run payload:importmap`.** Si no, el panel se abre **completamente en
   blanco** y el servidor responde 200 igual — `curl` no lo detecta, hay que
   abrirlo con navegador.
2. **El CLI de Vercel sobrescribe `.env.local` sin avisar.** Una vez lo dejó
   apuntando a la base de producción. Revísalo después de cualquier comando
   `vercel`.
3. **`vercel env pull` devuelve vacías las variables sensibles.** Un valor
   vacío en el archivo descargado no significa que esté vacío en Vercel.
4. **Migraciones:** se corren contra la conexión sin pool
   (`DATABASE_URL_UNPOOLED`), con un archivo de entorno dedicado fuera del
   proyecto. El esquema remoto **solo** cambia por migraciones (`push` está
   restringido a la base local vía `isLocalDatabase()`).
5. **Node 24:** las migraciones que genera Payload traen tipos y valores en un
   mismo `import` y fallan. Separar en `import type` + `import { sql }`.
6. **Revalidación:** con rutas localizadas, la caché se indexa por la ruta
   **interna** (`/{locale}/noticias`). Revalidar la URL pública no invalida
   nada. Ver `src/hooks/revalidate.ts`.
7. **Un archivo `"use server"` solo puede exportar funciones asíncronas.** Por
   eso el estado del formulario de contacto vive en `contact-state.ts`.
8. **Auditar con navegador:** `loading="lazy"` hace que las imágenes parezcan
   rotas si se mide `naturalWidth` demasiado pronto — recorrer la página y
   esperar ~3 s. Para analítica, esperar ~5 s: gtag agrupa los envíos.
9. **Los PDF están almacenados con nombres corridos.** Al sembrarlos, un
   borrado en bloque dejó los archivos en Vercel Blob y Payload renombró cada
   subida al número libre siguiente: el Policy Brief 21 se sirve desde
   `policy-brief-22.pdf`. El contenido es correcto. El nombre de descarga se
   fuerza con el atributo `download` desde `src/lib/cms/documents.ts`, usando
   las fichas de `src/content/`. Funciona porque Payload sirve los PDF con
   `Content-Disposition: inline`; con `attachment` la cabecera ganaría al
   atributo. Si se añade un documento nuevo, agrégalo también a `src/content/`
   o se descargará con el nombre del almacenamiento
   (`npm run verify:download-names` lo detecta). Para dejar además el
   almacenamiento limpio: `npm run fix:document-filenames`, que resube los PDF
   con su nombre correcto sin recrear las fichas.
   **No verifiques esto con Playwright**: su `suggestedFilename()` devuelve el
   nombre de la cabecera e ignora el atributo, así que da un falso negativo.
   Mira el archivo real en la carpeta de Descargas.
10. **Nunca rellenar textos largos entre idiomas.** Si una biografía solo existe
   en español, la sección debe **ocultarse** en inglés, no mostrarse en el
   idioma equivocado.

## 7. Verificación antes de dar algo por terminado

```bash
npm run typecheck && npm run build
npm run verify:download-names    # tras tocar los PDF de Políticas Públicas
```

Y para cambios visuales, revisar con navegador: sin errores de consola, sin
imágenes rotas, un solo `<h1>`, sin desborde horizontal entre 320 y 1920 px.

## 8. Pendientes

Ver `docs/traspaso.md`, sección "Estado y pendientes conocidos".

El más relevante: **el formulario de contacto está desplegado pero su tabla no
existe en la base de producción**. La colección, la acción de servidor y la
migración (`src/migrations/20260818_194801_contacto.ts`) están listas y
probadas en local; falta aplicar la migración a Neon.

## 9. Documentación

- `README.md` — puesta en marcha y estructura.
- `docs/manual-panel.md` — manual del panel para el equipo de INCAR².
- `docs/traspaso.md` — inventario de servicios, operación y pendientes.
