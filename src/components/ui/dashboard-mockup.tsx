"use client";

import { 
  LayoutDashboard, 
  Users, 
  Filter, 
  Search, 
  CheckCircle2,
  ChevronRight,
  Briefcase,
  TrendingUp,
  LayoutGrid,
  ChevronDown,
  Bell,
  Settings,
  MoreHorizontal,
  Calendar,
  DollarSign,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardMockup() {
  const sidebarItems = [
    { icon: <LayoutDashboard className="h-3.5 w-3.5" />, label: "Tableau de bord", active: true },
    { icon: <Briefcase className="h-3.5 w-3.5" />, label: "Annonces" },
    { icon: <Filter className="h-3.5 w-3.5" />, label: "Candidatures", badge: "23" },
    { icon: <CheckCircle2 className="h-3.5 w-3.5" />, label: "Préqualifiés" },
  ];

  const metrics = [
    { label: "Demandes", value: "312", trend: "+ 243 ce mois-ci", color: "text-emerald-500", bg: "bg-emerald-50/30" },
    { label: "Candidats qualifiés", value: "58", trend: "+ 12% vs Q1", color: "text-emerald-500", bg: "bg-emerald-50/30" },
    { label: "Baux signés", value: "14", trend: "Objectif atteint", color: "text-emerald-500", bg: "bg-emerald-50/30", icon: <CheckCircle2 className="h-3 w-3" /> },
  ];

  const candidates = [
    { name: "Léa M.", property: "Loft Vieux-Mtl", income: "105k$", status: "En cours", score: "91", img: "https://picsum.photos/seed/f3/64/64", statusColor: "bg-blue-50 text-blue-600 border-blue-100" },
    { name: "Emma B.", property: "Appartement Plateau", income: "78k$", status: "Attente", score: "88", img: "https://picsum.photos/seed/f2/64/64", statusColor: "bg-slate-50 text-slate-500 border-slate-100" },
    { name: "Sarah V.", property: "Appartement Plateau", income: "72k$", status: "En cours", score: "84", img: "https://picsum.photos/seed/f5/64/64", statusColor: "bg-blue-50 text-blue-600 border-blue-100" },
    { name: "Chloé S.", property: "Condo Griffintown", income: "88k$", status: "Attente", score: "85", img: "https://picsum.photos/seed/f4/64/64", statusColor: "bg-slate-50 text-slate-500 border-slate-100" },
    { name: "Sophie L.", property: "Condo Griffintown", income: "110k$", status: "En cours", score: "92", img: "https://picsum.photos/seed/f1/64/64", statusColor: "bg-blue-50 text-blue-600 border-blue-100" },
    { name: "Julien R.", property: "Loft Vieux-Mtl", income: "92k$", status: "Vérifié", score: "95", img: "https://picsum.photos/seed/m2/64/64", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { name: "Thomas K.", property: "Condo Griffintown", income: "95k$", status: "Vérifié", score: "94", img: "https://picsum.photos/seed/m3/64/64", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { name: "Antoine P.", property: "Appartement Plateau", income: "82k$", status: "Vérifié", score: "96", img: "https://picsum.photos/seed/m4/64/64", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { name: "Mathieu G.", property: "Loft Vieux-Mtl", income: "120k$", status: "Vérifié", score: "99", img: "https://picsum.photos/seed/m5/64/64", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { name: "Marc-Antoine D.", property: "Appartement Plateau", income: "85k$", status: "Vérifié", score: "98", img: "https://picsum.photos/seed/m1/64/64", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  ];

  return (
    <div className="w-full h-full bg-white flex flex-col md:flex-row overflow-hidden font-body text-slate-900 select-none">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden md:flex w-60 bg-[#F8FAFC] flex-col shrink-0 border-r border-slate-100 overflow-hidden transition-all duration-300">
        <div className="p-5 flex items-center justify-between border-b border-slate-100 mb-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-[#3B82F6] shadow-sm">
              <LayoutGrid className="h-4 w-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-medium text-[#0F172A] leading-none mb-1">Portfellis Principal</p>
              <p className="text-[9px] text-slate-400 font-normal">Locations actives</p>
            </div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-slate-300" />
        </div>
        
        <nav className="flex-1 px-3 space-y-1 mt-4">
          {sidebarItems.map((item, i) => (
            <div 
              key={i} 
              className={cn(
                "flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 cursor-pointer group",
                item.active 
                  ? "bg-white text-[#3B82F6] shadow-sm border border-slate-100" 
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn("transition-colors", item.active ? "text-[#3B82F6]" : "text-slate-300 group-hover:text-slate-500")}>{item.icon}</span>
                <span className="text-[12px] font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 group-hover:bg-[#3B82F6]/10 group-hover:text-[#3B82F6] transition-colors">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
          
          <div className="pt-6 px-2">
            <div className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.1em] mb-3 px-1">Actions rapides</div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all cursor-pointer text-[11px] font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                Nouvelle annonce
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all cursor-pointer text-[11px] font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                Rapport mensuel
              </div>
            </div>
          </div>
        </nav>

        <div className="p-5 border-t border-slate-100 flex items-center gap-3 mt-auto">
          <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 border border-white shadow-sm overflow-hidden">
            <img src="https://picsum.photos/seed/user1/64/64" alt="User" className="w-full h-full object-cover opacity-80" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[11px] font-medium text-[#0F172A] truncate">Jean G.</p>
            <p className="text-[9px] text-slate-400 font-normal">Agent Location</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        <header className="h-12 md:h-16 border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 md:gap-3 text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 w-full max-w-[200px] md:max-w-[300px]">
            <Search className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0 text-slate-300" />
            <span className="text-[11px] md:text-[13px] font-normal text-slate-400/70 truncate">Rechercher un candidat...</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-2 text-slate-400 mr-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-medium uppercase tracking-wider">Live</span>
            </div>
            <div className="flex items-center gap-3 mr-2">
              <div className="relative p-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
                <Settings className="h-4 w-4" />
              </div>
            </div>
            <div className="bg-[#3B82F6] text-white text-[9px] md:text-[11px] font-medium h-7 md:h-9 px-3 md:px-5 rounded-full flex items-center shadow-[0_4px_12px_rgba(59,130,246,0.25)] hover:bg-[#2F76EE] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              Nouveau
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8 overflow-auto space-y-6 md:space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 md:space-y-1">
              <h2 className="text-lg md:text-2xl font-headline font-medium text-[#0F172A] tracking-tight">Pipeline de Location</h2>
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-500"></div>
                <p className="text-[10px] md:text-[12px] text-slate-400 font-normal">Flux de location en cours.</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[11px] font-medium bg-emerald-50/50 text-emerald-600 px-2 md:px-4 py-1 md:py-2 rounded-full border border-emerald-100/50">
              <CheckCircle2 className="h-3 md:h-4 w-3 md:w-4" />
              <span className="hidden xs:inline">Bureau actif</span>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {metrics.map((m, i) => (
              <div key={i} className={cn(
                "group relative bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden",
                i === 2 && "col-span-2 md:col-span-1"
              )}>
                <div className={cn("absolute top-0 right-0 w-16 md:w-24 h-16 md:h-24 -mr-6 md:-mr-8 -mt-6 md:-mt-8 rounded-full blur-2xl md:blur-3xl opacity-20 transition-opacity group-hover:opacity-30", m.bg)}></div>
                <p className="text-[10px] md:text-[11px] font-bold text-slate-400 mb-2 md:mb-4 uppercase tracking-wider">{m.label}</p>
                <div className="flex items-baseline mb-2 md:mb-4">
                  <span className="text-2xl md:text-3xl font-headline font-medium text-[#0F172A]">{m.value}</span>
                </div>
                <div className={cn("flex items-center gap-1.5 md:gap-2 text-[10px] md:text-[11px] font-medium", m.color)}>
                  {m.icon || <ArrowUpRight className="h-3 w-3 md:h-3.5 md:w-3.5" />}
                  <span className="truncate">{m.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Preview */}
          <div className="bg-white rounded-xl md:rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-4 md:px-8 py-4 border-b border-slate-100 flex justify-between items-center bg-[#F8FAFC]/50">
              <h3 className="font-medium text-[12px] text-[#0F172A] flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-300" />
                Candidats récents
              </h3>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
                  <Filter className="h-3.5 w-3.5" />
                  <span className="hidden xs:inline">Filtrer</span>
                </div>
              </div>
            </div>
            
            {/* Mobile Card List */}
            <div className="md:hidden divide-y divide-slate-50">
              {candidates.map((c, i) => (
                <div key={i} className="p-4 flex flex-col gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-sm">
                          <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-semibold text-[#0F172A]">{c.name}</span>
                        <span className="text-[11px] text-slate-400 font-normal">{c.property}</span>
                      </div>
                    </div>
                    <button className="p-2 text-slate-300 hover:text-slate-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 bg-slate-50/50 rounded-xl p-3 border border-slate-100">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Statut</span>
                      <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full border shadow-sm inline-block text-center", c.statusColor)}>
                        {c.status}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 items-center">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Revenu</span>
                      <span className="text-[11px] font-medium text-slate-600">{c.income}</span>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Score</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12px] font-bold text-emerald-600">{c.score}</span>
                        <div className="w-8 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${c.score}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Candidat</th>
                    <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Propriété</th>
                    <th className="hidden lg:table-cell px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Revenu</th>
                    <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Statut</th>
                    <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Score</th>
                    <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {candidates.map((c, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-all duration-200">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                              <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[13px] font-medium text-[#0F172A] truncate group-hover:text-primary transition-colors">{c.name}</span>
                            <span className="text-[10px] text-slate-400 font-normal">Dossier complété</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <span className="text-[13px] text-slate-500">{c.property}</span>
                      </td>
                      <td className="hidden lg:table-cell px-8 py-4">
                        <span className="text-[13px] font-medium text-slate-600">{c.income}</span>
                      </td>
                      <td className="px-8 py-4">
                        <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-sm", c.statusColor)}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${c.score}%` }}></div>
                          </div>
                          <span className="text-[12px] font-bold text-slate-700">{c.score}</span>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <button className="p-1.5 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-8 py-4 border-t border-slate-50 bg-[#F8FAFC]/30 flex justify-center">
              <button className="text-[12px] font-medium text-[#3B82F6] hover:underline">Voir tous les candidats</button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden h-16 border-t border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-around px-4 shrink-0">
          {sidebarItems.map((item, i) => (
            <div key={i} className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
              item.active ? "text-[#3B82F6]" : "text-slate-400"
            )}>
              {item.icon}
              <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
            </div>
          ))}
        </nav>
      </main>
    </div>
  );
}