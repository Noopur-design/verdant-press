import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "@/lib/catalog";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — VERDANT PRESS" },
      { name: "description", content: "Notes from Verdant Press on pressing, green juice, and leaving ingredients out." },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const [lead, ...rest] = articles;
  if (!lead) return null;
  return (
    <main className="px-5 pb-20 pt-32 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-micro tracking-label text-botanical">JOURNAL</p>
        <h1 className="mt-3 max-w-xl font-display text-editorial font-semibold text-ink">Notes, not claims.</h1>
        <Link to="/journal/$slug" params={{ slug: lead.slug }} className="mt-10 grid items-end gap-6 md:grid-cols-12">
          <img loading="lazy" decoding="async" src={lead.image} alt="" className="h-80 w-full object-cover sil-specimen md:col-span-7" />
          <span className="md:col-span-5">
            <span className="font-display text-micro tracking-label text-botanical">{lead.kicker}</span>
            <span className="mt-2 block font-display text-4xl font-semibold text-ink">{lead.title}</span>
            <span className="mt-3 block text-sm leading-relaxed text-charcoal/80">{lead.excerpt}</span>
          </span>
        </Link>
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {rest.map((article, index) => (
            <Link
              key={article.slug}
              to="/journal/$slug"
              params={{ slug: article.slug }}
              className={index === 1 ? "md:mt-16" : ""}
            >
              <img loading="lazy" decoding="async" src={article.image} alt="" className="h-56 w-full object-cover sil-arch" />
              <p className="mt-4 font-display text-micro tracking-label text-botanical">{article.kicker}</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink">{article.title}</h2>
              <p className="mt-2 text-sm text-charcoal/75">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
