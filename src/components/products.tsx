import { Link } from "@tanstack/react-router";
import { formatPrice, PRICE_NOTE, RECIPE_NOTE, type Juice } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { AddButton } from "@/components/ui";

export function ProductStage({ juice }: { juice: Juice }) {
  if (juice.layout === "capsule") return <Capsule juice={juice} />;
  if (juice.layout === "sunburst") return <Sunburst juice={juice} />;
  return <Arch juice={juice} />;
}

function Meta({ juice, light = false }: { juice: Juice; light?: boolean }) {
  return (
    <div className={cn("flex flex-col gap-4", light ? "text-paper" : "text-ink")}>
      <p className={cn("font-serif text-xl italic", light ? "text-lime" : "text-botanical")}>{juice.personality}</p>
      <h3 className="font-display text-4xl font-semibold leading-none md:text-5xl">
        <Link to="/juices/$slug" params={{ slug: juice.slug }} className="hover:opacity-80">
          {juice.name}
        </Link>
      </h3>
      <p className={cn("max-w-sm text-sm leading-relaxed", light ? "text-paper/80" : "text-charcoal/80")}>{juice.blurb}</p>
      <p className="font-display text-micro tracking-label opacity-70">{juice.size}</p>
      <p className="font-display text-2xl tabular-nums">
        {formatPrice(juice.price)}
        <span className="mt-1 block font-sans text-xs font-normal tracking-normal opacity-70">{PRICE_NOTE}</span>
      </p>
      <div className="flex flex-wrap gap-3">
        <AddButton slug={juice.slug} tone={light ? "paper" : "ink"} />
        <Link
          to="/juices/$slug"
          params={{ slug: juice.slug }}
          className={cn(
            "inline-flex min-h-11 items-center px-2 font-display text-sm underline decoration-1 underline-offset-4",
            light ? "text-paper" : "text-ink",
          )}
        >
          View bottle
        </Link>
      </div>
    </div>
  );
}

function Capsule({ juice }: { juice: Juice }) {
  return (
    <article className="group grid items-center gap-8 overflow-hidden bg-lime px-5 py-10 md:grid-cols-12 md:px-10 md:py-16">
      <div className="relative md:col-span-7">
        <div className="relative mx-auto h-80 w-[78%] max-w-sm overflow-hidden rounded-[999px] bg-botanical sm:h-[32rem]">
          <img
            loading="lazy"
            decoding="async"
            src={juice.overlap}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-x-[12%] bottom-0 top-[8%]">
            <img
              loading="lazy"
              decoding="async"
              src={juice.image}
              alt={`${juice.name} bottle`}
              className="bottle-hover h-full w-full object-contain"
            />
          </div>
        </div>
        <img loading="lazy" decoding="async"
          src={juice.overlapAlt}
          alt=""
          className="absolute -bottom-2 left-[6%] h-20 w-20 object-cover sil-seed sm:h-28 sm:w-28 md:h-36 md:w-36"
        />
      </div>
      <div data-reveal className="md:col-span-5">
        <p className="font-display text-micro tracking-label text-botanical">SIGNATURE 01 · VERTICAL CAPSULE</p>
        <div className="mt-4">
          <Meta juice={juice} />
        </div>
      </div>
    </article>
  );
}

function Sunburst({ juice }: { juice: Juice }) {
  return (
    <article className="group relative overflow-hidden bg-citrus px-5 py-10 text-ink md:px-10 md:py-16">
      <div className="grid items-center gap-8 md:grid-cols-12">
        <div data-reveal className="order-2 md:order-none md:col-span-5 md:col-start-8 md:row-start-1">
          <p className="font-display text-micro tracking-label">SIGNATURE 02 · OFFSET SUNBURST</p>
          <div className="mt-4">
            <Meta juice={juice} />
          </div>
        </div>
        <div className="relative order-1 md:col-span-7 md:col-start-1 md:row-start-1">
          <div className="relative h-80 sm:h-[28rem] md:ml-6">
            <div className="absolute left-0 top-0 h-52 w-52 overflow-hidden rounded-full sm:h-72 sm:w-72 md:h-96 md:w-96">
              <img loading="lazy" decoding="async"
                src={juice.overlap}
                alt="Citrus slices"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
            <div className="bottle-hover absolute bottom-0 right-0 w-36 sm:w-48 md:w-60">
              <img loading="lazy" decoding="async" src={juice.image} alt={`${juice.name} bottle`} className="w-full object-contain" />
            </div>
            <img loading="lazy" decoding="async"
              src={juice.overlapAlt}
              alt=""
              className="absolute left-[38%] top-[18%] h-24 w-24 object-cover sil-segment"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function Arch({ juice }: { juice: Juice }) {
  return (
    <article className="group overflow-hidden bg-ruby px-5 py-10 text-paper md:px-10 md:py-16">
      <div className="grid items-center gap-8 md:grid-cols-12">
        <div data-reveal className="order-2 md:order-none md:col-span-5">
          <p className="font-display text-micro tracking-label text-lime">SIGNATURE 03 · SCULPTURAL ARCH</p>
          <div className="mt-4">
            <Meta juice={juice} light />
          </div>
        </div>
        <div className="relative order-1 md:col-span-7">
          <div className="relative ml-auto h-80 w-full overflow-hidden sil-arch sm:h-[30rem] sm:w-[88%]">
            <img loading="lazy" decoding="async" src={juice.overlapAlt} alt="Cut watermelon" className="h-full w-full object-cover" />
          </div>
          <div className="bottle-hover absolute bottom-0 left-[4%] w-36 sm:w-44 md:w-56">
            <img loading="lazy" decoding="async" src={juice.image} alt={`${juice.name} bottle`} className="w-full object-contain" />
          </div>
          <img loading="lazy" decoding="async"
            src={juice.overlap}
            alt=""
            className="absolute -right-2 top-6 h-20 w-20 rounded-full object-cover sm:h-28 sm:w-28 md:h-36 md:w-36"
          />
        </div>
      </div>
    </article>
  );
}

export function CollectionIntro() {
  return (
    <div data-reveal className="mx-auto max-w-6xl px-5 pb-8 pt-6 md:px-8">
      <p className="font-display text-micro tracking-label text-botanical">THE DAILY THREE</p>
      <h2 className="mt-3 max-w-2xl font-display text-editorial font-semibold text-ink">
        Signature juices, <span className="font-serif font-normal italic">three Indian tempers.</span>
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-charcoal/75">{RECIPE_NOTE}</p>
    </div>
  );
}
