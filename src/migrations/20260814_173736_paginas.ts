// Tipos y valores se importan por separado: el runtime nativo de Node elimina
// tipos sin analizar el módulo y, mezclados, intenta resolverlos como exports
// reales y falla. Aplicar lo mismo a cada migración nueva.
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_st_summary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_locales" (
  	"hero_title" varchar,
  	"hero_title_accent" varchar,
  	"hero_subtitle" varchar,
  	"hero_cta1" varchar,
  	"hero_cta2" varchar,
  	"quick_tour" varchar,
  	"quick_networks" varchar,
  	"quick_news" varchar,
  	"quick_documents" varchar,
  	"quick_policy" varchar,
  	"quick_events" varchar,
  	"slide_srs_title" varchar,
  	"slide_srs_text" varchar,
  	"slide_srs_alt" varchar,
  	"slide_epimar_title" varchar,
  	"slide_epimar_text" varchar,
  	"slide_epimar_alt" varchar,
  	"slide_policy_title" varchar,
  	"slide_policy_text" varchar,
  	"slide_policy_cta" varchar,
  	"slide_initiatives_title" varchar,
  	"slide_initiatives_text" varchar,
  	"slide_initiatives_cta" varchar,
  	"slide_more_info" varchar,
  	"research_eyebrow" varchar,
  	"research_title" varchar,
  	"research_text" varchar,
  	"research_cta" varchar,
  	"research_image_alt" varchar,
  	"st_eyebrow" varchar,
  	"st_title" varchar,
  	"st_text" varchar,
  	"st_image_alt" varchar,
  	"st_what_is" varchar,
  	"st_sfera_full" varchar,
  	"st_sfera_text" varchar,
  	"st_inah_full" varchar,
  	"st_inah_text" varchar,
  	"st_summary_title" varchar,
  	"st_cta_services" varchar,
  	"st_cta_transfer" varchar,
  	"collaboration_eyebrow" varchar,
  	"collaboration_title" varchar,
  	"collab_label" varchar,
  	"collab_text" varchar,
  	"social_eyebrow" varchar,
  	"social_title" varchar,
  	"social_text" varchar,
  	"sponsor_title" varchar,
  	"associated_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_v_version_st_summary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_home_v_locales" (
  	"version_hero_title" varchar,
  	"version_hero_title_accent" varchar,
  	"version_hero_subtitle" varchar,
  	"version_hero_cta1" varchar,
  	"version_hero_cta2" varchar,
  	"version_quick_tour" varchar,
  	"version_quick_networks" varchar,
  	"version_quick_news" varchar,
  	"version_quick_documents" varchar,
  	"version_quick_policy" varchar,
  	"version_quick_events" varchar,
  	"version_slide_srs_title" varchar,
  	"version_slide_srs_text" varchar,
  	"version_slide_srs_alt" varchar,
  	"version_slide_epimar_title" varchar,
  	"version_slide_epimar_text" varchar,
  	"version_slide_epimar_alt" varchar,
  	"version_slide_policy_title" varchar,
  	"version_slide_policy_text" varchar,
  	"version_slide_policy_cta" varchar,
  	"version_slide_initiatives_title" varchar,
  	"version_slide_initiatives_text" varchar,
  	"version_slide_initiatives_cta" varchar,
  	"version_slide_more_info" varchar,
  	"version_research_eyebrow" varchar,
  	"version_research_title" varchar,
  	"version_research_text" varchar,
  	"version_research_cta" varchar,
  	"version_research_image_alt" varchar,
  	"version_st_eyebrow" varchar,
  	"version_st_title" varchar,
  	"version_st_text" varchar,
  	"version_st_image_alt" varchar,
  	"version_st_what_is" varchar,
  	"version_st_sfera_full" varchar,
  	"version_st_sfera_text" varchar,
  	"version_st_inah_full" varchar,
  	"version_st_inah_text" varchar,
  	"version_st_summary_title" varchar,
  	"version_st_cta_services" varchar,
  	"version_st_cta_transfer" varchar,
  	"version_collaboration_eyebrow" varchar,
  	"version_collaboration_title" varchar,
  	"version_collab_label" varchar,
  	"version_collab_text" varchar,
  	"version_social_eyebrow" varchar,
  	"version_social_title" varchar,
  	"version_social_text" varchar,
  	"version_sponsor_title" varchar,
  	"version_associated_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_history_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "about_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_locales" (
  	"eyebrow" varchar,
  	"history_title" varchar,
  	"history1" varchar,
  	"title2" varchar,
  	"text2" varchar,
  	"title3" varchar,
  	"box_title" varchar,
  	"text4" varchar,
  	"institutions_text" varchar,
  	"cta" varchar,
  	"team_image_alt" varchar,
  	"mission_title" varchar,
  	"mission_text" varchar,
  	"vision_title" varchar,
  	"vision_text" varchar,
  	"obj_general_title" varchar,
  	"obj_general_text" varchar,
  	"obj_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_v_version_history_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_v_version_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_about_v_locales" (
  	"version_eyebrow" varchar,
  	"version_history_title" varchar,
  	"version_history1" varchar,
  	"version_title2" varchar,
  	"version_text2" varchar,
  	"version_title3" varchar,
  	"version_box_title" varchar,
  	"version_text4" varchar,
  	"version_institutions_text" varchar,
  	"version_cta" varchar,
  	"version_team_image_alt" varchar,
  	"version_mission_title" varchar,
  	"version_mission_text" varchar,
  	"version_vision_title" varchar,
  	"version_vision_text" varchar,
  	"version_obj_general_title" varchar,
  	"version_obj_general_text" varchar,
  	"version_obj_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "home_st_summary" ADD CONSTRAINT "home_st_summary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_locales" ADD CONSTRAINT "home_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_st_summary" ADD CONSTRAINT "_home_v_version_st_summary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_locales" ADD CONSTRAINT "_home_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_history_paragraphs" ADD CONSTRAINT "about_history_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_objectives" ADD CONSTRAINT "about_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_locales" ADD CONSTRAINT "about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v_version_history_paragraphs" ADD CONSTRAINT "_about_v_version_history_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v_version_objectives" ADD CONSTRAINT "_about_v_version_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v_locales" ADD CONSTRAINT "_about_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_st_summary_order_idx" ON "home_st_summary" USING btree ("_order");
  CREATE INDEX "home_st_summary_parent_id_idx" ON "home_st_summary" USING btree ("_parent_id");
  CREATE INDEX "home_st_summary_locale_idx" ON "home_st_summary" USING btree ("_locale");
  CREATE UNIQUE INDEX "home_locales_locale_parent_id_unique" ON "home_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_v_version_st_summary_order_idx" ON "_home_v_version_st_summary" USING btree ("_order");
  CREATE INDEX "_home_v_version_st_summary_parent_id_idx" ON "_home_v_version_st_summary" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_st_summary_locale_idx" ON "_home_v_version_st_summary" USING btree ("_locale");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_home_v_locales_locale_parent_id_unique" ON "_home_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_history_paragraphs_order_idx" ON "about_history_paragraphs" USING btree ("_order");
  CREATE INDEX "about_history_paragraphs_parent_id_idx" ON "about_history_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "about_history_paragraphs_locale_idx" ON "about_history_paragraphs" USING btree ("_locale");
  CREATE INDEX "about_objectives_order_idx" ON "about_objectives" USING btree ("_order");
  CREATE INDEX "about_objectives_parent_id_idx" ON "about_objectives" USING btree ("_parent_id");
  CREATE INDEX "about_objectives_locale_idx" ON "about_objectives" USING btree ("_locale");
  CREATE UNIQUE INDEX "about_locales_locale_parent_id_unique" ON "about_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_v_version_history_paragraphs_order_idx" ON "_about_v_version_history_paragraphs" USING btree ("_order");
  CREATE INDEX "_about_v_version_history_paragraphs_parent_id_idx" ON "_about_v_version_history_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_about_v_version_history_paragraphs_locale_idx" ON "_about_v_version_history_paragraphs" USING btree ("_locale");
  CREATE INDEX "_about_v_version_objectives_order_idx" ON "_about_v_version_objectives" USING btree ("_order");
  CREATE INDEX "_about_v_version_objectives_parent_id_idx" ON "_about_v_version_objectives" USING btree ("_parent_id");
  CREATE INDEX "_about_v_version_objectives_locale_idx" ON "_about_v_version_objectives" USING btree ("_locale");
  CREATE INDEX "_about_v_created_at_idx" ON "_about_v" USING btree ("created_at");
  CREATE INDEX "_about_v_updated_at_idx" ON "_about_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_about_v_locales_locale_parent_id_unique" ON "_about_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_st_summary" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_locales" CASCADE;
  DROP TABLE "_home_v_version_st_summary" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "_home_v_locales" CASCADE;
  DROP TABLE "about_history_paragraphs" CASCADE;
  DROP TABLE "about_objectives" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "about_locales" CASCADE;
  DROP TABLE "_about_v_version_history_paragraphs" CASCADE;
  DROP TABLE "_about_v_version_objectives" CASCADE;
  DROP TABLE "_about_v" CASCADE;
  DROP TABLE "_about_v_locales" CASCADE;`)
}
