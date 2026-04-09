"use client";

import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";

const plans = [
  {
    name: "Démarrage",
    price: "$399",
    period: "frais unique",
    scope: "1 logement actif",
    description:
      "Pour lancer un mandat locatif avec une structure claire dès le départ.",
    features: [
      "Cadrage initial des critères",
      "Organisation du dossier locatif",
      "Gestion des demandes entrantes",
      "Préqualification de base",
      "Pipeline de suivi structuré",
    ],
  },
  {
    name: "Croissance",
    price: "$699",
    period: "/mois",
    scope: "Jusqu'à 3 logements",
    description:
      "Pour les propriétaires et opérateurs qui veulent déléguer une part active du travail locatif.",
    features: [
      "Tout le forfait Démarrage",
      "Suivi actif des candidatures",
      "Matching intelligent selon vos critères",
      "Relances et coordination du pipeline",
      "Cadence locative priorisée",
    ],
    featured: true,
  },
  {
    name: "Échelle",
    price: "$1 200",
    period: "/mois",
    scope: "Jusqu'à 6 logements",
    description:
      "Pour les portefeuilles plus denses qui ont besoin d'un bureau de location externalisé plus soutenu.",
    features: [
      "Tout le forfait Croissance",
      "Pilotage multi-unités",
      "Traitement renforcé du volume entrant",
      "Vision consolidée du pipeline",
      "Accompagnement opérationnel élargi",
    ],
  },
];

type Plan = (typeof plans)[number];

function PricingPlanCard({ plan, index }: { plan: Plan; index: number }) {
  const { ref, visibleCount } = useStaggerReveal(plan.features.length, 100, 0.15);

  return (
    <article
      ref={ref}
      className={cn(
        "relative scroll-scale-in scroll-delay-0 flex h-full flex-col rounded-[32px] border border-slate-200/70 bg-[#fbfcff] p-7 shadow-[0_20px_60px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(15,23,42,0.07)] md:p-8",
        `scroll-delay-${Math.min(index, 4)}`,
        plan.featured &&
          "border-blue-200 bg-white shadow-[0_28px_90px_rgba(59,130,246,0.13)]"
      )}
    >
      {plan.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_30px_rgba(59,130,246,0.24)] font-body">
          Le plus choisi
        </div>
      )}

      <div className="mt-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary font-body">
          {plan.name}
        </p>
        <div className="mt-5 flex items-end gap-2">
          <span className="text-4xl font-medium tracking-[-0.05em] text-slate-950 md:text-5xl font-headline">
            {plan.price}
          </span>
          <span className="pb-1 text-sm text-slate-500 font-body">{plan.period}</span>
        </div>
        <p className="mt-3 text-base font-medium text-slate-900 font-body">{plan.scope}</p>
        <p className="mt-4 text-base leading-7 text-slate-500 font-body">{plan.description}</p>
      </div>

      <div className="scroll-line-draw my-8 h-px w-full bg-slate-200/80" />

      <ul className="flex-1 space-y-4">
        {plan.features.map((feature, featureIndex) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm leading-6 text-slate-600 font-body"
            style={{
              opacity: visibleCount > featureIndex ? 1 : 0,
              transform:
                visibleCount > featureIndex
                  ? "translateY(0)"
                  : "translateY(12px)",
              transition:
                "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary">
              <Check className="h-3.5 w-3.5" />
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        variant={plan.featured ? "default" : "outline"}
        className={cn(
          "mt-8 h-14 rounded-full px-6 text-base font-semibold font-body",
          plan.featured
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-[0_16px_40px_rgba(59,130,246,0.24)]"
            : "border-slate-200 bg-white text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
        )}
      >
        <Link href="/contact">Démarrer le service</Link>
      </Button>
    </article>
  );
}

export function PricingPreview() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-24 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.04),transparent_30%)]" />
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_12px_30px_rgba(15,23,42,0.04)] font-body">
            <Sparkles className="h-3.5 w-3.5" />
            Tarification claire
          </div>
          <h2 className="mt-6 text-balance text-3xl font-medium leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl font-headline">
            Des forfaits pensés pour alléger la location, pas pour vous vendre une usine à gaz.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500 font-body">
            FluxLocatif vous apporte une structure opérationnelle premium avec des coûts plus légers que ceux d&apos;une compagnie de location traditionnelle, tout en gardant un cadre simple à comprendre.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingPlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
