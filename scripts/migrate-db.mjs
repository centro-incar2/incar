/**
 * Copia los DATOS de una base PostgreSQL a otra, tabla por tabla.
 *
 * Se usa al traspasar el proyecto a la cuenta de INCAR². La base también
 * pertenece a la cuenta, no al proyecto, así que no viaja con una transferencia
 * de Vercel; y el contenido vivo (69 noticias, 51 integrantes, 27 documentos…)
 * ya NO se puede regenerar con los scripts de carga, que traen solo el material
 * inicial.
 *
 * NO copia el esquema. El destino debe tener las tablas creadas de antemano
 * ejecutando las migraciones versionadas del proyecto, que son la definición
 * autoritativa:
 *
 *   DATABASE_URI=<destino-sin-pool> npm run payload -- migrate
 *
 * Se hizo así en vez de con `pg_dump` porque este equipo no tiene el cliente de
 * Postgres instalado (ni Homebrew), y obligar a instalarlo antes de un traspaso
 * es un obstáculo evitable: `pg` ya es dependencia del proyecto.
 *
 * Uso:
 *   DB_ORIGEN=postgres://... DB_DESTINO=postgres://... \
 *     node scripts/migrate-db.mjs [--dry-run]
 *
 * Usar SIEMPRE las cadenas SIN pooler (`DATABASE_URL_UNPOOLED` en Neon).
 */
import pg from "pg";

const ORIGEN = process.env.DB_ORIGEN;
const DESTINO = process.env.DB_DESTINO;
const SIMULAR = process.argv.includes("--dry-run");

if (!ORIGEN || !DESTINO) {
  console.error("Faltan DB_ORIGEN y/o DB_DESTINO.");
  process.exit(1);
}
if (ORIGEN === DESTINO) {
  console.error("El origen y el destino son la misma base.");
  process.exit(1);
}

/**
 * Tablas que NO se copian:
 * - `payload_migrations`: el destino escribe las suyas al correr las migraciones.
 *   Copiarlas duplicaría el registro y confundiría a Payload.
 * - bloqueos y caché: estado transitorio del panel.
 * - `users_sessions`: las sesiones se firman con PAYLOAD_SECRET, que en la
 *   cuenta nueva será otro, así que llegarían inválidas.
 */
const EXCLUIDAS = new Set([
  "payload_migrations",
  "payload_locked_documents",
  "payload_locked_documents_rels",
  "payload_kv",
  "users_sessions",
]);

const tablas = async (c) => {
  const { rows } = await c.query(
    `SELECT table_name FROM information_schema.tables
      WHERE table_schema='public' AND table_type='BASE TABLE'
      ORDER BY table_name`);
  return rows.map((r) => r.table_name).filter((t) => !EXCLUIDAS.has(t));
};

const columnas = async (c, tabla) => {
  const { rows } = await c.query(
    `SELECT column_name FROM information_schema.columns
      WHERE table_schema='public' AND table_name=$1 ORDER BY ordinal_position`, [tabla]);
  return rows.map((r) => r.column_name);
};

const contar = async (c, tabla) => {
  const { rows } = await c.query(`SELECT count(*)::int AS n FROM "${tabla}"`);
  return rows[0].n;
};

const run = async () => {
  const origen = new pg.Client({ connectionString: ORIGEN });
  const destino = new pg.Client({ connectionString: DESTINO });
  await origen.connect();
  await destino.connect();

  const deOrigen = await tablas(origen);
  const deDestino = new Set(await tablas(destino));

  const faltantes = deOrigen.filter((t) => !deDestino.has(t));
  if (faltantes.length) {
    console.error("El destino no tiene estas tablas; corre antes las migraciones:");
    for (const f of faltantes) console.error("   " + f);
    process.exit(1);
  }

  console.log(`tablas a copiar: ${deOrigen.length}\n`);

  if (SIMULAR) {
    let total = 0;
    for (const t of deOrigen) {
      const n = await contar(origen, t);
      total += n;
      if (n) console.log(`  ${t.padEnd(42)} ${n}`);
    }
    console.log(`\nSimulación: se copiarían ${total} filas. No se escribió nada.`);
    await origen.end(); await destino.end();
    return;
  }

  const resumen = [];
  try {
    await destino.query("BEGIN");
    // Difiere las claves foráneas: así el orden de las tablas deja de importar.
    await destino.query("SET session_replication_role = replica");

    // Se vacía TODO de una sola vez, antes de insertar nada. Hacerlo tabla por
    // tabla dentro del bucle corrompía la copia: el CASCADE de una tabla borra
    // las que dependen de ella, incluidas las que ya se habían rellenado.
    await destino.query(
      `TRUNCATE TABLE ${deOrigen.map((t) => `"${t}"`).join(", ")} CASCADE`);

    for (const tabla of deOrigen) {
      const cols = await columnas(origen, tabla);
      const { rows } = await origen.query(`SELECT * FROM "${tabla}"`);

      if (rows.length) {
        const lista = cols.map((c) => `"${c}"`).join(", ");
        // Postgres admite 65535 parámetros por sentencia.
        const porLote = Math.max(1, Math.floor(60000 / cols.length));
        for (let i = 0; i < rows.length; i += porLote) {
          const lote = rows.slice(i, i + porLote);
          const valores = [];
          const marcas = lote.map((fila, f) =>
            "(" + cols.map((c, k) => {
              valores.push(fila[c]);
              return `$${f * cols.length + k + 1}`;
            }).join(", ") + ")");
          await destino.query(
            `INSERT INTO "${tabla}" (${lista}) VALUES ${marcas.join(", ")}`, valores);
        }
      }
      resumen.push([tabla, rows.length]);
    }

    // Deja los contadores de id donde corresponde; si no, el primer alta choca.
    await destino.query(`
      DO $$
      DECLARE r record;
      BEGIN
        FOR r IN
          SELECT c.table_name AS t, c.column_name AS col,
                 pg_get_serial_sequence(quote_ident(c.table_name), c.column_name) AS seq
            FROM information_schema.columns c
           WHERE c.table_schema='public'
             AND pg_get_serial_sequence(quote_ident(c.table_name), c.column_name) IS NOT NULL
        LOOP
          EXECUTE format('SELECT setval(%L, COALESCE((SELECT MAX(%I) FROM %I), 0) + 1, false)',
                         r.seq, r.col, r.t);
        END LOOP;
      END $$;`);

    await destino.query("SET session_replication_role = DEFAULT");
    await destino.query("COMMIT");
  } catch (error) {
    await destino.query("ROLLBACK");
    console.error("\nREVERTIDO, no se cambió nada en el destino:", error.message);
    await origen.end(); await destino.end();
    process.exit(1);
  }

  console.log("Filas copiadas:");
  for (const [t, n] of resumen) if (n) console.log(`  ${t.padEnd(42)} ${n}`);

  console.log("\nVerificación (origen vs destino):");
  let fallos = 0;
  for (const [tabla] of resumen) {
    const a = await contar(origen, tabla);
    const b = await contar(destino, tabla);
    if (a !== b) { console.log(`  ✗ ${tabla}: ${a} → ${b}`); fallos += 1; }
  }
  console.log(fallos === 0 ? "✓ Todas las tablas coinciden." : `✗ ${fallos} tabla(s) con diferencias.`);

  await origen.end();
  await destino.end();
  process.exit(fallos === 0 ? 0 : 1);
};

run().catch((error) => {
  console.error("Falló la migración:", error);
  process.exit(1);
});
