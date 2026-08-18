import type { Locale } from "@/i18n/routing";
import { researchLines, type ResearchLine } from "@/content/research-lines";

/**
 * Modelo de datos de Publicaciones (capa de contenido).
 * Cada publicación se asocia a una línea de investigación (`line`), que define
 * su etiqueta y color de acento y alimenta el filtro "Línea de Investigación".
 * En Fase 3 esta misma forma la administrará el panel (Payload).
 */
export interface Publication {
  slug: string;
  /** Título científico (habitualmente en inglés, igual en ambos idiomas). */
  title: string;
  authors: string;
  /** Revista / referencia bibliográfica. */
  journal: string;
  year: number;
  /** Fecha ISO para datos estructurados y ordenamiento. */
  date: string;
  /** Slug de la línea de investigación (ver research-lines.ts). */
  line: string;
  /** Enlace al artículo completo (DOI). Si existe y no hay `content`, la tarjeta enlaza al exterior. */
  url?: string;
  /** Sin uso en el sitio: las publicaciones se identifican con el ícono de su línea. */
  image?: string;
  /** Resumen y contenido enriquecido: opcionales (los administrará Payload en Fase 3). */
  summary?: Record<Locale, string>;
  content?: Record<Locale, string[]>;
  featured?: boolean;
}

/**
 * Publicaciones reales de INCAR² (papers 2026). Datos bibliográficos verbatim.
 * `content` (EN) = abstract publicado (verbatim); `content.es` = traducción fiel del
 * abstract; `summary` = síntesis breve derivada del abstract. Fuente de los abstracts:
 * CrossRef (Journal of Fish Diseases), OpenAlex (Biological Invasions) y Semantic Scholar
 * (Marine Pollution Bulletin). `url` = DOI, ofrecido en el detalle como "artículo original".
 * La `line` es una asignación temática (el documento no la especifica): confirmar con INCAR.
 */
export const publications: Publication[] = [
  {
    slug: "origin-invasive-sea-anemone-metridium-senile",
    title:
      "Origin of the invasive sea anemone Metridium senile in the southern cone of South America",
    authors: "Astorga, M.P., Pen, I., Glon, H., Häussermann V., Molinet C.",
    journal: "Biological Invasions 28, 144 (2026)",
    year: 2026,
    date: "2026-06-01",
    line: "interacciones-sustentables",
    url: "https://doi.org/10.1007/s10530-026-03854-y",
    summary: {
      es: "Análisis genómicos rastrean el origen y la dispersión de la anémona invasora Metridium senile en el sur de Sudamérica, revelando múltiples introducciones regionalmente distintas, muy probablemente mediadas por el tráfico marítimo.",
      en: "Genomic analyses trace the origin and dispersal of the invasive sea anemone Metridium senile in southern South America, revealing multiple, regionally distinct introductions most likely mediated by maritime traffic.",
    },
    content: {
      es: [
        "La anémona de mar Metridium senile fue reportada por primera vez en la Patagonia central en 2005, donde ya era abundante, y desde entonces se ha expandido ampliamente a lo largo de la región de fiordos de Chile. Su proliferación ha generado impactos ecológicos significativos, en particular por el desplazamiento de las comunidades bentónicas nativas y el sobrecrecimiento sobre bancos de erizos de mar de importancia comercial. A pesar de su rápida propagación, las vías de introducción y el origen biogeográfico de M. senile en el hemisferio sur siguen siendo inciertos.",
        "En este trabajo examinamos datos de secuencias nucleares (ITS) y mitocondriales (COI, COIII) junto con SNP a escala genómica obtenidos con el baitset hexacoral-v2-actiniaria, para investigar el origen y la historia de dispersión de las poblaciones de M. senile de la Patagonia chilena y la costa argentina. Los análisis filogenéticos y de estructura poblacional resolvieron tres clados bien respaldados, correspondientes a los principales linajes del Pacífico y del Atlántico, y una separación significativa dentro de un clado diferenció a las poblaciones del Atlántico nororiental de las del Atlántico noroccidental. Las muestras chilenas se agruparon predominantemente en los grupos del Pacífico Norte, mientras que las muestras argentinas estuvieron estrechamente relacionadas con poblaciones del Atlántico Norte, lo que indica una vía de introducción independiente.",
        "La Computación Bayesiana Aproximada (ABC) respalda un origen en el Atlántico nororiental para la población argentina y una única invasión de las aguas chilenas desde el Pacífico Norte, probablemente mediante el transporte en aguas de lastre, con una propagación tipo «stepping stone» hacia el sur a lo largo de la región. Nuestros resultados aportan evidencia de múltiples introducciones, regionalmente distintas, de M. senile en el sur de Sudamérica, muy probablemente mediadas por el tráfico marítimo. Estos hallazgos resaltan el alto potencial invasor de la especie y subrayan la necesidad de un monitoreo dirigido para mitigar una mayor propagación en el hemisferio sur.",
      ],
      en: [
        "The sea anemone Metridium senile was first reported from Central Patagonia in 2005, where it was already abundant, and has since expanded widely along the Chilean fjord region. Its proliferation has generated significant ecological impacts, particularly through the displacement of native benthic assemblages and the overgrowth of commercially important sea urchin beds. Despite its rapid spread, the introduction pathways and biogeographic origin of M. senile in the Southern Hemisphere remain uncertain.",
        "Here, we examined both nuclear (ITS) and mitochondrial (COI, COIII) sequence data with genome-wide SNPs obtained using the hexacoral-v2-actiniaria baitset to investigate the origin and dispersal history of M. senile populations from Chilean Patagonia and Argentine coast. Phylogenetic and population structure analyses resolved three well-supported clades corresponding to major Pacific and Atlantic lineages and a significant split within one clade differentiated Northeastern Atlantic from Northwestern Atlantic populations. Chilean samples clustered predominantly within North Pacific groups while Argentinean samples were closely related to North Atlantic populations, indicating an independent introduction pathway.",
        "Approximate Bayesian Computation (ABC) supports the Northeastern Atlantic source of the Argentinean population and one invasion of Chilean waters from the North Pacific, likely via ballast water transport, with stepping stone spread southward throughout the region. Our results provide evidence for multiple, regionally distinct introductions of M. senile into southern South America, most likely mediated by maritime traffic. These findings highlight the species' high invasive potential and emphasize the need for targeted monitoring to mitigate further spread across the Southern Hemisphere.",
      ],
    },
  },
  {
    slug: "co-occurrence-bloom-lipophilic-toxic-producers-chilean-fjord",
    title:
      "Co-occurrence bloom of lipophilic toxic-producers in a hotspot Chilean fjord: Fine-scale distribution, toxins and fate in shellfish",
    authors:
      "Patricio A. Díaz, Gonzalo Álvarez, Iván Pérez-Santos, Michael Araya, Lauren Ross, Ángela M. Baldrich, Osvaldo Artal, Daniel Varela, Sergio A. Rosales, Camila Schwerter, Camilo Rodríguez-Villegas, Valentina Iturra, Manuel Díaz, Bárbara Cantarero, Rosa I. Figueroa",
    journal: "Marine Pollution Bulletin. Volume 227. 119449",
    year: 2026,
    date: "2026-06-01",
    line: "impactos-en-ecosistemas",
    url: "https://doi.org/10.1016/j.marpolbul.2026.119449",
    summary: {
      es: "Una intensa floración estival de tres dinoflagelados productores de toxinas lipofílicas en el fiordo Puyuhuapi revela cómo la estratificación del fiordo determina la distribución a fina escala y la acumulación de toxinas en mariscos de importancia comercial.",
      en: "An intense summer bloom of three lipophilic toxin-producing dinoflagellates in Puyuhuapi Fjord reveals how fjord stratification drives the fine-scale distribution and accumulation of toxins in commercially important shellfish.",
    },
    content: {
      es: [
        "Durante el verano austral de 2019 se registró una intensa floración simultánea de tres dinoflagelados productores de toxinas lipofílicas —Dinophysis acuta, D. acuminata y Protoceratium reticulatum— en el fiordo Puyuhuapi, un sistema fuertemente estratificado del noroeste de la Patagonia, Chile. Este estudio investigó la distribución vertical a fina escala de estas tres especies tóxicas, sus toxinas lipofílicas asociadas en el plancton y su acumulación en mariscos de importancia comercial.",
        "Mediante perfiles hidrográficos, análisis de microfitoplancton, cuantificación de toxinas por UHPLC-MS/MS y modelación numérica de la circulación, caracterizamos las interacciones físicas y biológicas que favorecen la acumulación de toxinas. Los resultados mostraron nichos ecológicos distintos para cada especie y toxina, congruentes con la columna de agua estratificada, con las mayores concentraciones de células y toxinas en capas delgadas cerca de la cabecera del seno Magdalena. El ácido okadaico (OA), la dinofisistoxina-1 (DTX-1), la pectenotoxina-2sa (PTX-2sa) y las yessotoxinas (YTX) alcanzaron valores máximos en Mytilus chilensis y Aulacomya atra, superando ampliamente los umbrales regulatorios.",
        "La distribución espacial de las toxinas en el plancton y en los mariscos reflejó la estructura física del fiordo, con una acumulación vinculada a una mezcla vertical débil y a un alto tiempo de residencia del agua. Estos hallazgos resaltan perfiles de toxinas y potenciales de acumulación específicos de cada especie entre los bivalvos filtradores, con implicancias para la inocuidad de los alimentos marinos y la sostenibilidad de la acuicultura. El estudio subraya la necesidad de incorporar la dinámica hidrográfica local en los sistemas de alerta temprana de floraciones algales nocivas (FAN) y respalda el desarrollo de modelos predictivos para gestionar los brotes de toxinas en ecosistemas de fiordos vulnerables bajo escenarios de cambio climático.",
      ],
      en: [
        "During the austral summer of 2019, an intense co-occurring bloom of three lipophilic toxin-producing dinoflagellates—Dinophysis acuta, D. acuminata, and Protoceratium reticulatum—was recorded in Puyuhuapi Fjord, a strongly stratified system in northwest Patagonia, Chile. This study investigated the fine-scale vertical distribution of these three toxic species, their associated lipophilic toxins in plankton, and their accumulation in commercially important shellfish.",
        "Using hydrographic profiling, microphytoplankton analysis, UHPLC-MS/MS toxin quantification, and numerical modeling of circulation, we characterized the physical and biological interactions that promote toxin accumulation. The results showed distinct ecological niches for each species and toxin congruent with the stratified water column, with the highest cell and toxin concentrations occurring in thin layers near the head of the Magdalena Sound. Okadaic acid (OA), dinophysistoxin-1 (DTX-1), pectenotoxin-2sa (PTX-2sa), and yessotoxins (YTX) reached peak values in Mytilus chilensis and Aulacomya atra, far exceeding regulatory thresholds.",
        "The spatial distribution of toxins in plankton and shellfish mirrored the physical structure of the fjord, with accumulation linked to weak vertical mixing and high water residence time. These findings highlight species-specific toxin profiles and accumulation potential among filter-feeding bivalves, with implications for seafood safety and sustainability of aquaculture. This study underscores the need to incorporate local hydrographic dynamics into early warning systems for harmful algal blooms (HABs) and supports the development of predictive models for managing toxin outbreaks in vulnerable fjord ecosystems under climate change scenarios.",
      ],
    },
  },
  {
    slug: "florfenicol-biofilm-antibiotic-resistance-piscirickettsia-salmonis",
    title:
      "Sub-Inhibitory Concentrations of Florfenicol Modulate the Expression of Biofilm Formation and Antibiotic Resistance-Associated Genes in Biofilm-Embedded Piscirickettsia salmonis",
    authors:
      "Carla Estefanía Escalona, Natacha Santibañez, Marcos Cortés, Vicente Arriagada, Pamela Ruiz, Derie Fuentes, Alex Romero, Cristian Oliver",
    journal: "Journal of Fish Diseases e70166",
    year: 2026,
    date: "2026-03-16",
    line: "enfermedades-y-resistencia-antimicrobiana",
    url: "https://doi.org/10.1111/jfd.70166",
    summary: {
      es: "In vitro, concentraciones subinhibitorias (sub-MIC) de florfenicol modulan significativamente la expresión de genes de formación de biopelícula y de resistencia a antibióticos en Piscirickettsia salmonis embebida en biopelícula, evidenciando un costo oculto del uso extensivo de antibióticos en la acuicultura.",
      en: "In vitro, sub-inhibitory (sub-MIC) concentrations of florfenicol significantly modulate the expression of biofilm-formation and antibiotic-resistance genes in biofilm-embedded Piscirickettsia salmonis, revealing a hidden cost of the extensive use of antibiotics in aquaculture.",
    },
    content: {
      es: [
        "La piscirickettsiosis es la enfermedad bacteriana más prevalente que afecta a la acuicultura chilena y responsable de la mayor parte de la mortalidad en salmónidos. Actualmente, en la industria acuícola chilena se emplean grandes cantidades de antibióticos, predominantemente florfenicol, y se ha demostrado que las concentraciones sub-MIC de este antibiótico —similares a las que ocurren en el ambiente marino— inducen la formación de biopelícula tanto en superficies bióticas como abióticas, lo que genera preocupación por la aparición de cepas bacterianas resistentes a los antibióticos. Por ello, el objetivo de este estudio fue evaluar si las concentraciones sub-MIC de florfenicol in vitro inducen la expresión de genes asociados a la formación de biopelícula y a la resistencia a antibióticos en P. salmonis embebida en biopelícula.",
        "Curiosamente, los análisis in vitro mostraron que las diluciones sub-MIC del antibiótico modularon significativamente la expresión de la bomba de eflujo acrAB y de los sistemas de dos componentes cpxAR y qseBC, así como de los genes asociados a la resistencia a antibióticos tclor/tflor y t.flor en los aislados de P. salmonis embebidos en biopelícula evaluados. Así, este estudio destaca las consecuencias negativas del uso extensivo de antibióticos en la acuicultura, que puede promover la formación de biopelícula en patógenos bacterianos marinos, facilitando potencialmente la propagación de genes de resistencia entre distintas especies bacterianas en el ambiente acuático e incrementando el riesgo de reinfección dentro de los sistemas de cultivo.",
      ],
      en: [
        "Piscirickettsiosis is the most prevalent bacterial disease affecting Chilean aquaculture and responsible for the majority of mortality in salmonids. Currently, large quantities of antibiotics, predominantly florfenicol, are used in the Chilean aquaculture industry, and sub-MIC concentrations of this antibiotic, similar to what occurs in the marine environment, have been shown to induce biofilm formation on both biotic and abiotic surfaces, raising concerns about the emergence of antibiotic-resistant bacterial strains. Thus, the aim of this study was to evaluate whether in vitro sub-MIC concentrations of florfenicol induce the expression of genes associated with biofilm formation and antibiotic resistance in the biofilm-embedded P. salmonis.",
        "Interestingly, in vitro analyses showed that sub-MIC dilutions of antibiotic significantly modulated the expression of an efflux pump acrAB and the two-component systems cpxAR, and qseBC, as well as the antibiotic resistance-associated genes tclor/tflor and t.flor in the biofilm-embedded P. salmonis isolates tested. Thus, this study highlights the negative consequences of the extensive use of antibiotics in aquaculture, which can promote biofilm formation in marine bacterial pathogens, potentially facilitating the spread of resistance genes among different bacterial species in the aquatic environment and increasing the risk of reinfection within culture systems.",
      ],
    },
  },
  {
    slug: "tenacibaculum-finnmarkense-chilean-isolates-farmed-salmonids",
    title:
      "Identification, Characterisation, and Pathogenic Potential of Chilean Isolates of Tenacibaculum finnmarkense Recovered From Coinfection in Farmed Salmonids",
    authors:
      "Valencia-Soler, V., M. Saldarriaga-Córdoba, and R. Avendaño-Herrera",
    journal: "Journal of Fish Diseases e70149",
    year: 2026,
    date: "2026-02-21",
    line: "enfermedades-y-resistencia-antimicrobiana",
    url: "https://doi.org/10.1111/jfd.70149",
    summary: {
      es: "Se caracterizan 33 aislados chilenos del patógeno emergente Tenacibaculum finnmarkense, revelando el predominio del genomovar ulcerans y su potencial patogénico variable en salmónidos de cultivo.",
      en: "Thirty-three Chilean isolates of the emerging pathogen Tenacibaculum finnmarkense are characterised, revealing the predominance of the genomovar ulcerans and its varying pathogenic potential in farmed salmonids.",
    },
    content: {
      es: [
        "La industria salmonicultora chilena enfrenta importantes desafíos derivados de enfermedades bacterianas, en particular la tenacibaculosis, causada principalmente por Tenacibaculum maritimum y T. dicentrarchi. Sin embargo, recientemente se identificó a T. finnmarkense como un patógeno emergente. Esta bacteria había sido descrita previamente solo en Noruega, donde se reportaron dos genomovares (finnmarkense y ulcerans). El presente estudio se centra en la caracterización fenotípica y genética de aislados recuperados de salmónidos en Chile, con el fin de dilucidar la diversidad intraespecífica, identificar el genomovar dominante y evaluar el potencial patogénico.",
        "Se analizaron treinta y tres aislados mediante análisis filogenéticos basados en los genes 16S rRNA, fusA y atpA, junto con caracterización fenotípica, genotipificación por RAPD y ERIC-PCR, y análisis genómico comparativo. Todos los aislados se confirmaron como T. finnmarkense y se agruparon dentro del genomovar ulcerans, lo que fue respaldado además por el análisis filogenético de genoma completo de dos aislados representativos. La caracterización fenotípica fue consistente con la descripción general de T. finnmarkense de estudios previos, aunque se observaron algunas variaciones metabólicas en comparación con la homogeneidad reportada en los aislados noruegos. Los análisis genotípicos también revelaron variabilidad genética entre los aislados estudiados.",
        "La patogenicidad se evaluó en salmón del Atlántico (Salmo salar) mediante pruebas de desafío por inmersión en condiciones controladas, utilizando aislados obtenidos de salmón coho (Oncorhynchus kisutch; SC-T20) y salmón del Atlántico (PB-L5). Los postulados de Koch se confirmaron únicamente con el aislado SC-T20, que causó una mortalidad significativa (57,14 %) en las infecciones experimentales. Este estudio destaca el predominio del genomovar ulcerans en la salmonicultura chilena y su potencial patogénico variable. Los hallazgos subrayan la necesidad de monitorear los impactos de la tenacibaculosis y de identificar con precisión el agente etiológico específico responsable de las lesiones cutáneas, particularmente en casos de coinfección.",
      ],
      en: [
        "The Chilean salmon farming industry faces major challenges from bacterial diseases, notably tenacibaculosis, which is primarily caused by Tenacibaculum maritimum and T. dicentrarchi. However, T. finnmarkense was recently identified as an emerging pathogen. This bacterium was previously described only in Norway, where two genomovars (finnmarkense and ulcerans) were reported. The present study focuses on the phenotypic and genetic characterisation of isolates recovered from salmonids in Chile to elucidate intraspecific diversity, identify the dominant genomovar, and evaluate pathogenic potential.",
        "Thirty-three isolates were analysed through phylogenetic analyses based on the 16S rRNA, fusA, and atpA genes, along with phenotypic characterisation, genotyping by RAPD and ERIC-PCR, and comparative genome analysis. All isolates were confirmed as T. finnmarkense and grouped within the genomovar ulcerans, which was further supported by whole-genome phylogenetic analysis of two representative isolates. Phenotypic characterisation was consistent with the general description of T. finnmarkense from previous studies, although some metabolic variations were observed compared to the homogeneity reported in Norwegian isolates. Genotypic analyses also revealed genetic variability among the presently studied isolates.",
        "Pathogenicity was assessed in Atlantic salmon (Salmo salar) through immersion challenge tests under controlled conditions, using isolates obtained from Coho salmon (Oncorhynchus kisutch; SC-T20) and Atlantic salmon (PB-L5). Koch's postulates were confirmed only with the SC-T20 isolate, which caused significant mortality (57.14%) in experimental infections. This study highlights the predominance of genomovar ulcerans in Chilean salmon farming and its varying pathogenic potential. The findings underscore the need to monitor the impacts of tenacibaculosis and to accurately identify the specific etiological agent responsible for skin lesions, particularly in cases of coinfection.",
      ],
    },
  },
];

export const getPublication = (slug: string) =>
  publications.find((p) => p.slug === slug);

/** Publicaciones relacionadas: misma línea de investigación, excluye la actual. */
export const getRelated = (pub: Publication, limit = 3) =>
  publications
    .filter((p) => p.line === pub.line && p.slug !== pub.slug)
    .slice(0, limit);

/** Años presentes en las publicaciones (descendente) para el filtro "Año". */
export const getPublicationYears = (): number[] =>
  Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a);

/** Líneas de investigación que tienen al menos una publicación (por número). */
export const getUsedResearchLines = (): ResearchLine[] => {
  const used = new Set(publications.map((p) => p.line));
  return researchLines.filter((line) => used.has(line.slug));
};
