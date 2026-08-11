import { Hero } from "@/components/Hero";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { Developments } from "@/components/Developments";
import { ValuationForm } from "@/components/ValuationForm";
import { About } from "@/components/About";
import { getCatalogProperties } from "@/lib/simpleinmo";

export const revalidate = 60;

export default async function Home() {
  const { properties, source } = await getCatalogProperties();

  return (
    <>
      <Hero />
      <FeaturedProperties properties={properties} source={source} />
      <Developments />
      <ValuationForm />
      <About />
    </>
  );
}
