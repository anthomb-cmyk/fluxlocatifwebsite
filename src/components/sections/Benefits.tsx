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
  },
  {
    eyebrow: "Préparation",
    title: "Des dossiers mieux préparés avant revue",
    description: "Les profils sont qualifiés plus tôt, avec un cadre de vérification clair.",
    icon: <ScanSearch className="h-5 w-5" />,
  },
  {
    eyebrow: "Visibilité",
    title: "Une visibilité plus claire d’un logement à l’autre",
    description: "L’avancement reste lisible pour comparer les étapes et prioriser les actions.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    eyebrow: "Décision",
    title: "Des décisions plus simples à prendre",
    description: "Vous gardez la décision finale avec un travail préparatoire déjà structuré.",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    eyebrow: "Coût",
    title: "Un modèle de coût plus compétitif",
    description:
      "Selon le volume et l’organisation recherchée, FluxLocatif peut coûter jusqu’à 50 % moins cher qu’une agence de location conventionnelle.",
    icon: <CircleDollarSign className="h-5 w-5" />,
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
                "hover-tilt rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md",
                idx === 0 && "scroll-from-left",
                idx === 1 && "scroll-fade-up scroll-delay-1",
                idx === 2 && "col-span-2 md:col-span-1 scroll-from-right scroll-delay-2"
              )}
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-500">
                {card.icon}
              </div>
              <p className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-500">
                {card.eyebrow}
              </p>
              <h3 className="mb-3 font-headline text-[1.1rem] font-medium leading-snug tracking-tight text-slate-900">
                {card.title}
              </h3>
              <p className="font-body text-[14px] leading-6 text-slate-500">{card.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 md:mt-10">
          <div className="grid grid-cols-2 gap-3.5 md:gap-5">
            {bottomCards.map((card, idx) => (
              <article
                key={card.title}
                className={cn(
                  "hover-tilt rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md",
                  idx === 0 && "scroll-from-left",
                  idx === 1 && "scroll-from-right scroll-delay-1"
                )}
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-500">
                  {card.icon}
                </div>
                <p className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-500">
                  {card.eyebrow}
                </p>
                <h3 className="mb-3 font-headline text-[1.1rem] font-medium leading-snug tracking-tight text-slate-900">
                  {card.title}
                </h3>
                <p className="font-body text-[14px] leading-6 text-slate-500">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
