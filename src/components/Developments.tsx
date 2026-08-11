"use client";

import Image from "next/image";
import { projects } from "@/data/properties";
import { ProjectCard } from "@/components/ProjectCard";

export function Developments() {
  const visibleProjects = projects.filter(
    (project) => project.status !== "En pozo"
  );

  return (
    <section id="emprendimientos" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mb-12 overflow-hidden rounded-3xl min-h-[280px] sm:min-h-[320px]">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
            alt="Desarrollos inmobiliarios en Villa María"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
          <div className="relative flex h-full min-h-[280px] flex-col justify-center px-6 py-12 sm:min-h-[320px] sm:px-10 lg:px-14">
            <p className="text-sm font-semibold tracking-wide text-brand uppercase">
              Emprendimientos & Desarrollos
            </p>
            <h2 className="mt-2 max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Invertí en loteos y desarrollos de la región
            </h2>
            <p className="mt-3 max-w-lg text-base text-slate-200">
              Acompañamos tu inversión desde la reserva hasta la escritura, con
              información clara de avances y condiciones.
            </p>
          </div>
        </div>

        {visibleProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-surface px-6 py-14 text-center">
            <p className="text-base font-semibold text-navy">
              Por el momento no hay emprendimientos publicados
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
