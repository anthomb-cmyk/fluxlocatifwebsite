"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { DashboardMockup } from "@/components/ui/dashboard-mockup";

export function Hero() {
  const views: Array<"tableau" | "dossiers" | "pipeline"> = ["tableau", "dossiers", "pipeline"];
  const [activeView, setActiveView] = useState(0);
  const lastScrollY = useRef(0);
  const accumulatedScroll = useRef(0);
  const shuffleThreshold = 180;
  const stack = [
    activeView,
    (activeView + 1) % 3,
    (activeView + 2) % 3,
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      return;
    }

    const handleScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;
      accumulatedScroll.current += delta;

      const el = document.getElementById("hero-mockup");
      if (el) {
        el.style.transform = `translateY(${y * 0.12}px)`;
      }

      if (accumulatedScroll.current >= shuffleThreshold) {
        accumulatedScroll.current = 0;
        setActiveView((prev) => (prev + 1) % 3);
      } else if (accumulatedScroll.current <= -shuffleThreshold) {
        accumulatedScroll.current = 0;
        setActiveView((prev) => (prev - 1 + 3) % 3);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    lastScrollY.current = window.scrollY;
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white pt-20 pb-9 md:min-h-[125vh] md:pt-28 md:pb-0 lg:min-h-[135vh]"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_36%,#f7faff_100%)]" />
        <div className="absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(circle_at_center,transparent_24%,black_82%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(110,140,190,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(110,140,190,0.08)_1px,transparent_1px)] bg-[size:58px_58px]" />
        </div>
        <div className="absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),transparent_75%)]" />
        <div className="absolute left-[-18%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-blue-200/22 blur-[130px]" />
        <div className="absolute right-[-18%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-blue-200/22 blur-[130px]" />
        <div className="absolute left-[-12%] bottom-[-14%] h-[26rem] w-[42rem] rounded-full bg-blue-300/18 blur-[125px]" />
        <div className="absolute right-[-12%] bottom-[-14%] h-[26rem] w-[42rem] rounded-full bg-blue-300/18 blur-[125px]" />
        <div className="absolute bottom-0 left-0 h-[360px] w-[42%] opacity-40 [mask-image:linear-gradient(to_top,black,transparent)]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(152deg,rgba(120,150,210,0.18)_0px,rgba(120,150,210,0.18)_1px,transparent_1px,transparent_24px)]" />
        </div>
        <div className="absolute bottom-0 right-0 h-[360px] w-[42%] opacity-40 [mask-image:linear-gradient(to_top,black,transparent)]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(28deg,rgba(120,150,210,0.18)_0px,rgba(120,150,210,0.18)_1px,transparent_1px,transparent_24px)]" />
        </div>
        <div className="absolute left-1/2 top-[42%] h-[13rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/90 blur-[85px]" />
        <div className="absolute left-1/2 bottom-[10%] h-[20rem] w-[58rem] -translate-x-1/2 rounded-full bg-blue-200/18 blur-[120px]" />
        <div className="absolute left-1/2 bottom-[4%] h-[15rem] w-[42rem] -translate-x-1/2 rounded-full bg-white/90 blur-[72px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-[72rem] text-center">
          <div className="reveal-animation reveal-title inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/88 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary shadow-[0_14px_34px_rgba(15,23,42,0.06)] backdrop-blur-md font-body sm:px-4 sm:py-2.5 sm:text-[11px] sm:tracking-[0.24em]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>SERVICE LOCATIF EXTERNALISÉ</span>
          </div>

          <div className="reveal-animation reveal-title mb-4 mt-4 inline-flex items-center gap-3 rounded-full border border-slate-100 bg-white px-4 py-2 font-body text-[12px] text-slate-500 shadow-sm">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-medium text-slate-700">Réponse en moins de 24h</span>
            </span>
            <span className="h-3 w-px bg-slate-200" />
            <span>100% des demandes traitées</span>
          </div>

          <h1 className="scroll-blur-in mx-auto mt-5 w-full max-w-[22rem] px-2 text-balance text-[2rem] font-medium leading-[1.08] tracking-[-0.045em] text-slate-950 sm:mt-7 sm:max-w-[32rem] sm:px-0 sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4rem] font-headline">
            On répond, on trie, on structure.
          </h1>

          <p className="reveal-animation reveal-title mx-auto mt-4 max-w-[21rem] text-pretty text-[15.5px] leading-[1.65] text-slate-500 sm:mt-6 sm:max-w-[28rem] sm:text-[19px] sm:leading-9 font-body">
            Moins de temps perdu sur les messages et plus de clarté dans le traitement des dossiers.
          </p>

          <div className="reveal-animation reveal-title mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 px-6 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(59,130,246,0.24)] transition duration-300 hover:scale-[1.01] hover:shadow-[0_20px_46px_rgba(59,130,246,0.3)] sm:h-14 sm:w-auto sm:px-8 sm:text-base font-body"
            >
              Démarrer le service
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-slate-200 bg-white/92 px-6 text-[15px] font-medium text-slate-700 shadow-[0_10px_26px_rgba(15,23,42,0.05)] backdrop-blur-sm transition duration-300 hover:bg-white hover:shadow-[0_14px_36px_rgba(15,23,42,0.08)] sm:h-14 sm:w-auto sm:px-8 sm:text-base font-body"
            >
              Réserver un appel
            </Link>
          </div>

        </div>

        <div id="hero-mockup" className="reveal-animation reveal-mockup relative mx-auto mt-3 mb-8 w-full max-w-[26.5rem] px-0 sm:mt-8 sm:mb-10 sm:max-w-[1160px] sm:px-1 md:sticky md:top-24 md:mt-12 md:px-4">
          <div className="absolute inset-x-8 -bottom-8 h-40 rounded-full bg-blue-200/34 blur-3xl" />
          <div className="absolute inset-x-16 bottom-8 h-28 rounded-full bg-white/95 blur-[64px]" />

          <div className="relative" style={{ paddingTop: "28px" }}>
            <div className="relative aspect-[1.08/1] w-full sm:aspect-[1.24/1] md:aspect-[16/9]">
              {stack.map((viewIndex, position) => {
                const isFront = position === 0;
                const isMiddle = position === 1;
                const isBack = position === 2;

                return (
                  <div
                    key={`${views[viewIndex]}-${position}`}
                    className="left-0 top-0 w-full"
                    style={{
                      position: isFront ? "relative" : "absolute",
                      zIndex: isFront ? 3 : isMiddle ? 2 : 1,
                      transform: isFront
                        ? "translateY(0) scale(1)"
                        : isMiddle
                          ? "translateY(-14px) scale(0.96)"
                          : "translateY(-26px) scale(0.92)",
                      opacity: isFront ? 1 : isMiddle ? 0.7 : 0.4,
                      transition:
                        "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease",
                    }}
                  >
                    <div className="relative overflow-hidden rounded-[24px] border border-white/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.9))] p-[3px] shadow-[0_28px_70px_rgba(15,23,42,0.10)] backdrop-blur-sm sm:rounded-[30px] md:rounded-[36px] md:p-3">
                      <div className="pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-slate-200/70" />
                      <div className="relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white sm:rounded-[30px]">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.46),transparent_28%)]" />
                        <div className="relative aspect-[1.08/1] w-full overflow-hidden sm:aspect-[1.24/1] md:aspect-[16/9]">
                          <DashboardMockup view={views[viewIndex]} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-4 hidden items-center justify-center gap-2 md:flex">
            {[0, 1, 2].map((idx) => (
              <span
                key={idx}
                className={
                  idx === activeView
                    ? "h-1.5 w-6 rounded-full bg-blue-500 transition-all duration-300"
                    : "h-1.5 w-1.5 rounded-full bg-slate-300 transition-all duration-300"
                }
              />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.96),transparent_72%)]" />
        </div>

      </div>
    </section>
  );
}
