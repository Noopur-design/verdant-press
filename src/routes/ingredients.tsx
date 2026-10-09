import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { IngredientGallery } from "@/components/ingredient-gallery";
import { getJuice, ingredients, juices } from "@/lib/catalog";

export const Route = createFileRoute("/ingredients")({
  head: () => ({
    meta: [
      { title: "Ingredients — VERDANT PRESS" },
      { name: "description", content: "The ingredient library behind Verdant Press: apple, cucumber, avocado, spinach, citrus, and watermelon." },
    ],
  }),
  component: IngredientsPage,
});

const filters = [
  { id: "all", label: "All" },
  { id: "green-ritual", label: "Green Ritual" },
  { id: "citrus-glow", label: "Citrus Glow" },
  { id: "ruby-reset", label: "Ruby Reset" },
  { id: "testing", label: "In testing" },
] as const;

function IngredientsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const list = useMemo(() => {
    if (filter === "all") return ingredients;
    if (filter === "testing") return ingredients.filter((item) => item.usedIn.length === 0);
    return ingredients.filter((item) => item.usedIn.includes(filter));
  }, [filter]);

  return (
    <main className="pb-8 pt-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="font-display text-micro tracking-label text-botanical">LIBRARY</p>
        <h1 className="mt-3 max-w-3xl font-display text-editorial font-semibold text-ink">
          Ingredients with <span className="font-serif font-normal italic">their own silhouette.</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-charcoal/80">
          Six market notes — seb, kheera, makhanphal, palak, nimbu, tarbooz. Avocado stays in testing and is not in the signature bottles. Open a specimen for the longer note.
        </p>
      </div>
      <div className="mt-8">
        <IngredientGallery heading={false} />
      </div>
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter ingredients">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={
                filter === item.id
                  ? "min-h-11 bg-ink px-4 font-display text-sm text-paper"
                  : "min-h-11 border border-ink/15 px-4 font-display text-sm text-ink"
              }
            >
              {item.label}
            </button>
          ))}
        </div>
        {list.length === 0 ? (
          <p className="mt-8 text-sm">Nothing in this filter.</p>
        ) : (
          <ul className="mt-8 divide-y divide-ink/10">
            {list.map((item) => (
              <li key={item.id} className="grid gap-3 py-5 md:grid-cols-12 md:items-baseline">
                <p className="font-display text-micro tracking-label text-botanical md:col-span-1">{item.index}</p>
                <h2 className="font-display text-2xl font-semibold text-ink md:col-span-3">{item.name}</h2>
                <p className="text-sm text-charcoal/80 md:col-span-5">{item.note}</p>
                <p className="font-serif italic text-botanical md:col-span-3">
                  {item.usedIn.length === 0
                    ? "Not in the signatures"
                    : item.usedIn
                        .map((slug) => getJuice(slug)?.name)
                        .filter(Boolean)
                        .join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-10 flex flex-wrap gap-4">
          {juices.map((juice) => (
            <Link key={juice.slug} to="/juices/$slug" params={{ slug: juice.slug }} className="font-display text-sm text-ink underline underline-offset-4">
              {juice.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
