import { createFileRoute } from "@tanstack/react-router";
import { CollectionIntro, ProductStage } from "@/components/products";
import { juices } from "@/lib/catalog";

export const Route = createFileRoute("/juices/")({
  head: () => ({
    meta: [
      { title: "Our Juices — VERDANT PRESS" },
      { name: "description", content: "Three signature cold-pressed juices: Green Ritual, Citrus Glow, and Ruby Reset." },
    ],
  }),
  component: JuicesPage,
});

function JuicesPage() {
  return (
    <main className="pb-8 pt-28">
      <CollectionIntro />
      <div className="flex flex-col gap-2">
        {juices.map((juice) => (
          <ProductStage key={juice.slug} juice={juice} />
        ))}
      </div>
    </main>
  );
}
