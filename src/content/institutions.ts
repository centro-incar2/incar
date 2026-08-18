/**
 * Instituciones que conforman el centro, separadas en los dos grupos oficiales:
 * la patrocinante (UdeC) y las asociadas (UNAB · UTalca · UACh).
 *
 * ANID no se incluye aquí: su lockup oficial (Ministerio de Ciencia + ANID) ya
 * aparece en el header y en el footer de todas las páginas, por indicación de
 * INCAR².
 *
 * Los archivos de `public/images/logos/` son las versiones blancas entregadas
 * por cada institución; UNAB y UACh solo llegaron en negro monocromo, por lo que
 * se recolorearon a blanco conservando la forma original (ver README de assets).
 * `heightClass` compensa las distintas proporciones para que todos los logos se
 * perciban del mismo tamaño óptico en la franja.
 */
export interface Institution {
  name: string;
  logo: string;
  url: string;
  width: number;
  height: number;
  heightClass: string;
}

export const sponsoringInstitutions: Institution[] = [
  {
    name: "Universidad de Concepción",
    logo: "/images/logos/udec.png",
    url: "https://www.udec.cl",
    width: 600,
    height: 197,
    heightClass: "h-11 w-auto sm:h-14",
  },
];

export const associatedInstitutions: Institution[] = [
  {
    name: "Universidad Andrés Bello",
    logo: "/images/logos/unab.png",
    url: "https://www.unab.cl",
    width: 600,
    height: 193,
    heightClass: "h-9 w-auto sm:h-12",
  },
  {
    name: "Universidad de Talca",
    logo: "/images/logos/utalca.png",
    url: "https://www.utalca.cl",
    width: 400,
    height: 493,
    heightClass: "h-12 w-auto sm:h-16",
  },
  {
    name: "Universidad Austral de Chile",
    logo: "/images/logos/uach.png",
    url: "https://www.uach.cl",
    width: 600,
    height: 348,
    heightClass: "h-10 w-auto sm:h-14",
  },
];
