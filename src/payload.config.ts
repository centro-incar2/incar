import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { es } from "@payloadcms/translations/languages/es";
import sharp from "sharp";
import { buildConfig } from "payload";

import { databaseUri, isLocalDatabase } from "@/lib/cms/connection";
import { Users } from "@/collections/Users";
import { Media } from "@/collections/Media";
import { Publications } from "@/collections/Publications";
import { News } from "@/collections/News";
import { ResearchMembers } from "@/collections/ResearchMembers";
import { ManagementTeam } from "@/collections/ManagementTeam";
import { ResearchLineContent } from "@/collections/ResearchLineContent";
import { DocumentFiles } from "@/collections/DocumentFiles";
import { PolicyDocuments } from "@/collections/PolicyDocuments";
import { Home } from "@/globals/Home";
import { About } from "@/globals/About";
import { Governance } from "@/globals/Governance";
import { Collaborations } from "@/globals/Collaborations";
import { Transfer } from "@/globals/Transfer";
import { Events } from "@/globals/Events";
import { Initiatives } from "@/globals/Initiatives";
import { Communications } from "@/globals/Communications";
import { Contact } from "@/globals/Contact";
import { Services } from "@/globals/Services";
import { PublicPolicy } from "@/globals/PublicPolicy";
import {
  PublicationsPage,
  NewsPage,
  ResearchIndexPage,
  ManagementPage,
  MissionVisionPage,
} from "@/globals/Listings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Configuración de Payload CMS (Fase 3) para el sitio de INCAR².
 *
 * - Localización nativa es/en: los campos marcados `localized` guardan un valor
 *   por idioma, alineado con el i18n del sitio público (next-intl).
 * - Base de datos PostgreSQL (Neon en prod / Postgres embebido en dev).
 * - Editor Lexical para los cuerpos enriquecidos (abstracts y noticias).
 * - Panel en español (`fallbackLanguage: "es"`).
 */
export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "· INCAR² Admin",
    },
  },
  collections: [
    Publications,
    News,
    ResearchMembers,
    ManagementTeam,
    ResearchLineContent,
    PolicyDocuments,
    DocumentFiles,
    Media,
    Users,
  ],
  globals: [
    Home,
    About,
    Governance,
    Collaborations,
    Transfer,
    Events,
    Initiatives,
    Communications,
    Contact,
    Services,
    PublicPolicy,
    PublicationsPage,
    NewsPage,
    ResearchIndexPage,
    ManagementPage,
    MissionVisionPage,
  ],
  localization: {
    locales: [
      { label: "Español", code: "es" },
      { label: "English", code: "en" },
    ],
    defaultLocale: "es",
    fallback: true,
  },
  i18n: {
    // El panel se entrega al equipo de comunicaciones de INCAR², así que se fija
    // en español en vez de seguir el idioma del navegador: `fallbackLanguage`
    // solo actúa cuando la detección falla, y con un Chrome en inglés la
    // interfaz aparecía mezclada (colecciones en español, menús en inglés).
    fallbackLanguage: "es",
    supportedLanguages: { es },
  },
  editor: lexicalEditor(),
  plugins: [
    // Las subidas van a Vercel Blob en producción: el sistema de archivos de
    // Vercel es efímero, así que una imagen escrita en `public/media` se perdería
    // en el siguiente despliegue. En local no hay token y el plugin se desactiva,
    // conservando el almacenamiento en disco de `Media.staticDir`.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true, "document-files": true },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
  db: postgresAdapter({
    // Solo se sincroniza el esquema automáticamente contra el Postgres local.
    // Cualquier base remota (Neon) cambia únicamente por migraciones.
    push: isLocalDatabase(),
    pool: {
      connectionString: databaseUri(),
    },
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
