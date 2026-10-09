import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, X } from "lucide-react";
import { getJuice, ingredients, type Ingredient } from "@/lib/catalog";
import { cn } from "@/lib/cn";

const windowMask: Record<string, string> = {
  "window-leaf": "radial-gradient(ellipse 46% 52% at 50% 40%, transparent 66%, #000 68%)",
  "window-capsule": "radial-gradient(ellipse 30% 56% at 50% 42%, transparent 70%, #000 72%)",
  "window-segment": "radial-gradient(circle at 64% 46%, transparent 40%, #000 42%)",
};

export function IngredientGallery({ heading = true }: { heading?: boolean }) {
  const [active, setActive] = useState<Ingredient | null>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

  return (
    <section className="bg-lime px-4 py-20 md:px-8 md:py-28" id="ingredients">

      {heading ? (
        <div data-reveal className="mx-auto mb-10 flex max-w-6xl flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-micro tracking-label text-botanical">THE PRESSING</p>
            <h2 className="mt-3 max-w-xl font-display text-editorial font-semibold text-ink">
              Six ingredients,
              <span className="font-serif font-normal italic"> kept recognizable.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-charcoal/80">
            A market rail, not a product grid. Seb, kheera, palak, nimbu, tarbooz — open any one, or the one we left out.
          </p>
        </div>
      ) : null}

      <div className="mx-auto flex w-full min-w-0 max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto contain-paint pb-4 lg:grid lg:grid-cols-12 lg:items-start lg:gap-6 lg:overflow-visible lg:contain-none">
        {ingredients.map((item) => (
          <article
            key={item.id}
            className={cn(
              "w-[84vw] shrink-0 snap-center sm:w-[70vw] lg:w-auto",
              item.id === "green-apple" && "lg:col-span-7",
              item.id === "cucumber" && "lg:col-span-5 lg:mt-16",
              item.id === "avocado" && "lg:col-span-6",
              item.id === "spinach" && "lg:col-span-6 lg:mt-8",
              item.id === "citrus" && "lg:col-span-5",
              item.id === "watermelon" && "lg:col-span-7 lg:-mt-6",
            )}
          >
            <IngredientCard
              item={item}
              buttonRef={(node) => {
                triggers.current[item.id] = node;
              }}
              onOpen={() => setActive(item)}
            />
          </article>
        ))}
      </div>

      <IngredientPanel
        item={active}
        onClose={() => {
          const id = active?.id;
          setActive(null);
          if (id) triggers.current[id]?.focus();
        }}
      />
    </section>
  );
}

function useWarmImage() {
  const [ready, setReady] = useState(false);
  return {
    ready,
    arm: () => setReady(true),
  };
}

function IngredientCard({
  item,
  onOpen,
  buttonRef,
}: {
  item: Ingredient;
  onOpen: () => void;
  buttonRef: (node: HTMLButtonElement | null) => void;
}) {
  if (item.shape === "collage") return <CollageCard item={item} onOpen={onOpen} buttonRef={buttonRef} />;
  if (item.shape.startsWith("window")) return <WindowCard item={item} onOpen={onOpen} buttonRef={buttonRef} />;
  return <SpecimenCard item={item} onOpen={onOpen} buttonRef={buttonRef} />;
}

function SpecimenCard({
  item,
  onOpen,
  buttonRef,
}: {
  item: Ingredient;
  onOpen: () => void;
  buttonRef: (node: HTMLButtonElement | null) => void;
}) {
  const arch = item.shape === "arch";
  const warm = useWarmImage();
  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={onOpen}
      onPointerEnter={warm.arm}
      onFocus={warm.arm}
      className={cn(
        "group relative block min-h-[28rem] w-full overflow-hidden text-left specimen-line",
        arch ? "sil-arch" : "sil-specimen",
      )}
    >
      <img loading="lazy" decoding="async"
        src={item.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {warm.ready ? (
        <img loading="lazy" decoding="async"
          src={item.macro}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-out [clip-path:circle(0%_at_78%_22%)] group-hover:opacity-100 group-hover:[clip-path:circle(42%_at_70%_28%)]"
        />
      ) : null}
      <span className="pointer-events-none absolute inset-0 opacity-0 shadow-[inset_0_0_0_1px_rgba(245,240,229,0.85)] transition-opacity duration-300 group-hover:opacity-100" />
      <span className="ing-label absolute bottom-4 left-4 right-4 bg-paper px-4 py-3 text-ink transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1">
        <span className="font-display text-micro tracking-label text-botanical">
          {item.index} / {item.name.toUpperCase()}
        </span>
        <span className="mt-1 block font-serif text-2xl italic">{item.descriptor}</span>
      </span>
      <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-paper/80 text-paper">
        <Plus className="size-4 transition-transform duration-300 group-hover:rotate-45" />
      </span>
      <span className="sr-only">Open {item.name}</span>
    </button>
  );
}

function WindowCard({
  item,
  onOpen,
  buttonRef,
}: {
  item: Ingredient;
  onOpen: () => void;
  buttonRef: (node: HTMLButtonElement | null) => void;
}) {
  const mask = windowMask[item.shape] ?? windowMask["window-leaf"];
  const silhouette =
    item.shape === "window-leaf" ? "sil-leaf" : item.shape === "window-capsule" ? "sil-ticket" : "sil-segment";
  const warm = useWarmImage();

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={onOpen}
      onPointerEnter={warm.arm}
      onFocus={warm.arm}
      className="group relative block min-h-[30rem] w-full text-left"
    >
      <img loading="lazy" decoding="async"
        src={item.image}
        alt=""
        className="absolute inset-[-4%] h-[108%] w-[108%] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {warm.ready ? (
        <img loading="lazy" decoding="async"
          src={item.macro}
          alt=""
          className="absolute inset-[-4%] h-[108%] w-[108%] object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
      ) : null}
      <div className={cn("pointer-events-none absolute inset-3 overflow-hidden pack-line md:inset-4", silhouette)}>
        <div
          className="absolute inset-0 bg-paper"
          style={{
            maskImage: mask,
            WebkitMaskImage: mask,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      </div>
      <span className="ing-label absolute bottom-7 left-7 right-7 z-10 max-w-[14rem] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1">
        <span className="font-display text-micro tracking-label text-botanical">
          {item.index} / {item.name.toUpperCase()}
        </span>
        <span className="mt-1 block font-serif text-2xl italic text-ink">{item.descriptor}</span>
      </span>
      <span className="absolute right-7 top-7 z-10 grid h-10 w-10 place-items-center rounded-full border border-ink/20 bg-paper text-ink">
        <Plus className="size-4 transition-transform duration-300 group-hover:rotate-45" />
      </span>
      <span className="sr-only">Open {item.name}</span>
    </button>
  );
}

function CollageCard({
  item,
  onOpen,
  buttonRef,
}: {
  item: Ingredient;
  onOpen: () => void;
  buttonRef: (node: HTMLButtonElement | null) => void;
}) {
  const warm = useWarmImage();
  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={onOpen}
      onPointerEnter={warm.arm}
      onFocus={warm.arm}
      className="group block w-full text-left"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-micro tracking-label text-botanical">
            {item.index} / {item.name.toUpperCase()}
          </p>
          <p className="mt-1 font-serif text-3xl italic text-ink">{item.descriptor}</p>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-full border border-ink/20">
          <Plus className="size-4 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>
      <div className="relative mt-4 min-h-[24rem]">
        <img loading="lazy" decoding="async"
          src={item.image}
          alt=""
          className="h-[24rem] w-[86%] object-cover sil-specimen transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {warm.ready ? (
          <img loading="lazy" decoding="async"
            src={item.macro}
            alt=""
            className="absolute -left-2 top-8 h-28 w-28 object-cover sil-seed opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        ) : null}
        <img loading="lazy" decoding="async"
          src="/images/cut-green.jpg"
          alt=""
          className="absolute bottom-6 right-0 h-24 w-24 rounded-full object-cover ring-2 ring-lime"
        />
        <svg className="pointer-events-none absolute left-[18%] top-3 h-16 w-24 text-ink/50" viewBox="0 0 100 40" aria-hidden="true">
          <path d="M0 32 C 30 32, 40 8, 96 8" fill="none" stroke="currentColor" strokeWidth="0.6" />
        </svg>
        <span className="absolute left-[22%] top-0 font-serif text-sm italic text-ink">03</span>
        <p className="absolute -right-1 bottom-0 max-w-[9rem] bg-paper/90 px-2 py-1 text-xs leading-snug text-charcoal">
          Testing. Not in the daily three.
        </p>
      </div>
      <span className="sr-only">Open {item.name}</span>
    </button>
  );
}

function IngredientPanel({ item, onClose }: { item: Ingredient | null; onClose: () => void }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  if (!item) return null;
  const blends = item.usedIn.map((slug) => getJuice(slug)).filter((juice) => juice != null);

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Close ingredient" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="ingredient-title"
        className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-paper"
      >
        <div className="relative h-72 overflow-hidden sil-specimen m-4">
          <img loading="lazy" decoding="async" src={item.image} alt={`${item.name}, cut open`} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-paper text-ink"
            aria-label="Close"
            autoFocus
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="px-6 pb-10">
          <p className="font-display text-micro tracking-label text-botanical">{item.index}</p>
          <h3 id="ingredient-title" className="mt-2 font-display text-4xl font-semibold text-ink">
            {item.name}
          </h3>
          <p className="mt-2 font-serif text-2xl italic text-botanical">{item.descriptor}</p>
          <p className="mt-5 text-sm leading-relaxed text-charcoal/85">{item.body}</p>
          <div className="mt-8">
            <p className="font-display text-micro tracking-label text-botanical">IN THE BLENDS</p>
            {blends.length === 0 ? (
              <p className="mt-3 text-sm">Not used in the current signature juices.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {blends.map((juice) => (
                  <li key={juice.slug}>
                    <Link to="/juices/$slug" params={{ slug: juice.slug }} onClick={onClose} className="font-display text-lg text-ink hover:text-botanical">
                      {juice.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
