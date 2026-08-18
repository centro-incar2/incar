import type { Locale } from "@/i18n/routing";
import { researchLines } from "@/content/research-lines";

/**
 * Integrantes de cada línea de investigación de INCAR². Todo el contenido
 * (biografías, títulos y proyectos) es textual del material entregado por el
 * centro y se muestra tanto en el grid de la línea como en la página de perfil
 * individual (`/investigacion/equipo/[slug]`).
 *
 * `line` referencia el `slug` de la línea en `research-lines.ts`. `photo` es
 * opcional: sin foto se muestra un avatar con el isotipo de INCAR² (mismo
 * patrón que la página de Gobernanza; ver `PersonAvatar`).
 */
export interface MemberLinks {
  linkedin?: string;
  orcid?: string;
  scholar?: string;
  researchgate?: string;
}

export interface ResearchMember {
  slug: string;
  line: string;
  name: string;
  role: Record<Locale, string>;
  email: string;
  /** Ruta explícita, o `null` si el integrante aún no tiene foto disponible. */
  photo?: string | null;
  links: MemberLinks;
  bio: Record<Locale, string>;
  degrees: Record<Locale, string[]>;
  projects: Record<Locale, string[]>;
}

export const researchMembers: ResearchMember[] = [
  {
    slug: "valentina-valenzuela",
    line: "nuevas-vacunas-para-peces",
    name: "Dra. Valentina Valenzuela Muñoz",
    role: { es: "Investigadora Principal", en: "Principal Investigator" },
    email: "valevalenzuela@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/valentina-valenzuela-19468231b/",
      orcid: "https://orcid.org/0000-0002-9402-6695",
    },
    bio: {
      es: "La Dra. Valentina Valenzuela Muñoz es ingeniera civil en biotecnología de la Universidad San Sebastián y posee un Magíster en Bioquímica y Bioinformática de la Universidad de Concepción y un Doctorado en Ciencias con mención en Manejo de recursos acuáticos renovables. Durante 2022-2025 (marzo) lideró el proyecto Fondecyt de Iniciación “Functional genomics in Atlantic salmon during repeated sea lice infestation: the emerging role of acquired resistance in salmon breeding” (#11220307) y en la actualidad lidera un proyecto FONDEF IT20I0006, y es patrocinante de los proyectos postdoctoral del Dr. Antonio Casuso “Evaluación de efectos heterólogos de vacunas utilizadas en la industria del salmón: Inmunogenomica para la generación de biomarcadores de salud post-vacunación” (FONDECYT #3240484), y de la Dra. Yeny Leal “Unraveling the immune cells landscape in Atlantic salmon infected with Piscirickettsia salmonis genogroups by single-nuclei RNA sequencing (snRNA-seq)” (FONDECYT #3250120).",
      en: "Dr. Valentina Valenzuela Muñoz is a Civil Engineer in Biotechnology from Universidad San Sebastián and holds a Master’s degree in Biochemistry and Bioinformatics from Universidad de Concepción, as well as a PhD in Sciences with a specialization in Renewable Aquatic Resources Management. From 2022 to March 2025, she led the FONDECYT Initiation project “Functional genomics in Atlantic salmon during repeated sea lice infestation: the emerging role of acquired resistance in salmon breeding” (#11220307). She currently leads the FONDEF project IT20I0006 and serves as sponsor of the postdoctoral projects of Dr. Antonio Casuso, “Evaluation of heterologous effects of vaccines used in the salmon industry: Immunogenomics for the generation of post-vaccination health biomarkers” (FONDECYT #3240484), and Dr. Yeny Leal, “Unraveling the immune cells landscape in Atlantic salmon infected with Piscirickettsia salmonis genogroups by single-nuclei RNA sequencing (snRNA-seq)” (FONDECYT #3250120).",
    },
    degrees: {
      es: [
        "2018. Doctora en Ciencias con Mención en Manejo de Recursos Renovables Acuáticos. Universidad de Concepción. Concepción, Chile.",
        "2011. Magíster Bioquímica y Bioinformática, Universidad de Concepción, Concepción, Chile.",
        "2007. Ingeniera Civil en Biotecnología. Universidad San Sebastián de Concepción, Chile.",
      ],
      en: [
        "2018. PhD in Sciences with a specialization in Renewable Aquatic Resources Management. Universidad de Concepción, Concepción, Chile.",
        "2011. Master’s Degree in Biochemistry and Bioinformatics. Universidad de Concepción, Concepción, Chile.",
        "2007. Civil Engineer in Biotechnology. Universidad San Sebastián, Concepción, Chile.",
      ],
    },
    projects: {
      es: [
        "2025-2027. Proyecto “LiceVax2: Vacuna oral basada en tecnología BSSD para el control de la caligidosis en salmón del Atlántico”. FONDEF IT20I0006. Directora.",
        "2022-2025. Proyecto “Functional genomics in Atlantic salmon during repeated sea lice infestations: the emerging role of acquired resistance in salmon breeding”. FONDECYT-Iniciación nº11220307. Investigadora Principal.",
        "2021-2025. Proyecto “Dancing with the genes: the role of topologically associated domains (TADs) to drive the non-coding/coding RNA interactions in sea lice biology”. FONDECYT nº1210852. Co-Investigadora.",
        "2019-2022. FONDECYT 3190320_Postdoc. Functional genomics applied to parr-smolt transformation: Novel Biomarkers for smolt selection in Atlantic salmon. Investigadora Principal.",
        "2017-2019. FIE 2015-V014-SERNAPESCA. CaligusLIFE: Scientific research of excellence for the understanding of the biology of Caligus rogercresseyi and its application in caligidosis control strategies in the salmon industry. Investigadora.",
      ],
      en: [
        "2025–2027. Project “LiceVax2: Oral vaccine based on BSSD technology for the control of caligidosis in Atlantic salmon.” FONDEF IT20I0006. Principal Investigator / Project Director.",
        "2022–2025. Project “Functional genomics in Atlantic salmon during repeated sea lice infestations: the emerging role of acquired resistance in salmon breeding.” FONDECYT Initiation No. 11220307. Principal Investigator.",
        "2021–2025. Project “Dancing with the genes: the role of topologically associated domains (TADs) to drive the non-coding/coding RNA interactions in sea lice biology.” FONDECYT No. 1210852. Co-Investigator.",
        "2019–2022. Project “Functional genomics applied to parr–smolt transformation: Novel biomarkers for smolt selection in Atlantic salmon.” FONDECYT Postdoctoral No. 3190320. Principal Investigator.",
        "2017–2019. Project “CaligusLIFE: Scientific research of excellence for understanding the biology of Caligus rogercresseyi and its application in caligidosis control strategies in the salmon industry.” FIE 2015-V014-SERNAPESCA. Researcher.",
      ],
    },
  },
  {
    slug: "myleidi-vera",
    line: "nuevas-vacunas-para-peces",
    name: "Dra. Myleidi Vera Otero",
    role: { es: "Investigadora Joven", en: "Young Researcher" },
    email: "mylevera@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/myleidi-vera-otero-aa67b811b/",
      orcid: "https://orcid.org/0000-0002-8469-995X",
    },
    bio: {
      es: "La Dra. Myleidi Vera es Química de la Universidad del Valle y realizó su Doctorado en Ciencias con mención en Química en la Universidad de Concepción. Se desempeña como académica e investigadora en el área de química de polímeros y materiales, con especialización en polimerización enzimática y valorización de biomasa para el desarrollo de materiales funcionales sostenibles. Ha sido Investigadora Responsable de proyectos competitivos financiados por la Agencia Nacional de Investigación y Desarrollo (ANID), incluyendo FONDECYT de Iniciación, donde lidera líneas orientadas a la transformación de subproductos agro-forestales en materiales de alto desempeño con potencial de escalamiento y transferencia tecnológica. En el Centro de Investigación Aplicada INCAR², integra la línea de desarrollo de vacunas de liberación controlada, contribuyendo al diseño de sistemas poliméricos avanzados para aplicaciones acuícolas, con énfasis en estabilidad y liberación controlada de compuestos bioactivos.",
      en: "Dr. Myleidi Vera is a Chemist from Universidad del Valle and obtained her PhD in Sciences with a specialization in Chemistry from the Universidad de Concepción. She currently works as an academic and researcher in the field of polymer chemistry and materials, with specialization in enzymatic polymerization and biomass valorization for the development of sustainable functional materials. She has served as Principal Investigator of competitive research projects funded by the National Agency for Research and Development (ANID), including a FONDECYT Initiation project, leading research lines focused on the transformation of agro-forestry by-products into high-performance materials with potential for scaling and technology transfer. Within the INCAR² Applied Research Center, she contributes to the controlled-release vaccine development line, participating in the design of advanced polymeric systems for aquaculture applications, with a strong emphasis on stability and controlled release of bioactive compounds.",
    },
    degrees: {
      es: [
        "2019. Doctora en Ciencias con Mención en Química, Universidad de Concepción, Chile.",
        "2014. Química, Universidad del Valle, Santiago de Cali, Colombia.",
      ],
      en: [
        "2019. PhD in Sciences with a specialization in Chemistry, Universidad de Concepción, Chile.",
        "2014. Chemist, Universidad del Valle, Santiago de Cali, Colombia.",
      ],
    },
    projects: {
      es: [
        "2025-2027. Proyecto FONDECYT INICIACIÓN 11251670. “Development of biofilms using laccase-activated tannins for potential active packaging applications”. Directora.",
        "2025-2027. FONDEF IDEA IT25I0111. “Desarrollo, Validación y Revalorización de una Membrana Reciclada Modificada como una Alternativa Costo/efectiva en el Tratamiento de Aguas con Alto Contenido de Especies Iónicas Mono/divalentes.” Co-investigadora.",
        "2025-2027. FONDEF IDEA ID25I10405. “Método Integral De Protección Para Paneles Clt Frente A Factores De Deterioro Climáticos, Hongos, Termitas Y Fuego.” Directora alterna.",
        "2024-2025. FONDEF EXPLORACIÓN 13220020. “Rational development of artificial antibodies for detection kits of toxins and antibiotics in water”. Co-investigadora.",
        "2024-2028. FONDEF TA24I10026. Innovación en tratamiento de aguas grises para ecorriego: Reactor Fotocatalítico con Intercambio Iónico para Reciclaje de Aguas Grises destinadas al uso en Horticultura Urbana y Paisajismo Sostenible. Co-investigadora.",
        "2020-2023. FONDECYT Postdoctoral 3200601. Enzymatic synthesis of biopolymers based on polyphenols from natural sources for potential applications in oxygen-scavenger packages. Directora.",
      ],
      en: [
        "2025–2027. FONDECYT Initiation Project 11251670. “Development of biofilms using laccase-activated tannins for potential active packaging applications.” Principal Investigator.",
        "2025–2027. FONDEF IDEA IT25I0111. “Development, Validation, and Revalorization of a Modified Recycled Membrane as a Cost-Effective Alternative for the Treatment of Water with High Mono/Divalent Ionic Species Content.” Co-Investigator.",
        "2025–2027. FONDEF IDEA ID25I10405. “Integrated Protection Method for CLT Panels Against Climatic Deterioration Factors, Fungi, Termites, and Fire.” Alternate Principal Investigator.",
        "2024–2025. FONDEF Exploration 13220020. “Rational development of artificial antibodies for detection kits of toxins and antibiotics in water.” Co-Investigator.",
        "2024–2028. FONDEF TA24I10026. “Innovation in greywater treatment for eco-irrigation: Photocatalytic Reactor with Ion Exchange for Greywater Recycling for Urban Horticulture and Sustainable Landscaping.” Co-Investigator.",
        "2020–2023. FONDECYT Postdoctoral 3200601. “Enzymatic synthesis of biopolymers based on polyphenols from natural sources for potential applications in oxygen-scavenger packaging.” Principal Investigator.",
      ],
    },
  },
  {
    slug: "antonio-casuso",
    line: "nuevas-vacunas-para-peces",
    name: "Dr. Antonio Casuso Cabrera",
    role: { es: "Investigador Postdoctoral", en: "Postdoctoral Researcher" },
    email: "acasuso@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/tony-casuso-2a54b8151/",
      orcid: "https://orcid.org/0000-0001-9766-1793",
      scholar: "https://scholar.google.es/citations?user=nQ7PG30AAAAJ&hl=es&oi=ao",
      researchgate: "https://www.researchgate.net/profile/Antonio-Casuso",
    },
    bio: {
      es: "El Dr. Antonio Casuso es investigador en bioquímica, biología marina y biotecnología acuícola, con formación en la Universidad de La Habana (Licenciatura y Maestría en Ciencias) y doctorado en Ciencias obtenido en la Universidad de Concepción (UdeC), Chile. Su trayectoria científica se articula en torno a la genómica funcional de organismos marinos no modelo, con especial énfasis en especies de relevancia para la acuicultura. En su trabajo, el Dr. Casuso Cabrera integra disciplinas como la genómica, la transcriptómica y la epigenómica para dilucidar los mecanismos moleculares que subyacen a las respuestas inmunitarias en peces y sus interacciones con patógenos. Ha trabajado con una diversidad de organismos, incluyendo patógenos bacterianos (Piscirickettsia salmonis, Vibrio spp.), invertebrados (Panulirus argus, Caligus rogercresseyi) y vertebrados (Salmo salar). Una línea central de su investigación es la vacunología de peces, un área con importantes brechas de conocimiento y un alto potencial para impulsar el desarrollo sostenible de la acuicultura a escala nacional e internacional. Ha participado como investigador asociado en múltiples proyectos FONDECYT y FONDEF. Actualmente, es investigador responsable de un proyecto FONDECYT Postdoctoral adjudicado en 2024, ejecutándose en el Centro de Biotecnología de la UdeC. Esta investigación evalúa la ventana óptima de vacunación en salmón del Atlántico mediante el análisis de patrones transcripcionales y epigenéticos en peces inmunizados con vacunas comerciales. En el Centro INCAR² se desempeña como Investigador Postdoctoral.",
      en: "Dr. Antonio Casuso is a researcher in biochemistry, marine biology, and aquaculture biotechnology, with academic training at the University of Havana (Bachelor’s and Master’s degrees in Science) and a PhD in Sciences from the University of Concepción (UdeC), Chile. His scientific career focuses on the functional genomics of non-model marine organisms, with particular emphasis on species of relevance to aquaculture. In his work, Dr. Casuso Cabrera integrates disciplines such as genomics, transcriptomics, and epigenomics to elucidate the molecular mechanisms underlying immune responses in fish and their interactions with pathogens. He has worked with a wide range of organisms, including bacterial pathogens (Piscirickettsia salmonis, Vibrio spp.), invertebrates (Panulirus argus, Caligus rogercresseyi), and vertebrates (Salmo salar). A central line of his research is fish vaccinology, an area with significant knowledge gaps and high potential to drive the sustainable development of aquaculture at both national and international levels. He has participated as an associate researcher in multiple FONDECYT and FONDEF projects. Currently, he is the Principal Investigator of a FONDECYT Postdoctoral project awarded in 2024 and carried out at the Center for Biotechnology of UdeC. This research evaluates the optimal vaccination window in Atlantic salmon through the analysis of transcriptional and epigenetic patterns in fish immunized with commercial vaccines. At the INCAR² Center, he serves as a Postdoctoral Researcher.",
    },
    degrees: {
      es: [
        "2022. Doctor en Ciencias con mención en Manejo de Recursos Acuáticos Renovables, Universidad de Concepción, Chile.",
        "2016. MSc. Biología Marina y Acuicultura con mención en Ecología Marina, Universidad de La Habana, Cuba.",
        "2013. Lic. Bioquímica y Biología Molecular, Universidad de La Habana, Cuba.",
      ],
      en: [
        "2022. PhD in Sciences with a specialization in Renewable Aquatic Resources Management, Universidad de Concepción, Chile.",
        "2016. MSc in Marine Biology and Aquaculture with a specialization in Marine Ecology, University of Havana, Cuba.",
        "2013. BSc in Biochemistry and Molecular Biology, University of Havana, Cuba.",
      ],
    },
    projects: {
      es: [
        "2024-2027. FONDECYT Postdoctorado 3240484. “Evaluación de efectos heterólogos de vacunas utilizadas en la industria del salmón: inmunogenómica para la generación de biomarcadores de salud post vacunación”. Investigador Responsable.",
      ],
      en: [
        "2024–2027. FONDECYT Postdoctoral 3240484. “Evaluation of heterologous effects of vaccines used in the salmon industry: immunogenomics for the generation of post-vaccination health biomarkers.” Principal Investigator.",
      ],
    },
  },
  {
    slug: "yeny-leal",
    line: "nuevas-vacunas-para-peces",
    name: "Dra. Yeny Leal Acosta",
    role: { es: "Investigadora Postdoctoral", en: "Postdoctoral Researcher" },
    email: "yleal@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/yeny-leal-610951112/",
      orcid: "https://orcid.org/0000-0001-8140-5314",
      scholar: "https://scholar.google.com/citations?user=GQbZ0BAAAAAJ&hl=es&oi=ao",
      researchgate: "https://www.researchgate.net/profile/Yeny-Leal-Acosta?ev=hdr_xprf",
    },
    bio: {
      es: "La Dra. Yeny Leal Acosta es Investigadora Postdoctoral y encargada de laboratorio en el Centro INCAR² de la Universidad de Concepción, Chile. Su trayectoria científica se ha centrado en el estudio de la respuesta inmune y transcriptómica de peces frente a diversos patógenos, así como en la identificación de candidatos vacunales para su control. Es Licenciada en Bioquímica y Biología Molecular (2013, Universidad de La Habana, Cuba), donde adquirió una sólida formación en biología celular y molecular. Posteriormente, obtuvo el grado de Máster en Ciencias con mención en Tendencias de Biotecnología Contemporánea (2017, Centro de Ingeniería Genética y Biotecnología, La Habana, Cuba), especializándose en el uso de herramientas biotecnológicas avanzadas. En el año 2023 obtuvo el grado de Doctora en Ciencias con mención en Recursos Acuáticos Renovables (Universidad de Concepción), consolidando su enfoque en biotecnología acuícola. Durante su formación doctoral, desarrolló un enfoque integrativo que combina modelos in vitro e in vivo en salmón del Atlántico para estudiar la interacción patógeno-hospedero, en particular frente a Piscirickettsia salmonis y Caligus rogercresseyi, ambos de alto impacto en la salmonicultura. Ha participado en diversos proyectos Fondecyt y FONDEF como asistente de investigación. Actualmente, lidera un proyecto Fondecyt de Postdoctorado orientado a caracterizar la heterogeneidad de las células inmunes en el riñón anterior del salmón del Atlántico infectado con distintos genogrupos de P. salmonis, mediante análisis de transcriptómica de núcleos individuales (snRNA-seq), un enfoque clave para estudiar la diversidad celular del sistema inmune.",
      en: "Dr. Yeny Leal Acosta is a Postdoctoral Researcher and Laboratory Manager at the INCAR² Center, University of Concepción, Chile. Her scientific career has focused on the study of fish immune responses and transcriptomics in response to various pathogens, as well as on the identification of vaccine candidates for disease control. She holds a Bachelor’s degree in Biochemistry and Molecular Biology (2013, University of Havana, Cuba), where she acquired a strong background in cellular and molecular biology. She later obtained a Master’s degree in Sciences with a specialization in Contemporary Biotechnology Trends (2017, Center for Genetic Engineering and Biotechnology, Havana, Cuba), gaining expertise in advanced biotechnological tools. In 2023, she earned a PhD in Sciences with a specialization in Renewable Aquatic Resources Management from the University of Concepción, consolidating her focus on aquaculture biotechnology. During her doctoral training, she developed an integrative approach combining in vitro and in vivo models in Atlantic salmon to study host–pathogen interactions, particularly involving Piscirickettsia salmonis and Caligus rogercresseyi, two pathogens with major impacts on salmon farming. She has participated as a research assistant in several FONDECYT and FONDEF projects. Currently, she leads a FONDECYT Postdoctoral project aimed at characterizing the heterogeneity of immune cells in the head kidney of Atlantic salmon infected with different P. salmonis genogroups using single-nuclei transcriptomic analysis (snRNA-seq), a key approach for studying cellular diversity within the immune system.",
    },
    degrees: {
      es: [
        "2023. Doctora en Ciencias con mención en Manejo de Recursos Acuáticos Renovables, Universidad de Concepción, Chile.",
        "2017. Máster en Ciencias mención en Tendencias de Biotecnología Contemporánea, Centro de Ingeniería Genética y Biotecnología, Cuba.",
        "2013. Licenciada en Bioquímica y Biología Molecular, Universidad de La Habana, Cuba.",
      ],
      en: [
        "2023. PhD in Sciences with a specialization in Renewable Aquatic Resources Management, University of Concepción, Chile.",
        "2017. Master’s Degree in Sciences with a specialization in Contemporary Biotechnology Trends, Center for Genetic Engineering and Biotechnology, Cuba.",
        "2013. Bachelor’s Degree in Biochemistry and Molecular Biology, University of Havana, Cuba.",
      ],
    },
    projects: {
      es: [
        "2025-2028. Fondecyt Postdoctorado No. 3250120. Centro Interdisciplinario de Investigación en Acuicultura-Investigación Aplicada (INCAR²). Universidad de Concepción. Investigadora Principal.",
      ],
      en: [
        "2025–2028. FONDECYT Postdoctoral Project No. 3250120. Interdisciplinary Center for Aquaculture Research – Applied Research (INCAR²), University of Concepción. Principal Investigator.",
      ],
    },
  },
  {
    slug: "adrian-rodriguez",
    line: "nuevas-vacunas-para-peces",
    name: "Adrián Rodríguez Gabilondo",
    role: {
      es: "Estudiante de Doctorado en Ciencias con mención en Manejo de Recursos Acuáticos Renovables",
      en: "PhD Student in Sciences with a specialization in Renewable Aquatic Resources Management",
    },
    email: "adrodriguez2025@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/adrian-rodríguez-535928373",
      orcid: "https://orcid.org/0000-0002-5298-4318",
    },
    bio: {
      es: "Licenciado en Bioquímica y Biología Molecular. Desde 2019 a 2024, se desempeñó como investigador en el Centro de Ingeniería Genética y Biotecnología (La Habana, Cuba), integrando el grupo de Modificadores Metabólicos para la Acuicultura. En esta etapa, trabajó en la identificación y caracterización de biomoléculas asociadas al sistema inmune, crecimiento y reproducción en peces, así como en el estudio de péptidos secretagogos de la hormona del crecimiento, moléculas bioactivas con funciones metabólicas e inmunomoduladoras con potencial aplicación en acuicultura. Resultados de estas investigaciones contribuyeron al Premio Nacional de la Academia de Ciencias de Cuba (2022), demostrando efectos inmunoestimulantes, antibacterianos y antivirales en peces. Paralelamente, desarrolló actividades de docencia en biotecnología y biología molecular, además de participar activamente en congresos científicos y en la divulgación del conocimiento. En 2025, comenzó sus estudios de Doctorado en Ciencias con mención en Manejo de Recursos Acuáticos Renovables en la Universidad de Concepción. Actualmente es tesista de la línea de “Nuevas Vacunas para Peces” del Centro de Investigación Aplicada, INCAR². En este contexto, participa en proyectos enfocados en vacunas, biomarcadores e inmunogenómica para el control de enfermedades en salmónidos, contribuyendo a la innovación biotecnológica. Sus áreas de especialización incluyen inmunología de peces, genómica acuícola, desarrollo de vacunas y biotecnología aplicada a la salud animal.",
      en: "Adrián Rodríguez Gabilondo holds a Bachelor’s degree in Biochemistry and Molecular Biology. From 2019 to 2024, he worked as a researcher at the Center for Genetic Engineering and Biotechnology (CIGB) in Havana, Cuba, as a member of the Metabolic Modulators for Aquaculture research group. During this period, he focused on the identification and characterization of biomolecules associated with the immune system, growth, and reproduction in fish, as well as on the study of growth hormone secretagogue peptides, bioactive molecules with metabolic and immunomodulatory functions and strong potential applications in aquaculture. The results of this research contributed to the National Award of the Cuban Academy of Sciences (2022), demonstrating immunostimulatory, antibacterial, and antiviral effects in fish. In parallel, he was involved in teaching activities in biotechnology and molecular biology, actively participated in scientific conferences, and contributed to science outreach initiatives. In 2025, he began his PhD studies in Sciences with a specialization in Renewable Aquatic Resources Management at the University of Concepción, Chile. He is currently a graduate researcher within the “Novel Fish Vaccines” research line of the Applied Research Center INCAR², where he participates in projects focused on vaccines, biomarkers, and immunogenomics for disease control in salmonids, contributing to biotechnological innovation in aquaculture. His areas of expertise include fish immunology, aquaculture genomics, vaccine development, and biotechnology applied to animal health.",
    },
    degrees: {
      es: [
        "Licenciado en Bioquímica y Biología Molecular, Universidad de La Habana, Cuba.",
      ],
      en: [
        "Bachelor’s Degree in Biochemistry and Molecular Biology, University of Havana, Cuba.",
      ],
    },
    projects: {
      es: [
        "2025. Inmunogenómica y efectos heterólogos de vacunas en salmón. ANID – FONDECYT (3240484). Personal de apoyo.",
        "2025. INCAR: Investigación interdisciplinaria en acuicultura. ANID – Centros de Investigación en Áreas Prioritarias (1523A0007). Personal de apoyo.",
        "2025. LiceVax2: Desarrollo de vacuna oral bivalente para el control sustentable de la caligidosis en salmón del Atlántico. FONDEF (IT25I0006). Personal de apoyo.",
        "2020-2024. Secretagogos de hormona de crecimiento y neuroinmunoendocrinología en peces. Código del proyecto 41833UH. Fuente de Financiamiento Embajada de Francia en Cuba (SCAC). Investigador.",
        "2019-2024. Modificadores metabólicos en peces para acuicultura. Fuente de Financiamiento BioCubaFarma – Ministerio de Ciencia y Tecnología. Investigador.",
      ],
      en: [
        "2025. Immunogenomics and heterologous effects of vaccines in salmon. ANID – FONDECYT (3240484). Support Staff.",
        "2025. INCAR: Interdisciplinary research in aquaculture. ANID – Centers of Research in Priority Areas (1523A0007). Support Staff.",
        "2025. LiceVax2: Development of a bivalent oral vaccine for the sustainable control of caligidosis in Atlantic salmon. FONDEF (IT25I0006). Support Staff.",
        "2020–2024. Growth hormone secretagogues and neuroimmunoendocrinology in fish. Project code 41833UH. Funded by the Embassy of France in Cuba (SCAC). Researcher.",
        "2019–2024. Metabolic modulators in fish for aquaculture. Funded by BioCubaFarma – Ministry of Science and Technology. Researcher.",
      ],
    },
  },
  {
    slug: "marcelo-munoz",
    line: "nuevas-vacunas-para-peces",
    name: "Marcelo Muñoz Troncoso",
    role: { es: "Asistente de Investigación", en: "Research Assistant" },
    email: "mmunozt@udec.cl",
    links: {
      orcid: "https://orcid.org/0009-0005-4856-3667",
    },
    bio: {
      es: "Ingeniero en Biotecnología Marina y Acuicultura, y Magíster en Ciencias con mención en Microbiología por la Universidad de Concepción. Asociado al equipo de “Genómica Acuícola” del Centro INCAR desarrollé investigación en las áreas de microbiota marina, genómica y salud de organismos acuáticos. Mi trabajo se ha enfocado en el estudio del microbioma y en el impacto del piojo de mar sobre la acuicultura, integrando herramientas de metagenómica y análisis transcriptómico para comprender las interacciones hospedador-microbiota-patógeno.",
      en: "Marine Biotechnology and Aquaculture Engineer, and Master of Science with a specialization in Microbiology from the University of Concepción. As part of the “Aquaculture Genomics” team at the INCAR Center, Marcelo Muñoz have conducted research in the areas of marine microbiota, genomics, and aquatic animal health. Him work has focused on microbiome studies and the impact of sea lice on aquaculture, integrating metagenomic and transcriptomic analysis tools to better understand host–microbiota–pathogen interactions.",
    },
    degrees: {
      es: [
        "2026. Magister en ciencias con mención en microbiología, Universidad de Concepción, Chile.",
        "2023. Ingeniero en biotecnología marina y acuicultura, Universidad de Concepción, Chile.",
      ],
      en: [
        "2026. Master of Science with a specialization in Microbiology, University of Concepción, Chile.",
        "2023. Marine Biotechnology and Aquaculture Engineer, University of Concepción, Chile.",
      ],
    },
    projects: { es: [], en: [] },
  },
  {
    slug: "ruben-avendano",
    line: "enfermedades-y-resistencia-antimicrobiana",
    name: "Dr. Ruben Avendaño Herrera",
    role: { es: "Investigador Principal", en: "Principal Investigator" },
    email: "ravendano@unab.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/ruben-avenda%C3%B1o-herrera-6b984137a/",
      orcid: "https://orcid.org/0000-0001-5368-4475",
    },
    bio: {
      es: "El Dr. Ruben Avendaño-Herrera es Ingeniero en Acuicultura y Licenciado en Ciencias del Mar de la Universidad de Antofagasta (1997) y posee un Doctorado en Biología en el programa de Microbiología y Parasitología de la Universidad de Santiago de Compostela (España) (2005) y un Post-Doctorado en la Universidad Andrés Bello (2010-2013). Entre 2006-2009 fue investigador de la empresa farmacéutica Veterquímica Ltda., y en 2010 se integra a la Universidad Andrés Bello (UNAB).\n\nActualmente es Profesor Titular y director del Laboratorio de Patología de Organismos Acuáticos y Biotecnología Acuícola de la UNAB, Subdirector e Investigador Principal del Centro de Excelencia CIA-INCAR².\n\nAlgunos de sus principales temas de investigación son la patología en acuicultura; enfermedades de organismos acuáticos; herramientas biotecnológicas aplicadas a la acuicultura; estandarización de procedimientos para controlar y validar el uso apropiado de antibióticos y el desarrollo de vacunas contra patologías acuáticas. Autor de más de 153 artículos (principalmente revistas indexadas por WoS) y 07 capítulos de libros.\n\nEditor y responsable de la publicación de un libro sobre las enfermedades infecciosas del cultivo de salmónidos en Chile y en todo el mundo, ha participado en 29 proyectos, incluidos propuestas nacionales e internacionales, siendo el investigador principal y responsable de 17 de ellos.\n\nHa supervisado 11 tesis doctorales y posdoctorales y miembro del comité de 25 tesis de pregrado. Es árbitro de más de 30 revistas internacionales y miembro del consejo editorial del Journal of Fish Disease. Ha sido parte de los Comité de Salud y Producción Animal de FONDECYT, ha sido presidente de la mesa y es actualmente Miembro del Comité de Pesca y Acuicultura de FONDEF. Miembro de distintos comités de evaluación para diferentes fondos/subvenciones de ANID, y es miembro del Grupo de Trabajo de Acuicultura de CLSI.",
      en: "Dr. Ruben Avendaño-Herrera is an Aquaculture Engineer and holds a Bachelor’s Degree in Marine Sciences from the University of Antofagasta (1997). He obtained his PhD in Biology through the Microbiology and Parasitology program at the University of Santiago de Compostela, Spain (2005), and completed a postdoctoral fellowship at Andrés Bello University (2010–2013).\n\nBetween 2006 and 2009, he worked as a researcher at the pharmaceutical company Veterquímica Ltda., and in 2010 he joined Andrés Bello University (UNAB). He is currently a Full Professor and Director of the Laboratory of Aquatic Organism Pathology and Aquaculture Biotechnology at UNAB, as well as Deputy Director and Principal Investigator at the CIA-INCAR² Center of Excellence.\n\nHis main research interests include aquaculture pathology, diseases of aquatic organisms, biotechnological tools applied to aquaculture, standardization of procedures for monitoring and validating the appropriate use of antibiotics, and the development of vaccines against aquatic diseases. He is the author of more than 153 scientific publications (mainly in WoS-indexed journals) and 7 book chapters.\n\nHe has edited and overseen the publication of a book on infectious diseases affecting salmonid farming in Chile and worldwide. He has participated in 29 research projects, both national and international, serving as principal investigator and lead researcher in 17 of them.\n\nDr. Avendaño-Herrera has supervised 11 doctoral and postdoctoral theses and has served on committees for 25 undergraduate theses. He is a reviewer for more than 30 international journals and a member of the editorial board of the Journal of Fish Diseases. He has been part of the Animal Health and Production Committee of FONDECYT, serving as chair, and is currently a member of the Fisheries and Aquaculture Committee of FONDEF. He also serves on multiple evaluation panels for ANID funding programs and is a member of the Aquaculture Working Group of CLSI.",
    },
    degrees: {
      es: [
        "2005. Doctor en Biología, Universidad de Santiago de Compostela, España.",
        "1997. Ingeniero en Acuicultura, Universidad de Antofagasta, Chile.",
        "1997. Licenciado en Ciencias del Mar, Universidad de Antofagasta, Chile.",
      ],
      en: [
        "2005. PhD in Biology, University of Santiago de Compostela, Spain.",
        "1997. Aquaculture Engineer, University of Antofagasta, Chile.",
        "1997. Bachelor’s Degree in Marine Sciences, University of Antofagasta, Chile.",
      ],
    },
    projects: {
      es: [
        "2024-2026. Anticipating instead of reacting to the imminent threat of bacterial co-infections in farmed salmon in Chile: elucidation of fish susceptibility, bacterial behavior, and treatment efficacies during a dual or multiple co-infection in Atlantic salmon. 1230068. FONDEF. Ruben Esteban Avendaño Herrera.",
        "2021-2024. Production and evaluation of a diagnostic kit and an adjuvanted divalent vaccine against Yersinia ruckeri and Weissella ceti in rainbow trout. 28-2020. Animal Health in Early Life Stages of Salmonids and Native Resources. Ruben Esteban Avendaño Herrera.",
        "2024-2024. Molecular characterization of Lactococcus spp. isolated from rainbow trout (Oncorhynchus mykiss) affected by septicemic disease. UAEM ODS2024. Animal Health in Early Life Stages of Salmonids and Native Resources. Ruben Esteban Avendaño Herrera.",
        "2023-2026. Anticipating instead of reacting to the imminent threat of bacterial co-infections in farmed salmon in Chile: elucidation of fish susceptibility, bacterial behavior, and treatment efficacies during a dual or multiple co-infection in Atlantic salmon. 1230068. FONDECYT. Ruben Esteban Avendaño Herrera, Main Researcher.",
        "2023-2025. Estudio del rol de las vesículas de membrana de R. salmoninarum crecidas en condiciones limitante de hierro sobre la patogenicidad en ejemplares de salmón del Atlántico (Postdoc Dr. Macarena Echeverría). 3230453. FONDECYT. Ruben Esteban Avendaño Herrera, Postdoc sponsor.",
        "2022-2025. “SNAKE VENOM TOXINS FOR DRUG DISCOVERY: IDENTIFICATION AND EVALUATION OF PROTEINS AND PEPTIDES WITH ANTIMICROBIAL ACTIVITY. 1220921. FONDECYT. Ruben Esteban Avendaño Herrera, Main Researcher.",
        "2024-2024. Caracterización molecular de Lactococcus spp. aisladas de trucha arcoíris (Oncorhynchus mykiss) afectadas por enfermedad septicémica. UAEM ODS2024, Universidad Autónoma del Estado de México Convocatoria de Proyectos de Investigación Científica para la Consolidación de Grupos de Investigación y los Estudios Avanzados, con Enfoque de Inclusión e Integridad en el Marco de los ODS. Ruben Esteban Avendaño Herrera, Main Researcher.",
        "2021-2024. Production and evaluation of a diagnostic kit and an adjuvanted divalent vaccine against Yersinia ruckeri and Weissella ceti in rainbow trout. CONCYTEC Perú 74598 17 2. Ruben Esteban Avendaño Herrera, Main Researcher.",
        "2019-2023. FONDECYT 1190283. Comprehensive study of the biological, genetic, and molecular bases and virulence factors for the causative agent of tenacibaculosis in Chilean marine fish, Tenacibaculum dicentrarchi: an epidemiological approximation for developing prevention strategies. Ruben Avendaño, Investigador Principal.",
        "2019-2021. Strengthening of capacities to evaluate the limitations of pink shrimp fishing to Climate Change in coastal areas of Uruguay. Renato Quiñomes, Investigador Principal.",
        "2018-2020. Grant FIE 122929. Grant FIE 122929 “Integral studies on the biological and molecular bases of the life cycle of Piscirickettsia salmonis with epidemiological approach to develop techniques that allow its control. Rúben Avendaño, Director.",
        "2018. Grant SERNAPESCA ID Nº 1697-79-IN18. Analysis for the detection of tenacibaculosis an emerging disease in salmonids: evaluation of sanitary conditions in the field and technical consulting services to SERNAPESCA. Ruben Avendaño, Investigador Principal.",
        "2017-2020. UAEM 2017-2018 Proyecto Nº 4489/2018/CI. International Collaborator on Mexican grant UAEM 2017-2018 4489/2018/CI Biochemical and molecular characterization of Streptococcus spp. obtained from from rainbow trout Oncorhynchus mykiss. Ruben Avendaño, Investigador Principal.",
        "2016-2018. FIE 2015 V014. Program for Sanitary Management in Aquaculture (Programa para la Gestión Sanitaria en la Acuicultura) execution with SERNAPESCA. Responsible entity PUCV). Ruben Avendaño, Investigador Principal.",
        "2015-2019. FONDECYT 1150695. Identification and characterization of the iron uptake system in different Chilean Renibacterium salmoninarum isolates and its influence on pathogenesis and inmunogenicity in Atlantic salmon and rainbow trout. Ruben Avendaño-Herrera, Investigador Principal.",
        "2015-2018. FONDECYT Nº 3150505_Postdoc_Hector Levipan Determination of the quorum sensing role on the formation of biofilms of Flavobacterium psychrophilum and Piscirickettsia salmonis: sequestration of ALH type bacterial communication signals as alternative of bacterial control. Rubén Avendaño, Patrocinador.",
        "2013-2017. INACH (RT08-13). Study of bacteria diversity in antarctic waters and fish specie: Search for natural reservoirs of salmonids pathogens. Ruben Avendaño, Director.",
        "2013-2015. Proyecto Núcleo 447. Título: “Estudio de mecanismos de virulencia del patógeno acuícola, Flavobacterium psychrophilum, basado en un modelo innovador de cultivo primario de células y larvas de peces”.",
        "2013-2015. FIA –PYT-2013-0014. Título: “Base nacional de aislados bacterianos para la industria acuícola: un nuevo servicio para el diagnóstico, tratamiento y prevención de enfermedades de salmónidos”. Coordinador General.",
        "2012-2017. FONDAP 15110027. Título: “Centro Interdisciplinário de Investigación en Acuicultura Sustentable (INCAR)”. Investigador Principal.",
        "2012-2016. Proyecto FONDEF D10I1141. Título: “Desarrollo de la tecnología para el cultivo intensivo del congrio colorado: Fase II engorda”. Investigador Principal.",
        "2012-2014. Proyecto Interno Universidad Andrés Bello Nº DI-99-12/R. Título: “Evaluación de la eficacia de vacunas sitio-específicas o autovacunas de inmersión para la prevención de la Flavobacteriosis causada por Flavobacterium psychrophilum en alevines de trucha arcoíris (Oncorhynchus mykiss)”. Investigador Responsable.",
        "2011-2013. Proyecto FONDECYT REGULAR 1110219. Título: “Study of phage display strategy for the immunization of rainbow trout (Oncorhynchus mykiss) against the Chilean freshwater pathogen Flavobacterium psychrophilum”. Investigador Responsable.",
        "2010–2013. Proyecto del Concurso Nacional de Inserción de Nuevos/as Investigadores/as Posdoctorales en la Academia, Centros e Institutos de Investigación Nacionales, Universidad Andrés Bello (CONICYT) No. 79090006. Título: “Fortalecimiento y consolidación de las competencias académicas e investigación científica en el área acuícola asociada al Departamento de Ciencias Biológicas de la Universidad Andrés Bello a través de la inserción de 2 investigadores de excelencia”. Investigador Responsable.",
        "2009-2011. Proyecto Interno Universidad Andrés Bello Nº DI-01-10/R. Título: “Estudio de las concentraciones mínima inhibitoria y susceptibilidad in vitro de florfenicol, oxitetraciclina y ácido oxolínico en cepas de patógenos prevalentes de salmónidos, con el fin de estandarizar la selección de tratamientos terapéuticos”. Investigador Responsable.",
        "2009-2011. Proyecto FONDECYT REGULAR 1090054: Título: “Estudios in vitro e in vivo de factores de patogenicidad en el patógeno de salmón del Atlántico (Salmo salar) Streptococcus phocae”. Investigador Responsable.",
        "2008-2009. Proyecto INNOVA Código Nº 207-6537. Título: “Investigación, desarrollo y producción de vacunas para la prevención de la Pisciricketsiosis y enfermedades infecciosas concomitantes en Salmo salar”. Co-investigador.",
        "2006-2009. Proyecto IPC19 de inserción de personal altamente calificado en empresas del sector chileno del Programa de Bicentenario de Ciencia y Tecnología (CONICYT). Título: “Desarrollo y producción de vacunas con registro sanitario para peces, indicadas para prevenir las enfermedades infecciosas producidas por patógenos emergentes aclimatados en Chile”. Investigador Principal en Veterquímica S.A.",
        "2004-2005. Proyecto AGL2004-07037 del Ministerio de Ciencia y Tecnología, España. Participación: Miembro del Equipo de Investigación del Proyecto. Universidad de Santiago de Compostela, España. Título: Estudios in vitro e in vivo de importantes factores de virulencia en los patógenos de peces marinos Pseudomonas anguilliseptica y Tenacibaculum maritimum”. Miembro del Equipo Investigador.",
      ],
      en: [
        "2024–2026. Anticipating, rather than reacting to, the imminent threat of bacterial co-infections in farmed salmon in Chile: elucidation of fish susceptibility, bacterial behavior, and treatment efficacy during dual or multiple co-infections in Atlantic salmon. Project ID: 1230068. Funding: FONDEF. Rubén Esteban Avendaño Herrera.",
        "2021–2024. Production and evaluation of a diagnostic kit and an adjuvanted divalent vaccine against Yersinia ruckeri and Weissella ceti in rainbow trout. Project ID: 28-2020. Animal Health in Early Life Stages of Salmonids and Native Resources. Rubén Esteban Avendaño Herrera.",
        "2024. Molecular characterization of Lactococcus spp. isolated from rainbow trout (Oncorhynchus mykiss) affected by septicemic disease. Project: UAEM ODS2024. Animal Health in Early Life Stages of Salmonids and Native Resources. Rubén Esteban Avendaño Herrera.",
        "2023–2026. Anticipating bacterial co-infections in farmed salmon in Chile. Project ID: 1230068. Funding: FONDECYT. Rubén Esteban Avendaño Herrera, Principal Investigator.",
        "2023–2025. Study on the role of membrane vesicles from Renibacterium salmoninarum grown under iron-limited conditions on pathogenicity in Atlantic salmon (Postdoc Dr. Macarena Echeverría). Project ID: 3230453. Funding: FONDECYT. Postdoctoral sponsor.",
        "2022–2025. Snake venom toxins for drug discovery: identification and evaluation of proteins and peptides with antimicrobial activity. Project ID: 1220921. Funding: FONDECYT. Principal Investigator.",
        "2024. Molecular characterization of Lactococcus spp. in rainbow trout. UAEM ODS2024, Autonomous University of the State of Mexico. Principal Investigator.",
        "2021–2024. Production and evaluation of a diagnostic kit and vaccine against Yersinia ruckeri and Weissella ceti. Funding: CONCYTEC Peru (74598-17-2). Principal Investigator.",
        "2019–2023. Comprehensive study of Tenacibaculum dicentrarchi and its virulence factors for prevention strategies. FONDECYT 1190283. Principal Investigator.",
        "2019–2021. Capacity strengthening to evaluate climate change impacts on pink shrimp fisheries in Uruguay. Principal Investigator: Renato Quiñones.",
        "2018–2020. Biological and molecular studies of Piscirickettsia salmonis. FIE 122929. Director.",
        "2018. Detection and evaluation of tenacibaculosis in salmonids. SERNAPESCA Grant ID 1697-79-IN18. Principal Investigator.",
        "2017–2020. Molecular characterization of Streptococcus spp. from rainbow trout. UAEM Project 4489/2018/CI. Principal Investigator.",
        "2016–2018. Aquaculture Health Management Program (SERNAPESCA). Principal Investigator.",
        "2015–2019. Iron uptake system in Renibacterium salmoninarum. FONDECYT 1150695. Principal Investigator.",
        "2015–2018. Quorum sensing and biofilm formation in fish pathogens. FONDECYT Postdoc 3150505. Sponsor.",
        "2013–2017. Bacterial diversity in Antarctic waters and fish species. INACH RT08-13. Director.",
        "2013–2015. Virulence mechanisms of Flavobacterium psychrophilum. Núcleo Project 447.",
        "2013–2015. National database of bacterial isolates for aquaculture. FIA-PYT-2013-0014. General Coordinator.",
        "2012–2017. Interdisciplinary Center for Aquaculture Research (INCAR). FONDAP 15110027. Principal Investigator.",
        "2012–2016. Intensive aquaculture technology for red cusk eel. FONDEF D10I1141. Principal Investigator.",
        "2012–2014. Vaccine efficacy against flavobacteriosis in rainbow trout juveniles. Andrés Bello University Internal Project DI-99-12/R. Principal Investigator.",
        "2011–2013. Phage display immunization strategies in rainbow trout. FONDECYT 1110219. Principal Investigator.",
        "2010–2013. Strengthening academic and research capacity in aquaculture. CONICYT 79090006. Principal Investigator.",
        "2009–2011. Antimicrobial susceptibility in salmonid pathogens. Andrés Bello University Project DI-01-10/R. Principal Investigator.",
        "2009–2011. Pathogenicity factors in Streptococcus phocae. FONDECYT 1090054. Principal Investigator.",
        "2008–2009. Development of vaccines against piscirickettsiosis. INNOVA Project 207-6537. Co-investigator.",
        "2006–2009. Development and production of registered fish vaccines. CONICYT Bicentennial Program IPC19. Principal Investigator (Veterquímica S.A.).",
        "2004–2005. Virulence factors in marine fish pathogens. Project AGL2004-07037, Ministry of Science and Technology, Spain. Research Team Member, University of Santiago de Compostela.",
      ],
    },
  },
  {
    slug: "jaime-figueroa",
    line: "enfermedades-y-resistencia-antimicrobiana",
    name: "Dr. Jaime Figueroa Valverde",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "jefigueroa@uach.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/jaime-figueroa-2b7a0833/",
      orcid: "https://orcid.org/0000-0003-3036-6604",
      researchgate: "https://www.researchgate.net/profile/Jaime-Figueroa",
    },
    bio: {
      es: "El Dr. Jaime Figueroa V., es Biólogo, Magister y con Doctorado en biología celular y molecular de la Universidad Austral de Chile (UACH) de Valdivia. En este último, realizó tesis en la U. de Hamburgo con beca del DAAD. En 1990 ingresó a la UACH como académico e investigador trabajando en el ámbito de la biología molecular en peces, primero en el ámbito de la endocrinología comparada y luego, a raíz de las investigaciones realizadas, derivó a investigar el sistema inmune en peces y por correlación se inició también el tema de patógenos de peces centrándose ya por más de 20 años en Piscirickettsia salmonis. Posee cerca de 100 publicaciones en revistas de primera línea y desde el inicio del trabajo en P. salmonis, ha generado importantes aportes al conocimiento de este patógeno.\n\nEn el laboratorio de biología molecular de peces de la UACH en Valdivia, se han desarrollado diversos proyectos de investigación FONDECYT, Innova CORFO, FIE, algunos de ellos en consorcio con otras universidades y grupos de investigación nacionales.\n\nMiembro del INCAR desde su creación ha desarrollado investigación en diversos patógenos relevantes como P. salmonis, IPNv, ISA, tanto en salmónidos como en peces nativos en colaboración con diversas entidades nacionales e internacionales. Además, es miembro de 2 Sociedades científicas nacionales e internacionales.\n\nEl Dr. Figueroa es Profesor titular de la UACH, Evaluador de programas de postgrado de la CNA y evaluador de becas de postgrado CONICYT y evaluador de proyectos FIPA de Subpesca. En la formación de capital humano, ha dirigido cerca de 565 tesis de pregrado (patrocinio y copatrocinio) y 21 de Magister y Doctorado.",
      en: "Dr. Jaime Figueroa V. is a biologist with a Master’s degree and a PhD in Cellular and Molecular Biology from the Universidad Austral de Chile (UACH) in Valdivia. As part of his doctoral training, he completed his thesis research at the University of Hamburg with support from a DAAD scholarship. In 1990, he joined UACH as a faculty member and researcher, working in the field of molecular biology in fish. His early work focused on comparative endocrinology; later, based on his research findings, he shifted toward the study of the fish immune system and, by extension, fish pathogens. For more than 20 years, his research has focused primarily on Piscirickettsia salmonis. He has authored nearly 100 publications in leading scientific journals and, since beginning his work on P. salmonis, has made significant contributions to the understanding of this pathogen.\n\nAt the Fish Molecular Biology Laboratory of UACH in Valdivia, numerous research projects have been developed with funding from FONDECYT, Innova CORFO, and FIE, some of them in consortium with other universities and national research groups.\n\nA member of INCAR since its inception, Dr. Figueroa has conducted research on several relevant pathogens such as P. salmonis, IPNv, and ISA, in both salmonids and native fish species, in collaboration with various national and international institutions. In addition, he is a member of two national and international scientific societies.\n\nDr. Figueroa is a Full Professor at UACH, an evaluator of postgraduate programs for the CNA, an evaluator of CONICYT postgraduate scholarships, and a reviewer of FIPA projects for Subpesca. In terms of human capital training, he has supervised approximately 565 undergraduate theses (as advisor and co-advisor) and 21 Master’s and PhD theses.",
    },
    degrees: {
      es: [
        "1995. Doctor en Ciencias, mención Biología Molecular, Universidad de Hamburgo, Alemania, 1988-1990 y Universidad Austral, Chile, 1990-1995.",
        "1985. Magister en Ciencias, mención Biología Molecular, Universidad Austral, Chile, 1980-1985.",
        "1980. Bachillerato en Ciencias Biológicas, Universidad Austral, Chile.",
      ],
      en: [
        "1995. PhD in Sciences, specialization in Molecular Biology, University of Hamburg, Germany (1988–1990), and Universidad Austral de Chile, Chile (1990–1995).",
        "1985. Master of Science, specialization in Molecular Biology, Universidad Austral de Chile, Chile (1980–1985).",
        "1980. Bachelor’s Degree in Biological Sciences, Universidad Austral de Chile, Chile.",
      ],
    },
    projects: {
      es: [
        "FONDECYT de EXPLORACION N° 13250135. “Development of PROTAC technology as a novel antiviral strategy against the infections pancreatic necrosis virus in salmonids”, 2025, Investigador Respondable (2025-2028).",
        "Desarrollo de un prototipo de vacuna proteica contra Renibacterium salmoninarum, causante del BKD (Bacterial Kidney Disease) en Salmo salar. Proyecto FONDEF IDEA N° ID21|10066. 2022-2023. Director Alterno.",
        "CORFO; Plan Estratégico Ciencia e Innovacion para el 2030: Ciencia para la innovación 2030, Alianza Sur-Subantártica, Ci2030, Código 18CEIN-93501. U. del Bio-Bio, U. Talca, U. católica SC, U. de la Frontera, U. Austral de Chile, U. Magallanes, como beneficiarios mandantes. Representante UACH en el Consorcio. Primera etapa 2018.",
        "FONDECYT 1130069 Characterization of the genes related to invasivity and intracellular survival of Piscirickettsia salmonis: An in vitro study of new virulence markers in chilean isolates of the causal agent of SRS (2013-2016).",
        "Proyecto FIE (FIE 122929), Consorcio de Universidades: Estudio integral de las bases biológicas y moleculares del ciclo de vida de Piscirickettsia salmonis en el contexto de una aproximación epidemiológica para desarrollar estrategias que permitan su control. Entidad responsable PUCV, Universidades asociadas UACH y UNAB. Adicionalmente SERNAPESCA e INTESAL. Investigador asociado.",
        "Segundo Concurso de Proyectos, Fondo De Innovación Académica, Programa MECESUP-2: Potenciación, Internacionalización e Innovación del programa de Doctorado en el área de Biociencias Moleculares, conducente a la ampliación de la diversidad de disciplinas estratégicas. (2009-2011, MECESUP AUS 0704, monto del proyecto $ 973.322.400). Director del Proyecto.",
        "CORFO-INNOVA 07CN13 B259: Caracterización serológica, genómica y proteómica de los subtipos de Piscirickettsia salmonis presentes en la salmonicultura nacional: Bases biotecnológicas para asegurar el desarrollo sustentable y competitivo de la industria salmonera (2008-2010).",
      ],
      en: [
        "FONDECYT EXPLORATION No. 13250135. “Development of PROTAC technology as a novel antiviral strategy against infectious pancreatic necrosis virus in salmonids”, 2025. Principal Investigator (2025–2028).",
        "Development of a protein-based vaccine prototype against Renibacterium salmoninarum, the causative agent of Bacterial Kidney Disease (BKD) in Salmo salar. FONDEF IDEA Project No. ID21|10066. 2022–2023. Alternate Director.",
        "CORFO; Strategic Plan for Science and Innovation toward 2030: Science for Innovation 2030, South–Subantarctic Alliance, Ci2030, Code 18CEIN-93501. Universidad del Bío-Bío, Universidad de Talca, Universidad Católica de la Santísima Concepción, Universidad de La Frontera, Universidad Austral de Chile, and Universidad de Magallanes as beneficiary institutions. UACH Representative in the Consortium. First stage, 2018.",
        "FONDECYT 1130069. Characterization of genes related to invasiveness and intracellular survival of Piscirickettsia salmonis: An in vitro study of new virulence markers in Chilean isolates of the causative agent of SRS (2013–2016).",
        "FIE Project (FIE 122929), University Consortium: Comprehensive study of the biological and molecular bases of the life cycle of Piscirickettsia salmonis within the context of an epidemiological approach to develop strategies for its control. Responsible institution: PUCV; associated universities: UACH and UNAB; additional partners: SERNAPESCA and INTESAL. Associate Researcher.",
        "Second Project Call, Academic Innovation Fund, MECESUP-2 Program: Strengthening, Internationalization, and Innovation of the Doctoral Program in the area of Molecular Biosciences, aimed at expanding the diversity of strategic disciplines (2009–2011, MECESUP AUS 0704; project budget: CLP 973,322,400). Project Director.",
        "CORFO-INNOVA 07CN13 B259: Serological, genomic, and proteomic characterization of Piscirickettsia salmonis subtypes present in national salmon farming: Biotechnological bases to ensure sustainable and competitive development of the salmon industry (2008–2010).",
      ],
    },
  },
  {
    slug: "alex-romero",
    line: "enfermedades-y-resistencia-antimicrobiana",
    name: "Dr. Alex Romero Zuñiga",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "alexromero@uach.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/alex-romero-z%C3%BA%C3%B1iga-246ba12a3/",
      researchgate: "https://www.researchgate.net/profile/Alex-Romero",
    },
    bio: {
      es: "El Dr. Alex Romero es licenciado en bioquímica por la Universidad Austral de Chile (1998) y Doctor en Biología Celular y Molecular por la misma Universidad (2006). Actualmente es profesor titular en el Instituto de Patología Animal de la Facultad de Ciencias Veterinarias.\n\nSus áreas de investigación incluyen la inmunología y la biología molecular de organismos acuáticos, la caracterización genómica y el diagnóstico molecular de patógenos virales y bacterianos en peces.\n\nHa participado en proyectos nacionales e internacionales de investigación y desarrollo. Ha dirigido y co-dirigido tesis de grado y postgrado (Magister y Doctorado) en la UACh y otras universidades, así como proyectos posdoctorales. Ha sido miembro del Grupo de Estudio de Salud y Producción Animal de Fondecyt y es miembro de la Sociedad Chilena de Biología.\n\nActualmente dirige el Laboratorio de Inmunología Acuática y Estrés del Instituto de Patología Animal, donde ha consolidado su activa producción científica, sus redes de colaboración nacionales e internacionales y sus vínculos con el medio ambiente.\n\nDurante los últimos años ha liderado investigaciones orientadas al desarrollo y validación científica, tanto in vitro como in vivo, de aditivos de origen natural como alternativas no farmacológicas para mejorar la salud y el desempeño productivo de peces. Su trabajo también aborda la identificación de nuevos blancos terapéuticos para el tratamiento de enfermedades, así como el estudio de la inmunomodulación y los mecanismos de defensa en mucosas de salmónidos.",
      en: "Dr. Alex Romero holds a Bachelor’s degree in Biochemistry from the Austral University of Chile (1998) and a Ph.D. in Cellular and Molecular Biology from the same institution (2006). He is currently a Full Professor at the Institute of Animal Pathology, Faculty of Veterinary Sciences.\n\nHis research areas include immunology and molecular biology of aquatic organisms, genomic characterization, and molecular diagnosis of viral and bacterial pathogens in fish.\n\nHe has participated in national and international research and development projects. He has supervised and co-supervised undergraduate and graduate theses (Master’s and Ph.D.) at UACh and other universities, as well as postdoctoral projects. He has been a member of the FONDECYT Study Group on Animal Health and Production and is a member of the Chilean Society of Biology.\n\nHe currently leads the Aquatic Immunology and Stress Laboratory at the Institute of Animal Pathology, where he has consolidated a strong scientific output, national and international collaboration networks, and engagement with environmental stakeholders.\n\nIn recent years, he has led research focused on the development and scientific validation, both in vitro and in vivo, of natural-origin additives as non-pharmacological alternatives to improve fish health and production performance. His work also addresses the identification of new therapeutic targets for disease treatment, as well as the study of immunomodulation and defense mechanisms in the mucosal tissues of salmonids.",
    },
    degrees: {
      es: [
        "2006. Doctor en Ciencias, mención Biología Celular y Molecular de la Facultad de Ciencias, Universidad Austral, Chile.",
        "1995. Bioquímico, Universidad Austral, Chile.",
      ],
      en: [
        "2006. PhD in Science, specialization in Cellular and Molecular Biology, Faculty of Sciences, Austral University of Chile.",
        "1995. Biochemist, Austral University of Chile.",
      ],
    },
    projects: { es: [], en: [] },
  },
  {
    slug: "claudio-miranda",
    line: "enfermedades-y-resistencia-antimicrobiana",
    name: "Dr. Claudio Miranda",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "cdmiranda@ucn.cl",
    links: {
      linkedin: "https://cl.linkedin.com/in/claudio-miranda-46052026",
      orcid: "https://orcid.org/0000-0002-4419-7090",
      researchgate: "https://www.researchgate.net/profile/Claudio-Miranda",
    },
    bio: {
      es: "El Dr. Claudio D. Miranda, Profesor Titular de la Universidad Católica del Norte, Chile, es Director del Programa de Doctorado en Acuicultura. Su investigación se ha centrado en la comprensión integral de la resistencia antimicrobiana en bacterias acuáticas como consecuencia del uso intensivo de antibióticos en la acuicultura chilena de peces y moluscos.\n\nObtuvo su Magíster en Microbiología en la Universidad de Chile en 1993, y su doctorado en Ciencias Biológicas en la Universidad de Concepción, Chile, en 2002. Para alcanzar estos objetivos, ha desarrollado diversos estudios utilizando enfoques tanto cultivables como metagenómicos, con el fin de caracterizar la microbiota resistente a antibióticos, así como detectar los mecanismos de resistencia antimicrobiana y los genes asociados a dicha resistencia en sistemas de agua dulce y marinos vinculados a la actividad acuícola.\n\nAsimismo, ha investigado algunos de los principales elementos involucrados en el moviloma bacteriano, incluyendo plásmidos e integrones, tanto en bacterias aisladas como en su capacidad de ser transferidos horizontalmente. De este modo, se han estudiado ampliamente los determinantes genéticos asociados a la resistencia a quinolonas, fenicoles, tetraciclinas, sulfonamidas, entre otros antibacterianos.",
      en: "Dr. Claudio D. Miranda, Full Professor of the Universidad Católica del Norte, Chile, Director of the PhD in Aquaculture Program. His research has focused on the comprehensive understanding of antimicrobial resistance among aquatic bacteria as a consequence of the intensive use of antibiotics in Chilean fish and shellfish aquaculture. He obtained his MSc in Microbiology in Universidad de Chile in 1993, and his PhD in Biological Sciences in Universidad de Concepción, Chile in 2002. To accomplish these aims, various studies have been performed using culturable and metagenomic approaches to characterize the antibiotic resistant microbiota, as well as to detect the antimicrobial resistance mechanism and genes encoding for their resistance in the freshwater and marine systems associated with aquatic farming. Furthermore, some main elements involved in the bacterial mobilome, including plasmids and integrons, have been studied in isolated bacteria, as well as their ability to be horizontally transferred. Thus, genetic determinants encoding for resistance to quinolones, phenicols, tetracyclines, sulfonamides, among others, have been profusely investigated.",
    },
    degrees: {
      es: [
        "2002. Doctor en Ciencias Biológicas, Universidad de Concepción, Chile.",
        "1993. Magíster en Microbiología, Universidad de Concepción, Chile.",
        "1985. Biólogo Marino, Universidad de Concepción, Chile.",
      ],
      en: [
        "2002. PhD in Biological Sciences, University of Concepción, Chile.",
        "1993. Master’s Degree in Microbiology, University of Concepción, Chile.",
        "1985. Marine Biologist, University of Concepción, Chile.",
      ],
    },
    projects: { es: [], en: [] },
  },
  {
    slug: "cristian-gallardo",
    line: "soluciones-omicas",
    name: "Dr. Cristian Gallardo Escárate",
    role: { es: "Investigador Principal", en: "Principal Investigator" },
    email: "crisgallardo@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/cristian-gallardo-772ba854/",
      orcid: "https://orcid.org/0000-0002-7094-6702",
    },
    bio: {
      es: "El Dr. Gallardo-Escárate es Biólogo Marino de la Universidad Católica del Norte y posee un Doctorado en Acuicultura de CICESE, Baja California, México (2005).\n\nEn 2006 se integró a la Universidad de Concepción, donde ha liderado el laboratorio de Biotecnología y Genómica Acuícola, especializándose en estudios genómicos de organismos marinos. En el año 2012 el Dr. Gallardo-Escárate asume como Subdirector del centro de excelencia INCAR financiado por ANID (ex CONICYT) a través del programa del Fondo de Áreas Prioritarias (FONDAP). Y Desde el 2026 asume como Director del centro de excelencia CIA-INCAR² de la Universidad de Concepción.\n\nEl investigador ha publicado más de 201 trabajos científicos en revistas arbitradas y más de 250 presentaciones en reunión científicas alrededor del mundo. El Dr. Gallardo-Escárate, forma parte de comités de evaluación de proyectos Europeos en el área de biotecnología marina.",
      en: "Dr. Gallardo-Escárate is a Marine Biologist from the Universidad Católica del Norte and holds a PhD in Aquaculture from CICESE (Center for Scientific Research and Higher Education of Ensenada), Baja California, Mexico (2005).\n\nIn 2006, he joined the University of Concepción, where he has led the Aquaculture Biotechnology and Genomics Laboratory, specializing in genomic studies of marine organisms. In 2012, Dr. Gallardo-Escárate became Deputy Director of the INCAR Center of Excellence, funded by ANID (formerly CONICYT) through the Fund for Priority Areas (FONDAP) program. Since 2026, he has served as Director of the CIA-INCAR² Center of Excellence at the University of Concepción.\n\nHe has published more than 201 scientific articles in peer-reviewed journals and delivered over 250 presentations at scientific meetings worldwide. Dr. Gallardo-Escárate is also a member of evaluation committees for European research projects in the field of marine biotechnology.",
    },
    degrees: {
      es: [
        "Doctorado en Ciencias, Programa Acuicultura y Biotecnología Marina. Centro de Investigaciones Científicas y de Educación Superior de Ensenada, Baja California, México.",
        "Licenciatura en Ciencias del Mar, Universidad Católica del Norte, Chile.",
        "Biólogo Marino, Universidad Católica del Norte. Chile.",
      ],
      en: [
        "PhD in Science, Aquaculture and Marine Biotechnology Program, Center for Scientific Research and Higher Education of Ensenada (CICESE), Baja California, Mexico.",
        "Bachelor’s Degree in Marine Sciences, Universidad Católica del Norte, Chile.",
        "Marine Biologist, Universidad Católica del Norte, Chile.",
      ],
    },
    projects: {
      es: [
        "2024-2026. Herramienta Molecular para el Monitoreo de la Sensibilidad Farmacológica de Productos Antiparasitarios contra el Piojo de Mar en la Industria Salmonera. Código del proyecto ID24I10188, Fuente de financiamiento FONDEF. Investigador Principal.",
        "2023-2025. INTERDISCIPLINARY CENTER FOR AQUACULTURE RESEARCH (INCAR). Código del proyecto 1523A0007. Fuente de financiamiento FONDAP. Investigador Principal.",
        "2021-2025. Dancing with the genes: the role of topologically associated domains (TADs) to drive the non-coding/coding RNA interactions in sea lice biology. Código del proyecto 1210852. Fuente de financiamiento FONDECYT. Investigador Principal.",
        "2021-2023. Center for Oceanographic Research in the eastern South Pacific, COPAS Sur-Austral (COASTAL). Código del proyecto FB21002. Fuente de financiamiento PIA. Investigador Principal.",
        "2018-2021. FONDECYT N° 1180867. Beyond proteins, genes and mutations: the hidden non-coding nature of the drug resistance in sea lice. Director.",
        "2017-2020. FONDECYT Nº1161512. Inner-shelf regimes of hypoxia in an upwelling region: spatial heterogeneity and implications for coastal benthic ecology. Investigador Principal.",
        "2017-2019. Proyecto Postdoctorado FONDECYT 3170152. Evaluación de factores de riesgo y determinantes de infestación por Caligus rogercresseyi. Evaluación de eficacia de tratamientos antiparasitarios. Dr. Cristian Gallardo, Investigador Principal.",
        "2017-2019. Proyecto FONDEF IDeA dos Etapas. Utilización de extracto de Olivo rico en hidroxitirosol como aditivo en la alimentación de Seriola lalandi. Co-Investigador Principal.",
        "2017-2019. FIE 2015-V014-SERNAPESCA. CaligusLIFE: Scientific research of excellence for the understanding of the biology of Caligus rogercresseyi and its application in caligidosis control strategies in the salmon industry. Director.",
        "2017-2018. Contrato Tecnológico 17COTE-72396. Farmacología en Aquacultura Veterinaria FAV S.A. y Universidad de Concepción. Investigador Principal.",
        "2017. FONDECYT ID16I10453. Utilization of Olive extract rich in hydroxytyrosol as an additive in the diet of Seriola lalandi. Investigador Principal.",
        "2015-2018. Proyecto FONDECYT N° 1150585. Some like it hot: the impact of thermal choice on disease susceptibility in fish. Dr. Sebastian Boltaña (Investigador Principal.), co-Investigador Principal.",
        "2015-2018. FONDECYT N° 1150077. Uncovering the role of microRNAs by deep sequencing during the ontogenetic development of the salmon louse Caligus rogercresseyi. Investigador Principal.",
        "2015-2018. Programa para la Gestión Sanitaria en Acuicultura, FIE 2015-V014. Laboratorio Referencia Caligus – SERNAPESCA, Chile. Investigador Principal.",
        "2014-2018. Proyecto FONDECYT N°1140862. Disentangling source-sink dynamics with spatial and temporal patterns of genomic diversity and structure in Mytilus chilensis and Pyura chilensis. Universidad Católica del Norte, Dra. Pilar Haye, Investigadora Principal.). Investigador Principal.",
        "2014-2017. FONDECYT_Postdoc 3140183-PostDoc Ana Goncalves. Metatranscriptome modulation of pre-and probiotic dietary supplementation in rainbow trout (oncorhynchus mykiss) under intensive aquaculture conditions. Patrocinador.",
        "2014-2016. Proyecto FONDECYT N°3140257. Metatranscriptome modulation of pre- and probiotic dietary supplementation in rainbow trout (Oncorhynchus mykiss) under intensive aquaculture conditions. (Dr. Ana Teresa Gonçalves, Investigadora Principal.), Investigador Principal.",
        "2013-2016. Proyecto FONDECYT N°1130807. Molecular evolutionary underpinnings of a successful invasion: neutral and adaptive divergence and their causes among naturalized rainbow trout populations in two patagonian lakes differentially impacted by aquaculture. (Dr. Daniel Gómez, Investigador Principal.), Investigador Principal.",
        "2013-2016. Proyecto FONDECYT N°. Population genetic structure of the monogenean parasites, Benedenia cf seriolae and Zeuxapta cf seriolae, infesting natural populations of Seriola lalandi, and its implications for aquaculture. (Dr. María Teresa González, Investigadora Principal.), Investigador Principal.",
        "2013-2015. Proyecto Postdoctorado FONDECYT 3130446 “Patrones de expresión de miRNA e identificación de SNPs asociados al proceso de maduración gonadal en la trucha arcoiris Oncorhynchus mykiss” (Dr. Rodolfo Farlora, Investigador Principal.), Investigador Principal.",
        "2012-2017. Proyecto FONDAP Nº1510027. Interdisciplinary Center for Aquaculture Research (INCAR), Fourth National Competition for research Centers of Excellence in priority Areas. Director Adjunto.",
        "2012-2015. Proyecto 12IDL2-15119 I+D Aplicada InnovaChile Corfo “Generación de vacuna inhibitoria de Miostatina para incrementar el crecimiento de abalones rojo, como estrategia de mejoramiento productivo”. Director.",
        "2012-2014. Proyecto FONDECYT 1120896. “Latitudinal shift in the coupling of inner-shelf and mesoscale variability as an explanation for the ecological break observed along central-northern Chile (30-31°S). Universidad de Concepción. (Dr. Fabian Tapia, Investigador Principal), Co- Investigador Principal.PI.",
        "2012-2014. Proyecto FONDECYT 1120397. “Insights into innate immune response of bivalves challenged to Alexandrum catenella: Comparative transcriptome analysis by 454 pyrosequencing”. Universidad de Concepción. Investigador Principal.",
        "2011-2014. Proyecto FONDEF D09I1067. “Biotecnología aplicada a la producción de un híbrido entre abalón rojo y verde (Fase 2): Optimización del procedimiento de cruza para el desarrollo de una variedad de interés productivo y comercial”. Universidad de Concepción. Director.",
        "2011-2014. FONDEF D09I1065. “Plataforma de referencia para el manejo genómico sustentable de recursos bentónicos de interés comercial y repoblamiento de bancos naturales”. Universidad de Concepción, Universidad Católica del Norte, Universidad Austral de Chile. Co- Investigador Principal.",
        "2010-2012. Proyecto “Desarrollo y validación de una técnica innovadora de identificación parental genética en loco Concholepas concholepas como herramienta para evaluar la efectividad de las metodología s de repoblamiento, acondicionamiento y manejo en las AMERBs de la IV Región”. GORE- Coquimbo. Chile. Director.",
      ],
      en: [
        "2024–2026. Molecular Tool for Monitoring Drug Sensitivity of Antiparasitic Products Against Sea Lice in the Salmon Industry. Project ID: ID24I10188. Funding: FONDEF. Principal Investigator.",
        "2023–2025. Interdisciplinary Center for Aquaculture Research (INCAR). Project ID: 1523A0007. Funding: FONDAP. Principal Investigator.",
        "2021–2025. Dancing with the Genes: The Role of Topologically Associated Domains (TADs) in Driving Non-coding/Coding RNA Interactions in Sea Lice Biology. Project ID: 1210852. Funding: FONDECYT. Principal Investigator.",
        "2021–2023. Center for Oceanographic Research in the Eastern South Pacific, COPAS Sur-Austral (COASTAL). Project ID: FB21002. Funding: PIA. Principal Investigator.",
        "2018–2021. Beyond Proteins, Genes and Mutations: The Hidden Non-coding Nature of Drug Resistance in Sea Lice. FONDECYT N°1180867. Director.",
        "2017–2020. Inner-shelf Regimes of Hypoxia in an Upwelling Region: Spatial Heterogeneity and Implications for Coastal Benthic Ecology. FONDECYT Nº1161512. Principal Investigator.",
        "2017–2019. FONDECYT Postdoctoral Project 3170152. Risk factors and determinants of infestation by Caligus rogercresseyi; evaluation of antiparasitic treatments. (Dr. Cristian Gallardo, PI).",
        "2017–2019. FONDEF IDeA Project (Two Stages). Use of olive extract rich in hydroxytyrosol as a feed additive for Seriola lalandi. Co-Principal Investigator.",
        "2017–2019. FIE 2015-V014-SERNAPESCA. CaligusLIFE: Excellence research on Caligus rogercresseyi biology and applications for caligidosis control in the salmon industry. Director.",
        "2017–2018. Technological Contract 17COTE-72396. Veterinary Aquaculture Pharmacology (FAV S.A. and University of Concepción). Principal Investigator.",
        "2017. FONDECYT ID16I10453. Olive extract rich in hydroxytyrosol as a dietary additive in Seriola lalandi. Principal Investigator.",
        "2015–2018. Some Like It Hot: Impact of Thermal Choice on Disease Susceptibility in Fish. FONDECYT N°1150585. Co-Principal Investigator.",
        "2015–2018. Role of microRNAs during ontogenetic development of Caligus rogercresseyi. FONDECYT N°1150077. Principal Investigator.",
        "2015–2018. Health Management Program in Aquaculture, FIE 2015-V014. Caligus Reference Laboratory – SERNAPESCA, Chile. Principal Investigator.",
        "2014–2018. Genomic diversity and structure in Mytilus chilensis and Pyura chilensis. FONDECYT N°1140862. Principal Investigator.",
        "2014–2017. FONDECYT Postdoc 3140183. Metatranscriptomic modulation of pre- and probiotic diets in rainbow trout (Oncorhynchus mykiss). Sponsor.",
        "2014–2016. FONDECYT N°3140257. Pre- and probiotic dietary effects in rainbow trout under intensive aquaculture. Principal Investigator.",
        "2013–2016. Molecular evolution of rainbow trout populations under aquaculture influence. FONDECYT N°1130807. Principal Investigator.",
        "2013–2016. Population genetics of monogenean parasites in Seriola lalandi. FONDECYT. Principal Investigator.",
        "2013–2015. FONDECYT Postdoctoral Project 3130446. miRNA expression and SNP identification in gonadal maturation of rainbow trout. Principal Investigator.",
        "2012–2017. FONDAP N°1510027. Interdisciplinary Center for Aquaculture Research (INCAR). Deputy Director.",
        "2012–2015. InnovaChile CORFO Project 12IDL2-15119. Myostatin-inhibiting vaccine to enhance red abalone growth. Director.",
        "2012–2014. Latitudinal variability and ecological break in central-northern Chile. FONDECYT 1120896. Co-Principal Investigator.",
        "2012–2014. Innate immune response of bivalves to Alexandrium catenella. FONDECYT 1120397. Principal Investigator.",
        "2011–2014. FONDEF D09I1067. Hybrid abalone production biotechnology (Phase 2). Director.",
        "2011–2014. FONDEF D09I1065. Genomic management platform for benthic resources. Co-Principal Investigator.",
        "2010–2012. Genetic parentage identification in Concholepas concholepas for stock enhancement evaluation. GORE Coquimbo. Director.",
      ],
    },
  },
  {
    slug: "diego-valenzuela",
    line: "soluciones-omicas",
    name: "Dr. Diego Valenzuela Miranda",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "divalenzuela@udec.cl",
    links: {
      orcid: "https://orcid.org/0000-0001-7319-4860",
      scholar: "https://scholar.google.com/citations?user=zkp5VSMAAAAJ&hl=es",
    },
    bio: {
      es: "El Dr. Diego Valenzuela-Miranda es investigador del Centro INCAR², especializado en genómica, transcriptómica, metagenómica y bioinformática aplicada a la acuicultura. Su investigación se enfoca en comprender las respuestas moleculares de organismos acuáticos frente a patógenos, parásitos, fármacos antiparasitarios y cambios ambientales, con especial interés en salmónidos, Caligus rogercresseyi, Piscirickettsia salmonis y microbiotas asociadas a sistemas acuícolas.\n\nParte de su trabajo se ha orientado al estudio de los mecanismos moleculares asociados a la tolerancia y sensibilidad de Caligus rogercresseyi frente a tratamientos antiparasitarios utilizados en la salmonicultura. En este contexto, ha investigado respuestas transcriptómicas, regulación por RNAs no codificantes, variación genómica, microbiota asociada y posibles mecanismos de adaptación frente a la presión ejercida por fármacos antiparasitarios.\n\nSu trabajo integra herramientas ómicas y bioinformáticas para estudiar interacciones hospedero-patógeno-parásito, resistencia y susceptibilidad frente al piojo de mar, microbioma acuícola y detección molecular de patógenos mediante secuenciación masiva y Nanopore. Ha participado en publicaciones sobre genómica de piojo de mar, transcriptómica de salmónidos, microbiota, respuesta inmune y vigilancia de patógenos bacterianos en acuicultura.",
      en: "Dr. Diego Valenzuela-Miranda is a researcher at the INCAR² Center, specializing in genomics, transcriptomics, metagenomics, and bioinformatics applied to aquaculture. His research focuses on understanding the molecular responses of aquatic organisms to pathogens, parasites, antiparasitic drugs, and environmental changes, with particular emphasis on salmonids, Caligus rogercresseyi, Piscirickettsia salmonis, and microbiota associated with aquaculture systems.\n\nPart of his work has focused on the study of molecular mechanisms associated with tolerance and sensitivity of Caligus rogercresseyi to antiparasitic treatments used in salmon farming. In this context, he has investigated transcriptomic responses, regulation by non-coding RNAs, genomic variation, associated microbiota, and potential adaptive mechanisms under the selective pressure exerted by antiparasitic drugs.\n\nHis research integrates omics and bioinformatics tools to study host–pathogen–parasite interactions, resistance and susceptibility to sea lice, aquaculture microbiomes, and molecular pathogen detection using high-throughput sequencing and Nanopore technologies. He has contributed to scientific publications on sea lice genomics, salmonid transcriptomics, microbiota, immune response, and bacterial pathogen surveillance in aquaculture.",
    },
    degrees: {
      es: [
        "2019. Doctor en Ciencias con mención en Manejo de Recursos Acuáticos Renovables, Universidad de Concepción, Chile.",
        "2013. Ingeniero en Biotecnología Marína y Acuicultura, Universidad de Concepción, Chile.",
      ],
      en: [
        "2019. Ph.D. in Sciences, specialization in Renewable Aquatic Resources Management, University of Concepción, Chile.",
        "2013. Marine Biotechnology and Aquaculture Engineer, University of Concepción, Chile.",
      ],
    },
    projects: {
      es: [
        "2026-2028. Proyecto FONDECYT N° 1260750, “Epitranscriptomics of Sex Determination in Sea Lice (EPISex): Interplay between RNA Modifications and Gene Regulation”. Fuente de financiamiento: FONDECYT. Coinvestigador.",
        "2024-2026. Proyecto FONDEF N° ID24I10188, “Herramienta molecular para el monitoreo de la sensibilidad farmacológica de productos antiparasitarios contra el piojo de mar en la industria salmonera”. Fuente de financiamiento: FONDEF. Investigador.",
        "2021-2024. Proyecto FONDECYT N° 1210852, “Dancing with the genes: the role of topologically associated domains (TADs) to drive the non-coding/coding RNA interactions in sea lice biology”. Fuente de financiamiento: FONDECYT. Coinvestigador.",
        "2020-2022. Proyecto FONDECYT N° 3200600, “Untangling the sea lice microbiome: a potential threat for Chilean salmon farming”. Fuente de financiamiento: FONDECYT. Investigador Responsable.",
      ],
      en: [
        "2026–2028. FONDECYT Project No. 1260750, “Epitranscriptomics of Sex Determination in Sea Lice (EPISex): Interplay between RNA Modifications and Gene Regulation”. Funding source: FONDECYT. Co-investigator.",
        "2024–2026. FONDEF Project No. ID24I10188, “Molecular tool for monitoring the pharmacological sensitivity of antiparasitic products against sea lice in the salmon industry”. Funding source: FONDEF. Researcher.",
        "2021–2024. FONDECYT Project No. 1210852, “Dancing with the genes: the role of topologically associated domains (TADs) to drive non-coding/coding RNA interactions in sea lice biology”. Funding source: FONDECYT. Co-investigator.",
        "2020–2022. FONDECYT Project No. 3200600, “Untangling the sea lice microbiome: a potential threat for Chilean salmon farming”. Funding source: FONDECYT. Principal Investigator.",
      ],
    },
  },
  {
    slug: "marco-yevenes",
    line: "soluciones-omicas",
    name: "Dr. Marco Yevenes",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "marco.yevenes@ulagos.cl",
    links: {
      orcid: "https://orcid.org/0000-0003-1423-541X",
      researchgate: "https://www.researchgate.net/profile/Marco-Yevenes",
    },
    bio: {
      es: "El Dr. Marco Yévenes es biólogo especializado en genética, epigenética y biología evolutiva, con experiencia en investigación en proyectos de ciencia básica y aplicada. A lo largo de su trayectoria ha integrado diversos equipos multidisciplinarios, contribuyendo a la generación de conocimiento con proyección científica e industrial.\n\nSu trabajo se centra en comprender cómo la variabilidad genética y epigenética —mediante enfoques genómicos y epigenómicos— modula procesos adaptativos y biogeográficos que explican la diversidad biológica, particularmente en especies marinas de interés científico y acuícola. Sus investigaciones abordan desde dinámicas microevolutivas, como la adaptación local, hasta procesos macroevolutivos, con énfasis en los mecanismos que subyacen a la especiación. Ha publicado en revistas internacionales y participado en congresos especializados, contribuyendo al avance de la genómica y epigenómica evolutiva, especialmente en problemáticas asociadas a la adaptación, evolución, manejo y conservación de las poblaciones naturales en distintos contextos ecológicos.",
      en: "Dr. Marco Yévenes is a biologist specialized in genetics, epigenetics, and evolutionary biology, with experience in research projects spanning both basic and applied science. Throughout his career, he has been part of diverse multidisciplinary teams, contributing to the generation of knowledge with both scientific and industrial relevance.\n\nHis research focuses on understanding how genetic and epigenetic variability—through genomic and epigenomic approaches—modulates adaptive and biogeographic processes that explain biological diversity, particularly in marine species of scientific and aquaculture interest. His work addresses processes ranging from microevolutionary dynamics, such as local adaptation, to macroevolutionary patterns, with a strong emphasis on the mechanisms underlying speciation. He has published in international journals and participated in specialized conferences, contributing to advances in evolutionary genomics and epigenomics, especially in issues related to the adaptation, evolution, management, and conservation of natural populations across diverse ecological contexts.",
    },
    degrees: {
      es: [
        "2021. Doctor en ciencias, mención conservación y manejo de recursos naturales. Universidad de Los Lagos.",
        "2000. Magister en ciencias, mención genética. Universidad de Chile.",
        "1993. Licenciado en biología. Universidad de Talca.",
      ],
      en: [
        "2021. PhD in Science, specialization in Conservation and Management of Natural Resources. Universidad de Los Lagos.",
        "2000. Master of Science, specialization in Genetics. Universidad de Chile.",
        "1993. Bachelor’s Degree in Biology. Universidad de Talca.",
      ],
    },
    projects: {
      es: [
        "2025-2028. ID 233. Fondo Regional para la Productividad y el Desarrollo FRPD, Región de Los Lagos. “Plataforma multi-ómica para la mitilicultura sostenible: soluciones científico-tecnológicas al desafío de la fijación y el desprendimiento de semillas de Mytilus chilensis en la Región de Los Lagos”. Director.",
        "2023-2024. Ige03-23. Proyecto Interno Regular, Universidad de Los Lagos. “Diferencias epigenéticas en la expresión del genoma de Mytilus chilensis, un recurso nativo explotado”. Co-Investigador.",
        "2013–2015. CORFO INNOVA 13IDL2-18532. “Obtención y desarrollo de nuevas fuentes de colorantes naturales para la industria de alimentos mediante bioprospección en microorganismos acuáticos”. Investigador.",
        "2010–2014. 8C046. Fundación COPEC-UC. “Investigación y desarrollo de ensayos de laboratorio, estandarizados y validados, que midan parámetros fisiológicos y genómicos con los cuales se establezca el diagnóstico precoz de los fenómenos iniciales asociados a smoltificación en peces salmónidos de cultivo”. Director alterno.",
        "2010–2012. CORFO INNOVA 09MCSS-6721. “Prospección y desarrollo de herramientas para el diagnóstico de bacterias y virus patógenos asociados a microhábitats emergentes de acuicultura intensiva”. Asesor externo e Investigador.",
        "2010-2012. CORFO INNOVA 09CN14-5951. “Reforzamiento de la Red de Salud Pública para la inocuidad de moluscos bivalvos frescos mediante una vigilancia molecular efectiva y un modelo de gestión de riesgo de Vibrio parahaemolyticus toxigénico, Vibrio vulnificus y Norovirus”. Investigador.",
      ],
      en: [
        "2025–2028. ID 233. Regional Fund for Productivity and Development (FRPD), Los Lagos Region. “Multi-omic platform for sustainable mussel farming: scientific and technological solutions to the challenge of seed settlement and detachment of Mytilus chilensis in the Los Lagos Region.” Principal Investigator.",
        "2023–2024. IGE03-23. Internal Regular Project, Universidad de Los Lagos. “Epigenetic differences in genome expression of Mytilus chilensis, an exploited native resource.” Co-Investigator.",
        "2013–2015. CORFO INNOVA 13IDL2-18532. “Development of new sources of natural colorants for the food industry through bioprospecting of aquatic microorganisms.” Researcher.",
        "2010–2014. 8C046. COPEC-UC Foundation. “Research and development of standardized and validated laboratory assays to measure physiological and genomic parameters for early diagnosis of initial phenomena associated with smoltification in farmed salmonid fish.” Alternate Principal Investigator.",
        "2010–2012. CORFO INNOVA 09MCSS-6721. “Prospecting and development of diagnostic tools for pathogenic bacteria and viruses associated with emerging microhabitats of intensive aquaculture.” External Advisor and Researcher.",
        "2010–2012. CORFO INNOVA 09CN14-5951. “Strengthening the Public Health Network for the safety of fresh bivalve mollusks through effective molecular surveillance and a risk management model for toxigenic Vibrio parahaemolyticus, Vibrio vulnificus, and Norovirus.” Researcher.",
      ],
    },
  },
  {
    slug: "constanza-saez",
    line: "soluciones-omicas",
    name: "Constanza Sáez Vera",
    role: { es: "Estudiante de Doctorado", en: "PhD Student" },
    email: "constanzajasaez@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/constanzasaezvera/",
      orcid: "https://orcid.org/0009-0006-7925-3319",
      researchgate: "https://www.researchgate.net/profile/Constanza-Saez-Vera",
    },
    bio: {
      es: "Constanza Sáez Vera es Médico Veterinario con grado de Magíster Profesional en Medicina Preventiva Veterinaria de la Universidad Austral de Chile. Actualmente es estudiante del Doctorado en Microbiología de la Universidad de Concepción. Su trayectoria científica se ha centrado en proyectos de genómica acuícola, resistencia farmacológica y biología molecular aplicada a organismos de interés para la salmonicultura, participando en diversos proyectos Fondecyt y FONDEF como asistente de investigación.\n\nSu trabajo científico previo al doctorado estuvo enfocado en el estudio de mecanismos moleculares asociados a sensibilidad y resistencia a antiparasitarios en Caligus rogercresseyi. Actualmente, su proyecto doctoral investiga el impacto de la infección por el virus de la necrosis pancreática infecciosa (IPNV) sobre el microbioma mucosal y la regulación epigenética en Salmo salar. Mediante enfoques metagenómicos, metatranscriptómicos y epigenómicos, busca caracterizar las interacciones entre hospedador, microbiota y virus, identificando mecanismos asociados a disbiosis, respuesta inmune y susceptibilidad frente a infecciones virales en salmonicultura.",
      en: "Constanza Sáez Vera is a Veterinarian holding a Professional Master’s Degree in Veterinary Preventive Medicine from the Austral University of Chile. She is currently a PhD student in Microbiology at the University of Concepción.\n\nHer scientific career has focused on aquaculture genomics, drug resistance, and molecular biology applied to organisms of interest in salmon farming. She has participated as a research assistant in several Fondecyt and FONDEF projects.\n\nPrior to her doctoral studies, her research work focused on the study of molecular mechanisms associated with sensitivity and resistance to antiparasitic treatments in Caligus rogercresseyi. Currently, her PhD research investigates the impact of infection by Infectious Pancreatic Necrosis Virus (IPNV) on the mucosal microbiome and epigenetic regulation in Salmo salar. Through metagenomic, metatranscriptomic, and epigenomic approaches, her work aims to characterize host–microbiota–virus interactions, identifying mechanisms associated with dysbiosis, immune response, and susceptibility to viral infections in salmon aquaculture.",
    },
    degrees: {
      es: [
        "2024 – presente. Doctorado en Microbiología.",
        "2019. Magister Profesional en Medicina Preventiva Veterinaria, Universidad Austral de Chile, Chile.",
        "2017. Médico Veterinario, Universidad San Sebastián, Chile.",
      ],
      en: [
        "2024 – present. PhD in Microbiology.",
        "2019. Professional Master’s Degree in Veterinary Preventive Medicine, Austral University of Chile, Chile.",
        "2017. Doctor of Veterinary Medicine, San Sebastián University, Chile.",
      ],
    },
    projects: { es: [], en: [] },
  },
  {
    slug: "alberto-sandoval",
    line: "soluciones-omicas",
    name: "Alberto Sandoval",
    role: { es: "Estudiante de Doctorado", en: "PhD Student" },
    email: "asandoval2016@udec.cl",
    links: {
      researchgate: "https://www.researchgate.net/profile/Alberto-Sandoval-3",
    },
    bio: {
      es: "Alberto Sandoval Concha es Médico Veterinario y es candidato a Doctor en Microbiología de la Universidad de Concepción. Cuenta con experiencia como asistente de investigación y desarrollo en microbiología, biología molecular y biotecnología, abarcando el estudio de enfermedades infecciosas virales, bacterianas y parasitarias, con énfasis en sistemas acuáticos.\n\nActualmente integra el Laboratorio de Biotecnología y Genómica Acuícola (LBGA) del Centro de Biotecnología UdeC, donde participa en proyectos de genómica de patógenos relevantes, desarrollo de estrategias biocontrol, y análisis bioinformático de datos ómicos para la acuicultura. En este contexto, desarrolla su tesis doctoral en microbiología y genómica acuática, orientada a dilucidar los mecanismos moleculares que regulan las respuestas inmunitarias de los peces y su interacción con patógenos de importancia para la acuicultura, como Piscirickettsia salmonis. Además, colabora en actividades de docencia y formación en la Universidad de Concepción.",
      en: "Alberto Sandoval Concha is a Veterinarian and a PhD candidate in Microbiology at the University of Concepción. He has experience as a research and development assistant in microbiology, molecular biology, and biotechnology, encompassing the study of viral, bacterial, and parasitic infectious diseases, with a focus on aquatic systems.\n\nHe is currently a member of the Aquaculture Biotechnology and Genomics Laboratory (LBGA) at the Biotechnology Center of the University of Concepción, where he contributes to projects involving genomics of relevant pathogens, development of biocontrol strategies, and bioinformatic analysis of omics data for aquaculture. In this context, he is conducting his doctoral research in microbiology and aquatic genomics, aimed at elucidating the molecular mechanisms that regulate immune responses in fish and their interaction with pathogens of importance to aquaculture, such as Piscirickettsia salmonis. In addition, he collaborates in teaching and training activities at the University of Concepción.",
    },
    degrees: {
      es: [
        "Médico Veterinario, Universidad de Concepción.",
        "Licenciado en Ciencias Veterinarias, Universidad de Concepción.",
      ],
      en: [
        "Doctor of Veterinary Medicine, University of Concepción.",
        "Bachelor’s Degree in Veterinary Sciences, University of Concepción.",
      ],
    },
    projects: { es: [], en: [] },
  },
  {
    slug: "camila-barriga",
    line: "soluciones-omicas",
    name: "Camila Barriga Araneda",
    role: { es: "Asistente de Investigación", en: "Research Assistant" },
    email: "camilabarriga.a@gmail.com",
    links: {
      linkedin: "https://www.linkedin.com/in/camila-barriga-araneda-928558264/",
    },
    bio: {
      es: "Camila Barriga Araneda es Ingeniera en Biotecnología Vegetal titulada de la Universidad de Concepción. Posee experiencia en el área de microbiología, desempeñándose como analista, así como en biología molecular, ejerciendo funciones como encargada de área.\n\nActualmente se desempeña como asistente de investigación en el laboratorio de biotecnología y genómica acuícola del Centro de Biotecnología UdeC, participando en el desarrollo de estudios enfocados en genómica aplicada a sistemas acuícolas y en diversas actividades de docencia.",
      en: "Camila Barriga Araneda is a Plant Biotechnology Engineer graduated from the University of Concepción. She has experience in the field of microbiology, working as an analyst, as well as in molecular biology, where she has served as an area coordinator.\n\nShe currently works as a research assistant at the Aquaculture Biotechnology and Genomics Laboratory of the UdeC Biotechnology Center, where she participates in the development of studies focused on genomics applied to aquaculture systems, as well as in various teaching-related activities.",
    },
    degrees: {
      es: ["Ingeniera en Biotecnología Vegetal, Universidad de Concepción."],
      en: ["Plant Biotechnology Engineer, University of Concepción."],
    },
    projects: { es: [], en: [] },
  },
  {
    slug: "sebastian-fuller",
    line: "soluciones-omicas",
    name: "Sebastián Fuller Vargas",
    role: { es: "Asistente de Investigación", en: "Research Assistant" },
    email: "sfuller2017@udec.cl",
    links: {
      linkedin: "https://linkedin.com/in/sebastián-fuller-vargas",
      orcid: "https://orcid.org/0009-0002-3771-6582",
    },
    bio: {
      es: "Sebastián Fuller Vargas es Bioingeniero (2017–2024) y Magíster en Bioquímica y Bioinformática (2021–2024) de la Universidad de Concepción, especializado en el análisis bioinformático de datos ómicos y secuenciación de lecturas largas (Oxford Nanopore). Actualmente se desempeña como Asistente de Investigación y Especialista en Bioinformática, dedicado al análisis de datos ómicos multi-ómicos en organismos no modelo. Además se desempeña como docente en las asignaturas de Química de la carrera de nutrición de la Universidad Católica de la Santísima Concepción (2026-Presente) y anteriormente en asignaturas de Bioquímica y Biología Molecular de la Universidad de Concepción (2021–2024), además participa en proyectos FONDECYT de INCAR, y cuenta con publicaciones en revistas indexadas (WOS/ISI) y participación en congresos nacionales e internacionales.",
      en: "Sebastián Fuller Vargas is a Bioengineer (2017–2024) and holds an M.Sc. in Biochemistry and Bioinformatics (2021–2024) from the University of Concepción. He specializes in the bioinformatic analysis of omics data and long-read sequencing technologies (Oxford Nanopore).\n\nHe currently serves as a Research Assistant and Bioinformatics Specialist, focusing on the analysis of multi-omics datasets in non-model organisms. In addition, he is a lecturer in Chemistry courses for the Nutrition program at the Catholic University of the Most Holy Conception (2026–present). Previously, he taught Biochemistry and Molecular Biology courses at the University of Concepción (2021–2024).\n\nSebastián also participates in INCAR-related FONDECYT projects and has authored publications in indexed scientific journals (WoS/ISI) and presented his research at both national and international conferences.",
    },
    degrees: {
      es: [
        "MSc en Bioquímica y Bioinformática — Universidad de Concepción · 2021 – 2024",
        "Bioingeniero — Universidad de Concepción · 2017 – 2024",
      ],
      en: [
        "M.Sc. in Biochemistry and Bioinformatics, University of Concepción | 2021–2024",
        "Bioengineering Degree, University of Concepción | 2017–2024",
      ],
    },
    projects: {
      es: [
        "FONDECYT INCAR²",
        "Proyecto ANILLO ATE220034: “Integrated multi-omic immune profiling of human RNA respiratory viruses: current and future pandemics” (como Especialista en Bioinformática)",
        "FONDECYT Regular 1220708: “Probing gene regulatory network origin and diversification: a functional characterization of skeletogenic enhancers in an early-branching sea urchin species inhabiting Chile” (como Bioinformático y Técnico de Laboratorio)",
      ],
      en: [
        "FONDECYT INCAR²",
        "ANID Anillo Project ATE220034: “Integrated multi-omic immune profiling of human RNA respiratory viruses: current and future pandemics” (Bioinformatics Specialist)",
        "FONDECYT Regular 1220708: “Probing gene regulatory network origin and diversification: a functional characterization of skeletogenic enhancers in an early-branching sea urchin species inhabiting Chile” (Bioinformatician and Laboratory Technician).",
      ],
    },
  },
  {
    slug: "juan-antonio-valdes",
    line: "estres-y-bienestar-animal",
    name: "Dr. Juan Antonio Valdés",
    role: { es: "Investigador Principal", en: "Principal Investigator" },
    email: "jvaldes@unab.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/juan-antonio-vald%C3%A9s-09278210a/",
      orcid: "https://orcid.org/0000-0002-0615-820X",
    },
    bio: {
      es: "El Dr. Juan Antonio Valdés es Profesor titular, director de la carrera de Ingeniería en Biotecnología en la Universidad Andrés Bello (UNAB), e Investigador Principal del centro INCAR. Su línea de investigación se centra en temas de crecimiento y estrés en organismos de importancia acuícola. Lidera su cuarto proyecto Fondecyt, y cuenta con más de 90 publicaciones Wos, con un índice h 25. Como docente, imparte clases en pregrado y postgrado en asignaturas asociadas a la biotecnología acuícola. A la fecha ha dirigido 5 tesis del programa de doctorado en Biotecnología, 14 tesis de Magíster, más de 30 de tesis pregrado, y un importante número de prácticas y pasantías de investigación.",
      en: "Dr. Juan Antonio Valdés is a Full Professor, Director of the Biotechnology Engineering Program at Universidad Andrés Bello (UNAB), and a Principal Investigator at the Interdisciplinary Center for Aquaculture Research (INCAR). His research focuses on growth and stress responses in organisms of aquaculture importance. He currently leads his fourth FONDECYT research project and has authored more than 90 Web of Science-indexed publications, with an h-index of 25. As an educator, he teaches undergraduate and graduate courses related to aquaculture biotechnology. To date, he has supervised 5 Ph.D. dissertations in Biotechnology, 14 Master's theses, more than 30 undergraduate theses, and numerous research internships and placements.",
    },
    degrees: {
      es: [
        "2025 Abogado. Universidad Andres Bello, Chile.",
        "2023 Licenciado en Ciencias Jurídicas. Universidad Andres Bello, Chile.",
        "2007 Doctor en Ciencias Biomédicas. Universidad de Chile, Chile.",
        "2000 Bioquímico, Universidad de Santiago, Chile.",
        "2000 Licenciado en Bioquímica, Universidad de Santiago, Chile.",
        "1996 Analista de Sistemas, Escuela de Asistentes Técnicos (PUC), Chile.",
      ],
      en: [
        "2025 Lawyer (LL.B.), Universidad Andrés Bello, Chile.",
        "2023 Bachelor of Legal Sciences, Universidad Andrés Bello, Chile.",
        "2007 Ph.D. in Biomedical Sciences, Universidad de Chile, Chile.",
        "2000 Biochemist, Universidad de Santiago de Chile, Chile.",
        "2000 Bachelor's Degree in Biochemistry, Universidad de Santiago de Chile, Chile.",
        "1996 Systems Analyst, Escuela de Asistentes Técnicos (Pontificia Universidad Católica de Chile), Chile.",
      ],
    },
    projects: {
      es: [
        "2023- Título: Impact of early life stress in teleost skeletal muscle plasticity: Insight of cortisol as an epigenetic regulator between the good and the bad stress. Código: 1230794. Tipo: Fondecyt regular. Rol: IP.",
        "2021- Título: Fishing for a putative membrane corticosteroid receptor in euryhaline teleosts: role in osmoregulation. Investigador: Dr. Jorge Aedo. Tipo: Post-Doctorado Fondecyt. Rol: Patrocinante.",
        "2020- Título: Revisiting the role of the mineralocorticoid receptor in teleosts: effects of 11-deoxycorticosterone and cortisol on fish somatic growth. Código: 1201498. Tipo: FONDECYT regular. Rol: IP.",
        "2019- Título: Functional genomics applied to parr-smolt transformation: novel biomarkers for smolt selection in Atlantic salmon. Investigador: Dra. Valentina Valenzuela. Tipo: Post-Doctorado Fondecyt. Rol: Patrocinante.",
        "2018-2021 FONDECYT 3180283. PostDoct Phillip Dettleff. Identification and validation of new biomarkers of thermal stress in Congrio colorado (Genypterus chilensis) by means of transcriptomics, a model for aquaculture diversification in Chile. Patrocinador.",
        "2017-2020 FONDECYT (1171318). Challenging the stress response paradigm in fish: role of cortisol membrane-initiated signaling in metabolic adaptations of skeletal muscle. Investigador Principal.",
        "2017-2018 FIC-R. Innovación social y tecnológica para impulsar la Acuicultura a pequeña escala en caletas rurales de la Región de Valparaíso. Fondo de Innovación para la Competitividad Regional. Director.",
        "2013-2017 Proyecto CONICYT de Competencia regular N.º 1130545. Effect of chronic stress response triggered by fish farming conditions on endocrine and molecular signaling pathways involved in muscle growth in the fine flounder. Co-investigador.",
        "2013-2017 Centro Fondap Interdisciplinary Center for Aquaculture Research (INCAR). Co-investigador.",
        "2013-2015 Proyecto Núcleo 447 – Estudio de los mecanismos de virulencia del patógeno acuícola Flavobacterium psychrophilum, basado en un modelo innovador de cultivo primario de células y larvas de peces. Co-investigador.",
        "2012- Proyecto UNAB 08/09-R. Conversación cruzada entre las vías de señalización para IGF-1 y miostatina mediadas por calcio durante la miogénesis. Investigador Principal.",
        "2010-2012 Proyecto UNAB 31/11R. Regulación de la expresión de miostatina mediada por IGF-1 durante las fases de proliferación y diferenciación de mioblastos. Investigador Principal.",
        "2009-2013 Proyecto CONICYT de Iniciación N.º 11090274. Cross-talk between myostatin and IGF-1 transduction pathways mediated by calcium during myogenesis. Investigador Principal.",
        "2009-2012 Proyecto CONICYT de Competencia regular N.º 1090416. Analysis of signal transduction triggered by the GH/IGF-1/myostatin axis in Chilean flounder muscle: Effects of nutritional restriction and compensatory growth. Investigador Principal.",
      ],
      en: [
        "2023-Present. Impact of Early Life Stress on Teleost Skeletal Muscle Plasticity: Insights into Cortisol as an Epigenetic Regulator Between Beneficial and Harmful Stress. Grant No. 1230794. FONDECYT Regular Project. Role: Principal Investigator (PI).",
        "2021. Fishing for a Putative Membrane Corticosteroid Receptor in Euryhaline Teleosts: Role in Osmoregulation. Researcher: Dr. Jorge Aedo. FONDECYT Postdoctoral Project. Role: Sponsor.",
        "2020. Revisiting the Role of the Mineralocorticoid Receptor in Teleosts: Effects of 11-Deoxycorticosterone and Cortisol on Fish Somatic Growth. Grant No. 1201498. FONDECYT Regular Project. Role: Principal Investigator.",
        "2019. Functional Genomics Applied to Parr-Smolt Transformation: Novel Biomarkers for Smolt Selection in Atlantic Salmon. Researcher: Dr. Valentina Valenzuela. FONDECYT Postdoctoral Project. Role: Sponsor.",
        "2018-2021. FONDECYT Postdoctoral Project 3180283. Postdoctoral Researcher: Phillip Dettleff. Identification and Validation of New Biomarkers of Thermal Stress in Red Conger Eel (Genypterus chilensis) Through Transcriptomics: A Model for Aquaculture Diversification in Chile. Role: Sponsor.",
        "2017-2020. FONDECYT Project 1171318. Challenging the Stress Response Paradigm in Fish: Role of Cortisol Membrane-Initiated Signaling in Metabolic Adaptations of Skeletal Muscle. Role: Principal Investigator.",
        "2017-2018. FIC-R Project. Social and Technological Innovation to Promote Small-Scale Aquaculture in Rural Fishing Communities of the Valparaíso Region. Funding Source: Regional Innovation Fund for Competitiveness. Role: Project Director.",
        "2013-2017. CONICYT Regular Research Project No. 1130545. Effects of Chronic Stress Responses Triggered by Fish Farming Conditions on Endocrine and Molecular Signaling Pathways Involved in Muscle Growth in Fine Flounder. Role: Co-Investigator.",
        "2013-2017. Fondap Center Project. Interdisciplinary Center for Aquaculture Research (INCAR). Role: Co-Investigator.",
        "2013-2015. Nucleus Project 447. Study of the Virulence Mechanisms of the Aquaculture Pathogen Flavobacterium psychrophilum, Based on an Innovative Primary Culture Model of Fish Cells and Larvae. Role: Co-Investigator.",
        "2012. UNAB Project 08/09-R. Cross-Talk Between IGF-1 and Myostatin Signaling Pathways Mediated by Calcium During Myogenesis. Role: Principal Investigator.",
        "2010-2012. UNAB Project 31/11R. Regulation of Myostatin Expression by IGF-1 During Myoblast Proliferation and Differentiation Phases. Role: Principal Investigator.",
        "2009-2013. CONICYT Initiation Project No. 11090274. Cross-Talk Between Myostatin and IGF-1 Transduction Pathways Mediated by Calcium During Myogenesis. Role: Principal Investigator.",
        "2009-2012. CONICYT Regular Research Project No. 1090416. Analysis of Signal Transduction Triggered by the GH/IGF-1/Myostatin Axis in Chilean Flounder Muscle: Effects of Nutritional Restriction and Compensatory Growth. Role: Principal Investigator.",
      ],
    },
  },
  {
    slug: "jose-luis-galaz",
    line: "estres-y-bienestar-animal",
    name: "Dr. José Luis Galaz Rodríguez",
    role: { es: "Investigador Postdoctoral", en: "Postdoctoral Researcher" },
    email: "jlgalaz@uchile.cl",
    // El documento de INCAR² trae la ficha sin biografía ni proyectos, y no se
    // entregó fotografía (se muestra el isotipo del centro).
    photo: null,
    links: {},
    bio: { es: "", en: "" },
    degrees: {
      es: [
        "2006 Magíster en Bioquímica, Universidad de Chile, Chile.",
        "2000 Bioquímico, Universidad de Chile, Chile.",
      ],
      en: [
        "2006 M.Sc. in Biochemistry, University of Chile, Chile.",
        "2000 Biochemist, University of Chile, Chile.",
      ],
    },
    projects: { es: [], en: [] },
  },
  {
    slug: "rodrigo-zuloaga",
    line: "estres-y-bienestar-animal",
    name: "Dr. Rodrigo Zuloaga",
    role: { es: "Investigador Posdoctoral", en: "Postdoctoral Researcher" },
    email: "rodrigo.zuloaga.r@gmail.com",
    links: {
      linkedin: "https://www.linkedin.com/in/rodrigo-zuloaga-royo/",
      orcid: "https://orcid.org/0000-0002-7820-7509",
      researchgate: "https://www.researchgate.net/profile/Rodrigo-Zuloaga-2",
    },
    bio: {
      es: "El Dr. Rodrigo Zuloaga es investigador posdoctorado en el laboratorio de biotecnología molecular de la Universidad Andrés Bello (UNAB). Trabajó varios años en el laboratorio como asistente de investigación, lab manager y luego continuó sus estudios de doctorado. Sus investigaciones abarcan los mecanismos de respuesta a estrés en especies de importancia acuícola, siendo más reciente asociada a la osmorregulación branquial en salmónidos. Imparte clases de fisiología general y biotecnología acuícola como docente UNAB. Hasta la fecha, ha publicado 40 artículos científicos en revistas indexadas (WOS/ISI), codirector de dos tesis de pregrado y más de 60 presentaciones en congresos científicos nacionales e internacionales.",
      en: "Dr. Rodrigo Zuloaga is a postdoctoral researcher in the Molecular Biotechnology Laboratory at Universidad Andrés Bello (UNAB). He worked for several years in this laboratory as a research assistant and lab manager, and subsequently continued his academic training through doctoral studies. His research focuses on stress response mechanisms in aquaculture-relevant species, with more recent work centered on gill osmoregulation in salmonids.\n\nHe teaches General Physiology and Aquaculture Biotechnology as a lecturer at UNAB. To date, he has authored 40 scientific articles in indexed journals (WoS/ISI), co-supervised two undergraduate theses, and delivered more than 60 presentations at national and international scientific conferences.",
    },
    degrees: {
      es: [
        "Doctor en Biotecnología, Universidad Andrés Bello, Chile, 2026.",
        "Diplomado en Docencia Universitaria, Universidad Andrés Bello, Chile, 2015.",
        "Ingeniero y Magíster en Biotecnología, Universidad Andrés Bello, Chile, 2013.",
      ],
      en: [
        "PhD in Biotechnology, Universidad Andrés Bello, Chile, 2026.",
        "Postgraduate Diploma in University Teaching, Universidad Andrés Bello, Chile, 2015.",
        "Engineer and Master’s Degree in Biotechnology, Universidad Andrés Bello, Chile, 2013.",
      ],
    },
    projects: {
      es: [
        "2024-2025. Concurso Iniciación a la Investigación UNAB. Rol de la 11-deoxicorticosterona (DOC) en la respuesta al estrés de salmónidos juveniles. Investigador responsable.",
        "2023-2025. Beca Doctorado Nacional ANID. 21230070. Estudiante doctorado.",
        "2017-2018. FIC-R. BIP 30480912-0. Innovación social y tecnológica para impulsar la Acuicultura a pequeña escala en caletas rurales de la Región de Valparaíso (Fondo de Innovación para la Competitividad Regional). Coinvestigador.",
      ],
      en: [
        "2024–2025. UNAB Research Initiation Grant. “Role of 11-deoxycorticosterone (DOC) in the stress response of juvenile salmonids.” Principal Investigator.",
        "2023–2025. ANID National Doctoral Fellowship, 21230070. Doctoral Fellow.",
        "2017–2018. FIC-R, BIP 30480912-0. “Social and technological innovation to promote small-scale aquaculture in rural fishing coves of the Valparaíso Region” (Regional Innovation Fund for Competitiveness). Co-Investigator.",
      ],
    },
  },
  {
    slug: "daniela-aravena",
    line: "estres-y-bienestar-animal",
    name: "Daniela Aravena-Canales",
    role: { es: "Estudiante de Doctorado", en: "PhD Student" },
    email: "daniela.aravena.canales@gmail.com",
    links: {
      linkedin: "https://www.linkedin.com/in/daniela-aravena-canales-21a615178/",
      scholar: "https://scholar.google.com/citations?user=NMHRN44AAAAJ&hl=es",
    },
    bio: {
      es: "Daniela Aravena Canales es estudiante de Doctorado en Biotecnología de la Universidad Andrés Bello (UNAB) e integrante de la Línea de Investigación 4 (RL4) de INCAR². Es Ingeniera en Biotecnología, titulada en 2019, y se desempeñó como Asistente de Investigación en el Laboratorio de Biotecnología Molecular de la UNAB hasta 2021.\n\nDesde 2022 cursa el programa de Doctorado en Biotecnología con financiamiento de beca ANID, obteniendo la aprobación de su candidatura doctoral en 2023. Su trabajo de investigación se desarrolla en el ámbito de la biotecnología aplicada a organismos acuáticos, contribuyendo al estudio de procesos fisiológicos y moleculares de relevancia para la acuicultura.\n\nParalelamente a sus actividades de investigación, Daniela se desempeña como docente en la Universidad Andrés Bello desde 2020, impartiendo las asignaturas de Fisiología Celular y Biotecnología Acuícola. Además, ha participado en la elaboración de publicaciones científicas y en la presentación de resultados de investigación en congresos nacionales e internacionales, contribuyendo a la generación y difusión de conocimiento científico en el área de la biotecnología y la acuicultura.",
      en: "Daniela Aravena Canales is a Ph.D. candidate in Biotechnology at Universidad Andrés Bello (UNAB) and a doctoral student affiliated with Research Line 4 (RL4) of INCAR². She earned her degree in Biotechnology Engineering in 2019 and worked as a Research Assistant at the Molecular Biotechnology Laboratory of UNAB until 2021.\n\nSince 2022, she has been pursuing her Ph.D. in Biotechnology with support from an ANID scholarship, achieving doctoral candidacy status in 2023. Her research interests are focused on biotechnology and aquaculture, contributing to scientific projects related to aquatic organisms and their physiological and molecular responses.\n\nIn parallel with her research activities, Daniela has served as a lecturer at UNAB since 2020, teaching courses in Cellular Physiology and Aquaculture Biotechnology. She has also participated in the preparation of scientific publications and has presented her research at both national and international conferences, contributing to the dissemination of scientific knowledge in biotechnology and aquaculture.",
    },
    degrees: {
      es: [
        "Ingeniero en Biotecnología, Universidad Andrés Bello, Chile.",
        "Doctorado (c) en Biotecnología, Universidad Andrés Bello, Chile.",
      ],
      en: [
        "Biotechnology Engineer, Universidad Andrés Bello, Chile.",
        "Ph.D. Candidate in Biotechnology, Universidad Andrés Bello, Chile.",
      ],
    },
    projects: { es: [], en: [] },
  },
  {
    slug: "katalina-llanos",
    line: "estres-y-bienestar-animal",
    name: "Katalina Llanos-Azócar",
    role: { es: "Estudiante de Doctorado", en: "PhD Student" },
    email: "k.llanosazcar@uandresbello.edu",
    links: {
      linkedin: "https://www.linkedin.com/in/katalina-llanos-az%C3%B3car-20543a349/",
      orcid: "https://orcid.org/0009-0002-5782-3721",
      scholar: "https://scholar.google.com/citations?user=oppsTigAAAAJ&hl=es",
      researchgate: "https://www.researchgate.net/profile/Katalina-Llanos-Azocar-2",
    },
    bio: {
      es: "Katalina Llanos-Azócar es Bióloga Marina y Licenciada en Ciencias del Mar de la Universidad Andrés Bello. Desde 2025, es estudiante del programa de Doctorado en Biotecnología en la misma universidad, donde desarrolla su investigación en el marco de la Línea de Investigación 4: Estrés y Bienestar Animal del Centro de Investigación Aplicada INCAR². Además, se desempeña como docente de la asignatura Biotecnología Acuícola y Marina en la carrera de Ingeniería en Biotecnología de la Universidad Andrés Bello. Ha trabajado como asistente de investigación en el Laboratorio de Biotecnología Molecular, participando en los proyectos FONDECYT 1230794 y FONDAP 1523A0007 (INCAR), específicamente en la línea RP2 orientada a la salud animal en estadios tempranos de salmónidos y recursos nativos. Desde 2022, ha colaborado activamente en diversos proyectos FONDECYT y FONDAP INCAR, además de codirigir una tesis de pregrado en Biología Marina. Su producción científica incluye participación en seis congresos nacionales e internacionales y contribuciones en diversos artículos científicos publicados en revistas indexadas de alto impacto (Q1).",
      en: "Katalina Llanos-Azócar is a Marine Biologist and holds a Bachelor’s degree in Marine Sciences from Universidad Andrés Bello. Since 2025, she has been a PhD student in the Biotechnology Program at the same university, where she conducts her research within Research Line 4: Stress and Animal Welfare of the INCAR² Applied Research Center.\n\nShe also serves as a lecturer for the course Aquaculture and Marine Biotechnology in the Biotechnology Engineering program at Universidad Andrés Bello. She has worked as a research assistant in the Molecular Biotechnology Laboratory, participating in FONDECYT Project 1230794 and FONDAP Project 1523A0007 (INCAR), specifically within RP2, focused on animal health during early developmental stages of salmonids and native resources.\n\nSince 2022, she has actively collaborated in several FONDECYT and INCAR FONDAP projects, in addition to co-supervising an undergraduate thesis in Marine Biology. Her scientific output includes participation in six national and international conferences and contributions to multiple scientific articles published in high-impact indexed journals (Q1).",
    },
    degrees: {
      es: [
        "2023. Bióloga Marina, Universidad Andrés Bello, Chile.",
        "2022. Licenciada en Ciencias del Mar, Universidad Andrés Bello, Chile.",
      ],
      en: [
        "2023. Marine Biologist, Universidad Andrés Bello, Chile.",
        "2022. Bachelor’s Degree in Marine Sciences, Universidad Andrés Bello, Chile.",
      ],
    },
    projects: { es: [], en: [] },
  },
  {
    slug: "camila-godoy",
    line: "estres-y-bienestar-animal",
    name: "Camila Godoy Díaz",
    role: { es: "Lab Manager", en: "Lab Manager" },
    email: "c.godoydiaz@uandresbello.edu",
    links: {
      linkedin: "https://www.linkedin.com/in/camila-godoy-332a69196/",
      orcid: "https://orcid.org/0009-0001-1978-0639",
      scholar: "https://scholar.google.com/citations?user=L0EmLN0AAAAJ&hl=es",
      researchgate: "https://www.researchgate.net/profile/Camila-Godoy-Diaz",
    },
    bio: {
      es: "Camila Godoy Diaz es Ingeniera en Biotecnología y Licenciada en Biotecnología de la Universidad Andrés Bello (2019-2021). Actualmente es Asistente de Investigación y Lab. Manager en el Laboratorio de Biotecnología Molecular. Cumple labores como docente en las asignaturas de Fisiología General, Biotecnología Acuícola de la carrera Ingeniería en Biotecnología y carrera de Biología de la Universidad Andrés Bello (2023- Presente), además de participar en distintos Proyectos FONDECYT y FONDAP INCAR. Posee publicaciones científicas en revistas indexadas (WOS/ISI), y asistencia a Congresos Nacionales e Internacionales.",
      en: "Camila Godoy Díaz is a Biotechnology Engineer and holds a Bachelor’s degree in Biotechnology from Universidad Andrés Bello (2019–2021). She currently works as a Research Assistant and Lab Manager at the Molecular Biotechnology Laboratory. She also serves as a lecturer in the courses General Physiology and Aquaculture Biotechnology within the Biotechnology Engineering and Biology programs at Universidad Andrés Bello (2023–present).\n\nIn addition, she actively participates in several FONDECYT and INCAR FONDAP projects. She has authored scientific publications in indexed journals (WoS/ISI) and has attended national and international scientific conferences.",
    },
    degrees: {
      es: [
        "2021. Ingeniero en Biotecnología, Universidad Andrés Bello, Chile.",
        "2019. Licenciado en Biotecnología, Universidad Andrés Bello, Chile.",
      ],
      en: [
        "2021. Biotechnology Engineer, Universidad Andrés Bello, Chile.",
        "2019. Bachelor’s Degree in Biotechnology, Universidad Andrés Bello, Chile.",
      ],
    },
    projects: { es: [], en: [] },
  },
  {
    slug: "renato-quinones",
    line: "impactos-en-ecosistemas",
    name: "Dr. Renato Quiñones Bergeret",
    role: { es: "Investigador Principal", en: "Principal Investigator" },
    email: "rquinone@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/renato-quinones-7284151b3/",
      scholar: "https://scholar.google.com/citations?user=_1GXLz4AAAAJ&hl=en",
    },
    bio: {
      es: "El Dr. Renato Quiñones Bergeret es Biólogo Marino de la Universidad de Concepción y posee un Doctorado en Ecología y Evolución otorgado por la Universidad de Dalhousie, Canadá. En 1992 se integró al Instituto de Fomento Pesquero (IFOP) como Investigador Asociado y, desde 1995, se desempeña como académico del Departamento de Oceanografía de la Facultad de Ciencias Naturales y Oceanográficas de la Universidad de Concepción. Lideró el INCAR entre el 2012 y el 2026 en su etapa FONDAP, y actualmente es Investigador Principal de la Línea de Investigación 5 (RL5) de INCAR², enfocada en los impactos de la acuicultura en los ecosistemas. En el ámbito internacional, integra desde 2022 el Grupo de Expertos de las Naciones Unidas para la Tercera Evaluación Mundial de los Océanos (World Ocean Assessment III, WOA III). Entre 2025 y 2026 se desempeñó como uno de los dos Coordinadores Conjuntos (Joint Coordinators) del Grupo de Expertos responsable de liderar la elaboración de este informe global sobre el estado de los océanos, presentado oficialmente por las Naciones Unidas en 2026. Desde 2026 es Director del Instituto Océanos de la Universidad de Concepción, instancia que articula las capacidades científicas y tecnológicas de la Universidad en investigación oceánica. Ese mismo año fue nombrado Director del Hub Sudamericano de la red internacional UN Global ONCE (Ocean Negative Carbon Emissions), iniciativa orientada a fortalecer la investigación y cooperación científica para el desarrollo de soluciones basadas en el océano frente al cambio climático. Su trayectoria se ha caracterizado por contribuciones en ecología marina, sostenibilidad oceánica, gobernanza ambiental, evaluación de ecosistemas marinos y acuicultura sustentable, liderando iniciativas de investigación interdisciplinaria con impacto nacional e internacional.",
      en: "Dr. Renato Quiñones Bergeret is a Marine Biologist from the University of Concepción and holds a Ph.D. in Ecology and Evolution from Dalhousie University, Canada. In 1992, he joined the Fisheries Development Institute (IFOP) as an Associate Researcher, and since 1995 he has been a faculty member of the Department of Oceanography within the Faculty of Natural and Oceanographic Sciences at the University of Concepción. He led the Interdisciplinary Center for Aquaculture Research (INCAR) from 2012 to 2026 during its FONDAP phase and currently serves as Principal Investigator of INCAR² Research Line 5 (RL5), which focuses on the impacts of aquaculture on ecosystems. At the international level, since 2022 he has been a member of the United Nations Group of Experts for the Third World Ocean Assessment (WOA III). Between 2025 and 2026, he served as one of the two Joint Coordinators of the expert group responsible for leading the preparation of this global assessment of the state of the oceans, which was officially presented by the United Nations in 2026. Since 2026, he has served as Director of the Oceans Institute at the University of Concepción, an entity that coordinates and integrates the University's scientific and technological capabilities in ocean research. That same year, he was appointed Director of the South American Hub of the international UN Global ONCE (Ocean Negative Carbon Emissions) network, an initiative aimed at strengthening research and scientific cooperation to develop ocean-based solutions to climate change. His career has been marked by significant contributions to marine ecology, ocean sustainability, environmental governance, marine ecosystem assessment, and sustainable aquaculture, leading interdisciplinary research initiatives with both national and international impact.",
    },
    degrees: {
      es: [
        "1992. PH.D. in Ecología y Evolución, Dalhousie University, Canadá.",
        "1984. Biólogo Marino, Universidad de Concepción, Chile.",
        "1983. Licenciado en Biología Marina, Universidad de Concepción, Chile.",
      ],
      en: [
        "1992 Ph.D. in Ecology and Evolution, Dalhousie University, Canada.",
        "1984 Marine Biologist, University of Concepción, Chile.",
        "1983 Bachelor's Degree in Marine Biology, University of Concepción, Chile.",
        "1992 Ph.D. in Ecology and Evolution, Dalhousie University, Canada.",
        "1984 Marine Biologist, University of Concepción, Chile.",
        "1983 Bachelor's Degree in Marine Biology, University of Concepción, Chile.",
      ],
    },
    projects: {
      es: [
        "2023-2025. Interdisciplinary Center for Aquaculture Research (INCAR). Código del proyecto 1523A0007. Fuente de financiamiento FONDAP.",
        "2022-2024: Programa del Fondo de Innovación para Competitividad (FIC), Gobierno Regional de Ñuble “Potenciando el Desarrollo Sostenible de la Costa de Ñuble: gestión integrada, encadenamiento productivo y conservación del patrimonio natural (Costa Ñuble Sustentable)” ejecutado por la Universidad de Concepción, Campus Chillán.",
        "2022-2024. Aumento de la Competitividad de Caletas Pesqueras del Biobío. Código del proyecto BIP40040409-0. Fuente de financiamiento. GORE BIOBIO",
        "2021-2022. RISK ANALYSIS AS A TOOL FOR THE PRIORITIZATION OF SECONDARY ENVIRONMENTAL QUALITY STANDARDS IN THE MAIN TRIBUTARY RIVERS TO THE FJORD SYSTEM OF NORTHWESTERN PATAGONIA, UNDER HYDROLOGICAL DROUGHT SCENARIOS. Código del proyecto FSEQ210030. Fuente de financiamiento REDES, ESTRATEGIA Y CONOCIMIENTO.",
        "2018-2019. Sistematización de conocimiento táctico y explicito para la promoción de la acuicultura sustentable en la región del Bio Bio: Una aproximación mediante la aplicación de lógica difusa. Código del proyecto FIC 40000116. Fuente de financiamiento GORE BIOBIO. Proyecto Optimización de la asignación de recursos públicos para la mitigación de la crisis de la merluza común en la VIII Región. Fondo de Administración Pesquera, Ministerio de Economía. Co-Investigador. Proyecto de investigación tecnológica: “Degradación de b-sitosterol por hongos marinos”. Departamento de Oceanografía, Universidad de Concepción. Financiamiento: BIOFOREST S.A. Investigador.",
        "2019 19IS-111287. Circular Aquaculture in Caleta Tubul. Pablo Carrasco, Director; Renato Quiñones, Consultor.",
        "2018-2020 FAO-GEF Proyect 9-2018. Design and implementation of a training program on climate change adaptation in fisheries and aquaculture for public officials, national experts and decision-makers at national, regional and communal levels Others: The Food and Agriculture Organization (FAO). Renato Quiñones, Investigador Principal.",
        "2018-2019 World Wildlife Fund (WWF). An ecosystem approach to salmon production in southern Chile: integrating salmon farming into the seascape with other users and nature services. Renato Quiñones, Investigador Principal.",
        "2017-2020 Proyecto Post-Doctoral FONDECYT 3170529. Anticipating crises in stressed socio-ecological systems: developing fractal early-warning indicators for aquaculture and fisheries in Chile. Post-doctorante: Dr. Rodrigo Montes. Profesor Patrocinante: Renato Quiñones.",
        "2017-2020 Proyecto Post-Doctoral FONDECYT 3170529. Anticipating crises in stressed socio-ecological systems: developing fractal early-warning indicators for aquaculture and fisheries in Chile. Post-doctorante: Dr. Rodrigo Montes. Profesor Patrocinante: Renato Quiñones.",
        "2017-2020 FONDECYT 3170529 PostDoct_Rodrigo Montes. Anticipating crises in stressed socio-ecological systems: developing fractal early-warning indicators for aquaculture and fisheries in Chile. Renato Quiñones, Patrocinador.",
        "2017-2018 Sistematización de conocimiento tácito y explícito para la promoción de la acuicultura sustentable en la Región. PROYECTO N°40000116 FIC-R. Gobierno Regional del Biobío. Investigador. 12017-2018 Proyecto “Evaluación de la vulnerabilidad, exposición, sensibilidad y capacidad de adaptación de las comunidades asociadas a las caletas de pescadores seleccionadas, frente a escenarios de cambio climático”. Proyecto del Fondo de Investigación Pesquera y de Acuicultura, Ministerio de Economía, Gobierno de Chile. FIPA",
        "2017-08. Universidad de Concepción. Investigador.",
        "2017-2018 Propuesta de Política Nacional de Acuicultura para las siguientes dos décadas. Proyecto del Fondo de Investigación Pesquera y de Acuicultura, Ministerio de Economía, Gobierno de Chile. FIPA",
        "2017-17. Pontificia Universidad Católica de Valparaíso & Universidad de Concepción. Investigador.",
        "2017-2018 Grant N°106030-2017. Abundancia de microalgas nocivas y condiciones oceanográficas en la zona de emergencia por plagas (Golfo de Penas, Región de Aysén) y zonas aledañas. Estudio encargado por SERNAPESCA. Renato Quiñones Director.",
        "2017 Proyecto “Abundancia de microalgas nocivas y condiciones oceanográficas en el área de emergencia de plaga (sector Golfo de Penas, Región de Aysén) y zonas aledañas”. Requirente: Servicio Nacional de Pesca y Acuicultura (SERNAPESCA). Director.",
        "2016-2018 Proyecto “Generación de conocimiento científico y tecnológico para incrementar la productividad de las AMERBs y otras actividades productivas acuícolas de los sindicatos de pescadores de Arauco y Laraquete”. Programa de Estudios Ecosistémicos del Golfo de Arauco (PREGA). Facultad de Ciencias Naturales y Oceanográficas, Universidad de Concepción. Financiado por celulosa Arauco y Constitución S.A. Director.",
        "2016-2017 Proyecto “Explotación acuícola sustentable de pequeña escala, en el borde costero de zonas rezagadas, de la Región del Maule”. SERCOTEC & Programa de “Gestión Territorial para Zonas Rezago”, Región del Maule. Investigador.",
        "2016 “Análisis de pre-factibilidad de la creación de un centro demostrativo de acuicultura y acuiponía en Caldera”. Requirente: Minera Candelaria. Director del Proyecto.",
        "2015-2016 Proyecto “Estudio para el fortalecimiento integrado y sostenible de la acuicultura de pequeña escala (APE) en la Región del Maule”. Financiado por la Corporación Regional de Desarrollo Productivo del Maule. Investigador.",
        "2012-2022. Proyecto Nº15110027 Interdisciplinary Center for Aquaculture Research (INCAR). FONDAP-Center (FONDECYT, FONDAP; CONICYT). Programa Fondo de Financiamiento de Centros de Excelencia en Investigación. Director.",
        "2012-2017. Proyecto Nº15110027 Interdisciplinary Center for Aquaculture Research (INCAR). FONDAP-Center (FONDECYT, FONDAP; CONICYT). Programa Fondo de Financiamiento de Centros de Excelencia en Investigación. Director.",
        "2011-2012. Programa de diversificación productiva de la pesca artesanal de la región de Aysén. (Program of productive diversification of the artisanal fisheries of the Aysén Region (Patagonia). Subcontrato UDEC por el Centro de Investigación en Ecosistemas de la Patagonia (CIEP). Fuente Financiamiento: Gobierno Regional de Aysén. Investigador.",
        "2010-2011. Proyecto “Evaluating climate change impacts on fisheries and aquaculture in Latin America and the Caribbean (LAC)”. Proyecto ejecutado por el Centro COPAS. Agencia Financiera: Organización de las Naciones Unidas para la Alimentación y la Agricultura (FAO), Roma. Investigador Responsable.",
        "2008-2013. Proyecto, Caracterización Ambiental y Productiva de la Zona Bajos de Mela, Región del Bio Bio. Financiamiento: Celulosa Arauco y Constitución S.A. Facultad de Ciencias Naturales y Oceanográficas. Director.",
        "2008-2013. Proyecto Ecología y biología del lobo marino común, Otaria flavescens, en el Santuario Islote Lobería de Cobquecura. Proyecto evaluado y aprobado por el Consejo de Monumentos Nacionales y CONAMA. Financiamiento: Celulosa Arauco y Constitución. Facultad de Ciencias Naturales y Oceanográficas. Director.",
        "2008-2012. Programa COPAS Sur-Austral. I Concurso Nacional de Planes de Desarrollo para Centros Científicos y Tecnológicos de Excelencia – 2007 – B0731. Investigador Principal.",
        "2008-2010. Proyecto FONDECYT Regular Nº 1080623 The role of methane in the coastal ocean as an alternative carbon fuel for the microbial community and secondary production. Duración 3 años. Investigador Responsable Dr. Silvio Pantoja, Departamento de Oceanografía, Universidad de Concepción. Co-Investigador.",
        "2008- 2010. Proyecto de Anillos de Investigación en Ciencias Sociales y Humanidades",
        "2007. “Impactos sociales y ambientales del Cambio Climático Global en la Región del Bío Bío: Desafíos para la sustentabilidad del siglo XXI”. Proyecto SOC-28. Investigador Principal Dr. Jorge Rojas, Facultad de Ciencias Sociales. Proyecto financiado por CONICYT en el marco del Programa Bicentenario de Ciencia y Tecnología (PBCT). Investigador Asociado.",
        "2007. Proyecto Diagnóstico Socio Económico y Productivo Relativo al Desarrollo Local en las Caletas de Cocholgüe y Coliumo. Programa de Estudios Económicos y Sociales del Sector Pesquero, Universidad de Concepción. Programa de Estudios Económicos y Sociales del Sector Pesquero de la Universidad de Concepción. Investigador.",
        "2006-2020 Programa de Investigación Marina de Excelencia (PIMEX-Nueva Aldea). Facultad de Ciencias Naturales y Oceanográficas, Universidad de Concepción. Programa de investigación científica básica y aplicada cuyo objetivo es incrementar el conocimiento científico acerca del ecosistema marino costero y de la plataforma continental de la VIII Región, con especial énfasis en la zona adyacente a la desembocadura del Río Itata. Financiamiento: Celulosa Arauco y Constitución S.A. Director.",
        "2006-2007. Proyecto Diagnostico Social, Económico, y Productivo de las Comunidades de Pescadores de la Desembocadura del Itata y Zona Adyacentes” (Proyecto No. 206.42.14-3). Programa de Estudios Económicos y Sociales del Sector Pesquero de la Universidad de Concepción. Financiado por la mesa de Diálogo Social Pesquera de Nueva Aldea. Investigador.",
        "2006- a la fecha. Programa de Investigación Marina de Excelencia (PIMEX-Nueva Aldea). Programa de investigación científica básica y aplicada cuyo objetivo es incrementar el conocimiento científico acerca del ecosistema marino costero y de la plataforma continental de la VIII Región, con especial énfasis en la zona adyacente a la desembocadura del Río Itata. El programa contiene 9 grupos de investigación liderados por académicos de la UDEC con un total de aproximadamente 40 investigadores y técnicos. Director.",
        "2005-2008. European Network of Excellence for Ocean Ecosystems Analysis. Unión Europea. Esta red de excelencia financiada por el FP6 integra más de 60 institutos y universidades de 25 países. Co-Principal Investigator.",
        "2004-2005. Proyecto Caracterización socioeconómica y productiva de las comunidades de pescadores de la macha de la comuna de Cañete, zona norte del Río Paicavi. Proyecto Fondo Nacional de Desarrollo Regional, Región del Bio Bio, Código 30027032-0. Director.",
        "2003-2006. Programa FONDAP (FONDECYT, CONICYT) “Centro de Investigación Oceanográfica del Pacífico Sur-Oriental” COPAS, Universidad de Concepción. Fase I. Investigador Principal.",
        "2002-2011. Programa FONDAP (FONDECYT, CONICYT) “Centro de Investigación Oceanográfica del Pacífico Sur-Oriental” COPAS, Universidad de Concepción. Investigador Principal & Subdirector.",
      ],
      en: [
        "2023-2025 Interdisciplinary Center for Aquaculture Research (INCAR). Project Code: 1523A0007 . Funding Source: FONDAP .",
        "2022-2024 Strengthening the Sustainable Development of the Ñuble Coast: Integrated Management, Productive Linkages, and Conservation of Natural Heritage (Sustainable Ñuble Coast). Innovation Fund for Competitiveness (FIC), Regional Government of Ñuble. Executed by the University of Concepción, Chillán Campus.",
        "2022-2024 Enhancing the Competitiveness of Fishing Communities in the Biobío Region. Project Code: BIP40040409-0 . Funding Source: Regional Government of Biobío (GORE Biobío) .",
        "2021-2022 Risk Analysis as a Tool for the Prioritization of Secondary Environmental Quality Standards in the Main Tributary Rivers to the Fjord System of Northwestern Patagonia Under Hydrological Drought Scenarios. Project Code: FSEQ210030 . Funding Source: Networks, Strategy and Knowledge Program .",
        "2018-2019 Systematization of Tacit and Explicit Knowledge for the Promotion of Sustainable Aquaculture in the Biobío Region: An Approach Based on the Application of Fuzzy Logic. Project Code: FIC 40000116 . Funding Source: GORE Biobío .",
        "Optimization of Public Resource Allocation for the Mitigation of the Common Hake Crisis in the Biobío Region. Fisheries Administration Fund, Ministry of Economy, Chile. Co-Investigator .",
        "Technological Research Project: “Degradation of β- Sitosterol by Marine Fungi.” Department of Oceanography, University of Concepción. Funding Source: BIOFOREST S.A. Researcher .",
        "2019 Project 19IS-111287. Circular Aquaculture in Caleta Tubul. Pablo Carrasco, Director; Renato Quiñones, Consultant .",
        "2018-2020 FAO-GEF Project 9-2018. Design and Implementation of a Training Program on Climate Change Adaptation in Fisheries and Aquaculture for Public Officials, National Experts, and Decision-Makers at National, Regional, and Local Levels. Funding Agency: Food and Agriculture Organization of the United Nations (FAO) . Principal Investigator .",
        "2018-2019 World Wildlife Fund (WWF). An Ecosystem Approach to Salmon Production in Southern Chile: Integrating Salmon Farming into the Seascape with Other Users and Ecosystem Services. Principal Investigator .",
        "2017-2020 FONDECYT Postdoctoral Project 3170529. Anticipating Crises in Stressed Socio-Ecological Systems: Developing Fractal Early-Warning Indicators for Aquaculture and Fisheries in Chile. Postdoctoral Researcher: Dr. Rodrigo Montes. Academic Sponsor .",
        "2017-2018 Systematization of Tacit and Explicit Knowledge for the Promotion of Sustainable Aquaculture in the Region. FIC-R Project No. 40000116 , Regional Government of Biobío. Researcher .",
        "2017-2018 Assessment of Vulnerability, Exposure, Sensitivity, and Adaptive Capacity of Communities Associated with Selected Fishing Coves Under Climate Change Scenarios. Fisheries and Aquaculture Research Fund (FIPA",
        "2017-08), Ministry of Economy, Chile. University of Concepción. Researcher .",
        "2017-2018 Proposal for a National Aquaculture Policy for the Next Two Decades. Fisheries and Aquaculture Research Fund (FIPA",
        "2017-17), Ministry of Economy, Chile. Pontifical Catholic University of Valparaíso and University of Concepción. Researcher .",
        "2017-2018 Grant No. 106030-2017. Harmful Microalgae Abundance and Oceanographic Conditions in the Pest Emergency Area (Gulf of Penas, Aysén Region) and Adjacent Areas. Commissioned by SERNAPESCA . Project Director .",
        "2017 Harmful Microalgae Abundance and Oceanographic Conditions in the Emergency Area (Gulf of Penas, Aysén Region) and Adjacent Areas. Client: National Fisheries and Aquaculture Service (SERNAPESCA) . Director .",
        "2016-2018 Generation of Scientific and Technological Knowledge to Increase the Productivity of TURFs (AMERBs) and Other Aquaculture Activities of Fisher Associations in Arauco and Laraquete. Gulf of Arauco Ecosystem Studies Program (PREGA), University of Concepción. Funded by Celulosa Arauco y Constitución S.A. Director .",
        "2016-2017 Sustainable Small-Scale Aquaculture Development in Coastal Areas of the Maule Region. SERCOTEC and the Territorial Management Program for Lagging Areas. Researcher .",
        "2016 Pre-Feasibility Analysis for the Creation of a Demonstration Center for Aquaculture and Aquaponics in Caldera. Client: Minera Candelaria . Project Director .",
        "2015-2016 Study for the Integrated and Sustainable Strengthening of Small-Scale Aquaculture (SSA) in the Maule Region. Funded by the Regional Corporation for Productive Development of Maule. Researcher .",
        "2012-2022 Project No. 15110027. Interdisciplinary Center for Aquaculture Research (INCAR). FONDAP Center Program for Research Excellence. Director .",
        "2012-2017 Project No. 15110027. Interdisciplinary Center for Aquaculture Research (INCAR). FONDAP Center Program for Research Excellence. Director .",
        "2011-2012 Productive Diversification Program for Artisanal Fisheries in the Aysén Region (Patagonia). Subcontracted by the Patagonia Ecosystems Research Center (CIEP). Funding Source: Regional Government of Aysén . Researcher .",
        "2010-2011 Evaluating Climate Change Impacts on Fisheries and Aquaculture in Latin America and the Caribbean (LAC). Executed by COPAS Center . Funding Agency: Food and Agriculture Organization of the United Nations (FAO) . Principal Investigator .",
        "2008-2013 Environmental and Productive Characterization of the Bajos de Mela Area, Biobío Region. Funded by Celulosa Arauco y Constitución S.A. Faculty of Natural and Oceanographic Sciences, University of Concepción. Director .",
        "2008-2013 Ecology and Biology of the South American Sea Lion (Otaria flavescens) in the Cobquecura Sea Lion Islet Sanctuary. Approved by the National Monuments Council and CONAMA. Funded by Celulosa Arauco y Constitución S.A. Director .",
        "2008-2012 COPAS Sur-Austral Program. National Development Plan for Centers of Scientific and Technological Excellence (Project B0731). Principal Investigator .",
        "2008-2010 FONDECYT Regular Project No. 1080623. The Role of Methane in the Coastal Ocean as an Alternative Carbon Fuel for the Microbial Community and Secondary Production. Principal Investigator: Dr. Silvio Pantoja. Co-Investigator .",
        "2008-2010 Social Sciences and Humanities Research Ring Project SOC-28. Social and Environmental Impacts of Global Climate Change in the Biobío Region: Challenges for Sustainability in the 21st Century. Funded by CONICYT through the Bicentennial Science and Technology Program (PBCT). Associate Investigator .",
        "2007 Socioeconomic and Productive Diagnostic Study Related to Local Development in the Fishing Communities of Cocholgüe and Coliumo. University of Concepción. Researcher .",
        "2006-Present Marine Research Program of Excellence (PIMEX-Nueva Aldea). A basic and applied scientific research program aimed at increasing scientific knowledge of the coastal marine ecosystem and continental shelf of the Biobío Region, particularly the area adjacent to the mouth of the Itata River. Director .",
        "2006-2007 Social, Economic, and Productive Diagnosis of Fishing Communities at the Mouth of the Itata River and Adjacent Areas (Project No. 206.42.14-3). Funded by the Nueva Aldea Fisheries Social Dialogue Roundtable. Researcher .",
        "2005-2008 European Network of Excellence for Ocean Ecosystems Analysis. European Union FP6 network involving over 60 research institutes and universities across 25 countries. Co-Principal Investigator .",
        "2004-2005 Socioeconomic and Productive Characterization of Razor Clam Fishing Communities in the Municipality of Cañete, North of the Paicaví River. Regional Development Fund Project No. 30027032-0. Director .",
        "2003-2006 FONDAP Program. Center for Oceanographic Research in the Eastern South Pacific (COPAS), University of Concepción. Phase I. Principal Investigator .",
        "2002-2011 FONDAP Program. Center for Oceanographic Research in the Eastern South Pacific (COPAS), University of Concepción. Principal Investigator and Associate Director .",
      ],
    },
  },
  {
    slug: "pablo-cornejo",
    line: "impactos-en-ecosistemas",
    name: "Dr. Pablo Cornejo Olivares",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "pabcornejo@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/pablo-cornejo-2037aa231",
      researchgate: "https://www.researchgate.net/profile/Pablo-Cornejo-4",
    },
    bio: {
      es: "El Dr. Pablo Cornejo es académico del Departamento de Ingeniería Mecánica de la Universidad de Concepción (UdeC), Chile, y su investigación se centra en la mecánica de fluidos, mecánica computacional, con aplicaciones en acuicultura, minería, energía e ingeniería aeroespacial. En la acuicultura, ha desarrollado enfoques de modelación basados en Dinámica de Fluidos Computacional que han permitido caracterizar con precisión la hidrodinámica de canales y fiordos, y desarrollar metodologías innovadoras para mejorar la productividad de centros de engorda de salmones. Ha sido autor de varias publicaciones cientíﬁcas en revistas indexadas y relator en conferencias en Chile, Estados Unidos y Europa.",
      en: "Dr. Pablo Cornejo is a faculty member in the Department of Mechanical Engineering at the University of Concepción (UdeC), Chile. His research focuses on fluid mechanics and computational mechanics, with applications in aquaculture, mining, energy, and aerospace engineering. In the field of aquaculture, he has developed Computational Fluid Dynamics (CFD)-based modeling approaches that have enabled the accurate characterization of the hydrodynamics of channels and fjords, as well as the development of innovative methodologies to improve the productivity of salmon farming sites. He is the author of several scientific publications in indexed journals and has presented his research at conferences in Chile, the United States, and Europe.",
    },
    degrees: {
      es: [
        "2016 Doctorado en Ciencias Físicas, Universidad de Concepción, Concepción, Chile.",
        "2010 Magíster en Ingeniería Mecánica, Universidad de Concepción, Concepción, Chile.",
        "2008 Ingeniería Aeroespacial, Universidad de Concepción, Concepción, Chile.",
      ],
      en: [
        "2016 Ph.D. in Physical Sciences, University of Concepción, Concepción, Chile.",
        "2010 M.Sc. in Mechanical Engineering, University of Concepción, Concepción, Chile.",
        "2008 Aerospace Engineer, University of Concepción, Concepción, Chile.",
      ],
    },
    projects: {
      es: [
        "2015-2017. Nueva Tecnología para Aumentar la Recuperación de Agua en Plantas Concentradoras de Minerales de Cobre. Código del proyecto ID15I10291. Fuente de financiamiento FONDEF.",
        "2013-2023. Centro de Recursos Hídrigos para la Agricultura y Minería(CRHIAM). Código del proyecto 15130015. Fuente de financiamiento FONDAP.",
      ],
      en: [
        "2015-2017 New Technology to Increase Water Recovery in Copper Mineral Processing Plants. Project Code: ID15I10291 . Funding Source: FONDEF .",
        "2013-2023 Water Resources Center for Agriculture and Mining (CRHIAM). Project Code: 15130015 . Funding Source: FONDAP .",
      ],
    },
  },
  {
    slug: "eduardo-hernandez",
    line: "impactos-en-ecosistemas",
    name: "Dr. Eduardo Hernández Miranda",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "eduhernandez@udec.cl",
    links: {
      researchgate: "https://www.researchgate.net/profile/Eduardo-Hernandez-Miranda",
    },
    bio: {
      es: "El Dr. Eduardo Hernández es académico del Departamento de Oceanografía en la Facultad de Ciencias Naturales y Oceanográficas de la Universidad de Concepción, Chile. Su investigación se enfoca en la ecología marina, la biodiversidad y la genética poblacional en ambientes marinos. Entre sus principales estudios, analiza las disimilitudes temporales y espaciales en ensamblajes de peces intermareales en el océano Pacífico sur, destacando el impacto del fenómeno ENSO. También investiga la diversidad genética y resiliencia en poblaciones bentónicas marinas y cómo las perturbaciones naturales afectan la diversidad y estructura genética del pez sapo Aphos porosus. Además, su trabajo sobre el zooplancton y las condiciones hidrodinámicas en un canal patagónico utilizado por la acuicultura resalta la influencia de las características geomorfológicas en el ecosistema. El Dr. Hernández es una figura destacada en la ecología marina, contribuyendo con valiosos conocimientos sobre la gestión de recursos y los efectos de los cambios ambientales en los ecosistemas marinos.",
      en: "Dr. Eduardo Hernández is a faculty member in the Department of Oceanography within the Faculty of Natural and Oceanographic Sciences at the University of Concepción, Chile. His research focuses on marine ecology, biodiversity, and population genetics in marine environments. Among his main research contributions are studies on the temporal and spatial dissimilarities of intertidal fish assemblages in the South Pacific Ocean, highlighting the influence of the El Niño-Southern Oscillation (ENSO). He has also investigated genetic diversity and resilience in marine benthic populations, as well as the effects of natural disturbances on the genetic diversity and population structure of the toadfish Aphos porosus . In addition, his research on zooplankton communities and hydrodynamic conditions in a Patagonian channel used for aquaculture has emphasized the role of geomorphological features in shaping ecosystem dynamics. Dr. Hernández is a recognized contributor to the field of marine ecology, generating valuable knowledge for resource management and for understanding the effects of environmental change on marine ecosystems.",
    },
    degrees: {
      es: [
        "2007 Doctor en Ciencias Biológicas con mención en Ecología, Pontificia Universidad Católica, Chile",
        "1999 Postítulo en Contaminación Ambiental, Universidad de Chile, Chile",
        "1997 Biólogo Marino, Universidad de Concepción. Chile",
        "1995 Licenciado en Biología Marina, Universidad de Concepción",
      ],
      en: [
        "2007 Ph.D. in Biological Sciences (Ecology), Pontifical Catholic University of Chile, Chile.",
        "1999 Graduate Diploma in Environmental Pollution, University of Chile, Chile.",
        "1997 Marine Biologist, University of Concepción, Chile.",
        "1995 Bachelor's Degree in Marine Biology, University of Concepción, Chile.",
      ],
    },
    projects: {
      es: [
        "2019-2020 COLBUN S.A. 4700126898. Ecological study in the Intake area of the Santa María Complex: Dynamics of the settlement of mitilids and associated fauna in a circulation system of sea water. Investigador Principal.",
        "2018-2019 SalmonChile, INTESAL. Methodologies for environmental evaluation of seabed recovery systems. Director.",
        "2013-2016 Proyecto FONDECYT 1130868.. Mega disturbances and population genetic resilience in the marine realm: the role of life history strategies. Co- Investigador Principal.",
        "2010-2013 Proyecto FONDECYT 11100334. Population and Community Response After a Strong Earthquake and Tsunami in a Shallow Bay Off Central Chile. Investigador Responsable.",
        "2010-2013 Proyecto Áreas de desove de especies de importancia económica y ecológica en la zona adyacente a la desembocadura del Río Itata. Proyecto PIMEX. Investigador Responsable.",
        "2009-2013 Proyecto Interacción marino-dulceacuícola en Bahía Coliumo: Dinámica física, química y biológica de los esteros Litril, Villarrica y Pingueral. Proyecto PIMEX. Investigador Responsable.",
        "2009-2013 Proyecto Dinámica interanual del reclutamiento de invertebrados en el submareal rocoso de Bahía Coliumo y zonas aledañas. Proyecto PIMEX Investigador Responsable.",
        "2013-2020 PIMEX 4503122171. Program of Marine Research of Excellence, Faculty of Natural and Oceanographic Sciences funded by Celulosa Arauco & Constitución S.A. Investigador Principal.",
        "2006-2013 PIMEX. Factores que determinan la distribución y abundancia de las poblaciones del ecosistema aledaño a la desembocadura del Río Itata. Facultad de Ciencias Naturales y Oceanográficas. Universidad de Concepción. Investigador responsable. Línea de Biodiversidad PIMEX. Investigador Responsable.",
        "1999-2000 Proyecto Italia-Chile (CICS-EULA GENOVA-PUCCH). Departamento de Ecología. Pontificia Universidad Católica de Chile. Investigador Asistente. Participación en Proyectos de Asistencia Técnica: 2010-2013 Proyecto Seguimiento de la temperatura del agua de mar en Bahía Coronel. Estudio realizado para Colbún S. A. Investigador Responsable.",
        "2011-2013 Proyecto Dinámica temporal del plancton y la producción primaria en Bahía Coronel. Estudio realizado para Colbún S. A. Investigador Responsable. Proyecto Dinámica física, química y biológica de la zona estuarina del Río Itata. Estudio realizado para Arauco S. A. Investigador Responsable. Proyecto Funcionamiento ecosistémico del humedal asociado a la desembocadura del Río Itata. Estudio realizado para Arauco S. A. Co-Investigador.",
        "2007-2009 Proyecto Evaluación del daño Ambiental y Económico Generado por el derrame de Petróleo Proveniente del Terminal B de ENAP en la Bahía de San Vicente, Talcahuano. Estudio: Dinámica de la reproducción y el reclutamiento de poblaciones costeras asociadas a la Bahía San Vicente. Investigador Responsable PT8.",
        "2005-2009 Proyecto Rescate y Relocalización de Fauna íctica en el Estero Pupío IV Región, Chile. Estudio realizado para Minera Los Pelambres. Investigador Responsable.",
      ],
      en: [
        "2019-2020 COLBUN S.A. Project 4700126898. Ecological Study in the Intake Area of the Santa María Complex: Dynamics of Mussel Settlement and Associated Fauna in a Seawater Circulation System. Principal Investigator.",
        "2018-2019 SalmonChile, INTESAL. Methodologies for Environmental Evaluation of Seabed Recovery Systems. Project Director.",
        "2013-2016 FONDECYT Project 1130868. Mega-Disturbances and Population Genetic Resilience in the Marine Realm: The Role of Life-History Strategies. Co-Principal Investigator.",
        "2010-2013 FONDECYT Project 11100334. Population and Community Response After a Major Earthquake and Tsunami in a Shallow Bay off Central Chile. Principal Investigator.",
        "2010-2013 Spawning Areas of Species of Economic and Ecological Importance in the Area Adjacent to the Mouth of the Itata River. PIMEX Project. Principal Investigator.",
        "2009-2013 Marine-Freshwater Aquaculture Interactions in Coliumo Bay: Physical, Chemical, and Biological Dynamics of the Litril, Villarrica, and Pingueral Streams. PIMEX Project. Principal Investigator.",
        "2009-2013 Interannual Dynamics of Invertebrate Recruitment in the Rocky Subtidal Zone of Coliumo Bay and Adjacent Areas. PIMEX Project. Principal Investigator.",
        "2013-2020 PIMEX Project 4503122171. Marine Research Program of Excellence , Faculty of Natural and Oceanographic Sciences, funded by Celulosa Arauco & Constitución S.A. Principal Investigator.",
        "2006-2013 PIMEX Project. Factors Determining the Distribution and Abundance of Populations in the Ecosystem Adjacent to the Mouth of the Itata River. Faculty of Natural and Oceanographic Sciences, University of Concepción. Principal Investigator, PIMEX Biodiversity Research Line.",
        "1999-2000 Italy-Chile Project (CICS-EULA, Genoa-PUCCH). Department of Ecology, Pontifical Catholic University of Chile. Research Assistant. Technical Assistance Projects",
        "2010-2013 Monitoring of Seawater Temperature in Coronel Bay. Study conducted for Colbún S.A. Principal Investigator.",
        "2011-2013 Temporal Dynamics of Plankton and Primary Production in Coronel Bay. Study conducted for Colbún S.A. Principal Investigator.",
        "Physical, Chemical, and Biological Dynamics of the Itata River Estuarine Zone. Study conducted for Arauco S.A. Principal Investigator.",
        "Ecosystem Functioning of the Wetland Associated with the Mouth of the Itata River. Study conducted for Arauco S.A. Co-Investigator.",
        "2007-2009 Assessment of Environmental and Economic Damage Caused by the Oil Spill from ENAP Terminal B in San Vicente Bay, Talcahuano. Study: Reproductive and Recruitment Dynamics of Coastal Populations Associated with San Vicente Bay. Lead Researcher, Work Package 8 (PT8).",
        "2005-2009 Rescue and Relocation of Fish Fauna in the Pupío Stream, Coquimbo Region, Chile. Study conducted for Minera Los Pelambres. Principal Investigator. Dr. Rodrigo M. Montes Investigador Adjunto",
      ],
    },
  },
  {
    slug: "rodrigo-montes",
    line: "impactos-en-ecosistemas",
    name: "Dr. Rodrigo M. Montes",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "rmontes@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/rodrigo-marco-montes-aste-a7888650",
      researchgate: "https://www.researchgate.net/profile/Rodrigo-Montes-7",
      orcid: "https://orcid.org/0000-0003-1622-7640",
    },
    bio: {
      es: "El Dr. Rodrigo Montes es un investigador destacado en las áreas de acuicultura y pesquerías, cuyo trabajo se desarrolla bajo una aproximación cuantitativa orientada a la resolución de problemas que afectan a estos sectores productivos. Su labor se distingue por un enfoque genuinamente interdisciplinario que integra la oceanografía y la estadística como ejes centrales, para profundizar en la comprensión de los procesos ecológicos, ambientales y productivos que influyen sobre los sistemas socioecológicos marinos y costeros. El Dr. Montes ha contribuido al desarrollo de diversas líneas de investigación que comparten como eje común el uso de herramientas avanzadas de análisis y modelación para la resolución de problemas complejos que afectan al sector salmonicultor. En este contexto, destacan sus contribuciones en el desarrollo de indicadores epidemiológicos de alerta temprana ( early warning indicators ) para la detección de brotes del piojo de mar ( Caligus rogercresseyi ) y en la detección de transiciones epidemiológicas críticas ( epidemiological tipping points ) en zonas con altos niveles de infestación de este ectoparásito, así como la cuantificación de umbrales críticos asociados a floraciones algales nocivas (FAN) y sus efectos sobre la mortalidad y deterioro de la salud de salmones en cultivo. En forma paralela, ha desarrollado investigaciones sobre los efectos de la salmonicultura en el estado de salud de los ecosistemas marinos y estuarinos de la Patagonia chilena, contribuyendo a la evaluación cuantitativa del riesgo ambiental, ecológico y productivo asociado a esta actividad.",
      en: "Dr. Rodrigo Montes is a leading researcher in the fields of aquaculture and fisheries, whose work is grounded in a quantitative, problem-solving approach aimed at addressing challenges affecting these productive sectors. His research is characterized by a genuinely interdisciplinary perspective that integrates oceanography and statistics as core disciplines to advance the understanding of the ecological, environmental, and production processes shaping marine and coastal socioecological systems. Dr. Montes has contributed to the development of several research lines that share a common focus on the application of advanced analytical and modeling tools to solve complex problems affecting the salmon farming industry. Notable contributions include the development of epidemiological early warning indicators for the detection of sea lice ( Caligus rogercresseyi ) outbreaks, as well as the identification of epidemiological tipping points in areas with high infestation levels of this ectoparasite. He has also worked on quantifying critical thresholds associated with harmful algal blooms (HABs) and their effects on salmon mortality and health deterioration in aquaculture systems. In parallel, he has conducted research on the impacts of salmon farming on the ecological health of marine and estuarine ecosystems in Chilean Patagonia, contributing to the quantitative assessment of the environmental, ecological, and production risks associated with this activity.",
    },
    degrees: {
      es: [
        "2015. Doctor of Philosophy in Oceanography, The University of British Columbia, Vancouver, Canada.",
        "2004. Magister en Ciencias Mención Pesquerías, Universidad de Concepción, Chile.",
        "1997. Biólogo Marino, Universidad de Concepción, Chile.",
        "1995. Licenciatura en Biología Marina, Universidad de Concepción, Chile.",
      ],
      en: [
        "2015 Ph.D. in Oceanography, The University of British Columbia, Vancouver, Canada.",
        "2004 M.Sc. in Fisheries Science, University of Concepción, Chile.",
        "1997 Marine Biologist, University of Concepción, Chile.",
        "1995 Bachelor's Degree in Marine Biology, University of Concepción, Chile.",
      ],
    },
    projects: {
      es: [
        "2023-2026 Director e investigador proyecto: Estudio de los subsistemas ecológicos marinos y estuarinos del área adyacente al Complejo Horcones en el Golfo de Arauco, Región del Bio-Bio, Programa de Estudios Ecosistémicos del Golfo de Arauco (PREGA), Universidad de Concepción.",
        "2023-2025 Investigador adjunto, Centro Interdisciplinario para la Investigación Acuícola INCAR, Universidad de Concepción, Concepción, Chile.",
        "2022-2023 Investigador Proyecto: Risk analysis as a tool for the prioritization of secondary environmental quality standards in the main tributary rivers to the fjord system of northwestern Patagonia under hydrological drought scenarios , ANID, FSEQ210030.",
        "2022 Investigador proyecto: Forzantes oceanográficas del varamiento de especies marinas en el Golfo de Arauco: análisis y formulación de índices de riesgo, Facultad de Ciencias Naturales y Oceanográficas, Universidad de Concepción.",
        "2017-2020 Investigador postdoctoral Proyecto: Anticipating crises in stressed socio-ecological systems: developing fractal early warning indicators for aquaculture and fisheries in Chile , Concurso de postdoctorado 2017, Fondecyt N° 3170529.",
        "2017-2018 Investigador proyecto: CaligusLIFE Investigación científica de excelencia para la comprensión de la biología de Caligus rogercresseyi y su aplicación en estrategias de control de la caligidosis en la industria del salmón, Código N°201706070031, Programa para la Gestión Sanitaria en la Acuicultura, FIE-2015-V014.",
        "2017-2018 Investigador proyecto: Sistematización de conocimiento tácito y explícito para la promoción de la acuicultura sustentable en la Región del BioBío: una aproximación mediante la aplicación de lógica difusa, Fondo de Innovación para la Competitividad Regional-2017, Gobierno Regional del BioBío (FIC-R 2017), Universidad de Concepción.",
        "2014-2015 Investigador adjunto en Centro Interdisciplinario para la Investigación Acuícola INCAR, FONDAP 15110027, Universidad de Concepción.",
      ],
      en: [
        "2023-2026 Project Director and Researcher. Study of the Marine and Estuarine Ecological Subsystems of the Area Adjacent to the Horcones Complex in the Gulf of Arauco, Biobío Region. Gulf of Arauco Ecosystem Studies Program (PREGA), University of Concepción.",
        "2023-2025 Associate Researcher, Interdisciplinary Center for Aquaculture Research (INCAR), University of Concepción, Chile.",
        "2022-2023 Researcher. Risk Analysis as a Tool for the Prioritization of Secondary Environmental Quality Standards in the Main Tributary Rivers to the Fjord System of Northwestern Patagonia Under Hydrological Drought Scenarios. ANID Project FSEQ210030.",
        "2022 Researcher. Oceanographic Drivers of Marine Species Strandings in the Gulf of Arauco: Analysis and Development of Risk Indices. Faculty of Natural and Oceanographic Sciences, University of Concepción.",
        "2017-2020 Postdoctoral Researcher. Anticipating Crises in Stressed Socio-Ecological Systems: Developing Fractal Early Warning Indicators for Aquaculture and Fisheries in Chile. FONDECYT Postdoctoral Project No. 3170529.",
        "2017-2018 Researcher. CaligusLIFE: Excellence Scientific Research for Understanding the Biology of Caligus rogercresseyi and Its Application to Caligidosis Control Strategies in the Salmon Industry. Project Code No. 201706070031, Aquaculture Health Management Program, FIE-2015-V014.",
        "2017-2018 Researcher. Systematization of Tacit and Explicit Knowledge to Promote Sustainable Aquaculture in the Biobío Region: An Approach Based on the Application of Fuzzy Logic. Regional Competitiveness Innovation Fund (FIC-R 2017), Regional Government of Biobío, University of Concepción.",
        "2014-2015 Associate Researcher, Interdisciplinary Center for Aquaculture Research (INCAR), FONDAP Project No. 15110027, University of Concepción.",
      ],
    },
  },
  {
    slug: "valeria-anabalon",
    line: "impactos-en-ecosistemas",
    name: "Dra. Valeria Anabalón",
    role: { es: "Investigadora Joven", en: "Young Researcher" },
    email: "vanabaloo@udec.cl",
    links: {
      orcid: "https://orcid.org/0000-0002-4820-2707",
    },
    bio: {
      es: "Bióloga Marina y Doctora en Oceanografía y Cambio Global, con más de 15 años de experiencia en investigación oceanográfica, ecología del fitoplancton y dinámica de ecosistemas marinos asociados a zonas de surgencia costera. Su trayectoria científica esta principalmente vinculada a la Universidad de Concepción.\n\nEspecializada en oceanografía biológica, estructura y dinámica de comunidades fitoplanctonicas, floraciones algales nocivas, hipoxia marina y variabilidad ambiental en sistemas de surgencia del Pacífico Suroriental y Atlántico nororiental, participando en estudios vinculados a productividad primaria, biomasa fitoplanctónica, flujos de carbono orgánico marino y variabilidad oceanográfica. Posee experiencia en investigación interdisciplinaria vinculada al cambio climático global, sensores remotos aplicados a ecosistemas marinos y análisis de productividad oceánica. Además, cuenta con una amplia experiencia en campañas oceanográficas, procesamiento de muestras biológicas, análisis de citometría de flujo, carbono orgánico total (TOC), microscopía, pigmentos fotosintéticos y análisis de datos oceanográficos.\n\nAutora y coautora de publicaciones científicas en revistas internacionales de alto impacto como Progress in Oceanography, Remote Sensing, Journal of Geophysical Research: Oceans y PLoS ONE, contribuyendo al conocimiento de la dinámica del fitoplancton, estructuras mesoescala y procesos biogeoquímicos marinos.",
      en: "Dr. Valeria Anabalón is a Marine Biologist and holds a PhD in Oceanography with specialization in Global Change, with more than 15 years of experience in oceanographic research, phytoplankton ecology, and the dynamics of marine ecosystems associated with coastal upwelling zones. Her scientific career has been primarily linked to the University of Concepción.\n\nShe specializes in biological oceanography, phytoplankton community structure and dynamics, harmful algal blooms (HABs), marine hypoxia, and environmental variability in upwelling systems of the Southeastern Pacific and Northeastern Atlantic. Her research has contributed to studies on primary productivity, phytoplankton biomass, marine organic carbon fluxes, and oceanographic variability.\n\nDr. Anabalón has extensive experience in interdisciplinary research related to global climate change, the application of remote sensing tools to marine ecosystems, and the analysis of ocean productivity. She has also participated in numerous oceanographic cruises and has strong technical expertise in biological sample processing, flow cytometry, total organic carbon (TOC) analysis, microscopy, photosynthetic pigment analysis, and oceanographic data analysis.\n\nShe is the author and co-author of scientific publications in high-impact international journals such as Progress in Oceanography, Remote Sensing, Journal of Geophysical Research: Oceans, and PLoS ONE, contributing significantly to the understanding of phytoplankton dynamics, mesoscale structures, and marine biogeochemical processes.",
    },
    degrees: {
      es: [
        "2019. Doctora en oceanografía mención en cambio global. Universidad de Las Palmas de Gran Canaria, España.",
        "2005. Biología Marina, Universidad de Concepción, Chile.",
      ],
      en: [
        "2019. PhD in Oceanography, specialization in Global Change, University of Las Palmas de Gran Canaria, Spain.",
        "2005. Marine Biology, University of Concepción, Chile.",
      ],
    },
    projects: {
      es: [
        "2019-2025. Proyecto FONDAD- 1511027 “El Centro de Investigación en Acuicultura Sustentable. Investigador Adjunto.",
        "2017-2018. Grant N°106030-2017. Abundance of harmful microalgae and oceanographic conditions in the plague emergency area (Gulf of Penas, Aysén Region) and neighboring areas \". Study commissioned by SERNAPESCA. Investigadora Principal.",
        "2014-2018. Proyecto FONDECYT 1151299 (2015-2017). “Effect of submesoscale fronts on phytoplankton communities in the coastal region off central-southern Chile’’.",
        "2013-2019. Proyecto milenio IC12009: Instituto Milenio de Oceanografía en el Pacífico Sur (IMO-Chile).",
        "2012-2014. Proyecto FONDECYT 1120504- CONICYT. ”El fitoplancton estructura de la comunidad en el área de afloramiento de la zona centro-sur de Chile: respuestas específicas e integradas a la variabilidad del medio ambiente.”",
        "2008-2010. Proyecto: Fondecyt 1070504-CONICYT. “Coastal-ocean exchanges in a high eddy kinetic energy region and productive upwelling system: effects on plankton community structure and carbon production\"",
        "2008-2012. Proyecto CAIBEX (CTM2007-66408-CO2-02) “Español Plan de Nacional de I + D” (MEC).",
        "Proyecto: FONDECYT (2007-2009). “Intercambios costeros de alta mar en una región de alta energía cinética de eddy y el sistema de surgencia productiva: efectos sobre la estructura de la comunidad de plancton y la producción de carbono”",
        "2004-2008. Programa FONDAP – CONICYT nº 150100007 .“Centro de Investigación Oceanográfica del Pacífico Sur-Oriental” COPAS, Universidad de Concepción.",
      ],
      en: [
        "2019–2025. FONDAP Project 1511027. Center for Research on Sustainable Aquaculture. Associate Researcher.",
        "2017–2018. Grant No. 106030-2017. “Abundance of harmful microalgae and oceanographic conditions in the plague emergency area (Gulf of Penas, Aysén Region) and neighboring areas.” Study commissioned by SERNAPESCA. Principal Investigator.",
        "2014–2018. FONDECYT Project 1151299 (2015–2017). “Effect of submesoscale fronts on phytoplankton communities in the coastal region off central-southern Chile.”",
        "2013–2019. Millennium Project IC12009. Millennium Institute of Oceanography of the South Pacific (IMO-Chile).",
        "2012–2014. FONDECYT Project 1120504 – CONICYT. “Community structure of phytoplankton in the upwelling area of central-southern Chile: specific and integrated responses to environmental variability.”",
        "2008–2010. FONDECYT Project 1070504 – CONICYT. “Coastal-ocean exchanges in a high eddy kinetic energy region and productive upwelling system: effects on plankton community structure and carbon production.”",
        "2008–2012. CAIBEX Project (CTM2007-66408-CO2-02). Spanish National R&D Plan.",
        "2007–2009. FONDECYT Project. “Coastal-ocean exchanges in a high eddy kinetic energy region and productive upwelling system: effects on plankton community structure and carbon production.”",
        "2004–2008. FONDAP–CONICYT Program No. 150100007. Center for Oceanographic Research in the South-Eastern Pacific (COPAS), University of Concepción.",
      ],
    },
  },
  {
    slug: "zeneida-wong",
    line: "impactos-en-ecosistemas",
    name: "Dra. Zeneida Wong",
    role: { es: "Investigadora Joven", en: "Young Researcher" },
    email: "zenewong@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/zenewong/",
      orcid: "https://orcid.org/0000-0001-5221-2687",
      scholar: "https://scholar.google.com/citations?hl=es&user=-pE-Ws4AAAAJ",
      researchgate: "https://www.researchgate.net/profile/Zeneida-Wong",
    },
    bio: {
      es: "La Dra. Zeneida Wong es oceanógrafa e investigadora del Centro INCAR². Su trabajo se especializa en oceanografía física costera, con énfasis en el estudio de canales del sur de Chile, donde analiza la dinámica de constricciones y procesos de intercambio de agua relevantes para la acuicultura. Su investigación abarca además el análisis y procesamiento de datos satelitales para explorar la interacción océano-atmósfera, y mantiene un marcado interés en la colaboración interdisciplinaria. Es autora y coautora de estudios sobre la formación y evolución de sombras de surgencia en el Golfo de Arauco, abordando su estructura térmica superficial y el rol del jet costero en la variabilidad de estos procesos.\n\nLa Dra. Wong obtuvo sus Doctorado en Oceanografía en la Universidad de Concepción (2022) y es graduada de Oceanografía por la ESPOL en Ecuador (2011).",
      en: "Dr. Zeneida Wong is an oceanographer and researcher at the INCAR² Center. Her work specializes in coastal physical oceanography, with a strong focus on the study of southern Chilean channels, where she analyzes the dynamics of constrictions and water exchange processes that are highly relevant to aquaculture.\n\nHer research also includes the analysis and processing of satellite data to investigate ocean–atmosphere interactions, and she maintains a strong interest in interdisciplinary collaboration. She is the author and co-author of studies on the formation and evolution of upwelling shadows in the Gulf of Arauco, addressing their surface thermal structure and the role of the coastal jet in driving variability in these processes.\n\nDr. Wong earned her PhD in Oceanography from the University of Concepción (2022) and holds a degree in Oceanography from ESPOL (Escuela Superior Politécnica del Litoral) in Ecuador (2011).",
    },
    degrees: {
      es: [
        "2022. Doctorado en Oceanografía, Universidad de Concepción. Concepción – Chile.",
        "2011. Graduada de Oceanógrafa en la Escuela Superior Politécnica del Litoral (ESPOL). Guayaquil – Ecuador.",
      ],
      en: [
        "2022. PhD in Oceanography, University of Concepción. Concepción, Chile.",
        "2011. Bachelor’s degree in Oceanography, Escuela Superior Politécnica del Litoral (ESPOL). Guayaquil, Ecuador.",
      ],
    },
    projects: { es: [], en: [] },
  },
  {
    slug: "luis-montecinos",
    line: "impactos-en-ecosistemas",
    name: "Luis Montecinos Reyes",
    role: { es: "Asistente de Investigación", en: "Research Assistant" },
    email: "lmontecinosr@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/luis-montecinos-505b8778/",
    },
    bio: {
      es: "Luis Montecinos es Biólogo Marino y Asistente de Investigación de la Línea de Investigación 5 (RL5) de INCAR², enfocada en el estudio de los impactos ambientales de la acuicultura sobre los ecosistemas marinos. Es Licenciado en Ciencias con Mención en Biología Marina (2006) y Biólogo Marino (2007) por la Universidad Católica de la Santísima Concepción. Además, obtuvo el grado de Magíster en Ciencias con Mención en Oceanografía en la Universidad de Concepción en 2015. Su experiencia profesional combina las ciencias marinas, el trabajo oceanográfico en terreno y el monitoreo ambiental, respaldada por su certificación como Buzo Profesional (Buzo Comercial). En INCAR², participa en actividades de muestreo, recopilación de datos y apoyo a investigaciones orientadas a comprender la dinámica de los ecosistemas marinos y costeros, así como los efectos del desarrollo acuícola sobre estos ambientes.",
      en: "Luis Montecinos is a Marine Biologist and Research Assistant in Research Line 5 (RL5) of INCAR², focused on the environmental impacts of aquaculture on marine ecosystems. He holds a Bachelor's Degree in Science with a specialization in Marine Biology (2006) and a professional degree in Marine Biology (2007) from the Universidad Católica de la Santísima Concepción. He also earned an M.Sc. in Oceanography from the University of Concepción in 2015. His professional experience combines marine science, oceanographic fieldwork, and environmental monitoring, supported by his qualifications as a Professional Diver (Commercial Diver). Within INCAR², he contributes to field sampling, data collection, and the implementation of research activities aimed at improving the understanding of marine and coastal ecosystem dynamics in relation to aquaculture development.",
    },
    degrees: {
      es: [
        "2006.- Licenciado en Ciencias Mención Biología Marina, Universidad Católica de la Santísima Concepción.",
        "2007.- Título profesional de Biólogo Marino, Universidad Católica de la Santísima Concepción.",
        "2015.- Magíster en Ciencias con Mención en Oceanografía, Universidad de Concepción. Buzo profesional (Buzo Comercial)",
      ],
      en: [
        "2006 Bachelor's Degree in Science with a Major in Marine Biology, Universidad Católica de la Santísima Concepción, Chile.",
        "2007 Professional Degree in Marine Biology, Universidad Católica de la Santísima Concepción, Chile.",
        "2015 Master of Science in Oceanography, University of Concepción, Chile.",
        "Professional Diver (Commercial Diver).",
      ],
    },
    projects: {
      es: [],
      en: [],
    },
  },
  {
    slug: "doris-soto",
    line: "resiliencia-de-la-acuicultura",
    name: "Dra. Doris Soto Benavides",
    role: { es: "Investigadora Principal", en: "Principal Investigator" },
    email: "dorsoto@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/doris-soto-b351263b/",
      orcid: "https://orcid.org/0000-0002-8216-6332",
      scholar: "https://scholar.google.com/citations?user=oDsvX3AAAAAJ&hl=en",
      researchgate: "https://www.researchgate.net/profile/Doris-Soto",
    },
    bio: {
      es: "La Dra. Doris Soto Benavides es Licenciada en Biología de la Facultad de Ciencias de la Universidad de Chile (1978) y posee un Doctorado en Ecología de UC Davis en Estados Unidos (1988).\n\nEn 1990 se integró a la Universidad Austral de Chile en Puerto Montt, donde desarrolló el Laboratorio de Ecología Acuática, especializándose en el estudio de las implicaciones ambientales de la acuicultura y las interacciones entre acuicultura y la pesca. Allí, la Dra. Soto formó un gran número de estudiantes de pregrado y postgrado y lideró numerosos proyectos científicos en activo trabajo con el sector público y privado.\n\nEn el 2005 la Dra. Soto se une a la Organización de las Naciones Unidas para la Alimentación (FAO) en Roma, Italia, como Oficial Senior, a cargo de los programas y actividades relacionadas con la acuicultura y medioambiente, incluyendo el cambio climático, a nivel global. Allí lideró diversos proyectos e iniciativas en distintos países de Europa, Asia, África y América Latina.\n\nLa investigadora ha publicado más de 80 trabajos científicos en revistas de alto nivel y numerosas publicaciones de la FAO incluyendo directrices globales y recomendaciones de políticas.\n\nA mediados del 2016 la Dra. Soto regresa a Chile para unirse al Centro Interdisciplinario para la Investigación Acuícola (INCAR), al alero de la Universidad de Concepción, trabajando desde Puerto Montt, donde lidera el área de cambio climático y resiliencia de la acuicultura y el desarrollo e implementación del enfoque ecosistémico en la acuicultura.\n\nDe acuerdo con el ranking Research 2025/2026, en la Categoría Mejores Científicos de Ciencias Ambientales, la Dra. Doris Soto, aparece en el 10 lugar y es la mujer mejor rankeada a nivel nacional, y 7.173 a nivel mundial, con 80 publicaciones y 13.617 citaciones, lo que le da un índice D-38.",
      en: "Dr. Doris Soto Benavides holds a Bachelor’s degree in Biology from the Faculty of Sciences at the University of Chile (1978) and a Ph.D. in Ecology from UC Davis in the United States (1988).\n\nIn 1990, she joined the Austral University of Chile in Puerto Montt, where she developed the Aquatic Ecology Laboratory, specializing in the study of the environmental implications of aquaculture and the interactions between aquaculture and fisheries. There, Dr. Soto trained a large number of undergraduate and graduate students and led numerous scientific projects in active collaboration with the public and private sectors.\n\nIn 2005, Dr. Soto joined the Food and Agriculture Organization of the United Nations (FAO) in Rome, Italy, as a Senior Officer in charge of programs and activities related to aquaculture and the environment, including climate change, at the global level. In this role, she led various projects and initiatives across Europe, Asia, Africa, and Latin America.\n\nThe researcher has published more than 80 scientific papers in high-impact journals and numerous FAO publications, including global guidelines and policy recommendations.\n\nIn mid-2016, Dr. Soto returned to Chile to join the Interdisciplinary Center for Aquaculture Research (INCAR), under the University of Concepción, working from Puerto Montt, where she leads the climate change and aquaculture resilience area, as well as the development and implementation of the ecosystem approach to aquaculture.\n\nAccording to the Research ranking 2025/2026, in the category of Top Scientists in Environmental Sciences, Dr. Doris Soto ranks 10th and is the highest-ranked woman nationally, and 7,173rd worldwide, with 80 publications and 13,617 citations, giving her a D-index of 38.",
    },
    degrees: {
      es: [
        "1988. Doctora en Ecología, Programa conjunto Universidad de California en Davis-San Diego State University, USA.",
        "1979. Licenciada en Biología, Facultad de Ciencias Universidad de Chile.",
      ],
      en: [
        "1988. Ph.D. in Ecology, Joint Program University of California, Davis – San Diego State University, USA.",
        "1979. Bachelor’s Degree in Biology, Faculty of Sciences, University of Chile.",
      ],
    },
    projects: {
      es: [
        "Lideró la elaboración de los mapas de riesgo climático para la acuicultura Chilena (mitilicultura y salmonicultura). Centro de Ciencia del Clima y la Resiliencia y Centro de Cambio Global UC para el Ministerio del Medio y Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ). https://arclim.mma.gob.cl/atlas/sector_index/acuicultura/",
        "Lideró el proyecto Propuesta de evaluación del desempeño ambiental de la salmonicultura Chilena a escala de ecosistemas en el mar interior del sur de Chile a través de un convenio de cooperación con WWF Chile. https://centroincar.cl/wp-content/uploads/2021/07/Propuesta-de-evaluacion-del-desempeno-ambiental-de-la-salmonicultura-Chilena-a-escala-de-ecosistemas.pdf",
        "Ha liderado hasta ahora una iniciativa interdisciplinaria y multiinstitucional para desarrollar e implementar un sistema de semáforo que regule la produccion máxima de salmones por ecosistema/cuerpo de agua o barrios, basado en riesgos ambientales (incluyendo cambio climático) y productivos. https://centroincar.cl/wp-content/uploads/2022/07/PolicyBrieff11Incar.pdf",
        "Lideró el desarrollo de una herramienta para la adaptacion al cambio climático de la acuicultura a nivel global en un convenio de cooperación con FAO Roma, utilizando dos casos de estudio en la maricultura de Chile. https://openknowledge.fao.org/server/api/core/bitstreams/e9e5a801-b71f-47b3-a98b-146c9edf37dc/content",
        "Ha participado en el desarrollo del Tercer reporte del estado global del océano WOA UN en los grupos de evaluación de la acuicultura industrial y de acuicultura de pequeña escala. https://www.un.org/regularprocess/sites/www.un.org.regularprocess/files/list_of_wts_2.pdf",
      ],
      en: [
        "Dr. Soto led the development of climate risk maps for Chilean aquaculture (mussel farming and salmon farming) at the Center for Climate and Resilience Science and the Center for Global Change (UC), for the Ministry of the Environment and the Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ). https://arclim.mma.gob.cl/atlas/sector_index/acuicultura/",
        "She led the project “Proposal for assessing the environmental performance of Chilean salmon farming at the ecosystem scale in the inland sea of southern Chile” through a cooperation agreement with WWF Chile. https://centroincar.cl/wp-content/uploads/2021/07/Propuesta-de-evaluacion-del-desempeno-ambiental-de-la-salmonicultura-Chilena-a-escala-de-ecosistemas.pdf",
        "To date, she has led an interdisciplinary and multi-institutional initiative to develop and implement a “traffic light” system to regulate the maximum production of salmon by ecosystem/water body or neighborhoods, based on environmental (including climate change) and production risks. https://centroincar.cl/wp-content/uploads/2022/07/PolicyBrieff11Incar.pdf",
        "She led the development of a global tool for climate change adaptation in aquaculture through a cooperation agreement with FAO Rome, using two case studies in Chilean mariculture. https://openknowledge.fao.org/server/api/core/bitstreams/e9e5a801-b71f-47b3-a98b-146c9edf37dc/content",
        "Dr. Soto has participated in the development of the Third Global Ocean State Report (WOA, United Nations) within the working groups on industrial aquaculture and small-scale aquaculture assessment. https://www.un.org/regularprocess/sites/www.un.org.regularprocess/files/list_of_wts_2.pdf",
      ],
    },
  },
  {
    slug: "claudia-andrade",
    line: "resiliencia-de-la-acuicultura",
    name: "Dra. Claudia D. Andrade Díaz",
    role: { es: "Investigadora Adjunta", en: "Adjunct Researcher" },
    email: "claudia.andrade@umag.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/claudia-daniela-andrade-d%C3%ADaz-16785813/",
      orcid: "https://orcid.org/0000-0003-0804-6348",
      scholar: "https://scholar.google.com/citations?user=gWwK3CQAAAAJ",
    },
    bio: {
      es: "La Dra. Claudia D. Andrade Díaz es Doctora en Ciencias Naturales por la Universidad de Bremen (Alemania), Magíster en Manejo y Conservación de Recursos Naturales en Ambientes Subantárticos y Licenciada en Ciencias Biológicas de la Universidad de Magallanes (UMAG), Chile.\n\nActualmente se desempeña como académica asociada e investigadora del Instituto de la Patagonia de la Universidad de Magallanes, donde forma parte del Laboratorio de Ecología Funcional (LEF-UMAG). Cuenta con más de 15 años de experiencia en investigación, docencia universitaria y gestión científica en ecosistemas marinos subantárticos y antárticos.\n\nSu investigación se centra en la ecología bentónica, estructura y funcionamiento de redes tróficas, resiliencia ecosistémica y respuestas funcionales de comunidades marinas frente a perturbaciones ambientales y antrópicas. Integra herramientas como análisis de isótopos estables, ácidos grasos, toxinas, diversidad funcional y vision holística para comprender los flujos de energía y las transformaciones ecológicas en fiordos y canales de la Patagonia chilena.\n\nActualmente lidera el proyecto FONDECYT de Iniciación N°11241322 sobre el impacto de las floraciones algales nocivas (FANs) en comunidades bentónicas subantárticas. Además, participa en iniciativas nacionales e internacionales vinculadas a cambio climático, conservación marina, monitoreo ambiental y gobernanza de recursos acuáticos.\n\nEntre 2022 y 2024 fue presidente de la Sociedad Chilena de Ciencias del Mar (SCHCM) y actualmente participa en instancias científicas y técnicas relacionadas con manejo ecosistémico, acuicultura sostenible y políticas públicas para ecosistemas marinos australes.",
      en: "Dr. Claudia D. Andrade Díaz holds a Ph.D. in Natural Sciences from the University of Bremen (Germany), a Master’s degree in Management and Conservation of Natural Resources in Subantarctic Environments, and a Bachelor’s degree in Biological Sciences from the University of Magallanes (UMAG), Chile.\n\nShe currently serves as an Associate Professor and researcher at the Institute of Patagonia of the University of Magallanes, where she is part of the Functional Ecology Laboratory (LEF-UMAG). She has more than 15 years of experience in research, university teaching, and scientific management in subantarctic and Antarctic marine ecosystems.\n\nHer research focuses on benthic ecology, trophic network structure and functioning, ecosystem resilience, and functional responses of marine communities to environmental and anthropogenic disturbances. She integrates tools such as stable isotope analysis, fatty acids, toxins, functional diversity, and a holistic approach to understand energy flows and ecological transformations in the fjords and channels of Chilean Patagonia.\n\nShe currently leads the FONDECYT Initiation project No. 11241322 on the impact of harmful algal blooms (HABs) on subantarctic benthic communities. She also participates in national and international initiatives related to climate change, marine conservation, environmental monitoring, and governance of aquatic resources.\n\nBetween 2022 and 2024, she served as President of the Chilean Society of Marine Sciences (SCHCM) and currently participates in scientific and technical forums related to ecosystem-based management, sustainable aquaculture, and public policy for southern marine ecosystems.",
    },
    degrees: {
      es: [
        "2016. Doctor rerum naturalium (Dr. rer. nat.) en Ciencias Naturales, Universidad de Bremen, Alemania.",
        "2009. Magíster en Manejo y Conservación de Recursos Naturales en Ambientes Subantárticos, Universidad de Magallanes, Chile.",
        "2006. Licenciada en Ciencias Biológicas, Universidad de Magallanes, Chile.",
        "2005. Bachiller en Ciencias con mención en Biología y Química, Universidad de Magallanes, Chile.",
      ],
      en: [
        "2016. Doctor rerum naturalium (Dr. rer. nat.) in Natural Sciences, University of Bremen, Germany.",
        "2009. Master’s in Management and Conservation of Natural Resources in Subantarctic Environments, University of Magallanes, Chile.",
        "2006. Bachelor’s in Biological Sciences, University of Magallanes, Chile.",
        "2005. Bachelor of Science with a major in Biology and Chemistry, University of Magallanes, Chile.",
      ],
    },
    projects: {
      es: [
        "Investigadora principal FONDECYT de Iniciación N°11241322 (ANID) (2024–2027): “Tracing the impact of harmful algal blooms (HABs) on benthic communities: insights from fatty acids and stable isotopes analysis on the context of trophic structure and organization”.",
        "Directora alterna Proyecto FONDEF IT25I0050 (ANID) (2025-2027): Pesca recreativa sostenible, conservación de peces nativos y planificación territorial en áreas protegidas. Proyecto de I+D de interés público orientado a generar bases científicas y herramientas aplicadas para mejorar la planificación territorial, la conservación de ecosistemas acuáticos y el manejo sostenible de la pesca recreativa en áreas protegidas de la Región de Magallanes.",
        "Coinvestigadora Proyecto RISUE – IES RED21992: Investigación sobre redes tróficas, resiliencia y estructura funcional en fiordos y canales subantárticos de la Patagonia chilena.",
        "Coinvestigadora BESTACh – CIMAR FIORDOS 29 (2024-2027): Biodiversidad, estructura trófica y sensibilidad ambiental del zoobentos austral de Chile.",
        "Coinvestigadora ECOBENTOMAG – CIMAR FIORDOS 27 (2024-2027): Estado ecológico del zoobentos en el Estrecho de Magallanes: biodiversidad, estructura trófica y funcionalidad.",
      ],
      en: [
        "Principal Investigator, FONDECYT Initiation No. 11241322 (ANID) (2024–2027): “Tracing the impact of harmful algal blooms (HABs) on benthic communities: insights from fatty acids and stable isotopes analysis in the context of trophic structure and organization.”",
        "Alternate Director, FONDEF Project IT25I0050 (ANID) (2025–2027): Sustainable recreational fishing, conservation of native fish, and territorial planning in protected areas. Public-interest R&D project aimed at generating scientific foundations and applied tools to improve land-use planning, conservation of aquatic ecosystems, and sustainable management of recreational fisheries in protected areas of the Magallanes Region.",
        "Co-Investigator, RISUE Project – IES RED21992: Research on trophic networks, resilience, and functional structure in subantarctic fjords and channels of Chilean Patagonia.",
        "Co-Investigator, BESTACh – CIMAR FIORDOS 29 (2024–2027): Biodiversity, trophic structure, and environmental sensitivity of southern Chilean zoobenthos.",
        "Co-Investigator, ECOBENTOMAG – CIMAR FIORDOS 27 (2024–2027): Ecological status of zoobenthos in the Strait of Magellan: biodiversity, trophic structure, and functionality.",
      ],
    },
  },
  {
    slug: "jessica-fuentes",
    line: "resiliencia-de-la-acuicultura",
    name: "Dra. Jessica Fuentes Olmos",
    role: { es: "Investigadora Adjunta", en: "Adjunct Researcher" },
    email: "fo.jessica@gmail.com",
    links: {
      linkedin: "https://www.linkedin.com/in/jessica-fuentes-b6a00316/",
      orcid: "https://orcid.org/0009-0007-3302-6863",
    },
    bio: {
      es: "La Dra. Jessica Fuentes Olmos es profesora agregada de Derecho Público en la Escuela de Derecho de la Pontificia Universidad Católica de Valparaíso y tiene una amplia trayectoria en la Administración del Estado en el ámbito de la pesca, la acuicultura y el borde costero, ejerciendo diversos cargos, entre ellos, Jefa de la División Jurídica de la Subsecretaría de Pesca y Acuicultura y Subdirectora Jurídica del Servicio Nacional de Pesca y Acuicultura. Destaca su experiencia en la tramitación de diversas leyes relacionadas con la pesca, la acuicultura y los pueblos indígenas y su implementación por vía reglamentaria, así como en los procesos de fiscalización y procedimientos sancionatorios derivados de ellas. Su área de investigación se centra en la Regulación Ambiental y Sanitaria de la Acuicultura, enfocándose en la sustentabilidad basada en el enfoque ecosistémico.",
      en: "Dr. Jessica Fuentes Olmos is an Associate Professor of Public Law at the School of Law of the Pontifical Catholic University of Valparaíso and has extensive experience in public administration in the areas of fisheries, aquaculture, and coastal management. She has held various positions, including Head of the Legal Division of the Undersecretariat for Fisheries and Aquaculture and Deputy Legal Director of the National Fisheries and Aquaculture Service. Her experience stands out in the processing of various laws related to fisheries, aquaculture, and Indigenous peoples, as well as their implementation through regulations, and in enforcement processes and sanctioning procedures derived from them. Her research focuses on the environmental and sanitary regulation of aquaculture, with an emphasis on sustainability based on the ecosystem approach.",
    },
    degrees: {
      es: [
        "2018. Doctora en Derecho Pontificia Universidad Católica de Valparaíso.",
        "2011. Magister en Derecho con mención en Derecho Público.",
        "1997. Titulada de abogada por la Excelentísima Corte Suprema.",
        "1996. Licenciada en Ciencias Jurídicas por la Pontificia Universidad Católica de Valparaíso.",
      ],
      en: [
        "2018. Ph.D. in Law, Pontifical Catholic University of Valparaíso.",
        "2011. Master’s Degree in Law with a specialization in Public Law.",
        "1997. Admitted to the Bar by the Supreme Court of Chile.",
        "1996. Bachelor’s Degree in Legal Sciences, Pontifical Catholic University of Valparaíso.",
      ],
    },
    projects: {
      es: [
        "Elaboración del informe de revisión normativa para la universidad Austral en Proyecto FIPA 2022-26 Elaboración de una estrategia para implementar en Chile el plan de acción mundial para la conservación, la utilización sostenible y el desarrollo de los recursos genéticos acuáticos (RGA) para la alimentación y la agricultura en acuicultura y pesca (2023).",
        "Consultora internacional para proyecto del Banco Interamericano de Integración Económica Proyecto Propuesta de Gobernanza Plan para la sustentabilidad de los recursos marinos en la zona económica exclusiva de Costa Rica (2008).",
        "Consultora Internacional FAO Proyecto Fortalecimiento de la Autoridad Pesquera de Guatemala y Plan de ordenamiento del Camarón TCP/GUA/301 (2006).",
      ],
      en: [
        "Preparation of a regulatory review report for Austral University within FIPA Project 2022-26: Development of a strategy to implement in Chile the Global Plan of Action for the conservation, sustainable use, and development of aquatic genetic resources (AGR) for food and agriculture in aquaculture and fisheries (2023).",
        "International consultant for the Inter-American Bank for Economic Integration project: Governance Plan Proposal for the sustainability of marine resources in the exclusive economic zone of Costa Rica (2008).",
        "FAO International Consultant for the project: Strengthening of the Fisheries Authority of Guatemala and Shrimp Management Plan TCP/GUA/301 (2006).",
      ],
    },
  },
  {
    slug: "jorge-leon",
    line: "resiliencia-de-la-acuicultura",
    name: "Dr. Jorge León Muñoz",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "jleon@ucsc.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/jorge-le%C3%B3n-mu%C3%B1oz-01755a37/",
      orcid: "https://orcid.org/0000-0002-5625-6721",
      researchgate: "https://www.researchgate.net/profile/Jorge-Leon-Munoz",
    },
    bio: {
      es: "El Dr. Jorge León-Muñoz, Profesor Asociado de la Facultad de Ciencias de la Universidad Católica de la Santísima Concepción, desarrolla investigación orientada a comprender los efectos del cambio climático sobre los ecosistemas acuáticos de la Patagonia chilena. Sus estudios analizan cómo las variaciones hidrológicas de los ríos influyen sobre la dinámica de fiordos y sistemas costeros estratégicos para la acuicultura. A través de monitoreo ambiental, análisis hidroclimático y estudios de largo plazo, evalúa los riesgos asociados a sequías, eventos extremos y cambios en los aportes de agua dulce. Su trabajo aporta bases científicas para la gestión sustentable y la adaptación de los ecosistemas acuáticos frente al cambio climático.",
      en: "Dr. Jorge León-Muñoz, Associate Professor at the Faculty of Sciences of the Universidad Católica de la Santísima Concepción, conducts research aimed at understanding the effects of climate change on aquatic ecosystems in Chilean Patagonia. His studies analyze how hydrological variations in rivers influence the dynamics of fjords and coastal systems that are strategic for aquaculture. Through environmental monitoring, hydroclimatic analysis, and long-term studies, he assesses risks associated with droughts, extreme events, and changes in freshwater inputs. His work provides a scientific basis for sustainable management and the adaptation of aquatic ecosystems to climate change.",
    },
    degrees: {
      es: [
        "2011. Doctor en Ciencias Forestales, Universidad Austral de Chile.",
        "2005. Magíster Cs. Mención Recursos Hídricos, Universidad Austral de Chile.",
        "2003. Ingeniero en Acuicultura, Universidad Austral de Chile.",
      ],
      en: [
        "2011. Ph.D. in Forest Sciences, Austral University of Chile.",
        "2005. M.Sc. in Sciences with mention in Water Resources, Austral University of Chile.",
        "2003. Aquaculture Engineer, Austral University of Chile.",
      ],
    },
    projects: {
      es: [
        "2022-2025. “Hydrological signature influence on Chilean Aquaculture under climate change and landscape scenarios”. ANID FONDECYT Regular (N° 1221102). Investigador Responsable.",
        "2022-2023. “Risk analysis as a tool for the prioritization of secondary environmental quality standards in the main tributary rivers to the fjord system of northwertern Patagonia, under hydrological drought scenario”. ANID Fondo de Investigación Estratégica en Sequía (FSEQ210030). Director.",
        "2017-2021. “Potential effects of land use change on fjords of western Patagonia under climate change scenarios”. CONICYT FONDECYT Iniciación (N° 11170768). Investigador Responsable.",
      ],
      en: [
        "2022–2025. “Hydrological signature influence on Chilean aquaculture under climate change and landscape scenarios.” ANID FONDECYT Regular (No. 1221102). Principal Investigator.",
        "2022–2023. “Risk analysis as a tool for the prioritization of secondary environmental quality standards in the main tributary rivers of the northwestern Patagonian fjord system under a hydrological drought scenario.” ANID Strategic Research Fund on Drought (FSEQ210030). Project Director.",
        "2017–2021. “Potential effects of land use change on western Patagonian fjords under climate change scenarios.” CONICYT FONDECYT Initiation (No. 11170768). Principal Investigator.",
      ],
    },
  },
  {
    slug: "carlos-molinet",
    line: "interacciones-sustentables",
    name: "Dr. Carlos Molinet Flores",
    role: { es: "Investigador Principal", en: "Principal Investigator" },
    email: "cmolinet@uach.cl",
    links: {
      orcid: "https://orcid.org/0000-0003-3702-0526",
      scholar: "https://scholar.google.com/citations?user=gWwK3CQAAAAJ",
    },
    bio: {
      es: "El Dr. Carlos Molinet es académico en la Universidad Austral de Chile y el Centro INCAR, donde se desempeña como investigador y docente en el área de ciencias biológicas y ambientales. Su trabajo de investigación se enfoca en ecología marina y manejo costero, principalmente referido a especies bentónicas, con mucho énfasis en los ecosistemas estuarinos del mar interior del sur de Chile.\n\nA lo largo de su carrera, el Dr. Molinet ha participado en numerosos proyectos de investigación y ha publicado artículos en revistas especializadas, contribuyendo significativamente al conocimiento sobre la biodiversidad y la gestión sostenible de los recursos hídricos. Su compromiso con la formación de nuevas generaciones de científicos lo convierte en una figura destacada dentro de la comunidad académica. Además, su labor incluye la asesoría a comunidades humanas costeras del sur de Chile, la participación en iniciativas de divulgación científica y la promoción de la importancia del manejo para la conservación y el uso responsable de los recursos naturales.",
      en: "Dr. Carlos Molinet is a faculty member at the Austral University of Chile and the INCAR Center, where he works as a researcher and lecturer in the field of biological and environmental sciences. His research focuses on marine ecology and coastal management, mainly related to benthic species, with strong emphasis on estuarine ecosystems of the inland sea of southern Chile.\n\nThroughout his career, Dr. Molinet has participated in numerous research projects and has published articles in specialized journals, contributing significantly to knowledge on biodiversity and the sustainable management of aquatic resources. His commitment to training new generations of scientists makes him a leading figure in the academic community. In addition, his work includes advising coastal communities in southern Chile, participating in science communication initiatives, and promoting the importance of management for conservation and responsible use of natural resources.",
    },
    degrees: {
      es: [
        "2005. Doctor en Ciencias (Sistemática y Ecología), Universidad Austral de Chile.",
        "1991. Biólogo Marino, Universidad Austral de Chile.",
      ],
      en: [
        "2005. Ph.D. in Sciences (Systematics and Ecology), Austral University of Chile.",
        "1991. Marine Biologist, Austral University of Chile.",
      ],
    },
    projects: {
      es: [
        "2017-2021. FONDECYT 1170507. Spatial and bathymetric dynamics of Lithodes santolla (Decapoda, Lithodidae) (Molina 1782) in channels of southern Chile: Basis for fishery management. Investigador Responsable.",
        "2013-2015. FONDECYT 1130716. Population dynamics of Mitylus chilensis in the Reloncaví Fjord: Scientific bases for mussel aquaculture. Investigador Responsable.",
        "2010-2012. FONDECYT 1100931. Coupling of physical and biological processes that sustain deep populations of Loxechinus albus over bathymetric features in northwest Patagonian Inland Sea. Co-investigador.",
        "2008-2010. FONDECYT 1080098. “Bases biológicas para el control y manejo de la epizootia producida por Caligus royercresseyi en el salmón de cultivo, Salmo salar: importancia de la dinámica espacio-temporal, dispersión larval y de los hospedadores reservorios”. Co-investigador.",
        "2023-2024. FIPA 2023-01. Caracterización y evaluación ecológica y genética de los bancos naturales de mitílidos y su aporte a la disponibilidad de larvas para la actividad de colecta de semillas, etapa 1: Fiordo Reloncaví y comunas de Hualaihué y Castro. Director.",
        "2022-2024. FIPA 2021-36. Estudio de la ecología, gestión y manejo de la anémona de mar del género Metridium en las localidades de Maullín y Carelmapu en la Región de los Lagos. Director.",
        "2023-2024. Red de Estaciones fijas de los recursos erizo, almeja y luga en la X y XI regiónes. Convenio IFOP. Director.",
        "2019-2021. ID19I10309. Transporte de Centolla viva a larga distancia: adición de valor a un recurso de gran importancia socio-económoca de la Patagonia. Co-investigador.",
        "2019-2021. SEREMI del Medio Ambiente, región de Aysén. MONITOREO Área Marina Costera Protegida de Múltiples Usos (AMCP-MU) Pitipalena – Añihue”. Director.",
        "2017-2018. FIPA 2017-55. “Evaluación de la aplicación de metodologías de evaluación indirecta de stock de pesquerías bentónicas como insumo para el manejo pesquero”. Director.",
        "2016-2017. SEREMI del Medio Ambiente, región de Aysén. Estudio de biodiversidad marina bentónica del Área Marina Costera Protegida de Múltiples Usos (AMCP-MU) Pitipalena – Añihue”. Director.",
        "2016-2017. FIP 2016-41. “Caracterización de la pesquería y evaluación del stock del recurso Pulpo del Sur en la X región”. Director.",
        "2014-2016. FIP 2014-57. “Prospección y evaluación de la condición de bancos naturales de mitílidos en la zona sur-austral de chile”. Director.",
        "2014-2016. FIP 2014-08. “Actualización de parámetros biológicos y de crecimiento de erizo en la X y XI regiones”.",
        "2013-2014. SUBSECRETARIA DE PESCA, “Evaluación de los factores limitantes en el desarrollo de cultivos de mitílidos, para análisis de capacidad de carga, X Región de Los Lagos (2da Etapa)”.",
        "2012-2013. FIP 2012-14. “Diseño de una red de estaciones fijas de monitoreo para la pesquería del recurso erizo en la X y XI Regiones”.",
        "2012-2014. FIC25-AYSEN (30128577), “Desarrollo de un programa piloto para captación de semillas de mitílidos, en áreas con baja frecuencia de mareas rojas de la región de Aysén: aplicación en Raúl Marín Balmaceda”.",
        "2012. SUBSECRETARIA DE PESCA, “Evaluación de los factores limitantes en el desarrollo de cultivos de mitílidos, para análisis de capacidad de carga, X Región de Los Lagos (1ra Etapa)”.",
        "2008-2011. FONDEF MR 07I1007. “Desarrollo de herramientas de manejo para la planificación de cosechas de bancos naturales de recursos bentonicos contaminados con biotoxinas marinas”, Director alterno.",
        "2007-2011. INNOVA-CHILE 06FC01IPC-39. “Desarrollo de una unidad de investigacion científico-tecnológica para estudios de dinamica poblacional de recursos bentonicos en aguas interiores del sur de chile”. Director.",
        "2008-2009. FIP 2007-44. “Estudio de poblaciones fuente (profundas) y flujo de dispersión larvaria y reclutamiento de erizos en la XI región (Fase I)”. Investigador responsable.",
        "2008-2009. PNUD SDP 030. “Estudio levantamiento y diagnóstico bentónico en el área marina costera protegida de múltiples usos lafken mapulahual, región de Los Lagos”. Investigador responsable.",
        "2007. GORE Aysén. “Diagnóstico económico y ambiental del litoral de Aysén desde la península de Taitao al limite norte de la región”. Investigador responsable.",
        "2005-2007. FIP 2005-51. “Diagnóstico Biológico Pesquero para Recursos Bentónicos de la Zona Contigua, X y XI Región”. Investigador responsable.",
        "2005-2007. FIP 2005-14. “Validación de la metodología de evaluación de bancos naturales recursos hidrobiológicos y praderas de algas”. Investigador responsable.",
      ],
      en: [
        "2017–2021. FONDECYT 1170507. Spatial and bathymetric dynamics of Lithodes santolla (Decapoda, Lithodidae) (Molina 1782) in channels of southern Chile: Basis for fishery management. Principal Investigator.",
        "2013–2015. FONDECYT 1130716. Population dynamics of Mytilus chilensis in the Reloncaví Fjord: Scientific basis for mussel aquaculture. Principal Investigator.",
        "2010–2012. FONDECYT 1100931. Coupling of physical and biological processes that sustain deep populations of Loxechinus albus over bathymetric features in the northwestern Patagonian Inland Sea. Co-Investigator.",
        "2008–2010. FONDECYT 1080098. Biological bases for the control and management of the epizootic caused by Caligus rogercresseyi in farmed salmon (Salmo salar): importance of spatio-temporal dynamics, larval dispersion, and reservoir hosts. Co-Investigator.",
        "2023–2024. FIPA 2023-01. Characterization and ecological and genetic assessment of natural mussel banks and their contribution to larval supply for seed collection activities, Stage 1: Reloncaví Fjord and the municipalities of Hualaihué and Castro. Director.",
        "2022–2024. FIPA 2021-36. Study of the ecology, management, and governance of sea anemones of the genus Metridium in Maullín and Carelmapu (Los Lagos Region). Director.",
        "2023–2024. Fixed station network for sea urchin, clam, and luga resources in Regions X and XI (IFOP agreement). Director.",
        "2019–2021. ID19I10309. Long-distance transport of live king crab: value addition to a resource of high socioeconomic importance in Patagonia. Co-Investigator.",
        "2019–2021. Regional Ministry of Environment (Aysén Region). Monitoring of the Pitipalena–Añihue Multiple-Use Marine and Coastal Protected Area (MCPA-MU). Director.",
        "2017–2018. FIPA 2017-55. Evaluation of the application of indirect stock assessment methodologies for benthic fisheries as input for fisheries management. Director.",
        "2016–2017. Regional Ministry of Environment (Aysén Region). Study of benthic marine biodiversity in the Pitipalena–Añihue Multiple-Use Marine and Coastal Protected Area. Director.",
        "2016–2017. FIP 2016-41. Characterization of the fishery and stock assessment of southern octopus in the Los Lagos Region. Director.",
        "2014–2016. FIP 2014-57. Prospection and assessment of natural mussel banks in southern Chile. Director.",
        "2014–2016. FIP 2014-08. Update of biological and growth parameters of sea urchins in Regions X and XI.",
        "2013–2014. Undersecretariat of Fisheries. Assessment of limiting factors in mussel aquaculture development for carrying capacity analysis, Los Lagos Region (Phase 2).",
        "2012–2013. FIP 2012-14. Design of a fixed monitoring station network for the sea urchin fishery in Regions X and XI.",
        "2012–2014. FIC25-AYSEN (30128577). Development of a pilot program for mussel seed capture in areas with low frequency of harmful algal blooms in the Aysén Region: application in Raúl Marín Balmaceda.",
        "2012. Undersecretariat of Fisheries. Assessment of limiting factors in mussel aquaculture development for carrying capacity analysis, Los Lagos Region (Phase 1).",
        "2008–2011. FONDEF MR 07I1007. Development of management tools for planning harvests of benthic resources contaminated with marine biotoxins. Alternate Director.",
        "2007–2011. INNOVA Chile 06FC01IPC-39. Development of a scientific-technological research unit for population dynamics studies of benthic resources in inland waters of southern Chile. Director.",
        "2008–2009. FIP 2007-44. Study of source populations (deep) and larval dispersion and recruitment of sea urchins in Region XI (Phase I). Principal Investigator.",
        "2008–2009. UNDP SDP 030. Survey and benthic diagnosis of the Lafken Mapu Lahual multiple-use marine and coastal protected area, Los Lagos Region. Principal Investigator.",
        "2007. Regional Government of Aysén. Economic and environmental diagnosis of the Aysén coastline from the Taitao Peninsula to the northern boundary of the region. Principal Investigator.",
        "2005–2007. FIP 2005-51. Fisheries-biological diagnosis of benthic resources in the contiguous zone (Regions X and XI). Principal Investigator.",
        "2005–2007. FIP 2005-14. Validation of assessment methodologies for natural banks of hydrobiological resources and seaweed beds. Principal Investigator.",
      ],
    },
  },
  {
    slug: "marcela-astorga",
    line: "interacciones-sustentables",
    name: "Dra. Marcela Astorga",
    role: { es: "Investigadora Adjunta", en: "Adjunct Researcher" },
    email: "marcelaastorga@uach.cl",
    links: {
      orcid: "https://orcid.org/0000-0002-9364-2365",
      scholar: "https://scholar.google.com/citations?user=cb1XIycAAAAJ&hl=en",
    },
    bio: {
      es: "La Dra. Marcela Astorga Opazo es Licenciada en Ciencias Biológicas de la Pontificia Universidad Católica de Chile y Doctora en Ciencias Biológicas de la Universidad de Concepción, Chile.\n\nDurante su carrera en la casa de estudios ha impartido docencia en pregrado y postgrado, ha patrocinado tesis de pregrado y en postgrado, tanto de magíster como de doctorado.\n\nCuenta con amplia trayectoria en investigación, habiendo sido responsable y coinvestigadora en proyectos de diversos tipos, destacando iniciativas FONDECYT, FONDEF IDEA, Innova-CORFO, FIPA y FIC regionales.\n\nHa publicado libros, capítulos de libro y un amplio número de artículos científicos en revistas de alto impacto. Actualmente es integrante del Comité Asesor de la FAO como experta de Latinoamérica y el Caribe en el grupo de Recursos Genéticos Acuáticos.\n\nHa sido Directora de Escuela en pregrado y en postgrado Directora del programa de Doctorado en Ciencias de la Acuicultura. Hasta ahora ejercía el cargo de Directora de la Escuela de Graduados de la Sede Puerto Montt e integraba la Comisión Central de Doctorado y la Comisión Central de Adscripción y Promociones.\n\nSus líneas de investigación se centran en genética evolutiva con especialidad en genética de poblaciones de organismos acuáticos mediante uso de marcadores moleculares.",
      en: "Dr. Marcela Astorga Opazo holds a Bachelor’s degree in Biological Sciences from the Pontifical Catholic University of Chile and a Ph.D. in Biological Sciences from the University of Concepción, Chile.\n\nThroughout her academic career, she has taught at both undergraduate and graduate levels and has supervised undergraduate theses as well as master’s and doctoral dissertations.\n\nShe has extensive experience in research, having served as principal investigator and co-investigator in a wide range of projects, including FONDECYT, FONDEF IDEA, CORFO Innova, FIPA, and regional FIC initiatives.\n\nShe has published books, book chapters, and a large number of scientific articles in high-impact journals. She is currently a member of the FAO Advisory Committee as an expert for Latin America and the Caribbean in the Aquatic Genetic Resources group.\n\nShe has served as Undergraduate Program Director and, at the graduate level, as Director of the Ph.D. Program in Aquaculture Sciences. Until recently, she held the position of Director of the Graduate School at the Puerto Montt campus and was a member of the Central Doctoral Committee and the Central Appointment and Promotion Committee.\n\nHer research focuses on evolutionary genetics, with a specialization in population genetics of aquatic organisms using molecular markers.",
    },
    degrees: {
      es: [
        "Doctora en Ciencias Biológicas, Universidad de Concepción.",
        "Licenciada en Ciencias Biológicas Universidad Católica de Chile.",
      ],
      en: [
        "Ph.D. in Biological Sciences, University of Concepción.",
        "Bachelor’s Degree in Biological Sciences, Pontifical Catholic University of Chile.",
      ],
    },
    projects: {
      es: [
        "2026-2027. FIPA 2025-06. “Determinación de los niveles de concentración y especiación química de arsénico orgánico e inorgánico en moluscos bivalvos y macroalgas de importancia comercial para consumo humano”. Responsable.",
        "2025-2035. Centro Tecnológico de Economía Circular CeTEC Los Lagos. Corfo. Coinvestigador.",
        "2024-2025. Subpesca. “Levantamiento y Sistematización de Propuestas para una Ley General de Acuicultura para Chile”. Responsable.",
        "2023-2024. FIPA 2023-01. Caracterización y evaluación ecológica y genética de los bancos naturales de mitílidos y su aporte a la disponibilidad de larvas para la actividad de colecta de semillas, Etapa 1: Fiordo Reloncaví y comunas de Hualaihué y Castro. Co-investigador.",
        "2022-2023. FIPA 2022-24. Elaboración de una estrategia para implementar en Chile el Plan de Acción Mundial para la conservación, la utilización sostenible y el desarrollo de los recursos genéticos acuáticos (RGA) para la alimentación y la agricultura en acuicultura y pesca. Investigador Responsable.",
        "2022-2023. FIPA 2021-36. “Estudio de la ecología, gestión y manejo de la anémona de mar del género Metridium en las localidades de Maullín y Carelmapu en la región de Los Lagos”. Co-Investigador.",
      ],
      en: [
        "2026–2027. FIPA 2025-06. “Determination of concentration levels and chemical speciation of organic and inorganic arsenic in bivalve mollusks and macroalgae of commercial importance for human consumption.” Principal Investigator.",
        "2025–2035. CeTEC Los Lagos Circular Economy Technological Center (CORFO). Co-Investigator.",
        "2024–2025. Undersecretariat for Fisheries and Aquaculture. “Compilation and systematization of proposals for a General Aquaculture Law for Chile.” Principal Investigator.",
        "2023–2024. FIPA 2023-01. Characterization and ecological and genetic assessment of natural mussel banks and their contribution to larval availability for seed collection activities, Stage 1: Reloncaví Fjord and the municipalities of Hualaihué and Castro. Co-Investigator.",
        "2022–2023. FIPA 2022-24. Development of a strategy to implement in Chile the Global Plan of Action for the conservation, sustainable use, and development of aquatic genetic resources (AqGR) for food and agriculture in aquaculture and fisheries. Principal Investigator.",
        "2022–2023. FIPA 2021-36. “Study of the ecology, governance, and management of sea anemones of the genus Metridium in Maullín and Carelmapu (Los Lagos Region).” Co-Investigator.",
      ],
    },
  },
  {
    slug: "patricio-diaz",
    line: "interacciones-sustentables",
    name: "Dr. Patricio A. Díaz",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "patricio.diaz@ulagos.cl",
    links: {
      orcid: "https://orcid.org/0000-0002-9403-8151",
      researchgate: "https://www.researchgate.net/profile/Patricio-Diaz-4",
      scholar: "https://scholar.google.com/citations?hl=en&user=QlVHOMcAAAAJ&view_op=list_works",
    },
    bio: {
      es: "El Dr. Patricio A. Díaz es investigador y académico de la Universidad de Los Lagos, donde forma parte del Centro i~mar. Su trayectoria científica se ha enfocado en el estudio de Floraciones Algales Nocivas (FAN), oceanografía costera y sistemas de fiordos patagónicos, abordando problemáticas de alta relevancia ambiental, productiva y sanitaria. Es Doctor en Oceanografía por la Universidad de Vigo, con distinción máxima, y Biólogo Marino de la Universidad Austral de Chile. Cuenta con una destacada producción científica, con más de 90 publicaciones en revistas indexadas (SCI), consolidando una línea de investigación reconocida a nivel nacional e internacional en el estudio de la dinámica del fitoplancton tóxico y sus impactos en ecosistemas marinos. Ha liderado y participado en múltiples proyectos de investigación competitivos, destacando su rol como Investigador Principal en diversos proyectos FONDECYT, así como su participación como co-investigador en iniciativas vigentes orientadas a comprender fenómenos como mareas rojas, desoxigenación y efectos del cambio climático en sistemas costeros. Su trabajo combina observaciones de campo, análisis de alta resolución y modelación, contribuyendo al desarrollo de herramientas para la gestión ambiental y la sustentabilidad de la acuicultura. En su quehacer académico y científico, el Dr. Díaz aporta activamente a la formación de capital humano avanzado y al fortalecimiento de redes de investigación interdisciplinarias, aportando en el estudio de ecosistemas marinos complejos y en la generación de conocimiento aplicado para la toma de decisiones.",
      en: "Dr. Patricio A. Díaz is a researcher and faculty member at the Universidad de Los Lagos, where he is affiliated with the i~mar Center. His scientific career has focused on the study of Harmful Algal Blooms (HABs), coastal oceanography, and Patagonian fjord systems, addressing environmental, productive, and public health issues of major significance. He holds a Ph.D. in Oceanography from the University of Vigo, awarded with highest distinction, and a degree in Marine Biology from the Universidad Austral de Chile. He has an outstanding scientific record, with more than 90 publications in SCI-indexed journals, establishing a nationally and internationally recognized research program on the dynamics of toxic phytoplankton and their impacts on marine ecosystems. Dr. Díaz has led and participated in numerous competitive research projects, including serving as Principal Investigator on several FONDECYT projects and as Co-Investigator in ongoing initiatives aimed at understanding phenomena such as harmful algal blooms, deoxygenation, and the effects of climate change on coastal systems. His work integrates field observations, high-resolution analyses, and modeling approaches, contributing to the development of tools for environmental management and the sustainable development of aquaculture. Through his academic and scientific activities, Dr. Díaz actively contributes to the training of advanced human capital and the strengthening of interdisciplinary research networks, advancing the study of complex marine ecosystems and generating applied knowledge to support evidence-based decision-making.",
    },
    degrees: {
      es: [
        "2007 Biólogo Marino, Universidad Austral de Chile",
        "2012 Máster en Oceanografía, Universidad de Vigo, España",
        "2015 Doctor en Oceanografía, Universidad de Vigo, España",
      ],
      en: [
        "2015 Ph.D. in Oceanography, University of Vigo, Spain",
        "2012 M.Sc. in Oceanography, University of Vigo, Spain",
        "2007 Marine Biologist, Universidad Austral de Chile, Chile",
      ],
    },
    projects: {
      es: [
        "FONDECYT 1262020 A microscale approach to explore the role of species traits and interactions during superimposed lipophilic toxin events in a Patagonian fjord. Investigador responsable (2026-2030)",
        "FONDECYT 1251038 On the influence of local and remote oceanographic processes on deoxygenation, hypoxia, and anoxia in Patagonian fjords. Co-investigador (2025-2029)",
        "FONDECYT 1240184 Benthic dinoflagellates and marine toxins: a new threat for human health and socioeconomic activities in Rapa Nui. Co-investigador (2024-2028).",
        "FONDECYT 1231220 Environmental control of Dinophysis bloom development and their contribution to lipophilic toxin events in the Chilean Patagonia. Investigador principal (2023-2026)",
        "REDES170101 Establishment of a Cooperation Network for the Harmful Microalgae. Investigador principal (2017-2019)",
        "FONDECYT 11170682 Physical-biological interactions in populations of lipophilic toxic-producers from Southern Chile. Investigador principal (2017-2020)",
        "FONDECYT 1170507 Spatial and bathymetric dynamics of Lithodes santolla (Decapoda, Lithodidae) (Molina 1782) in channels of southern Chile: Basis for fishery management. Co-investigador (2017-2020)",
      ],
      en: [
        "FONDECYT 1262020 A Microscale Approach to Explore the Role of Species Traits and Interactions During Superimposed Lipophilic Toxin Events in a Patagonian Fjord. Principal Investigator (2026-2030).",
        "FONDECYT 1251038 On the Influence of Local and Remote Oceanographic Processes on Deoxygenation, Hypoxia, and Anoxia in Patagonian Fjords. Co-Investigator (2025-2029).",
        "FONDECYT 1240184 Benthic Dinoflagellates and Marine Toxins: A New Threat to Human Health and Socioeconomic Activities on Rapa Nui. Co-Investigator (2024-2028).",
        "FONDECYT 1231220 Environmental Control of Dinophysis Bloom Development and Their Contribution to Lipophilic Toxin Events in Chilean Patagonia. Principal Investigator (2023-2026).",
        "REDES170101 Establishment of a Cooperation Network for Harmful Microalgae. Principal Investigator (2017-2019).",
        "FONDECYT 11170682 Physical-Biological Interactions in Populations of Lipophilic Toxin Producers from Southern Chile. Principal Investigator (2017-2020).",
        "FONDECYT 1170507 Spatial and Bathymetric Dynamics of Lithodes santolla (Decapoda, Lithodidae) (Molina, 1782) in the Channels of Southern Chile: Foundations for Fisheries Management. Co-Investigator (2017-2020).",
      ],
    },
  },
  {
    slug: "juan-estrada",
    line: "interacciones-sustentables",
    name: "Dr. Juan Manuel Estrada Arias",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "mestrada@unab.cl",
    links: {},
    bio: {
      es: "Biólogo Marino de la Universidad de Valparaíso (UV) y Doctor en Biotecnología de la Universidad Andrés Bello (UNAB). Con perfeccionamiento en la alimentación y nutrición de larvas de peces marinos en el Feeds & Food National Research Center (FFNRC) de la Pukyong National University (2003) y en el cultivo de dietas vivas en la Gangneum Gonju National University (2013). Entre 1996 y 2000 trabajó en el Departamento de Recursos Marinos de Fundación Chile en el desarrollo y optimización de tecnologías para el cultivo de abalón rojo, turbot y lenguado fino.\n\nEl año 2000 se incorporó al Centro de Investigación Marina Quintay (CIMARQ) de la UNAB, logrando cerrar el ciclo de cultivo para congrio colorado y negro y optimizar la tecnología para la producción masiva de semillas de erizo rojo y los protocolos para su repoblamiento e incremento de su rendimiento, mediante su acondicionamiento gonadal y desarrollo de unidades de acopio multiespecíficas en flujo abierto y recirculación (RSA).\n\nEl Dr. Estrada ha participado en 30 proyectos y ha publicado ocho manuales de cultivo para el congrio colorado, erizo rojo y lenguado fino y dos solicitudes de patente de invención en Chile y el extranjero (WIPO), obteniendo patente de la Dirección de Propiedad Intelectual del Ministerio de Economía (2019). También desarrolló tecnología para el transporte vivo de langosta y otros crustáceos, que fue destacada el 2010 dentro de las 50 invenciones innovadoras en servicios Chile Exporta por la Fundación País Digital, la Cámara de Comercio de Santiago y el BID.\n\nEl Dr. Estrada es Profesor Asociado de la Facultad de Ciencias de la Vida de la UNAB y docente de las carreras de Biología Marina, Ingeniería en Acuicultura, Ingeniería en Biotecnología y Medicina Veterinaria. Ha dirigido más de 50 tesis de Ingeniería en Acuicultura, Ingeniería en Biotecnología, Biología Marina y Medicina Veterinaria. Integra también el claustro del Magister en Recursos Naturales de la UNAB y colabora con el Doctorado de Medicina de la Conservación.\n\nEs director de Ingeniería en Acuicultura y de CIMARQ. Integra el Comité de Bioética de la Facultad de Ciencias del Vida de la UNAB, el Comité Editorial de Revista del Instituto de Investigación y Desarrollo Pesquero (INIDEP) en Argentina, el Grupo de Acuicultura del Comité Oceanográfico Nacional (CONA) y la Red Iberoamericana de Equinodermos. Del 2019 al 2023 integró el Consejo del Fondo de Investigación Pesquera y de Acuicultura (FIPA) de la SUBPESCA.\n\nEl Dr. Estrada es socio de la Sociedad Chilena de Acuicultura, la World Aquaculture Society (WAS) y de la Red FAO de Acuicultura y ha presentado ponencias en Cuba, Ecuador, Perú y Uruguay. Entre el 2023 y 2025 dirigió el Programa BIP 40046478. \"Transferencia Desarrollo Productivo y Gestión Sustentable de la Pesca Artesanal, mediante Repoblamiento y APERV\" del Gobierno Regional de Valparaíso; Programa que el 2024 recibió el Premio Innovación en Sustentabilidad Categoría Planeta otorgado por la Red Campus Sustentable, Red Universia y Red de Universidades Estatales. Actualmente es investigador adjunto en el Proyecto CIA-INCAR².",
      en: "Marine Biologist from the University of Valparaíso (UV) and Ph.D. in Biotechnology from Andrés Bello University (UNAB). He has received advanced training in the feeding and nutrition of marine fish larvae at the Feeds & Food National Research Center (FFNRC) of Pukyong National University (2003), and in live feed cultivation at Gangneung-Wonju National University (2013). Between 1996 and 2000, he worked in the Marine Resources Department of Fundación Chile on the development and optimization of technologies for the culture of red abalone, turbot, and fine flounder.\n\nIn 2000, he joined the Quintay Marine Research Center (CIMARQ) at UNAB, where he successfully closed the life cycle of red and black cusk eel and optimized technologies for the mass production of red sea urchin seed, as well as protocols for its restocking and yield enhancement through gonadal conditioning and the development of multi-species holding systems under open-flow and recirculating aquaculture systems (RAS).\n\nDr. Estrada has participated in 30 projects and has published eight culture manuals for red cusk eel, red sea urchin, and fine flounder, as well as two patent applications in Chile and internationally (WIPO), obtaining a patent from the Intellectual Property Department of the Ministry of Economy (2019). He also developed technology for the live transport of lobsters and other crustaceans, which in 2010 was recognized among the 50 most innovative service inventions in Chile Exporta by Fundación País Digital, the Santiago Chamber of Commerce, and the Inter-American Development Bank (IDB).\n\nDr. Estrada is an Associate Professor in the Faculty of Life Sciences at UNAB and teaches in the programs of Marine Biology, Aquaculture Engineering, Biotechnology Engineering, and Veterinary Medicine. He has supervised more than 50 theses in Aquaculture Engineering, Biotechnology Engineering, Marine Biology, and Veterinary Medicine. He is also a member of the Master’s Program in Natural Resources at UNAB and collaborates with the Ph.D. in Conservation Medicine.\n\nHe currently serves as Director of the Aquaculture Engineering program and of CIMARQ. He is a member of the Bioethics Committee of the Faculty of Life Sciences at UNAB, the Editorial Committee of the Journal of the National Institute for Fisheries Research and Development (INIDEP) in Argentina, the Aquaculture Group of the National Oceanographic Committee (CONA), and the Ibero-American Echinoderm Network. From 2019 to 2023, he was a member of the Fisheries and Aquaculture Research Fund (FIPA) Council of the Undersecretariat for Fisheries and Aquaculture (SUBPESCA).\n\nDr. Estrada is a member of the Chilean Aquaculture Society, the World Aquaculture Society (WAS), and the FAO Aquaculture Network, and has presented at conferences in Cuba, Ecuador, Peru, and Uruguay. Between 2023 and 2025, he directed the program BIP 40046478, “Transfer for Productive Development and Sustainable Management of Artisanal Fisheries through Restocking and APERV” of the Regional Government of Valparaíso. In 2024, this program received the Sustainability Innovation Award in the Planet category, granted by the Sustainable Campus Network, Universia Network, and the State Universities Network. He is currently an adjunct researcher in the CIA-INCAR².",
    },
    degrees: {
      es: [
        "2015. Doctor en Biotecnología. Universidad Andrés Bello.",
        "1994. Biólogo Marino. Universidad de Valparaíso.",
        "1994. Licenciado en Biología Marina. Universidad de Valparaíso.",
      ],
      en: [
        "2015. Ph.D. in Biotechnology, Andrés Bello University.",
        "1994. Marine Biologist, University of Valparaíso.",
        "1994. Bachelor’s Degree in Marine Biology, University of Valparaíso.",
      ],
    },
    projects: {
      es: [],
      en: [
        "2025 – Present. Adjunct Researcher, FONDAP INCAR² – Interdisciplinary Center for Aquaculture Research.",
        "2023 – 2025. Program Director, BIP 40046478. “Transfer for Productive Development and Sustainable Management of Artisanal Fisheries through Restocking and APERV.” Regional Government of Valparaíso.",
        "2022 – 2024. Researcher, FIPA Project No. 2022-13. Fisheries Biological Monitoring Program of Fisheries and Associated Ecosystems of Rapa Nui Island.",
        "2021 – 2023. Principal Investigator, CORFO Innova Project. Intensive system for the conditioning and maintenance of live marine products. Code: 21CYCV 189027.",
        "2021. Principal Investigator, CORFO Innova Project. Development of a technological unit for conditioning wild specimens of red sea urchin (Loxechinus albus). Code: 20SNV–1437994.",
        "2019 – 2022. Project Director, Proof of Concept (PdC 2019–5). Development of an intensive grow-out unit for land-based culture of red sea urchin (Loxechinus albus). Technology Transfer Office, UNAB.",
        "2017 – 2019. Project Director, Innovation for Competitiveness Fund (FIC-R 2016). Social and technological innovation to promote small-scale aquaculture in rural coves.",
        "2015 – 2016. Researcher, Technical Cooperation Project. Design of the CENIDMAR Mariculture Center in Costa Dorada, Mar del Plata. National Institute for Fisheries Research and Development (INIDEP), Argentina.",
        "2015 – 2016. Project Director. “The Sea in Your Neighborhood: Marine Invertebrates of the Valparaíso Region.” Academic Extension Directorate, Andrés Bello University.",
        "2013 – 2014. Researcher. Development and evaluation of technologies for the productive diversification of gastropods in Management and Exploitation Areas for Benthic Resources (AMERB) in Quintay. Artisanal Fisheries Development Fund (FAP), SUBPESCA.",
        "2013 – 2014. Project Director, CORFO Innova 13IDL1-18378. Development of technologies for copepod production.",
        "2012. Principal Investigator. Design of new trap models and artificial bait for sustainable lobster fishing. Project: “Sustainable Fishery of the Easter Island lobster (Panulirus pascuensis).” Innovation for Competitiveness Fund (FIC), Regional Government of Valparaíso.",
        "2012. Co-Investigator, Project DI-48-11/R. Study of the genetic diversity of wild and captive populations of red, golden, and black cusk eel using microsatellite molecular markers. Research Directorate, UNAB.",
        "2011. Principal Investigator. Development of biological bases for the larval culture of cabrilla (Sebastes oculatus) at experimental scale. Fundación Minera Los Pelambres & UNAB.",
        "2010 – 2012. Co-Investigator. Outreach and transfer program for restocking red sea urchin (Loxechinus albus) in management areas in southern Coquimbo Region. CORFO & Fundación Minera Los Pelambres.",
      ],
    },
  },
  {
    slug: "pedro-murua",
    line: "interacciones-sustentables",
    name: "Dr. Pedro Murúa",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "pedro.murua@uach.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/pedro-murúa-225a662b",
      orcid: "https://orcid.org/0000-0002-1598-7261",
    },
    bio: {
      es: "Pedro es ingeniero acuícola de la Universidad Austral de Chile (UACh) y doctor en Ciencias Biológicas de la Universidad de Aberdeen, Reino Unido, reformado en la investigación de patologías de algas. El utiliza aproximaciones de microscopía, farmacológicas, genéticas y de cultivo, para diagnosticar nuevas enfermedades de algas y describir nuevos mecanismos de defensa en macroalgas rojas y pardas.\n\nSus intereses se centran en diferentes aspectos de la biología de algas, dirigidos a entender interacciones alga-patógeno: descripción de patógenos nuevos, incluyendo ciclos de vida, estrategias de diseminación e infección, nutrición y desarrollo; aspectos epidemiológicos de poblaciones de algas pardas e inmunidad de algas y mecanismos de muerte celular programada y autofagia.\n\nAdicionalmente, y a través del Laboratorio de Macroalgas de la Sede Puerto Montt de la UACh, pilotea tecnología de cultivo de algas pardas y rojas de interés comercial. También intenta desarrollar y evaluar el manejo y repoblamiento de estas especies en las praderas naturales, para garantizar la sustentabilidad medioambiental en el tiempo.",
      en: "Pedro is an aquaculture engineer from the Austral University of Chile (UACh) and holds a Ph.D. in Biological Sciences from the University of Aberdeen, United Kingdom, with a focus on research in algal pathologies. He uses microscopy, pharmacological, genetic, and culture-based approaches to diagnose new algal diseases and to describe novel defense mechanisms in red and brown macroalgae.\n\nHis interests focus on different aspects of algal biology, aimed at understanding algae–pathogen interactions, including the description of new pathogens (their life cycles, dissemination and infection strategies, nutrition, and development), epidemiological aspects of brown algal populations, and algal immunity, including mechanisms of programmed cell death and autophagy.\n\nAdditionally, through the Macroalgae Laboratory at the Puerto Montt campus of UACh, he pilots cultivation technologies for commercially important brown and red macroalgae. He also seeks to develop and evaluate management and restocking strategies for these species in natural beds, in order to ensure long-term environmental sustainability.",
    },
    degrees: {
      es: [
        "2018. Doctorado en Ciencias Biológicas, University of Aberdeen. Reino Unido.",
        "2010. Ingeniero en Acuicultura, Universidad Austral de Chile. Chile, 2010.",
        "2009. Ciencias de la Acuicultura, Universidad Austral de Chile. Chile, 2009.",
      ],
      en: [
        "2018. Ph.D. in Biological Sciences, University of Aberdeen, United Kingdom.",
        "2010. Aquaculture Engineer, Austral University of Chile, Chile.",
        "2009. Degree in Aquaculture Sciences, Austral University of Chile, Chile.",
      ],
    },
    projects: {
      es: [
        "Fondecyt iniciacion 11230059. HADES: Host-pAthogen Dynamics and Ecology in Seaweeds, using Maullinia gall disease of wild \"cochayuyo\". Investigador principal.",
        "2024 – 2028: Núcleo Milenio MASH “Marine Agronomy of Seaweed Holobionts”. Investigador principal.",
        "2023-2024: FAO. “ACUIALGAS - Estado y perspectivas del cultivo de macroalgas en América Latina”. Investigador principal.",
        "2022-2024: Safe Seaweed Coalition fund. “BASILISK - Characterization and bioBAnking of economically-relevant pestS and pathogens of pelillo (Agarophyton chilensis), for biosecurIty riSK management tool development”. Investigador principal.",
        "2021-2023: INACh RT_42-20 “TROY: Tracking key eukaryote pathobiome members in AntaRctic coastal communities, with emphasis on OomYcete parasites”. Investigador principal.",
        "2020-2021: GlobalseaweedSTAR fund GSS/RF/019 “algaBLISTER”: A coLlaborative network for traininG and cApacity Building in aLgal dIseases in LaTin AmERica. Investigador principal.",
      ],
      en: [
        "FONDECYT Initiation 11230059. HADES: Host-Pathogen Dynamics and Ecology in Seaweeds, using Maullinia gall disease in wild “cochayuyo”. Principal Investigator.",
        "2024–2028. Millennium Nucleus MASH. “Marine Agronomy of Seaweed Holobionts.” Principal Investigator.",
        "2023–2024. FAO. “ACUIALGAS – Status and perspectives of macroalgae cultivation in Latin America.” Principal Investigator.",
        "2022–2024. Safe Seaweed Coalition Fund. “BASILISK – Characterization and bioBanking of economically relevant pests and pathogens of pelillo (Agarophyton chilensis), for biosecurity risk management tool development.” Principal Investigator.",
        "2021–2023. INACh RT_42-20. “TROY: Tracking key eukaryote pathobiome members in Antarctic coastal communities, with emphasis on oomycete parasites.” Principal Investigator.",
        "2020–2021. GlobalSeaweedSTAR Fund GSS/RF/019. “algaBLISTER: A collaborative network for training and capacity building in algal diseases in Latin America.” Principal Investigator.",
      ],
    },
  },
  {
    slug: "manuel-diaz",
    line: "interacciones-sustentables",
    name: "Manuel Díaz Gómez",
    role: { es: "Asistente de Investigación", en: "Assistant Researcher" },
    email: "manueldiaz@uach.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/manuel-diaz-05560224/",
      researchgate: "https://www.researchgate.net/profile/Manuel-Diaz-30",
    },
    bio: {
      es: "Manuel Díaz Gómez es Ingeniero Naval de la Universidad Austral de Chile e investigador del Programa de Investigación Pesquera de la Universidad Austral de Chile (UACh) Sede Puerto Montt.\n\nEs parte del Programa de Investigación Pesquera desde hace ya más de 15 años, y se dedica a investigar, coordinar proyectos y administrar la embarcación científica Dr. Jurguen Winter.\n\nSus principales áreas de trabajo son los Sistemas de Información Geográfica y el Desarrollo de Equipamiento Científico.\n\nHa participado como investigador en distintos Proyectos FIPA, FONDECYT y FONDAP INCAR.",
      en: "Manuel Díaz Gómez is a Naval Engineer from the Austral University of Chile and a researcher at the Fisheries Research Program of the Austral University of Chile (UACh), Puerto Montt Campus.\n\nHe has been a member of the Fisheries Research Program for more than 15 years, where he conducts research, coordinates projects, and manages the scientific research vessel Dr. Jurguen Winter.\n\nHis main areas of expertise include Geographic Information Systems (GIS) and Scientific Equipment Development. He has participated as a researcher in several projects funded by FIPA, FONDECYT, and the INCAR FONDAP Center.",
    },
    degrees: { es: [], en: [] },
    projects: {
      es: [
        "Proyecto FIPA 2025-06 “Determinación de los niveles de concentración y especiación química de arsénico orgánico e inorgánico en moluscos bivalvos y macroalgas de importancia comercial para consumo humano”",
      ],
      en: [
        "FIPA Project 2025-06: Determination of concentration levels and chemical speciation of organic and inorganic arsenic in commercially important bivalve mollusks and macroalgae intended for human consumption.",
      ],
    },
  },
  {
    slug: "katherine-espinoza",
    line: "interacciones-sustentables",
    name: "Katherine Espinoza Cea",
    role: { es: "Asistente de Investigación", en: "Assistant Researcher" },
    email: "katherine.espinoza@uach.cl",
    links: {
      researchgate: "https://www.researchgate.net/profile/Katherine-Cea",
    },
    bio: {
      es: "Katherine Espinoza Cea es Ingeniera en Acuicultura de la Universidad Austral de Chile e investigadora, coordinadora y analista del Programa de Investigación Pesquera de la Universidad Austral de Chile (UACh) Sede Puerto Montt.\n\nEs parte de dicho equipo desde el año 2013 y sus labores van desde la investigación en terreno, pasando por el análisis de imágenes y la coordinación de proyectos.\n\nSus principales áreas de trabajos son la investigación en la Biodiversidad Marina Bentónica.\n\nHa participado como investigador en distintos Proyectos FIPA, FONDECYT y FONDAP INCAR.",
      en: "Katherine Espinoza Cea is an Aquaculture Engineer from the Austral University of Chile and serves as a researcher, coordinator, and analyst at the Fisheries Research Program of the Austral University of Chile (UACh), Puerto Montt Campus.\n\nShe has been a member of the program since 2013, carrying out a wide range of activities that include field research, image analysis, and project coordination.\n\nHer primary area of expertise is benthic marine biodiversity research. She has participated as a researcher in several projects funded by FIPA, FONDECYT, and the INCAR FONDAP Center.",
    },
    degrees: { es: [], en: [] },
    projects: {
      es: [
        "“Red de Estaciones Fijas recursos erizo, luga y almeja regiones de Los Lagos y Aysén”.",
      ],
      en: [
        "Fixed Stations Network for Sea Urchin, Luga Seaweed, and Clam Resources in the Los Lagos and Aysén Regions.",
      ],
    },
  },
  {
    slug: "thamara-matamala",
    line: "interacciones-sustentables",
    name: "Thamara Matamala Asencio",
    role: { es: "Asistente de Investigación", en: "Research Assistant" },
    email: "thamara.matamala@uach.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/thamara-matamala-517408156/",
      researchgate: "https://www.researchgate.net/profile/Thamara-Matamala",
    },
    bio: {
      es: "Thamara Matamala Asencio es bióloga marina de la Universidad Austral de Chile e investigadora principal del Programa de Investigación Pesquera de la Universidad Austral de Chile (UACh) Sede Puerto Montt.\n\nHace 12 años llegó a este último programa para investigar, coordinar proyectos y navegar sobre la embarcación científica Dr. Jurguen Winter.\n\nSus principales áreas de investigación son la Biodiversidad Marina Bentónica, la Divulgación Científica y la Gestión Socio-ambiental.\n\nHa participado como coordinadora e investigadora en distintos Proyectos FIPA, FONDECYT y FONDAP INCAR.",
      en: "Thamara Matamala Asencio is a Marine Biologist from the Austral University of Chile and Principal Researcher at the Fisheries Research Program of the Austral University of Chile (UACh), Puerto Montt Campus.\n\nShe joined the program 12 years ago, where she has conducted research, coordinated projects, and participated in scientific expeditions aboard the research vessel Dr. Jurguen Winter.\n\nHer main research interests include benthic marine biodiversity, science communication, and socio-environmental management. She has participated as both a coordinator and researcher in several projects funded by FIPA, FONDECYT, and the INCAR FONDAP Center.",
    },
    degrees: { es: [], en: [] },
    projects: {
      es: [
        "Proyecto FIPA 2025-04: “Prospección de sitios de acuicultura de pequeña escala en espacios costeros marinos de los pueblos originarios en la Región de Los Lagos.",
        "“Red de Estaciones Fijas recursos erizo, luga y almeja regiones de Los Lagos y Aysén”",
        "Proyecto FIPA 2025-08: “Restauración ecológica como solución basada en la naturaleza para mejorar la resiliencia de ecosistemas bentónicos marino costeros al cambio climático",
      ],
      en: [
        "FIPA Project 2025-04: Assessment of small-scale aquaculture sites within Indigenous Peoples' Marine Coastal Areas (ECMPOs) in the Los Lagos Region.",
        "Fixed Stations Network for Sea Urchin, Luga Seaweed, and Clam Resources in the Los Lagos and Aysén Regions.",
        "FIPA Project 2025-08: Ecological restoration as a nature-based solution to enhance the resilience of coastal marine benthic ecosystems to climate change.",
      ],
    },
  },
  {
    slug: "carlos-chavez",
    line: "impactos-socioeconomicos",
    name: "Dr. Carlos Chávez Rebolledo",
    role: { es: "Investigador Principal", en: "Principal Investigator" },
    email: "cchavez@utalca.cl",
    links: {
      orcid: "https://orcid.org/0000-0002-6045-2282",
      scholar: "https://scholar.google.com/citations?user=WxEW6EwAAAAJ&hl=en",
    },
    bio: {
      es: "El Dr. Carlos Chávez es Profesor Titular de la Facultad de Economía y Negocios, Universidad de Talca, investigador principal (principal researcher) del Centro Interdisciplinario para la Investigación Acuícola-Investigación Aplicada (INCAR²)-CIA-ANID, investigador asociado al Núcleo de Investigación en Economía Ambiental y Recursos Naturales-NENRE-EfD-Chile, y colabora como Co-Editor de la revista Environment and Development Economics y Editor Asociado de la revista Aquaculture Economics and Management.\n\nChávez ha escrito extensamente sobre diseño y evaluación de políticas ambientales y de manejo de recursos naturales. Los resultados de su investigación han sido publicados en revistas científicas que incluyen, entre otras, Journal of Environmental Economics and Management, Nature Sustainability, Nature Communications, Environmental and Resource Economics, Marine Resource Economics, Journal of Regulatory Economics, Environment and Development Economics, Journal of Environmental Management, Marine Policy, y Reviews in Aquaculture.",
      en: "Dr. Carlos Chávez is a Full Professor at the Faculty of Economics and Business, Universidad de Talca, Principal Researcher at the Interdisciplinary Center for Aquaculture Research – Applied Research (INCAR²) – CIA-ANID, an Associate Researcher at the Environmental and Natural Resource Economics Research Nucleus (NENRE-EfD-Chile), and serves as Co-Editor of the journal Environment and Development Economics and Associate Editor of Aquaculture Economics and Management.\n\nChávez has written extensively on the design and evaluation of environmental and natural resource management policies. His research findings have been published in leading scientific journals, including Journal of Environmental Economics and Management, Nature Sustainability, Nature Communications, Environmental and Resource Economics, Marine Resource Economics, Journal of Regulatory Economics, Environment and Development Economics, Journal of Environmental Management, Marine Policy, and Reviews in Aquaculture, among others.",
    },
    degrees: {
      es: [
        "2000. Doctor of Philosophy (Ph. D.) in Resource Economics, University of Massachusetts, EE.UU.",
        "1992. Master of Arts in Economics, Georgetown University, EE.UU.",
        "1989. Ingeniero Comercial, Licenciado en Ciencias Económicas, Universidad de Concepción, Chile.",
      ],
      en: [
        "2000. Doctor of Philosophy (Ph.D.) in Resource Economics, University of Massachusetts, USA.",
        "1992. Master of Arts in Economics, Georgetown University, USA.",
        "1989. Commercial Engineer, Bachelor’s Degree in Economic Sciences, Universidad de Concepción, Chile.",
      ],
    },
    projects: {
      es: [
        "“Reducing aquaculture externalities through behavioral instruments: A cross-country study”. Co-Investigador. Environment for Development (EfD) Initiative-Blue Resources for Development (BlueRforD) Collaborative Program; periodo ejecución 2026-2027.",
        "“The Endogenous Formation of Common Pool Resource Coalitions under Uncertainty and Exclusion”. Investigador Responsable. Fondecyt Regular 1230266, periodo de ejecución 2023-2027.",
        "“An Aquaculture Adaptation Framework (Aqua-Adapt) to assess strategies for adapting aquaculture to climate change.” Co-Investigador. Investigadoras Principales, Doris Soto y Fernanda Garcia Sampaio. Aquaculture Adaptation Framework for Climate Change (Aqua-Adapt): A tool to support the development and implementation of strategies to improve aquaculture’s resilience to climate change. FAO Fisheries and Aquaculture Technical Papers 739. Rome, FAO. https://doi.org/10.4060/cd6476en",
        "“Assessing Global Aquaculture Production Systems”. Co-Investigador. Environment for Development (EfD) Initiative-MS-1205; period de ejecución 2022-2024.",
      ],
      en: [
        "“Reducing aquaculture externalities through behavioral instruments: A cross-country study.” Co-Investigator. Environment for Development (EfD) Initiative – Blue Resources for Development (BlueRforD) Collaborative Program; implementation period 2026–2027.",
        "“The Endogenous Formation of Common Pool Resource Coalitions under Uncertainty and Exclusion.” Principal Investigator. Fondecyt Regular 1230266; implementation period 2023–2027.",
        "“An Aquaculture Adaptation Framework (Aqua-Adapt) to assess strategies for adapting aquaculture to climate change.” Co-Investigator. Principal Investigators: Doris Soto and Fernanda Garcia Sampaio. Published as FAO Fisheries and Aquaculture Technical Paper No. 739. Rome, FAO. https://doi.org/10.4060/cd6476en",
        "“Assessing Global Aquaculture Production Systems.” Co-Investigator. Environment for Development (EfD) Initiative – MS-1205; implementation period 2022–2024.",
      ],
    },
  },
  {
    slug: "marjorie-baquedano",
    line: "impactos-socioeconomicos",
    name: "Dra. Marjorie Baquedano",
    role: { es: "Investigadora Adjunta", en: "Adjunct Researcher" },
    email: "mbaquedano@ubiobio.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/marjorie-baquedano-rodr%C3%ADguez-246b6836a/",
      orcid: "https://orcid.org/0000-0001-6301-4141",
      researchgate: "https://www.researchgate.net/profile/Marjorie-Baquedano-Rodriguez",
      scholar: "https://scholar.google.com/citations?user=HY0kqFEAAAAJ&hl=en",
    },
    bio: {
      es: "Marjorie Baquedano es académica de la Universidad del Bío-Bío e investigadora adjunta del Centro INCAR. Doctora en Sociología por la Universidad de Sheffield, centra su investigación en el análisis socioeconómico de la acuicultura de pequeña escala, con enfoque interseccional y metodologías cuantitativas y cualitativas. Ha trabajado con comunidades costeras en estudios sobre desigualdades y vulnerabilidades territoriales. Ha colaborado en proyectos financiados por ANID, OCDE, SUBPESCA y FAO y sus publicaciones aparecen en revistas como Reviews in Aquaculture, Marine Policy y BMC Public Health.",
      en: "Marjorie Baquedano is a faculty member at the University of Bío-Bío and an Associate Researcher at the INCAR Center. She holds a Ph.D. in Sociology from the University of Sheffield, and her research focuses on the socioeconomic analysis of small-scale aquaculture, using an intersectional approach and both quantitative and qualitative methodologies. She has worked extensively with coastal communities on issues related to social inequalities and territorial vulnerabilities. She has participated in projects funded by ANID, the OECD, SUBPESCA, and FAO, and her work has been published in journals such as Reviews in Aquaculture , Marine Policy , and BMC Public Health .",
    },
    degrees: {
      es: [
        "Socióloga, Universidad de Concepción, Chile Magister en Investigación Social y Desarrollo, Universidad de Concepción, Chile. Ph.D. in Sociology and Research Methods, University of Sheffield, United Kingdom.",
      ],
      en: [
        "Ph.D. in Sociology and Research Methods , University of Sheffield, United Kingdom.",
        "M.Sc. in Social Research and Development , University of Concepción, Chile.",
        "Sociologist , University of Concepción, Chile.",
      ],
    },
    projects: {
      es: [
        "Evaluación socioeconómica del proyecto de gobernanza Marino-Costera GEF/CHI/043, 2026, Asistencia técnica, consultora. Synergies between small-scale a aquaculture and artisanal fisheries in Chile: opportunities and challenges, Proyecto Regular Interno Universidad del Bio- Bio RE2463401, 2024-2026, investigadora responsable.",
      ],
      en: [
        "2026 Socioeconomic Evaluation of the Marine-Coastal Governance Project GEF/CHI/043. Technical Assistance Project. Consultant .",
        "2024-2026 Synergies between Small-Scale Aquaculture and Artisanal Fisheries in Chile: Opportunities and Challenges. Internal Research Project RE2463401, University of Bío-Bío. Principal Investigator .",
      ],
    },
  },
  {
    slug: "jorge-dresdner",
    line: "impactos-socioeconomicos",
    name: "Dr. Jorge Dresdner Cid",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "jdresdne@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/jorge-dresdner-35020219/",
      orcid: "https://orcid.org/0000-0002-8371-4628",
      researchgate: "https://www.researchgate.net/profile/Jorge-Dresdner",
      scholar: "https://scholar.google.com/citations?user=4lpNa28AAAAJ&hl=en",
    },
    bio: {
      es: "El Dr. Jorge Dresdner Cid es Licenciado en Ciencias Sociales (1977), y Master (1983) y Doctor en Filosofía en Economía de la Universidad de Uppsala, Suecia (1989). Actualmente es Profesor Titular del Departamento de Economía de la Universidad de Concepción, Chile; Investigador asociado de la línea “Socioeconomic Impacts, Governance, and Market Dynamics.” del Centro Interdisciplinario para la Investigación Acuícola – Investigación Aplicada, centro de excelencia CIA/ANID; Investigador senior de la red internacional Environment for Development. Editor Asociado de la revista Marine Resource Economics, revista internacional especializada en investigación marina desde la disciplina de la economía. Sus áreas de investigación son Economía Pesquera y Acuícola, y Economía Laboral. Ha trabajado sobre temas como los impactos socioeconómicos de la acuicultura en regiones costeras apartadas en Chile, el impacto de los tratamientos de Caligus sobre los costos de producción de salmones, efecto de la crisis del ISA sobre la determinación de los precios internacionales de salmones, el comportamiento económico de los recolectores de semillas de choritos, entre otros. Actualmente trabaja en un proyecto sobre uso de antibióticos en la salmonicultura en Chile.",
      en: "Dr. Jorge Dresdner Cid holds a Bachelor's degree in Social Sciences (1977), a Master's degree in Economics (1983), and a Ph.D. in Economics (1989) from Uppsala University, Sweden. He is currently a Full Professor in the Department of Economics at the University of Concepción, Chile; an Associate Researcher in the Socioeconomic Impacts, Governance, and Market Dynamics research line of the Interdisciplinary Center for Aquaculture Research, Applied Research Division (CIA/ANID Center of Excellence); and a Senior Researcher in the international Environment for Development (EfD) network. He also serves as Associate Editor of Marine Resource Economics , a leading international journal specializing in marine resource research from an economic perspective. His research focuses on fisheries and aquaculture economics, as well as labor economics. He has worked on topics including the socioeconomic impacts of aquaculture in remote coastal regions of Chile, the effects of sea lice ( Caligus ) treatments on salmon production costs, the impact of the Infectious Salmon Anemia (ISA) crisis on international salmon prices, and the economic behavior of mussel seed collectors, among others. He is currently involved in a research project examining antimicrobial use in the Chilean salmon farming industry.",
    },
    degrees: {
      es: [
        "1989 Doctor en Economía, Universidad de Uppsala, Suecia.",
        "1983 Master En Ciencias Sociales (Economía), Universidad de Uppsala, Suecia.",
        "1977 Licenciado (Filosofie Kandidat) en Ciencias Sociales, Universidad de Uppsala, Suecia.",
      ],
      en: [
        "1989 Ph.D. in Economics, Uppsala University, Sweden.",
        "1983 Master of Social Sciences (Economics), Uppsala University, Sweden.",
        "1977 Bachelor of Social Sciences ( Filosofie Kandidat ), Uppsala University, Sweden.",
      ],
    },
    projects: {
      es: [
        "2024-2028 Co-investigador. Project “Surveillance, alert and response system (SVAR) to reduce the use of antimicrobials in Chilean salmon farming”, Join project with Universidad de Chile, Universidad de O´Higgins, Sernapesca, funded by the International Centre For Antimicrobial Resistance Solutions (ICARS), Denmark.",
        "2022-2024 Co-Investigador. Project MS 1161, Environment for Development Initiative. Assessing global aquaculture production systems, Research Nucleus in Environmental and Natural Resource Economics NENRE, Facultad de Ciencias Económicas y Administrativas, Universidad de Concepción, Chile",
        "2021-2023 Co-Investigador. Market and social sustainability of aquaculture: Communities’ and consumers’ perceptions of the farmed seafood industry. Project MS 1161, Environment for Development, Assessing global aquaculture production systems, Research Nucleus in Environmental and Natural Resource Economics NENRE, Facultad de Ciencias Económicas y Administrativas, Universidad de Concepción, Chile. , Research Nucleus in Environmental and Natural Resource Economics NENRE, Facultad de Ciencias Económicas y Administrativas, Universidad de Concepción, Chile.",
        "2018-2021 Co-investigador. Policy Instruments for Sustainable Management of Fisheries and Aquaculture. Environment for Development project. Research Nucleus in Environmental and Natural Resource Economics NENRE, Facultad de Ciencias Económicas y Administrativas, Universidad de Concepción, Chile",
        "2018-2019 Investigador principal. Project: MS-368 Small scale aquaculture as a livelihood alternative with marine conservation benefits in coastal communities in Chile, Efd research project. Environment for Development, B. Research Nucleus in Environmental and Natural Resource Economics NENRE, Facultad de Ciencias Económicas y Administrativas, Universidad de Concepción, Chile",
        "2016 -2017 Investigador principal. Estimación de empleo asociado a la industria miticultora nacional. Fondo de Investigación Pesquera y de Acuicultura. FIPA",
        "2016-56. Departamento de Economía, Universidad de Concepción.",
        "2015 – 2016 Investigador principal. Evaluación socioeconómica del sector salmonicultor, en base a las nuevas exigencias de la Ley General de Pesca y Acuicultura. Fondo de Investigación Pesquera y de Acuicultura. FIPA",
        "2015-42. Departamento de Economía, Universidad de Concepción.",
        "2015 – 2016 Investigador alterno. Estimación del Empleo Indirecto Asociado a la Industria Pesquera Nacional. Subcontrato de proyecto Seguimiento Económico de la Industria Pesquera y Acuícola Nacional 2015, Instituto de Fomento Pesquero. Departamento de Economía, Universidad de Concepción.",
      ],
      en: [
        "2024-2028 Co-Investigator. Surveillance, Alert and Response System (SVAR) to Reduce the Use of Antimicrobials in Chilean Salmon Farming . Joint project with the University of Chile, Universidad de O'Higgins, and SERNAPESCA, funded by the International Centre for Antimicrobial Resistance Solutions (ICARS), Denmark .",
        "2022-2024 Co-Investigator. Assessing Global Aquaculture Production Systems (Project MS 1161), Environment for Development Initiative. Research Nucleus in Environmental and Natural Resource Economics (NENRE), Faculty of Economics and Administrative Sciences, University of Concepción, Chile.",
        "2021-2023 Co-Investigator. Market and Social Sustainability of Aquaculture: Communities’ and Consumers’ Perceptions of the Farmed Seafood Industry . Project MS 1161, Environment for Development Initiative. Research Nucleus in Environmental and Natural Resource Economics (NENRE), Faculty of Economics and Administrative Sciences, University of Concepción, Chile.",
        "2018-2021 Co-Investigator. Policy Instruments for Sustainable Management of Fisheries and Aquaculture . Environment for Development research project. Research Nucleus in Environmental and Natural Resource Economics (NENRE), Faculty of Economics and Administrative Sciences, University of Concepción, Chile.",
        "2018-2019 Principal Investigator. Small-Scale Aquaculture as a Livelihood Alternative with Marine Conservation Benefits in Coastal Communities in Chile (Project MS-368). Environment for Development research project. Research Nucleus in Environmental and Natural Resource Economics (NENRE), Faculty of Economics and Administrative Sciences, University of Concepción, Chile.",
        "2016-2017 Principal Investigator. Estimation of Employment Associated with the Chilean Mussel Farming Industry . Fisheries and Aquaculture Research Fund (FIPA",
        "2016-56). Department of Economics, University of Concepción, Chile.",
        "2015-2016 Principal Investigator. Socioeconomic Assessment of the Chilean Salmon Farming Sector Under the New Requirements of the General Fisheries and Aquaculture Law . Fisheries and Aquaculture Research Fund (FIPA",
        "2015-42). Department of Economics, University of Concepción, Chile.",
        "2015-2016 Alternate Investigator. Estimation of Indirect Employment Associated with the National Fisheries Industry . Subcontract under the project Economic Monitoring of the National Fisheries and Aquaculture Industry",
        "2015 , Fisheries Development Institute (IFOP). Department of Economics, University of Concepción, Chile.",
      ],
    },
  },
  {
    slug: "manuel-estay",
    line: "impactos-socioeconomicos",
    name: "Dr. Manuel Estay Montecinos",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "mestay@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/manuel-estay-montecinos-b7089649",
      orcid: "https://orcid.org/0000-0002-9870-5249",
    },
    bio: {
      es: "El Dr. Manuel Estay Montecinos es Profesor Asociado del Departamento de Economía en la Facultad de Ciencias Económicas y Administrativas de la Universidad de Concepción (UdeC), e Investigador del Centro Interdisciplinario para la Investigación Acuícola (INCAR²). Su investigación se centra en la economía de la acuicultura y la pesca, el diseño de políticas regulatorias ambientales basadas en incentivos económicos, y el análisis de mercados en industrias de recursos naturales. Entre sus contribuciones recientes destaca la publicación en The RAND Journal of Economics sobre las consecuencias de bienestar de las asociaciones gremiales en la industria salmonera chilena, así como trabajos en Resource and Energy Economics sobre políticas ambientales óptimas con decisiones de localización, y en Renewable & Sustainable Energy Reviews sobre la aceptabilidad social de fuentes de energía marina emergentes. Ha publicado también sobre empleo indirecto en la industria pesquera y acuícola, y sobre bioseguridad y rentabilidad en la salmonicultura. En 2023 recibió el premio Robert F. Lanzillotti Prize for the Best Paper in Antitrust Economics, otorgado en la International Industrial Organization Conference (IIOC), reconocimiento internacional a la excelencia en investigación aplicada. Como investigador principal, lideró el proyecto FONDECYT Iniciación N° 11230885 sobre alternativas regulatorias eficientes para la acuicultura chilena. Actualmente se desempeña como co-investigador en el proyecto internacional SVAR (2025–2028), financiado por el International Centre for Antimicrobial Resistance Solutions (ICARS), orientado al desarrollo de sistemas de vigilancia para reducir el uso de antimicrobianos en la salmonicultura.",
      en: "Dr. Manuel Estay Montecinos is an Associate Professor in the Department of Economics within the Faculty of Economics and Administrative Sciences at the University of Concepción (UdeC), and a researcher at the Interdisciplinary Center for Aquaculture Research (INCAR²). His research focuses on the economics of aquaculture and fisheries, the design of environmental regulatory policies based on economic incentives, and market analysis in natural resource industries. Among his recent contributions is a publication in The RAND Journal of Economics examining the welfare implications of trade associations in the Chilean salmon farming industry. He has also published in Resource and Energy Economics on optimal environmental policies under endogenous firm location decisions, and in Renewable & Sustainable Energy Reviews on the social acceptability of emerging marine energy technologies. His research further addresses indirect employment in the fisheries and aquaculture sectors, as well as biosecurity and profitability issues in salmon farming. In 2023, he received the Robert F. Lanzillotti Prize for the Best Paper in Antitrust Economics , awarded at the International Industrial Organization Conference (IIOC), in recognition of excellence in applied economic research. As Principal Investigator, he led FONDECYT Initiation Project No. 11230885 , focused on efficient regulatory alternatives for the Chilean aquaculture industry. He currently serves as Co-Investigator in the international SVAR Project (2025-2028) , funded by the International Centre for Antimicrobial Resistance Solutions (ICARS), which aims to develop surveillance systems to reduce antimicrobial use in Chilean salmon farming.",
    },
    degrees: {
      es: [
        "2021 Doctor of Philosophy (Ph.D.), Resource Economics, University of Massachusetts Amherst.",
        "2010 Magíster en Economía de Recursos Naturales y del Medio Ambiente, Universidad de Concepción.",
        "2003 Ingeniero Comercial, Universidad de Los Lagos.",
      ],
      en: [
        "2021 Doctor of Philosophy (Ph.D.) in Resource Economics, University of Massachusetts Amherst, USA.",
        "2010 M.Sc. in Natural Resource and Environmental Economics, University of Concepción, Chile.",
        "2003 Commercial Engineer, University of Los Lagos, Chile.",
      ],
    },
    projects: {
      es: [
        "SVAR (2025–2028): Surveillance, Alert and Response System to reduce the use of antimicrobials in Chilean salmon farming. Co-investigador. ICARS–SERNAPESCA. FONDECYT Iniciación N° 11230885 (2023–2026): Efficient regulatory options for industries with spatially differentiated pollution, endogenous location, and an endogenous number of firms. An empirical study of regulatory alternatives for the Chilean salmon aquaculture. Investigador Principal.",
      ],
      en: [
        "SVAR (2025-2028) : Surveillance, Alert and Response System to Reduce the Use of Antimicrobials in Chilean Salmon Farming. Co-Investigator. ICARS-SERNAPESCA.",
        "FONDECYT Initiation Project No. 11230885 (2023-2026) : Efficient Regulatory Options for Industries with Spatially Differentiated Pollution, Endogenous Location, and an Endogenous Number of Firms: An Empirical Study of Regulatory Alternatives for the Chilean Salmon Aquaculture Industry. Principal Investigator.",
      ],
    },
  },
  {
    slug: "marcela-jaime",
    line: "impactos-socioeconomicos",
    name: "Dra. Marcela Jaime Torres",
    role: { es: "Investigadora Adjunta", en: "Adjunct Researcher" },
    email: "mjaime@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/marcela-jaime-337422110/",
      orcid: "https://orcid.org/0000-0002-0972-4254",
      researchgate: "https://www.researchgate.net/profile/Monica-Jaime-Torres",
      scholar: "https://scholar.google.com/citations?user=d2XywP8AAAAJ&hl=es",
    },
    bio: {
      es: "La Dra. Marcela Jaime Torres es profesora asociada de la Escuela de Administración y Negocios (EAN) de la Universidad de Concepción. Su investigación se centra en los aspectos conductuales de la gestión de recursos naturales, especialmente en la conservación del agua y la energía, la gestión de residuos y la acuicultura. Ha desarrollado estudios sobre la contaminación atmosférica urbana asociada al uso de leña para calefacción y sobre el comportamiento de pequeños productores de los sectores agrícola y acuícola. Sus intereses de investigación también incluyen el capital social y el bienestar subjetivo, las transiciones energéticas sostenibles, los efectos de la interacción entre políticas ambientales y las respuestas de las personas a incentivos monetarios y no monetarios. Actualmente, se desempeña como directora del centro Environment for Development Initiative en Chile (NENRE EfD-Chile) y como codirectora de la iniciativa Sustainable Energy Transitions Initiative (SETI). Además, participa en el programa colaborativo Sustainable Management of Coastal Marine Resources (EfD-CMaR) y en la red Women in Environmental Economics for Development (WinEED). También ha colaborado como consultora económica para la Subsecretaría de Pesca y Acuicultura (SUBPESCA) y el Ministerio del Medio Ambiente de Chile.",
      en: "Marcela Jaime Torres is an associate professor in the School of Management and Business (Escuela de Administración y Negocios (EAN)) at the University of Concepcion. Her research is focused on behavioral aspects of natural resource management, particularly, on water and energy conservation, waste management and aquaculture. She has written on urban air pollution due to burning of wood, and on the behavior of small producers in the agriculture and aquaculture sectors. She also has research interests in social capital and subjective well-being, sustainable energy transitions, the effects of the interaction between environmental policies, and individuals’ responses to both monetary and non-monetary incentives. She currently serves as center director of the Environment for Development Initiative in Chile (NENRE EfD-Chile) and as co-lead of the Sustainable Energy Transitions Initiative (SETI). She is affiliated at the Sustainable Management of Coastal Marine Resources program (EfD-CMaR) collaborative research program, and Women in Environmental Economics for Development (WinEED). Furthermore, she has served as an economist consultant for the Subsecretary of Fisheries and Aquaculture (SUBPESCA) and the Ministry of the Environment of the Government of Chile.",
    },
    degrees: {
      es: [
        "2015 Doctorado (Ph.D.) en Economía, Departamento de Economía, Escuela de Negocios, Economía y Derecho, Universidad de Gotemburgo, Suecia.",
        "2006 Magíster en Economía de Recursos Naturales y Medio Ambiente, Universidad de Concepción, Chile.",
        "2001 Licenciatura en Economía, Universidad Nacional de Colombia.",
      ],
      en: [
        "PhD in Economics, Department of Economics, School of Business, Economics and Law, University of Gothenburg, Sweden (2015). MSc in Environmental and Natural Resource Economics, University of Concepción, Chile (2006). BA in Economics, National University of Colombia (2001)",
      ],
    },
    projects: {
      es: [
        "2025-2026 Extensión de la recopilación de datos de un ensayo controlado aleatorizado (RCT) en escuelas de Delhi para examinar los efectos acumulativos y persistentes de estrategias tecnológicas y conductuales destinadas a mitigar los efectos de la contaminación atmosférica en niños. Financiado por el International Growth Centre, London School of Economics . Investigadora asociada .",
        "2023-2025 Programa de investigación en Economía Ambiental y de Recursos Naturales ( NENRE EfD-Chile ). Financiado por la Universidad de Concepción . Investigadora principal .",
        "2024-2025 Evaluación del potencial de los purificadores de aire y de las intervenciones conductuales para mitigar el impacto de la contaminación atmosférica en niños del Sur Global. Financiado por Environment for Development Initiative (EfD) . Investigadora asociada .",
        "2022-2024 Sustentabilidad social y de mercado de la acuicultura: percepciones de comunidades y consumidores sobre la industria de productos del mar de cultivo. Financiado por Environment for Development Initiative (EfD) . Investigadora asociada .",
        "2022-2024 Efectos de derrame en eficiencia ambiental y externalidades de centros de cultivo: análisis de industrias acuícolas clave en Vietnam y Chile. Financiado por Environment for Development Initiative (EfD) . Investigadora asociada .",
        "2021-2022 Transiciones energéticas sostenibles: aprendiendo de la experiencia de las interacciones Norte-Sur globales ( FOVI210017 ). Financiado por ANID (Chile) . Investigadora principal .",
        "2021-2023 Transiciones hacia bajas emisiones de carbono y equidad de género en el Sur Global. Financiado por el International Development Research Centre (IDRC) . Investigadora asociada .",
        "2020-2021 Evaluación de políticas ambientales: impactos de los programas de recambio de calefactores en hogares urbanos del centro-sur de Chile. Financiado por Environment for Development Initiative (EfD) . Investigadora asociada .",
      ],
      en: [
        "Extending data collection of an RCT in Delhi schools to examine cumulative and persistent effects of technological and behavioral strategies to mitigate the effects of air pollution on children. Funded by: International Growth Centre, London School of Economics. March",
        "2026. Associated researcher. Research program in Environmental and Natural Resource Economics (NENRE EfD-Chile). Funded by: University of Concepción. April",
        "2025. Principal researcher. Examining the Potential of Air Purifiers and Behavioural Interventions in Mitigating the Impact of Air Pollution on Children in the Global South. Funded by: Environment for Development Initiative (EfD). January",
        "2024 - December",
        "2025. Associated researcher. Market and social sustainability of aquaculture: Communities' and consumers' perceptions of the farmed seafood industry. Funded by: Environment for Development Initiative (EfD). January",
        "2022 - December",
        "2024. Associated researcher. Environmental efficiency spillover and externalities of aquaculture farms: Analyses of key aquaculture industries in Vietnam and Chile. Environment for Development Initiative (EfD). January",
        "2022 - December",
        "2024. Associated researcher. Sustainable energy transitions: Learning from the experience of global North-South interactions FOVI210017. Funded by: ANID (Chile). December",
        "2021 - December",
        "2022. Principal researcher. Low carbon transitions and gender equity in the global south. Funded by: International Development Research Center (IDRC). October",
        "2023. Associated researcher. Evaluating environmental policies. The impacts of stove programs in urban households of Central-Southern Chile. Funded by: Environment for Development Initiative (EfD). January",
        "2020 - December",
        "2021. Associated researcher.",
      ],
    },
  },
  {
    slug: "felipe-quezada",
    line: "impactos-socioeconomicos",
    name: "Dr. Felipe Quezada",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "felipequezada@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/felipe-j-quezada-escalona-361412341",
      orcid: "https://orcid.org/0000-0002-9594-0403",
      scholar: "https://scholar.google.com/citations?user=TGG9L-0AAAAJ&hl=en",
      researchgate: "https://www.researchgate.net/profile/Felipe-Quezada-Escalona",
    },
    bio: {
      es: "El Dr. Felipe Quezada Escalona es Profesor Asociado del Departamento de Economía de la Universidad de Concepción, Chile, e investigador adjunto del Centro Interdisciplinario para la Investigación Acuícola – Investigación Aplicada (INCAR²). Es además miembro del Comité Ejecutivo del International Institute of Fisheries Economics and Trade (IIFET). Previamente se desempeñó como investigador postdoctoral en el Future Seas Project de la Universidad de California Santa Cruz, en colaboración con el NOAA Southwest Fisheries Science Center.\n\nSu investigación se inscribe en la economía ambiental y de los recursos naturales, con énfasis en pesquerías y acuicultura. Utiliza modelos de elección discreta y econometría de series de tiempo para analizar el manejo de recursos de uso común, el comportamiento de los pescadores, la formación endógena de coaliciones, la determinación de precios en mercados de recursos naturales y los efectos del cambio climático sobre las pesquerías comerciales y la salmonicultura chilena. Sus resultados han sido publicados en revistas como Environmental and Resource Economics, Marine Resource Economics y Aquaculture Economics & Management.",
      en: "",
    },
    degrees: {
      es: [
        "2021. Doctor of Philosophy in Resource Economics, University of Massachusetts Amherst, EE.UU.",
        "2015. Magíster en Economía de Recursos Naturales y del Medio Ambiente, Universidad de Concepción, Chile.",
        "2012. Ingeniero Comercial, Licenciado en Ciencias Económicas, Universidad de Concepción, Chile.",
      ],
      en: [],
    },
    projects: {
      es: [
        "Proyecto FONDECYT Iniciación 11250223: \"The Impact of Environmental Variability on Fishers' Harvest Decisions in Chile using a Multi-Species Approach\". 2025-2028.",
      ],
      en: [],
    },
  },
  {
    slug: "cesar-salazar",
    line: "impactos-socioeconomicos",
    name: "Dr. César Salazar",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "csalazar@ubiobio.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/c%C3%A9sar-salazar-a9ba1618/",
      orcid: "https://orcid.org/0000-0002-0199-7688",
      researchgate: "https://www.researchgate.net/profile/Cesar-Salazar-Espinoza",
      scholar: "https://scholar.google.com/citations?user=PjkNmWIAAAAJ&hl=en",
    },
    bio: {
      es: "César Salazar es Profesor Asociado de la Facultad de Ciencias Empresariales de la Universidad del Bio-Bio, investigador adjunto en el Centro Interdisciplinario para la Investigación Acuícola (INCAR² ), e investigador senior de la red internacional Environment for Development (EfD). El Dr. Salazar posee un PhD en Economía de la Universidad de Copenhague, Dinamarca, y un Magíster en Economía de los Recursos Naturales y del Medio Ambiente de la Universidad de Concepción. Su investigación se centra en aplicaciones empíricas de la teoría microeconómica del desarrollo a diversos problemas relacionados con la explotación y la gestión del medio ambiente y los recursos naturales, particularmente en el ámbito de los recursos marinos, agricultura, manejo de residuos y transiciones energéticas sostenibles.",
      en: "Dr. César Salazar is an Associate Professor in the Faculty of Business Sciences at the University of Bío-Bío, an Associate Researcher at the Interdisciplinary Center for Aquaculture Research (INCAR²), and a Senior Researcher within the international Environment for Development (EfD) network. He holds a Ph.D. in Economics from the University of Copenhagen, Denmark, and a Master's degree in Natural Resource and Environmental Economics from the University of Concepción, Chile. His research focuses on empirical applications of microeconomic development theory to a range of issues related to the use and management of environmental and natural resources, particularly in the areas of marine resources, agriculture, waste management, and sustainable energy transitions.",
    },
    degrees: {
      es: [
        "2015 PhD en Economía, Departamento de Economía, Universidad de Copenhague, Dinamarca.",
        "2013 Magíster en Economía. Departamento de Economía, Universidad de Copenhague, Dinamarca.",
        "2005 Magíster en Economía de los Recursos Naturales y del Medio Ambiente, Universidad de Concepción, Chile.",
        "2003 Ingeniero comercial y licenciado en economía, Universidad de Concepción, Chile.",
      ],
      en: [
        "2015 Ph.D. in Economics, Department of Economics, University of Copenhagen, Denmark.",
        "2013 M.Sc. in Economics, Department of Economics, University of Copenhagen, Denmark.",
        "2005 M.Sc. in Natural Resource and Environmental Economics, University of Concepción, Chile.",
        "2003 Commercial Engineer and Bachelor's Degree in Economics, University of Concepción, Chile.",
      ],
    },
    projects: {
      es: [
        "The perceived dark side of energy transition. Are cognitive biases driving misconceptions about wind-power energy projects in Chile? Fondecyt Iniciación-ANID. Investigador principal 2026-2028.",
        "Examining the Potential of Air Purifiers and Behavioural Interventions in Mitigating the Impact of Air Pollution on Children in the Global South. Financiado por la Agencia de Cooperación y desarrollo de Suecia (SIDA). Co-investigador 2024-2025.",
        "Market and social sustainability of aquaculture: Communities’ and consumers’ perceptions of the farmed seafood industry. Financiado por la Agencia de Cooperación y desarrollo de Suecia (SIDA). Investigador principal. 2022-2023.",
        "Environmental efficiency spillover and externalities of aquaculture farms: Analyses of key aquaculture industries in Vietnam and Chile. Financiado por la Agencia de Cooperación y desarrollo de Suecia (SIDA). Co-investigador. 2022-2023.",
        "Risk analysis as a tool for the prioritization of Secondary Environmental Quality Standards in the main tributary rivers to the fjord system of Northwestern Patagonia, under hydrological drought scenarios. Financiado por ANID 2021 STRATEGIC RESEARCH FUND ON DROUGHT. Investigador asociado. 2022.",
        "Hydrological signature influence on Chilean Aquaculture under climate change and landscape scenarios. Financiado por ANID 2021 Programa FONDECYT regular. Co-investigador. 2022-2024.",
      ],
      en: [
        "2026-2028 The Perceived Dark Side of Energy Transition: Are Cognitive Biases Driving Misconceptions About Wind Power Projects in Chile? FONDECYT Initiation Grant (ANID). Principal Investigator .",
        "2024-2025 Examining the Potential of Air Purifiers and Behavioural Interventions in Mitigating the Impact of Air Pollution on Children in the Global South. Funded by the Swedish International Development Cooperation Agency (Sida) . Co-Investigator .",
        "2022-2023 Market and Social Sustainability of Aquaculture: Communities’ and Consumers’ Perceptions of the Farmed Seafood Industry. Funded by the Swedish International Development Cooperation Agency (Sida) . Principal Investigator .",
        "2022-2023 Environmental Efficiency Spillovers and Externalities of Aquaculture Farms: Analyses of Key Aquaculture Industries in Vietnam and Chile. Funded by the Swedish International Development Cooperation Agency (Sida) . Co-Investigator .",
        "2022 Risk Analysis as a Tool for the Prioritization of Secondary Environmental Quality Standards in the Main Tributary Rivers to the Fjord System of Northwestern Patagonia Under Hydrological Drought Scenarios. Funded by ANID Strategic Research Fund on Drought",
        "2021 . Associate Researcher .",
        "2022-2024 Influence of Hydrological Signatures on Chilean Aquaculture Under Climate Change and Landscape Scenarios. Funded by ANID FONDECYT Regular Program",
        "2021 . Co-Investigator .",
      ],
    },
  },
  {
    slug: "leonardo-salazar",
    line: "impactos-socioeconomicos",
    name: "Dr. Leonardo Salazar",
    role: { es: "Investigador Adjunto", en: "Adjunct Researcher" },
    email: "lesalaza@udec.cl",
    links: {
      orcid: "https://orcid.org/0000-0002-3882-8597",
      researchgate: "https://www.researchgate.net/profile/Leonardo-Salazar-2",
      scholar: "https://scholar.google.com/citations?user=QaGDbMEAAAAJ&hl=pt-BR",
    },
    bio: {
      es: "Leonardo Salazar es profesor asociado en el Departamento de Economía en la Universidad de Concepción, Chile. También trabaja como investigador en el Centro Interdisciplinario para la Investigación Aplicada en Acuicultura (INCAR² ) y en la Iniciativa Environment for Development (EfD). Tiene un Ph.D. en Economía (2016) y un Máster en Economía (2014) por la Universidad de Copenhague, Dinamarca. Su investigación se enfoca en econometría de series de tiempo, especialmente en la economía de la acuicultura y la macroeconometría. Sus estudios han ayudado a entender mejor cómo se determinan los precios de los productos acuícolas en los mercados internacionales.",
      en: "Dr. Leonardo Salazar is an Associate Professor in the Department of Economics at the University of Concepción, Chile. He is also a researcher at the Interdisciplinary Center for Applied Aquaculture Research (INCAR²) and the Environment for Development Initiative (EfD). He holds a Ph.D. in Economics (2016) and a Master's degree in Economics (2014) from the University of Copenhagen, Denmark. His research focuses on time series econometrics, particularly in the fields of aquaculture economics and macroeconometrics. His work has contributed to a better understanding of how aquaculture product prices are determined in international markets.",
    },
    degrees: {
      es: [
        "2016 Doctor en Economía, Universidad de Copenhague, Dinamarca.",
        "2014 Master en Economía, Universidad de Copenhague, Dinamarca.",
        "2006 Magíster en Economía de Recursos Naturales y del Medio Ambiente (especialización en Métodos Cuantitativos), Universidad de Concepción, Chile.",
        "2003 Ingeniero Comercial, Universidad de Concepción, Chile.",
        "2003 Licenciado en Ciencias Económicas, Universidad de Concepción, Chile.",
      ],
      en: [
        "2016 Ph.D. in Economics, University of Copenhagen, Denmark.",
        "2014 Master's Degree in Economics, University of Copenhagen, Denmark.",
        "2006 M.Sc. in Natural Resource and Environmental Economics (Specialization in Quantitative Methods), University of Concepción, Chile.",
        "2003 Commercial Engineer, University of Concepción, Chile.",
        "2003 Bachelor's Degree in Economic Sciences, University of Concepción, Chile.",
      ],
    },
    projects: {
      es: [],
      en: [],
    },
  },
  {
    slug: "jeanne-simon",
    line: "impactos-socioeconomicos",
    name: "Dra. Jeanne Simon Rodgers",
    role: { es: "Investigadora Adjunta", en: "Adjunct Researcher" },
    email: "jsimon@udec.cl",
    links: {
      linkedin: "https://www.linkedin.com/in/jeanne-w-simon/",
      researchgate: "https://www.researchgate.net/profile/Jeanne-Simon-3",
      scholar: "https://scholar.google.com/citations?user=_mHLvikAAAAJ&hl=es",
    },
    bio: {
      es: "La Dra. Jeanne Simon es académica e investigadora en el Centro Interdisciplinario para la Investigación Acuícola (INCAR) en Chile. Como politóloga, su trabajo se enfoca en la sustentabilidad socioeconómica en la gobernanza de acuicultura. Con experiencia en políticas públicas y gobernanza, ha participado en proyectos sobre la adaptación al cambio climático en el sector de pesca y acuicultura y en el análisis de gobernanza colaborativa. Además, se dedica a la educación y formación de nuevas generaciones de científicos y científicas en relación con las políticas públicas y gobernanza de recursos de uso común. Su labor en el INCAR la posiciona como una de las pocas politólogas analizando la gobernanza del sector.",
      en: "Dr. Jeanne Simon is a faculty member and researcher at the Interdisciplinary Center for Aquaculture Research (INCAR) in Chile. As a political scientist, her work focuses on the socioeconomic sustainability of aquaculture governance. With extensive experience in public policy and governance, she has participated in projects addressing climate change adaptation in the fisheries and aquaculture sectors, as well as the analysis of collaborative governance processes. She is also committed to educating and mentoring the next generation of researchers in the fields of public policy and the governance of common-pool resources. Her work at INCAR positions her among the few political scientists specializing in the governance of the aquaculture sector.",
    },
    degrees: {
      es: [
        "B.A. Ciencia Política, University of Colorado Ph.D. International Studies, University of Denver, USA.",
      ],
      en: [
        "B.A. in Political Science , University of Colorado, USA.",
        "Ph.D. in International Studies , University of Denver, USA.",
      ],
    },
    projects: {
      es: [
        "Expert, Adaptation of the Marine Spatial Planning tool to Chile for the Global Environmental Fund, Marine-Coastal Governance financed by FAO-Chile.",
        "2022-2023. (2022/FLCHI/FLCHI/117296) Expert in governance, Diseño e Implementación de un Programa de Capacitación sobre Adaptación al Cambio Climático en Pesca y Acuicultura Para Funcionarios Públicos, Expertos Nacionales y Tomadores de Decisión a Nivel Nacional, Regional y Comunal, Proyecto GEF financiado por FAO-Chile (FAO 9-2018) 2019-2021.",
      ],
      en: [
        "2022-2023 Expert, Adaptation of the Marine Spatial Planning Tool to Chile for the Global Environment Facility (GEF) Marine and Coastal Governance Initiative, funded by FAO Chile . Project No. 2022/FLCHI/FLCHI/117296 .",
        "2019-2021 Governance Expert, Design and Implementation of a Training Program on Climate Change Adaptation in Fisheries and Aquaculture for Public Officials, National Experts, and Decision-Makers at National, Regional, and Local Levels . GEF Project funded by FAO Chile (FAO 9-2018) .",
      ],
    },
  },
];

/**
 * Ruta de la foto de un integrante, o `null` si no hay foto (se muestra el
 * isotipo de INCAR²). Por defecto se deriva `/images/equipo/{slug}.jpg`
 * (fotos nombradas por slug); un `photo` explícito —incluido `null`— manda.
 */
export const memberPhoto = (member: ResearchMember): string | null =>
  member.photo === null ? null : (member.photo ?? `/images/equipo/${member.slug}.jpg`);

/** Integrantes de una línea, en el orden de definición (jerárquico por rol). */
export const getMembersByLine = (lineSlug: string): ResearchMember[] =>
  researchMembers.filter((member) => member.line === lineSlug);

export const getMember = (slug: string): ResearchMember | undefined =>
  researchMembers.find((member) => member.slug === slug);

/** Línea de investigación a la que pertenece un integrante. */
export const getMemberLine = (member: ResearchMember) =>
  researchLines.find((line) => line.slug === member.line);
