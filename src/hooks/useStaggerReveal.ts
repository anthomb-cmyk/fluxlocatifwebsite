import { useEffect, useRef, useState } from 'react';

export function useStaggerReveal(count: number, delayBetween = 120, threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? count
      : 0;
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < count; i++) {
            const timer = window.setTimeout(
              () => setVisibleCount(i + 1),
              i * delayBetween
            );
            timers.push(timer);
          }
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [count, delayBetween, threshold]);

  return { ref, visibleCount };
}
