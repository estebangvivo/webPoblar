"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { cn, whatsappUrl } from "@/lib/utils";

const links = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#propiedades", label: "Propiedades" },
  { href: "/#emprendimientos", label: "Emprendimientos" },
  { href: "/#tasaciones", label: "Tasaciones" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const solid = scrolled || pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "bg-navy/95 shadow-lg shadow-navy/30 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <a href="/#inicio" aria-label="Poblar — Inicio">
          <Logo size={48} showWordmark priority className="sm:gap-3" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-200 transition hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl(
              "Hola Poblar! Quiero publicar / consultar por mi inmueble.",
              "ventas"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-deep sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            Publicá tu Inmueble
          </a>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex rounded-lg p-2 text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy/98 px-4 py-4 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-brand"
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappUrl(
                "Hola Poblar! Quiero publicar / consultar por mi inmueble.",
                "ventas"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Publicá tu Inmueble
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
