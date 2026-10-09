import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — VERDANT PRESS" },
      { name: "description", content: "How this Verdant Press demonstration handles information on your device." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 pb-24 pt-32">
      <p className="font-display text-micro tracking-label text-botanical">PRIVACY</p>
      <h1 className="mt-3 font-display text-editorial font-semibold text-ink">Kept on your device.</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-charcoal/85">
        <p>
          Verdant Press, as shown here, is a design demonstration for an Indian juice press. The cart, the note field, and the contact form store text in this browser only. Nothing is sent to a server, a mailing list, WhatsApp, or a payment service — including UPI.
        </p>
        <p>Clearing site data in your browser removes those notes. This demo does not collect or sell personal information.</p>
        <p>If a production shop is launched later, this page should be replaced with a policy that matches the real systems.</p>
      </div>
    </main>
  );
}
