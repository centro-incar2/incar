/**
 * Asesorías Parlamentarias de la Biblioteca del Congreso Nacional (BCN).
 *
 * Documentos técnicos elaborados por investigadores del INCAR² en apoyo a la
 * labor legislativa. Títulos VERBATIM del documento entregado por INCAR
 * (`Asesorías Parlamentarias - Biblioteca del Congreso Nacional.docx`); se
 * omiten solo las comillas tipográficas con que el documento envuelve cada
 * título. PDFs en `public/asesorias-parlamentarias/`.
 */
export interface ParliamentaryAdvisory {
  /** Número correlativo de la asesoría, según INCAR. */
  number: number;
  /** Título verbatim. */
  title: string;
  file: string;
  sizeMB: number;
}

export const parliamentaryAdvisories: ParliamentaryAdvisory[] = [
  {
    number: 3,
    title:
      "Las vacunas para peces: Análisis de la experiencia de Chile, Noruega y España",
    file: "/asesorias-parlamentarias/asesoria-03.pdf",
    sizeMB: 0.5,
  },
  {
    number: 2,
    title:
      "Localización de Centros de Cultivo y Planificación Espacial Marina: Experiencia de Canadá, Escocia y Noruega",
    file: "/asesorias-parlamentarias/asesoria-02.pdf",
    sizeMB: 0.4,
  },
  {
    number: 1,
    title:
      "Recursos Genéticos Marinos en zonas más allá de la jurisdicción Nacional",
    file: "/asesorias-parlamentarias/asesoria-01.pdf",
    sizeMB: 0.8,
  },
];
