"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { DashboardMockup } from "@/components/ui/dashboard-mockup";
import { TrustTicker } from "@/components/ui/trust-ticker";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white pt-[6.25rem] pb-14 md:pt-28 md:pb-20"
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
          <div className="reveal-animation reveal-title inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/88 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary shadow-[0_14px_34px_rgba(15,23,42,0.06)] backdrop-blur-md font-body">
            <Sparkles className="h-3.5 w-3.5" />
            <span>SERVICE DE LOCATION EXTERNALISÉ</span>
          </div>

          <h1 className="reveal-animation reveal-title mx-auto mt-7 max-w-[30rem] sm:max-w-[32rem] text-balance text-4xl font-medium leading-[0.95] tracking-[-0.055em] text-slate-950 sm:text-[3.45rem] md:text-[4.35rem] lg:text-[4.8rem] font-headline">
            Louez plus vite avec de meilleurs candidats.
          </h1>

          <p className="reveal-animation reveal-title mx-auto mt-6 max-w-[26rem] sm:max-w-[28rem] text-pretty text-base leading-8 text-slate-500 sm:text-[19px] sm:leading-9 font-body">
            FluxLocatif prend en charge le tri initial, la préqualification et le suivi pour vous faire avancer plus vite vers les bons dossiers.
          </p>

          <div className="reveal-animation reveal-title mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 px-8 text-base font-semibold text-white shadow-[0_16px_40px_rgba(59,130,246,0.24)] transition duration-300 hover:scale-[1.01] hover:shadow-[0_20px_46px_rgba(59,130,246,0.3)] font-body"
            >
              Démarrer le service
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center rounded-full border border-slate-200 bg-white/92 px-8 text-base font-medium text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-sm transition duration-300 hover:bg-white hover:shadow-[0_14px_36px_rgba(15,23,42,0.08)] font-body"
            >
              Réserver un appel
            </Link>
          </div>

        </div>

        <div className="reveal-animation reveal-mockup relative mx-auto -mx-6 mt-4 w-[calc(100%+3rem)] max-w-[1160px] px-0 sm:mx-auto sm:mt-8 sm:w-full sm:px-1 md:mt-12 md:px-4">
          <div className="absolute inset-x-8 -bottom-8 h-40 rounded-full bg-blue-200/34 blur-3xl" />
          <div className="absolute inset-x-16 bottom-8 h-28 rounded-full bg-white/95 blur-[64px]" />
          <div className="relative overflow-hidden rounded-[24px] border border-white/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.9))] p-[3px] shadow-[0_28px_70px_rgba(15,23,42,0.10)] backdrop-blur-sm transition duration-500 hover:-translate-y-0.5 hover:shadow-[0_40px_90px_rgba(15,23,42,0.14)] sm:rounded-[30px] md:rounded-[36px] md:p-3">
            <div className="pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-slate-200/70" />
            <div className="relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white sm:rounded-[30px]">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.46),transparent_28%)]" />
              <div className="relative aspect-[1.30/1] w-full overflow-hidden sm:aspect-[1.24/1] md:aspect-[16/9]">
                <DashboardMockup />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.96),transparent_72%)]" />
        </div>

        <TrustTicker />
      </div>
    </section>
  );
}
