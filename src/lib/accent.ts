import type { LineAccent } from "@/content/research-lines";

/**
 * Clases Tailwind por color de acento de línea de investigación
 * (barra superior, "pill" y punto). Adaptadas al tema navy.
 */
export const lineAccentStyles: Record<
  LineAccent,
  { bar: string; pillBg: string; pillText: string; dot: string }
> = {
  teal: {
    bar: "bg-teal",
    pillBg: "bg-teal/15",
    pillText: "text-teal",
    dot: "bg-teal",
  },
  navy: {
    bar: "bg-sky-400",
    pillBg: "bg-sky-400/15",
    pillText: "text-sky-300",
    dot: "bg-sky-400",
  },
  peach: {
    bar: "bg-peach",
    pillBg: "bg-peach/15",
    pillText: "text-peach",
    dot: "bg-peach",
  },
  slate: {
    bar: "bg-violet-400",
    pillBg: "bg-violet-400/15",
    pillText: "text-violet-300",
    dot: "bg-violet-400",
  },
};
