import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { articles, getArticle } from "@/lib/catalog";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.article.title} — VERDANT PRESS` : "Journal — VERDANT PRESS" },
      { name: "description", content: loaderData?.article.excerpt ?? "A note from Verdant Press." },
    ],
  }),
  component: ArticlePage,
  notFoundComponent: MissingArticle,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const others = articles.filter((item) => item.slug !== article.slug);

  return (
    <main className="pb-20 pt-28">
      <header className="mx-auto max-w-3xl px-5">
        <p className="font-display text-micro tracking-label text-botanical">{article.kicker}</p>
        <h1 className="mt-3 font-display text-editorial font-semibold text-ink">{article.title}</h1>
        <p className="mt-4 text-sm text-charcoal/70">{article.excerpt}</p>
      </header>
      <img loading="lazy" decoding="async"
        src={article.image}
        alt=""
        className="mx-auto mt-8 h-[50vh] w-full max-w-5xl object-cover px-5 sil-specimen"
      />
      <article className="mx-auto mt-10 max-w-2xl space-y-5 px-5">
        {article.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-charcoal/90">
            {paragraph}
          </p>
        ))}
      </article>
      <aside className="mx-auto mt-16 max-w-3xl border-t border-ink/10 px-5 pt-8">
        <p className="font-display text-micro tracking-label text-botanical">CONTINUE</p>
        <ul className="mt-4 space-y-3">
          {others.map((item) => (
            <li key={item.slug}>
              <Link to="/journal/$slug" params={{ slug: item.slug }} className="font-display text-2xl text-ink hover:text-botanical">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
}

function MissingArticle() {
  return (
    <main className="px-6 pb-24 pt-36">
      <h1 className="font-display text-editorial font-semibold text-ink">That note is not in the journal.</h1>
      <Link to="/journal" className="mt-4 inline-flex font-serif text-2xl italic text-botanical">
        Back to the journal
      </Link>
    </main>
  );
}
