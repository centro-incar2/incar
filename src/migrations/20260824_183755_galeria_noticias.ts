// Tipos y valores se importan por separado: el runtime nativo de Node elimina
// tipos sin analizar el módulo y, mezclados, intenta resolverlos como exports
// reales y falla. Aplicar lo mismo a cada migración nueva.
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "news_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "news_gallery_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "news_gallery" ADD CONSTRAINT "news_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_gallery" ADD CONSTRAINT "news_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_gallery_locales" ADD CONSTRAINT "news_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_gallery"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "news_gallery_order_idx" ON "news_gallery" USING btree ("_order");
  CREATE INDEX "news_gallery_parent_id_idx" ON "news_gallery" USING btree ("_parent_id");
  CREATE INDEX "news_gallery_image_idx" ON "news_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "news_gallery_locales_locale_parent_id_unique" ON "news_gallery_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "news_gallery" CASCADE;
  DROP TABLE "news_gallery_locales" CASCADE;`)
}
