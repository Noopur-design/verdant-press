import { ticker } from "@/lib/catalog";

export function Lifestyle() {
  const line = ["After chai", "Seb and kheera", "Nothing unnecessary"];
  const loop = [...line, ...line, ...line, ...line];
  return (
    <section className="bg-paper">
      <div className="grid min-h-[80vh] md:grid-cols-2">
        <figure className="relative min-h-[70vw] md:min-h-[36rem]">
          <img loading="lazy" decoding="async"
            src="/images/lifestyle.jpg"
            alt="A woman holding a green juice outdoors in morning light"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </figure>
        <figure className="relative min-h-[64vw] md:min-h-[36rem]">
          <img loading="lazy" decoding="async"
            src="/images/fitness.jpg"
            alt="A green juice bottle beside running shoes and a linen bag"
            className="absolute inset-0 h-full w-full object-cover object-left"
          />
          <figcaption className="absolute bottom-6 left-6 max-w-[12rem] bg-paper/90 px-3 py-2 text-sm text-ink">
            Morning light, after chai, before the day gets loud.
          </figcaption>
        </figure>
      </div>
      <div className="overflow-hidden bg-paper text-ink">
        <div className="marquee-track border-y border-ink/10 py-4">
          {loop.map((item, index) => (
            <span key={`${item}-${index}`} className="mx-3 font-display text-sm tracking-label">
              {item.toUpperCase()}
              <span className="mx-3 text-ruby">·</span>
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">{ticker.join(", ")}</p>
    </section>
  );
}
