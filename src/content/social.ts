/**
 * Canales oficiales de INCAR². `icon` selecciona el glifo dibujado en
 * `components/ui/social-links.tsx`; WikINCAR usa su propio logotipo (SVG) en
 * vez de un ícono de marca.
 */
export interface SocialLink {
  key: "facebook" | "instagram" | "linkedin" | "youtube" | "spotify" | "wikincar";
  label: string;
  url: string;
}

export const socialLinks: SocialLink[] = [
  {
    key: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com/CentroIncar/",
  },
  {
    key: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/centro_incar",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/centro-incar/",
  },
  {
    key: "youtube",
    label: "YouTube",
    url: "https://www.youtube.com/channel/UCfqKyOIZOFDSuuGQcGEBhcg",
  },
  {
    key: "spotify",
    label: "Spotify",
    url: "https://open.spotify.com/show/5AacSUZfvzxDXYp6lZsGRU",
  },
  {
    key: "wikincar",
    label: "WikINCAR",
    url: "https://wikincar.cl",
  },
];
