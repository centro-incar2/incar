// Tipos y valores se importan por separado: el runtime nativo de Node elimina
// tipos sin analizar el módulo y, mezclados, intenta resolverlos como exports
// reales y falla. Aplicar lo mismo a cada migración nueva.
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_research_line_content_line" AS ENUM('nuevas-vacunas-para-peces', 'enfermedades-y-resistencia-antimicrobiana', 'soluciones-omicas', 'estres-y-bienestar-animal', 'impactos-en-ecosistemas', 'resiliencia-de-la-acuicultura', 'interacciones-sustentables', 'impactos-socioeconomicos');
  CREATE TYPE "public"."enum__research_line_content_v_version_line" AS ENUM('nuevas-vacunas-para-peces', 'enfermedades-y-resistencia-antimicrobiana', 'soluciones-omicas', 'estres-y-bienestar-animal', 'impactos-en-ecosistemas', 'resiliencia-de-la-acuicultura', 'interacciones-sustentables', 'impactos-socioeconomicos');
  CREATE TABLE "research_line_content_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "research_line_content_transfer_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "research_line_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"line" "enum_research_line_content_line" NOT NULL,
  	"admin_title" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "research_line_content_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"title_accent" varchar,
  	"lead" varchar,
  	"hero_cta" varchar,
  	"focus_eyebrow" varchar,
  	"focus_text" varchar,
  	"obj_eyebrow" varchar,
  	"obj_title" varchar,
  	"transfer_eyebrow" varchar,
  	"transfer_title" varchar,
  	"transfer_text" varchar,
  	"closing_eyebrow" varchar,
  	"closing_title" varchar,
  	"closing_title_accent" varchar,
  	"closing_text" varchar,
  	"closing_cta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_research_line_content_v_version_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_research_line_content_v_version_transfer_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_research_line_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_line" "enum__research_line_content_v_version_line" NOT NULL,
  	"version_admin_title" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_research_line_content_v_locales" (
  	"version_eyebrow" varchar,
  	"version_title" varchar,
  	"version_title_accent" varchar,
  	"version_lead" varchar,
  	"version_hero_cta" varchar,
  	"version_focus_eyebrow" varchar,
  	"version_focus_text" varchar,
  	"version_obj_eyebrow" varchar,
  	"version_obj_title" varchar,
  	"version_transfer_eyebrow" varchar,
  	"version_transfer_title" varchar,
  	"version_transfer_text" varchar,
  	"version_closing_eyebrow" varchar,
  	"version_closing_title" varchar,
  	"version_closing_title_accent" varchar,
  	"version_closing_text" varchar,
  	"version_closing_cta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "research_line_content_id" integer;
  ALTER TABLE "research_line_content_objectives" ADD CONSTRAINT "research_line_content_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research_line_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_line_content_transfer_items" ADD CONSTRAINT "research_line_content_transfer_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research_line_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_line_content_locales" ADD CONSTRAINT "research_line_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research_line_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_research_line_content_v_version_objectives" ADD CONSTRAINT "_research_line_content_v_version_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_research_line_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_research_line_content_v_version_transfer_items" ADD CONSTRAINT "_research_line_content_v_version_transfer_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_research_line_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_research_line_content_v" ADD CONSTRAINT "_research_line_content_v_parent_id_research_line_content_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."research_line_content"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_research_line_content_v_locales" ADD CONSTRAINT "_research_line_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_research_line_content_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "research_line_content_objectives_order_idx" ON "research_line_content_objectives" USING btree ("_order");
  CREATE INDEX "research_line_content_objectives_parent_id_idx" ON "research_line_content_objectives" USING btree ("_parent_id");
  CREATE INDEX "research_line_content_objectives_locale_idx" ON "research_line_content_objectives" USING btree ("_locale");
  CREATE INDEX "research_line_content_transfer_items_order_idx" ON "research_line_content_transfer_items" USING btree ("_order");
  CREATE INDEX "research_line_content_transfer_items_parent_id_idx" ON "research_line_content_transfer_items" USING btree ("_parent_id");
  CREATE INDEX "research_line_content_transfer_items_locale_idx" ON "research_line_content_transfer_items" USING btree ("_locale");
  CREATE UNIQUE INDEX "research_line_content_line_idx" ON "research_line_content" USING btree ("line");
  CREATE INDEX "research_line_content_updated_at_idx" ON "research_line_content" USING btree ("updated_at");
  CREATE INDEX "research_line_content_created_at_idx" ON "research_line_content" USING btree ("created_at");
  CREATE UNIQUE INDEX "research_line_content_locales_locale_parent_id_unique" ON "research_line_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_research_line_content_v_version_objectives_order_idx" ON "_research_line_content_v_version_objectives" USING btree ("_order");
  CREATE INDEX "_research_line_content_v_version_objectives_parent_id_idx" ON "_research_line_content_v_version_objectives" USING btree ("_parent_id");
  CREATE INDEX "_research_line_content_v_version_objectives_locale_idx" ON "_research_line_content_v_version_objectives" USING btree ("_locale");
  CREATE INDEX "_research_line_content_v_version_transfer_items_order_idx" ON "_research_line_content_v_version_transfer_items" USING btree ("_order");
  CREATE INDEX "_research_line_content_v_version_transfer_items_parent_id_idx" ON "_research_line_content_v_version_transfer_items" USING btree ("_parent_id");
  CREATE INDEX "_research_line_content_v_version_transfer_items_locale_idx" ON "_research_line_content_v_version_transfer_items" USING btree ("_locale");
  CREATE INDEX "_research_line_content_v_parent_idx" ON "_research_line_content_v" USING btree ("parent_id");
  CREATE INDEX "_research_line_content_v_version_version_line_idx" ON "_research_line_content_v" USING btree ("version_line");
  CREATE INDEX "_research_line_content_v_version_version_updated_at_idx" ON "_research_line_content_v" USING btree ("version_updated_at");
  CREATE INDEX "_research_line_content_v_version_version_created_at_idx" ON "_research_line_content_v" USING btree ("version_created_at");
  CREATE INDEX "_research_line_content_v_created_at_idx" ON "_research_line_content_v" USING btree ("created_at");
  CREATE INDEX "_research_line_content_v_updated_at_idx" ON "_research_line_content_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_research_line_content_v_locales_locale_parent_id_unique" ON "_research_line_content_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_line_content_fk" FOREIGN KEY ("research_line_content_id") REFERENCES "public"."research_line_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_research_line_content_id_idx" ON "payload_locked_documents_rels" USING btree ("research_line_content_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "research_line_content_objectives" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "research_line_content_transfer_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "research_line_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "research_line_content_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_research_line_content_v_version_objectives" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_research_line_content_v_version_transfer_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_research_line_content_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_research_line_content_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "research_line_content_objectives" CASCADE;
  DROP TABLE "research_line_content_transfer_items" CASCADE;
  DROP TABLE "research_line_content" CASCADE;
  DROP TABLE "research_line_content_locales" CASCADE;
  DROP TABLE "_research_line_content_v_version_objectives" CASCADE;
  DROP TABLE "_research_line_content_v_version_transfer_items" CASCADE;
  DROP TABLE "_research_line_content_v" CASCADE;
  DROP TABLE "_research_line_content_v_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_research_line_content_fk";
  
  DROP INDEX "payload_locked_documents_rels_research_line_content_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "research_line_content_id";
  DROP TYPE "public"."enum_research_line_content_line";
  DROP TYPE "public"."enum__research_line_content_v_version_line";`)
}
