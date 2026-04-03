import {
  ArrowUpRight,
  BadgeCheck,
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
    eyebrow: "Flux entrant",
    title: "Demandes entrantes",
    description: "Moins de temps perdu sur les messages répétitifs.",
    icon: <MessagesSquare className="h-5 w-5" />,
    illustration: (
      <div className="relative h-36 overflow-hidden rounded-[22px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-inner">
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
    eyebrow: "Validation",
    title: "Préqualification",
    description: "Les dossiers avancent avec plus de rigueur dès le départ.",
    icon: <ScanSearch className="h-5 w-5" />,
    illustration: (
      <div className="relative h-36 overflow-hidden rounded-[22px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-inner">
        <div className="rounded-[18px] border border-white bg-white/95 p-3.5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 font-body">
              Critères locataire
            </div>
            <div className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-600 font-body">
              Validé
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2 text-[11px] font-medium text-emerald-700 font-body">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Revenus vérifiés
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-2 text-[11px] font-medium text-blue-700 font-body">
              <ShieldCheck className="h-3.5 w-3.5" />
              Critères compatibles
            </div>
            <div className="mt-0.5 flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                <div className="h-1.5 w-[82%] rounded-full bg-emerald-400" />
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 font-body">94%</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Workflow",
    title: "Pipeline structuré",
    description: "Chaque étape reste visible et plus simple à piloter.",
    icon: <Target className="h-5 w-5" />,
    illustration: (
      <div className="relative h-36 overflow-hidden rounded-[22px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-inner">
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
    eyebrow: "Résultat",
    title: "Des opérations plus efficaces",
    description: "Vous gardez la main sur la décision finale, sans porter tout le volume opérationnel.",
    icon: <TrendingUp className="h-5 w-5" />,
    illustration: (
      <div className="relative h-36 overflow-hidden rounded-[22px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-inner">
        <div className="absolute -left-8 -bottom-8 h-20 w-20 rounded-full bg-blue-100/55 blur-2xl" />
        <div className="relative grid h-full grid-cols-[1.4fr_1fr] gap-2.5">
          <div className="rounded-[16px] border border-white bg-white/95 p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 font-body">
                Performance
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 font-body">+27%</div>
            </div>
            <div className="mt-3 grid h-12 grid-cols-5 items-end gap-1.5">
              {[24, 30, 38, 50, 64].map((height, index) => (
                <div
                  key={`${height}-${index}`}
                  className={`rounded-md ${
                    index < 3 ? "bg-slate-200" : index === 3 ? "bg-blue-300" : "bg-emerald-400"
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-slate-100">
              <div className="h-1.5 w-[76%] rounded-full bg-blue-400" />
            </div>
          </div>
          <div className="rounded-[16px] border border-white bg-white/95 p-3 shadow-sm">
            <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-body">Efficacité</div>
            <div className="mt-2 flex h-[72px] items-center justify-center rounded-xl bg-emerald-50/70 text-[22px] font-semibold text-emerald-600 font-headline">
              91
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Résultat",
    title: "Jusqu'à 50 % moins cher",
    description: "Une structure premium plus légère qu'une compagnie de location traditionnelle.",
    icon: <CircleDollarSign className="h-5 w-5" />,
    illustration: (
      <div className="relative h-36 overflow-hidden rounded-[22px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-inner">
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
            <div className="mt-2 text-[11px] font-medium text-emerald-600 font-body">Jusqu'à 50%</div>
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
            Les bénéfices clés de FluxLocatif, en un coup d'oeil.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-7 text-slate-500 font-body">
            Moins de charge manuelle, plus de dossiers qualifiés, et un pipeline locatif beaucoup plus lisible.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-5">
          {topCards.map((card, idx) => (
            <article
              key={card.title}
              className={cn(
                "reveal-animation reveal-card group rounded-[30px] border border-white/90 bg-white/96 p-4 shadow-[0_22px_70px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_85px_rgba(15,23,42,0.08)] md:p-6",
                idx === 0 && "col-span-2 md:col-span-1",
                idx === 1 && "col-span-1 md:col-span-1 md:-mt-6",
                idx === 2 && "col-span-1 mt-6 md:col-span-1 md:mt-4"
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
              <h3 className="mt-4 text-[1.95rem] leading-[1.05] font-medium tracking-tight text-slate-950 font-headline md:text-2xl">
                {card.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-500 font-body md:text-[15px]">
                {card.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-[28px] border border-white/85 bg-white/72 p-2.5 shadow-[0_18px_50px_rgba(15,23,42,0.04)] md:mt-10 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none">
          <div className="grid grid-cols-2 gap-3.5 md:grid-cols-2 md:gap-5">
            {bottomCards.map((card, idx) => (
              <article
                key={card.title}
                className={cn(
                  "reveal-animation reveal-card group rounded-[26px] border border-white/90 bg-white/96 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_85px_rgba(15,23,42,0.08)] md:rounded-[30px] md:p-7",
                  idx === 1 && "mt-6 md:mt-8"
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
                <h3 className="mt-4 text-[1.95rem] leading-[1.05] font-medium tracking-tight text-slate-950 font-headline md:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-500 font-body md:text-[15px]">
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
