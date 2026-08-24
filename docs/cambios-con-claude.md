# Hacer cambios en el sitio con Claude Code

Los cambios de contenido —noticias, textos, integrantes, documentos— se hacen
**desde el panel**, en `incar2.cl/admin`, sin instalar nada.

Esta guía es para lo otro: cambios de **estructura**. Agregar una sección,
cambiar cómo se ve algo, sumar campos al panel. Eso toca el código, y el
proyecto está preparado para que lo hagan ustedes con **Claude Code**, sin
depender de un programador.

No hace falta saber programar. Sí hace falta perder el miedo a la Terminal:
todo se hace escribiendo en español y Claude ejecuta.

---

## Preparación (una sola vez)

### 1. Instalar lo necesario

- **Node.js 24** — https://nodejs.org (elegir la versión LTS)
- **Claude Code** — https://claude.com/claude-code (traer la suscripción de
  Claude)

Git ya viene instalado en Mac. En Windows: https://git-scm.com

### 2. Descargar el proyecto

Abrir la Terminal y escribir:

```bash
cd ~/Documents
git clone https://github.com/centro-incar2/incar.git
cd incar
npm install
```

La última línea tarda unos minutos la primera vez.

### 3. Crear el archivo de configuración

Dentro de la carpeta `incar`, crear un archivo llamado **`.env.local`** con
este contenido:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URI=postgres://incar:incar@localhost:5432/incar
PAYLOAD_SECRET=cualquier-texto-largo-y-aleatorio
BLOB_READ_WRITE_TOKEN=
```

Es una base de datos **local, de prueba**, separada del sitio real. Nada de lo
que hagan ahí afecta a incar2.cl.

> Si no saben crear el archivo, pídanselo a Claude: *"créame el archivo
> .env.local con la configuración de desarrollo local"*.

---

## Trabajar en un cambio

### Arrancar

Dos ventanas de Terminal, ambas dentro de la carpeta `incar`:

```bash
# Ventana 1 — la base de datos de prueba
npm run db
```

```bash
# Ventana 2 — Claude
claude
```

### Pedir el cambio

Escribir lo que quieren en español, con el mayor detalle posible. Por ejemplo:

> Quiero que las noticias puedan tener varias fotos y se muestren como un
> carrusel al final de la nota. Lee CLAUDE.md antes de empezar.

**Pedirle siempre que lea `CLAUDE.md` primero.** Ese archivo tiene las
particularidades del proyecto y evita errores que cuestan horas.

### Ver el resultado antes de publicar

Pídanle a Claude que levante el sitio en el computador:

> Levanta el sitio en local para que pueda verlo

Se abre en `http://localhost:3000`. Ahí revisan tranquilos. **Todavía no está
publicado.**

### Publicar

Cuando estén conformes:

> Verifica que todo esté bien y súbelo

Claude comprueba que el proyecto compile, sube el cambio, y el sitio real se
actualiza solo en unos minutos.

---

## Cosas que conviene saber

**Si el cambio agrega campos al panel**, hace falta actualizar la base de datos
real. Pídanselo a Claude directamente:

> Este cambio necesita migración. Aplícala a la base de producción.

Va a pedirles la conexión de la base, que está en Vercel → Storage → la base
Neon.

**Si algo sale mal**, díganselo tal cual:

> El sitio se ve roto después del último cambio, revísalo

Todo cambio queda registrado y se puede deshacer.

**Nunca borren el archivo `CLAUDE.md`.** Es lo que hace que Claude entienda
este proyecto en particular.

---

## Cuando conviene pedir ayuda externa

Claude Code resuelve la mayoría de los cambios. Vale la pena buscar apoyo
técnico si:

- El cambio implica rediseñar varias páginas a la vez
- Hay que integrar un servicio externo nuevo
- Algo se rompió y Claude no logra arreglarlo en un par de intentos

Para el resto —una sección nueva, un campo más, un ajuste visual— pueden
hacerlo ustedes.
