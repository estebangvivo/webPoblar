"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/properties";
import { cn, whatsappUrl } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const statusStyles: Record<Project["status"], string> = {
  "En pozo": "bg-brand text-white",
  "En construcción": "bg-copper text-white",
  "Entrega inmediata": "bg-emerald-600 text-white",
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span
          className={cn(
            "absolute top-3 left-3 rounded-md px-2.5 py-1 text-xs font-bold",
            statusStyles[project.status]
          )}
        >
          {project.status}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="text-xl font-bold text-navy">{project.name}</h3>
        <p className="mt-1 text-sm text-muted">{project.location}</p>
        <p className="mt-3 text-sm leading-relaxed text-navy-soft">
          {project.description}
        </p>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted">
            <span>Avance de obra</span>
            <span>{project.progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted">{project.units}</p>
            <p className="text-sm font-bold text-navy">{project.priceFrom}</p>
          </div>
          <a
            href={whatsappUrl(
              `Hola Poblar! Quiero info del emprendimiento ${project.name}.`,
              "obras"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-soft"
          >
            Consultar
          </a>
        </div>
      </div>
    </motion.article>
  );
}
