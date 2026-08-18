# INCAR² — Sitio institucional

Reconstrucción profesional del sitio de **INCAR²** (Centro Interdisciplinario para la
Investigación Acuícola), migrado desde WordPress/Elementor hacia un stack moderno,
rápido y mantenible, con soporte bilingüe (español/inglés) y arquitectura preparada
para un panel de administración propio.

## Stack

| Capa | Tecnología | Motivo |
|------|-----------|--------|
| Framework | **Next.js 16** (App Router) | SSG/ISR, SEO nativo, rendimiento |
| UI | **React 19 + TypeScript** | Componentes tipados y reutilizables |
| Estilos | **Tailwind CSS v4** (config CSS-first) | Design tokens, cero CSS muerto |
| i18n | **next-intl v4** | Rutas localizadas + SEO por idioma |
| Imágenes | `next/image` + `sharp` | AVIF/WebP automático, lazy loading |
| CMS (Fase 3) | **Payload CMS 3** + PostgreSQL (Neon) | Panel propio, self-hosted, sin WordPress |
| Deploy | Vercel | Estándar para Next.js |

## Requisitos

- Node.js ≥ 20.9 (probado en Node 24)
- npm (o pnpm/yarn)

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # incluye ya la cadena del Postgres local
                             # (genera un PAYLOAD_SECRET propio: openssl rand -base64 32)

# En una terminal: base de datos local (Postgres embebido, sin instalación de sistema)
npm run db

# En otra terminal: (solo la primera vez) poblar la base y arrancar
npm run seed                 # migra publicaciones + noticias + imágenes a la DB
npm run dev                  # http://localhost:3000  ·  panel: /admin
```

> El panel `/admin` pide crear el primer usuario en el primer acceso. En desarrollo,
> el `seed` no crea usuarios: regístrate desde el panel.

### Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (sitio + panel `/admin`) |
| `npm run db` | Postgres local aislado (`embedded-postgres`, datos en `.postgres-data/`) |
| `npm run seed` | Migra el contenido de `src/content/*` a la base de datos (idempotente) |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build |
| `npm run typecheck` | Verificación de tipos (sin emitir) |
| `npm run payload:types` | Regenera `src/payload-types.ts` tras cambiar colecciones |

> **Node 24 + CLI de Payload:** el CLI se ejecuta con el runtime nativo de Node vía
> `scripts/payload-loader.mjs` (resuelve el alias `@/` y las extensiones `.ts`),
> evitando el conflicto entre el loader `tsx` de Payload y `require(esm)` + top-level
> await. Los scripts de `package.json` ya lo aplican.

## Internacionalización

- Idiomas: **español** (por defecto, sin prefijo) e **inglés** (`/en`).
- URLs amigables e independientes por idioma (ej. `/quienes-somos` ↔ `/en/about-us`),
  definidas en [`src/i18n/routing.ts`](src/i18n/routing.ts).
- Traducciones en [`src/messages/es.json`](src/messages/es.json) y
  [`src/messages/en.json`](src/messages/en.json).
- SEO por idioma: `hreflang`, `canonical` y `og:locale` automáticos por página
  (ver [`src/lib/seo.ts`](src/lib/seo.ts)).

## Estructura

```
src/
├─ app/[locale]/          # Rutas (una carpeta por página, con generateMetadata)
├─ components/
│  ├─ layout/             # Header, Footer, LanguageSwitcher
│  ├─ ui/                 # Primitivas: Button, Container, SectionHeading, PageHero
│  └─ sections/           # Secciones del Home y tarjetas reutilizables
├─ app/(payload)/         # Route group del panel y API de Payload (generado, no editar)
├─ collections/           # Colecciones de Payload: Users, Media, Publications, News
├─ content/               # Capa de datos aún hardcodeada (nav, líneas, gobernanza)
├─ fields/                # Campos reutilizables de Payload (slug)
├─ i18n/                  # Configuración de idiomas y navegación localizada
├─ lib/
│  └─ cms/                # Acceso a Payload (Local API) para el sitio público
├─ messages/              # Traducciones es/en
├─ payload.config.ts      # Configuración de Payload (localización es/en, Postgres)
├─ payload-types.ts       # Tipos generados por Payload (versionado)
└─ proxy.ts               # Middleware de i18n (convención Next 16; excluye /admin y /api)
```

> **Fuente de verdad:** Publicaciones y Noticias viven ahora en la base de datos y se
> editan desde `/admin`; el sitio público las lee vía `src/lib/cms/*` (Local API, sin
> HTTP). Los `src/content/publications.ts` y `news.ts` quedan solo como **fuente del
> `seed`**. El resto del contenido (líneas de investigación, integrantes, gobernanza)
> sigue en `src/content/` a la espera de futuras iteraciones del panel.

## Hoja de ruta por fases

- **Fase 1 — Sitio público bilingüe** ✅ *(actual)*
  Réplica visual fiel de todas las páginas, i18n es/en, SEO técnico, sitemap y robots.
- **Fase 2 — Módulo Publicaciones** ✅
  Listado "Biblioteca Interactiva" en cards (tema navy), buscador en tiempo real,
  filtros combinables (categoría/autor) y ordenamiento por año, página de detalle
  con contenido enriquecido, relacionadas y botones de compartir. Datos en
  [`src/content/publications.ts`](src/content/publications.ts) (6 ejemplos), con la
  misma forma que administrará el panel en Fase 3.
- **Fase 3 — Panel de administración (Payload CMS)** 🚧 *(en curso)*
  - ✅ Payload 3 integrado en la app Next (panel `/admin` + API), localización nativa
    es/en, Postgres (Neon en prod / embebido en dev), editor Lexical.
  - ✅ Colecciones **Publicaciones** y **Noticias** (con imágenes gestionadas en
    **Media**) como fuente de verdad; sitio público leyendo desde la base de datos.
  - ⏳ Pendiente: colecciones para líneas de investigación e integrantes, edición de
    páginas/textos/SEO, roles editoriales, y **almacenamiento de subidas en la nube**
    para producción (Vercel Blob o S3 — el sistema de archivos de Vercel es efímero).

## Notas de migración

El sitio WordPress original tenía varias páginas con texto de relleno (*Lorem ipsum*):
Colaboración Nacional/Internacional, Servicios, Transferencia Tecnológica e Impacto.
Se reconstruyó su estructura visual con un aviso de contenido editable
([`EditableNote`](src/components/ui/editable-note.tsx)) en lugar de inventar datos del
centro; ese contenido se completará desde el panel en la Fase 3.

Los assets de marca (logos INCAR² y ANID, imágenes) se descargaron a `public/images/`
para no depender del hosting original.
