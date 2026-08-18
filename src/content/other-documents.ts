/**
 * "Otros Documentos": informes técnicos y publicaciones especiales del INCAR².
 *
 * Título, fecha y descripción VERBATIM del documento entregado por INCAR
 * (`Otros Documentos.docx`). PDFs en `public/otros-documentos/`.
 *
 * Nota: el documento solo describe la "Propuesta de evaluación…"; los dos
 * anexos existen en la carpeta pero no tienen ficha, por lo que sus etiquetas
 * se derivaron del nombre de archivo (pendiente de confirmar con INCAR si
 * pertenecen a esta propuesta).
 */
export interface DocumentAnnex {
  label: string;
  file: string;
  sizeMB: number;
}

export interface OtherDocument {
  title: string;
  /** Fecha de publicación tal como la indica INCAR (texto libre). */
  date?: string;
  description?: string;
  file: string;
  sizeMB: number;
  annexes?: DocumentAnnex[];
}

export const otherDocuments: OtherDocument[] = [
  {
    title:
      "Propuesta de evaluación del desempeño ambiental de la salmonicultura chilena a escala de ecosistemas",
    date: "Octubre 2020",
    description:
      "Desarrollada por investigadores de INCAR en colaboración con WWF Chile. El documento presenta una propuesta técnica de indicadores ecosistémicos para evaluar el desempeño ambiental de la salmonicultura a nivel de paisaje, promoviendo una gestión que considere la capacidad de carga ecológica de los ecosistemas y la aplicación de enfoques precautorios para avanzar hacia una actividad más sustentable.",
    file: "/otros-documentos/propuesta-desempeno-ambiental.pdf",
    sizeMB: 8.0,
    annexes: [
      {
        label: "Anexo 1 — Agenda y resultados del taller (11-01-2020)",
        file: "/otros-documentos/anexo-1-taller.pdf",
        sizeMB: 0.4,
      },
      {
        label: "Anexo 2 — Tablas del informe",
        file: "/otros-documentos/anexo-2-tablas.pdf",
        sizeMB: 0.2,
      },
    ],
  },
];
