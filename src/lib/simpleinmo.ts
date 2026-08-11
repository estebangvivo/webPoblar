import type { Property, PropertyTag, PropertyType } from "@/data/properties";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80";

export const SIMPLEINMO_BASE_URL =
  process.env.SIMPLEINMO_API_URL?.replace(/\/$/, "") ||
  "https://simpleinmo.com.ar";

export const SIMPLEINMO_ORG_SLUG =
  process.env.SIMPLEINMO_ORG_SLUG || "inmobiliaria-poblar";

type SimpleInmoProperty = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  propertyType: string;
  operationType: string;
  price: number;
  currency: string;
  address: string;
  city: string;
  province: string | null;
  rooms: number | null;
  bathrooms: number | null;
  areaM2: number | null;
  amenities: string[];
  coverImage: string | null;
  images: { url: string }[];
};

type CatalogResponse = {
  properties: SimpleInmoProperty[];
};

type DetailResponse = {
  property: SimpleInmoProperty;
};

function mapType(type: string): PropertyType {
  switch (type) {
    case "HOUSE":
      return "Casa";
    case "APARTMENT":
      return "Departamento";
    case "LAND":
      return "Terreno";
    case "COMMERCIAL":
      return "Comercial";
    case "OFFICE":
      return "Oficina";
    default:
      return "Otro";
  }
}

function mapOperation(operation: string): Property["operation"] {
  return operation === "RENT" ? "alquiler" : "venta";
}

function mapTag(operation: string): PropertyTag {
  if (operation === "RENT") return "Alquiler";
  if (operation === "BOTH") return "Oportunidad";
  return "En Venta";
}

function mapCurrency(currency: string): "ARS" | "USD" {
  return currency === "USD" ? "USD" : "ARS";
}

function hasGarage(amenities: string[] | undefined) {
  if (!amenities?.length) return false;
  return amenities.some((a) => /cochera|garage|garaje/i.test(a));
}

export function mapSimpleInmoProperty(raw: SimpleInmoProperty): Property {
  const images = (raw.images?.map((i) => i.url).filter(Boolean) ?? []).length
    ? raw.images.map((i) => i.url)
    : raw.coverImage
      ? [raw.coverImage]
      : [DEFAULT_IMAGE];

  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    address: raw.address,
    neighborhood: raw.city,
    city: raw.city,
    type: mapType(raw.propertyType),
    operation: mapOperation(raw.operationType),
    tag: mapTag(raw.operationType),
    price: raw.price,
    currency: mapCurrency(raw.currency),
    bedrooms: raw.rooms ?? 0,
    bathrooms: raw.bathrooms ?? 0,
    area: raw.areaM2 ?? 0,
    garage: hasGarage(raw.amenities),
    image: raw.coverImage || images[0] || DEFAULT_IMAGE,
    images,
    featured: true,
    description:
      raw.description?.trim() || "Consultá más detalles con nuestro equipo.",
  };
}

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${SIMPLEINMO_BASE_URL}${path}`, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getCatalogProperties(): Promise<{
  properties: Property[];
  source: "simpleinmo" | "error";
}> {
  const data = await fetchJson<CatalogResponse>(
    `/api/public/i/${SIMPLEINMO_ORG_SLUG}/propiedades`
  );

  if (!data) {
    return { properties: [], source: "error" };
  }

  return {
    properties: data.properties.map(mapSimpleInmoProperty),
    source: "simpleinmo",
  };
}

export async function getPropertyBySlug(
  slug: string
): Promise<Property | null> {
  const data = await fetchJson<DetailResponse>(
    `/api/public/i/${SIMPLEINMO_ORG_SLUG}/propiedades/${encodeURIComponent(slug)}`
  );

  if (!data?.property) return null;
  return mapSimpleInmoProperty(data.property);
}
