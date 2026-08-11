import { PropertyCard } from "@/components/PropertyCard";
import type { Property } from "@/data/properties";

interface FeaturedPropertiesProps {
  properties: Property[];
  source: "simpleinmo" | "mock";
}

export function FeaturedProperties({
  properties,
  source,
}: FeaturedPropertiesProps) {
  const featured = properties.filter((p) => p.featured);

  return (
    <section id="propiedades" className="bg-surface py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <p className="text-sm font-semibold tracking-wide text-brand-deep uppercase">
            Catálogo destacado
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Propiedades seleccionadas
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">
            Casas, departamentos, terrenos y locales en Villa María y la región,
            curados por nuestro equipo.
          </p>
          {source === "simpleinmo" ? (
            <p className="mt-2 text-xs font-medium text-brand">
              Sincronizado con SimpleInmo · Inmobiliaria Poblar
            </p>
          ) : null}
        </div>

        {featured.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <p className="text-base font-semibold text-navy">
              Todavía no hay propiedades publicadas
            </p>
            <p className="mt-2 text-sm text-muted">
              Cuando publiques inmuebles en SimpleInmo, van a aparecer acá
              automáticamente.
            </p>
            <a
              href="https://simpleinmo.com.ar/i/inmobiliaria-poblar/propiedades"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline"
            >
              Ver catálogo en SimpleInmo
            </a>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
