# Traspaso técnico — Sitio INCAR²

Documento de entrega del sitio **https://incar2.cl**. Inventario de servicios,
accesos que deben cambiar de titular y procedimientos de operación.

---

## 1. Qué se entrega

| Componente | Detalle |
|---|---|
| Sitio público | 182 páginas, bilingüe es/en, https://incar2.cl |
| Panel de administración | https://incar2.cl/admin (Payload CMS 3) |
| Código fuente | Este repositorio |
| Manual del panel | [`docs/manual-panel.md`](manual-panel.md) |
| Material original | ~565 MB de fotos, TIFF y PDF en bruto — se entrega aparte, **no** está en el repositorio |

## 2. Arquitectura

```
Navegador → Vercel (Next.js 16) → PostgreSQL (Neon)      ← contenido editable
                                → Vercel Blob            ← imágenes y PDF subidos
```

- **Framework:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4.
- **Idiomas:** next-intl v4, rutas localizadas (`/quienes-somos` ↔ `/en/about-us`).
- **CMS:** Payload 3 embebido en la misma aplicación.
- **Analítica:** Google Analytics 4 (`G-WT0NLH1LFZ`).

## 3. Servicios y titularidad

Todo lo siguiente está **hoy a nombre del proveedor** y debe pasar a INCAR²/UdeC.

| Servicio | Estado actual | Acción de traspaso |
|---|---|---|
| Dominio `incar2.cl` | Registrado en NIC.cl | Cambio de titular en NIC.cl |
| DNS | Nameservers de Vercel (`ns1/ns2.vercel-dns.com`) | Se mueve con el proyecto |
| Hosting | Vercel, equipo `kmilodigital`, proyecto `incar` | Transferir el proyecto al equipo de INCAR² |
| Base de datos | Neon (integración de Vercel) | Se traspasa con el proyecto de Vercel |
| Almacenamiento | Vercel Blob, store `incar-media` | Ídem |
| Analítica | Propiedad GA4 | Transferir a una cuenta Google de INCAR² |
| Search Console | Propiedad verificada por etiqueta HTML | Agregar a INCAR² como propietario |
| Repositorio | Local, sin remoto | Crear repositorio en la organización de INCAR² |

> **Costos recurrentes:** dominio (anual, NIC.cl), plan de Vercel, Neon y
> almacenamiento Blob. Definir quién los asume tras la entrega.

## 4. Credenciales

Se entregan **por canal seguro, nunca por correo ni en este repositorio**:

- `DATABASE_URL` — cadena de conexión de Neon.
- `PAYLOAD_SECRET` — firma las sesiones del panel.
- `BLOB_READ_WRITE_TOKEN` — almacenamiento de archivos.
- Usuario administrador del panel.

**Tras el traspaso hay que:**

1. Rotar `PAYLOAD_SECRET` (invalida todas las sesiones abiertas, incluidas las
   del proveedor).
2. Crear las cuentas de administrador de INCAR² en el panel.
3. Eliminar las cuentas del proveedor (`camilo.rodriguez.ara@gmail.com`) y la
   cuenta de desarrollo `admin@incar.cl` si existiera en producción.

## 5. Operación

### Desplegar

```bash
vercel --prod --yes        # sube el directorio y publica
```

Al conectar el repositorio a Vercel, esto pasa a ser automático con cada push a
`main`, que es lo recomendable.

### Desarrollo local

```bash
npm install
cp .env.example .env.local     # completar valores
npm run db                     # PostgreSQL local aislado (terminal aparte)
npm run dev                    # http://localhost:3000 · panel en /admin
```

### Base de datos

```bash
npm run payload migrate        # aplicar migraciones pendientes
npm run check-db               # estado de la conexión y conteo de registros
npm run create-admin -- <email> <contraseña> "<nombre>"
```

## 6. Advertencias operativas

Cosas que ya costaron tiempo y conviene no redescubrir:

1. **El CLI de Vercel sobrescribe `.env.local` sin avisar** (`vercel env pull`,
   `vercel blob create-store`, integraciones). Una vez lo dejó apuntando a la
   base de **producción**: un `npm run dev` habría escrito sobre datos reales.
   Revisar el archivo después de cualquier comando `vercel`.
2. **Tras modificar plugins o colecciones de Payload hay que ejecutar
   `npm run payload:importmap`.** Si no, el panel se abre **completamente en
   blanco** y el servidor responde 200 igual, así que solo se detecta abriéndolo
   en un navegador.
3. **Las migraciones se corren contra la conexión sin pool**
   (`DATABASE_URL_UNPOOLED`), con un archivo de entorno aparte.
4. **Node 24:** las migraciones generadas traen tipos y valores en un mismo
   `import` y fallan. Hay que separar `import type` de `import { sql }`.
5. **Auditar imágenes con navegador:** el `loading="lazy"` hace que parezcan
   rotas si se miden demasiado pronto. Hay que recorrer la página y esperar ~3 s.
6. **Verificar analítica:** gtag agrupa los envíos; con menos de 5 s de espera
   se obtienen falsos negativos.

## 7. Estado y pendientes conocidos

**Funcionando y verificado en producción:**

- Sitio bilingüe completo, panel operativo, publicación sin redesplegar.
- GA4 midiendo (incluida la navegación interna).
- Search Console verificado.
- `www` redirige al dominio sin www; `robots.txt` protege el panel y mantiene
  indexables los PDF de Políticas Públicas.

**Pendientes:**

| Pendiente | Naturaleza |
|---|---|
| Formulario de contacto sin backend | Se muestra, no envía. Falta decidir destino de los mensajes. |
| Sin banner de consentimiento de cookies | GA4 instala cookies; la Ley 21.719 rige desde diciembre de 2026. |
| Sin páginas de privacidad y cookies | Legal. |
| Política de respaldos no definida | Neon y Blob no tienen respaldo probado. |
| Organigrama del centro | INCAR² no lo entregó; queda un espacio reservado en Gobernanza. |
| Traducciones al inglés sin validar | Varias secciones fueron traducidas por el proveedor. |
| Logotipos internacionales | Se muestran como una franja única; lo ideal es recibirlos por separado. |
