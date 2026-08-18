/**
 * Policy Briefs de INCAR² ("Recomendaciones desde la ciencia para políticas públicas").
 *
 * Los títulos son VERBATIM del documento entregado por INCAR (`seccion PB INCAR2`),
 * incluidas sus tildes y mayúsculas originales. Los PDF viven en
 * `public/policy-briefs/` con nombre estable `policy-brief-NN.pdf`.
 *
 * `sizeMB` se muestra en el botón de descarga: son archivos pesados (hasta 28 MB),
 * y avisar del peso antes de descargar es una cortesía básica de UX.
 */
export interface PolicyBrief {
  /** Número correlativo del brief, tal como lo publica INCAR. */
  number: number;
  /** Título verbatim (español; el documento no trae versión en inglés). */
  title: string;
  /** Ruta pública del PDF. */
  file: string;
  /** Peso aproximado en MB, para advertirlo en el botón. */
  sizeMB: number;
  /** Resumen ejecutivo adicional, cuando INCAR lo entregó por separado. */
  summaryFile?: string;
}

export const policyBriefs: PolicyBrief[] = [
  {
    number: 21,
    title:
      "Fortaleciendo la Educación Media Técnica Profesional en Acuicultura: Lecciones de una Década del INCAR",
    file: "/policy-briefs/policy-brief-21.pdf",
    sizeMB: 5.6,
  },
  {
    number: 20,
    title:
      "Ostras en Chile: Oportunidades y Desafíos para una Diversificación Acuícola",
    file: "/policy-briefs/policy-brief-20.pdf",
    sizeMB: 3.2,
  },
  {
    number: 19,
    title: "Aportes para la Nueva Ley de Acuicultura",
    file: "/policy-briefs/policy-brief-19.pdf",
    sizeMB: 1.5,
  },
  {
    number: 18,
    title:
      "¿Que Motiva la Decisión del Tipo y Densidad de Siembra en la Industria Salmonera Chilena? Un Análisis Retrospectivo de la Regulación Chilena",
    file: "/policy-briefs/policy-brief-18.pdf",
    sizeMB: 1.6,
  },
  {
    number: 17,
    title:
      "Recomendaciones para Abordar la Interacción entre Pesca y Acuicultura en la Nueva Legislación Pesquera y Acuícola",
    file: "/policy-briefs/policy-brief-17.pdf",
    sizeMB: 5.7,
    summaryFile: "/policy-briefs/policy-brief-17-resumen.pdf",
  },
  {
    number: 16,
    title:
      "El Desarrollo de Nuevas Estrategias de Control y Tratamiento de Patologías Bacterianas en Salmones debe Considerar la Generación de Biofilm",
    file: "/policy-briefs/policy-brief-16.pdf",
    sizeMB: 2.7,
  },
  {
    number: 15,
    title:
      "Innovaciones en la Genotipificación de la Piscirickettsiosis para un Enfoque Integrado en su Gestión en la Salmonicultura",
    file: "/policy-briefs/policy-brief-15.pdf",
    sizeMB: 2.9,
  },
  {
    number: 14,
    title:
      "Aditivos Fitogénicos Aplicados a Dietas Funcionales para el Mejoramiento de la Salud de Salmónidos",
    file: "/policy-briefs/policy-brief-14.pdf",
    sizeMB: 2.3,
  },
  {
    number: 13,
    title:
      "Evaluación del Impacto Socioeconómico de la Industria del Salmón. Pobreza y Distribución del Ingreso en Zonas Costeras Rurales en Los Lagos, Chile",
    file: "/policy-briefs/policy-brief-13.pdf",
    sizeMB: 0.8,
  },
  {
    number: 12,
    title:
      "Oportunidades y Desafíos para la Acuicultura de Pequeña Escala: Reflexiones desde los Actores",
    file: "/policy-briefs/policy-brief-12.pdf",
    sizeMB: 2.5,
  },
  {
    number: 11,
    title:
      "Propuesta para Establecer un Sistema que Regule la Máxima Producción Posible de Salmonídeos en Ecosistemas Marinos Atendiendo a su Capacidad de Carga",
    file: "/policy-briefs/policy-brief-11.pdf",
    sizeMB: 5.1,
  },
  {
    number: 10,
    title:
      "Propuesta Metodológica para Optimizar el Uso de la Macrofauna Bentónica como Bio-Indicador en la Evaluación de Perturbaciones Antropogénicas",
    file: "/policy-briefs/policy-brief-10.pdf",
    sizeMB: 1,
  },
  {
    number: 9,
    title:
      "Propuesta Metodológica para el Monitoreo de Bancos Naturales de Mejillones en Áreas de Captación de Semillas para la Mitilicultura",
    file: "/policy-briefs/policy-brief-09.pdf",
    sizeMB: 1.2,
  },
  {
    number: 8,
    title:
      "Pisciculturas de Agua Dulce: El Gran Pendiente de la Industria Salmonera Chilena",
    file: "/policy-briefs/policy-brief-08.pdf",
    sizeMB: 2.6,
  },
  {
    number: 7,
    title:
      "Recomendaciones Mínimas para la Recaptura y Seguimiento de un Escape de Salmonídeos de Cultivo",
    file: "/policy-briefs/policy-brief-07.pdf",
    sizeMB: 4.9,
  },
  {
    number: 6,
    title:
      "Efectos Socioeconómicos y Respuestas Público-Privadas de Corto Plazo ante la Crisis del COVID 19 en el Sector Salmonicultor. Una Fotografía de la Experiencia Internacional",
    file: "/policy-briefs/policy-brief-06.pdf",
    sizeMB: 28.4,
  },
  {
    number: 5,
    title:
      "Descifrando el Genoma del Piojo del Salmón Caligus Rogercresseyi, para un Control Efectivo y Sustentable",
    file: "/policy-briefs/policy-brief-05.pdf",
    sizeMB: 5.8,
  },
  {
    number: 4,
    title:
      "El Impacto del Tratamiento de Caligus sobre los Costos Unitarios de Producción en Centros Heterogeneos de Producción de Salmones en Chile",
    file: "/policy-briefs/policy-brief-04.pdf",
    sizeMB: 6.4,
  },
  {
    number: 3,
    title:
      "Administración y Defensa de Recursos de Propiedad Común: Evidencia Experimental desde las Áreas de Manejo y Explotación de Recursos Bentónicos (AMERB)",
    file: "/policy-briefs/policy-brief-03.pdf",
    sizeMB: 1.8,
  },
  {
    number: 2,
    title:
      'Respuesta de los Productores de Semilla de Mejillones ("Choritos") a los Incentivos Económicos',
    file: "/policy-briefs/policy-brief-02.pdf",
    sizeMB: 7.3,
  },
  {
    number: 1,
    title:
      "Evaluación de la Vulnerabilidad de la Salmonicultura al Cambio Climático y Medidas para Reducirla",
    file: "/policy-briefs/policy-brief-01.pdf",
    sizeMB: 1.3,
  },
];
