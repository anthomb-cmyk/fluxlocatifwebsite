'use client';

/**
 * @fileOverview Ce composant gère les animations de révélation au défilement (Scroll Reveal)
 * en utilisant un Intersection Observer. Il ajoute la classe 'is-visible' aux éléments
 * ayant la classe 'reveal-animation' lorsqu'ils entrent dans le viewport, et la retire
 * lorsqu'ils en sortent pour permettre le rejeu (replay).
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollRevealHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          // Replay: Yes - Retire la classe pour permettre une nouvelle animation lors du re-entry
          entry.target.classList.remove('is-visible');
        }
      });
    }, observerOptions);

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal-animation');
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
