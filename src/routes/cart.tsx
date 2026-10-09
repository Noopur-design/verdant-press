import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { formatPrice, getJuice, juices, PRICE_NOTE } from "@/lib/catalog";
import { useCart } from "@/lib/cart-store";
import { AddButton, QtySelector } from "@/components/ui";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — VERDANT PRESS" },
      { name: "description", content: "A demonstration cart for Verdant Press. No payment is taken." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useCart((state) => state.items);
  const setQty = useCart((state) => state.setQty);
  const remove = useCart((state) => state.remove);
  const clear = useCart((state) => state.clear);
  const [reference, setReference] = useState<string | null>(null);

  const lines = items
    .map((item) => {
      const juice = getJuice(item.slug);
      return juice ? { ...item, juice } : null;
    })
    .filter((line) => line != null);

  const total = lines.reduce((sum, line) => sum + line.juice.price * line.qty, 0);

  return (
    <main className="mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-8">
      <p className="font-display text-micro tracking-label text-botanical">DEMO CART</p>
      <h1 className="mt-3 font-display text-editorial font-semibold text-ink">Your bottles.</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-charcoal/75">
        Everything here stays in your browser — the rupee total is a placeholder, and checking out is a
        demonstration only. No UPI, no card, no delivery, and nothing is sent to Verdant Press.
      </p>

      {reference ? (
        <div className="mt-10 border border-ink/15 bg-lime p-6" role="status">
          <p className="font-display text-micro tracking-label text-botanical">DEMONSTRATION ONLY</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Nothing was charged.</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed">
            Reference {reference} is a local note so the flow can be tried. No UPI request was sent, and Verdant Press did not receive an order.
          </p>
          <Link to="/juices" className="mt-6 inline-flex font-serif text-2xl italic text-botanical">
            Back to the juices
          </Link>
        </div>
      ) : lines.length === 0 ? (
        <div className="mt-12">
          <div className="grid items-center gap-8 border-b border-ink/10 pb-14 md:grid-cols-2">
            <img
              loading="lazy"
              decoding="async"
              src="/images/bottle-green.jpg"
              alt="Green Ritual bottle"
              className="bottle-hover mx-auto h-80 object-contain"
            />
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink">The cart is empty.</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-charcoal/75">
                Nothing pressed yet. Add one of the daily three below — they drop straight into this
                cart — or browse the full range first.
              </p>
              <Link
                to="/juices"
                className="btn-press btn-asym mt-6 inline-flex min-h-11 items-center bg-ink px-5 py-3 font-display text-sm text-paper"
              >
                Explore the Juices
              </Link>
            </div>
          </div>

          <section className="mt-14">
            <p className="font-display text-micro tracking-label text-botanical">THE DAILY THREE</p>
            <h3 className="mt-2 font-display text-3xl font-semibold text-ink">Start here.</h3>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {juices.map((juice) => (
                <div key={juice.slug} className="group flex flex-col">
                  <Link
                    to="/juices/$slug"
                    params={{ slug: juice.slug }}
                    className="relative block overflow-hidden bg-lime"
                    aria-label={juice.name}
                  >
                    <img
                      loading="lazy"
                      decoding="async"
                      src={juice.image}
                      alt={`${juice.name} bottle`}
                      className="bottle-hover mx-auto h-64 w-full object-contain p-6"
                    />
                  </Link>
                  <div className="mt-4 flex flex-1 flex-col">
                    <Link
                      to="/juices/$slug"
                      params={{ slug: juice.slug }}
                      className="font-display text-xl font-semibold text-ink hover:text-botanical"
                    >
                      {juice.name}
                    </Link>
                    <p className="mt-1 font-serif text-base italic text-botanical">{juice.personality}</p>
                    <p className="mt-2 font-display text-sm tabular-nums text-charcoal/80">
                      {formatPrice(juice.price)} · {juice.size}
                    </p>
                    <div className="mt-4 flex-1" />
                    <AddButton slug={juice.slug} className="w-full justify-center" />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-xl text-xs leading-relaxed text-charcoal/60">
              {PRICE_NOTE} Added bottles are saved on this device only, so your cart is still here when
              you come back.
            </p>
          </section>
        </div>
      ) : (
        <div className="mt-10">
          <ul className="divide-y divide-ink/10">
            {lines.map((line) => (
              <li key={line.slug} className="grid grid-cols-[5.5rem_1fr] gap-4 py-6 md:grid-cols-[7rem_1fr_auto] md:items-center">
                <img loading="lazy" decoding="async" src={line.juice.image} alt="" className="bottle-hover h-28 w-full object-contain" />
                <div>
                  <Link to="/juices/$slug" params={{ slug: line.slug }} className="font-display text-2xl font-semibold text-ink">
                    {line.juice.name}
                  </Link>
                  <p className="text-sm text-charcoal/70">{line.juice.size}</p>
                  <p className="mt-1 font-display tabular-nums">{formatPrice(line.juice.price)}</p>
                  <button
                    type="button"
                    className="mt-2 text-sm text-botanical underline underline-offset-4"
                    onClick={() => remove(line.slug)}
                  >
                    Remove
                  </button>
                </div>
                <QtySelector value={line.qty} onChange={(qty) => setQty(line.slug, qty)} />
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-4 border-t border-ink/10 pt-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-micro tracking-label text-botanical">PLACEHOLDER TOTAL</p>
              <p className="font-display text-4xl tabular-nums text-ink">{formatPrice(total)}</p>
              <p className="mt-1 text-xs text-charcoal/60">{PRICE_NOTE}</p>
            </div>
            <button
              type="button"
              className="btn-press btn-asym min-h-12 bg-ink px-6 py-3 font-display text-sm text-paper"
              onClick={() => {
                const ref = `VP-${Math.floor(1000 + Math.random() * 9000)}`;
                clear();
                setReference(ref);
              }}
            >
              Place a demo request
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
