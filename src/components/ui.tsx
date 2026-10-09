import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { useCart } from "@/lib/cart-store";

type StaticTo = "/" | "/juices" | "/story" | "/ingredients" | "/journal" | "/contact" | "/cart" | "/privacy" | "/terms";

export function ArrowLink({
  to,
  children,
  tone = "ink",
  className,
}: {
  to: StaticTo;
  children: React.ReactNode;
  tone?: "ink" | "paper" | "ghost";
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group btn-press btn-asym inline-flex min-h-11 items-center gap-3 px-5 py-3 font-display text-sm font-semibold tracking-wide",
        tone === "ink" && "bg-ink text-paper",
        tone === "paper" && "bg-paper text-ink",
        tone === "ghost" && "border border-ink/20 bg-transparent text-ink",
        className,
      )}
    >
      {children}
      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

export function AddButton({
  slug,
  qty = 1,
  tone = "ink",
  className,
}: {
  slug: string;
  qty?: number;
  tone?: "ink" | "paper" | "ghost";
  className?: string;
}) {
  const add = useCart((state) => state.add);
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={cn(
        "btn-press btn-asym inline-flex min-h-11 items-center gap-3 px-5 py-3 font-display text-sm font-semibold tracking-wide",
        tone === "ink" && "bg-ink text-paper",
        tone === "paper" && "bg-paper text-ink",
        tone === "ghost" && "border border-ink/25 bg-transparent text-ink",
        className,
      )}
      onClick={() => {
        add(slug, qty);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
    >
      {added ? "Added to cart" : "Add to cart"}
      <ArrowUpRight className="size-4" />
    </button>
  );
}

export function QtySelector({
  value,
  onChange,
  tone = "ink",
}: {
  value: number;
  onChange: (value: number) => void;
  tone?: "ink" | "paper";
}) {
  const border = tone === "paper" ? "border-paper/30 text-paper" : "border-ink/20 text-ink";
  return (
    <div className={cn("inline-flex items-center border", border)}>
      <button
        type="button"
        className="grid h-11 w-11 place-items-center"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <Minus className="size-4" />
      </button>
      <span className="w-8 text-center font-display text-sm tabular-nums">{value}</span>
      <button
        type="button"
        className="grid h-11 w-11 place-items-center"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(12, value + 1))}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
