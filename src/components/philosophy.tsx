export function Philosophy() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <p className="font-display text-micro tracking-label text-sage">HOW WE WORK</p>
        <h2 className="mt-4 max-w-3xl font-display text-editorial font-semibold uppercase">
          Simple by nature.
          <span className="mt-1 block font-serif text-[0.72em] font-normal italic normal-case text-lime">
            Intentional by design.
          </span>
        </h2>

        <div className="relative mt-16">
          <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-paper/15 md:block" aria-hidden="true">
            <div data-progress-line className="h-full w-px origin-top bg-lime" />
          </div>

          <article data-reveal className="grid items-center gap-6 md:grid-cols-12 md:pl-10">
            <div className="md:col-span-4">
              <p className="font-display text-micro tracking-label text-citrus">01</p>
              <h3 className="mt-2 font-display text-3xl font-semibold">Real ingredients</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/75">
                If you can name it at the sabzi mandi — seb, kheera, palak — it belongs on the label. Nothing is there to impersonate fruit.
              </p>
            </div>
            <img loading="lazy" decoding="async"
              src="/images/apple.jpg"
              alt="Close view of a cut green apple"
              className="h-52 w-full object-cover sil-specimen md:col-span-5 md:col-start-7 md:h-64"
            />
          </article>

          <article data-reveal className="mt-16 grid items-end gap-6 md:mt-24 md:grid-cols-12 md:pl-10">
            <div className="relative overflow-hidden md:col-span-7">
              <img loading="lazy" decoding="async"
                src="/images/citrus.jpg"
                alt="Citrus slices in close detail"
                className="h-80 w-full object-cover sil-arch md:h-[28rem] md:w-[112%] md:max-w-none"
              />
            </div>
            <div className="md:col-span-5">
              <p className="font-display text-micro tracking-label text-citrus">02</p>
              <h3 className="mt-2 font-display text-4xl font-semibold leading-none md:text-5xl">
                Thoughtful blends
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/75">
                Three signatures for the hour after chai. Nimbu for the edge, haldi for the warmth. The editing is the recipe.
              </p>
            </div>
          </article>

          <article data-reveal className="mt-16 flex flex-col gap-6 md:mt-24 md:flex-row md:items-center md:pl-10">
            <img loading="lazy" decoding="async"
              src="/images/watermelon.jpg"
              alt="A cut watermelon wedge"
              className="h-36 w-36 shrink-0 object-cover sil-seed md:h-44 md:w-44"
            />
            <div>
              <p className="font-display text-micro tracking-label text-citrus">03</p>
              <h3 className="mt-2 font-display text-2xl font-medium tracking-tight md:text-3xl">
                Nothing unnecessary — no sweetener to hide the fruit, no color to flatter it, no claim we cannot keep.
              </h3>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
