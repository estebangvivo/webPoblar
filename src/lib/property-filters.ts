import type { Property, PropertyType } from "@/data/properties";

export type PropertySearchTab = "comprar" | "alquilar" | "emprendimientos";

export type PropertyFilters = {
  /** Ausente = mostrar todas las operaciones (estado inicial sin búsqueda). */
  operation: "venta" | "alquiler" | null;
  type: string;
  location: string;
  price: string;
  bedrooms: string;
};

export const DEFAULT_PROPERTY_FILTERS: PropertyFilters = {
  operation: null,
  type: "",
  location: "",
  price: "",
  bedrooms: "",
};

export function tabFromFilters(filters: PropertyFilters): PropertySearchTab {
  if (filters.operation === "alquiler") return "alquilar";
  if (filters.operation === "venta") return "comprar";
  return "comprar";
}

export function operationFromTab(
  tab: PropertySearchTab
): PropertyFilters["operation"] {
  if (tab === "alquilar") return "alquiler";
  if (tab === "comprar") return "venta";
  return null;
}

export function parsePropertyFilters(
  params: URLSearchParams | { get(name: string): string | null }
): PropertyFilters {
  const tabRaw = params.get("op") || params.get("tab") || "";
  let operation: PropertyFilters["operation"] = null;
  if (tabRaw === "alquilar") operation = "alquiler";
  if (tabRaw === "comprar") operation = "venta";

  return {
    operation,
    type: params.get("tipo") || "",
    location: params.get("zona") || "",
    price: params.get("precio") || "",
    bedrooms: params.get("dorm") || "",
  };
}

export function propertyFiltersToSearchParams(
  filters: PropertyFilters
): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.operation === "alquiler") params.set("op", "alquilar");
  if (filters.operation === "venta") params.set("op", "comprar");
  if (filters.type) params.set("tipo", filters.type);
  if (filters.location) params.set("zona", filters.location);
  if (filters.price) params.set("precio", filters.price);
  if (filters.bedrooms) params.set("dorm", filters.bedrooms);
  return params;
}

export function hasActivePropertyFilters(filters: PropertyFilters): boolean {
  return Boolean(
    filters.operation ||
      filters.type ||
      filters.location ||
      filters.price ||
      filters.bedrooms
  );
}

function matchesType(property: Property, type: string): boolean {
  if (!type) return true;
  if (type === "Local") {
    return property.type === "Local" || property.type === "Comercial";
  }
  return property.type === (type as PropertyType);
}

function matchesLocation(property: Property, location: string): boolean {
  if (!location) return true;
  const needle = location.toLowerCase();
  return (
    property.neighborhood.toLowerCase().includes(needle) ||
    property.city.toLowerCase().includes(needle) ||
    property.address.toLowerCase().includes(needle)
  );
}

function matchesOperation(
  property: Property,
  operation: PropertyFilters["operation"]
): boolean {
  if (!operation) return true;
  if (operation === "alquiler") {
    return property.operation === "alquiler" || property.operation === "ambos";
  }
  return property.operation === "venta" || property.operation === "ambos";
}

function parsePriceRange(
  range: string
): { min: number; max: number | null } | null {
  if (!range) return null;
  if (range.endsWith("+")) {
    const min = Number(range.slice(0, -1));
    if (Number.isNaN(min)) return null;
    return { min, max: null };
  }
  const [minRaw, maxRaw] = range.split("-");
  const min = Number(minRaw);
  const max = Number(maxRaw);
  if (Number.isNaN(min) || Number.isNaN(max)) return null;
  return { min, max };
}

function priceForOperation(
  property: Property,
  operation: PropertyFilters["operation"]
): number | null {
  if (operation === "alquiler") {
    if (property.rentPrice != null) return property.rentPrice;
    if (property.operation === "alquiler") return property.price;
    return null;
  }
  if (property.operation === "alquiler") return null;
  return property.price;
}

function matchesPrice(
  property: Property,
  range: string,
  operation: PropertyFilters["operation"]
): boolean {
  const parsed = parsePriceRange(range);
  if (!parsed) return true;
  const value = priceForOperation(property, operation);
  if (value == null) return false;
  if (value < parsed.min) return false;
  if (parsed.max != null && value > parsed.max) return false;
  return true;
}

function matchesBedrooms(property: Property, bedrooms: string): boolean {
  if (!bedrooms) return true;
  const min = Number(bedrooms);
  if (Number.isNaN(min)) return true;
  return property.bedrooms >= min;
}

export function filterProperties(
  properties: Property[],
  filters: PropertyFilters
): Property[] {
  return properties.filter(
    (property) =>
      matchesOperation(property, filters.operation) &&
      matchesType(property, filters.type) &&
      matchesLocation(property, filters.location) &&
      matchesPrice(property, filters.price, filters.operation) &&
      matchesBedrooms(property, filters.bedrooms)
  );
}

export function describePropertyFilters(filters: PropertyFilters): string {
  const parts: string[] = [];
  if (filters.operation === "alquiler") parts.push("en alquiler");
  if (filters.operation === "venta") parts.push("en venta");
  if (filters.type) parts.push(filters.type.toLowerCase());
  if (filters.location) parts.push(`en ${filters.location}`);
  if (filters.bedrooms) parts.push(`${filters.bedrooms}+ dorm.`);
  if (filters.price) parts.push(`precio ${filters.price}`);
  return parts.join(" · ");
}
