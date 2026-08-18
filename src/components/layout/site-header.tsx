"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { primaryNavigation, type NavItem } from "@/content/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[1000] transition-all duration-300",
        scrolled || mobileOpen
          ? "bg-navy-900/95 shadow-lg backdrop-blur-md"
          : "bg-navy-900/40 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex min-h-20 max-w-[1500px] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-10">
        {/* Logos: INCAR² + lockup oficial MinCiencia · ANID (mismo del footer) */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 sm:gap-3"
          aria-label="INCAR² — Inicio"
        >
          <Image
            src="/images/logos/incar2-blanco.png"
            alt="INCAR²"
            width={900}
            height={360}
            priority
            className="h-9 w-auto sm:h-11"
          />
          <span className="h-8 w-px bg-white/20 sm:h-10" aria-hidden="true" />
          <Image
            src="/images/logos/minciencia-anid.png"
            alt="Ministerio de Ciencia, Tecnología, Conocimiento e Innovación · ANID — Agencia Nacional de Investigación y Desarrollo"
            width={800}
            height={432}
            priority
            className="h-10 w-auto sm:h-14"
          />
        </Link>

        {/* Navegación desktop (envuelve a varias filas si es necesario) */}
        <nav
          className="hidden items-center justify-end gap-x-0.5 xl:flex"
          aria-label="Principal"
        >
          {primaryNavigation.map((item) => (
            <DesktopNavItem key={item.key} item={item} t={t} />
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white xl:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <BurgerIcon open={mobileOpen} />
        </button>
      </div>

      {mobileOpen ? <MobileMenu t={t} /> : null}
    </header>
  );
}

function DesktopNavItem({
  item,
  t,
}: {
  item: NavItem;
  t: ReturnType<typeof useTranslations<"Nav">>;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const label = t(item.key);
  const linkClass =
    "rounded px-2.5 py-2 text-[0.7rem] font-semibold uppercase tracking-wide text-white/90 transition-colors hover:text-teal whitespace-nowrap";

  // Cierra el desplegable al cambiar de ruta (evita que quede "pegado" al navegar).
  useEffect(() => setOpen(false), [pathname]);

  if (!item.children) {
    return (
      <Link href={item.href ?? "/"} className={linkClass}>
        {label}
      </Link>
    );
  }

  // Pequeño retardo al salir para permitir mover el cursor hacia el submenú.
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      {item.href ? (
        <Link
          href={item.href}
          className={cn(linkClass, "inline-flex items-center gap-1")}
          aria-expanded={open}
          onClick={() => setOpen(false)}
        >
          {label}
          <Chevron className={open ? "rotate-180 transition-transform" : "transition-transform"} />
        </Link>
      ) : (
        <button
          type="button"
          className={cn(linkClass, "inline-flex items-center gap-1")}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {label}
          <Chevron className={open ? "rotate-180 transition-transform" : "transition-transform"} />
        </button>
      )}
      <ul
        className={cn(
          "absolute left-0 top-full min-w-72 rounded-xl border border-white/10 bg-navy-900/98 p-2 shadow-2xl backdrop-blur-md transition-all duration-200",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0",
        )}
      >
        {item.children.map((child) => (
          <li key={child.key}>
            <Link
              href={child.href ?? "/"}
              className="block rounded-lg px-3 py-2.5 text-fs-200 font-medium text-white/85 transition-colors hover:bg-teal/15 hover:text-teal"
              onClick={() => setOpen(false)}
            >
              {t(child.key)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileMenu({ t }: { t: ReturnType<typeof useTranslations<"Nav">> }) {
  return (
    <div
      id="mobile-menu"
      className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-white/10 bg-navy-900 px-5 pb-8 pt-2 xl:hidden"
    >
      <nav aria-label="Principal">
        <ul className="flex flex-col divide-y divide-white/5">
          {primaryNavigation.map((item) => (
            <li key={item.key} className="py-1">
              {item.children ? (
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-fs-200 font-semibold uppercase tracking-wide text-white">
                    {item.href ? (
                      <Link href={item.href} className="hover:text-teal">
                        {t(item.key)}
                      </Link>
                    ) : (
                      <span>{t(item.key)}</span>
                    )}
                    <Chevron className="transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="flex flex-col gap-1 pb-2 pl-3">
                    {item.children.map((child) => (
                      <li key={child.key}>
                        <Link
                          href={child.href ?? "/"}
                          className="block rounded-lg py-2.5 text-fs-200 text-white/80 hover:text-teal"
                        >
                          {t(child.key)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <Link
                  href={item.href ?? "/"}
                  className="block py-3 text-fs-200 font-semibold uppercase tracking-wide text-white hover:text-teal"
                >
                  {t(item.key)}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6">
        <LanguageSwitcher />
      </div>
    </div>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg className={cn("h-3 w-3", className)} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <line x1="3" y1={open ? "13" : "7"} x2="23" y2={open ? "13" : "7"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" style={{ transform: open ? "rotate(45deg)" : "none", transformOrigin: "center" }} />
      <line x1="3" y1="13" x2="23" y2="13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" style={{ opacity: open ? 0 : 1 }} />
      <line x1="3" y1={open ? "13" : "19"} x2="23" y2={open ? "13" : "19"} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" style={{ transform: open ? "rotate(-45deg)" : "none", transformOrigin: "center" }} />
    </svg>
  );
}
