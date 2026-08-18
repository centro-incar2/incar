import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Avatar de una persona del centro. Cuando INCAR² todavía no ha entregado la
 * fotografía se muestra el isotipo del centro (decisión del equipo: nunca
 * iniciales), de modo que la tarjeta no pierde presencia visual.
 *
 * `variant` distingue las dos formas que usa el sitio: círculo en las grillas
 * (integrantes, gobernanza, equipo de gestión) y cuadrado redondeado en la ficha
 * individual. El círculo crece con el ancho de pantalla —112 px en móvil hasta
 * 144 px en escritorio— a pedido de INCAR², que pidió retratos más grandes.
 */
export function PersonAvatar({
  photo,
  name,
  variant = "circle",
  priority = false,
}: {
  photo: string | null;
  name: string;
  variant?: "circle" | "panel";
  priority?: boolean;
}) {
  const isCircle = variant === "circle";
  const frame = isCircle
    ? "relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-2 ring-teal/30 sm:h-32 sm:w-32 lg:h-36 lg:w-36"
    : "relative mx-auto aspect-square w-52 overflow-hidden rounded-2xl ring-1 ring-white/10 lg:mx-0 lg:w-full";

  if (photo) {
    return (
      <span className={frame}>
        <Image
          src={photo}
          alt={name}
          fill
          sizes={isCircle ? "(max-width: 1024px) 128px, 144px" : "(max-width: 1024px) 208px, 280px"}
          className="object-cover"
          priority={priority}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(frame, "flex items-center justify-center bg-teal/15")}
      // El isotipo es decorativo: el nombre ya está en el texto de la tarjeta.
      aria-hidden="true"
    >
      <Image
        src="/images/logos/incar2-isotipo-blanco.png"
        alt=""
        width={320}
        height={320}
        className={isCircle ? "h-14 w-14 opacity-70 lg:h-16 lg:w-16" : "h-24 w-24 opacity-70"}
      />
    </span>
  );
}
