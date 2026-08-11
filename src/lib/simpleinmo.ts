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
  if (operation === "RENT") return "alquiler";
  if (operation === "BOTH") return "ambos";
  return "venta";
}

function mapTag(operation: string): PropertyTag {
  if (operation === "RENT") return "Alquiler";
  if (operation === "BOTH") return "Venta y Alquiler";
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
  const isBoth = raw.operationType === "BOTH";
  const salePrice = raw.price;
  const saleCurrency = mapCurrency(raw.currency);
  const rentPrice =
    raw.rentPrice != null
      ? raw.rentPrice
      : isRent
        ? raw.price
        : null;
  const rentCurrency = raw.rentCurrency
    ? mapCurrency(raw.rentCurrency)
    : isRent
      ? saleCurrency
      : rentPrice != null
        ? "ARS"
        : null;

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
    price: isRent && !isBoth ? (rentPrice ?? salePrice) : salePrice,
    currency: isRent && !isBoth ? (rentCurrency ?? saleCurrency) : saleCurrency,
    rentPrice: isRent || isBoth ? rentPrice : null,
    rentCurrency: isRent || isBoth ? rentCurrency : null,
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

export type VisitSlotDay = {
  dateKey: string;
  label: string;
  slots: Array<{ startsAt: string; timeLabel: string }>;
};

export async function fetchVisitAvailability(propertySlug: string) {
  const res = await fetch(
    `${SIMPLEINMO_BASE_URL}/api/public/i/${SIMPLEINMO_ORG_SLUG}/propiedades/${encodeURIComponent(propertySlug)}/visitas`,
    { cache: "no-store", headers: { Accept: "application/json" } }
  );
  if (!res.ok) return null;
  return (await res.json()) as {
    propertyId: string;
    propertyTitle: string;
    days: VisitSlotDay[];
  };
}

export async function bookVisit(input: {
  propertySlug: string;
  startsAt: string;
  name: string;
  email: string;
  phone?: string;
}) {
  const res = await fetch(
    `${SIMPLEINMO_BASE_URL}/api/public/i/${SIMPLEINMO_ORG_SLUG}/propiedades/${encodeURIComponent(input.propertySlug)}/visitas`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startsAt: input.startsAt,
        name: input.name,
        email: input.email,
        phone: input.phone,
      }),
    }
  );

  const data = (await res.json().catch(() => null)) as
    | { ok: true; message?: string }
    | { error?: string }
    | null;

  if (!res.ok) {
    return {
      ok: false as const,
      error: data && "error" in data && data.error
        ? data.error
        : "No se pudo reservar la visita.",
    };
  }

  return {
    ok: true as const,
    message:
      data && "message" in data && data.message
        ? data.message
        : "Visita reservada correctamente.",
  };
}
