import type { Property, PropertyTag, PropertyType } from "@/data/properties";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80";

export const SIMPLEINMO_BASE_URL =
  process.env.SIMPLEINMO_API_URL?.replace(/\/$/, "") ||
  "https://simpleinmo.com.ar";

export const SIMPLEINMO_ORG_SLUG =
  process.env.SIMPLEINMO_ORG_SLUG || "inmobiliaria-poblar";

export const SIMPLEINMO_LOGIN_URL = `${SIMPLEINMO_BASE_URL}/login`;

type SimpleInmoProperty = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  propertyType: string;
  operationType: string;
  price: number;
  rentPrice?: number | null;
  currency: string;
  rentCurrency?: string | null;
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

/** Reescribe hosts internos del ERP (0.0.0.0/localhost) al dominio público. */
function normalizeMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("/")) return `${SIMPLEINMO_BASE_URL}${url}`;
  try {
    const parsed = new URL(url);
    if (
      parsed.hostname === "0.0.0.0" ||
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1"
    ) {
      return `${SIMPLEINMO_BASE_URL}${parsed.pathname}${parsed.search}`;
    }
    return url;
  } catch {
    return url;
  }
}

export function mapSimpleInmoProperty(raw: SimpleInmoProperty): Property {
  const normalizedImages = (raw.images ?? [])
    .map((i) => normalizeMediaUrl(i.url))
    .filter((url): url is string => Boolean(url));

  const cover =
    normalizeMediaUrl(raw.coverImage) ||
    normalizedImages[0] ||
    DEFAULT_IMAGE;

  const images = normalizedImages.length ? normalizedImages : [cover];

  const isRent = raw.operationType === "RENT";
  const displayPrice =
    isRent && raw.rentPrice != null ? raw.rentPrice : raw.price;
  const displayCurrency =
    isRent && raw.rentCurrency
      ? mapCurrency(raw.rentCurrency)
      : mapCurrency(raw.currency);

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
    price: displayPrice,
    currency: displayCurrency,
    bedrooms: raw.rooms ?? 0,
    bathrooms: raw.bathrooms ?? 0,
    area: raw.areaM2 ?? 0,
    garage: hasGarage(raw.amenities),
    image: cover,
    images,
    featured: true,
    description:
      raw.description?.trim() || "Consultá más detalles con nuestro equipo.",
  };
}

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${SIMPLEINMO_BASE_URL}${path}`, {
      cache: "no-store",
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

  if (!data?.properties) {
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
