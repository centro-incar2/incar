import type { ComponentType } from "react";

/**
 * Un ícono por línea de investigación (RL1–RL8), usado como identificador
 * visual de cada publicación en lugar de una fotografía.
 *
 * Todos comparten el mismo trazo (viewBox 24, stroke 1.6, sin relleno) y heredan
 * el color del contenedor, para que convivan con el resto de la iconografía del
 * sitio y con el color de acento de cada línea.
 */
type IconProps = { className?: string };

/** RL1 — Nuevas vacunas para peces: jeringa. */
function VaccineIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15.5 4.5l4 4M17.5 6.5L20 4M13 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16.2 7.8l-8 8-3.7 1.2-.8 2.5 1.5 1.5 2.5-.8 1.2-3.7 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11 10l1.6 1.6M9 12l1.6 1.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** RL2 — Enfermedades y resistencia antimicrobiana: bacteria bajo escudo. */
function PathogenIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="11" cy="13" rx="5.5" ry="3.5" transform="rotate(-35 11 13)" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.5 9.5L6 8m2 6.5L6 15m6.5-8L13.5 5m2.5 5.5L18 10M9.5 17l-.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M18.5 3.5l3 1.2v2.6c0 1.7-1.2 3.2-3 3.7-1.8-.5-3-2-3-3.7V4.7l3-1.2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/** RL3 — Soluciones ómicas: hélice de ADN. */
function OmicsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3c0 5 10 6 10 9s-10 4-10 9M17 3c0 5-10 6-10 9s10 4 10 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8.5 6.5h7M7.5 17.5h9M9.5 9.5h5M9.5 14.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** RL4 — Estrés y bienestar animal: pez con pulso vital. */
function WelfareIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12c2.5-3.5 6-5.2 9-5.2s5.2 1.4 6.5 3.2c-1.3 1.8-3.5 3.2-6.5 3.2S5.5 15.5 3 12z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M18.5 10l2.5-2.3v8.6L18.5 14" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="8" cy="10.8" r="0.9" fill="currentColor" />
      <path d="M4 19h3l1.5-2.5L10 20l1.5-3h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** RL5 — Impactos en ecosistemas: fondo marino con algas. */
function EcosystemIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 6.5c1.7-1.4 3.3-1.4 5 0s3.3 1.4 5 0 3.3-1.4 5 0 3.3 1.4 5 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 21c-1.5-2.5-1.5-5.5 0-8.5.6 1.2 1.6 1.9 2.5 2.2-.4 2.4-1.3 4.5-2.5 6.3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M15 21c1.2-2 1.6-4.2 1.2-6.5-.9.4-1.9.4-2.8 0-.5 2.3-.1 4.6 1.6 6.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3 21h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** RL6 — Resiliencia de la acuicultura: escudo con brote. */
function ResilienceIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.5l7.5 3v6c0 4.4-3.1 8.4-7.5 10-4.4-1.6-7.5-5.6-7.5-10v-6l7.5-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 16.5v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 12.5c-2 0-3-1-3-3 2 0 3 1 3 3zm0 0c2 0 3-1 3-3-2 0-3 1-3 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/** RL7 — Interacciones sustentables: acuicultura, pesquerías y ecosistemas. */
function InteractionsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="16" r="4.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/** RL8 — Impactos socioeconómicos: barras con tendencia. */
function SocioeconomicIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 20.5h17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6.5 20.5v-5m4.5 5v-8.5m4.5 8.5V13m4.5 7.5V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 10l4.5-3.5L13 8.5 20 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 3.5h-3.5M20 3.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Ícono por `slug` de línea de investigación. */
const ICONS: Record<string, ComponentType<IconProps>> = {
  "nuevas-vacunas-para-peces": VaccineIcon,
  "enfermedades-y-resistencia-antimicrobiana": PathogenIcon,
  "soluciones-omicas": OmicsIcon,
  "estres-y-bienestar-animal": WelfareIcon,
  "impactos-en-ecosistemas": EcosystemIcon,
  "resiliencia-de-la-acuicultura": ResilienceIcon,
  "interacciones-sustentables": InteractionsIcon,
  "impactos-socioeconomicos": SocioeconomicIcon,
};

/**
 * Ícono de la línea de investigación indicada. Si el slug no corresponde a
 * ninguna línea conocida, cae en el de ómicas (genérico de investigación).
 */
export function LineIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Icon = ICONS[slug] ?? OmicsIcon;
  return <Icon className={className} />;
}
