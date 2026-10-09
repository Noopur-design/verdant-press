import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-store";

export function MotionRoot({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let dead = false;
    let revert: (() => void) | undefined;
    let timer = 0;

    const boot = () => {
      if (dead || !ref.current) return;
      void (async () => {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        if (dead || !ref.current) return;
        gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const trigger = el.parentElement;
          if (!trigger) return;
          gsap.fromTo(
            el,
            { yPercent: -4 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        const line = ref.current?.querySelector<HTMLElement>("[data-progress-line]");
        if (line?.parentElement) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: line.parentElement,
                start: "top 75%",
                end: "bottom 55%",
                scrub: true,
              },
            },
          );
        }
      }, ref);

      revert = () => ctx.revert();
      window.setTimeout(() => ScrollTrigger.refresh(), 400);
      })();
    };

    timer = window.setTimeout(boot, 120);

    return () => {
      dead = true;
      window.clearTimeout(timer);
      revert?.();
    };
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}

export function CartHydrator() {
  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);
  return null;
}
