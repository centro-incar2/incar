import Image from "next/image";
import { LinkButton } from "./button";
import type { StaticPathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Hero interior dividido (patrón del sitio): imagen a un lado —a sangre completa,
 * pegada al borde de la pantalla— y contenido al otro, sobre fondo navy. Deja
 * espacio superior para el header fijo. El título admite acento en teal.
 */
export function SplitHero({
  image,
  imageAlt = "",
  imageSide = "right",
  eyebrow,
  title,
  titleAccent,
  lead,
  cta,
}: {
  image: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  lead?: string;
  cta?: { label: string; href: StaticPathname };
}) {
  return (
    <section className="bg-navy pt-20">
      <div className="grid items-stretch lg:grid-cols-2">
        <div
          data-reveal
          data-reveal-x={imageSide === "right" ? "right" : "left"}
          className={cn(
            "relative min-h-[300px] lg:min-h-[480px]",
            imageSide === "right" ? "lg:order-last" : "lg:order-first",
          )}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div
          className={cn(
            "flex flex-col justify-center gap-5 px-5 py-12 sm:px-8 lg:py-20",
            imageSide === "right" ? "lg:pl-14 lg:pr-10" : "lg:pr-14 lg:pl-10",
          )}
        >
          <div className="w-full max-w-xl">
            {eyebrow ? (
              <p data-reveal className="eyebrow mb-4">
                {eyebrow}
              </p>
            ) : null}
            <h1
              data-reveal
              data-reveal-delay="1"
              className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl"
            >
              {title}
              {titleAccent ? (
                <>
                  {" "}
                  <span className="text-teal">{titleAccent}</span>
                </>
              ) : null}
            </h1>
            {lead ? (
              <p
                data-reveal
                data-reveal-delay="2"
                className="mt-5 text-fs-300 leading-relaxed text-white/80"
              >
                {lead}
              </p>
            ) : null}
            {cta ? (
              <div data-reveal data-reveal-delay="3" className="mt-6">
                <LinkButton href={cta.href} variant="primary" size="md">
                  {cta.label}
                </LinkButton>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
