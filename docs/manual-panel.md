# Manual del panel de administración — INCAR²

Guía para el equipo de INCAR² que publica y actualiza el contenido del sitio
**https://incar2.cl**. No requiere conocimientos técnicos.

---

## 1. Entrar al panel

El panel está en **https://incar2.cl/admin**.

No hay ningún enlace hacia él desde el sitio público: se entra escribiendo esa
dirección en el navegador, igual que en WordPress. Conviene guardarla en
favoritos.

Si olvidas la contraseña, un administrador puede restablecerla desde
**Usuarios**.

### Dos niveles de acceso

| Rol | Puede |
|-----|-------|
| **Editor** | Crear, editar y borrar contenido: noticias, publicaciones, imágenes, documentos, integrantes y textos de las páginas. |
| **Administrador** | Todo lo anterior **y además** crear usuarios y cambiar roles. |

El rol por defecto al crear una cuenta nueva es *editor*. Solo un administrador
puede convertir a alguien en administrador.

---

## 2. Lo primero que hay que entender: los dos idiomas

Todo el sitio existe en **español** e **inglés**. En el panel, arriba a la
derecha de cada formulario hay un selector de idioma (**es / en**).

- Escribes el texto en español, cambias el selector a **en**, escribes la
  versión en inglés, y guardas.
- **Los dos idiomas se guardan juntos con un solo botón "Guardar".**

### Qué pasa si dejas un idioma vacío

Depende del tipo de contenido, y la diferencia importa:

- **En los textos de las páginas** (Inicio, Quiénes Somos, etc.): si dejas un
  campo vacío, el sitio muestra el texto original que ya venía. Nunca queda un
  espacio en blanco.
- **En textos largos de personas** (biografías, proyectos): si solo cargas el
  español, la sección simplemente **no aparece** en la versión en inglés. Esto
  es deliberado: es preferible ocultar una sección a mostrar un párrafo en
  español bajo un título en inglés.

---

## 3. Cuándo se ven los cambios en el sitio

**De inmediato.** Al guardar, la página correspondiente se actualiza sola en
pocos segundos. No hay que avisar a nadie ni "volver a publicar" el sitio.

Si no ves el cambio, recarga la página del sitio con `Ctrl + Shift + R`
(Windows) o `Cmd + Shift + R` (Mac).

---

## 4. Publicar una noticia

1. En el menú lateral, entra a **Noticias** → botón **Crear nuevo**.
2. Completa:
   - **Título**
   - **Fecha** — determina el orden: las más recientes salen primero.
   - **Extracto** — el resumen de 2 o 3 líneas que se ve en la tarjeta del
     listado. Sale cortado a tres líneas, así que conviene que sea breve.
   - **Imagen** — se elige de la biblioteca o se sube en el momento
     (ver §7).
   - **Texto alternativo de la imagen** — describe qué se ve en la foto. Lo
     leen las personas ciegas y lo usa Google. No lo dejes vacío.
   - **Contenido** — el cuerpo de la nota.
   - **Enlace a la nota original** *(opcional)* — si la noticia fue publicada
     en otro sitio, aquí va esa dirección y aparece un botón "Ver nota
     original".
3. Cambia el selector a **en** y repite título, extracto y contenido.
4. **Guardar**.

> El **enlace corto (slug)** se genera solo a partir del título y forma la
> dirección de la noticia. Si cambias el título de una nota ya publicada, la
> dirección cambia y los enlaces que otros hayan compartido dejan de
> funcionar. Corrige títulos con criterio una vez publicada la nota.

### El editor de texto

La barra de herramientas permite negrita, cursiva, listas, subtítulos y
enlaces. Recomendación: **no pegues texto directamente desde Word**, porque
arrastra formato invisible. Pega primero en el Bloc de notas / TextEdit y de
ahí al panel, o usa `Ctrl/Cmd + Shift + V` (pegar sin formato).

---

## 5. Publicar una publicación científica

En **Publicaciones** → **Crear nuevo**:

- **Título**, **Autores**, **Revista**, **Año** y **Fecha**.
- **Línea de investigación** — se elige de la lista de las 8 líneas. Determina
  el ícono de la tarjeta y permite filtrar en el buscador de la página.
- **Enlace (DOI)** — la dirección del artículo original.
- **Resumen** y **Contenido** — bilingües.

> Si completas el **Contenido**, la publicación tendrá su propia página de
> detalle dentro del sitio. Si lo dejas vacío, la tarjeta enlaza directamente
> al DOI externo. Las dos formas son válidas; la primera mantiene a la persona
> dentro del sitio de INCAR².

---

## 6. Integrantes y equipo de gestión

Dos secciones separadas: **Integrantes de investigación** (los de las 8 líneas)
y **Equipo de gestión**.

Cada ficha tiene nombre, cargo, correo, foto, biografía, títulos, proyectos
destacados y enlaces (LinkedIn, ORCID, Google Scholar, ResearchGate).

- **Foto**: si una persona no tiene, el sitio muestra el isotipo del centro. No
  hay que hacer nada especial.
- **Orden**: el campo **Orden** decide la posición en la grilla; el número más
  bajo va primero. Está numerado de 10 en 10 (10, 20, 30…) justamente para
  poder intercalar a alguien nuevo sin renumerar a todos: para poner una
  persona entre la 20 y la 30, dale 25.
- **Línea de investigación**: define en qué página aparece la ficha.

---

## 7. Imágenes y documentos

Hay tres bibliotecas distintas y conviene no confundirlas:

| Sección | Para qué |
|---|---|
| **Imágenes** | Fotos del sitio (noticias, fichas, páginas). Solo imágenes. |
| **Archivos PDF** | Los archivos PDF en sí. |
| **Documentos** | La ficha de cada documento de Políticas Públicas: título, descripción y a qué PDF corresponde. |

Para subir un policy brief hay que hacer **dos pasos**: primero cargar el PDF en
**Archivos PDF**, después crear su ficha en **Documentos** y elegir ahí el
archivo. En la ficha se indica si es *policy brief*, *asesoría parlamentaria* u
*otro documento*, que son las tres pestañas de la página.

El **peso del archivo se calcula solo** — no hay que escribirlo.

### Antes de subir una imagen

- Ponle un nombre de archivo con sentido (`seminario-srs-2026.jpg`, no
  `IMG_4821.jpg`).
- Evita subir fotos de 8 MB salidas de la cámara: con 1500–2000 px de ancho
  basta y el sitio carga mucho más rápido.
- Completa siempre el texto alternativo.

---

## 8. Editar los textos de las páginas

En el menú lateral, bajo **Páginas**, está cada página del sitio (Inicio,
Quiénes Somos, Gobernanza, Colaboraciones, Eventos, Contacto…). Los campos
están agrupados en secciones plegables que siguen el orden visual de la página.

Las **Líneas de investigación** están aparte, como una lista de 8: se entra a la
línea que se quiere modificar y se edita su texto.

> **Lo que no se edita desde el panel:** el diseño, los menús, los logotipos,
> las sedes de contacto y el texto institucional del pie de página. Eso es
> código, y cambiarlo requiere al equipo técnico.

### Historial de cambios

Cada página guarda las últimas 50 versiones. Si algo sale mal, en la pestaña
**Versiones** se puede ver una versión anterior y restaurarla.

---

## 9. Reglas de estilo del centro

Tres acuerdos que se aplican a **todo** el contenido nuevo:

1. **"INCAR²" se escribe siempre con el 2 en superíndice.** Nunca "INCAR2".
   Se copia y pega desde aquí: `INCAR²`
2. **ANID nunca va sola.** El logotipo correcto es el conjunto
   MinCiencia + ANID, que ya está en el encabezado y el pie de todas las
   páginas.
3. **Todo contenido va en los dos idiomas**, salvo que se decida
   explícitamente lo contrario.

---

## 10. Problemas frecuentes

**"Guardé y no veo el cambio en el sitio."**
Recarga forzando (`Ctrl/Cmd + Shift + R`). Si sigue igual después de un minuto,
revisa que estuvieras editando el idioma correcto.

**"El texto en inglés salió en español."**
Cambiaste el selector de idioma después de escribir, o lo escribiste con el
selector en *es*. Revisa ambas versiones.

**"Borré algo sin querer."**
Si es una página, restaura desde **Versiones** (§8). Si es una noticia o una
ficha completa, avisa al equipo técnico: se puede recuperar desde el respaldo
de la base de datos, pero no es automático.

**"No puedo crear usuarios."**
Tu cuenta es de tipo *editor*. Pídeselo a un administrador.

---

## 11. A quién recurrir

Para todo lo que no se resuelve desde el panel —diseño, páginas nuevas,
errores del sitio, recuperar contenido borrado— hay que contactar al equipo
técnico responsable del mantenimiento.
