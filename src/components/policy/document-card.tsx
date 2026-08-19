/**
 * Tarjeta de documento descargable, reutilizable por las pestañas "Asesoría
 * Técnica Parlamentaria" y "Otros Documentos". Comparte el lenguaje visual de
 * `PolicyBriefCard` (número/etiqueta fantasma, título, botón de descarga con el
 * peso) para que las tres pestañas se vean cohesionadas.
 *
 * `download` fuerza la descarga en vez de abrir el visor; el `aria-label`
 * describe el destino completo para que tenga sentido fuera de contexto.
 */
export interface DocumentCardItem {
  /** Número o texto de la esquina (marca de agua). Ej.: "03". */
  ghost?: string;
  /** Etiqueta pequeña sobre el título. Ej.: "Asesoría Parlamentaria 3". */
  eyebrow: string;
  title: string;
  /** Fecha en texto libre (opcional). */
  date?: string;
  description?: string;
  file: string;
  sizeMB: number;
  /** Descargas secundarias (anexos, resúmenes…). */
  extras?: { label: string; file: string; sizeMB: number }[];
}

export function DocumentCard({
  item,
  downloadLabel,
}: {
  item: DocumentCardItem;
  downloadLabel: string;
}) {
  return (
    <article className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-navy-800/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[var(--shadow-card-hover)]">
      {item.ghost ? (
        <span className="absolute right-5 top-4 text-5xl font-extrabold leading-none text-white/[0.06] transition-colors group-hover:text-teal/15">
          {item.ghost}
        </span>
      ) : null}

      <p className="eyebrow relative">{item.eyebrow}</p>

      <h3 className="relative text-fs-300 font-bold leading-snug text-white">
        {item.title}
      </h3>

      {item.date ? (
        <p className="relative -mt-1 text-fs-100 font-medium text-teal">
          {item.date}
        </p>
      ) : null}

      {item.description ? (
        <p className="relative text-fs-200 leading-relaxed text-white/70">
          {item.description}
        </p>
      ) : null}

      <div className="relative mt-auto flex flex-col gap-3 pt-3">
        <a
          href={item.file}
          download
          aria-label={`${downloadLabel}: ${item.title} (PDF, ${item.sizeMB} MB)`}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-teal px-4 py-2 text-fs-100 font-semibold text-white transition-colors hover:bg-teal-600"
        >
          <DownloadIcon />
          {downloadLabel}
          <span className="font-normal text-white/70">({item.sizeMB} MB)</span>
        </a>

        {item.extras?.length ? (
          <ul className="flex flex-col gap-1.5">
            {item.extras.map((extra) => (
              <li key={extra.file}>
                <a
                  href={extra.file}
                  download
                  aria-label={`${downloadLabel}: ${extra.label} (PDF, ${extra.sizeMB} MB)`}
                  className="inline-flex items-center gap-1.5 text-fs-100 font-semibold text-teal underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  <DownloadIcon />
                  {extra.label}
                  <span className="font-normal text-white/50">
                    ({extra.sizeMB} MB)
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

function DownloadIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
