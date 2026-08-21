# Qué necesitamos de INCAR² para el traspaso

Instrucciones para el equipo de INCAR². Son cuatro cosas, todas dentro de su
propia cuenta de Vercel y sin costo.

Al terminar, la agencia hace la migración del contenido y solo entonces se
cambia el dominio. **El sitio actual sigue funcionando con normalidad durante
todo el proceso**: nada de esto lo afecta.

---

## 1. Crear el almacenamiento de archivos (Blob)

Aquí viven las fotos de las noticias y los PDF de Políticas Públicas.

1. Entrar a [vercel.com](https://vercel.com) con la cuenta nueva.
2. En el menú superior, ir a **Storage**.
3. **Create Database** → elegir **Blob**.
4. Nombre sugerido: `incar-media`. Región: la que ofrezca por defecto.
5. Crear.

## 2. Crear la base de datos (Neon)

Aquí vive el contenido: noticias, publicaciones, integrantes, documentos.

1. En la misma sección **Storage** → **Create Database**.
2. Elegir **Neon** (aparece como Postgres en el marketplace).
3. Aceptar los términos y crear. El plan gratuito es suficiente.

## 3. Crear una clave de acceso para la agencia

Permite subir el sitio a su cuenta sin compartir la contraseña. Es revocable en
cualquier momento y no da acceso al correo ni a la facturación.

1. Arriba a la derecha, avatar → **Account Settings**.
2. En el menú lateral, **Tokens**.
3. **Create Token**:
   - Nombre: `traspaso-agencia`
   - Scope: la cuenta de INCAR²
   - Expiración: 30 días
4. Copiar el valor (**solo se muestra una vez**).

## 4. Enviarnos tres datos

Desde el panel de Vercel, en cada recurso creado:

| Dato | Dónde está |
|---|---|
| Cadena de conexión de la base | Storage → la base Neon → pestaña de conexión (la variante **sin pooler**) |
| Token del almacenamiento | Storage → `incar-media` → `BLOB_READ_WRITE_TOKEN` |
| Clave de acceso | La del paso 3 |

> **Importante:** son credenciales. No enviarlas por correo ni por WhatsApp.
> Usar un gestor de contraseñas compartido, o un servicio de mensaje que se
> autodestruya. Cuando termine el traspaso, revocar la clave del paso 3.

---

## Sobre GitHub

La cuenta ya está creada. **El código se transfiere al final**, junto con el
dominio: mientras dure la migración la agencia necesita poder seguir publicando
correcciones. Avisaremos cuando corresponda.

## Qué pasa después

1. La agencia copia el contenido y los archivos a los recursos nuevos.
2. Se despliega el sitio en una dirección de prueba y se verifica completo.
3. Recién ahí se cambia `incar2.cl` para que apunte al sitio nuevo.
4. El sitio anterior queda intacto una semana, como respaldo.

## Mientras tanto, una tarea aparte

Hay **9 noticias sin fotografía**: los archivos se perdieron y hay que volver a
subirlos desde el panel.

**Importante:** hay que **subir un archivo nuevo**, no elegir una imagen de la
biblioteca. Peso máximo **4 MB** — si la foto pesa más, la carga falla sin
mensaje claro. Reducirla antes: 1600 px de ancho es suficiente.

Las noticias son:

1. Nuevo Policy Brief — relocalizaciones
2. Edición génica / Caligus
3. Segundo día de EpiAqua 2026
4. EpiAqua — herramientas genómicas
5. Expertos / especies nativas
6. Foro ACCESS Chile-Suecia 2026
7. Campamento Explora VA!
8. EpiAqua 2026 — líderes globales
9. CrispResist
