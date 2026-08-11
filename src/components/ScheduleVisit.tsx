"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, X } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

interface ScheduleVisitProps {
  propertyTitle: string;
  propertyAddress: string;
  propertyNeighborhood: string;
}

export function ScheduleVisit({
  propertyTitle,
  propertyAddress,
  propertyNeighborhood,
}: ScheduleVisitProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const date = String(data.get("date") || "");
    const time = String(data.get("time") || "");
    const comments = String(data.get("comments") || "");

    const message = [
      "Hola Poblar! Quiero agendar una visita.",
      `Propiedad: ${propertyTitle}`,
      `Dirección: ${propertyAddress}, ${propertyNeighborhood}`,
      `Nombre: ${name}`,
      `Teléfono: ${phone}`,
      date ? `Fecha preferida: ${date}` : "",
      time ? `Horario preferido: ${time}` : "",
      comments ? `Comentarios: ${comments}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappUrl(message, "ventas"), "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-deep"
      >
        <CalendarClock className="h-5 w-5" />
        Agendar visita
      </button>

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
              onClick={() => setOpen(false)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="schedule-visit-title"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-brand uppercase">
                    Visitas
                  </p>
                  <h2
                    id="schedule-visit-title"
                    className="mt-1 text-lg font-bold text-navy"
                  >
                    Agendar visita
                  </h2>
                  <p className="mt-1 text-sm text-muted line-clamp-2">
                    {propertyTitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="rounded-lg p-1.5 text-muted transition hover:bg-slate-100 hover:text-navy"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 p-5">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-muted">
                    Nombre
                  </span>
                  <input
                    name="name"
                    required
                    placeholder="Tu nombre"
                    className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-muted">
                    Teléfono / WhatsApp
                  </span>
                  <input
                    name="phone"
                    required
                    type="tel"
                    placeholder="Ej. 353 563-7888"
                    className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-muted">
                      Fecha preferida
                    </span>
                    <input
                      name="date"
                      type="date"
                      required
                      className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-muted">
                      Horario preferido
                    </span>
                    <select
                      name="time"
                      required
                      className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                    >
                      <option value="">Seleccionar</option>
                      <option value="Mañana (9 a 12)">Mañana (9 a 12)</option>
                      <option value="Mediodía (12 a 15)">
                        Mediodía (12 a 15)
                      </option>
                      <option value="Tarde (15 a 18)">Tarde (15 a 18)</option>
                      <option value="A coordinar">A coordinar</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-muted">
                    Comentarios
                  </span>
                  <textarea
                    name="comments"
                    rows={3}
                    placeholder="Preferencias o consultas adicionales..."
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </label>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-brand py-3 text-sm font-bold text-white transition hover:bg-brand-deep"
                >
                  Confirmar por WhatsApp
                </button>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
