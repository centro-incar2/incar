import type { Locale } from "@/i18n/routing";

/**
 * Equipo de gestión de INCAR², según el documento oficial "Equipo de Gestión"
 * (nombres y cargos) y las fichas de perfil que INCAR² fue entregando después.
 *
 * `photo` apunta a `public/images/gestion/`, salvo el Director y el Director
 * Alterno, que reutilizan su fotografía de investigador. Quien no tiene
 * fotografía entregada queda con `photo: null` y se muestra con el isotipo de
 * INCAR² (ver `PersonAvatar`).
 *
 * Quien tiene `slug` y `bio` estrena página propia en `/equipo-de-gestion/[slug]`;
 * el resto se muestra solo como tarjeta, a la espera de su ficha.
 */
export interface ManagementLinks {
  linkedin?: string;
  researchgate?: string;
  orcid?: string;
  scholar?: string;
}

export interface ManagementMember {
  name: string;
  role: Record<Locale, string>;
  photo: string | null;
  /** Ficha de investigador, cuando la persona también integra una línea. */
  memberSlug?: string;
  /** Identificador de su página propia; solo si INCAR² entregó su perfil. */
  slug?: string;
  email?: string;
  links?: ManagementLinks;
  bio?: Record<Locale, string>;
  degrees?: Record<Locale, string[]>;
  projects?: Record<Locale, string[]>;
}

export interface ManagementGroup {
  /** Clave de traducción del título del grupo (namespace Management). */
  labelKey: "directionTitle" | "executiveTitle";
  members: ManagementMember[];
}

export const managementGroups: ManagementGroup[] = [
  {
    labelKey: "directionTitle",
    members: [
      {
        name: "Dr. Cristian Gallardo Escárate",
        role: { es: "Director Centro INCAR²", en: "Director INCAR² Center" },
        photo: "/images/equipo/cristian-gallardo.jpg",
        memberSlug: "cristian-gallardo",
      },
      {
        name: "Dr. Ruben Avendaño Herrera",
        role: {
          es: "Director Alterno Centro INCAR²",
          en: "Deputy Director INCAR² Center",
        },
        photo: "/images/equipo/ruben-avendano.jpg",
        memberSlug: "ruben-avendano",
      },
      {
        name: "Claudia Fuentealba Benavides",
        role: { es: "Secretaria Dirección", en: "Directorate Secretary" },
        photo: "/images/gestion/claudia-fuentealba.jpg",
      },
    ],
  },
  {
    labelKey: "executiveTitle",
    members: [
      {
        name: "Maximiliano Batarseh Rojas",
        role: { es: "Director Ejecutivo", en: "Executive Director" },
        photo: "/images/gestion/maximiliano-batarseh.jpg",
        slug: "maximiliano-batarseh",
        email: "mbatarseh@udec.cl",
        links: {
          linkedin: "https://www.linkedin.com/in/maximiliano-batarseh-rojas/",
        },
        bio: {
          es: "Maximiliano Batarseh Rojas es Ingeniero Civil Químico de la Universidad de Concepción, con experiencia en dirección de proyectos de I+D+i financiados por CORFO y ANID. Ha liderado equipos multidisciplinarios en el desarrollo de productos biotecnológicos, gestionando tanto los aspectos técnicos como los administrativos, presupuestarios y de vinculación con el entorno productivo.\n\nSu trayectoria incluye roles en la academia y la empresa privada, lo que le ha permitido desenvolverse con naturalidad en los distintos frentes que exige la gestión de un centro de investigación: formulación y evaluación de proyectos, obtención de financiamiento competitivo, articulación con la industria y cumplimiento de marcos regulatorios.\n\nComplementa su formación técnica con estudios en negociación, gestión de proyectos y liderazgo, y cuenta con dominio del inglés a nivel profesional.",
          en: "Maximiliano Batarseh Rojas is a Chemical Engineer from the University of Concepción, with experience in the management of R&D&I projects funded by CORFO and ANID. He has led multidisciplinary teams in the development of biotechnological products, overseeing both technical and administrative aspects, including budgeting and engagement with the productive sector.\n\nHis career spans roles in both academia and the private sector, allowing him to operate effectively across the various domains required in the management of a research center: project formulation and evaluation, acquisition of competitive funding, industry collaboration, and compliance with regulatory frameworks.\n\nHe complements his technical background with training in negotiation, project management, and leadership, and has professional proficiency in English.",
        },
        degrees: { es: [], en: [] },
        projects: { es: [], en: [] },
      },
      {
        name: "Pía Zepeda Novoa",
        role: {
          es: "Encargada Transferencia Tecnológica",
          en: "Head of Technology Transfer",
        },
        photo: "/images/gestion/pia-zepeda.jpg",
      },
      {
        name: "Pablo Carrasco Olivares",
        role: {
          es: "Encargado de Comunicaciones y Vinculación",
          en: "Head of Communications and Outreach",
        },
        photo: "/images/gestion/pablo-carrasco.jpg",
        slug: "pablo-carrasco",
        email: "pabloicarrasco@udec.cl",
        links: {
          linkedin: "https://www.linkedin.com/in/pablo-carrasco-olivares-b55a42225/",
          researchgate: "https://www.researchgate.net/profile/Pablo-Carrasco-2/research",
        },
        bio: {
          es: "Con una destacada trayectoria en gestión y divulgación científica, entre 2009 y 2020 se desempeñó como coordinador de proyectos del Programa de Investigación Marina de Excelencia (PIMEX) de la Facultad de Ciencias Naturales y Oceanográficas de la misma casa de estudios. En 2013 se integró al Centro Interdisciplinario para la Investigación Acuícola (INCAR) como Encargado de Vinculación con la Sociedad, impulsando la acuicultura sustentable en comunidades costeras.\n\nActualmente, es el Encargado de Comunicaciones y Vinculación del Centro de Excelencia CIA-ANID “Centro Interdisciplinario para la Investigación Acuícola - Investigación Aplicada” (INCAR²) de la Universidad de Concepción. Desde este rol, lidera iniciativas de divulgación científica y proyectos de transferencia tecnológica orientados al desarrollo local. Cuenta con una amplia experiencia en gestión de proyectos científicos e iniciativas para el desarrollo costero desde un enfoque multidimensional, destacando también la generación de modelos sustentables para la acuicultura de pequeña escala y la pesca artesanal (regiones del Maule y Biobío), el fortalecimiento estratégico de liceos técnicos acuícolas, y la gestión de Áreas Marinas Protegidas.",
          en: "With a distinguished career in scientific management and outreach, between 2009 and 2020 he served as project coordinator of the Marine Research Program of Excellence (PIMEX) at the Faculty of Natural and Oceanographic Sciences of the same university. In 2013 he joined the Interdisciplinary Center for Aquaculture Research (INCAR) as Head of Outreach, promoting sustainable aquaculture in coastal communities.\n\nHe is currently Head of Communications and Outreach at the CIA-ANID Center of Excellence “Interdisciplinary Center for Aquaculture Research - Applied Research” (INCAR²) of the University of Concepción. In this role he leads science outreach initiatives and technology transfer projects aimed at local development. He has broad experience in managing scientific projects and coastal development initiatives from a multidimensional perspective, including the creation of sustainable models for small-scale aquaculture and artisanal fisheries (Maule and Biobío regions), the strategic strengthening of technical aquaculture schools, and the management of Marine Protected Areas.",
        },
        degrees: {
          es: [
            "2002. Licenciado en Biología Marina. Universidad de Concepción, Chile.",
            "2003. Biólogo Marino titulado por la Universidad de Concepción, Chile.",
            "2022. Magister en Gestión Integrada: Medio Ambiente, Riesgos Laborales y Responsabilidad Social. Universidad de Concepción.",
            "2018. Diplomado en Habilidades Directivas e Innovación para la Región del Biobío. Universidad de Concepción.",
            "2008. Diplomado en Gestión Sostenible. Leuphana Universidad de Lüneburg y agencia de Cooperación Alemana INWENT.",
          ],
          en: [
            "2002. Bachelor's Degree in Marine Biology. Universidad de Concepción, Chile.",
            "2003. Marine Biologist, Universidad de Concepción, Chile.",
            "2022. Master's Degree in Integrated Management: Environment, Occupational Risks and Social Responsibility. Universidad de Concepción.",
            "2018. Postgraduate Diploma in Management Skills and Innovation for the Biobío Region. Universidad de Concepción.",
            "2008. Postgraduate Diploma in Sustainable Management. Leuphana University of Lüneburg and the German Cooperation Agency INWENT.",
          ],
        },
        projects: {
          es: [
            "2022-2024: Coordinador Programa del Fondo de Innovación para Competitividad (FIC), Gobierno Regional de Ñuble “Potenciando el Desarrollo Sostenible de la Costa de Ñuble: gestión integrada, encadenamiento productivo y conservación del patrimonio natural (Costa Ñuble Sustentable)” ejecutado por la Universidad de Concepción, Campus Chillán.",
            "2022-2024: Profesional componente Desarrollo Pesca Artesanal en el Programa del Fondo de Innovación para Competitividad (FIC), Gobierno Regional de Biobío “Aumento de la Competitividad de las Caletas Pesqueras del Biobío” ejecutado por la Universidad de Concepción.",
            "2008-2021: Jefe de Operaciones e Investigador Proyecto “Biodiversidad y Actividad Pesquera en la Zona de Pesca Bajos de Mela, Región del Biobío”. Programa de Investigación Marina de Excelencia PIMEX. Facultad de Ciencias Naturales y Oceanográficas, Universidad de Concepción.",
            "2019-2021: Co-director Proyecto “Acuicultura Circular en Caleta Tubul”, financiado por CORFO Región del Biobío en la línea de Innovación Social.",
            "2008-2020: Jefe de Operaciones e Investigador Proyecto “Ecología y biología del lobo marino común, Otaria flavescens, en el Santuario Islote Lobería de Cobquecura”. Programa de Investigación Marina de Excelencia PIMEX. Facultad de Ciencias Naturales y Oceanográficas, Universidad de Concepción.",
            "2016-2017: Director Proyecto “Explotación Acuícola Sustentable de Pequeña Escala, en el Borde Costero de Zonas Rezagadas, de la Región del Maule”, financiado por el “Programa Gestión Territorial para Zonas Rezagadas en la Región del Maule” y SERCOTEC-Región del Maule.",
            "2015-2016: Director Proyecto “Estudio para el fortalecimiento Integrado y Sostenible de la Acuicultura de Pequeña Escala (APE) en la Región del Maule”, ejecutado con financiamiento de la Corporación Regional de Desarrollo Productivo (CRDP-Maule).",
            "2014-2015: Director Proyecto Explora-CONICYT “Acuiponía: Biotecnología para la Sustentabilidad” ejecutado en conjunto con la Red de Liceos Acuícolas de la Región del Biobío, y financiado por el programa EXPLORA-CONICYT.",
          ],
          en: [],
        },
      },
      {
        name: "Diana Montesino Campos",
        role: {
          es: "Encargada de Finanzas y Administración",
          en: "Head of Finance and Administration",
        },
        photo: "/images/gestion/diana-montesino.jpg",
      },
      {
        name: "Álvaro Gallardo Escárate",
        role: {
          es: "Encargado de Hatchery Estación Dichato",
          en: "Head of Hatchery, Dichato Station",
        },
        photo: "/images/gestion/alvaro-gallardo.jpg",
      },
      {
        name: "Edgardo Vera Cárdenas",
        role: { es: "Periodista", en: "Journalist" },
        photo: "/images/gestion/edgardo-vera.jpg",
        slug: "edgardo-vera",
        email: "edgarvera@udec.cl",
        links: {
          linkedin: "https://www.linkedin.com/in/edgardo-vera-cardenas-39b855140/",
        },
        bio: {
          es: "Edgardo Vera Cárdenas es Licenciado en Comunicación Social y Periodista titulado por la Universidad del Desarrollo (Concepción, Chile). Cuenta con una sólida trayectoria en comunicación institucional y gestión de iniciativas culturales, destacando su participación en proyectos como el Festival Internacional BioBioCine.\n\nEn 2018 se integró al Programa de Outreach de INCAR, donde ha liderado diversas iniciativas orientadas a fortalecer el vínculo entre la ciencia y la sociedad, promoviendo la educación, la comunicación estratégica y la divulgación del conocimiento.\n\nComo periodista del Centro Interdisciplinario para la Investigación Acuícola - Investigación Aplicada (INCAR²), aporta su experiencia en comunicación científica para acercar la investigación a distintos públicos, contribuyendo a la difusión del impacto de la acuicultura sostenible mediante contenidos accesibles, rigurosos y de alto valor informativo.",
          en: "Edgardo Vera Cárdenas holds a Bachelor's Degree in Social Communication and a professional degree in Journalism from Universidad del Desarrollo (Concepción, Chile). He has extensive experience in institutional communications and the management of cultural initiatives, including his participation in projects such as the BioBioCine International Film Festival.\n\nIn 2018, he joined INCAR's Outreach Program, where he has led a variety of initiatives aimed at strengthening the connection between science and society through education, strategic communication, and knowledge dissemination.\n\nAs a journalist at the Interdisciplinary Center for Aquaculture Research - Applied Research (INCAR²), he contributes his expertise in science communication to make research accessible to diverse audiences, promoting the impact of sustainable aquaculture through accessible, rigorous, and high-value informational content.",
        },
        degrees: {
          es: [
            "2001: Licenciado en Comunicación Social, Universidad del Desarrollo, Concepción, Chile.",
            "2002: Periodista, Universidad del Desarrollo, Concepción, Chile.",
          ],
          en: [
            "2001: Bachelor's Degree in Social Communication, Universidad del Desarrollo, Concepción, Chile.",
            "2002: Journalist, Universidad del Desarrollo, Concepción, Chile.",
          ],
        },
        projects: {
          es: [
            "2025 Encargado de Comunicaciones Sea Lice Conference 2025.",
            "2022 Co-Coordinador Nacional de Comunicaciones para CEODOS Chile - Tara en Chile.",
          ],
          en: [
            "2025: Communications Manager, Sea Lice Conference 2025.",
            "2022: National Co-Coordinator of Communications for CEODOS Chile – Tara in Chile.",
          ],
        },
      },
      {
        name: "Rodrigo Espinoza Zenteno",
        role: { es: "Asistente Administrativo", en: "Administrative Assistant" },
        photo: "/images/gestion/rodrigo-espinoza.jpg",
      },
      {
        name: "Susana Llanca Viguera",
        role: {
          es: "Secretaria Dirección Ejecutiva",
          en: "Executive Directorate Secretary",
        },
        photo: "/images/gestion/susana-llanca.jpg",
      },
      {
        name: "Esmeralda Salazar Rodríguez",
        role: {
          es: "Secretaria Ejecutiva UACh-INCAR²",
          en: "Executive Secretary UACh-INCAR²",
        },
        photo: "/images/gestion/esmeralda-salazar.jpg",
      },
    ],
  },
];

/** Integrantes con ficha propia (los que INCAR² ya entregó con biografía). */
export const managementProfiles = managementGroups
  .flatMap((group) => group.members)
  .filter((member): member is ManagementMember & { slug: string } =>
    Boolean(member.slug && member.bio),
  );

export const getManagementMember = (slug: string) =>
  managementProfiles.find((member) => member.slug === slug);
