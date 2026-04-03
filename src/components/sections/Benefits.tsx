import {
  ArrowUpRight,
  CheckCircle2,
  CircleDollarSign,
  MoveRight,
  MessagesSquare,
  ShieldCheck,
  ScanSearch,
  Target,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const benefitCards = [
  {
    eyebrow: "Temps",
    title: "Moins de messages à gérer",
    description: "Le tri initial enlève une partie du volume répétitif.",
    icon: <MessagesSquare className="h-5 w-5" />,
    illustration: (
      <div className="relative h-28 overflow-hidden rounded-[22px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-inner md:h-36">
        <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-blue-100/50 blur-2xl" />
        <div className="relative space-y-2.5">
          <div className="ml-auto flex w-[78%] items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/85 px-3 py-2 shadow-sm">
            <div className="h-6 w-6 rounded-full bg-blue-500/15" />
            <div className="flex-1">
              <div className="h-2 w-16 rounded-full bg-blue-300/80" />
              <div className="mt-1.5 h-2 w-24 rounded-full bg-blue-200/80" />
            </div>
          </div>
          <div className="flex w-[86%] items-center gap-2 rounded-2xl border border-slate-100 bg-white px-3 py-2 shadow-sm">
            <div className="h-6 w-6 rounded-full bg-slate-100" />
            <div className="flex-1">
              <div className="h-2 w-24 rounded-full bg-slate-300/70" />
              <div className="mt-1.5 h-2 w-20 rounded-full bg-slate-200/80" />
            </div>
          </div>
          <div className="ml-auto flex w-[64%] items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/85 px-3 py-2 shadow-sm">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <div className="flex-1">
              <div className="h-2 w-12 rounded-full bg-emerald-300/80" />
              <div className="mt-1.5 h-2 w-16 rounded-full bg-emerald-200/80" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Qualité",
    title: "Des dossiers mieux préparés",
    description: "Les profils avancent avec plus de rigueur avant d’être présentés.",
    icon: <ScanSearch className="h-5 w-5" />,
    illustration: (
      <div className="relative h-28 overflow-hidden rounded-[22px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-inner md:h-36">
        <div className="rounded-[18px] border border-white bg-white/95 p-3 shadow-sm">
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 font-body">
            <span>Checklist</span>
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-600">Validé</span>
          </div>
          <div className="mt-2.5 space-y-2">
            <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/70 px-2.5 py-1.5 text-[11px] font-medium text-emerald-700 font-body">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              Critères revenus
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50/70 px-2.5 py-1.5 text-[11px] font-medium text-blue-700 font-body">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              Profil validé
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                <div className="h-1.5 w-[88%] rounded-full bg-emerald-400" />
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 font-body">88%</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Suivi",
    title: "Une vue plus claire du pipeline",
    description: "Les étapes restent faciles à suivre et à comparer.",
    icon: <Target className="h-5 w-5" />,
    illustration: (
      <div className="relative h-28 overflow-hidden rounded-[22px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-inner md:h-36">
        <div className="grid h-full grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-1.5">
          {["Entrée", "Tri", "Validation", "Envoi"].map((label, index) => (
            <div key={label} className="flex h-full flex-col justify-between rounded-[16px] border border-white bg-white/95 p-2 shadow-sm">
              <div className={`h-1.5 w-6 rounded-full ${index === 0 ? "bg-blue-300" : index === 1 ? "bg-amber-300" : index === 2 ? "bg-indigo-300" : "bg-emerald-300"}`} />
              <div className="text-[11px] uppercase tracking-[0.12em] text-slate-400 font-body">{label}</div>
            </div>
          ))}
          <MoveRight className="h-3.5 w-3.5 text-slate-300" />
          <MoveRight className="h-3.5 w-3.5 text-slate-300" />
          <MoveRight className="h-3.5 w-3.5 text-slate-300" />
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Décision",
    title: "Des décisions plus simples",
    description: "Vous gardez le choix final avec moins de travail préparatoire.",
    icon: <TrendingUp className="h-5 w-5" />,
    illustration: (
      <div className="relative h-28 overflow-hidden rounded-[22px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-inner md:h-36">
        <div className="absolute -left-8 -bottom-8 h-20 w-20 rounded-full bg-blue-100/55 blur-2xl" />
        <div className="relative grid h-full grid-cols-[1.25fr_1fr] gap-2.5">
          <div className="rounded-[16px] border border-white bg-white/95 p-3 shadow-sm">
            <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-body">Avant / Après</div>
            <div className="mt-3 space-y-2.5">
              <div>
                <p className="text-[10px] text-slate-400">Avant</p>
                <div className="mt-1 h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[38%] rounded-full bg-slate-300" />
                </div>
              </div>
              <div>
                <p className="text-[10px] text-slate-400">Après</p>
                <div className="mt-1 h-2 rounded-full bg-blue-100">
                  <div className="h-2 w-[82%] rounded-full bg-blue-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[16px] border border-white bg-white/95 p-3 shadow-sm">
            <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-body">Score</div>
            <div className="mt-2 flex h-[72px] items-center justify-center rounded-xl bg-emerald-50/70 text-[22px] font-semibold text-emerald-600 font-headline">
              91
            </div>
            <p className="mt-1.5 text-center text-[10px] text-slate-500">Efficacité locative</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Coût",
    title: "Une alternative plus souple",
    description: "Une alternative plus efficace qu’un modèle locatif plus lourd.",
    icon: <CircleDollarSign className="h-5 w-5" />,
    illustration: (
      <div className="relative h-28 overflow-hidden rounded-[22px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-inner md:h-36">
        <div className="grid h-full grid-cols-2 gap-2.5">
          <div className="rounded-[16px] border border-white bg-white/95 p-3 shadow-sm">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 font-body">Traditionnel</div>
            <div className="mt-3 space-y-2">
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-full rounded-full bg-slate-300" />
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[86%] rounded-full bg-slate-300" />
              </div>
            </div>
          </div>
          <div className="rounded-[16px] border border-blue-100 bg-blue-50/70 p-3 shadow-sm">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-600 font-body">FluxLocatif</div>
            <div className="mt-3 space-y-2">
              <div className="h-2 rounded-full bg-blue-100">
                <div className="h-2 w-[52%] rounded-full bg-blue-400" />
              </div>
              <div className="h-2 rounded-full bg-blue-100">
                <div className="h-2 w-[47%] rounded-full bg-blue-400" />
              </div>
            </div>
            <div className="mt-2 text-[11px] font-medium text-emerald-600 font-body">Coût optimisé</div>
          </div>
        </div>
      </div>
    ),
  },
];

export function Benefits() {
  const topCards = benefitCards.slice(0, 3);
  const bottomCards = benefitCards.slice(3);

  return (
    <section id="benefits" className="relative overflow-hidden bg-[#f8fbff] py-20 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.08),transparent_40%)]" />
      <div className="container relative mx-auto px-6">
        <div className="reveal-animation reveal-title mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_12px_30px_rgba(15,23,42,0.04)] font-body">
            <ArrowUpRight className="h-3.5 w-3.5" />
            Bénéfices concrets
          </div>
          <h2 className="mt-6 text-balance text-3xl font-medium leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl font-headline">
            Ce que vous gagnez concrètement.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-7 text-slate-500 font-body">
            Moins de gestion répétitive, plus de clarté et des dossiers plus simples à traiter.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {topCards.map((card, idx) => (
            <article
              key={card.title}
              className={cn(
                "reveal-animation reveal-card group rounded-[30px] border border-white/90 bg-white/96 p-4 shadow-[0_22px_70px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_85px_rgba(15,23,42,0.08)] md:p-6",
                idx === 0 && "sm:col-span-2 md:col-span-1"
              )}
            >
              {card.illustration}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-[#fbfcff] text-primary shadow-sm">
                  {card.icon}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 font-body">
                  {card.eyebrow}
                </span>
              </div>
              <h3 className="mt-4 text-[1.5rem] leading-[1.05] font-medium tracking-tight text-slate-950 font-headline md:text-2xl">
                {card.title}
              </h3>
              <p className="mt-3 text-[15px] leading-6 text-slate-500 font-body">
                {card.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-[28px] border border-white/85 bg-white/72 p-2.5 shadow-[0_18px_50px_rgba(15,23,42,0.04)] md:mt-10 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
            {bottomCards.map((card) => (
              <article
                key={card.title}
                className="reveal-animation reveal-card group rounded-[26px] border border-white/90 bg-white/96 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_85px_rgba(15,23,42,0.08)] md:rounded-[30px] md:p-7"
              >
                {card.illustration}
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-[#fbfcff] text-primary shadow-sm">
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 font-body">
                    {card.eyebrow}
                  </span>
                </div>
                <h3 className="mt-4 text-[1.5rem] leading-[1.05] font-medium tracking-tight text-slate-950 font-headline md:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-[15px] leading-6 text-slate-500 font-body">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
