"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { WhatsAppChooser } from "@/components/WhatsAppChooser";
import { CONTACT, CONTACT_CHANNELS } from "@/lib/utils";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M14 13.5h2.5l.5-3H14v-1.5c0-.9.2-1.5 1.5-1.5H17V4.5h-2.2C12.1 4.5 11 6 11 8.3V10.5H9v3h2V20h3v-6.5z" />
    </svg>
  );
}

const footerLinks = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#propiedades", label: "Propiedades" },
  { href: "/#emprendimientos", label: "Emprendimientos" },
  { href: "/#tasaciones", label: "Tasaciones" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

export function Footer() {
  const [whatsappOpen, setWhatsappOpen] = useState(false);

  return (
    <footer id="contacto" className="bg-navy text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <a href="/#inicio" aria-label="Poblar — Inicio">
              <Logo size={52} showWordmark />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Asesoramiento inmobiliario integral en Villa María y la región.
              Compra, venta, alquileres y emprendimientos.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wide text-white uppercase">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wide text-white uppercase">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  {CONTACT.address}
                  <br />
                  {CONTACT.city}
                </span>
              </li>
              {CONTACT_CHANNELS.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={`tel:${channel.phoneTel}`}
                    className="inline-flex items-start gap-2.5 transition hover:text-brand"
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>
                      <span className="block text-xs text-slate-400">
                        {channel.label}
                      </span>
                      <span className="font-medium text-slate-200">
                        {channel.phoneDisplay}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2.5 transition hover:text-brand"
                >
                  <Mail className="h-4 w-4 text-brand" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wide text-white uppercase">
              Redes
            </h3>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/poblarvm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @poblarvm"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white transition hover:bg-brand"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/inmobiliariapoblar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Inmobiliaria Poblar"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white transition hover:bg-brand"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
            <button
              type="button"
              onClick={() => setWhatsappOpen(true)}
              className="mt-5 inline-flex rounded-lg bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Escribinos por WhatsApp
            </button>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-500 sm:text-left">
          © {new Date().getFullYear()} Poblar Negocios Inmobiliarios. Villa
          María, Córdoba. Todos los derechos reservados.
        </div>
      </div>

      <WhatsAppChooser
        open={whatsappOpen}
        onClose={() => setWhatsappOpen(false)}
      />
    </footer>
  );
}
