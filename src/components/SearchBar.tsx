"use client";

import { useState } from "react";
import { BedDouble, Search } from "lucide-react";
import { locationOptions, propertyTypes } from "@/data/properties";
import { cn } from "@/lib/utils";

type SearchTab = "comprar" | "alquilar" | "emprendimientos";

const tabs: { id: SearchTab; label: string }[] = [
  { id: "comprar", label: "Comprar" },
  { id: "alquilar", label: "Alquilar" },
  { id: "emprendimientos", label: "Emprendimientos" },
];

const salePriceRanges = [
  { value: "0-50000", label: "Hasta USD 50.000" },
  { value: "50000-100000", label: "USD 50.000 – 100.000" },
  { value: "100000-200000", label: "USD 100.000 – 200.000" },
  { value: "200000+", label: "Más de USD 200.000" },
];

const rentPriceRanges = [
  { value: "0-100000", label: "$0 a $100.000,00" },
  { value: "100000-300000", label: "$100.000,00 a $300.000,00" },
  { value: "300000-500000", label: "$300.000,00 a $500.000,00" },
  { value: "500000-1000000", label: "$500.000,00 a $1.000.000,00" },
  { value: "1000000+", label: "Más de $1.000.000,00" },
];

export function SearchBar() {
  const [tab, setTab] = useState<SearchTab>("comprar");
  const priceRanges = tab === "alquilar" ? rentPriceRanges : salePriceRanges;

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-[#FFF7F0] shadow-2xl shadow-navy/25 ring-1 ring-brand/10">
      <div className="flex border-b border-brand/10">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "flex-1 px-3 py-3.5 text-sm font-semibold transition sm:px-4",
              tab === item.id
                ? "bg-brand text-white"
                : "bg-[#FFF7F0] text-navy-soft hover:bg-orange-100/70"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <form
        className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4 lg:p-5"
        onSubmit={(e) => {
          e.preventDefault();
          const targetId =
            tab === "emprendimientos" ? "emprendimientos" : "propiedades";
          document.getElementById(targetId)?.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted">Tipo</span>
          <select className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-navy-soft outline-none focus:border-brand focus:ring-2 focus:ring-brand/20">
            <option value="">Todos</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted">
            Localidad / Barrio
          </span>
          <select className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-navy-soft outline-none focus:border-brand focus:ring-2 focus:ring-brand/20">
            <option value="">Todas</option>
            {locationOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted">Rango de precio</span>
          <select
            key={tab}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-navy-soft outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          >
            <option value="">Sin límite</option>
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted">Dormitorios</span>
          <div className="relative">
            <BedDouble className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
            <select className="h-11 w-full rounded-lg border border-slate-200 bg-white py-2 pr-3 pl-9 text-sm text-navy-soft outline-none focus:border-brand focus:ring-2 focus:ring-brand/20">
              <option value="">Indistinto</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </label>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 self-end rounded-lg bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-deep sm:col-span-2 lg:col-span-1"
        >
          <Search className="h-4 w-4" />
          Buscar Propiedades
        </button>
      </form>
    </div>
  );
}
