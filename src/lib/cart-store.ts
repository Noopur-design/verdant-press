import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  slug: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (slug, qty = 1) => {
        const items = get().items;
        const found = items.find((item) => item.slug === slug);
        const nextQty = Math.min(12, (found?.qty ?? 0) + qty);
        set({
          items: found
            ? items.map((item) => (item.slug === slug ? { ...item, qty: nextQty } : item))
            : [...items, { slug, qty: Math.min(12, qty) }],
        });
      },
      setQty: (slug, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((item) => item.slug !== slug) });
          return;
        }
        set({
          items: get().items.map((item) =>
            item.slug === slug ? { ...item, qty: Math.min(12, qty) } : item,
          ),
        });
      },
      remove: (slug) => set({ items: get().items.filter((item) => item.slug !== slug) }),
      clear: () => set({ items: [] }),
    }),
    { name: "verdant-press-cart", skipHydration: true },
  ),
);

export function useCartCount() {
  return useCart((state) => state.items.reduce((total, item) => total + item.qty, 0));
}
