import Image from "next/image";
import { socialLinks, type SocialLink } from "@/content/social";
import { cn } from "@/lib/utils";

/**
 * Canales oficiales de INCAR². Se usa en el cierre del home (variante "band",
 * con etiqueta visible) y en el pie de página (variante "compact", solo íconos).
 *
 * WikINCAR no es una red social sino la enciclopedia del centro, por eso entra
 * con su propio logotipo. El SVG se sirve sin pasar por el optimizador de
 * imágenes (`unoptimized`) para no tener que habilitar `dangerouslyAllowSVG`
 * globalmente, que abriría la puerta a SVG subidos desde el panel.
 */
export function SocialLinks({
  variant = "band",
  className,
}: {
  variant?: "band" | "compact" | "header";
  className?: string;
}) {
  const isBand = variant === "band";
  const isHeader = variant === "header";

  return (
    <ul
      className={cn(
        "flex flex-wrap items-center gap-3",
        isBand ? "justify-center gap-4" : "gap-2.5",
        isHeader && "flex-nowrap gap-1.5",
        className,
      )}
    >
      {socialLinks.map((link) => {
        // WikINCAR no es una red social: se muestra con su logotipo completo en
        // una píldora, no encerrado en un círculo donde quedaría ilegible.
        const isWiki = link.key === "wikincar";
        return (
          <li key={link.key}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className={cn(
                // Calipso sólido: los canales del centro deben resaltar sobre el
                // navy, no pasar como un ícono más (pedido de INCAR²).
                "flex items-center justify-center rounded-full bg-teal text-white shadow-[0_2px_10px_rgba(36,163,160,0.35)] transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-[0_6px_18px_rgba(36,163,160,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal motion-reduce:transform-none",
                isBand ? "h-14" : isHeader ? "h-9" : "h-10",
                isWiki
                  ? isBand
                    ? "px-6"
                    : isHeader
                      ? "px-3"
                      : "px-4"
                  : isBand
                    ? "w-14"
                    : isHeader
                      ? "w-9"
                      : "w-10",
              )}
            >
              <SocialIcon link={link} size={isBand ? "lg" : "sm"} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function SocialIcon({ link, size }: { link: SocialLink; size: "lg" | "sm" }) {
  if (link.key === "wikincar") {
    return (
      <Image
        src="/images/logos/wikincar.svg"
        alt=""
        width={87}
        height={30}
        unoptimized
        className={size === "lg" ? "h-6 w-auto" : "h-[18px] w-auto"}
      />
    );
  }

  const glyph = size === "lg" ? "h-6 w-6" : "h-5 w-5";
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={glyph} aria-hidden="true">
      {link.key === "facebook" ? (
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
      ) : null}
      {link.key === "instagram" ? (
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.24A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4Zm0 10.88A4.28 4.28 0 1 1 16.28 12 4.28 4.28 0 0 1 12 16.28Zm6.86-11.1a1.54 1.54 0 1 1-1.54-1.54 1.54 1.54 0 0 1 1.54 1.54Z" />
      ) : null}
      {link.key === "youtube" ? (
        <path d="M21.58 7.19a2.51 2.51 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42a2.51 2.51 0 0 0-1.77 1.77A26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .42 4.81 2.51 2.51 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.51 2.51 0 0 0 1.77-1.77A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.42-4.81ZM10 15.02V8.98L15.2 12Z" />
      ) : null}
      {link.key === "linkedin" ? (
        <path d="M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5ZM3 9h4v12H3V9Zm7 0h3.8v1.65h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.75V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.19 1.45-2.19 2.96V21h-4V9Z" />
      ) : null}
      {link.key === "spotify" ? (
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.44a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 1 1-.33-1.46c4.57-1.04 8.5-.59 11.66 1.34.35.22.46.68.25 1.03Zm1.23-2.75a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.54-1.79c4.37-1.32 9.79-.68 13.5 1.59.44.27.58.85.3 1.29Zm.11-2.86C14.07 8.53 7.9 8.32 4.2 9.44a1.12 1.12 0 1 1-.65-2.15c4.25-1.29 11.07-1.04 15.43 1.55a1.12 1.12 0 1 1-1.15 1.93Z" />
      ) : null}
    </svg>
  );
}
