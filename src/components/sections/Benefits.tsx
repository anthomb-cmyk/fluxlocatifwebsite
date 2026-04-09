import {
  ArrowUpRight,
  CheckCircle2,
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
      <div className="relative h-24 overflow-hidden rounded-[16px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-2.5 shadow-inner sm:h-28 md:h-36">
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-400 font-body">Triés</span>
            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 text-[7px] font-semibold text-emerald-600 font-body">Auto</span>
          </div>
          <div className="space-y-1">
            {[
              { opacity: "opacity-30", label: "Trié" },
              { opacity: "opacity-50", label: "Trié" },
              { opacity: "opacity-100", label: "→ Vous", highlight: true },
            ].map((row, i) => (
              <div key={i} className={`flex items-center gap-1.5 rounded-lg border border-slate-100 bg-white px-2 py-1 shadow-sm ${row.opacity}`}>
                <div className="h-4 w-4 shrink-0 rounded-full bg-slate-100" />
                <div className="h-1.5 flex-1 rounded-full bg-slate-200" />
                <span className={`shrink-0 text-[7px] font-medium font-body ${row.highlight ? "text-blue-500" : "text-slate-300"}`}>{row.label}</span>
              </div>
            ))}
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
      <div className="relative h-24 overflow-hidden rounded-[16px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-2.5 shadow-inner sm:h-28 md:h-36">
        <div className="flex h-full flex-col justify-between">
          <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-400 font-body">Checklist</span>
          <div className="space-y-1">
            {["Revenus", "Références", "Disponibilité"].map((label) => (
              <div key={label} className="flex items-center gap-1.5 rounded-lg border border-emerald-100 bg-emerald-50 px-2 py-1">
                <div className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                  <CheckCircle2 className="h-2 w-2 text-white" />
                </div>
                <span className="text-[8px] font-medium text-emerald-700 font-body">{label}</span>
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
      <div className="relative h-24 overflow-hidden rounded-[16px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-2.5 shadow-inner sm:h-28 md:h-36">
        <div className="grid h-full grid-cols-3 gap-1.5">
          {[
            { label: "Entrée", value: "18", color: "bg-blue-300", bg: "bg-blue-50/60" },
            { label: "Qualif.", value: "9", color: "bg-amber-300", bg: "bg-amber-50/60" },
            { label: "Prêts", value: "4", color: "bg-emerald-300", bg: "bg-emerald-50/60" },
          ].map((col) => (
            <div key={col.label} className={`flex flex-col justify-between rounded-[10px] border border-white p-1.5 shadow-sm ${col.bg}`}>
              <div className={`h-1 w-4 rounded-full ${col.color}`} />
              <div>
                <div className="text-[7px] font-medium text-slate-500 font-body">{col.label}</div>
                <div className="mt-0.5 font-headline text-[1rem] font-medium leading-none text-slate-900">{col.value}</div>
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
      <div className="relative h-24 overflow-hidden rounded-[16px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-2.5 shadow-inner sm:h-28 md:h-36">
        <div className="flex h-full flex-col justify-between">
          <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-400 font-body">Arbitrage</span>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 py-2">
              <span className="text-[16px] font-medium leading-none text-emerald-500">✓</span>
              <span className="mt-0.5 text-[7px] font-medium text-emerald-600 font-body">Approuvé</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-white py-2">
              <span className="text-[16px] font-medium leading-none text-slate-300">—</span>
              <span className="mt-0.5 text-[7px] font-medium text-slate-400 font-body">À revoir</span>
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 px-2 py-1 text-center">
            <span className="text-[7px] text-slate-500 font-body">Décision finale = vous</span>
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
      <div className="relative h-24 overflow-hidden rounded-[16px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-2.5 shadow-inner sm:h-28 md:h-36">
        <div className="flex h-full flex-col justify-between">
          <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-400 font-body">Coût / mois</span>
          <div className="space-y-1.5">
            <div>
              <div className="mb-0.5 flex items-center justify-between">
                <span className="text-[8px] text-slate-400 font-body">Agence</span>
                <span className="text-[8px] text-slate-400 font-body">~1 400$</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100">
                <div className="h-1.5 w-full rounded-full bg-slate-300" />
              </div>
            </div>
            <div>
              <div className="mb-0.5 flex items-center justify-between">
                <span className="text-[8px] font-medium text-blue-600 font-body">FluxLocatif</span>
                <span className="text-[8px] font-semibold text-emerald-600 font-body">699$</span>
              </div>
              <div className="h-1.5 rounded-full bg-blue-50">
                <div className="h-1.5 w-[50%] rounded-full bg-blue-400" />
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-2 py-1 text-center">
            <span className="text-[7px] font-semibold text-emerald-600 font-body">-50% vs agence trad.</span>
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
        <div className="reveal-animation reveal-title mb-12">
          <div className="mb-6 inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span className="font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-blue-500">
              RÉSULTATS OPÉRATIONNELS
            </span>
          </div>
          <div className="grid items-end gap-6 md:grid-cols-2">
            <h2 className="text-balance font-headline text-3xl font-medium leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl">
              Ce que vous gagnez concrètement.
            </h2>
            <p className="font-body text-[15px] leading-7 text-slate-500 md:pb-1">
              Moins de gestion répétitive, plus de clarté et des dossiers plus simples à traiter.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-5">
          {topCards.map((card, idx) => (
            <article
              key={card.title}
              className={cn(
                "group hover-tilt rounded-[24px] border border-white/90 bg-white/96 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_85px_rgba(15,23,42,0.08)] sm:rounded-[28px] sm:p-4 md:rounded-[30px] md:p-6",
                idx === 0 && "scroll-from-left",
                idx === 1 && "scroll-fade-up scroll-delay-1",
                idx === 2 && "col-span-2 md:col-span-1 scroll-from-right scroll-delay-2"
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
              <h3 className="mt-3 text-[0.95rem] font-medium leading-[1.15] tracking-tight text-slate-950 font-headline sm:text-[1.12rem] md:mt-4 md:text-[1.5rem]">
                {card.title}
              </h3>
              <p className="mt-2 text-[11px] leading-[1.5] text-slate-500 font-body sm:text-[13px] sm:leading-5 md:mt-3 md:text-[15px] md:leading-6">
                {card.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-4 md:mt-10">
          <div className="grid grid-cols-2 gap-3.5 md:gap-5">
            {bottomCards.map((card, idx) => (
              <article
                key={card.title}
                className={cn(
                  "group hover-tilt rounded-[24px] border border-white/90 bg-white/96 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_85px_rgba(15,23,42,0.08)] sm:rounded-[28px] sm:p-4 md:rounded-[30px] md:p-6",
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
                <h3 className="mt-3 text-[0.95rem] font-medium leading-[1.15] tracking-tight text-slate-950 font-headline sm:text-[1.12rem] md:mt-4 md:text-[1.5rem]">
                  {card.title}
                </h3>
                <p className="mt-2 text-[11px] leading-[1.5] text-slate-500 font-body sm:text-[13px] sm:leading-5 md:mt-3 md:text-[15px] md:leading-6">
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
