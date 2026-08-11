import Image from "next/image";
import { SearchBar } from "@/components/SearchBar";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] overflow-hidden bg-navy"
    >
      <Image
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
        alt="Arquitectura residencial moderna en Villa María"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/75 to-navy/92" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,129,31,0.28),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(160,112,72,0.18),transparent_50%)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pt-28 pb-10 sm:px-6 sm:pb-14 lg:justify-center lg:px-8 lg:pt-24">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-4 text-xs font-bold tracking-[0.28em] text-brand uppercase sm:text-sm">
            POBLAR Negocios Inmobiliarios · Villa María
          </p>
          <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Encontrá tu próximo hogar o inversión con{" "}
            <span className="text-brand">Poblar</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Asesoramiento integral en compra, venta, alquileres y
            emprendimientos en Villa María y la región.
          </p>
        </div>

        <div className="mt-8 w-full max-w-5xl animate-fade-up [animation-delay:120ms] lg:mt-10">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
