import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { IngredientGallery } from "@/components/ingredient-gallery";
import { JournalTeaser } from "@/components/journal-teaser";
import { Landscape } from "@/components/landscape";
import { Lifestyle } from "@/components/lifestyle";
import { Philosophy } from "@/components/philosophy";
import { CollectionIntro, ProductStage } from "@/components/products";
import { Testimonials } from "@/components/testimonials";
import { juices } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VERDANT PRESS — Pure Juice. Brighter Days." },
      {
        name: "description",
        content:
          "Cold-pressed juices for Indian mornings. Green Ritual, Citrus Glow, and Ruby Reset — seb, kheera, nimbu, tarbooz.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main>
      <Hero />
      <IngredientGallery />
      <Philosophy />
      <Landscape />
      <section className="bg-paper pt-16">
        <CollectionIntro />
        <div className="flex flex-col gap-2">
          {juices.map((juice) => (
            <ProductStage key={juice.slug} juice={juice} />
          ))}
        </div>
      </section>
      <Lifestyle />
      <Testimonials />
      <JournalTeaser />
    </main>
  );
}
