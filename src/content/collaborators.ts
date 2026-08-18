/**
 * Logos de colaboradores de INCAR², extraídos del mapa institucional oficial.
 * Cada logo vive en `public/images/collab/{slug}.png` (recorte sobre fondo
 * blanco). El grupo internacional se muestra como una franja única
 * (`internacionales.png`) porque la extracción individual desde la imagen plana
 * no es fiable; idealmente INCAR entregará esos logos por separado.
 *
 * Los grupos se reparten entre dos páginas: las instituciones que conforman el
 * centro y los aliados estratégicos pertenecen a **Gobernanza**, y las
 * colaboraciones nacionales e internacionales a **Colaboraciones**.
 */
export interface Collaborator {
  slug: string;
  name: string;
}

/**
 * Institución patrocinante, instituciones asociadas y ANID (página de
 * Gobernanza). ANID cierra la wincha por la derecha, como agencia que financia
 * el centro.
 */
export const memberInstitutions: Collaborator[] = [
  { slug: "u-concepcion", name: "Universidad de Concepción" },
  { slug: "u-andres-bello", name: "Universidad Andrés Bello" },
  { slug: "u-talca", name: "Universidad de Talca" },
  { slug: "u-austral", name: "Universidad Austral de Chile" },
  { slug: "anid", name: "ANID — Agencia Nacional de Investigación y Desarrollo" },
];

/** Aliados estratégicos del centro (página de Gobernanza). */
export const strategicAllyLogos: Collaborator[] = [
  { slug: "subpesca", name: "Subsecretaría de Pesca y Acuicultura" },
  { slug: "sernapesca", name: "SERNAPESCA" },
  { slug: "indespa", name: "INDESPA" },
  { slug: "ifop", name: "Instituto de Fomento Pesquero (IFOP)" },
  { slug: "intesal", name: "INTESAL — SalmonChile" },
  { slug: "consejo-salmon", name: "Consejo del Salmón" },
  { slug: "salmonicultores-magallanes", name: "Asociación de Salmonicultores de Magallanes A.G." },
  { slug: "amichile", name: "AmiChile" },
  { slug: "institute-aquaculture-stirling", name: "Institute of Aquaculture — University of Stirling" },
  { slug: "wwf", name: "WWF" },
];

/** Colaboraciones nacionales (página de Colaboraciones). */
export const nationalCollaborators: Collaborator[] = [
  { slug: "ucv", name: "Pontificia Universidad Católica de Valparaíso" },
  { slug: "ucn", name: "Universidad Católica del Norte" },
  { slug: "aquabench", name: "Aquabench" },
  { slug: "uoh", name: "Universidad de O’Higgins" },
  { slug: "puc", name: "Pontificia Universidad Católica de Chile" },
  { slug: "patagonia-biotech", name: "Patagonia Biotech Hub" },
  { slug: "u-chile", name: "Universidad de Chile" },
  { slug: "copas-coastal", name: "COPAS Coastal" },
  { slug: "ifop", name: "Instituto de Fomento Pesquero (IFOP)" },
  { slug: "umag", name: "Universidad de Magallanes — Instituto de la Patagonia" },
  { slug: "ciep", name: "CIEP" },
];
