import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ALLERGEN_NOTE,
  DELIVERY_NOTE,
  formatPrice,
  getJuice,
  juices,
  PRICE_NOTE,
  RECIPE_NOTE,
  STORAGE_NOTE,
} from "@/lib/catalog";
import { AddButton, QtySelector } from "@/components/ui";

export const Route = createFileRoute("/juices/$slug")({
  loader: ({ params }) => {
    const juice = getJuice(params.slug);
    if (!juice) throw notFound();
    return { juice };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.juice.name} — VERDANT PRESS` : "Juice — VERDANT PRESS" },
      { name: "description", content: loaderData?.juice.description ?? "A Verdant Press juice." },
    ],
  }),
  component: JuiceDetail,
  notFoundComponent: MissingJuice,
});

function JuiceDetail() {
  const { juice } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const related = juices.filter((item) => item.slug !== juice.slug);
  const frame =
    juice.layout === "capsule" ? "sil-specimen bg-lime" : juice.layout === "sunburst" ? "sil-seed bg-citrus" : "sil-arch bg-ruby";

  return (
    <main className="px-4 pb-20 pt-28 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className={`relative lg:sticky lg:top-28 ${frame} min-h-[32rem] overflow-hidden p-6`}>
            <img loading="lazy" decoding="async" src={juice.overlap} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
            <div className="group relative mx-auto h-[30rem] max-w-sm">
              <img
                loading="lazy"
                decoding="async"
                src={juice.image}
                alt={`${juice.name}, 250 ml cold-pressed juice bottle`}
                className="bottle-hover h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 lg:py-6">
          <p className="font-display text-micro tracking-label text-botanical">250 ML · CONCEPT RECIPE</p>
          <h1 className="mt-3 font-display text-editorial font-semibold text-ink">{juice.name}</h1>
          <p className="mt-2 font-serif text-2xl italic text-botanical">{juice.personality}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-charcoal/85">{juice.description}</p>
          <p className="mt-4 text-xs text-charcoal/60">{RECIPE_NOTE}</p>

          <h2 className="mt-8 font-display text-micro tracking-label text-botanical">INGREDIENTS</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {juice.ingredients.map((item) => (
              <li key={item} className="border border-ink/15 px-3 py-1 font-display text-sm text-ink">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-charcoal/75">{ALLERGEN_NOTE}</p>

          <div className="mt-8 flex items-end justify-between gap-4 border-t border-ink/10 pt-5">
            <div>
              <p className="font-display text-3xl tabular-nums text-ink">{formatPrice(juice.price)}</p>
              <p className="text-xs text-charcoal/60">{PRICE_NOTE}</p>
              <p className="mt-1 text-xs text-charcoal/60">{juice.size}</p>
            </div>
            <QtySelector value={qty} onChange={setQty} />
          </div>
          <div className="mt-4">
            <AddButton slug={juice.slug} qty={qty} />
          </div>

          <h2 className="mt-10 font-display text-micro tracking-label text-botanical">DELIVERY</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal/75">{DELIVERY_NOTE}</p>
          <h2 className="mt-6 font-display text-micro tracking-label text-botanical">KEEPING</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal/75">{STORAGE_NOTE}</p>
        </div>
      </div>

      <section className="mx-auto mt-16 max-w-6xl border-t border-ink/10 pt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">The other two</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {related.map((item) => (
            <Link
              key={item.slug}
              to="/juices/$slug"
              params={{ slug: item.slug }}
              className="group grid grid-cols-[7rem_1fr] items-center gap-4"
            >
              <img loading="lazy" decoding="async" src={item.image} alt="" className="bottle-hover h-36 w-28 object-contain" />
              <span>
                <span className="block font-display text-2xl font-semibold text-ink">{item.name}</span>
                <span className="mt-1 block font-serif italic text-botanical">{item.personality}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function MissingJuice() {
  return (
    <main className="px-6 pb-24 pt-36">
      <h1 className="font-display text-editorial font-semibold text-ink">That bottle is not in the range.</h1>
      <Link to="/juices" className="mt-4 inline-flex font-serif text-2xl italic text-botanical">
        See the three juices
      </Link>
    </main>
  );
}
