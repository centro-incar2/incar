// Tipos y valores se importan por separado: el runtime nativo de Node elimina
// tipos sin analizar el módulo y, mezclados, intenta resolverlos como exports
// reales y falla. Aplicar lo mismo a cada migración nueva.
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "governance" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "governance_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"council_eyebrow" varchar,
  	"council_title" varchar,
  	"council_text" varchar,
  	"institutions_title" varchar,
  	"institutions_text" varchar,
  	"board_title" varchar,
  	"board_text1" varchar,
  	"board_text2" varchar,
  	"alliances_eyebrow" varchar,
  	"alliances_title" varchar,
  	"alliances_text1" varchar,
  	"alliances_text2" varchar,
  	"advisory_title" varchar,
  	"advisory_text1" varchar,
  	"advisory_text2" varchar,
  	"advisory_image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_governance_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_governance_v_locales" (
  	"version_eyebrow" varchar,
  	"version_title" varchar,
  	"version_council_eyebrow" varchar,
  	"version_council_title" varchar,
  	"version_council_text" varchar,
  	"version_institutions_title" varchar,
  	"version_institutions_text" varchar,
  	"version_board_title" varchar,
  	"version_board_text1" varchar,
  	"version_board_text2" varchar,
  	"version_alliances_eyebrow" varchar,
  	"version_alliances_title" varchar,
  	"version_alliances_text1" varchar,
  	"version_alliances_text2" varchar,
  	"version_advisory_title" varchar,
  	"version_advisory_text1" varchar,
  	"version_advisory_text2" varchar,
  	"version_advisory_image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "collaborations_mechanisms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "collaborations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "collaborations_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"lead" varchar,
  	"national_title" varchar,
  	"national_text" varchar,
  	"international_title" varchar,
  	"international_text" varchar,
  	"mechanisms_title" varchar,
  	"mechanisms_intro" varchar,
  	"ecos_text" varchar,
  	"internships_text" varchar,
  	"natih_title" varchar,
  	"natih_text1" varchar,
  	"natih_text2" varchar,
  	"logos_eyebrow" varchar,
  	"logos_title" varchar,
  	"group_sponsor" varchar,
  	"group_national" varchar,
  	"group_allies" varchar,
  	"group_international" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_collaborations_v_version_mechanisms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_collaborations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_collaborations_v_locales" (
  	"version_eyebrow" varchar,
  	"version_title" varchar,
  	"version_lead" varchar,
  	"version_national_title" varchar,
  	"version_national_text" varchar,
  	"version_international_title" varchar,
  	"version_international_text" varchar,
  	"version_mechanisms_title" varchar,
  	"version_mechanisms_intro" varchar,
  	"version_ecos_text" varchar,
  	"version_internships_text" varchar,
  	"version_natih_title" varchar,
  	"version_natih_text1" varchar,
  	"version_natih_text2" varchar,
  	"version_logos_eyebrow" varchar,
  	"version_logos_title" varchar,
  	"version_group_sponsor" varchar,
  	"version_group_national" varchar,
  	"version_group_allies" varchar,
  	"version_group_international" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "transfer_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "transfer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "transfer_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"mission_text1" varchar,
  	"mission_text2" varchar,
  	"programs_eyebrow" varchar,
  	"programs_title" varchar,
  	"what_is" varchar,
  	"sfera_name" varchar,
  	"sfera_full" varchar,
  	"sfera_text" varchar,
  	"inah_name" varchar,
  	"inah_full" varchar,
  	"inah_text1" varchar,
  	"inah_text2" varchar,
  	"inah_text3" varchar,
  	"synergy_title" varchar,
  	"synergy_text1" varchar,
  	"synergy_text2" varchar,
  	"obj_general_title" varchar,
  	"obj_general_text" varchar,
  	"obj_specific_title" varchar,
  	"contact_text" varchar,
  	"contact_email" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_transfer_v_version_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_transfer_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_transfer_v_locales" (
  	"version_eyebrow" varchar,
  	"version_title" varchar,
  	"version_mission_text1" varchar,
  	"version_mission_text2" varchar,
  	"version_programs_eyebrow" varchar,
  	"version_programs_title" varchar,
  	"version_what_is" varchar,
  	"version_sfera_name" varchar,
  	"version_sfera_full" varchar,
  	"version_sfera_text" varchar,
  	"version_inah_name" varchar,
  	"version_inah_full" varchar,
  	"version_inah_text1" varchar,
  	"version_inah_text2" varchar,
  	"version_inah_text3" varchar,
  	"version_synergy_title" varchar,
  	"version_synergy_text1" varchar,
  	"version_synergy_text2" varchar,
  	"version_obj_general_title" varchar,
  	"version_obj_general_text" varchar,
  	"version_obj_specific_title" varchar,
  	"version_contact_text" varchar,
  	"version_contact_email" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "events_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro1" varchar,
  	"intro2" varchar,
  	"intro3" varchar,
  	"list_eyebrow" varchar,
  	"visit_site" varchar,
  	"srs_name" varchar,
  	"srs_text1" varchar,
  	"srs_text2" varchar,
  	"srs_text3" varchar,
  	"srs_text4" varchar,
  	"srs_text5" varchar,
  	"srs_url" varchar,
  	"epimar_name" varchar,
  	"epimar_text1" varchar,
  	"epimar_text2" varchar,
  	"epimar_text3" varchar,
  	"epimar_dates_title" varchar,
  	"epimar_dates" varchar,
  	"epimar_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_events_v_locales" (
  	"version_eyebrow" varchar,
  	"version_title" varchar,
  	"version_intro1" varchar,
  	"version_intro2" varchar,
  	"version_intro3" varchar,
  	"version_list_eyebrow" varchar,
  	"version_visit_site" varchar,
  	"version_srs_name" varchar,
  	"version_srs_text1" varchar,
  	"version_srs_text2" varchar,
  	"version_srs_text3" varchar,
  	"version_srs_text4" varchar,
  	"version_srs_text5" varchar,
  	"version_srs_url" varchar,
  	"version_epimar_name" varchar,
  	"version_epimar_text1" varchar,
  	"version_epimar_text2" varchar,
  	"version_epimar_text3" varchar,
  	"version_epimar_dates_title" varchar,
  	"version_epimar_dates" varchar,
  	"version_epimar_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "initiatives" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "initiatives_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"section_label" varchar,
  	"caligus_title" varchar,
  	"caligus_text" varchar,
  	"srs_title" varchar,
  	"srs_text1" varchar,
  	"srs_text2" varchar,
  	"restorative_title" varchar,
  	"restorative_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_initiatives_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_initiatives_v_locales" (
  	"version_eyebrow" varchar,
  	"version_title" varchar,
  	"version_section_label" varchar,
  	"version_caligus_title" varchar,
  	"version_caligus_text" varchar,
  	"version_srs_title" varchar,
  	"version_srs_text1" varchar,
  	"version_srs_text2" varchar,
  	"version_restorative_title" varchar,
  	"version_restorative_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "communications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "communications_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"lead" varchar,
  	"hero_cta" varchar,
  	"dissemination_eyebrow" varchar,
  	"dissemination_text" varchar,
  	"dissemination_image_alt" varchar,
  	"outreach_eyebrow" varchar,
  	"outreach_title" varchar,
  	"outreach_text" varchar,
  	"outreach_image_alt" varchar,
  	"ecosystem_eyebrow" varchar,
  	"ecosystem_title" varchar,
  	"mapeo_eyebrow" varchar,
  	"mapeo_title" varchar,
  	"mapeo_image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_communications_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_communications_v_locales" (
  	"version_eyebrow" varchar,
  	"version_title" varchar,
  	"version_lead" varchar,
  	"version_hero_cta" varchar,
  	"version_dissemination_eyebrow" varchar,
  	"version_dissemination_text" varchar,
  	"version_dissemination_image_alt" varchar,
  	"version_outreach_eyebrow" varchar,
  	"version_outreach_title" varchar,
  	"version_outreach_text" varchar,
  	"version_outreach_image_alt" varchar,
  	"version_ecosystem_eyebrow" varchar,
  	"version_ecosystem_title" varchar,
  	"version_mapeo_eyebrow" varchar,
  	"version_mapeo_title" varchar,
  	"version_mapeo_image_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"lead" varchar,
  	"form_title" varchar,
  	"field_name" varchar,
  	"field_email" varchar,
  	"field_phone" varchar,
  	"field_city" varchar,
  	"field_country" varchar,
  	"field_message" varchar,
  	"submit" varchar,
  	"form_notice" varchar,
  	"email_title" varchar,
  	"email" varchar,
  	"offices_title" varchar,
  	"phone_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_contact_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_contact_v_locales" (
  	"version_eyebrow" varchar,
  	"version_title" varchar,
  	"version_lead" varchar,
  	"version_form_title" varchar,
  	"version_field_name" varchar,
  	"version_field_email" varchar,
  	"version_field_phone" varchar,
  	"version_field_city" varchar,
  	"version_field_country" varchar,
  	"version_field_message" varchar,
  	"version_submit" varchar,
  	"version_form_notice" varchar,
  	"version_email_title" varchar,
  	"version_email" varchar,
  	"version_offices_title" varchar,
  	"version_phone_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"lead" varchar,
  	"area_label" varchar,
  	"services_title" varchar,
  	"future_title" varchar,
  	"cta_title" varchar,
  	"cta_text" varchar,
  	"cta_email" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_services_v_locales" (
  	"version_eyebrow" varchar,
  	"version_title" varchar,
  	"version_lead" varchar,
  	"version_area_label" varchar,
  	"version_services_title" varchar,
  	"version_future_title" varchar,
  	"version_cta_title" varchar,
  	"version_cta_text" varchar,
  	"version_cta_email" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "public_policy" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "public_policy_locales" (
  	"title" varchar,
  	"hero_title" varchar,
  	"intro1" varchar,
  	"intro2" varchar,
  	"why_title" varchar,
  	"why_lead" varchar,
  	"axis1_title" varchar,
  	"axis1_text" varchar,
  	"axis2_title" varchar,
  	"axis2_text" varchar,
  	"axis3_title" varchar,
  	"axis3_text" varchar,
  	"list_title" varchar,
  	"tab_policy_brief" varchar,
  	"tab_advisory" varchar,
  	"tab_other" varchar,
  	"brief_label" varchar,
  	"advisory_label" varchar,
  	"other_doc_label" varchar,
  	"download" varchar,
  	"download_summary" varchar,
  	"advisory_title" varchar,
  	"advisory_intro1" varchar,
  	"advisory_intro2" varchar,
  	"advisory_intro3" varchar,
  	"other_title" varchar,
  	"other_intro1" varchar,
  	"other_intro2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_public_policy_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_public_policy_v_locales" (
  	"version_title" varchar,
  	"version_hero_title" varchar,
  	"version_intro1" varchar,
  	"version_intro2" varchar,
  	"version_why_title" varchar,
  	"version_why_lead" varchar,
  	"version_axis1_title" varchar,
  	"version_axis1_text" varchar,
  	"version_axis2_title" varchar,
  	"version_axis2_text" varchar,
  	"version_axis3_title" varchar,
  	"version_axis3_text" varchar,
  	"version_list_title" varchar,
  	"version_tab_policy_brief" varchar,
  	"version_tab_advisory" varchar,
  	"version_tab_other" varchar,
  	"version_brief_label" varchar,
  	"version_advisory_label" varchar,
  	"version_other_doc_label" varchar,
  	"version_download" varchar,
  	"version_download_summary" varchar,
  	"version_advisory_title" varchar,
  	"version_advisory_intro1" varchar,
  	"version_advisory_intro2" varchar,
  	"version_advisory_intro3" varchar,
  	"version_other_title" varchar,
  	"version_other_intro1" varchar,
  	"version_other_intro2" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "publications_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "publications_page_locales" (
  	"title" varchar,
  	"lead" varchar,
  	"lead_secondary" varchar,
  	"search_placeholder" varchar,
  	"filters_label" varchar,
  	"all_categories" varchar,
  	"filter_by_line" varchar,
  	"filter_by_year" varchar,
  	"clear_filters" varchar,
  	"no_results_title" varchar,
  	"no_results_text" varchar,
  	"view_publication" varchar,
  	"original_article" varchar,
  	"read_more" varchar,
  	"back_to_list" varchar,
  	"authors_label" varchar,
  	"published_in" varchar,
  	"category_label" varchar,
  	"related_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_publications_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_publications_page_v_locales" (
  	"version_title" varchar,
  	"version_lead" varchar,
  	"version_lead_secondary" varchar,
  	"version_search_placeholder" varchar,
  	"version_filters_label" varchar,
  	"version_all_categories" varchar,
  	"version_filter_by_line" varchar,
  	"version_filter_by_year" varchar,
  	"version_clear_filters" varchar,
  	"version_no_results_title" varchar,
  	"version_no_results_text" varchar,
  	"version_view_publication" varchar,
  	"version_original_article" varchar,
  	"version_read_more" varchar,
  	"version_back_to_list" varchar,
  	"version_authors_label" varchar,
  	"version_published_in" varchar,
  	"version_category_label" varchar,
  	"version_related_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "news_page_locales" (
  	"title" varchar,
  	"lead" varchar,
  	"read_more" varchar,
  	"back_to_list" varchar,
  	"related_title" varchar,
  	"source_link" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_news_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_news_page_v_locales" (
  	"version_title" varchar,
  	"version_lead" varchar,
  	"version_read_more" varchar,
  	"version_back_to_list" varchar,
  	"version_related_title" varchar,
  	"version_source_link" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "research_index" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "research_index_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_research_index_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_research_index_v_locales" (
  	"version_eyebrow" varchar,
  	"version_title" varchar,
  	"version_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "management_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "management_page_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"lead" varchar,
  	"direction_title" varchar,
  	"executive_title" varchar,
  	"back_to_team" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_management_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_management_page_v_locales" (
  	"version_eyebrow" varchar,
  	"version_title" varchar,
  	"version_lead" varchar,
  	"version_direction_title" varchar,
  	"version_executive_title" varchar,
  	"version_back_to_team" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "mission_vision" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "mission_vision_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_mission_vision_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_mission_vision_v_locales" (
  	"version_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "governance_locales" ADD CONSTRAINT "governance_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."governance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_governance_v_locales" ADD CONSTRAINT "_governance_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_governance_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "collaborations_mechanisms" ADD CONSTRAINT "collaborations_mechanisms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."collaborations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "collaborations_locales" ADD CONSTRAINT "collaborations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."collaborations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_collaborations_v_version_mechanisms" ADD CONSTRAINT "_collaborations_v_version_mechanisms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_collaborations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_collaborations_v_locales" ADD CONSTRAINT "_collaborations_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_collaborations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transfer_objectives" ADD CONSTRAINT "transfer_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."transfer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transfer_locales" ADD CONSTRAINT "transfer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."transfer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_transfer_v_version_objectives" ADD CONSTRAINT "_transfer_v_version_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_transfer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_transfer_v_locales" ADD CONSTRAINT "_transfer_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_transfer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_locales" ADD CONSTRAINT "_events_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_locales" ADD CONSTRAINT "initiatives_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_initiatives_v_locales" ADD CONSTRAINT "_initiatives_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_initiatives_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "communications_locales" ADD CONSTRAINT "communications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."communications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_communications_v_locales" ADD CONSTRAINT "_communications_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_communications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_locales" ADD CONSTRAINT "contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_v_locales" ADD CONSTRAINT "_contact_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "public_policy_locales" ADD CONSTRAINT "public_policy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."public_policy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_public_policy_v_locales" ADD CONSTRAINT "_public_policy_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_public_policy_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_page_locales" ADD CONSTRAINT "publications_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_page_v_locales" ADD CONSTRAINT "_publications_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_page_locales" ADD CONSTRAINT "news_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_page_v_locales" ADD CONSTRAINT "_news_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_index_locales" ADD CONSTRAINT "research_index_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research_index"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_research_index_v_locales" ADD CONSTRAINT "_research_index_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_research_index_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "management_page_locales" ADD CONSTRAINT "management_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."management_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_management_page_v_locales" ADD CONSTRAINT "_management_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_management_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mission_vision_locales" ADD CONSTRAINT "mission_vision_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mission_vision"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_mission_vision_v_locales" ADD CONSTRAINT "_mission_vision_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_mission_vision_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "governance_locales_locale_parent_id_unique" ON "governance_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_governance_v_created_at_idx" ON "_governance_v" USING btree ("created_at");
  CREATE INDEX "_governance_v_updated_at_idx" ON "_governance_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_governance_v_locales_locale_parent_id_unique" ON "_governance_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "collaborations_mechanisms_order_idx" ON "collaborations_mechanisms" USING btree ("_order");
  CREATE INDEX "collaborations_mechanisms_parent_id_idx" ON "collaborations_mechanisms" USING btree ("_parent_id");
  CREATE INDEX "collaborations_mechanisms_locale_idx" ON "collaborations_mechanisms" USING btree ("_locale");
  CREATE UNIQUE INDEX "collaborations_locales_locale_parent_id_unique" ON "collaborations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_collaborations_v_version_mechanisms_order_idx" ON "_collaborations_v_version_mechanisms" USING btree ("_order");
  CREATE INDEX "_collaborations_v_version_mechanisms_parent_id_idx" ON "_collaborations_v_version_mechanisms" USING btree ("_parent_id");
  CREATE INDEX "_collaborations_v_version_mechanisms_locale_idx" ON "_collaborations_v_version_mechanisms" USING btree ("_locale");
  CREATE INDEX "_collaborations_v_created_at_idx" ON "_collaborations_v" USING btree ("created_at");
  CREATE INDEX "_collaborations_v_updated_at_idx" ON "_collaborations_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_collaborations_v_locales_locale_parent_id_unique" ON "_collaborations_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "transfer_objectives_order_idx" ON "transfer_objectives" USING btree ("_order");
  CREATE INDEX "transfer_objectives_parent_id_idx" ON "transfer_objectives" USING btree ("_parent_id");
  CREATE INDEX "transfer_objectives_locale_idx" ON "transfer_objectives" USING btree ("_locale");
  CREATE UNIQUE INDEX "transfer_locales_locale_parent_id_unique" ON "transfer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_transfer_v_version_objectives_order_idx" ON "_transfer_v_version_objectives" USING btree ("_order");
  CREATE INDEX "_transfer_v_version_objectives_parent_id_idx" ON "_transfer_v_version_objectives" USING btree ("_parent_id");
  CREATE INDEX "_transfer_v_version_objectives_locale_idx" ON "_transfer_v_version_objectives" USING btree ("_locale");
  CREATE INDEX "_transfer_v_created_at_idx" ON "_transfer_v" USING btree ("created_at");
  CREATE INDEX "_transfer_v_updated_at_idx" ON "_transfer_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_transfer_v_locales_locale_parent_id_unique" ON "_transfer_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_events_v_locales_locale_parent_id_unique" ON "_events_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "initiatives_locales_locale_parent_id_unique" ON "initiatives_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_initiatives_v_created_at_idx" ON "_initiatives_v" USING btree ("created_at");
  CREATE INDEX "_initiatives_v_updated_at_idx" ON "_initiatives_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_initiatives_v_locales_locale_parent_id_unique" ON "_initiatives_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "communications_locales_locale_parent_id_unique" ON "communications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_communications_v_created_at_idx" ON "_communications_v" USING btree ("created_at");
  CREATE INDEX "_communications_v_updated_at_idx" ON "_communications_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_communications_v_locales_locale_parent_id_unique" ON "_communications_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_locales_locale_parent_id_unique" ON "contact_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contact_v_created_at_idx" ON "_contact_v" USING btree ("created_at");
  CREATE INDEX "_contact_v_updated_at_idx" ON "_contact_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_contact_v_locales_locale_parent_id_unique" ON "_contact_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_services_v_locales_locale_parent_id_unique" ON "_services_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "public_policy_locales_locale_parent_id_unique" ON "public_policy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_public_policy_v_created_at_idx" ON "_public_policy_v" USING btree ("created_at");
  CREATE INDEX "_public_policy_v_updated_at_idx" ON "_public_policy_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_public_policy_v_locales_locale_parent_id_unique" ON "_public_policy_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "publications_page_locales_locale_parent_id_unique" ON "publications_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_publications_page_v_created_at_idx" ON "_publications_page_v" USING btree ("created_at");
  CREATE INDEX "_publications_page_v_updated_at_idx" ON "_publications_page_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_publications_page_v_locales_locale_parent_id_unique" ON "_publications_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "news_page_locales_locale_parent_id_unique" ON "news_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_news_page_v_created_at_idx" ON "_news_page_v" USING btree ("created_at");
  CREATE INDEX "_news_page_v_updated_at_idx" ON "_news_page_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_news_page_v_locales_locale_parent_id_unique" ON "_news_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "research_index_locales_locale_parent_id_unique" ON "research_index_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_research_index_v_created_at_idx" ON "_research_index_v" USING btree ("created_at");
  CREATE INDEX "_research_index_v_updated_at_idx" ON "_research_index_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_research_index_v_locales_locale_parent_id_unique" ON "_research_index_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "management_page_locales_locale_parent_id_unique" ON "management_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_management_page_v_created_at_idx" ON "_management_page_v" USING btree ("created_at");
  CREATE INDEX "_management_page_v_updated_at_idx" ON "_management_page_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_management_page_v_locales_locale_parent_id_unique" ON "_management_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "mission_vision_locales_locale_parent_id_unique" ON "mission_vision_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_mission_vision_v_created_at_idx" ON "_mission_vision_v" USING btree ("created_at");
  CREATE INDEX "_mission_vision_v_updated_at_idx" ON "_mission_vision_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_mission_vision_v_locales_locale_parent_id_unique" ON "_mission_vision_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "governance" CASCADE;
  DROP TABLE "governance_locales" CASCADE;
  DROP TABLE "_governance_v" CASCADE;
  DROP TABLE "_governance_v_locales" CASCADE;
  DROP TABLE "collaborations_mechanisms" CASCADE;
  DROP TABLE "collaborations" CASCADE;
  DROP TABLE "collaborations_locales" CASCADE;
  DROP TABLE "_collaborations_v_version_mechanisms" CASCADE;
  DROP TABLE "_collaborations_v" CASCADE;
  DROP TABLE "_collaborations_v_locales" CASCADE;
  DROP TABLE "transfer_objectives" CASCADE;
  DROP TABLE "transfer" CASCADE;
  DROP TABLE "transfer_locales" CASCADE;
  DROP TABLE "_transfer_v_version_objectives" CASCADE;
  DROP TABLE "_transfer_v" CASCADE;
  DROP TABLE "_transfer_v_locales" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_locales" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "_events_v_locales" CASCADE;
  DROP TABLE "initiatives" CASCADE;
  DROP TABLE "initiatives_locales" CASCADE;
  DROP TABLE "_initiatives_v" CASCADE;
  DROP TABLE "_initiatives_v_locales" CASCADE;
  DROP TABLE "communications" CASCADE;
  DROP TABLE "communications_locales" CASCADE;
  DROP TABLE "_communications_v" CASCADE;
  DROP TABLE "_communications_v_locales" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "contact_locales" CASCADE;
  DROP TABLE "_contact_v" CASCADE;
  DROP TABLE "_contact_v_locales" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_locales" CASCADE;
  DROP TABLE "public_policy" CASCADE;
  DROP TABLE "public_policy_locales" CASCADE;
  DROP TABLE "_public_policy_v" CASCADE;
  DROP TABLE "_public_policy_v_locales" CASCADE;
  DROP TABLE "publications_page" CASCADE;
  DROP TABLE "publications_page_locales" CASCADE;
  DROP TABLE "_publications_page_v" CASCADE;
  DROP TABLE "_publications_page_v_locales" CASCADE;
  DROP TABLE "news_page" CASCADE;
  DROP TABLE "news_page_locales" CASCADE;
  DROP TABLE "_news_page_v" CASCADE;
  DROP TABLE "_news_page_v_locales" CASCADE;
  DROP TABLE "research_index" CASCADE;
  DROP TABLE "research_index_locales" CASCADE;
  DROP TABLE "_research_index_v" CASCADE;
  DROP TABLE "_research_index_v_locales" CASCADE;
  DROP TABLE "management_page" CASCADE;
  DROP TABLE "management_page_locales" CASCADE;
  DROP TABLE "_management_page_v" CASCADE;
  DROP TABLE "_management_page_v_locales" CASCADE;
  DROP TABLE "mission_vision" CASCADE;
  DROP TABLE "mission_vision_locales" CASCADE;
  DROP TABLE "_mission_vision_v" CASCADE;
  DROP TABLE "_mission_vision_v_locales" CASCADE;`)
}
