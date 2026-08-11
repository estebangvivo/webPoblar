"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, X } from "lucide-react";
import {
  bookVisit,
  fetchVisitAvailability,
  type VisitSlotDay,
} from "@/lib/simpleinmo";
import { cn } from "@/lib/utils";

interface ScheduleVisitProps {
  propertySlug: string;
  propertyTitle: string;
}

export function ScheduleVisit({
  propertySlug,
  propertyTitle,
}: ScheduleVisitProps) {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState<VisitSlotDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [dateKey, setDateKey] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    async function load() {
      setLoading(true);
      setLoadError(null);
      setSuccessMessage(null);
      setSubmitError(null);
      try {
        const data = await fetchVisitAvailability(propertySlug);
        if (cancelled) return;
        if (!data) {
          setDays([]);
          setLoadError("No se pudieron cargar los turnos disponibles.");
          return;
        }
        setDays(data.days);
        if (data.days.length > 0) {
          setDateKey(data.days[0]!.dateKey);
        } else {
          setDateKey("");
          setStartsAt("");
        }
      } catch {
        if (!cancelled) {
          setLoadError("No se pudieron cargar los turnos disponibles.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [open, propertySlug]);

  const selectedDay = useMemo(
    () => days.find((d) => d.dateKey === dateKey) ?? null,
    [days, dateKey]
  );

  useEffect(() => {
    if (!selectedDay) {
      setStartsAt("");
      return;
    }
    if (!selectedDay.slots.some((s) => s.startsAt === startsAt)) {
      setStartsAt(selectedDay.slots[0]?.startsAt ?? "");
    }
  }, [selectedDay, startsAt]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!startsAt) return;

    const data = new FormData(e.currentTarget);
    setSubmitting(true);
    setSubmitError(null);

    const result = await bookVisit({
      propertySlug,
      startsAt,
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
    });

    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.error);
      // Refresh slots in case the chosen one was taken.
      const refreshed = await fetchVisitAvailability(propertySlug);
      if (refreshed) {
        setDays(refreshed.days);
        if (!refreshed.days.some((d) => d.dateKey === dateKey)) {
          setDateKey(refreshed.days[0]?.dateKey ?? "");
        }
      }
      return;
    }

    setSuccessMessage(
      result.message ||
        "Visita agendada correctamente. La inmobiliaria se estará contactando por teléfono para confirmar la visita."
    );
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
              className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl"
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
                  <p className="mt-1 text-sm text-muted">
                    Sobre “{propertyTitle}”. Elegí un día y horario disponible
                    (turnos de 1 hora).
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

              {successMessage ? (
                <div className="space-y-4 p-5">
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                    <p className="font-semibold">¡Visita agendada!</p>
                    <p className="mt-1">{successMessage}</p>
                    <p className="mt-3">
                      La inmobiliaria se estará contactando con vos por teléfono
                      para confirmar la visita.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSuccessMessage(null);
                      setOpen(false);
                    }}
                    className="w-full rounded-lg bg-brand py-3 text-sm font-bold text-white transition hover:bg-brand-deep"
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 p-5">
                  {loading ? (
                    <p className="text-sm text-muted">
                      Cargando turnos disponibles…
                    </p>
                  ) : loadError ? (
                    <p className="text-sm text-red-600">{loadError}</p>
                  ) : days.length === 0 ? (
                    <p className="text-sm text-muted">
                      No hay turnos libres en los próximos días.
                    </p>
                  ) : (
                    <>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-medium text-muted">
                          Fecha
                        </span>
                        <select
                          value={dateKey}
                          onChange={(e) => setDateKey(e.target.value)}
                          className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                        >
                          {days.map((day) => (
                            <option key={day.dateKey} value={day.dateKey}>
                              {day.label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <div>
                        <span className="mb-1.5 block text-xs font-medium text-muted">
                          Horario
                        </span>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                          {(selectedDay?.slots ?? []).map((slot) => {
                            const active = slot.startsAt === startsAt;
                            return (
                              <button
                                key={slot.startsAt}
                                type="button"
                                onClick={() => setStartsAt(slot.startsAt)}
                                className={cn(
                                  "rounded-lg border px-2 py-2 text-sm font-medium transition",
                                  active
                                    ? "border-brand bg-brand text-white"
                                    : "border-slate-200 bg-white text-navy-soft hover:border-brand"
                                )}
                              >
                                {slot.timeLabel}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}

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
                      Email
                    </span>
                    <input
                      name="email"
                      required
                      type="email"
                      placeholder="tu@email.com"
                      className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-muted">
                      Teléfono
                    </span>
                    <input
                      name="phone"
                      required
                      type="tel"
                      placeholder="Ej. 353 563-7888"
                      className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                  </label>

                  {submitError ? (
                    <p className="text-sm text-red-600">{submitError}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={
                      submitting || loading || !startsAt || days.length === 0
                    }
                    className="w-full rounded-lg bg-brand py-3 text-sm font-bold text-white transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Reservando…" : "Reservar visita"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
