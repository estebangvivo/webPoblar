"use client";

import { motion } from "framer-motion";
import { Handshake, Scale, Eye, HeartHandshake } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Transparencia",
    text: "Información clara en cada etapa: precios, documentación y condiciones reales del mercado.",
  },
  {
    icon: HeartHandshake,
    title: "Atención personalizada",
    text: "Te acompañamos de cerca, con visitas, filtros a medida y seguimiento hasta el cierre.",
  },
  {
    icon: Scale,
    title: "Asesoramiento legal",
    text: "Coordinamos con escribanía y profesionales para operaciones seguras y sin sorpresas.",
  },
  {
    icon: Handshake,
    title: "Visión comercial",
    text: "Estrategias de venta y alquiler pensadas para maximizar el valor de tu propiedad.",
  },
];

export function About() {
  return (
    <section id="nosotros" className="bg-surface py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-sm font-semibold tracking-wide text-brand-deep uppercase">
              Sobre nosotros
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Confianza local en el mercado inmobiliario
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              En Poblar Inmobiliaria combinamos conocimiento del mercado de
              Villa María y la región con un servicio cercano. Nuestro objetivo
              es que cada operación —compra, venta, alquiler o inversión— sea
              clara, ágil y respaldada.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-navy p-6 text-white"
            >
              <p className="text-4xl font-bold text-brand">+25</p>
              <p className="mt-1 text-sm text-slate-300">
                Años de trayectoria local
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"
            >
              <p className="text-3xl font-bold text-navy sm:text-4xl">+25.000</p>
              <p className="mt-1 text-sm text-muted">Operaciones acompañadas</p>
            </motion.div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl bg-white p-5 ring-1 ring-slate-200/80"
            >
              <value.icon className="h-7 w-7 text-brand-deep" strokeWidth={1.75} />
              <h3 className="mt-4 text-base font-bold text-navy">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {value.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
