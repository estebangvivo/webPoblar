import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { Developments } from "@/components/Developments";
import { ValuationForm } from "@/components/ValuationForm";
import { About } from "@/components/About";
import { getCatalogProperties } from "@/lib/simpleinmo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const { properties, source } = await getCatalogProperties();

  return (
    <>
      <Hero />
      <Suspense
        fallback={
          <section className="bg-surface py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="h-40 animate-pulse rounded-2xl bg-white/70" />
            </div>
          </section>
        }
      >
        <FeaturedProperties properties={properties} source={source} />
      </Suspense>
      <Developments />
      <ValuationForm />
      <About />
    </>
  );
}
