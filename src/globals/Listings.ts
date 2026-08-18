import { pageGlobal, section } from "./page-fields";

/**
 * Textos de encabezado de las páginas de listado: Publicaciones, Noticias,
 * Líneas de Investigación, Equipo de Gestión y Misión y Visión.
 *
 * Su CONTENIDO ya se administra en otra parte (colecciones de Publicaciones,
 * Noticias e Integrantes); aquí solo están los títulos y bajadas que los
 * enmarcan, más las etiquetas visibles de navegación de cada listado.
 *
 * Se deja FUERA `Publications.count`, que no es un texto sino una regla de
 * pluralización con sintaxis ICU (`{count, plural, ...}`): editarla desde el
 * panel rompería la página con un error de formato.
 */

export const PublicationsPage = pageGlobal({
  slug: "publications-page",
  label: "Publicaciones (textos)",
  description:
    "Encabezado y etiquetas de la página de publicaciones. Los papers se administran en la colección Publicaciones.",
  fields: [
    section("Encabezado", [
      { name: "title", label: "Título" },
      { name: "lead", label: "Bajada", kind: "textarea" },
      { name: "leadSecondary", label: "Bajada secundaria", kind: "textarea" },
    ]),
    section("Buscador y filtros", [
      { name: "searchPlaceholder", label: "Texto del buscador" },
      { name: "filtersLabel", label: "Etiqueta de filtros" },
      { name: "allCategories", label: "Opción “Todas”" },
      { name: "filterByLine", label: "Filtro · Línea" },
      { name: "filterByYear", label: "Filtro · Año" },
      { name: "clearFilters", label: "Botón · Limpiar filtros" },
      { name: "noResultsTitle", label: "Sin resultados · Título" },
      { name: "noResultsText", label: "Sin resultados · Texto", kind: "textarea" },
    ]),
    section("Ficha de publicación", [
      { name: "viewPublication", label: "Botón · Ver publicación" },
      { name: "originalArticle", label: "Botón · Ver artículo original" },
      { name: "readMore", label: "Botón · Leer más" },
      { name: "backToList", label: "Volver al listado" },
      { name: "authorsLabel", label: "Etiqueta · Autores" },
      { name: "publishedIn", label: "Etiqueta · Publicado en" },
      { name: "categoryLabel", label: "Etiqueta · Categoría" },
      { name: "relatedTitle", label: "Título · Relacionadas" },
    ]),
  ],
});

export const NewsPage = pageGlobal({
  slug: "news-page",
  label: "Noticias (textos)",
  description:
    "Encabezado y etiquetas de la página de noticias. Las notas se administran en la colección Noticias.",
  fields: [
    section("Encabezado y etiquetas", [
      { name: "title", label: "Título" },
      { name: "lead", label: "Bajada", kind: "textarea" },
      { name: "readMore", label: "Botón · Leer más" },
      { name: "backToList", label: "Volver al listado" },
      { name: "relatedTitle", label: "Título · Otras noticias" },
      { name: "sourceLink", label: "Botón · Ver nota original" },
    ]),
  ],
});

export const ResearchIndexPage = pageGlobal({
  slug: "research-index",
  label: "Líneas de Investigación (índice)",
  description: "Encabezado de la página que lista las ocho líneas de investigación.",
  fields: [
    section("Encabezado", [
      { name: "eyebrow", label: "Antetítulo" },
      { name: "title", label: "Título" },
      { name: "lead", label: "Bajada", kind: "textarea" },
    ]),
  ],
});

export const ManagementPage = pageGlobal({
  slug: "management-page",
  label: "Equipo de Gestión (textos)",
  description:
    "Encabezado de la página de equipo de gestión. Las personas se administran en la colección Equipo de gestión.",
  fields: [
    section("Encabezado y grupos", [
      { name: "eyebrow", label: "Antetítulo" },
      { name: "title", label: "Título" },
      { name: "lead", label: "Bajada", kind: "textarea" },
      { name: "directionTitle", label: "Título · Dirección" },
      { name: "executiveTitle", label: "Título · Equipo ejecutivo", kind: "textarea" },
      { name: "backToTeam", label: "Volver al equipo" },
    ]),
  ],
});

export const MissionVisionPage = pageGlobal({
  slug: "mission-vision",
  label: "Misión y Visión",
  description: "Título de la página. Los textos de misión y visión están en Quiénes Somos.",
  fields: [section("Encabezado", [{ name: "title", label: "Título" }])],
});
