/**
 * Cadena de conexión a PostgreSQL, única fuente para toda la app.
 *
 * Convivimos con dos nombres por razones ajenas al proyecto:
 * - `DATABASE_URI` es el que usa Payload por convención y el que define
 *   `.env.local` para el Postgres embebido de desarrollo.
 * - `DATABASE_URL` es el que inyecta la integración de Neon en Vercel, y no se
 *   puede renombrar sin copiar la credencial a mano (que además quedaría
 *   desincronizada si Neon la rota).
 *
 * Se prefiere `DATABASE_URI` para que un valor explícito en `.env.local` gane
 * sobre el heredado del entorno de Vercel.
 */
export const databaseUri = (): string =>
  process.env.DATABASE_URI || process.env.DATABASE_URL || "";

/** `true` cuando hay una base de datos configurada y alcanzable. */
export const hasDatabase = (): boolean => databaseUri().length > 0;

/**
 * `true` solo si la base apunta al Postgres local de desarrollo.
 *
 * Gobierna el `push` del adaptador, que sincroniza el esquema automáticamente.
 * Es cómodo en local, pero contra la base de producción es peligroso: basta
 * ejecutar un script de mantenimiento desde el equipo propio para que altere el
 * esquema por su cuenta y deje la base marcada como "modificada en dev", lo que
 * después bloquea las migraciones. El esquema de producción SOLO debe cambiar
 * mediante migraciones versionadas.
 */
export const isLocalDatabase = (): boolean => {
  const uri = databaseUri();
  if (!uri) return false;
  try {
    const { hostname } = new URL(uri.replace(/^postgres(ql)?:/, "http:"));
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
  } catch {
    // Una cadena que no se puede analizar no se trata como local: ante la duda,
    // no se toca el esquema.
    return false;
  }
};
