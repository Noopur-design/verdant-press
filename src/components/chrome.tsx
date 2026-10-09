import { useEffect, useId, useMemo, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Search, ShoppingBag, X } from "lucide-react";
import { articles, ingredients, juices } from "@/lib/catalog";
import { useCartCount } from "@/lib/cart-store";
import { cn } from "@/lib/cn";
import { Wordmark } from "@/components/logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/juices", label: "Our Juices" },
  { to: "/ingredients", label: "Ingredients" },
  { to: "/story", label: "Our Story" },
  { to: "/journal", label: "Journal" },
] as const;

const juiceLinks = [
  { slug: "green-ritual", label: "Green Ritual" },
  { slug: "citrus-glow", label: "Citrus Glow" },
  { slug: "ruby-reset", label: "Ruby Reset" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const count = useCartCount();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const solid = pathname !== "/" || scrolled || menu || search;

  useEffect(() => {
    setMenu(false);
    setSearch(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const close = () => {
      if (desktop.matches) setMenu(false);
    };
    close();
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menu]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70] px-3 pt-3 md:px-6 md:pt-4">
        <div
          className={cn(
            "flex items-center gap-3 px-2 py-2 transition-colors duration-300 md:px-3",
            solid ? "border border-ink/10 bg-paper" : "border border-transparent bg-transparent",
          )}
        >
          <Wordmark />
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="btn-press grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-paper/80 text-ink"
              aria-label="Search"
              aria-expanded={search}
              onClick={() => {
                setSearch((open) => !open);
                setMenu(false);
              }}
            >
              <Search className="size-4" />
            </button>
            <Link
              to="/cart"
              className="btn-press relative grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-paper/80 text-ink"
              aria-label={`Cart, ${count} items`}
            >
              <ShoppingBag className="size-4" />
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 font-display text-micro tabular-nums text-paper">
                {count}
              </span>
            </Link>
            <button
              type="button"
              className="btn-press grid h-11 w-11 place-items-center rounded-full bg-ink text-paper"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => {
                setMenu((open) => !open);
                setSearch(false);
              }}
            >
              <span className="relative block h-3 w-4" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-4 bg-paper transition-transform duration-300",
                    menu && "top-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-3 bg-lime transition-transform duration-300",
                    menu && "bottom-1.5 w-4 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
        <SearchPanel open={search} onClose={() => setSearch(false)} />
      </header>
      <MenuPanel open={menu} onClose={() => setMenu(false)} />
    </>
  );
}

type Hit =
  | { kind: "juice"; slug: string; label: string; meta: string }
  | { kind: "ingredient"; label: string; meta: string }
  | { kind: "article"; slug: string; label: string; meta: string };

function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const listId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as Hit[];
    const juiceHits: Hit[] = juices
      .filter((juice) => `${juice.name} ${juice.blurb} ${juice.ingredients.join(" ")}`.toLowerCase().includes(q))
      .map((juice) => ({ kind: "juice", slug: juice.slug, label: juice.name, meta: "Juice" }));
    const ingredientHits: Hit[] = ingredients
      .filter((item) => `${item.name} ${item.descriptor} ${item.note}`.toLowerCase().includes(q))
      .map((item) => ({ kind: "ingredient", label: item.name, meta: "Ingredient" }));
    const articleHits: Hit[] = articles
      .filter((article) => `${article.title} ${article.excerpt}`.toLowerCase().includes(q))
      .map((article) => ({ kind: "article", slug: article.slug, label: article.title, meta: "Journal" }));
    return [...juiceHits, ...ingredientHits, ...articleHits].slice(0, 8);
  }, [query]);

  return (
    open ? (
        <div className="fade-up ml-auto mt-2 w-full max-w-md border border-ink/10 bg-paper p-4">
          <label htmlFor={listId} className="font-display text-micro tracking-label text-botanical">
            SEARCH THE PRESS
          </label>
          <input
            id={listId}
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Seb, kheera, journal"
            className="mt-2 w-full border-b border-ink/20 bg-transparent py-2 font-display text-lg text-ink outline-none placeholder:text-ink/30"
          />
          <div className="mt-3">
            {query.trim() && results.length === 0 ? (
              <p className="py-3 text-sm text-charcoal/70">Nothing under that name.</p>
            ) : (
              <ul>
                {results.map((result) => (
                  <li key={result.meta + result.label}>
                    {result.kind === "juice" ? (
                      <Link
                        to="/juices/$slug"
                        params={{ slug: result.slug }}
                        onClick={onClose}
                        className="flex items-baseline justify-between gap-4 border-t border-ink/10 py-2.5"
                      >
                        <span className="font-display text-ink">{result.label}</span>
                        <span className="font-serif text-sm italic text-botanical">{result.meta}</span>
                      </Link>
                    ) : result.kind === "article" ? (
                      <Link
                        to="/journal/$slug"
                        params={{ slug: result.slug }}
                        onClick={onClose}
                        className="flex items-baseline justify-between gap-4 border-t border-ink/10 py-2.5"
                      >
                        <span className="font-display text-ink">{result.label}</span>
                        <span className="font-serif text-sm italic text-botanical">{result.meta}</span>
                      </Link>
                    ) : (
                      <Link
                        to="/ingredients"
                        onClick={onClose}
                        className="flex items-baseline justify-between gap-4 border-t border-ink/10 py-2.5"
                      >
                        <span className="font-display text-ink">{result.label}</span>
                        <span className="font-serif text-sm italic text-botanical">{result.meta}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
    ) : null
  );
}

function MenuPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return open ? (
    <>
      <button
        type="button"
        aria-label="Close menu"
        className="menu-veil fixed inset-0 z-40 bg-ink/40"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="menu-panel fixed inset-x-0 bottom-0 top-[4.75rem] z-[60] flex w-full flex-col overflow-y-auto bg-ink text-paper md:inset-x-auto md:bottom-4 md:right-4 md:top-[5.5rem] md:w-[min(100%-2rem,28rem)] md:rounded-sm"
      >
            <div className="flex items-center justify-between px-6 pb-2 pt-6">
              <p className="font-display text-micro tracking-label text-sage">MENU</p>
              <button
                type="button"
                onClick={onClose}
                className="btn-press grid h-11 w-11 place-items-center rounded-full border border-paper/25"
                aria-label="Close menu"
              >
                <X className="size-4" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center px-6 py-4" aria-label="Menu">
              {links.map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  style={{ animationDelay: `${80 + index * 55}ms` }}
                  className="menu-link group flex items-baseline justify-between border-b border-paper/10 py-2.5"
                >
                  <span className="font-display text-[clamp(1.7rem,7vw,2.35rem)] font-medium tracking-tight">{link.label}</span>
                  <ArrowUpRight className="size-5 shrink-0 text-lime transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
              <Link to="/cart" onClick={onClose} className="menu-link mt-5 font-serif text-2xl italic text-lime">
                Cart
              </Link>
            </nav>
            <div className="relative h-24 shrink-0 overflow-hidden sm:h-36">
              <img loading="lazy" decoding="async" src="/images/leaf.jpg" alt="" className="h-full w-full object-cover opacity-80" />
              <p className="absolute bottom-4 left-6 font-serif text-xl italic">Pure juice. Brighter days.</p>
            </div>
          </aside>
    </>
  ) : null;
}

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [socialNote, setSocialNote] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <img loading="lazy" decoding="async" src="/images/leaf.jpg" alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-4">
          <Wordmark tone="paper" />
          <p className="mt-6 max-w-xs font-serif text-3xl italic leading-tight text-lime">Pure juice. Brighter days.</p>
          <p className="mt-3 max-w-xs text-sm text-paper/75">Pressed for mornings in Mumbai, Bengaluru, Delhi, and Hyderabad.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-4">
          <div>
            <p className="font-display text-micro tracking-label text-sage">SHOP</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/juices" className="hover:text-lime">
                  Our Juices
                </Link>
              </li>
              {juiceLinks.map((juice) => (
                <li key={juice.slug}>
                  <Link to="/juices/$slug" params={{ slug: juice.slug }} className="hover:text-lime">
                    {juice.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/cart" className="hover:text-lime">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-micro tracking-label text-sage">HOUSE</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/ingredients" className="hover:text-lime">
                  Ingredients
                </Link>
              </li>
              <li>
                <Link to="/story" className="hover:text-lime">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-lime">
                  Journal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-lime">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-lime">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <form
          className="relative z-10 md:col-span-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!email.includes("@")) return;
            const key = "verdant-press-notes";
            const prev = JSON.parse(localStorage.getItem(key) || "[]") as string[];
            localStorage.setItem(key, JSON.stringify([...prev, email]));
            setJoined(true);
            setEmail("");
          }}
        >
          <p className="font-display text-micro tracking-label text-sage">NOTES FROM THE PRESS</p>
          <p className="mt-3 max-w-xs text-sm text-paper/75">A demo list saved on this device only. Nothing is emailed or sent on WhatsApp.</p>
          {joined ? (
            <p className="mt-5 font-serif text-2xl italic text-lime" role="status">
              Saved on this device.
            </p>
          ) : (
            <div className="mt-5 flex items-center gap-2">
              <label className="sr-only" htmlFor="footer-email">
                Email
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="h-12 min-w-0 flex-1 rounded-full border border-paper/25 bg-ink/40 px-4 text-sm text-paper outline-none placeholder:text-paper/45"
              />
              <button
                type="submit"
                className="btn-press grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lime text-ink"
                aria-label="Save email on this device"
              >
                <ArrowUpRight className="size-4" />
              </button>
            </div>
          )}
        </form>
      </div>
      <div className="relative z-10 mx-auto flex max-w-6xl items-end justify-between gap-4 px-5 pb-6 md:px-8">
        <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-xs text-paper/65">© {new Date().getFullYear()} Verdant Press, India. Design demonstration.</p>
          <Link to="/privacy" className="text-xs hover:text-lime">
            Privacy
          </Link>
          <Link to="/terms" className="text-xs hover:text-lime">
            Terms
          </Link>
          <button type="button" className="text-xs hover:text-lime" onClick={() => setSocialNote(true)}>
            Social
          </button>
          {socialNote ? <span className="text-xs text-lime">Profiles are not live yet.</span> : null}
        </div>
        <img
          loading="lazy"
          decoding="async"
          src="/images/cut-citrus.jpg"
          alt=""
          className="h-16 w-16 shrink-0 object-cover sil-seed sm:h-24 sm:w-24"
        />
      </div>
    </footer>
  );
}
