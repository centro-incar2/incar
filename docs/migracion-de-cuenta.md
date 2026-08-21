# Migración a las cuentas de INCAR²

Cómo mover el sitio desde la cuenta de la agencia (`kmilodigital`) a cuentas
propias de INCAR², sin que el sitio deje de funcionar en ningún momento.

Complementa a `traspaso.md`, que describe la arquitectura y la operación diaria.

---

## 1. Lo que hay que mover

Un proyecto de Vercel **no lleva consigo** ni la base de datos ni el
almacenamiento: ambos pertenecen a la **cuenta**, no al proyecto. Si se
transfiere el proyecto sin más, el sitio nuevo arranca sin contenido y sin una
sola imagen.

| Pieza | Dónde está hoy | Cómo se mueve |
|---|---|---|
| Código | GitHub privado `kmilodigital/incar` | Transferir el repositorio |
| Base de datos | Neon (vía marketplace de Vercel) | `scripts/migrate-db.mjs` |
| Archivos | Vercel Blob, store `incar-media` (~157 MB, ~450 archivos) | `scripts/migrate-blob.mjs` |
| Variables de entorno | Proyecto Vercel | Se recrean a mano |
| Dominio `incar2.cl` | Nameservers de Vercel; registrado fuera | Al final del todo |
| GA4 y Search Console | Cuentas de Google | Traspaso aparte |

> **El contenido vivo no se puede regenerar.** Los scripts `seed:*` cargan el
> material inicial (5 noticias), no lo que INCAR² ha publicado después (70
> noticias y subiendo). La base se copia; no se vuelve a sembrar.

## 2. Antes de empezar

1. **Cuentas que INCAR² debe crear**: organización en GitHub, cuenta en Vercel
   y, si quiere la base fuera de Vercel, cuenta en Neon. **Las gratuitas
   bastan**: el sitio está preparado para funcionar en el plan Hobby.
2. **Quién administra el dominio**: hace falta poder cambiar los nameservers.

> **Sobre el plan de Vercel.** El sitio ya no depende de las cuotas de pago. El
> optimizador de imágenes está desactivado (`images.unoptimized: true`): tenía
> cuota mensual, se agotó en agosto de 2026 y dejó el sitio con las fotos rotas.
> Servirlas sin optimizar sale barato porque ya vienen optimizadas — 41 KB de
> media, 1,1 MB en la página más cargada. **No reactivarlo** en un plan gratuito.
> Lo que sí conviene tener presente del plan Hobby: es para uso personal y no
> comercial según los términos de Vercel, y el límite de 4,5 MB por archivo
> subido es de la plataforma, no del plan.

## 3. Orden de los pasos

El principio: **el dominio se mueve al final**. Hasta entonces el sitio actual
sigue sirviendo con normalidad y todo se prueba en una URL provisional.

### 3.1 Código

1. En GitHub: *Settings* → *Transfer ownership* → organización de INCAR².
2. Actualizar el remoto local: `git remote set-url origin <nueva-url>`.
3. Cada persona que despliegue necesita su propio token *fine-grained* con
   acceso a ese repositorio y permiso **Contents: Read and write**.

### 3.2 Infraestructura en la cuenta de INCAR²

4. Crear el proyecto en Vercel importando el repositorio.
5. Provisionar **Neon** y crear el store de **Blob**.
6. Cargar las variables de entorno (ver `traspaso.md` §4). `PAYLOAD_SECRET` debe
   ser **nuevo**: `openssl rand -base64 32`.

### 3.3 Datos

7. **Crear el esquema** en la base nueva con las migraciones versionadas:

   ```bash
   DATABASE_URI=<destino-sin-pooler> npm run payload -- migrate
   ```

8. **Copiar los datos** (usar siempre las cadenas *sin pooler*):

   ```bash
   DB_ORIGEN=<origen-sin-pooler> DB_DESTINO=<destino-sin-pooler> \
     node scripts/migrate-db.mjs --dry-run     # inspección, no escribe
   DB_ORIGEN=... DB_DESTINO=... node scripts/migrate-db.mjs
   ```

   Vacía el destino y copia todo dentro de una transacción: si algo falla, no
   deja nada a medias. Al terminar compara el número de filas tabla por tabla.

9. **Copiar los archivos**:

   ```bash
   BLOB_ORIGEN=<token-origen> BLOB_DESTINO=<token-destino> \
     node scripts/migrate-blob.mjs --dry-run
   BLOB_ORIGEN=... BLOB_DESTINO=... node scripts/migrate-blob.mjs
   ```

   Conserva el nombre de cada archivo, que es lo que la base referencia. Es
   reanudable: lo ya copiado se omite.

> No hay que reescribir URLs. La base guarda rutas **relativas** del propio
> sitio (`/api/media/file/<archivo>`), nunca la dirección del almacenamiento.

### 3.4 Verificación, antes de tocar el dominio

10. Desplegar en la cuenta nueva y probar sobre la URL `*.vercel.app`:

    ```bash
    npm run typecheck && npm run build
    BASE=https://<nueva-url>.vercel.app npm run verify:images
    npm run verify:pages && npm run verify:members && npm run verify:documents
    npm run verify:download-names
    ```

11. A mano: entrar al panel, publicar una noticia de prueba y comprobar que
    aparece en el sitio sin redesplegar. Borrarla después.

### 3.5 Dominio y analítica

12. Añadir `incar2.cl` y `www.incar2.cl` al proyecto nuevo y cambiar los
    nameservers. La propagación puede tardar horas.
13. Comprobar que `www` redirige al dominio sin `www`, y revisar `sitemap.xml`
    y `robots.txt`.
14. Traspasar GA4 y Search Console, y volver a verificar la propiedad.

### 3.6 Cierre

15. Dejar el proyecto antiguo **desplegado y sin tocar** al menos una semana,
    como red de seguridad.
16. Pasada esa semana: dar de baja el proyecto, la base y el store antiguos, y
    revocar los tokens de la agencia (`incar-deploy` en GitHub).

## 4. Lo que puede salir mal

| Riesgo | Cómo evitarlo |
|---|---|
| El sitio queda sin imágenes | Copiar el Blob **antes** de mover el dominio y comprobarlo con `verify:images` |
| Se pierde contenido publicado | No usar los `seed:*` contra la base nueva: sobrescriben con el material inicial |
| Migración a medias | Los scripts trabajan en transacción y verifican al final; ante un fallo, revierten |
| Caída durante el cambio de DNS | Mover el dominio al final, con el sitio nuevo ya verificado |
| Las cuotas vuelven a romper imágenes | No reactivar el optimizador ni revertir `CmsImage` (trampa 11 de `CLAUDE.md`); comprobar con `verify:images` |

## 5. Después del traspaso

- Los tokens caducan: anotar sus fechas y renovarlos antes.
- El almacenamiento admite 4 MB por archivo; el aviso está en el panel.
- Sigue pendiente lo listado en `traspaso.md` §7 (cookies, privacidad,
  respaldos).
