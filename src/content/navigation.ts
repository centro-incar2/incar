import type { StaticPathname } from "@/i18n/routing";

/**
 * Menú principal ÚNICO del sitio (una sola barra). Las etiquetas se resuelven
 * vía next-intl (namespace "Nav") y `href` usa las rutas canónicas de
 * i18n/routing.ts. Un item con `children` despliega un submenú.
 */
export interface NavItem {
  key: string;
  href?: StaticPathname;
  children?: NavItem[];
}

export const primaryNavigation: NavItem[] = [
  { key: "home", href: "/" },
  {
    key: "about",
    href: "/quienes-somos",
    children: [
      { key: "governance", href: "/gobernanza" },
      { key: "missionVision", href: "/mision-y-vision" },
      { key: "managementTeam", href: "/equipo-de-gestion" },
    ],
  },
  {
    key: "research",
    href: "/investigacion",
    children: [
      { key: "rl1", href: "/investigacion/nuevas-vacunas-para-peces" },
      { key: "rl2", href: "/investigacion/enfermedades-y-resistencia-antimicrobiana" },
      { key: "rl3", href: "/investigacion/soluciones-omicas" },
      { key: "rl4", href: "/investigacion/estres-y-bienestar-animal" },
      { key: "rl5", href: "/investigacion/impactos-en-ecosistemas" },
      { key: "rl6", href: "/investigacion/resiliencia-de-la-acuicultura" },
      { key: "rl7", href: "/investigacion/interacciones-sustentables" },
      { key: "rl8", href: "/investigacion/impactos-socioeconomicos" },
    ],
  },
  { key: "publications", href: "/publicaciones" },
  { key: "initiatives", href: "/iniciativas" },
  { key: "engagement", href: "/comunicaciones-y-vinculacion" },
  { key: "contact", href: "/contacto" },
];

/**
 * Lista para el footer: el menú principal más las secciones que ya no están en
 * la barra pero conviene mantener accesibles (noticias, eventos, políticas).
 */
export const mainNavigation: NavItem[] = [
  ...primaryNavigation,
  { key: "news", href: "/noticias" },
  { key: "events", href: "/eventos" },
  { key: "publicPolicy", href: "/politicas-publicas" },
  { key: "collaborations", href: "/colaboraciones" },
];
