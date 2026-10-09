import { Link } from "@tanstack/react-router";
import { articles } from "@/lib/catalog";

export function JournalTeaser() {
  const [lead, ...rest] = articles;
  if (!lead) return null;
  return (
    <section className="bg-paper px-5 py-20 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12">
        <div data-reveal className="md:col-span-7">
          <p className="font-display text-micro tracking-label text-botanical">JOURNAL</p>
          <Link to="/journal/$slug" params={{ slug: lead.slug }} className="group mt-4 block">
            <img loading="lazy" decoding="async" src={lead.image} alt="" className="h-72 w-full object-cover sil-specimen" />
            <p className="mt-4 font-display text-micro tracking-label text-botanical">{lead.kicker}</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-ink group-hover:text-botanical">{lead.title}</h2>
          </Link>
        </div>
        <div className="flex flex-col justify-end gap-8 md:col-span-4 md:col-start-9">
          {rest.map((article) => (
            <Link key={article.slug} to="/journal/$slug" params={{ slug: article.slug }} className="group border-t border-ink/15 pt-4">
              <p className="font-display text-micro tracking-label text-botanical">{article.kicker}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ink group-hover:text-botanical">{article.title}</h3>
              <p className="mt-2 text-sm text-charcoal/75">{article.excerpt}</p>
            </Link>
          ))}
          <Link to="/journal" className="font-serif text-xl italic text-botanical">
            All notes
          </Link>
        </div>
      </div>
    </section>
  );
}
