import { createFileRoute } from "@tanstack/react-router";
import { ArrowLink } from "@/components/ui";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — VERDANT PRESS" },
      {
        name: "description",
        content: "Verdant Press makes cold-pressed juices with short recipes and recognizable ingredients.",
      },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <main>
      <section className="relative min-h-[78vh] overflow-hidden bg-botanical">
        <img loading="lazy" decoding="async"
          src="/images/moss.jpg"
          alt="Bottles resting on moss and stone"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative flex min-h-[78vh] items-end px-5 pb-16 pt-36 md:px-10">
          <div className="max-w-xl">
            <p className="font-display text-micro tracking-label text-ink">OUR STORY</p>
            <h1 className="mt-3 bg-paper/85 px-2 font-display text-editorial font-semibold text-ink">
              A little closer to nature.
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-paper px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12">
          <p className="font-serif text-3xl italic leading-snug text-ink md:col-span-7 md:text-4xl">
            A bottle should feel as ordinary as chai, and as careful. Fresh fruit, a short list, a morning that does not need a performance.
          </p>
          <div className="space-y-4 text-sm leading-relaxed text-charcoal/85 md:col-span-4 md:col-start-9">
            <p>
              Verdant Press started as an editing problem. Too many bottles in the cooler were either a costume — palak hiding behind apple — or a claim with a long paragraph underneath.
            </p>
            <p>
              The range is three bottles, pressed with an Indian morning in mind. Each one should be nameable from a sip. Green Ritual is the cool one: kheera and seb. Citrus Glow is the sunny one: santara and haldi. Ruby Reset is the juicy one: tarbooz and pudina. Avocado stays in trial until it earns a line.
            </p>
            <p>
              The cart on this site is a demonstration stored on your device. It does not take UPI, a card, or cash, and it does not send a bottle to Mumbai, Bengaluru, Delhi, or Hyderabad. Recipes, allergens, and shelf life are marked where they are not yet verified.
            </p>
          </div>
        </div>
      </section>

      <section
        className="bg-cover bg-center px-5 py-24 md:px-8"
        style={{ backgroundImage: "url(/images/paper.jpg)" }}
      >
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
          {[
            ["Real ingredients", "Fruit and leaves you can point at in the market. No flavour standing in for the fruit."],
            ["Thoughtful blends", "Short lists. One job each — kheera for length, nimbu for the edge, palak for the leaf."],
            ["Nothing unnecessary", "If it does not change the glass, it does not make the label."],
          ].map(([title, copy]) => (
            <article key={title} className="border-t border-ink/20 pt-4">
              <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/80">{copy}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-6xl">
          <ArrowLink to="/juices">Explore the Juices</ArrowLink>
        </div>
      </section>
    </main>
  );
}
