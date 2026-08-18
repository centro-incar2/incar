import { cn } from "@/lib/utils";

/**
 * Placeholder "FOTOGRAFÍA" que reproduce los espacios de imagen aún sin contenido
 * del sitio original (se reemplazarán por medios reales desde el panel en Fase 3).
 */
export function PhotoPlaceholder({
  label = "FOTOGRAFÍA",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-navy-950/60",
        className,
      )}
    >
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-white/25">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="8.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 17l5-4 4 3 3-2 4 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-fs-100 font-semibold uppercase tracking-[0.2em] text-white/35">
        {label}
      </span>
    </div>
  );
}
