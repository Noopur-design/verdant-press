import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/cn";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-8 w-8", className)}>
      <rect width="32" height="32" rx="10" className="fill-ink" />
      <path
        d="M16.2 6.5c.3 3.2-.4 5.4-2.2 7.2 2.6.2 4.6 1.2 6.1 3.2-2.4-1-4.2-.8-6 .4 1.8 1.6 2.6 3.8 2.3 6.6-3.4-2.2-5.2-5-5.2-8.4 0-3.1 1.5-6 5-8.99z"
        className="fill-lime"
      />
      <circle cx="22.2" cy="10.2" r="1.5" className="fill-citrus" />
    </svg>
  );
}

export function Wordmark({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)} aria-label="VERDANT PRESS, home">
      <Mark />
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-sm font-semibold tracking-label",
            tone === "paper" ? "text-paper" : "text-ink",
          )}
        >
          VERDANT
        </span>
        <span
          className={cn(
            "mt-1 block font-display text-micro tracking-label",
            tone === "paper" ? "text-sage" : "text-botanical",
          )}
        >
          PRESS
        </span>
      </span>
    </Link>
  );
}
