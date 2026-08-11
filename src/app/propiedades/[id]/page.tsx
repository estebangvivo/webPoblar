import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Car,
  MapPin,
  Maximize,
  MessageCircle,
} from "lucide-react";
import { ScheduleVisit } from "@/components/ScheduleVisit";
import { getPropertyBySlug } from "@/lib/simpleinmo";
import { cn, formatPrice, whatsappUrl } from "@/lib/utils";

const tagStyles = {
  "En Venta": "bg-brand text-white",
  Alquiler: "bg-navy text-white",
  Oportunidad: "bg-copper text-white",
  "Venta y Alquiler": "bg-brand text-white",
} as const;

type PageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyBySlug(id);
  if (!property) return { title: "Propiedad no encontrada | Poblar" };

  return {
    title: `${property.title} | Poblar Negocios Inmobiliarios`,
    description: property.description,
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = await getPropertyBySlug(id);
  if (!property) notFound();

  const message = `Hola Poblar! Me interesa: ${property.title} (${property.address}, ${property.neighborhood}). ¿Me pueden dar más info?`;

  return (
    <section className="bg-surface pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/#propiedades"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a propiedades
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy shadow-lg">
            <Image
              src={property.image}
              alt={property.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span
              className={cn(
                "absolute top-4 left-4 rounded-md px-3 py-1.5 text-xs font-bold tracking-wide",
                tagStyles[property.tag]
              )}
            >
              {property.tag}
            </span>
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-semibold tracking-wide text-brand uppercase">
              {property.type} ·{" "}
              {property.operation === "venta"
                ? "Venta"
                : property.operation === "alquiler"
                  ? "Alquiler"
                  : "Venta y Alquiler"}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {property.title}
            </h1>

            <p className="mt-3 inline-flex items-start gap-2 text-base text-muted">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <span>
                {property.address}
                <br />
                {property.neighborhood}, {property.city}
              </span>
            </p>

            <div className="mt-6 space-y-2">
              {(property.operation === "venta" ||
                property.operation === "ambos") && (
                <p className="text-3xl font-bold text-navy">
                  <span className="mr-2 text-sm font-semibold tracking-wide text-muted uppercase">
                    Venta
                  </span>
                  {formatPrice(property.price, property.currency)}
                </p>
              )}
              {(property.operation === "alquiler" ||
                property.operation === "ambos") &&
                property.rentPrice != null && (
                  <p
                    className={cn(
                      "font-bold text-navy",
                      property.operation === "ambos"
                        ? "text-2xl"
                        : "text-3xl"
                    )}
                  >
                    <span className="mr-2 text-sm font-semibold tracking-wide text-muted uppercase">
                      Alquiler
                    </span>
                    {formatPrice(
                      property.rentPrice,
                      property.rentCurrency ?? "ARS"
                    )}
                    <span className="ml-2 text-base font-medium text-muted">
                      /mes
                    </span>
                  </p>
                )}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {property.bedrooms > 0 && (
                <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                  <BedDouble className="h-5 w-5 text-brand" />
                  <p className="mt-2 text-lg font-bold text-navy">
                    {property.bedrooms}
                  </p>
                  <p className="text-xs text-muted">Dormitorios</p>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                  <Bath className="h-5 w-5 text-brand" />
                  <p className="mt-2 text-lg font-bold text-navy">
                    {property.bathrooms}
                  </p>
                  <p className="text-xs text-muted">Baños</p>
                </div>
              )}
              {property.area > 0 && (
                <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                  <Maximize className="h-5 w-5 text-brand" />
                  <p className="mt-2 text-lg font-bold text-navy">
                    {property.area}
                  </p>
                  <p className="text-xs text-muted">m² totales</p>
                </div>
              )}
              {property.garage && (
                <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                  <Car className="h-5 w-5 text-brand" />
                  <p className="mt-2 text-lg font-bold text-navy">Sí</p>
                  <p className="text-xs text-muted">Cochera</p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold text-navy">Descripción</h2>
              <p className="mt-2 text-base leading-relaxed text-muted">
                {property.description}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ScheduleVisit
                propertySlug={property.slug}
                propertyTitle={property.title}
              />
              <a
                href={whatsappUrl(message, "ventas")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-navy-soft transition hover:border-brand hover:text-brand"
              >
                <MessageCircle className="h-5 w-5" />
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
