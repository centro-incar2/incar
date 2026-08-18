import { cn } from "@/lib/utils";

/** Contenedor centrado con ancho máximo y padding responsive consistente. */
export function Container({
  children,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", className)}
    >
      {children}
    </Component>
  );
}
