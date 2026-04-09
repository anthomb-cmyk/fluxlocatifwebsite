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
    eyebrow: "Charge",
    title: "Moins de temps consacré au tri répétitif",
    description: "Le tri initial enlève une part importante des échanges répétitifs.",
    icon: <MessagesSquare className="h-5 w-5" />,
    illustration: (
      <div className="relative h-24 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-28 sm:rounded-[20px] sm:p-3.5 md:h-36 md:rounded-[22px] md:p-4">
        <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-blue-100/50 blur-2xl" />
        <div className="relative space-y-2 sm:space-y-2.5">
          <div className="ml-auto flex w-[86%] items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/85 px-2 py-1.5 shadow-sm sm:w-[82%] sm:px-2.5 sm:py-2 md:w-[78%] md:px-3">
            <div className="h-6 w-6 rounded-full bg-blue-500/15" />
            <div className="flex-1">
              <div className="h-2 w-16 rounded-full bg-blue-300/80" />
              <div className="mt-1.5 h-2 w-24 rounded-full bg-blue-200/80" />
            </div>
          </div>
          <div className="flex w-[92%] items-center gap-2 rounded-2xl border border-slate-100 bg-white px-2 py-1.5 shadow-sm sm:w-[90%] sm:px-2.5 sm:py-2 md:w-[86%] md:px-3">
            <div className="h-6 w-6 rounded-full bg-slate-100" />
            <div className="flex-1">
              <div className="h-2 w-24 rounded-full bg-slate-300/70" />
              <div className="mt-1.5 h-2 w-20 rounded-full bg-slate-200/80" />
            </div>
          </div>
          <div className="ml-auto hidden w-[64%] items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/85 px-3 py-2 shadow-sm sm:flex">
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
    eyebrow: "Préparation",
    title: "Des dossiers mieux préparés avant revue",
    description: "Les profils sont qualifiés plus tôt, avec un cadre de vérification clair.",
    icon: <ScanSearch className="h-5 w-5" />,
    illustration: (
      <div className="relative h-24 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-28 sm:rounded-[20px] sm:p-3.5 md:h-36 md:rounded-[22px] md:p-4">
        <div className="rounded-[14px] border border-white bg-white/95 p-2.5 shadow-sm sm:hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-600 font-body">Vérifs</span>
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600 font-body">OK</span>
          </div>
          <div className="mt-2 space-y-1.5">
            {["Revenu", "Profil"].map((label, idx) => (
              <div key={label} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/80 px-2 py-1.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  <span className="text-[10px] font-medium text-slate-600 font-body">{label}</span>
                </div>
                <div className="h-1.5 w-10 rounded-full bg-slate-100">
                  <div className={`h-1.5 rounded-full ${idx === 0 ? "w-[80%] bg-emerald-400" : "w-[88%] bg-blue-400"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden rounded-[16px] border border-white bg-white/95 p-3 shadow-sm sm:block md:rounded-[18px]">
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
    eyebrow: "Visibilité",
    title: "Une visibilité plus claire d’un logement à l’autre",
    description: "L’avancement reste lisible pour comparer les étapes et prioriser les actions.",
    icon: <Target className="h-5 w-5" />,
    illustration: (
      <div className="relative h-24 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-28 sm:rounded-[20px] sm:p-3.5 md:h-36 md:rounded-[22px] md:p-4">
        <div className="grid h-full grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1.5 sm:hidden">
          {[
            ["E", "18", "bg-blue-300"],
            ["T", "9", "bg-amber-300"],
            ["V", "4", "bg-emerald-300"],
          ].map(([label, value, color]) => (
            <div key={label} className="flex h-full flex-col justify-between rounded-[12px] border border-white bg-white/95 p-2 shadow-sm">
              <div className={`h-1.5 w-6 rounded-full ${color}`} />
              <div>
                <div className="text-[9px] uppercase tracking-[0.1em] text-slate-400 font-body">{label}</div>
                <div className="mt-0.5 text-[11px] font-semibold text-slate-800 font-body">{value}</div>
              </div>
            </div>
          ))}
          <MoveRight className="h-3 w-3 text-slate-300" />
          <MoveRight className="h-3 w-3 text-slate-300" />
        </div>
        <div className="hidden h-full grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-1.5 sm:grid">
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
    title: "Des décisions plus simples à prendre",
    description: "Vous gardez la décision finale avec un travail préparatoire déjà structuré.",
    icon: <TrendingUp className="h-5 w-5" />,
    illustration: (
      <div className="relative h-24 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-28 sm:rounded-[20px] sm:p-3.5 md:h-36 md:rounded-[22px] md:p-4">
        <div className="absolute -left-8 -bottom-8 h-20 w-20 rounded-full bg-blue-100/55 blur-2xl" />
        <div className="relative grid h-full grid-cols-2 gap-2 sm:hidden">
          <div className="min-w-0 rounded-[12px] border border-white bg-white/95 p-2 shadow-sm">
            <div className="text-[10px] uppercase tracking-[0.08em] text-slate-400 font-body">Évol.</div>
            <div className="mt-2 space-y-1.5">
              <div className="space-y-1">
                <div className="text-[9px] text-slate-400 font-body">Avant</div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-[38%] rounded-full bg-slate-300" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[9px] text-slate-400 font-body">Après</div>
                <div className="h-2 rounded-full bg-blue-100">
                  <div className="h-2 w-[82%] rounded-full bg-blue-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="min-w-0 rounded-[12px] border border-white bg-white/95 p-2 shadow-sm">
            <div className="text-[10px] uppercase tracking-[0.12em] text-slate-400 font-body">Score</div>
            <div className="mt-2 flex h-[40px] items-center justify-center rounded-lg bg-emerald-50/70 text-[18px] font-semibold text-emerald-600 font-headline">
              91
            </div>
            <div className="mt-1 text-center text-[9px] text-slate-500 font-body">Net</div>
          </div>
        </div>
        <div className="relative hidden h-full grid-cols-[1.25fr_1fr] gap-2.5 sm:grid">
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
    title: "Un modèle de coût plus compétitif",
    description:
      "Selon le volume et l’organisation recherchée, FluxLocatif peut coûter jusqu’à 50 % moins cher qu’une agence de location conventionnelle.",
    icon: <CircleDollarSign className="h-5 w-5" />,
    illustration: (
      <div className="relative h-24 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-28 sm:rounded-[20px] sm:p-3.5 md:h-36 md:rounded-[22px] md:p-4">
        <div className="grid h-full grid-cols-2 gap-2.5">
          <div className="rounded-[12px] border border-white bg-white/95 p-2.5 shadow-sm sm:rounded-[16px] sm:p-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 font-body sm:text-[10px] sm:tracking-[0.16em]">Avant</div>
            <div className="mt-2 space-y-1.5 sm:mt-3 sm:space-y-2">
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-full rounded-full bg-slate-300" />
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[86%] rounded-full bg-slate-300" />
              </div>
            </div>
          </div>
          <div className="rounded-[12px] border border-blue-100 bg-blue-50/70 p-2.5 shadow-sm sm:rounded-[16px] sm:p-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-600 font-body sm:text-[10px] sm:tracking-[0.16em]">Après</div>
            <div className="mt-2 space-y-1.5 sm:mt-3 sm:space-y-2">
              <div className="h-2 rounded-full bg-blue-100">
                <div className="h-2 w-[52%] rounded-full bg-blue-400" />
              </div>
              <div className="h-2 rounded-full bg-blue-100">
                <div className="h-2 w-[47%] rounded-full bg-blue-400" />
              </div>
            </div>
            <div className="mt-2 text-[10px] font-medium text-emerald-600 font-body sm:text-[11px]">-50%</div>
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
            RÉSULTATS OPÉRATIONNELS
          </div>
          <h2 className="mt-6 text-balance text-3xl font-medium leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl font-headline">
            Ce qui change concrètement pour votre équipe.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-7 text-slate-500 font-body">
            Moins de charge manuelle, plus de visibilité sur l’avancement et des décisions plus simples à prendre.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-5">
          {topCards.map((card, idx) => (
            <article
              key={card.title}
              className={cn(
                "reveal-animation reveal-card group rounded-[24px] border border-white/90 bg-white/96 p-3.5 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_85px_rgba(15,23,42,0.08)] sm:rounded-[28px] sm:p-4 md:rounded-[30px] md:p-6",
                idx === 0 && "col-span-2 md:col-span-1"
              )}
            >
              {card.illustration}
              <div className="mt-3.5 flex items-center gap-2.5 sm:mt-4 md:mt-5 md:gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-[#fbfcff] text-primary shadow-sm sm:h-10 sm:w-10 sm:rounded-2xl md:h-11 md:w-11">
                  {card.icon}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 font-body sm:text-[11px] sm:tracking-[0.2em] md:tracking-[0.22em]">
                  {card.eyebrow}
                </span>
              </div>
              <h3 className="mt-3 text-[1.12rem] leading-[1.1] font-medium tracking-tight text-slate-950 font-headline sm:text-[1.22rem] md:mt-4 md:text-[1.5rem]">
                {card.title}
              </h3>
              <p className="mt-2 text-[13px] leading-5 text-slate-500 font-body sm:text-[14px] sm:leading-6 md:mt-3 md:text-[15px] md:leading-6">
                {card.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-[28px] border border-white/85 bg-white/72 p-2.5 shadow-[0_18px_50px_rgba(15,23,42,0.04)] md:mt-10 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none">
          <div className="grid grid-cols-2 gap-3.5 md:gap-5">
            {bottomCards.map((card) => (
              <article
                key={card.title}
                className="reveal-animation reveal-card group rounded-[24px] border border-white/90 bg-white/96 p-3.5 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_85px_rgba(15,23,42,0.08)] sm:rounded-[26px] sm:p-4 md:rounded-[30px] md:p-7"
              >
                {card.illustration}
                <div className="mt-3.5 flex items-center gap-2.5 sm:mt-4 md:mt-5 md:gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-[#fbfcff] text-primary shadow-sm sm:h-10 sm:w-10 sm:rounded-2xl md:h-11 md:w-11">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 font-body sm:text-[11px] sm:tracking-[0.2em] md:tracking-[0.22em]">
                    {card.eyebrow}
                  </span>
                </div>
                <h3 className="mt-3 text-[1.12rem] leading-[1.1] font-medium tracking-tight text-slate-950 font-headline sm:text-[1.22rem] md:mt-4 md:text-[1.5rem]">
                  {card.title}
                </h3>
                <p className="mt-2 text-[13px] leading-5 text-slate-500 font-body sm:text-[14px] sm:leading-6 md:mt-3 md:text-[15px] md:leading-6">
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
