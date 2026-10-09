import { ticker } from "@/lib/catalog";
import { ArrowLink } from "@/components/ui";

export function Hero() {
  const loop = [...ticker, ...ticker];
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="relative mx-auto grid max-w-[90rem] items-center gap-8 px-4 pb-16 pt-28 md:px-8 lg:min-h-[100svh] lg:grid-cols-12 lg:items-center lg:pb-24 lg:pt-28">
        <div className="hero-copy relative z-10 min-w-0 lg:col-span-6">
          <p className="fade-up font-display text-micro tracking-label text-botanical">COLD-PRESSED FOR INDIAN MORNINGS</p>
          <h1 className="hero-display mt-4 font-display font-semibold uppercase text-ink">
            <span className="rise-line">
              <span>Goodness,</span>
            </span>
            <span className="rise-line">
              <span style={{ animationDelay: "120ms" }}>
                Made <em className="font-serif font-normal italic normal-case">daily.</em>
              </span>
            </span>
          </h1>
          <p className="fade-up mt-6 max-w-md text-base leading-relaxed text-charcoal/80" style={{ animationDelay: "220ms" }}>
            Fresh juice for the hour after chai. Real fruit — seb, kheera, nimbu, tarbooz — short recipes, and nothing you do not need.
          </p>
          <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "320ms" }}>
            <ArrowLink to="/juices">Explore the Juices</ArrowLink>
            <ArrowLink to="/story" tone="ghost">
              Discover Our Story
            </ArrowLink>
          </div>
          <ul className="fade-up mt-8 flex flex-wrap gap-x-4 gap-y-1 text-sm text-botanical" style={{ animationDelay: "420ms" }}>
            {["Seb", "Kheera", "Nimbu", "Tarbooz"].map((item) => (
              <li key={item} className="font-serif italic">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6">
          <div
            className="relative ml-auto h-[78vw] min-h-[17.5rem] max-h-[760px] w-[94%] overflow-hidden lg:h-[min(78vh,760px)] lg:w-full"
            style={{ clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 86%)" }}
          >
            <img
              src="/images/hero.jpg"
              alt="Three cold-pressed juice bottles in green, orange, and ruby, arranged with fruit on stone"
              width={1500}
              height={844}
              data-parallax
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-[115%] w-full object-cover object-[68%_center]"
            />
          </div>
          <img loading="lazy" decoding="async"
            src="/images/cut-green.jpg"
            alt=""
            className="absolute -left-2 top-[42%] h-28 w-28 object-cover sil-seed shadow-md md:h-36 md:w-36"
          />
          <div className="absolute bottom-8 right-6 hidden text-ink md:block">
            <Stamp />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-ink/10 bg-ink text-paper">
        <div className="marquee-track py-3">
          {loop.map((item, index) => (
            <span key={`${item}-${index}`} className="mx-4 font-display text-micro tracking-label">
              {item}
              <span className="mx-4 text-citrus">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stamp() {
  return (
    <svg viewBox="0 0 120 120" className="h-16 w-16 md:h-28 md:w-28" aria-hidden="true">
      <defs>
        <path id="stamp-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
      </defs>
      <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <text fill="currentColor" style={{ fontSize: "8px", letterSpacing: "0.16em" }}>
        <textPath href="#stamp-circle">COLD PRESSED · INDIA · DAILY · </textPath>
      </text>
      <text
        x="60"
        y="64"
        textAnchor="middle"
        fill="currentColor"
        style={{ fontFamily: "Instrument Serif, Georgia, serif", fontStyle: "italic", fontSize: "16px" }}
      >
        VP
      </text>
    </svg>
  );
}
