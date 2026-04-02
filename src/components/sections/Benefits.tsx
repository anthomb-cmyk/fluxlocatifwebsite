"use client";

import { 
  Mail, 
  Filter, 
  LayoutDashboard, 
  Sparkles,
  CheckCircle2,
  Users,
  PieChart,
  User,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

const InboxScene = () => (
  <div className="relative w-full h-32 sm:h-56 bg-slate-50/50 rounded-t-[1.5rem] md:rounded-t-[3.5rem] border-b border-slate-100 p-4 sm:p-8 overflow-hidden flex flex-col justify-center gap-2 sm:gap-4">
    <div className="absolute top-0 left-0 right-0 h-6 sm:h-10 border-b border-slate-100 flex items-center px-4 sm:px-8 gap-1 sm:gap-2 bg-white/40 backdrop-blur-sm">
      <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
    </div>

    <div className="flex items-center gap-3 sm:gap-5 p-3 sm:p-5 rounded-[1rem] sm:rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.05)] w-full max-w-[280px] sm:max-w-[340px] mx-auto transform hover:translate-y-[-4px] transition-transform duration-700">
      <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0">
        <Mail className="h-4 w-4 sm:h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="h-2 w-16 sm:w-28 bg-slate-900 rounded-full mb-1 sm:mb-2"></div>
        <div className="h-1 w-12 sm:w-20 bg-slate-400/30 rounded-full"></div>
      </div>
      <div className="shrink-0 hidden xs:flex flex-col items-end gap-1">
        <div className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-[7px] sm:text-[10px] font-bold text-emerald-600 uppercase tracking-tighter border border-emerald-500/20 font-body">
          Qualifié
        </div>
      </div>
    </div>
  </div>
);

const ScoreScene = () => (
  <div className="relative w-full h-32 sm:h-56 bg-slate-50/50 rounded-t-[1.5rem] md:rounded-t-[3.5rem] border-b border-slate-100 flex items-center justify-center p-4 sm:p-8">
    <div className="bg-white p-3 sm:p-7 rounded-[1rem] sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 w-full max-w-[220px] sm:max-w-[280px] space-y-2 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
          <Filter className="h-3.5 w-3.5 sm:h-5 text-slate-400" />
        </div>
        <div className="hidden xs:flex flex-col items-end">
          <div className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-[7px] sm:text-[10px] font-bold text-emerald-600 uppercase tracking-widest border border-emerald-500/20 font-body">Excellent</div>
        </div>
      </div>
      <div className="space-y-2 sm:space-y-3">
        <div className="flex justify-between items-center text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 font-body">
          <span className="hidden sm:inline">Solvabilité</span>
          <span className="sm:hidden">Solv.</span>
          <span className="text-emerald-500">9.2 / 10</span>
        </div>
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center gap-1.5 py-1 sm:py-2 bg-emerald-50/40 px-2 sm:px-3 rounded-md sm:rounded-lg text-[7px] sm:text-[9px] font-bold text-emerald-600 border border-emerald-100/50 font-body">
            <CheckCircle2 className="h-2.5 w-2.5 sm:h-3" /> <span className="truncate">REVENUS VALIDÉS</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PipelineScene = () => (
  <div className="relative w-full h-32 sm:h-56 bg-slate-50/50 rounded-t-[1.5rem] md:rounded-t-[3.5rem] border-b border-slate-100 flex flex-col items-center justify-center p-4 gap-2 overflow-hidden">
    <div className="w-full max-w-[140px] sm:max-w-[200px] p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-slate-200 shadow-[0_15px_35px_rgba(0,0,0,0.06)] transform rotate-[-1deg] z-10">
      <div className="flex justify-between items-center mb-2 sm:mb-3">
        <div className="h-1.5 w-12 sm:w-16 bg-slate-900 rounded-full"></div>
        <div className="h-3 w-3 rounded-full bg-primary/10 flex items-center justify-center">
          <div className="h-1 w-1 rounded-full bg-primary animate-pulse"></div>
        </div>
      </div>
      <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
        <div className="w-[85%] h-full bg-primary"></div>
      </div>
    </div>
  </div>
);

const MatchScene = () => (
  <div className="relative w-full h-32 sm:h-56 bg-slate-50/50 rounded-t-[1.5rem] md:rounded-t-[3.5rem] border-b border-slate-100 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
    <div className="flex items-center gap-2 sm:gap-4">
      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center z-10">
        <User className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
      </div>
      <div className="flex flex-col items-center gap-1 z-0 -mx-4 sm:-mx-6">
        <div className="w-12 sm:w-16 h-0.5 bg-emerald-500/30 border-t border-dashed border-emerald-500"></div>
        <div className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-[7px] sm:text-[9px] font-bold text-emerald-600 uppercase tracking-widest whitespace-nowrap">98% Match</div>
      </div>
      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center z-10">
        <Home className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
      </div>
    </div>
  </div>
);

const CostScene = () => (
  <div className="relative w-full h-32 sm:h-56 bg-slate-50/50 rounded-t-[1.5rem] md:rounded-t-[3.5rem] border-b border-slate-100 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
    <div className="relative z-10 w-full max-w-[200px] sm:max-w-[240px] bg-white rounded-lg sm:rounded-xl shadow-lg border border-slate-100/80 p-3 sm:p-5 flex flex-col gap-3 sm:gap-4">
      <div className="flex items-center justify-between border-b border-slate-50 pb-2">
        <span className="text-[9px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider font-body">Comparatif des coûts</span>
        <PieChart className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
      </div>
      <div className="flex items-end gap-3 sm:gap-4 h-16 sm:h-20">
        <div className="flex flex-col gap-1.5 flex-1 h-full justify-end">
          <div className="w-full bg-slate-100 rounded-t-md relative overflow-hidden h-full">
            <div className="absolute bottom-0 left-0 right-0 h-full bg-slate-200"></div>
          </div>
          <span className="text-[7px] sm:text-[9px] text-center text-slate-400 font-medium uppercase tracking-wider">Traditionnel</span>
        </div>
        <div className="flex flex-col gap-1.5 flex-1 h-full justify-end">
          <div className="w-full bg-emerald-50 rounded-t-md relative overflow-hidden flex items-end h-full">
            <div className="w-full h-[50%] bg-emerald-400 rounded-t-md"></div>
          </div>
          <span className="text-[7px] sm:text-[9px] text-center text-emerald-600 font-bold uppercase tracking-wider">-50%</span>
        </div>
      </div>
    </div>
  </div>
);

export function Benefits() {
  const primaryBenefits = [
    {
      scene: <InboxScene />,
      title: "Traitement des demandes",
      description: "Suivi constant et réactif de 100% des messages prospects.",
      icon: <Mail className="h-5 w-5" />
    },
    {
      scene: <ScoreScene />,
      title: "Préqualification",
      description: "Analyse exhaustive pour ne livrer que des dossiers premium.",
      icon: <Filter className="h-5 w-5" />
    },
  ];

  const secondaryBenefits = [
    {
      scene: <PipelineScene />,
      title: "Pilotage Pipeline",
      description: "Organisation structurée de chaque candidature.",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      scene: <MatchScene />,
      title: "Matching intelligent",
      description: "Notre algorithme de matching aligne précisément les profils avec vos critères.",
      icon: <Users className="h-5 w-5" />
    },
    {
      scene: <CostScene />,
      title: "Efficacité financière",
      description: "Jusqu'à 50 % moins cher qu'une compagnie de location traditionnelle.",
      icon: <PieChart className="h-5 w-5" />
    },
  ];

  return (
    <section id="scope" className="py-16 md:py-40 bg-[#FAFAFA] relative">
      <div className="container mx-auto px-6 max-w-7xl relative">
        <div className="text-center mb-12 md:mb-24 reveal-animation reveal-title">
          <div className="inline-flex items-center gap-2.5 py-1.5 px-4 rounded-full bg-primary/5 text-primary font-bold text-[10px] uppercase tracking-[0.25em] mb-8 border border-primary/10 font-body">
            <Sparkles className="h-3 w-3" />
            <span>Excellence Opérationnelle</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-medium mb-6 md:mb-10 tracking-tighter leading-tight text-slate-900 text-balance">
            Un service conçu pour <br className="hidden md:block" /> les propriétaires exigeants.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-10 mb-6 md:mb-10">
          {primaryBenefits.map((benefit, idx) => (
            <div
              key={idx}
              className={cn(
                "group relative bg-white rounded-[1.5rem] md:rounded-[3rem] border border-slate-200/60 overflow-hidden flex flex-col transition-all duration-700 hover:shadow-xl reveal-animation reveal-card",
                idx === 1 && "delay-150"
              )}
            >
              {benefit.scene}
              <div className="p-4 md:p-12 space-y-2 md:space-y-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-all duration-500">
                    <div className="h-3.5 w-3.5 md:h-5 md:w-5">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-sm md:text-3xl font-medium tracking-tight text-slate-900 font-headline">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-slate-500 leading-relaxed font-normal text-[11px] md:text-xl font-body line-clamp-2 md:line-clamp-none">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {secondaryBenefits.map((benefit, idx) => (
            <div
              key={idx}
              className={cn(
                "group bg-white rounded-[1.2rem] md:rounded-[2.5rem] border border-slate-200/60 overflow-hidden flex flex-col transition-all duration-700 hover:shadow-lg reveal-animation reveal-card",
                idx === 0 && "delay-150",
                idx === 1 && "delay-300",
                idx === 2 && "delay-450",
                idx === 2 && "col-span-2 lg:col-span-1"
              )}
            >
              {benefit.scene}
              <div className="p-4 md:p-8 space-y-2 md:space-y-4 flex-1 flex flex-col">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-all duration-700 shrink-0">
                  <div className="h-3.5 w-3.5 md:h-5 md:w-5">
                    {benefit.icon}
                  </div>
                </div>
                <div className="space-y-1 md:space-y-2 flex-1">
                  <h3 className="text-sm md:text-lg font-medium tracking-tight text-slate-900 font-headline">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-normal text-[10px] md:text-base font-body line-clamp-2 md:line-clamp-none">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
