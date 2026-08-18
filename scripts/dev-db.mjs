/**
 * Postgres local aislado para desarrollo (Fase 3 — Payload CMS).
 *
 * Usa `embedded-postgres`, que descarga un binario de Postgres 17 dentro del
 * proyecto (`.postgres-bin`) y persiste los datos en `.postgres-data`. NO instala
 * nada a nivel de sistema y coincide con la versión de Postgres de Neon (prod).
 *
 * Uso:
 *   node scripts/dev-db.mjs        → inicializa (si hace falta), arranca y deja
 *                                     la instancia escuchando en localhost:5432.
 *
 * La instancia queda en primer plano; se detiene con Ctrl-C (SIGINT). Los datos
 * persisten entre reinicios. Credenciales fijas de desarrollo (ver DATABASE_URI
 * en .env.example) — nunca usar estos valores en producción.
 */
import { existsSync } from "node:fs";
import EmbeddedPostgres from "embedded-postgres";

const DATA_DIR = "./.postgres-data";
const DB_NAME = "incar";
const USER = "incar";
const PASSWORD = "incar";
const PORT = 5432;

const pg = new EmbeddedPostgres({
  databaseDir: DATA_DIR,
  user: USER,
  password: PASSWORD,
  port: PORT,
  persistent: true,
  authMethod: "scram-sha-256",
});

async function main() {
  // `initialise()` solo debe correr la primera vez (cuando el data dir no existe).
  const alreadyInitialised = existsSync(DATA_DIR);
  if (!alreadyInitialised) {
    console.log("→ Inicializando cluster de Postgres (primera vez)…");
    await pg.initialise();
  }

  console.log(`→ Arrancando Postgres en localhost:${PORT}…`);
  await pg.start();

  // La base `incar` puede no existir todavía; crearla es idempotente vía catch.
  try {
    await pg.createDatabase(DB_NAME);
    console.log(`→ Base de datos "${DB_NAME}" creada.`);
  } catch {
    // Ya existía: nada que hacer.
  }

  console.log(
    `✓ Postgres listo → postgres://${USER}:${PASSWORD}@localhost:${PORT}/${DB_NAME}`,
  );
  console.log("  (Ctrl-C para detener)");

  const shutdown = async (signal) => {
    console.log(`\n→ ${signal}: deteniendo Postgres…`);
    try {
      await pg.stop();
    } finally {
      process.exit(0);
    }
  };
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

main().catch((error) => {
  console.error("✗ Error al levantar Postgres local:", error);
  process.exit(1);
});
