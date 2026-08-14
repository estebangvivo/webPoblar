"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import type { Property } from "@/data/properties";
import { cn } from "@/lib/utils";

interface FeaturedPropertiesProps {
  properties: Property[];
  source: "simpleinmo" | "error";
}

const PAGE_SIZE_OPTIONS = [5, 10, 20] as const;
type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

export function FeaturedProperties({
  properties,
  source,
}: FeaturedPropertiesProps) {
  const featured = useMemo(
    () => properties.filter((p) => p.featured),
    [properties]
  );

  const [pageSize, setPageSize] = useState<PageSize>(10);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(featured.length / pageSize));

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  const startIndex = (page - 1) * pageSize;
  const pageItems = featured.slice(startIndex, startIndex + pageSize);
  const showingFrom = featured.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + pageSize, featured.length);

  function changePageSize(size: PageSize) {
    setPageSize(size);
    setPage(1);
  }

  function goToPage(nextPage: number) {
    const clamped = Math.min(Math.max(1, nextPage), totalPages);
    setPage(clamped);
    document.getElementById("propiedades")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section id="propiedades" className="bg-surface py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-brand-deep uppercase">
              Catálogo destacado
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Propiedades seleccionadas
            </h2>
            <p className="mt-3 text-base text-muted sm:text-lg">
              Casas, departamentos, terrenos y locales en Villa María y la
              región, curados por nuestro equipo.
            </p>
            {source === "simpleinmo" ? (
              <p className="mt-2 text-xs font-medium text-brand">
                Sincronizado con SimpleInmo · Inmobiliaria Poblar
              </p>
            ) : (
              <p className="mt-2 text-xs font-medium text-red-600">
                No pudimos sincronizar el catálogo en este momento.
              </p>
            )}
          </div>

          {featured.length > 0 ? (
            <div className="flex flex-col gap-2 sm:items-end">
              <span className="text-xs font-medium text-muted">Mostrar</span>
              <div
                className="inline-flex rounded-lg border border-slate-200 bg-white p-1"
                role="group"
                aria-label="Cantidad de propiedades por página"
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => changePageSize(size)}
                    aria-pressed={pageSize === size}
                    className={cn(
                      "min-w-12 rounded-md px-3 py-2 text-sm font-semibold transition",
                      pageSize === size
                        ? "bg-brand text-white"
                        : "text-navy-soft hover:bg-orange-50"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {featured.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <p className="text-base font-semibold text-navy">
              Todavía no hay propiedades publicadas
            </p>
            <p className="mt-2 text-sm text-muted">
              Cargá y publicá inmuebles en SimpleInmo para que aparezcan acá
              automáticamente.
            </p>
            <a
              href="https://simpleinmo.com.ar/gestion/propiedades"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline"
            >
              Ir a SimpleInmo
            </a>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                />
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-6 sm:flex-row">
              <p className="text-sm text-muted">
                Mostrando{" "}
                <span className="font-semibold text-navy-soft">
                  {showingFrom}–{showingTo}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-navy-soft">
                  {featured.length}
                </span>
              </p>

              {totalPages > 1 ? (
                <nav
                  className="flex items-center gap-1"
                  aria-label="Paginación de propiedades"
                >
                  <button
                    type="button"
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1}
                    aria-label="Página anterior"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-navy-soft transition hover:border-brand hover:text-brand-deep disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-navy-soft"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNumber) => (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => goToPage(pageNumber)}
                        aria-current={page === pageNumber ? "page" : undefined}
                        className={cn(
                          "inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-semibold transition",
                          page === pageNumber
                            ? "bg-navy text-white"
                            : "border border-slate-200 bg-white text-navy-soft hover:border-brand hover:text-brand-deep"
                        )}
                      >
                        {pageNumber}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= totalPages}
                    aria-label="Página siguiente"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-navy-soft transition hover:border-brand hover:text-brand-deep disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-navy-soft"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              ) : null}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
