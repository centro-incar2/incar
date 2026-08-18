import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-3 focus-visible:outline-teal focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal text-white shadow-[0_6px_20px_rgba(36,163,160,0.35)] hover:bg-teal-600 hover:-translate-y-0.5",
  outline:
    "border-2 border-white/70 text-white hover:bg-white hover:text-navy-900",
  ghost: "text-teal hover:text-teal-700 hover:gap-3",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-fs-200",
  lg: "px-7 py-3.5 text-fs-300",
};

function classesFor(variant: Variant, size: Size, className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

/** Botón enlace interno (usa el Link con conocimiento de idioma). */
export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={classesFor(variant, size, className)} {...props} />;
}

/** Botón enlace externo (target _blank seguro). */
export function ExternalLinkButton({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; size?: Size }) {
  return (
    <a
      className={classesFor(variant, size, className)}
      rel="noopener noreferrer"
      {...props}
    />
  );
}
