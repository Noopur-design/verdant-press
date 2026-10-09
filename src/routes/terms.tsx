import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — VERDANT PRESS" },
      { name: "description", content: "Terms for the Verdant Press design demonstration." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 pb-24 pt-32">
      <p className="font-display text-micro tracking-label text-botanical">TERMS</p>
      <h1 className="mt-3 font-display text-editorial font-semibold text-ink">A demonstration, not a shop.</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-charcoal/85">
        <p>
          Prices are placeholders in rupees. Recipes are concepts for an Indian morning, not a menu you can order. Allergen and shelf-life lines are explicitly unverified. Nothing here is an offer to sell juice in India or anywhere else.
        </p>
        <p>
          The cart’s demo request writes a reference on your screen and clears the local cart. It does not form a contract, take UPI or a card, or arrange delivery to any pin code.
        </p>
        <p>Placeholder notes name cities only so the layout can be read. They are not reviews from those people.</p>
      </div>
    </main>
  );
}
