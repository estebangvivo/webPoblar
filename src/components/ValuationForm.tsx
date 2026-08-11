"use client";

import { FormEvent, useState } from "react";
import { ClipboardCheck, CheckCircle2 } from "lucide-react";
import { propertyTypes } from "@/data/properties";
import { whatsappUrl } from "@/lib/utils";

export function ValuationForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const type = String(data.get("type") || "");
    const neighborhood = String(data.get("neighborhood") || "");
    const comments = String(data.get("comments") || "");

    const message = [
      "Hola Poblar! Solicito tasación sin cargo.",
      `Nombre: ${name}`,
      `Teléfono: ${phone}`,
      `Tipo: ${type}`,
      `Barrio: ${neighborhood}`,
      comments ? `Comentarios: ${comments}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappUrl(message, "ventas"), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <section id="tasaciones" className="bg-navy py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <p className="text-sm font-semibold tracking-wide text-brand uppercase">
            Captación de propiedades
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tasamos tu propiedad
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            ¿Querés vender o alquilar? Nuestro equipo realiza una valuación,
            con análisis de mercado local y estrategia de publicación.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Visita y relevamiento fotográfico",
              "Comparables reales de Villa María y región",
              "Plan de difusión en portales y redes",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-slate-200 sm:text-base"
              >
                <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-xl shadow-black/20 sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-brand-deep" />
              <h3 className="mt-4 text-xl font-bold text-navy">
                ¡Solicitud lista!
              </h3>
              <p className="mt-2 text-sm text-muted">
                Te redirigimos a WhatsApp para confirmar los datos. Te
                contactamos a la brevedad.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-6 text-sm font-semibold text-brand-deep hover:underline"
              >
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-navy">
                Solicitar Tasación Sin Cargo
              </h3>

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

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-muted">
                    Tipo de inmueble
                  </span>
                  <select
                    name="type"
                    required
                    className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="">Seleccionar</option>
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-muted">
                    Barrio
                  </span>
                  <input
                    name="neighborhood"
                    required
                    placeholder="Ej. Centro"
                    className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted">
                  Comentarios
                </span>
                <textarea
                  name="comments"
                  rows={3}
                  placeholder="Superficie aproximada, estado, urgencia..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-lg bg-brand py-3 text-sm font-bold text-white transition hover:bg-brand-deep"
              >
                Solicitar Tasación Sin Cargo
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
