import { cn } from "@/lib/utils";

/**
 * Rejilla de tarjetas numeradas (01, 02, …) usada en las páginas de investigación.
 * `tone="teal"` invierte los colores para las secciones de fondo teal.
 */
export function NumberedGrid({
  items,
  tone = "navy",
}: {
  items: string[];
  tone?: "navy" | "teal";
}) {
  const isTeal = tone === "teal";
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <li
          key={index}
          data-reveal
          data-reveal-delay={(index % 3) + 1}
          className={cn(
            "flex flex-col gap-3 rounded-2xl border p-6",
            isTeal
              ? "border-white/25 bg-white/5"
              : "border-white/10 bg-navy-800/60",
          )}
        >
          <span
            className={cn(
              "text-fs-700 font-extrabold leading-none tabular-nums",
              isTeal ? "text-white" : "text-teal",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <p
            className={cn(
              "text-fs-200 leading-relaxed",
              isTeal ? "text-white/90" : "text-white/75",
            )}
          >
            {item}
          </p>
        </li>
      ))}
    </ol>
  );
}
