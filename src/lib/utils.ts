import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: "ARS" | "USD" = "ARS") {
  if (currency === "USD") {
    return `USD ${price.toLocaleString("es-AR")}`;
  }
  return `$ ${price.toLocaleString("es-AR")}`;
}

export type ContactChannel = "general" | "ventas" | "obras";

export const CONTACT = {
  email: "poblarinmobiliariavm@hotmail.com",
  address: "Bv. España 98 esquina Santa Fe",
  city: "Villa María, Córdoba",
  channels: {
    general: {
      id: "general" as const,
      label: "Consulta general",
      description: "Atención general y consultas varias",
      phoneDisplay: "353 428-9129",
      phoneTel: "+5493534289129",
      whatsapp: "5493534289129",
    },
    ventas: {
      id: "ventas" as const,
      label: "Ventas / Alquileres",
      description: "Compra, venta, alquileres y tasaciones",
      phoneDisplay: "353 563-7888",
      phoneTel: "+5493535637888",
      whatsapp: "5493535637888",
    },
    obras: {
      id: "obras" as const,
      label: "Obras / Emprendimientos",
      description: "Pozo, loteos y desarrollos",
      phoneDisplay: "353 477-0627",
      phoneTel: "+5493534770627",
      whatsapp: "5493534770627",
    },
  },
} as const;

export const CONTACT_CHANNELS = [
  CONTACT.channels.general,
  CONTACT.channels.ventas,
  CONTACT.channels.obras,
] as const;

export function whatsappUrl(
  message: string,
  channel: ContactChannel = "general"
) {
  const number = CONTACT.channels[channel].whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
