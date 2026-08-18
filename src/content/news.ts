import type { Locale } from "@/i18n/routing";

/**
 * Modelo de datos de Noticias (capa de contenido).
 *
 * Cada noticia se migra desde el sitio actual (centroincar.cl): el texto en
 * español es VERBATIM de la nota original; la versión en inglés es una traducción
 * fiel (INCAR aportará las versiones oficiales en su momento). El campo `sourceUrl`
 * conserva el enlace a la nota original y se ofrece en el detalle como "Fuente".
 *
 * `content` es una lista ordenada de bloques bilingües (párrafo, subtítulo o lista)
 * para preservar la estructura de la nota. En Fase 3 esta misma forma la
 * administrará el panel (Payload).
 */
export type NewsBlock =
  | { type: "p"; text: Record<Locale, string> }
  | { type: "h"; text: Record<Locale, string> }
  | { type: "ul"; items: Record<Locale, string[]> };

export interface NewsArticle {
  slug: string;
  title: Record<Locale, string>;
  /** Fecha ISO (para orden, datos estructurados y formato localizado). */
  date: string;
  image: string;
  imageAlt: Record<Locale, string>;
  /** Enlace a la nota original en centroincar.cl. */
  sourceUrl: string;
  /** Extracto breve para la tarjeta. */
  excerpt: Record<Locale, string>;
  content: NewsBlock[];
  featured?: boolean;
}

export const news: NewsArticle[] = [
  {
    slug: "adjudicacion-incar2",
    title: {
      es: "Adjudicación del Centro de Investigación Aplicada INCAR²",
      en: "Award of the INCAR² Applied Research Center",
    },
    date: "2025-11-03",
    image: "/images/noticias/adjudicacion-incar2.jpeg",
    imageAlt: {
      es: "Adjudicación del Centro de Investigación Aplicada INCAR².",
      en: "Award of the INCAR² Applied Research Center.",
    },
    sourceUrl:
      "https://centroincar.cl/2025/11/03/adjudicacion-del-centro-de-investigacion-aplicada-incar2/",
    excerpt: {
      es: "La ANID dio a conocer los resultados de sus concursos de Centros de Investigación Aplicada, entre los que destaca la adjudicación de INCAR², dirigido por el Dr. Cristian Gallardo-Escárate.",
      en: "ANID announced the results of its Applied Research Centers competition, highlighting the award of INCAR², led by Dr. Cristian Gallardo-Escárate.",
    },
    content: [
      {
        type: "p",
        text: {
          es: "INCAR² será un centro investigación aplicada que se enfoca en soluciones que equilibren competitividad, bienestar social y sostenibilidad, priorizando el desarrollo sustentable de la acuicultura. Para ello abarcara tematicas como vacunas avanzadas, control de enfermedades, bienestar animal, cambio climático e interacción pesca-ecosistema, entre otros.",
          en: "INCAR² will be an applied research center focused on solutions that balance competitiveness, social welfare and sustainability, prioritizing the sustainable development of aquaculture. To this end it will cover topics such as advanced vaccines, disease control, animal welfare, climate change and the fisheries–ecosystem interaction, among others.",
        },
      },
      {
        type: "p",
        text: {
          es: "Este jueves 30 de octubre, la Agencia Nacional de Investigación y Desarrollo, ANID, dio a conocer los resultados de cuatro concursos de su subdirección de Centros e Investigación Asociativa, entre los que destaca la adjudicación del Centro de Investigación Aplicada (CIA), INCAR².",
          en: "This Thursday, October 30, the National Agency for Research and Development, ANID, announced the results of four competitions run by its Centers and Associative Research division, among which the award of the Applied Research Center (CIA), INCAR², stands out.",
        },
      },
      {
        type: "p",
        text: {
          es: "“Estamos muy contentos con los resultados que mantienen el liderazgo de los centros IMO, INCAR y Consorcio del Agua, más la participación de la Universidad de Concepción en otros cinco centros en forma asociada”, destacó la Vicerrectora de Investigación y Desarrollo, Dra. Andrea Rodríguez Tastets y agregó que “no puedo dejar de agradecer el esfuerzo de estos equipos y de todos los otros equipos que pasaron a entrevista o que postularon”.",
          en: "“We are very pleased with the results, which maintain the leadership of the IMO, INCAR and Consorcio del Agua centers, plus the participation of the Universidad de Concepción as an associate in five other centers,” emphasized the Vice-Rector for Research and Development, Dr. Andrea Rodríguez Tastets, who added that “I cannot fail to thank the effort of these teams and of all the other teams that reached the interview stage or applied.”",
        },
      },
      {
        type: "p",
        text: {
          es: "“Estos concursos han sido cada vez más competitivos y requieren mucho trabajo”, contextualizó la autoridad, “pero representan una oportunidad para hacer investigación y desarrollo que respondan a desafíos complejos, que van más allá de proyectos individuales, y que distinguen las capacidades de instituciones que pueden sustentarlos”.",
          en: "“These competitions have become increasingly competitive and require a great deal of work,” the authority explained, “but they represent an opportunity to carry out research and development that responds to complex challenges, going beyond individual projects, and that distinguishes the capacities of institutions able to sustain them.”",
        },
      },
      {
        type: "p",
        text: {
          es: "“Estamos felices porque no hemos perdido ninguno de los centros, y nos asociamos a otros centros en forma importante. Ahora nos queda esperar los resultados de centros de interés nacional para cerrar bien este año”, agregó la Dra. Rodríguez.",
          en: "“We are happy because we have not lost any of the centers, and we have joined other centers in a significant way. Now it remains for us to await the results of the centers of national interest to close the year well,” added Dr. Rodríguez.",
        },
      },
      {
        type: "p",
        text: {
          es: "Entre los Centros de Investigación Aplicada, la propuesta UdeC adjudicada es el Centro Interdisciplinario para la Investigación Acuícola, INCAR², dirigido por el académico del Departamento de Oceanografía de la Facultad de Ciencias Naturales y Oceanográficas y actual Subdirector del Centro INCAR, Dr. Cristian Gallardo-Escárate.",
          en: "Among the Applied Research Centers, the awarded UdeC proposal is the Interdisciplinary Center for Aquaculture Research, INCAR², led by the academic of the Department of Oceanography of the Faculty of Natural and Oceanographic Sciences and current Deputy Director of the INCAR Center, Dr. Cristian Gallardo-Escárate.",
        },
      },
      {
        type: "p",
        text: {
          es: "La primera reacción, señala el Dr. Gallardo-Escárate, es felicidad: “pero después viene el orgullo, el orgullo de haber adjudicado sin duda uno de los concursos con mayor competitividad que tenemos en nuestro sistema de investigación en Chile, porque nos posiciona claramente como una de las mejores instituciones a nivel nacional, y por lo tanto ahora viene el momento de ponerse a trabajar”.",
          en: "The first reaction, notes Dr. Gallardo-Escárate, is happiness: “but then comes the pride, the pride of having won without doubt one of the most competitive calls in our research system in Chile, because it clearly positions us as one of the best institutions at the national level, and therefore now comes the time to get to work.”",
        },
      },
      {
        type: "p",
        text: {
          es: "El Académico se refiere así al trabajo que toma la preparación de este tipo de proyectos, de largos meses de esfuerzos, respaldados por la experiencia del centro Incar. “Es un trabajo que viene hace 12 años y donde ha existido un apoyo institucional desde la Universidad de Concepción para realizar ciencia interdisciplinaria que involucre a distintas áreas del conocimiento. Son 12 años de generar un lenguaje común de interdisciplina, y que ahora nos permite proyectarlo para los próximos 5 y 10 años más”.",
          en: "The academic thus refers to the work involved in preparing this type of project, of long months of effort, backed by the experience of the INCAR center. “It is work that has been going on for 12 years and where there has been institutional support from the Universidad de Concepción to carry out interdisciplinary science involving different areas of knowledge. It is 12 years of building a common interdisciplinary language, which now allows us to project it for the next 5 and 10 years.”",
        },
      },
      {
        type: "p",
        text: {
          es: "En su próxima etapa, INCAR², el Académico de la Universidad Andrés Bello (UNAB), Dr. Ruben Avendaño-Herrera, asumirá como Subdirector y en esta nueva etapa será un centro de investigación aplicada que se enfoca en soluciones que equilibren competitividad, bienestar social y sostenibilidad, priorizando el desarrollo sustentable de la acuicultura. Para ello abarcará temáticas como vacunas avanzadas, control de enfermedades, bienestar animal, cambio climático e interacción pesca-ecosistema, entre otros.",
          en: "In its next stage, INCAR², the academic of the Universidad Andrés Bello (UNAB), Dr. Ruben Avendaño-Herrera, will take over as Deputy Director, and in this new stage it will be an applied research center focused on solutions that balance competitiveness, social welfare and sustainability, prioritizing the sustainable development of aquaculture. To this end it will cover topics such as advanced vaccines, disease control, animal welfare, climate change and the fisheries–ecosystem interaction, among others.",
        },
      },
    ],
  },
  {
    slug: "nuevo-centro-anid-incar2",
    title: {
      es: "INCAR²: Nuevo Centro de Investigación Aplicada de la ANID liderará el fortalecimiento de la acuicultura sustentable en Chile",
      en: "INCAR²: New ANID Applied Research Center to lead the strengthening of sustainable aquaculture in Chile",
    },
    date: "2025-11-14",
    image: "/images/noticias/nuevo-centro-anid.png",
    imageAlt: {
      es: "Dr. Cristian Gallardo-Escárate, director del nuevo CIA INCAR².",
      en: "Dr. Cristian Gallardo-Escárate, director of the new CIA INCAR².",
    },
    sourceUrl:
      "https://centroincar.cl/2025/11/14/incar%c2%b2-nuevo-centro-de-investigacion-aplicada-de-la-anid-liderara-el-fortalecimiento-de-la-acuicultura-sustentable-en-chile/",
    excerpt: {
      es: "Tras 13 años, el FONDAP INCAR da paso al nuevo CIA INCAR², que con ocho líneas de investigación liderará una acuicultura más sustentable, inclusiva y resiliente.",
      en: "After 13 years, FONDAP INCAR gives way to the new CIA INCAR², which with eight research lines will lead a more sustainable, inclusive and resilient aquaculture.",
    },
    featured: true,
    content: [
      {
        type: "p",
        text: {
          es: "El pasado 30 de octubre se dieron a conocer los resultados de la convocatoria a los Centros de Investigación Aplicada (CIA) de la Agencia Nacional de Investigación y Desarrollo (ANID). Entre los ocho centros adjudicados, uno fue destinado específicamente a abordar los desafíos y oportunidades de la acuicultura chilena. Se trata del Centro Interdisciplinario para la Investigación Acuícola (INCAR²), código CIA250009, cuyo nombre en inglés — Interdisciplinary Center for Aquaculture Research – Applied Research — refleja su marcado énfasis en la investigación aplicada orientada al fortalecimiento de un sector acuícola más sustentable y competitivo.",
          en: "On October 30, the results of the call for Applied Research Centers (CIA) of the National Agency for Research and Development (ANID) were announced. Among the eight awarded centers, one was specifically dedicated to addressing the challenges and opportunities of Chilean aquaculture. This is the Interdisciplinary Center for Aquaculture Research (INCAR²), code CIA250009, whose English name — Interdisciplinary Center for Aquaculture Research – Applied Research — reflects its strong emphasis on applied research aimed at strengthening a more sustainable and competitive aquaculture sector.",
        },
      },
      {
        type: "p",
        text: {
          es: "El objetivo de los Centros de Investigación Aplicada es contribuir a la creación y consolidación de Centros de investigación y desarrollo de excelencia, que generen avances científicos y tecnológicos innovadores, provean soluciones a desafíos de sectores productivos y aporten en la captura de oportunidades vinculadas a la diversificación productiva, compatible con un desarrollo sostenible a nivel nacional e internacional, para ser transferidos al sector público y privado, impactando en la competitividad de la economía chilena y a través de ésta al bienestar de la sociedad.",
          en: "The objective of the Applied Research Centers is to contribute to the creation and consolidation of centers of excellence in research and development that generate innovative scientific and technological advances, provide solutions to challenges of productive sectors and help capture opportunities linked to productive diversification, compatible with sustainable development at the national and international level, to be transferred to the public and private sector, impacting the competitiveness of the Chilean economy and, through it, the welfare of society.",
        },
      },
      {
        type: "p",
        text: {
          es: "Luego de 13 años de generar conocimiento y capital humano de excelencia, el FONDAP INCAR finaliza y da paso a un nuevo Centro, CIA INCAR², el cual se centrará en investigar para generar conocimiento y tecnologías que equilibren la competitividad del sector acuícola con el bienestar social y la sostenibilidad ambiental de Chile. En este nuevo ciclo, la dirección del centro estará a cargo del Dr. Cristian Gallardo-Escárate, académico del Departamento de Oceanografía de la Universidad de Concepción (UdeC), mientras que la subdirección será liderada por el Dr. Rubén Avendaño-Herrera, académico de la Universidad Andrés Bello (UNAB).",
          en: "After 13 years of generating knowledge and human capital of excellence, FONDAP INCAR concludes and gives way to a new Center, CIA INCAR², which will focus on research to generate knowledge and technologies that balance the competitiveness of the aquaculture sector with the social welfare and environmental sustainability of Chile. In this new cycle, the center's direction will be in the hands of Dr. Cristian Gallardo-Escárate, academic of the Department of Oceanography of the Universidad de Concepción (UdeC), while the deputy direction will be led by Dr. Rubén Avendaño-Herrera, academic of the Universidad Andrés Bello (UNAB).",
        },
      },
      {
        type: "p",
        text: {
          es: "Para el Dr. Gallardo-Escárate, la adjudicación de INCAR² representa un hito significativo para la acuicultura chilena de clase mundial: “los avances científicos realizados por investigadores de INCAR consolidan una trayectoria de aportes de conocimiento aplicado a la industria salmonicultora, la mitilicultura y la acuicultura de pequeña escala”.",
          en: "For Dr. Gallardo-Escárate, the award of INCAR² represents a significant milestone for world-class Chilean aquaculture: “the scientific advances made by INCAR researchers consolidate a track record of contributions of applied knowledge to the salmon farming industry, mussel farming and small-scale aquaculture.”",
        },
      },
      {
        type: "p",
        text: {
          es: "Al igual que durante su primer período, INCAR², tiene a la Universidad de Concepción (UdeC) como institución patrocinante, y a la Universidad Andrés Bello (UNAB) y a la Universidad Austral de Chile (UACh) como asociadas, incorporándose en esta nueva etapa la Universidad de Talca (UTalca).",
          en: "As during its first period, INCAR² has the Universidad de Concepción (UdeC) as its sponsoring institution, and the Universidad Andrés Bello (UNAB) and the Universidad Austral de Chile (UACh) as associates, with the Universidad de Talca (UTalca) joining in this new stage.",
        },
      },
      {
        type: "p",
        text: {
          es: "A juicio del director de INCAR², el Dr. Gallardo-Escárate, “la continuidad de instituciones asociadas en esta nueva etapa demuestra sólidas relaciones institucionales en el ámbito científico de frontera”. Por otra parte, la incorporación de la Universidad de Talca refuerza el carácter interdisciplinario y colaborativo del centro.",
          en: "In the opinion of INCAR²'s director, Dr. Gallardo-Escárate, “the continuity of associated institutions in this new stage demonstrates solid institutional relationships in the frontier scientific field.” Moreover, the incorporation of the Universidad de Talca reinforces the interdisciplinary and collaborative character of the center.",
        },
      },
      {
        type: "h",
        text: { es: "Líneas de Investigación", en: "Research Lines" },
      },
      {
        type: "p",
        text: {
          es: "En esta nueva etapa de INCAR², el trabajo interdisciplinario y colaborativo será fundamental, incrementándose el número de líneas de investigación a ocho. Las líneas de investigación son las siguientes:",
          en: "In this new stage of INCAR², interdisciplinary and collaborative work will be fundamental, with the number of research lines increasing to eight. The research lines are as follows:",
        },
      },
      {
        type: "ul",
        items: {
          es: [
            "Nuevas vacunas para peces",
            "Enfermedades de peces y resistencia a los antimicrobianos",
            "Soluciones ómicas para la acuicultura",
            "Estrés y bienestar animal",
            "Impactos de la acuicultura en los ecosistemas",
            "Aumento de la resiliencia en la acuicultura",
            "Interacciones sostenibles entre acuicultura, pesquerías y ecosistemas",
            "Impactos socioeconómicos, gobernanza y dinámica de los mercados",
          ],
          en: [
            "New fish vaccines",
            "Fish diseases and antimicrobial resistance",
            "Omics solutions for aquaculture",
            "Stress and animal welfare",
            "Impacts of aquaculture on ecosystems",
            "Increasing resilience in aquaculture",
            "Sustainable interactions between aquaculture, fisheries and ecosystems",
            "Socioeconomic impacts, governance and market dynamics",
          ],
        },
      },
      {
        type: "p",
        text: {
          es: "Los investigadores principales que lideran cada una de estas líneas son: Dr. Cristian Gallardo-Escárate (UdeC), Dr. Rubén Avendaño-Herrera (UNAB), Dra. Valentina Valenzuela-Muñoz (UdeC), Dr. Juan Antonio Valdés (UNAB), Dr. Renato Quiñones Bergeret (UdeC), Dra. Doris Soto Benavides (UdeC), Dr. Carlos Molinet Flores (UACh) y Dr. Carlos Chávez Rebolledo (UTalca).",
          en: "The principal investigators leading each of these lines are: Dr. Cristian Gallardo-Escárate (UdeC), Dr. Rubén Avendaño-Herrera (UNAB), Dr. Valentina Valenzuela-Muñoz (UdeC), Dr. Juan Antonio Valdés (UNAB), Dr. Renato Quiñones Bergeret (UdeC), Dr. Doris Soto Benavides (UdeC), Dr. Carlos Molinet Flores (UACh) and Dr. Carlos Chávez Rebolledo (UTalca).",
        },
      },
      {
        type: "p",
        text: {
          es: "La nueva configuración de líneas de investigación de INCAR² enfatiza el carácter de investigación aplicada y la búsqueda de soluciones integrales, interdisciplinarias y con fuerte base científica, puntualizó el Dr. Gallardo-Escárate.",
          en: "The new configuration of INCAR²'s research lines emphasizes the applied research character and the search for comprehensive, interdisciplinary solutions with a strong scientific basis, noted Dr. Gallardo-Escárate.",
        },
      },
      {
        type: "h",
        text: {
          es: "El Aporte del Centro FONDAP INCAR",
          en: "The Contribution of the FONDAP INCAR Center",
        },
      },
      {
        type: "p",
        text: {
          es: "Durante su primera década de funcionamiento, el Centro FONDAP INCAR ha realizado importantes contribuciones científicas, como la evaluación de la vulnerabilidad al cambio climático de la acuicultura de salmón y chorito, la elaboración de mapas de riesgo climático, y la secuenciación de los genomas del piojo de mar Caligus rogercresseyi y del chorito Mytilus chilensis. También ha generado información clave sobre patógenos bacterianos, como los causantes de la piscirickettsiosis, tenacibaculosis, renibacteriosis y flavobacteriosis, entre otros.",
          en: "During its first decade of operation, the FONDAP INCAR Center has made important scientific contributions, such as the assessment of the climate change vulnerability of salmon and mussel aquaculture, the development of climate risk maps, and the sequencing of the genomes of the sea louse Caligus rogercresseyi and the mussel Mytilus chilensis. It has also generated key information on bacterial pathogens, such as those causing piscirickettsiosis, tenacibaculosis, renibacteriosis and flavobacteriosis, among others.",
        },
      },
      {
        type: "p",
        text: {
          es: "En el ámbito ambiental, el FONDAP INCAR fue pionero en estudios sobre el impacto de pesticidas desparasitantes en el cultivo de salmones y en la definición de umbrales críticos para floraciones de algas nocivas (FAN) en el sur de Chile.",
          en: "In the environmental field, FONDAP INCAR was a pioneer in studies on the impact of antiparasitic pesticides in salmon farming and in the definition of critical thresholds for harmful algal blooms (HABs) in southern Chile.",
        },
      },
      {
        type: "p",
        text: {
          es: "En cuanto al desarrollo tecnológico, el centro ha logrado avances significativos con la creación de tres vacunas contra el piojo de mar y la bacteria Piscirickettsia salmonis, principales amenazas sanitarias de la acuicultura nacional. En mitilicultura, se han identificado factores ambientales que afectan el asentamiento exitoso de semillas de chorito.",
          en: "Regarding technological development, the center has achieved significant advances with the creation of three vaccines against the sea louse and the bacterium Piscirickettsia salmonis, the main sanitary threats of national aquaculture. In mussel farming, environmental factors affecting the successful settlement of mussel seed have been identified.",
        },
      },
      {
        type: "p",
        text: {
          es: "Para el Sub-Director, Dr. Ruben Avendaño-Herrera “este nuevo Centro desempeñará un papel crucial para la acuicultura chilena. Gracias al conocimiento acumulado durante los últimos 12 años y a los próximos cinco años de trabajo colaborativo con entidades públicas y privadas, contamos con la oportunidad de seguir fortaleciendo el capital humano e impulsar un crecimiento sostenible del sector mediante soluciones tecnológicas y normativas innovadoras. Esto permitirá consolidar una acuicultura más resiliente y responsable, con un enfoque que integra la dimensión social y ambiental.”",
          en: "For the Deputy Director, Dr. Ruben Avendaño-Herrera, “this new Center will play a crucial role for Chilean aquaculture. Thanks to the knowledge accumulated over the last 12 years and the next five years of collaborative work with public and private entities, we have the opportunity to continue strengthening human capital and to drive sustainable growth of the sector through innovative technological and regulatory solutions. This will make it possible to consolidate a more resilient and responsible aquaculture, with an approach that integrates the social and environmental dimension.”",
        },
      },
      {
        type: "p",
        text: {
          es: "Con esta adjudicación, el nuevo CIA INCAR² será un referente nacional en investigación aplicada para una acuicultura más sustentable, inclusiva y resiliente frente a los desafíos del futuro.",
          en: "With this award, the new CIA INCAR² will be a national benchmark in applied research for a more sustainable, inclusive and resilient aquaculture in the face of future challenges.",
        },
      },
    ],
  },
  {
    slug: "epiaqua-2026",
    title: {
      es: "EpiAqua 2026 reunirá a líderes globales en la UdeC para impulsar la investigación epigenómica en acuicultura",
      en: "EpiAqua 2026 to bring together global leaders at UdeC to advance epigenomic research in aquaculture",
    },
    date: "2025-12-10",
    image: "/images/noticias/epiaqua-2026.jpg",
    imageAlt: {
      es: "Afiche del curso EpiAqua 2026.",
      en: "EpiAqua 2026 course poster.",
    },
    sourceUrl:
      "https://centroincar.cl/2025/12/10/epiaqua-2026-reunira-a-lideres-globales-en-la-udec-para-impulsar-la-investigacion-epigenomica-en-acuicultura/",
    excerpt: {
      es: "Entre el 26 y 28 de enero de 2026, la segunda versión del Curso EpiAqua reunirá en la UdeC a expertos de EE.UU. y Chile en torno a la epigenómica aplicada al cultivo de moluscos y peces.",
      en: "From January 26 to 28, 2026, the second edition of the EpiAqua Course will gather US and Chilean experts at UdeC around epigenomics applied to the farming of molluscs and fish.",
    },
    content: [
      {
        type: "p",
        text: {
          es: "Durante tres días se realizarán charlas magistrales, talleres prácticos y una inédita jornada de mentoring, abordando los últimos avances en epigenómica aplicada al cultivo de moluscos y peces, con miras a un futuro más sostenible y resiliente para la acuicultura.",
          en: "Over three days there will be keynote lectures, hands-on workshops and an unprecedented mentoring session, addressing the latest advances in epigenomics applied to the farming of molluscs and fish, with a view to a more sustainable and resilient future for aquaculture.",
        },
      },
      {
        type: "p",
        text: {
          es: "Entre el 26 y 28 de enero 2026 se realizará la segunda versión del Curso EpiAqua, evento que durante tres días reunirá a expertos estadounidenses y chilenos en la Universidad de Concepción, para discutir el potencial de la epigenómica en la acuicultura, y esbozar futuras líneas de investigación en el cultivo de moluscos y peces.",
          en: "From January 26 to 28, 2026, the second edition of the EpiAqua Course will take place, an event that over three days will bring together US and Chilean experts at the Universidad de Concepción to discuss the potential of epigenomics in aquaculture and to outline future research lines in the farming of molluscs and fish.",
        },
      },
      {
        type: "p",
        text: {
          es: "El curso se prepara para una edición con la participación de destacados expertos internacionales y nacionales. La presente versión contará con presentaciones del Profesor Asociado de la University of Washington, Dr. Steven Roberts; el Profesor Emérito de la University of Wisconsin-Milwaukee, Dr. Frederick Goetz; el Académico del Departamento de Oceanografía de la Universidad de Concepción (UdeC) y Director del Centro de Investigación Aplicada recientemente adjudicado, INCAR², Dr. Cristian Gallardo Escárate, y los Académicos UdeC e Investigadores de INCAR², Dra. Valentina Valenzuela Muñoz y Dr. Diego Valenzuela Miranda.",
          en: "The course is preparing for an edition with the participation of distinguished international and national experts. This version will feature presentations by the Associate Professor of the University of Washington, Dr. Steven Roberts; the Professor Emeritus of the University of Wisconsin-Milwaukee, Dr. Frederick Goetz; the academic of the Department of Oceanography of the Universidad de Concepción (UdeC) and Director of the recently awarded Applied Research Center, INCAR², Dr. Cristian Gallardo Escárate, and the UdeC academics and INCAR² researchers, Dr. Valentina Valenzuela Muñoz and Dr. Diego Valenzuela Miranda.",
        },
      },
      {
        type: "p",
        text: {
          es: "“En esta oportunidad, el Dr. Steven Roberts abordará cómo los mecanismos epigenéticos permiten la adaptación al medio ambiente, mientras que el profesor emérito Rick Goetz explorará la dimensión evolutiva de la adaptación a través de su modelo de trucha del lago. Desde INCAR, presentaremos investigaciones sobre ostras, choritos y peces vinculados a la acuicultura, ampliando el espectro de especies y enfoques”, adelantó el Dr. Gallardo Escárate.",
          en: "“On this occasion, Dr. Steven Roberts will address how epigenetic mechanisms enable adaptation to the environment, while professor emeritus Rick Goetz will explore the evolutionary dimension of adaptation through his lake trout model. From INCAR, we will present research on oysters, mussels and fish linked to aquaculture, broadening the spectrum of species and approaches,” anticipated Dr. Gallardo Escárate.",
        },
      },
      {
        type: "p",
        text: {
          es: "Además de las cinco charlas magistrales habrá talleres prácticos de análisis de datos, diseñados especialmente para jóvenes científicos y estudiantes de posgrado que buscan adentrarse en el manejo de información epigenómica. En los denominados “Genomic Boot Camp”, los asistentes podrán explorar los últimos avances en epigenómica aplicada a la investigación en acuicultura en tópicos como Análisis del microbioma, Secuenciación Nanopore y Análisis epigenético, todo en el Centro de Biotecnología de la UdeC.",
          en: "In addition to the five keynote lectures there will be hands-on data-analysis workshops, designed especially for young scientists and graduate students seeking to enter the handling of epigenomic information. In the so-called “Genomic Boot Camp,” attendees will be able to explore the latest advances in epigenomics applied to aquaculture research on topics such as Microbiome Analysis, Nanopore Sequencing and Epigenetic Analysis, all at the UdeC Biotechnology Center.",
        },
      },
      {
        type: "p",
        text: {
          es: "Una de las novedades que trae EpiAqua 2026 es que durante el tercer y último día del curso, se realizará una jornada de Mentoring, en la que un estudiante será asesorado por los investigadores participantes con el objetivo de fortalecer el conocimiento adquirido durante los días previos y relevar la importancia de la colaboración para el desarrollo de un conocimiento científico de relevancia.",
          en: "One of the novelties EpiAqua 2026 brings is that during the third and last day of the course, a Mentoring session will be held, in which a student will be advised by the participating researchers with the aim of strengthening the knowledge acquired during the previous days and highlighting the importance of collaboration for the development of relevant scientific knowledge.",
        },
      },
      {
        type: "p",
        text: {
          es: "“La epigenómica está revolucionando la biología molecular y la acuicultura. Gracias a este enfoque, hoy es posible comprender cómo los organismos responden y se adaptan al ambiente con efectos directos en su reproducción, inmunidad y crecimiento. Desde olas de calor hasta la acidificación oceánica, los estresores ambientales dejan huella heredable en especies acuáticas, y las herramientas moleculares y bioinformáticas permiten descifrar cómo los modificadores epigenómicos influyen en su desarrollo. Este avance abre nuevas oportunidades para la selección de reproducción y el cultivo sostenible de peces y moluscos, marcando un antes y un después en la investigación científica aplicada al mar”, explica el Dr. Cristian Gallardo.",
          en: "“Epigenomics is revolutionizing molecular biology and aquaculture. Thanks to this approach, it is now possible to understand how organisms respond and adapt to the environment with direct effects on their reproduction, immunity and growth. From heat waves to ocean acidification, environmental stressors leave a heritable mark on aquatic species, and molecular and bioinformatic tools make it possible to decipher how epigenomic modifiers influence their development. This advance opens new opportunities for breeding selection and the sustainable farming of fish and molluscs, marking a before and after in scientific research applied to the sea,” explains Dr. Cristian Gallardo.",
        },
      },
      {
        type: "p",
        text: {
          es: "Debido a la restricción para acomodar a los asistentes durante las prácticas, EpiAqua contará con un máximo de 30 asistentes. La inscripción tiene un valor de 150 dólares e incluye la participación en todas las presentaciones orales y actividades del curso.",
          en: "Due to the constraint of accommodating attendees during the practical sessions, EpiAqua will have a maximum of 30 participants. Registration costs 150 dollars and includes participation in all oral presentations and course activities.",
        },
      },
      {
        type: "p",
        text: {
          es: "Reserva tu cupo e inscríbete, antes del 5 de enero de 2026. Para más información, contactarse con Claudia Fuentealba claufuentealba@udec.cl y/o Cristian Gallardo, crisgallardo@udec.cl",
          en: "Reserve your spot and register before January 5, 2026. For more information, contact Claudia Fuentealba claufuentealba@udec.cl and/or Cristian Gallardo, crisgallardo@udec.cl",
        },
      },
      {
        type: "p",
        text: {
          es: "Descarga el programa en pdf.",
          en: "Download the program in pdf.",
        },
      },
    ],
  },
  {
    slug: "ruben-avendano-editor-journal-fish-diseases",
    title: {
      es: "Dr. Ruben Avendaño-Herrera Editor Asociado de Journal of Fish Diseases",
      en: "Dr. Ruben Avendaño-Herrera, Associate Editor of the Journal of Fish Diseases",
    },
    date: "2026-01-08",
    image: "/images/noticias/ruben-avendano-jfd.jpeg",
    imageAlt: {
      es: "Dr. Rubén Avendaño-Herrera, Editor Asociado del Journal of Fish Diseases.",
      en: "Dr. Rubén Avendaño-Herrera, Associate Editor of the Journal of Fish Diseases.",
    },
    sourceUrl:
      "https://centroincar.cl/2026/01/08/dr-ruben-avendano-herrera-editor-asociado-de-journal-of-fish-diseases/",
    excerpt: {
      es: "El subdirector de INCAR², Dr. Rubén Avendaño-Herrera, fue invitado a integrar el Comité Editorial del Journal of Fish Diseases como Editor Asociado.",
      en: "INCAR²'s deputy director, Dr. Rubén Avendaño-Herrera, was invited to join the Editorial Board of the Journal of Fish Diseases as Associate Editor.",
    },
    content: [
      {
        type: "p",
        text: {
          es: "El académico de la Universidad Andrés Bello, investigador del Centro CIMARQ y subdirector del Centro de Investigación Aplicada (CIA) de INCAR², Dr. Rubén Avendaño-Herrera, fue invitado —en reconocimiento a su destacada trayectoria científica— a integrar el Comité Editorial del Journal of Fish Diseases, revista de la editorial Wiley-Blackwell, en calidad de Editor Asociado.",
          en: "The academic of the Universidad Andrés Bello, researcher of the CIMARQ Center and deputy director of the Applied Research Center (CIA) of INCAR², Dr. Rubén Avendaño-Herrera, was invited —in recognition of his outstanding scientific career— to join the Editorial Board of the Journal of Fish Diseases, a journal of the publisher Wiley-Blackwell, as Associate Editor.",
        },
      },
      {
        type: "p",
        text: {
          es: "El Dr. Avendaño-Herrera se incorpora a este comité junto a reconocidas científicas internacionales, entre ellas la Dra. Barbara Nowak, de la School of Aquaculture de la University of Tasmania (Australia), y la Dra. Heike Schmidt-Posthaus, del Centre for Fish and Wildlife Health, Department for Infectious Diseases and Pathobiology, Vetsuisse Faculty, University of Bern (Suiza).",
          en: "Dr. Avendaño-Herrera joins this committee alongside renowned international scientists, among them Dr. Barbara Nowak, of the School of Aquaculture of the University of Tasmania (Australia), and Dr. Heike Schmidt-Posthaus, of the Centre for Fish and Wildlife Health, Department for Infectious Diseases and Pathobiology, Vetsuisse Faculty, University of Bern (Switzerland).",
        },
      },
      {
        type: "p",
        text: {
          es: "Journal of Fish Diseases es la principal revista dedicada a las enfermedades de peces y moluscos, tanto silvestres como cultivados, posee una métricas sólida como un Factor de Impacto cercano a 2.2 (2025), clasificación Q1 en las categorías de Ciencias Acuáticas y Veterinaria (SJR ~0.614, CiteScore ~4.7), además de altas tasas de citación en artículos de acceso abierto.",
          en: "The Journal of Fish Diseases is the leading journal dedicated to the diseases of fish and molluscs, both wild and farmed; it holds solid metrics such as an Impact Factor close to 2.2 (2025), Q1 classification in the Aquatic Sciences and Veterinary categories (SJR ~0.614, CiteScore ~4.7), as well as high citation rates in open-access articles.",
        },
      },
      {
        type: "p",
        text: {
          es: "Al ser consultado, el Dr. Avendaño-Herrera señaló: “Es un honor haber sido considerado por el Journal of Fish Diseases como Editor Asociado, asumiendo una gran y valiosa responsabilidad en un área de la ciencia que no había explorado previamente. Cuando recibí el correo de invitación, se indicaba que no habían considerado a otro investigador para asumir esta función, lo que resultó especialmente gratificante, ya que estamos al otro lado del mundo y que se valore lo que hacemos y nuestra trayectoria siempre es motivo de satisfacción. Solo ver que me reconocen como Professor es una categoría que te dan tus pares y un reconocimiento que no pensé en alcanzar con 52 años”",
          en: "When consulted, Dr. Avendaño-Herrera stated: “It is an honor to have been considered by the Journal of Fish Diseases as Associate Editor, taking on a great and valuable responsibility in an area of science I had not previously explored. When I received the invitation email, it indicated that they had not considered another researcher to take on this role, which was especially gratifying, since we are on the other side of the world and having what we do and our career valued is always a source of satisfaction. Just seeing that they recognize me as Professor is a category that your peers grant you and a recognition I did not expect to reach at 52 years of age.”",
        },
      },
      {
        type: "p",
        text: {
          es: "El investigador señaló que “En la práctica, comencé a administrar artículos a mediados de diciembre de 2025, en un proceso que representa un aprendizaje continuo. Además, esta nueva tarea llega en un momento muy significativo, justo cuando estamos cerrando el año con la adjudicación del CIA INCAR², lo que resulta altamente motivante y desafiante de cara a 2026”.Las áreas de interés que la revista cubre regularmente incluyen Estudios de patógenos de peces, Fisiopatología, Métodos de diagnóstico, Terapia, Epidemiología y Descripciones de nuevas enfermedades.",
          en: "The researcher noted that “In practice, I began managing articles in mid-December 2025, in a process that represents continuous learning. In addition, this new task comes at a very significant moment, just as we are closing the year with the award of the CIA INCAR², which is highly motivating and challenging heading into 2026.” The areas of interest the journal regularly covers include Studies of fish pathogens, Pathophysiology, Diagnostic methods, Therapy, Epidemiology and Descriptions of new diseases.",
        },
      },
      {
        type: "p",
        text: {
          es: "Dentro de las tareas que desarrollará se encuentran la administración de artículos científicos en el área de las enfermedades bacterianas, la gestión de revisiones científicas y la evaluación de los comentarios de pares, entre otras funciones.",
          en: "Among the tasks he will carry out are the management of scientific articles in the area of bacterial diseases, the handling of scientific reviews and the assessment of peer comments, among other functions.",
        },
      },
      {
        type: "p",
        text: {
          es: "Al respecto, el científico señaló: “Es importante destacar que actualmente la ciencia se encuentra en alerta frente a las revistas de pago y aquellas que no lo son, siendo la evaluación por pares uno de los pilares fundamentales del sistema. En este contexto, el Journal of Fish Diseases es una de las revistas más clásicas y reconocidas en el área, con indicadores de gran relevancia dentro de las ciencias veterinarias”.",
          en: "In this regard, the scientist stated: “It is important to note that science is currently on alert regarding paid journals and those that are not, with peer review being one of the fundamental pillars of the system. In this context, the Journal of Fish Diseases is one of the most classic and recognized journals in the area, with highly relevant indicators within the veterinary sciences.”",
        },
      },
    ],
  },
  {
    slug: "doris-soto-congreso-futuro-mar",
    title: {
      es: "Dra. Doris Soto participará en side event del Congreso Futuro sobre el “Futuro del Mar”",
      en: "Dr. Doris Soto to take part in Congreso Futuro side event on the “Future of the Sea”",
    },
    date: "2026-01-12",
    image: "/images/noticias/doris-soto-futuro-mar.jpg",
    imageAlt: {
      es: "Banner del seminario Futuro del Mar en el marco de Congreso Futuro.",
      en: "Banner of the Future of the Sea seminar within Congreso Futuro.",
    },
    sourceUrl:
      "https://centroincar.cl/2026/01/12/dra-doris-soto-participara-en-side-event-del-congreso-futuro-sobre-el-futuro-del-mar/",
    excerpt: {
      es: "La investigadora principal del Centro INCAR, Dra. Doris Soto, participará en el seminario “Futuro del Mar”, side event de los 15 años de Congreso Futuro.",
      en: "INCAR's principal investigator, Dr. Doris Soto, will take part in the “Future of the Sea” seminar, a side event of Congreso Futuro's 15th anniversary.",
    },
    content: [
      {
        type: "p",
        text: {
          es: "La Investigadora Principal del Centro INCAR, Dra. Doris Soto Benavides, será parte del seminario “Futuro del Mar: Propuestas desde las costas chilenas”, un encuentro estratégico que se desarrollará como side event en el marco de los 15 años de Congreso Futuro. El evento que se realizará este jueves 15 de enero, en la sala Teatro de Cámara CEINA ((Arturo Prat 33, Santiago Centro) reunirá a actores clave como el Ministerio de Economía, Subpesca, Banco Mundial, Oceana y Fundación Chile, con el objetivo de reflexionar y proyectar políticas públicas hacia el año 2050. En la actividad, la Dra. Soto será parte de un panel en el se presentará el trabajo desarrollado por las mesas de Proyecta Chile 2050: «Acuicultura diversificada con énfasis en éspecies nativas y Algas y el futuro del mar», y que muestra los resultados de un esfuerzo colectivo e intersectorial orientado a construir una visión de largo plazo para el país. Durante la jornada que comienza a las 09.30 hrs. se abordarán proyectos, experiencias y propuestas en torno a temas estratégicos como Gobernanza de los océanos, Innovación y desarrollo tecnológicp, Cambio climático y sus impactos, Economía azul y Desarrollo territorial costero La participación de la Dra. Soto reafirma el compromiso del Centro INCAR con la generación de conocimiento y la construcción de propuestas que contribuyan a la sostenibilidad de los ecosistemas marinos y al fortalecimiento de la acuicultura en Chile. Conoce el programa de la actividad aquí. Inscripciones disponibles en el siguiente enlace: Formulario de inscripción.",
          en: "The Principal Investigator of the INCAR Center, Dr. Doris Soto Benavides, will be part of the seminar “Future of the Sea: Proposals from the Chilean coasts,” a strategic gathering that will take place as a side event within the framework of Congreso Futuro's 15th anniversary. The event, to be held this Thursday, January 15, at the Teatro de Cámara CEINA hall (Arturo Prat 33, Santiago Centro), will bring together key actors such as the Ministry of Economy, Subpesca, the World Bank, Oceana and Fundación Chile, with the aim of reflecting on and projecting public policies toward the year 2050. In the activity, Dr. Soto will be part of a panel in which the work developed by the Proyecta Chile 2050 roundtables will be presented: “Diversified aquaculture with an emphasis on native species, and Algae and the future of the sea,” which shows the results of a collective and intersectoral effort aimed at building a long-term vision for the country. During the day, which begins at 09:30, projects, experiences and proposals will be addressed around strategic topics such as Governance of the oceans, Innovation and technological development, Climate change and its impacts, Blue economy and Coastal territorial development. Dr. Soto's participation reaffirms the INCAR Center's commitment to the generation of knowledge and the construction of proposals that contribute to the sustainability of marine ecosystems and to the strengthening of aquaculture in Chile. Learn about the activity's program here. Registration available at the following link: Registration form.",
        },
      },
    ],
  },
];

/** Noticia por slug. */
export const getArticle = (slug: string): NewsArticle | undefined =>
  news.find((n) => n.slug === slug);

/** Noticias ordenadas por fecha (más recientes primero). */
export const getNewsSorted = (): NewsArticle[] =>
  [...news].sort((a, b) => +new Date(b.date) - +new Date(a.date));

/** Otras noticias recientes (excluye la actual), para el bloque "relacionadas". */
export const getRelatedNews = (article: NewsArticle, limit = 4): NewsArticle[] =>
  getNewsSorted()
    .filter((n) => n.slug !== article.slug)
    .slice(0, limit);
