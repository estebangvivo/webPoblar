"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bath, Car, Maximize, MessageCircle, BedDouble } from "lucide-react";
import type { Property } from "@/data/properties";
import { cn, formatPrice, whatsappUrl } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const tagStyles: Record<Property["tag"], string> = {
  "En Venta": "bg-brand text-white",
  Alquiler: "bg-navy text-white",
  Oportunidad: "bg-copper text-white",
};

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const message = `Hola Poblar! Me interesa: ${property.title} (${property.address}, ${property.neighborhood}). ¿Me pueden dar más info?`;
  const detailHref = `/propiedades/${property.slug || property.id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80 transition hover:shadow-xl hover:shadow-navy/10"
    >
      <Link href={detailHref} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span
            className={cn(
              "absolute top-3 left-3 rounded-md px-2.5 py-1 text-xs font-bold tracking-wide",
              tagStyles[property.tag]
            )}
          >
            {property.tag}
          </span>
          <span className="absolute right-3 bottom-3 rounded-lg bg-navy/90 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
            {formatPrice(property.price, property.currency)}
            {property.operation === "alquiler" ? (
              <span className="ml-1 text-xs font-medium text-slate-300">
                /mes
              </span>
            ) : null}
          </span>
        </div>
      </Link>

      <div className="flex flex-col gap-4 p-5">
        <Link href={detailHref} className="block">
          <h3 className="text-lg font-semibold text-navy-soft line-clamp-2 transition group-hover:text-brand">
            {property.title}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {property.neighborhood} · {property.city}
          </p>
        </Link>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-navy-soft">
          {property.bedrooms > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-brand-deep" />
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-brand-deep" />
              {property.bathrooms}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Maximize className="h-4 w-4 text-brand-deep" />
            {property.area} m²
          </span>
          {property.garage && (
            <span className="inline-flex items-center gap-1.5">
              <Car className="h-4 w-4 text-brand-deep" />
              Cochera
            </span>
          )}
        </div>

        <div className="mt-auto flex gap-2">
          <Link
            href={detailHref}
            className="flex-1 rounded-lg border border-slate-200 py-2.5 text-center text-sm font-semibold text-navy-soft transition hover:border-brand hover:text-brand-deep"
          >
            Ver Detalles
          </Link>
          <a
            href={whatsappUrl(message, "ventas")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar por WhatsApp"
            className="inline-flex items-center justify-center rounded-lg bg-whatsapp px-3.5 text-white transition hover:brightness-110"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
