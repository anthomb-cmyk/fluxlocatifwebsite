import {
  ArrowUpRight,
  CircleDollarSign,
  MessagesSquare,
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
      <div className="card-illustration relative h-24 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-28 md:h-36">
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400 font-body">Messages entrants</span>
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-semibold text-red-500 font-body">23</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-2 py-1.5 shadow-sm opacity-30">
              <div className="h-5 w-5 shrink-0 rounded-full bg-slate-200" />
              <div className="flex-1"><div className="h-1.5 w-20 rounded-full bg-slate-200" /></div>
              <span className="text-[9px] text-slate-300 font-body">Trié</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-2 py-1.5 shadow-sm opacity-50">
              <div className="h-5 w-5 shrink-0 rounded-full bg-slate-200" />
              <div className="flex-1"><div className="h-1.5 w-16 rounded-full bg-slate-200" /></div>
              <span className="text-[9px] text-slate-300 font-body">Trié</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50/80 px-2 py-1.5 shadow-sm">
              <div className="h-5 w-5 shrink-0 rounded-full bg-blue-200/60" />
              <div className="flex-1"><div className="h-1.5 w-24 rounded-full bg-blue-300/60" /></div>
              <span className="text-[9px] font-medium text-blue-500 font-body">→ Vous</span>
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
      <div className="card-illustration relative h-24 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-28 md:h-36">
        <div className="flex h-full flex-col justify-between rounded-[14px] border border-white bg-white/95 p-2.5 shadow-sm">
          <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400 font-body">Checklist dossier</span>
          <div className="space-y-1.5">
            {[
              { label: "Revenus vérifiés", done: true },
              { label: "Références confirmées", done: true },
              { label: "Disponibilité OK", done: true },
            ].map((item) => (
              <div key={item.label} className={`flex items-center gap-2 rounded-lg border px-2 py-1 ${item.done ? "border-emerald-100 bg-emerald-50" : "border-slate-100 bg-slate-50"}`}>
                <div className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-full ${item.done ? "bg-emerald-500" : "bg-slate-200"}`}>
                  {item.done && <div className="h-1 w-1.5 -translate-y-px rotate-45 border-b border-r border-white" />}
                </div>
                <span className={`text-[9px] font-medium font-body ${item.done ? "text-emerald-700" : "text-slate-400"}`}>{item.label}</span>
              </div>
            ))}
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
      <div className="card-illustration relative h-24 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-28 md:h-36">
        <div className="grid h-full grid-cols-3 gap-2">
          {[
            { label: "Entrées", value: "18", color: "bg-blue-400", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Qualifiés", value: "9", color: "bg-amber-400", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Prêts", value: "4", color: "bg-emerald-400", bg: "bg-emerald-50", border: "border-emerald-100" },
          ].map((col) => (
            <div key={col.label} className={`flex flex-col justify-between rounded-xl border p-2 shadow-sm ${col.bg} ${col.border}`}>
              <div className={`h-1.5 w-5 rounded-full ${col.color}`} />
              <div>
                <div className="text-[9px] font-medium text-slate-500 font-body">{col.label}</div>
                <div className="mt-0.5 font-headline text-[1.4rem] font-medium leading-none text-slate-900">{col.value}</div>
              </div>
            </div>
          ))}
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
      <div className="card-illustration relative h-24 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-28 md:h-36">
        <div className="flex h-full flex-col justify-between">
          <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400 font-body">Arbitrage final</span>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 py-2">
              <div className="font-headline text-[1.3rem] font-medium leading-none text-emerald-600">✓</div>
              <span className="mt-1 text-[9px] font-medium text-emerald-600 font-body">Approuvé</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-white py-2">
              <div className="font-headline text-[1.3rem] font-medium leading-none text-slate-300">—</div>
              <span className="mt-1 text-[9px] font-medium text-slate-400 font-body">À revoir</span>
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 px-2 py-1.5 text-center">
            <span className="text-[9px] text-slate-500 font-body">Décision finale = vous</span>
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
      <div className="card-illustration relative h-24 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-28 md:h-36">
        <div className="flex h-full flex-col justify-between">
          <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400 font-body">Coût mensuel</span>
          <div className="space-y-2">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[9px] text-slate-400 font-body">Agence trad.</span>
                <span className="text-[9px] font-medium text-slate-500 font-body">~1 400$/m</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-full rounded-full bg-slate-300" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[9px] font-medium text-blue-600 font-body">FluxLocatif</span>
                <span className="text-[9px] font-semibold text-emerald-600 font-body">699$/m</span>
              </div>
              <div className="h-2 rounded-full bg-blue-50">
                <div className="h-2 w-[50%] rounded-full bg-blue-400" />
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-2 py-1 text-center">
            <span className="text-[9px] font-semibold text-emerald-600 font-body">Jusqu&apos;à 50% d&apos;économies</span>
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

        <div className="mt-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {topCards.map((card, idx) => (
            <article
              key={card.title}
              className={cn(
                "group hover-tilt rounded-[24px] border border-white/90 bg-white/96 p-3.5 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_85px_rgba(15,23,42,0.08)] sm:rounded-[28px] sm:p-4 md:rounded-[30px] md:p-6",
                idx === 0 && "scroll-from-left",
                idx === 1 && "scroll-fade-up scroll-delay-1",
                idx === 2 && "scroll-from-right scroll-delay-2"
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
            {bottomCards.map((card, idx) => (
              <article
                key={card.title}
                className={cn(
                  "group hover-tilt rounded-[24px] border border-white/90 bg-white/96 p-3.5 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_85px_rgba(15,23,42,0.08)] sm:rounded-[26px] sm:p-4 md:rounded-[30px] md:p-7",
                  idx === 0 && "scroll-from-left",
                  idx === 1 && "scroll-from-right scroll-delay-1"
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
        </div>
      </div>
    </section>
  );
}
