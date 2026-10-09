import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function Landscape() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-botanical text-paper">
      <img loading="lazy" decoding="async"
        src="/images/moss.jpg"
        alt="Three juice bottles arranged on moss-covered stone"
        data-parallax
        className="absolute inset-0 h-[118%] w-full object-cover object-[70%_center]"
      />
      <div className="relative z-10 flex min-h-[88vh] flex-col justify-between px-5 py-20 md:px-10 md:py-24">
        <div className="max-w-xl">
          <p className="font-display text-micro tracking-label text-ink">THE HOUSE</p>
          <h2 className="mt-3 bg-paper/80 px-2 font-display text-editorial font-semibold text-ink box-decoration-clone">
            A little closer to nature.
          </h2>
          <p data-reveal className="mt-6 max-w-md bg-paper/75 px-3 py-2 text-sm leading-relaxed text-ink">
            A bottle should fit the day you already have — after chai, before the commute. Fresh fruit, short blends, nothing dressed up.
          </p>
          <Link
            to="/story"
            className="btn-press mt-6 inline-flex min-h-11 items-center gap-2 bg-ink px-4 py-3 font-display text-sm text-paper"
          >
            Read the story
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <p className="self-start font-display text-micro tracking-label text-paper md:hidden">KHEERA · SEB · NIMBU · TARBOOZ</p>
        <p
          className="hidden self-end font-display text-micro tracking-label text-paper md:block"
          style={{ writingMode: "vertical-rl" }}
        >
          KHEERA · SEB · NIMBU · TARBOOZ
        </p>
      </div>
    </section>
  );
}
