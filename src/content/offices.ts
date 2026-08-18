/**
 * Reparticiones y laboratorios vinculados a INCAR² a lo largo de Chile.
 * Datos textuales del documento oficial "Formulario de contacto"; las líneas de
 * `address` se muestran tal como vienen en el documento y son idénticas en ambos
 * idiomas (solo se traduce la etiqueta del teléfono). Se conserva el orden del
 * documento, que recorre el país de norte a sur.
 */
export interface Office {
  city: string;
  address: string[];
  phone?: string;
}

export const offices: Office[] = [
  {
    city: "Viña del Mar",
    address: [
      "Quillota 980",
      "Universidad Andrés Bello sede Viña del Mar",
      "Viña del Mar",
    ],
  },
  {
    city: "Quintay",
    address: [
      "Centro de Investigaciones Marinas de Quintay CIMARQ",
      "Universidad Andrés Bello",
      "Ex Ballenera de Quintay s/n",
      "Quintay",
    ],
    phone: "56-32-2845168",
  },
  {
    city: "Santiago",
    address: [
      "Laboratorio de Biotecnología Molecular",
      "Universidad Andrés Bello sede República",
      "Av. República 330",
      "Santiago",
    ],
  },
  {
    city: "Talca",
    address: [
      "Facultad de Economía y Negocios",
      "Universidad de Talca",
      "Lircay sin número",
      "Talca",
    ],
  },
  {
    city: "Concepción",
    address: [
      "Centro Interdisciplinario para la Investigación Acuícola (INCAR²)",
      "Barrio Universitario S/N°, Campus Concepción UdeC (costado Centro Biotecnología)",
      "Concepción, Chile",
    ],
    phone: "+56 41 2204402",
  },
  {
    city: "Valdivia",
    address: [
      "Instituto de Bioquímica y Microbiología",
      "Campus Isla Teja,",
      "Universidad Austral de Chile",
      "Valdivia",
    ],
    phone: "+56-63-2221107",
  },
  {
    city: "Puerto Montt",
    address: [
      "Instituto de Acuicultura y Medio Ambiente",
      "Universidad Austral de Chile",
      "Los Pinos s/n Balneario Pelluco",
      "Puerto Montt",
    ],
  },
];
