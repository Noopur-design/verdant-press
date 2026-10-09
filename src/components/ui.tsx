import { Link } from "@tanstack/react-router";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ArrowUpRight, Check, ChevronDown, Minus, Plus } from "lucide-react";
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

export function Select({
  value,
  onChange,
  options,
  id,
  ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  id?: string;
  ariaLabel?: string;
}) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange}>
      <SelectPrimitive.Trigger
        id={id}
        aria-label={ariaLabel}
        className="group flex w-full items-center justify-between gap-3 border-b border-ink/20 bg-transparent py-2 text-left font-sans text-ink outline-none transition-colors focus-visible:border-botanical data-[state=open]:border-botanical"
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon>
          <ChevronDown className="size-4 text-botanical transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className="select-pop z-[90] max-h-72 w-[var(--radix-select-trigger-width)] overflow-hidden border border-ink/15 bg-paper shadow-xl shadow-ink/10"
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option}
                value={option}
                className="flex cursor-pointer select-none items-center justify-between gap-3 px-3 py-2.5 font-sans text-sm text-ink outline-none transition-colors data-[highlighted]:bg-lime data-[state=checked]:font-medium data-[state=checked]:text-botanical"
              >
                <SelectPrimitive.ItemText>{option}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <Check className="size-4 text-botanical" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
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
