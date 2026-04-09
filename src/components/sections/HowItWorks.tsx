import { ArrowRight, ClipboardCheck, Inbox, Route, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Cadrage des critères",
    description:
      "Alignement sur vos standards de sélection et vos priorités locatives.",
    icon: <ClipboardCheck className="h-5 w-5" />,
    illustration: (
      <div className="card-illustration relative h-28 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-32 md:h-36">
        <div className="flex h-full flex-col justify-between rounded-[14px] border border-white bg-white/95 p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 font-body">Vos critères</span>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-blue-600 font-body">Actif</span>
          </div>
          <div className="space-y-2">
            {[
              { label: "Revenu min.", pct: "88%", color: "bg-blue-400" },
              { label: "Historique", pct: "76%", color: "bg-emerald-400" },
              { label: "Délai dispo.", pct: "64%", color: "bg-indigo-300" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="w-16 shrink-0 text-[9px] text-slate-500 font-body">{item.label}</span>
                <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                  <div className={`h-1.5 rounded-full ${item.color}`} style={{ width: item.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Gestion des demandes",
    description: "Traitement et tri du volume entrant dans un cadre clair.",
    icon: <Inbox className="h-5 w-5" />,
    illustration: (
      <div className="card-illustration relative h-28 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-32 md:h-36">
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 font-body">Boîte de réception</span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[8px] font-bold text-white">7</span>
          </div>
          <div className="space-y-1.5">
            {[
              { name: "Marc D.", type: "Studio — Plateau", color: "bg-blue-100", dot: "bg-blue-400" },
              { name: "Sarah L.", type: "3½ — Rosemont", color: "bg-slate-50", dot: "bg-slate-300" },
              { name: "Julien R.", type: "Condo — Griffintown", color: "bg-emerald-50", dot: "bg-emerald-400" },
            ].map((item) => (
              <div key={item.name} className={`flex items-center gap-2 rounded-xl border border-white px-2 py-1.5 shadow-sm ${item.color}`}>
                <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${item.dot}`} />
                <span className="text-[10px] font-medium text-slate-700 font-body">{item.name}</span>
                <span className="ml-auto truncate text-[9px] text-slate-400 font-body">{item.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Préqualification et priorisation",
    description: "Qualification des profils et hiérarchisation selon vos critères.",
    icon: <ShieldCheck className="h-5 w-5" />,
    illustration: (
      <div className="card-illustration relative h-28 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-32 md:h-36">
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <div className="flex w-full items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/80 px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[10px] font-medium text-slate-700 font-body">Marc D.</span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-600 font-body">94 pts</span>
          </div>
          <div className="flex w-full items-center justify-between rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10">
                <div className="h-2 w-2 rounded-full bg-blue-400" />
              </div>
              <span className="text-[10px] font-medium text-slate-700 font-body">Sarah L.</span>
            </div>
            <span className="text-[10px] font-semibold text-blue-600 font-body">81 pts</span>
          </div>
          <div className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-slate-100" />
              <span className="text-[10px] font-medium text-slate-400 font-body">En attente</span>
            </div>
            <span className="text-[10px] text-slate-300 font-body">—</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "04",
    title: "Présentation pour décision",
    description: "Remise de dossiers mieux préparés pour arbitrage rapide.",
    icon: <Route className="h-5 w-5" />,
    illustration: (
      <div className="card-illustration relative h-28 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-32 md:h-36">
        <div className="flex h-full flex-col justify-between rounded-[14px] border border-white bg-white/95 p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 font-body">Dossier prêt</span>
            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-600 font-body">À valider</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-slate-600 font-body">Revenu vérifié · 3× le loyer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-slate-600 font-body">Historique locatif solide</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              <span className="text-[10px] text-slate-600 font-body">Disponible dès le 1er juin</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-white py-24 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.05),transparent_34%)]" />
      <div className="container mx-auto px-6">
        <div className="reveal-animation reveal-title mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-[0_12px_30px_rgba(15,23,42,0.04)] font-body">
            <ArrowRight className="h-3.5 w-3.5 text-primary" />
            COMMENT ÇA FONCTIONNE
          </div>
          <h2 className="mt-6 text-balance text-3xl font-medium leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl font-headline">
            Un processus clair, orienté décision.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-7 text-slate-500 font-body">
            Vous gardez la décision finale. Nous structurons l’amont pour vous remettre des dossiers plus faciles à traiter.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:mt-14 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {steps.map((step, idx) => (
            <article
              key={step.number}
              className={cn(
                "group hover-tilt flex h-full flex-col rounded-[24px] border border-white/85 bg-[#fbfcff]/92 p-3.5 shadow-[0_20px_54px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.07)] sm:rounded-[28px] sm:p-4 md:rounded-[32px] md:p-6",
                idx === 0 && "scroll-from-left",
                idx === 1 && "scroll-fade-up scroll-delay-1",
                idx === 2 && "scroll-fade-up scroll-delay-2",
                idx === 3 && "scroll-from-right scroll-delay-3"
              )}
            >
              {step.illustration}
              <div className="mt-3.5 flex items-center justify-between sm:mt-4 md:mt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-white text-primary shadow-sm sm:h-10 sm:w-10 md:h-11 md:w-11 md:rounded-2xl">
                  {step.icon}
                </div>
                <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-300 font-body sm:text-xs sm:tracking-[0.2em] md:text-sm md:tracking-[0.24em]">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-3 text-[1.15rem] leading-[1.1] font-medium tracking-tight text-slate-950 font-headline sm:text-[1.25rem] md:mt-4 md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 text-[13px] leading-5 text-slate-500 font-body sm:text-[14px] sm:leading-6 md:mt-3 md:text-[15px] md:leading-7">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
