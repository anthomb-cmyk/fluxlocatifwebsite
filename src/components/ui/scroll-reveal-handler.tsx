'use client';

/**
 * @fileOverview Ce composant gère les animations de révélation au défilement (Scroll Reveal)
 * en utilisant un Intersection Observer. Il ajoute la classe 'is-visible' aux éléments
 * ayant la classe 'reveal-animation' lorsqu'ils entrent dans le viewport.
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollRevealHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const revealSelector =
      ".reveal-animation, .scroll-fade-up, .scroll-from-left, .scroll-from-right, .scroll-scale-in, .scroll-blur-in, .scroll-clip-reveal, .scroll-tilt-in";

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      document.querySelectorAll(revealSelector).forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    const observerOptions = {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeElements = () => {
      const elements = document.querySelectorAll(revealSelector);
      elements.forEach((el) => {
        observer.observe(el);
      });
    };

    // Scan initial des éléments au montage ou changement de route
    observeElements();

    // Observation des mutations pour capturer les éléments injectés dynamiquement (ex: au changement de route)
    const mutationObserver = new MutationObserver((mutations) => {
      let needsScan = false;
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          needsScan = true;
        }
      });
      if (needsScan) observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
