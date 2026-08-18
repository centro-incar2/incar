// Tipos y valores se importan por separado: el runtime nativo de Node elimina
// tipos sin analizar el módulo y, mezclados, intenta resolverlos como exports
// reales y falla. Aplicar lo mismo a cada migración nueva.
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_research_members_line" AS ENUM('nuevas-vacunas-para-peces', 'enfermedades-y-resistencia-antimicrobiana', 'soluciones-omicas', 'estres-y-bienestar-animal', 'impactos-en-ecosistemas', 'resiliencia-de-la-acuicultura', 'interacciones-sustentables', 'impactos-socioeconomicos');
  CREATE TYPE "public"."enum_management_team_team" AS ENUM('direction', 'executive');
  CREATE TABLE "research_members_degrees" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "research_members_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "research_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"line" "enum_research_members_line" NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"email" varchar,
  	"photo_id" integer,
  	"links_linkedin" varchar,
  	"links_orcid" varchar,
  	"links_scholar" varchar,
  	"links_researchgate" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "research_members_locales" (
  	"role" varchar NOT NULL,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "management_team_degrees" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "management_team_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "management_team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"team" "enum_management_team_team" DEFAULT 'executive' NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"member_slug" varchar,
  	"email" varchar,
  	"photo_id" integer,
  	"links_linkedin" varchar,
  	"links_orcid" varchar,
  	"links_scholar" varchar,
  	"links_researchgate" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "management_team_locales" (
  	"role" varchar NOT NULL,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "research_members_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "management_team_id" integer;
  ALTER TABLE "research_members_degrees" ADD CONSTRAINT "research_members_degrees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_members_projects" ADD CONSTRAINT "research_members_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_members" ADD CONSTRAINT "research_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "research_members_locales" ADD CONSTRAINT "research_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "management_team_degrees" ADD CONSTRAINT "management_team_degrees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."management_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "management_team_projects" ADD CONSTRAINT "management_team_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."management_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "management_team" ADD CONSTRAINT "management_team_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "management_team_locales" ADD CONSTRAINT "management_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."management_team"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "research_members_degrees_order_idx" ON "research_members_degrees" USING btree ("_order");
  CREATE INDEX "research_members_degrees_parent_id_idx" ON "research_members_degrees" USING btree ("_parent_id");
  CREATE INDEX "research_members_degrees_locale_idx" ON "research_members_degrees" USING btree ("_locale");
  CREATE INDEX "research_members_projects_order_idx" ON "research_members_projects" USING btree ("_order");
  CREATE INDEX "research_members_projects_parent_id_idx" ON "research_members_projects" USING btree ("_parent_id");
  CREATE INDEX "research_members_projects_locale_idx" ON "research_members_projects" USING btree ("_locale");
  CREATE UNIQUE INDEX "research_members_slug_idx" ON "research_members" USING btree ("slug");
  CREATE INDEX "research_members_photo_idx" ON "research_members" USING btree ("photo_id");
  CREATE INDEX "research_members_updated_at_idx" ON "research_members" USING btree ("updated_at");
  CREATE INDEX "research_members_created_at_idx" ON "research_members" USING btree ("created_at");
  CREATE UNIQUE INDEX "research_members_locales_locale_parent_id_unique" ON "research_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "management_team_degrees_order_idx" ON "management_team_degrees" USING btree ("_order");
  CREATE INDEX "management_team_degrees_parent_id_idx" ON "management_team_degrees" USING btree ("_parent_id");
  CREATE INDEX "management_team_degrees_locale_idx" ON "management_team_degrees" USING btree ("_locale");
  CREATE INDEX "management_team_projects_order_idx" ON "management_team_projects" USING btree ("_order");
  CREATE INDEX "management_team_projects_parent_id_idx" ON "management_team_projects" USING btree ("_parent_id");
  CREATE INDEX "management_team_projects_locale_idx" ON "management_team_projects" USING btree ("_locale");
  CREATE UNIQUE INDEX "management_team_slug_idx" ON "management_team" USING btree ("slug");
  CREATE INDEX "management_team_photo_idx" ON "management_team" USING btree ("photo_id");
  CREATE INDEX "management_team_updated_at_idx" ON "management_team" USING btree ("updated_at");
  CREATE INDEX "management_team_created_at_idx" ON "management_team" USING btree ("created_at");
  CREATE UNIQUE INDEX "management_team_locales_locale_parent_id_unique" ON "management_team_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_members_fk" FOREIGN KEY ("research_members_id") REFERENCES "public"."research_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_management_team_fk" FOREIGN KEY ("management_team_id") REFERENCES "public"."management_team"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_research_members_id_idx" ON "payload_locked_documents_rels" USING btree ("research_members_id");
  CREATE INDEX "payload_locked_documents_rels_management_team_id_idx" ON "payload_locked_documents_rels" USING btree ("management_team_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "research_members_degrees" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "research_members_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "research_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "research_members_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "management_team_degrees" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "management_team_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "management_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "management_team_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "research_members_degrees" CASCADE;
  DROP TABLE "research_members_projects" CASCADE;
  DROP TABLE "research_members" CASCADE;
  DROP TABLE "research_members_locales" CASCADE;
  DROP TABLE "management_team_degrees" CASCADE;
  DROP TABLE "management_team_projects" CASCADE;
  DROP TABLE "management_team" CASCADE;
  DROP TABLE "management_team_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_research_members_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_management_team_fk";
  
  DROP INDEX "payload_locked_documents_rels_research_members_id_idx";
  DROP INDEX "payload_locked_documents_rels_management_team_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "research_members_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "management_team_id";
  DROP TYPE "public"."enum_research_members_line";
  DROP TYPE "public"."enum_management_team_team";`)
}
