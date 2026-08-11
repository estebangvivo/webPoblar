"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Home,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import {
  CONTACT_CHANNELS,
  type ContactChannel,
  whatsappUrl,
} from "@/lib/utils";

const icons: Record<ContactChannel, typeof Phone> = {
  general: MessageCircle,
  ventas: Home,
  obras: Building2,
};

const defaultMessages: Record<ContactChannel, string> = {
  general:
    "Hola Poblar! Me comunico desde la web por una consulta general.",
  ventas:
    "Hola Poblar! Me comunico desde la web por Ventas / Alquileres.",
  obras:
    "Hola Poblar! Me comunico desde la web por Obras / Emprendimientos.",
};

interface WhatsAppChooserProps {
  open: boolean;
  onClose: () => void;
  messages?: Partial<Record<ContactChannel, string>>;
}

export function WhatsAppChooser({
  open,
  onClose,
  messages,
}: WhatsAppChooserProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Cerrar"
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-chooser-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
              <div>
                <p className="text-xs font-semibold tracking-wide text-brand uppercase">
                  WhatsApp
                </p>
                <h2
                  id="whatsapp-chooser-title"
                  className="mt-1 text-lg font-bold text-navy"
                >
                  ¿Sobre qué consultás?
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Elegí el área y te redirigimos al número correcto.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar selector"
                className="rounded-lg p-1.5 text-muted transition hover:bg-slate-100 hover:text-navy"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2 p-4">
              {CONTACT_CHANNELS.map((channel) => {
                const Icon = icons[channel.id];
                const message =
                  messages?.[channel.id] ?? defaultMessages[channel.id];

                return (
                  <a
                    key={channel.id}
                    href={whatsappUrl(message, channel.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3.5 transition hover:border-brand hover:bg-orange-50"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-whatsapp/15 text-whatsapp">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-navy">
                        {channel.label}
                      </span>
                      <span className="block text-xs text-muted">
                        {channel.description}
                      </span>
                      <span className="mt-0.5 block text-xs font-medium text-brand">
                        {channel.phoneDisplay}
                      </span>
                    </span>
                    <Phone className="h-4 w-4 shrink-0 text-muted" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
