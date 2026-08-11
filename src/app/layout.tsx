import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Poblar Negocios Inmobiliarios | Villa María, Córdoba",
  description:
    "Asesoramiento integral en compra, venta, alquileres y emprendimientos en Villa María y la región. Tasaciones sin cargo.",
  keywords: [
    "inmobiliaria Villa María",
    "Poblar Negocios Inmobiliarios",
    "propiedades Córdoba",
    "alquileres Villa María",
    "emprendimientos pozo",
  ],
  icons: {
    icon: "/brand/logo-poblar.png",
    apple: "/brand/logo-poblar.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
