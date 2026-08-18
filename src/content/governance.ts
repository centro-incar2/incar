import type { Locale } from "@/i18n/routing";

/**
 * Órganos de gobernanza de INCAR², según el documento oficial "Gobernanza".
 *
 * El Consejo Académico lo integran los Investigadores Principales, por lo que
 * cada miembro apunta con `memberSlug` a su ficha en `research-members.ts`: de
 * ahí salen su fotografía y el enlace a su perfil, sin duplicar datos.
 */
export interface CouncilMember {
  name: string;
  role: Record<Locale, string>;
  /** Ficha del integrante en research-members.ts (foto + perfil). */
  memberSlug: string;
}

export const academicCouncil: CouncilMember[] = [
  {
    name: "Dr. Cristian Gallardo Escárate",
    role: { es: "Director Centro INCAR²", en: "Director INCAR² Center" },
    memberSlug: "cristian-gallardo",
  },
  {
    name: "Dr. Ruben Avendaño Herrera",
    role: {
      es: "Director Alterno Centro INCAR²",
      en: "Deputy Director INCAR² Center",
    },
    memberSlug: "ruben-avendano",
  },
  {
    name: "Dra. Valentina Valenzuela Muñoz",
    role: { es: "Investigadora Principal RL1", en: "Principal Investigator RL1" },
    memberSlug: "valentina-valenzuela",
  },
  {
    name: "Dr. Juan Antonio Valdés",
    role: { es: "Investigador Principal RL4", en: "Principal Investigator RL4" },
    memberSlug: "juan-antonio-valdes",
  },
  {
    name: "Dr. Renato Quiñones Bergeret",
    role: { es: "Investigador Principal RL5", en: "Principal Investigator RL5" },
    memberSlug: "renato-quinones",
  },
  {
    name: "Dra. Doris Soto Benavides",
    role: { es: "Investigadora Principal RL6", en: "Principal Investigator RL6" },
    memberSlug: "doris-soto",
  },
  {
    name: "Dr. Carlos Molinet Flores",
    role: { es: "Investigador Principal RL7", en: "Principal Investigator RL7" },
    memberSlug: "carlos-molinet",
  },
  {
    name: "Dr. Carlos Chávez Rebolledo",
    role: { es: "Investigador Principal RL8", en: "Principal Investigator RL8" },
    memberSlug: "carlos-chavez",
  },
];

/**
 * Cargos que componen el Directorio, en el orden del documento. `logo` apunta al
 * archivo de `public/images/collab/` de la institución que representa cada cargo.
 */
export interface BoardSeat {
  logo: string;
  institution: string;
  role: Record<Locale, string>;
}

export const boardSeats: BoardSeat[] = [
  {
    logo: "u-concepcion",
    institution: "Universidad de Concepción",
    role: {
      es: "Vicerrectora de Investigación y Desarrollo",
      en: "Vice-Rector for Research and Development",
    },
  },
  {
    logo: "u-andres-bello",
    institution: "Universidad Andrés Bello",
    role: {
      es: "Vicerrectora de Investigación y Doctorado",
      en: "Vice-Rector for Research and Doctoral Studies",
    },
  },
  {
    logo: "u-talca",
    institution: "Universidad de Talca",
    role: { es: "Vicerrectora Académica", en: "Vice-Rector for Academic Affairs" },
  },
  {
    logo: "u-austral",
    institution: "Universidad Austral de Chile",
    role: {
      es: "Vicerrector de Investigación, Desarrollo y Creación Artística",
      en: "Vice-Rector for Research, Development and Artistic Creation",
    },
  },
  {
    logo: "amichile",
    institution: "AmiChile A.G.",
    role: { es: "Representante Ami Chile A.G.", en: "Ami Chile A.G. Representative" },
  },
  {
    logo: "intesal",
    institution: "INTESAL",
    role: { es: "Representante INTESAL", en: "INTESAL Representative" },
  },
  {
    logo: "sernapesca",
    institution: "SERNAPESCA",
    role: { es: "Representante SERNAPESCA", en: "SERNAPESCA Representative" },
  },
  {
    logo: "subpesca",
    institution: "SUBPESCA",
    role: { es: "Representante SUBPESCA", en: "SUBPESCA Representative" },
  },
  {
    logo: "incar2",
    institution: "INCAR²",
    role: { es: "Director Centro INCAR²", en: "INCAR² Center Director" },
  },
];
