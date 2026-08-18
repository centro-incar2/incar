/**
 * Lista las tablas y las migraciones aplicadas de la base configurada.
 *
 * Consulta SQL directa, sin inicializar Payload: el adaptador de Postgres activa
 * `push` cuando NODE_ENV no es "production", así que abrir Payload solo para
 * inspeccionar puede modificar el esquema sin querer. Este script es de solo
 * lectura y sirve para saber en qué estado quedó una base antes de migrar.
 *
 * Uso: node --env-file=<archivo> scripts/db-tables.mjs
 */
import pg from "pg";

const connectionString = process.env.DATABASE_URI || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Falta DATABASE_URI/DATABASE_URL.");
  process.exit(1);
}

const client = new pg.Client({ connectionString });

const main = async () => {
  await client.connect();

  const { rows: tables } = await client.query(
    `SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' ORDER BY table_name`,
  );
  console.log(`Tablas (${tables.length}):`);
  for (const { table_name } of tables) console.log("  " + table_name);

  const hasMigrations = tables.some((t) => t.table_name === "payload_migrations");
  if (hasMigrations) {
    const { rows } = await client.query(
      `SELECT name, batch FROM payload_migrations ORDER BY id`,
    );
    console.log("\nMigraciones registradas:");
    for (const row of rows) console.log(`  ${row.name}  (lote ${row.batch})`);
  }

  for (const table of ["research_members", "management_team"]) {
    if (tables.some((t) => t.table_name === table)) {
      const { rows } = await client.query(`SELECT count(*)::int AS n FROM "${table}"`);
      console.log(`\n${table}: ${rows[0].n} filas`);
    }
  }

  await client.end();
};

main().catch(async (error) => {
  console.error("Error consultando la base:", error.message);
  await client.end().catch(() => {});
  process.exit(1);
});
