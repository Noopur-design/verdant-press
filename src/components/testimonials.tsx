import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notes } from "@/lib/catalog";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const note = notes[index] ?? notes[0];

  function go(next: number) {
    const count = notes.length;
    setIndex((next + count) % count);
  }

  return (
    <section className="bg-sage/40 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12 md:items-end">
        <div data-reveal className="md:col-span-5">
          <p className="font-display text-micro tracking-label text-botanical">PLACEHOLDER NOTES</p>
          <h2 className="mt-3 font-display text-editorial font-semibold uppercase text-ink">
            Good juice.
            <span className="block font-serif text-[0.78em] font-normal italic normal-case">Good words.</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-charcoal/80">
            These are labeled placeholders for layout. They are not customer reviews and do not describe real people.
          </p>
        </div>

        <div
          className="relative md:col-span-7"
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Placeholder testimonials"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") go(index + 1);
            if (event.key === "ArrowLeft") go(index - 1);
          }}
        >
          <article className="relative bg-paper px-6 py-8 md:-rotate-1 md:px-8" key={note.id}>
            <img loading="lazy" decoding="async"
              src={note.image}
              alt=""
              className="mb-6 h-28 w-24 object-cover sil-arch"
            />
            <blockquote className="font-serif text-3xl italic leading-snug text-ink md:text-4xl">
              “{note.quote}”
            </blockquote>
            <p className="mt-6 font-display text-micro tracking-label text-botanical">{note.name}</p>
          </article>
          <img loading="lazy" decoding="async"
            src={notes[(index + 1) % notes.length]?.image}
            alt=""
            className="absolute -right-2 -top-6 hidden h-24 w-20 object-cover sil-seed md:block"
          />
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              className="btn-press grid h-11 w-11 place-items-center rounded-full border border-ink/20 bg-paper"
              aria-label="Previous note"
              onClick={() => go(index - 1)}
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              className="btn-press grid h-11 w-11 place-items-center rounded-full bg-ink text-paper"
              aria-label="Next note"
              onClick={() => go(index + 1)}
            >
              <ArrowRight className="size-4" />
            </button>
            <p className="ml-2 font-display text-sm tabular-nums text-ink">
              {String(index + 1).padStart(2, "0")} / {String(notes.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
