import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { faqs } from "@/lib/catalog";
import { Select } from "@/components/ui";

const TOPICS = ["The juices", "Ingredients", "Press", "Something else"] as const;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & FAQs — VERDANT PRESS" },
      { name: "description", content: "Write to Verdant Press. Messages stay on this device. Frequently asked questions included." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState<number | null>(0);
  const [form, setForm] = useState({ name: "", email: "", topic: "The juices", message: "" });

  return (
    <main className="px-5 pb-20 pt-32 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-display text-micro tracking-label text-botanical">CONTACT</p>
          <h1 className="mt-3 font-display text-editorial font-semibold text-ink">Write to the press.</h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-charcoal/80">
            Notes stay in this browser. Nothing is emailed, and nothing is sent on WhatsApp. Use the form to try the page, not to place an order for Mumbai, Bengaluru, Delhi, or Hyderabad.
          </p>
          {sent ? (
            <p className="mt-8 font-serif text-3xl italic text-botanical" role="status">
              Saved on this device. Thank you, {form.name || "friend"}.
            </p>
          ) : (
            <form
              className="mt-8 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                const key = "verdant-press-messages";
                const prev = JSON.parse(localStorage.getItem(key) || "[]") as unknown[];
                localStorage.setItem(key, JSON.stringify([...prev, { ...form, at: Date.now() }]));
                setSent(true);
              }}
            >
              <Field label="Name" id="name">
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full border-b border-ink/20 bg-transparent py-2 outline-none"
                />
              </Field>
              <Field label="Email" id="email">
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className="w-full border-b border-ink/20 bg-transparent py-2 outline-none"
                />
              </Field>
              <Field label="Topic" id="topic">
                <Select
                  id="topic"
                  ariaLabel="Topic"
                  value={form.topic}
                  onChange={(topic) => setForm({ ...form, topic })}
                  options={TOPICS}
                />
              </Field>
              <Field label="Message" id="message">
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  className="w-full border border-ink/15 bg-transparent p-3 outline-none"
                />
              </Field>
              <button type="submit" className="btn-press btn-asym min-h-11 bg-ink px-5 py-3 font-display text-sm text-paper">
                Save note
              </button>
            </form>
          )}
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <h2 className="font-display text-3xl font-semibold text-ink">FAQs</h2>
          <div className="mt-6 divide-y divide-ink/10">
            {faqs.map((faq, index) => {
              const isOpen = open === index;
              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-4 text-left font-display text-lg text-ink"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    {faq.q}
                    <span aria-hidden="true">{isOpen ? "–" : "+"}</span>
                  </button>
                  {isOpen ? <p className="pb-4 text-sm leading-relaxed text-charcoal/80">{faq.a}</p> : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <label htmlFor={id} className="block">
      <span className="font-display text-micro tracking-label text-botanical">{label}</span>
      {children}
    </label>
  );
}
