
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DashboardMockup } from "@/components/ui/dashboard-mockup";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#F8FAFF] pt-24 pb-20 md:pt-32 md:pb-32"
    >
      {/* Premium Grid with Central Masking */}
      <div 
        className="absolute inset-0 premium-grid pointer-events-none opacity-60" 
        style={{ 
          maskImage: 'radial-gradient(circle at 50% 35%, transparent 0%, transparent 25%, black 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 35%, transparent 0%, transparent 25%, black 80%)'
        }} 
      />

      {/* Premium Background Effects */}
      <div className="absolute inset-0 premium-glow pointer-events-none" />
      
      {/* Center Brightness - Enhances the clean luminous feel behind text */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(50%_50%_at_50%_40%,white_0%,rgba(255,255,255,0.4)_60%,transparent_100%)] pointer-events-none z-0 opacity-80" />
      
      {/* Top Center Glow - Subtle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_100%)] pointer-events-none" />
      
      {/* Bottom Luminous Environment - Broader, Softer, more Atmospheric */}
      <div className="absolute bottom-0 left-0 right-0 h-[80%] bg-[linear-gradient(to_top,rgba(59,130,246,0.15)_0%,rgba(59,130,246,0.05)_30%,transparent_100%)] pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[140%] h-[600px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_100%)] blur-[120px] pointer-events-none" />
      
      {/* Corner Accents - Softer */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] opacity-30 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] opacity-30 pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-6">
        {/* Text Content */}
        <div className="mx-auto mb-10 flex max-w-[900px] flex-col items-center text-center md:mb-16">
          <h1 className="reveal-animation reveal-title delay-150 mb-6 text-[28px] font-headline font-medium leading-[1.1] tracking-[-0.03em] text-[#0F172A] text-balance sm:text-5xl md:text-[72px] lg:text-[80px]">
            Structurez vos locations <br className="hidden md:block" />
            sans alourdir vos opérations.
          </h1>

          <p className="reveal-animation reveal-title delay-300 mx-auto mb-8 max-w-[640px] text-pretty font-body text-[13px] font-normal leading-[1.6] text-slate-500 md:text-[18px]">
            Ne perdez plus des heures à trier les demandes. FluxLocatif automatise le filtrage pour que vous ne receviez que les meilleurs candidats.
          </p>

          <div className="reveal-animation reveal-title delay-450 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            <Button asChild className="group h-[56px] w-full gap-2 rounded-full border-none bg-[#3B82F6] px-10 text-[16px] font-medium text-white shadow-[0_10px_25px_-5px_rgba(59,130,246,0.4)] transition-all hover:bg-[#2F76EE] hover:scale-[1.02] active:scale-[0.98] sm:w-auto">
              <Link href="/contact">
                Démarrer le service
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-[56px] w-full rounded-full border border-slate-200 bg-white px-10 text-[16px] font-medium text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
            >
              <Link href="/contact">Réserver un appel</Link>
            </Button>
          </div>
        </div>

        {/* Dashboard Mockup Integration */}
        <div className="reveal-animation reveal-mockup delay-600 relative mx-auto max-w-[1100px] px-2 md:px-0">
          <div className="relative aspect-[2/3] sm:aspect-[16/9] w-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-slate-200/50 bg-white shadow-[0_40px_120px_-20px_rgba(15,23,42,0.1),0_0_0_1px_rgba(255,255,255,0.8)_inset] transition-all duration-1000">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
