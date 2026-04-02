"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function PricingPreview() {
  const plans = [
    {
      name: "Démarrage",
      price: "$399",
      period: "frais unique",
      limit: "1 logement actif",
      features: [
        "Mise en place dossier",
        "Gestion demandes",
        "Préqualification",
        "Pipeline locatif",
        "Suivi de base",
      ],
    },
    {
      name: "Croissance",
      price: "$699",
      period: "/mois",
      limit: "Jusqu&apos;à 3 logements",
      features: [
        "Inclus Démarrage",
        "Suivi actif candidats",
        "Gestion multi-flux",
        "Priorité support",
        "Support soutenu",
      ],
      featured: true,
    },
    {
      name: "Échelle",
      price: "$1200",
      period: "/mois",
      limit: "Jusqu&apos;à 6 logements",
      features: [
        "Inclus Croissance",
        "Structure multi-unités",
        "Coordination locative",
        "Vision claire flux",
        "Support renforcé",
      ],
      className: "col-span-2 lg:col-span-1"
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 lg:py-32 bg-background relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-primary/5 -z-10 blur-[120px] rounded-full opacity-40"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 md:mb-20 reveal-animation reveal-title">
          <h2 className="text-3xl md:text-5xl font-headline font-medium mb-4 md:mb-6 tracking-tighter leading-none text-slate-900">Tarification transparente</h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto font-normal font-body leading-relaxed">
            Un support opérationnel structuré adapté à la taille de votre portefeuille locatif.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={cn(
                "relative bg-white/60 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-10 flex flex-col transition-all duration-700 hover:shadow-xl group reveal-animation reveal-card",
                plan.featured ? "ring-1 md:ring-2 ring-primary shadow-2xl md:scale-105 z-10 border-transparent bg-white" : "border border-border/60",
                idx === 1 && "delay-75",
                idx === 2 && "delay-150",
                plan.className
              )}
            >
              {plan.featured && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 md:px-8 py-1 rounded-full text-[7px] md:text-[10px] font-medium uppercase tracking-[0.15em] shadow-lg shadow-primary/20 font-body whitespace-nowrap">
                   Conseillé
                </div>
              )}
              <div className="mb-6 md:mb-10">
                <h3 className="text-[10px] md:text-xs font-medium uppercase tracking-widest text-primary mb-3 md:mb-6 font-headline">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl md:text-5xl font-medium font-headline tracking-tighter text-slate-900">{plan.price}</span>
                  <span className="text-muted-foreground font-normal text-[8px] md:text-sm font-body">{plan.period}</span>
                </div>
                <div className="h-px w-full bg-border/60 my-4 md:my-6"></div>
                <p className="text-[10px] md:text-base font-medium text-slate-900 font-body">{plan.limit}</p>
              </div>

              <ul className="space-y-2 md:space-y-4 mb-6 md:mb-10 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 md:gap-3 text-[10px] md:text-sm font-normal text-slate-600 font-body leading-relaxed">
                    <div className="bg-primary/10 p-0.5 md:p-1 rounded-full shrink-0">
                      <Check className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 text-primary" />
                    </div>
                    <span className="truncate">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild variant={plan.featured ? "default" : "outline"} className={cn(
                "w-full h-10 md:h-14 rounded-full font-medium text-[12px] md:text-[16px] transition-all duration-500 font-body px-2 md:px-4",
                plan.featured ? 'shadow-xl' : 'hover:bg-primary hover:text-white hover:border-primary'
              )}>
                <Link href="/contact">Démarrer</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
