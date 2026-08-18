import type { Locale } from "@/i18n/routing";

/**
 * Áreas de servicios de INCAR². Contenido textual del documento oficial
 * "Servicios INCAR2 Scientific": cada área declara su servicio principal, el
 * detalle de prestaciones y los servicios estratégicos futuros.
 *
 * El documento llegó solo en español; las versiones en inglés son traducción
 * fiel (pendiente de validación por INCAR²).
 */
export interface ServiceArea {
  slug: string;
  number: number;
  name: Record<Locale, string>;
  /** Servicio principal que encabeza el área. */
  headline: Record<Locale, string>;
  services: Record<Locale, string[]>;
  future: Record<Locale, string[]>;
  image: string;
  imageAlt: Record<Locale, string>;
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: "salud-y-bienestar-animal",
    number: 1,
    name: {
      es: "Salud y Bienestar animal en acuicultura",
      en: "Animal Health and Welfare in aquaculture",
    },
    headline: {
      es: "Diagnóstico molecular y microbiológico de patógenos en peces.",
      en: "Molecular and microbiological diagnosis of fish pathogens.",
    },
    services: {
      es: [
        "Caracterización antigénica y genética de patógenos en peces.",
        "Identificación de patógenos emergentes y desarrollo de herramientas de diagnóstico específicas por especie.",
        "Análisis de susceptibilidad y resistencia a antimicrobianos.",
        "Evaluación de la efectividad de vacunas o tratamientos.",
        "Evaluación de los efectos de los antibióticos utilizados en la industria del salmón sobre las comunidades microbianas marinas.",
        "Monitoreo de la situación sanitaria de patógenos endémicos (ej., C. rogercresseyi, P. salmonis).",
        "Evaluación básica de indicadores de bienestar animal.",
        "Detección temprana de brotes de C. rogercresseyi en centros de cultivo de salmón para mejorar la gestión sanitaria.",
        "Capacitación técnica para profesionales del sector acuícola según las necesidades de cada empresa salmonera.",
        "Evaluación de la respuesta al estrés y del bienestar animal bajo condiciones reales de acuicultura.",
        "Servicios para peces orientados a la gestión de calendarios de vacunación y la validación de nuevos desarrollos tecnológicos, dirigidos a enfrentar desafíos productivos bajo condiciones reales de acuicultura (Estación de Quintay y Estación de Dichato).",
      ],
      en: [
        "Antigenic and genetic characterisation of fish pathogens.",
        "Identification of emerging pathogens and development of species-specific diagnostic tools.",
        "Antimicrobial susceptibility and resistance analysis.",
        "Assessment of the effectiveness of vaccines or treatments.",
        "Assessment of the effects of antibiotics used in the salmon industry on marine microbial communities.",
        "Monitoring of the sanitary status of endemic pathogens (e.g., C. rogercresseyi, P. salmonis).",
        "Basic assessment of animal welfare indicators.",
        "Early detection of C. rogercresseyi outbreaks at salmon farming sites to improve health management.",
        "Technical training for aquaculture professionals according to the needs of each salmon farming company.",
        "Assessment of stress response and animal welfare under real aquaculture conditions.",
        "Services for fish aimed at managing vaccination schedules and validating new technological developments, addressing production challenges under real aquaculture conditions (Quintay Station and Dichato Station).",
      ],
    },
    future: {
      es: [
        "Vacuna contra el piojo de mar, P. salmonis y tenacibaculosis.",
        "Vacunas para peces basadas en ADN/ARNm.",
        "Detección molecular de resistencia a fármacos.",
        "Servicio molecular para la detección de resistencia a antimicrobianos.",
        "Tratamiento no farmacológico basado en aditivos en la alimentación.",
      ],
      en: [
        "Vaccine against sea lice, P. salmonis and tenacibaculosis.",
        "DNA/mRNA-based fish vaccines.",
        "Molecular detection of drug resistance.",
        "Molecular service for the detection of antimicrobial resistance.",
        "Non-pharmacological treatment based on feed additives.",
      ],
    },
    image: "/images/lineas/rl1-1.webp",
    imageAlt: {
      es: "Siembra de placas de cultivo en el laboratorio de vacunas de INCAR²",
      en: "Plating of culture dishes at the INCAR² vaccine laboratory",
    },
  },
  {
    slug: "medio-ambiente-y-ecosistemas",
    number: 2,
    name: {
      es: "Medio Ambiente y Ecosistemas",
      en: "Environment and Ecosystems",
    },
    headline: {
      es: "Evaluación del impacto ambiental en sistemas de acuicultura.",
      en: "Assessment of environmental impact in aquaculture systems.",
    },
    services: {
      es: [
        "Monitoreo de comunidades microbianas en sedimentos y carga orgánica, con énfasis en antibióticos y otros compuestos.",
        "Desarrollo de indicadores estadísticos basados en datos públicos/privados para evaluar la salud del ecosistema.",
        "Tecnologías innovadoras para la optimización de los procesos de la industria del salmón.",
        "Estudios del fondo marino asociados a la salmonicultura.",
        "Servicios de análisis de biodiversidad microbiana.",
        "Consultoría en cumplimiento de normativas ambientales.",
      ],
      en: [
        "Monitoring of microbial communities in sediments and organic load, with emphasis on antibiotics and other compounds.",
        "Development of statistical indicators based on public/private data to assess ecosystem health.",
        "Innovative technologies for optimising salmon industry processes.",
        "Seabed studies associated with salmon farming.",
        "Microbial biodiversity analysis services.",
        "Consultancy on environmental regulatory compliance.",
      ],
    },
    future: {
      es: [
        "Estudios de ecosistemas para la producción de salmón en el sur de Chile.",
        "Modelos de Dinámica de Fluidos Computacional (CFD) para microlocalización.",
      ],
      en: [
        "Ecosystem studies for salmon production in southern Chile.",
        "Computational Fluid Dynamics (CFD) models for micro-siting.",
      ],
    },
    image: "/images/lineas/rl5-1.webp",
    imageAlt: {
      es: "Vista aérea de centros de cultivo en el sur de Chile",
      en: "Aerial view of farming sites in southern Chile",
    },
  },
  {
    slug: "socioeconomica-y-pequena-escala",
    number: 3,
    name: {
      es: "Área Socioeconómica y de Pequeña Escala",
      en: "Socioeconomic and Small-Scale Area",
    },
    headline: {
      es: "Diagnóstico socioeconómico de la acuicultura a pequeña escala.",
      en: "Socioeconomic diagnosis of small-scale aquaculture.",
    },
    services: {
      es: [
        "Estudios de impacto económico en el sector acuícola.",
        "Servicios de consultoría para organizaciones de pesca y acuicultura.",
        "Talleres de capacitación sobre mejores prácticas de producción.",
        "Apoyo técnico para la formalización de procesos productivos.",
        "Programas de diplomado, cursos de capacitación y servicios de consultoría para empresas salmoneras.",
      ],
      en: [
        "Economic impact studies in the aquaculture sector.",
        "Consultancy services for fisheries and aquaculture organisations.",
        "Training workshops on best production practices.",
        "Technical support for the formalisation of production processes.",
        "Diploma programmes, training courses and consultancy services for salmon farming companies.",
      ],
    },
    future: {
      es: [
        "Consultoría en aspectos socioeconómicos, gobernanza y dinámicas de mercado.",
      ],
      en: [
        "Consultancy on socioeconomic aspects, governance and market dynamics.",
      ],
    },
    image: "/images/lineas/rl8-2.webp",
    imageAlt: {
      es: "Buzo recolectando ostras en un cultivo de pequeña escala",
      en: "Diver harvesting oysters at a small-scale farming site",
    },
  },
];
