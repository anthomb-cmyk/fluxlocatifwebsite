import { ArrowRight, ClipboardCheck, Inbox, Route, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Cadrage des critères",
    description:
      "Alignement sur vos standards de sélection et vos priorités locatives.",
    icon: <ClipboardCheck className="h-5 w-5" />,
  },
  {
    number: "02",
    title: "Gestion des demandes",
    description: "Traitement et tri du volume entrant dans un cadre clair.",
    icon: <Inbox className="h-5 w-5" />,
  },
  {
    number: "03",
    title: "Préqualification et priorisation",
    description: "Qualification des profils et hiérarchisation selon vos critères.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    number: "04",
    title: "Présentation pour décision",
    description: "Remise de dossiers mieux préparés pour arbitrage rapide.",
    icon: <Route className="h-5 w-5" />,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-white py-24 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.05),transparent_34%)]" />
      <div className="container mx-auto px-6">
        <div className="reveal-animation reveal-title mb-12">
          <div className="mb-6 inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span className="font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-blue-500">
              COMMENT ÇA FONCTIONNE
            </span>
          </div>
          <div className="grid items-end gap-6 md:grid-cols-2">
            <h2 className="text-balance font-headline text-3xl font-medium leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl">
              Un processus clair, orienté décision.
            </h2>
            <p className="font-body text-[15px] leading-7 text-slate-500 md:pb-1">
              Vous gardez la décision finale. Nous structurons l’amont pour vous remettre des dossiers plus faciles à traiter.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2.5 md:mt-14 md:gap-5 xl:grid-cols-4">
          {steps.map((step, idx) => (
            <article
              key={step.number}
              className={cn(
                "hover-tilt flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md",
                idx === 0 && "scroll-from-left",
                idx === 1 && "scroll-fade-up scroll-delay-1",
                idx === 2 && "scroll-fade-up scroll-delay-2",
                idx === 3 && "scroll-from-right scroll-delay-3"
              )}
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-500">
                  {step.icon}
                </div>
                <span className="font-body text-[12px] font-semibold tracking-[0.2em] text-slate-200">
                  {step.number}
                </span>
              </div>
              <h3 className="mb-3 font-headline text-[1.1rem] font-medium leading-snug tracking-tight text-slate-900">
                {step.title}
              </h3>
              <p className="font-body text-[14px] leading-6 text-slate-500">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
