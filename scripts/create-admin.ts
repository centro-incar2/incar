/**
 * Alta del primer administrador del panel (bootstrap).
 *
 * El panel no permite crear cuentas sin estar autenticado como administrador,
 * así que la primera cuenta de cada entorno (y la promoción del usuario que
 * existía antes de introducirse el campo `role`) se resuelven por aquí, usando
 * la Local API, que no pasa por el control de acceso.
 *
 * Es idempotente: si el correo ya existe, lo promueve a administrador y
 * actualiza la contraseña solo cuando se entrega una nueva.
 *
 * Ejecutar con:
 *   npm run create-admin -- <email> <contraseña> "<nombre>"
 *
 * Contra producción, anteponiendo las credenciales del entorno:
 *   DATABASE_URI=... PAYLOAD_SECRET=... npm run create-admin -- ...
 */
import { getPayload } from "payload";
import config from "@payload-config";

const [email, password, name] = process.argv.slice(2);

const usage = () => {
  console.error(
    'Uso: npm run create-admin -- <email> <contraseña> "<nombre>"\n' +
      "La contraseña debe tener al menos 8 caracteres.",
  );
  process.exit(1);
};

if (!email || !email.includes("@") || !password || password.length < 8) usage();

const createAdmin = async () => {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    const user = existing.docs[0];
    await payload.update({
      collection: "users",
      id: user.id,
      data: {
        role: "admin",
        ...(name ? { name } : {}),
        ...(password ? { password } : {}),
      },
    });
    payload.logger.info(`Usuario ${email} promovido a administrador.`);
  } else {
    await payload.create({
      collection: "users",
      data: {
        email,
        password,
        name: name || email,
        role: "admin",
      },
    });
    payload.logger.info(`Administrador ${email} creado.`);
  }

  process.exit(0);
};

createAdmin().catch((error) => {
  console.error("No se pudo crear el administrador:", error);
  process.exit(1);
});
