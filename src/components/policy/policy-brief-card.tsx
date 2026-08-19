import type { CmsDocument } from "@/lib/cms/documents";

/**
 * Tarjeta de Policy Brief: número destacado, título verbatim y descarga directa
 * del PDF. Se indica el peso del archivo porque varios superan los 10 MB.
 *
 * El enlace lleva `download` para que el navegador descargue en vez de abrir el
 * visor, con el nombre canónico del archivo (`downloadName`): el almacenamiento
 * renombró varios PDF y sin esto el brief 21 se guardaba como el 22. Y
 * `aria-label` propio para que el destino sea claro fuera de contexto.
 */
export function PolicyBriefCard({
  brief,
  labels,
}: {
  brief: CmsDocument;
  labels: {
    brief: string;
    download: string;
    downloadSummary: string;
    downloadAria: string;
  };
}) {
  const number = String(brief.number).padStart(2, "0");

  return (
    <article className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-navy-800/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[var(--shadow-card-hover)]">
      <span className="absolute right-5 top-4 text-5xl font-extrabold leading-none text-white/[0.06] transition-colors group-hover:text-teal/15">
        {number}
      </span>

      <p className="eyebrow relative">
        {labels.brief} {number}
      </p>

      <h3 className="relative text-fs-300 font-bold leading-snug text-white">
        {brief.title}
      </h3>

      <div className="relative mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-3">
        <a
          href={brief.file}
          download={brief.downloadName ?? ""}
          aria-label={`${labels.downloadAria} ${number}: ${brief.title} (PDF, ${brief.sizeMB} MB)`}
          className="inline-flex items-center gap-2 rounded-full bg-teal px-4 py-2 text-fs-100 font-semibold text-white transition-colors hover:bg-teal-600"
        >
          <DownloadIcon />
          {labels.download}
          <span className="font-normal text-white/70">
            ({brief.sizeMB} MB)
          </span>
        </a>

        {brief.summaryFile ? (
          <a
            href={brief.summaryFile}
            download={brief.summaryDownloadName ?? ""}
            className="inline-flex items-center gap-1.5 text-fs-100 font-semibold text-teal underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {labels.downloadSummary}
          </a>
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
