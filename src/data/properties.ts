export type PropertyType =
  | "Casa"
  | "Departamento"
  | "Terreno"
  | "Local"
  | "Comercial"
  | "Oficina"
  | "Otro";
export type OperationType = "venta" | "alquiler";
export type PropertyTag = "En Venta" | "Alquiler" | "Oportunidad";

export interface Property {
  id: string;
  slug: string;
  title: string;
  address: string;
  neighborhood: string;
  city: string;
  type: PropertyType;
  operation: OperationType;
  tag: PropertyTag;
  price: number;
  currency: "ARS" | "USD";
  bedrooms: number;
  bathrooms: number;
  area: number;
  garage: boolean;
  image: string;
  images: string[];
  featured: boolean;
  description: string;
}

export type ProjectStatus = "En pozo" | "En construcción" | "Entrega inmediata";

export interface Project {
  id: string;
  name: string;
  location: string;
  status: ProjectStatus;
  progress: number;
  units: string;
  image: string;
  description: string;
  priceFrom: string;
}

/** Datos de ejemplo solo si SimpleInmo no responde o no hay publicadas. */
export const mockProperties: Property[] = [
  {
    id: "1",
    slug: "casa-familiar-jardin-quincho",
    title: "Casa familiar con jardín y quincho",
    address: "Calle San Martín 1240",
    neighborhood: "Centro",
    city: "Villa María",
    type: "Casa",
    operation: "venta",
    tag: "En Venta",
    price: 185000,
    currency: "USD",
    bedrooms: 3,
    bathrooms: 2,
    area: 220,
    garage: true,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    ],
    featured: true,
    description:
      "Amplia casa reciclada en zona céntrica, ideal para familia. Living comedor, cocina integrada y patio con quincho.",
  },
  {
    id: "2",
    slug: "departamento-2-ambientes-luminoso",
    title: "Departamento 2 ambientes luminoso",
    address: "Av. Universidad 850",
    neighborhood: "Universidad",
    city: "Villa María",
    type: "Departamento",
    operation: "alquiler",
    tag: "Alquiler",
    price: 280000,
    currency: "ARS",
    bedrooms: 1,
    bathrooms: 1,
    area: 48,
    garage: false,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    ],
    featured: true,
    description:
      "Depto moderno cerca de la UNVM, con balcón y amenities. Perfecto para estudiantes o inversión.",
  },
  {
    id: "3",
    slug: "terreno-loteo-residencial",
    title: "Terreno en loteo residencial",
    address: "Barrio Los Álamos",
    neighborhood: "Banda Norte",
    city: "Villa María",
    type: "Terreno",
    operation: "venta",
    tag: "Oportunidad",
    price: 42000,
    currency: "USD",
    bedrooms: 0,
    bathrooms: 0,
    area: 360,
    garage: false,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    ],
    featured: true,
    description:
      "Lote de 12x30 en barrio consolidado, con servicios y excelente orientación. Escritura inmediata.",
  },
  {
    id: "4",
    slug: "local-comercial-peatonal",
    title: "Local comercial sobre peatonal",
    address: "Peatonal España 320",
    neighborhood: "Centro",
    city: "Villa María",
    type: "Local",
    operation: "alquiler",
    tag: "Alquiler",
    price: 650000,
    currency: "ARS",
    bedrooms: 0,
    bathrooms: 1,
    area: 85,
    garage: false,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    ],
    featured: true,
    description:
      "Local a la calle con gran vidriera, baño y depósito. Alta exposición comercial en zona peatonal.",
  },
  {
    id: "5",
    slug: "casa-moderna-barrio-cerrado",
    title: "Casa moderna en barrio cerrado",
    address: "Country Las Palmas",
    neighborhood: "Villa Nueva",
    city: "Villa Nueva",
    type: "Casa",
    operation: "venta",
    tag: "En Venta",
    price: 245000,
    currency: "USD",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    garage: true,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    ],
    featured: true,
    description:
      "Vivienda contemporánea con pileta, cocina gourmet y suite principal. Seguridad 24 hs.",
  },
  {
    id: "6",
    slug: "departamento-3-ambientes-cochera",
    title: "Departamento 3 ambientes con cochera",
    address: "Calle Mendoza 670",
    neighborhood: "Centro",
    city: "Villa María",
    type: "Departamento",
    operation: "venta",
    tag: "Oportunidad",
    price: 98000,
    currency: "USD",
    bedrooms: 2,
    bathrooms: 1,
    area: 72,
    garage: true,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3be61?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3be61?w=1200&q=80",
    ],
    featured: true,
    description:
      "Unidad a estrenar en edificio moderno. Living amplio, cocina americana y balcón aterrazado.",
  },
];

export const projects: Project[] = [];

export const neighborhoods = [
  "Almirante Brown",
  "Barrancas del Río",
  "Bello Horizonte",
  "Belgrano",
  "Carlos Pellegrini",
  "Centro",
  "Centro Este",
  "Centro Norte",
  "Centro Oeste",
  "Centro Sur",
  "Empleados Públicos",
  "Evita",
  "Florentino Ameghino",
  "General Güemes",
  "General Lamadrid",
  "General Paz",
  "Industrial",
  "La Calera",
  "Las Acacias",
  "Las Playas",
  "Los Olmos",
  "Malvinas Argentinas",
  "Mariano Moreno",
  "Nicolás Avellaneda",
  "Palermo",
  "Parque Norte",
  "Ramón Carrillo",
  "Rivadavia",
  "Roque Sáenz Peña",
  "San Juan Bautista",
  "San Justo",
  "San Martín",
  "San Nicolás",
  "Santa Ana",
  "Sarmiento",
  "Trinitarios",
  "Universidad",
  "Villa Albertina",
  "Vista Verde",
  "Yofre",
];

export const locationOptions = [
  ...neighborhoods,
  "Villa Nueva",
  "Zona",
] as const;

export const propertyTypes: PropertyType[] = [
  "Casa",
  "Departamento",
  "Terreno",
  "Local",
];
