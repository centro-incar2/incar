// Tipos y valores se importan por separado: el runtime nativo de Node elimina
// tipos sin analizar el módulo y, mezclados, intenta resolverlos como exports
// reales y falla. Aplicar lo mismo a cada migración nueva.
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_policy_documents_kind" AS ENUM('policy-brief', 'advisory', 'other');
  CREATE TABLE "policy_documents_annexes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"file_id" integer NOT NULL
  );
  
  CREATE TABLE "policy_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum_policy_documents_kind" DEFAULT 'policy-brief' NOT NULL,
  	"number" numeric,
  	"title" varchar NOT NULL,
  	"date" varchar,
  	"file_id" integer NOT NULL,
  	"summary_file_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "policy_documents_locales" (
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "document_files" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "policy_documents_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "document_files_id" integer;
  ALTER TABLE "policy_documents_annexes" ADD CONSTRAINT "policy_documents_annexes_file_id_document_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."document_files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "policy_documents_annexes" ADD CONSTRAINT "policy_documents_annexes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."policy_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "policy_documents" ADD CONSTRAINT "policy_documents_file_id_document_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."document_files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "policy_documents" ADD CONSTRAINT "policy_documents_summary_file_id_document_files_id_fk" FOREIGN KEY ("summary_file_id") REFERENCES "public"."document_files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "policy_documents_locales" ADD CONSTRAINT "policy_documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."policy_documents"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "policy_documents_annexes_order_idx" ON "policy_documents_annexes" USING btree ("_order");
  CREATE INDEX "policy_documents_annexes_parent_id_idx" ON "policy_documents_annexes" USING btree ("_parent_id");
  CREATE INDEX "policy_documents_annexes_file_idx" ON "policy_documents_annexes" USING btree ("file_id");
  CREATE INDEX "policy_documents_file_idx" ON "policy_documents" USING btree ("file_id");
  CREATE INDEX "policy_documents_summary_file_idx" ON "policy_documents" USING btree ("summary_file_id");
  CREATE INDEX "policy_documents_updated_at_idx" ON "policy_documents" USING btree ("updated_at");
  CREATE INDEX "policy_documents_created_at_idx" ON "policy_documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "policy_documents_locales_locale_parent_id_unique" ON "policy_documents_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "document_files_updated_at_idx" ON "document_files" USING btree ("updated_at");
  CREATE INDEX "document_files_created_at_idx" ON "document_files" USING btree ("created_at");
  CREATE UNIQUE INDEX "document_files_filename_idx" ON "document_files" USING btree ("filename");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_policy_documents_fk" FOREIGN KEY ("policy_documents_id") REFERENCES "public"."policy_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_document_files_fk" FOREIGN KEY ("document_files_id") REFERENCES "public"."document_files"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_policy_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("policy_documents_id");
  CREATE INDEX "payload_locked_documents_rels_document_files_id_idx" ON "payload_locked_documents_rels" USING btree ("document_files_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "policy_documents_annexes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "policy_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "policy_documents_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "document_files" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "policy_documents_annexes" CASCADE;
  DROP TABLE "policy_documents" CASCADE;
  DROP TABLE "policy_documents_locales" CASCADE;
  DROP TABLE "document_files" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_policy_documents_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_document_files_fk";
  
  DROP INDEX "payload_locked_documents_rels_policy_documents_id_idx";
  DROP INDEX "payload_locked_documents_rels_document_files_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "policy_documents_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "document_files_id";
  DROP TYPE "public"."enum_policy_documents_kind";`)
}
