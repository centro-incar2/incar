import Image from "next/image";

export interface LogoItem {
  slug: string;
  name: string;
}

/**
 * Rejilla de logotipos de instituciones sobre tarjeta blanca.
 *
 * Los archivos de `public/images/collab/` son recortes sobre fondo blanco, por
 * eso cada grupo se presenta dentro de un panel claro en vez de directamente
 * sobre el navy del sitio.
 */
export function LogoGrid({
  logos,
  columns = 4,
}: {
  logos: LogoItem[];
  columns?: 3 | 4 | 5;
}) {
  const cols = {
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-3 lg:grid-cols-4",
    5: "sm:grid-cols-3 lg:grid-cols-5",
  }[columns];
  return (
    <div className="rounded-2xl bg-white p-6 lg:p-9">
      <ul className={`grid grid-cols-2 gap-x-6 gap-y-8 ${cols}`}>
        {logos.map((logo, i) => (
          <li
            key={logo.slug}
            data-reveal
            data-reveal-delay={(i % 4) + 1}
            className="flex items-center justify-center"
          >
            {/* Caja de alto fijo: `object-contain` deja cada logotipo completo
                sea cual sea su proporción, sin recortes ni deformación. */}
            <Image
              src={`/images/collab/${logo.slug}.png`}
              alt={logo.name}
              title={logo.name}
              width={440}
              height={260}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px"
              className="h-20 w-auto max-w-full object-contain lg:h-24"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
