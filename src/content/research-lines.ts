import type { Locale } from "@/i18n/routing";

/**
 * Ocho líneas de investigación de INCAR². Los títulos son textuales del sitio
 * original; los resúmenes son descriptores temáticos (no resultados específicos).
 * `short` es una etiqueta concisa (para píldoras/filtros); `href` apunta a la
 * subpágina de cada línea.
 */
export type LineAccent = "teal" | "navy" | "peach" | "slate";

export interface ResearchLine {
  number: number;
  slug: string;
  href: string;
  accent: LineAccent;
  title: Record<Locale, string>;
  short: Record<Locale, string>;
  summary: Record<Locale, string>;
}

export const researchLines: ResearchLine[] = [
  {
    number: 1,
    slug: "nuevas-vacunas-para-peces",
    href: "/investigacion/nuevas-vacunas-para-peces",
    accent: "teal",
    title: { es: "Nuevas vacunas para peces", en: "New fish vaccines" },
    short: { es: "Vacunas para Peces", en: "Fish Vaccines" },
    summary: {
      es: "Desarrollamos vacunas de nueva generación —proteínas recombinantes, ARNm y vacunas orales— como herramienta clave hacia una acuicultura más sostenible, eficiente y resiliente.",
      en: "We develop next-generation vaccines —recombinant proteins, mRNA and oral vaccines— as a key tool toward more sustainable, efficient and resilient aquaculture.",
    },
  },
  {
    number: 2,
    slug: "enfermedades-y-resistencia-antimicrobiana",
    href: "/investigacion/enfermedades-y-resistencia-antimicrobiana",
    accent: "navy",
    title: {
      es: "Enfermedades de Peces y Resistencia a los Antimicrobianos",
      en: "Fish Diseases and Antimicrobial Resistance",
    },
    short: { es: "Enfermedades y RAM", en: "Diseases & AMR" },
    summary: {
      es: "Estudiamos las principales enfermedades que afectan a los peces y la resistencia a los antimicrobianos para reducir el uso de antibióticos en la industria acuícola.",
      en: "We study the main diseases affecting fish and antimicrobial resistance to reduce antibiotic use across the aquaculture industry.",
    },
  },
  {
    number: 3,
    slug: "soluciones-omicas",
    href: "/investigacion/soluciones-omicas",
    accent: "teal",
    title: {
      es: "Soluciones Ómicas para la Acuicultura",
      en: "Omics Solutions for Aquaculture",
    },
    short: { es: "Soluciones Ómicas", en: "Omics Solutions" },
    summary: {
      es: "Aplicamos genómica, transcriptómica y bioinformática para generar soluciones de precisión que fortalezcan la producción acuícola sostenible.",
      en: "We apply genomics, transcriptomics and bioinformatics to deliver precision solutions that strengthen sustainable aquaculture production.",
    },
  },
  {
    number: 4,
    slug: "estres-y-bienestar-animal",
    href: "/investigacion/estres-y-bienestar-animal",
    accent: "peach",
    title: { es: "Estrés y Bienestar Animal", en: "Stress and Animal Welfare" },
    short: { es: "Estrés y Bienestar", en: "Stress & Welfare" },
    summary: {
      es: "Investigamos los factores que afectan el bienestar de los peces para diseñar prácticas productivas más responsables y respetuosas con los animales.",
      en: "We investigate the factors affecting fish welfare to design more responsible, animal-friendly production practices.",
    },
  },
  {
    number: 5,
    slug: "impactos-en-ecosistemas",
    href: "/investigacion/impactos-en-ecosistemas",
    accent: "navy",
    title: {
      es: "Impactos de la Acuicultura en los Ecosistemas",
      en: "Impacts of Aquaculture on Ecosystems",
    },
    short: { es: "Impactos en Ecosistemas", en: "Ecosystem Impacts" },
    summary: {
      es: "Evaluamos la interacción entre la acuicultura y los ecosistemas marinos para promover una actividad productiva ambientalmente equilibrada.",
      en: "We assess the interaction between aquaculture and marine ecosystems to promote an environmentally balanced productive activity.",
    },
  },
  {
    number: 6,
    slug: "resiliencia-de-la-acuicultura",
    href: "/investigacion/resiliencia-de-la-acuicultura",
    accent: "teal",
    title: {
      es: "Aumento de la Resiliencia de la Acuicultura",
      en: "Increasing the Resilience of Aquaculture",
    },
    short: { es: "Resiliencia", en: "Resilience" },
    summary: {
      es: "Desarrollamos conocimiento y tecnologías para que la acuicultura chilena se adapte al cambio climático y a nuevas condiciones ambientales.",
      en: "We build knowledge and technologies so Chilean aquaculture can adapt to climate change and new environmental conditions.",
    },
  },
  {
    number: 7,
    slug: "interacciones-sustentables",
    href: "/investigacion/interacciones-sustentables",
    accent: "slate",
    title: {
      es: "Interacciones Sustentables entre Acuicultura, Pesquerías y Ecosistemas",
      en: "Sustainable Interactions between Aquaculture, Fisheries and Ecosystems",
    },
    short: { es: "Interacciones Sustentables", en: "Sustainable Interactions" },
    summary: {
      es: "Analizamos las relaciones entre acuicultura, pesquerías y ecosistemas para favorecer un uso sostenible y coordinado de los recursos marinos.",
      en: "We analyze the relationships between aquaculture, fisheries and ecosystems to foster a sustainable, coordinated use of marine resources.",
    },
  },
  {
    number: 8,
    slug: "impactos-socioeconomicos",
    href: "/investigacion/impactos-socioeconomicos",
    accent: "peach",
    title: {
      es: "Impactos Socioeconómicos, Gobernanza y Dinámicas de Mercado",
      en: "Socioeconomic Impacts, Governance and Market Dynamics",
    },
    short: { es: "Impactos Socioeconómicos", en: "Socioeconomic Impacts" },
    summary: {
      es: "Estudiamos los efectos socioeconómicos, la gobernanza y las dinámicas de mercado para orientar políticas públicas y decisiones del sector.",
      en: "We study socioeconomic effects, governance and market dynamics to inform public policy and industry decisions.",
    },
  },
];

export const getResearchLine = (slug: string) =>
  researchLines.find((line) => line.slug === slug);

export const localized = <T>(value: Record<Locale, T>, locale: Locale): T =>
  value[locale];
