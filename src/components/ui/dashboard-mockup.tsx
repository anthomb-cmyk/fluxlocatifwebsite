"use client";

import {
  ArrowUpRight,
  Bell,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Filter,
  LayoutDashboard,
  LayoutGrid,
  MoreHorizontal,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardMockup() {
  const sidebarItems = [
    { icon: <LayoutDashboard className="h-3.5 w-3.5" />, label: "Tableau de bord", active: true },
    { icon: <Briefcase className="h-3.5 w-3.5" />, label: "Propriétés" },
    { icon: <Filter className="h-3.5 w-3.5" />, label: "Demandes", badge: "23" },
    { icon: <CheckCircle2 className="h-3.5 w-3.5" />, label: "Préqualifiés" },
  ];

  const metrics = [
    { label: "Demandes", value: "312", trend: "+243", color: "text-emerald-500", bg: "bg-emerald-50/30" },
    { label: "Préqualifiés", value: "58", trend: "+12%", color: "text-emerald-500", bg: "bg-emerald-50/30" },
    { label: "Visites", value: "14", trend: "Actif", color: "text-emerald-500", bg: "bg-emerald-50/30", icon: <CheckCircle2 className="h-3 w-3" /> },
  ];

  const candidates = [
    { name: "Léa M.", property: "Loft Vieux-Mtl", income: "105k$", status: "En cours", score: "91", img: "https://picsum.photos/seed/f3/64/64", statusColor: "bg-blue-50 text-blue-600 border-blue-100" },
    { name: "Emma B.", property: "Appartement Plateau", income: "78k$", status: "Attente", score: "88", img: "https://picsum.photos/seed/f2/64/64", statusColor: "bg-slate-50 text-slate-500 border-slate-100" },
    { name: "Sophie L.", property: "Condo Griffintown", income: "110k$", status: "En cours", score: "92", img: "https://picsum.photos/seed/f1/64/64", statusColor: "bg-blue-50 text-blue-600 border-blue-100" },
    { name: "Julien R.", property: "Loft Vieux-Mtl", income: "92k$", status: "Vérifié", score: "95", img: "https://picsum.photos/seed/m2/64/64", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  ];

  const mobileMetrics = metrics.slice(0, 2);
  const mobileCandidates = candidates.slice(0, 1);

  return (
    <div className="flex h-full w-full overflow-hidden bg-white font-body text-slate-900 select-none">
      <aside className="hidden w-60 flex-col overflow-hidden border-r border-slate-100 bg-[#F8FAFC] md:flex">
        <div className="mb-1 flex items-center justify-center border-b border-slate-100 p-2 sm:p-2.5 md:justify-between md:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#3B82F6] shadow-sm">
              <LayoutGrid className="h-4 w-4" />
            </div>
            <div className="hidden overflow-hidden md:block">
              <p className="mb-1 text-[11px] leading-none text-[#0F172A]">Portefeuille principal</p>
              <p className="text-[11px] font-normal text-slate-400">Locations actives</p>
            </div>
          </div>
          <ChevronDown className="hidden h-3.5 w-3.5 text-slate-300 md:block" />
        </div>

        <nav className="mt-1.5 flex-1 space-y-1 px-1 sm:px-1.5 md:mt-4 md:px-3">
          {sidebarItems.map((item, i) => (
            <div
              key={i}
              className={cn(
                "group flex cursor-pointer items-center justify-center rounded-xl p-2 transition-all duration-200 md:justify-between",
                item.active
                  ? "border border-slate-100 bg-white text-[#3B82F6] shadow-sm"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              )}
            >
              <div className="flex items-center gap-0 md:gap-3">
                <span className={cn("transition-colors", item.active ? "text-[#3B82F6]" : "text-slate-300 group-hover:text-slate-500")}>{item.icon}</span>
                <span className="hidden text-[12px] md:inline">{item.label}</span>
              </div>
              {item.badge && (
                <span className="hidden rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-400 transition-colors group-hover:bg-[#3B82F6]/10 group-hover:text-[#3B82F6] md:inline">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white">
        <header className="sticky top-0 z-10 flex h-11 shrink-0 items-center justify-between border-b border-slate-100 bg-white/85 px-2.5 backdrop-blur-md sm:px-3 md:h-16 md:px-8">
          <div className="flex w-full max-w-[190px] items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1.5 text-slate-400 md:max-w-[300px] md:gap-3 md:px-3">
            <Search className="h-3.5 w-3.5 shrink-0 text-slate-300 md:h-4 md:w-4" />
            <span className="truncate text-[11px] text-slate-400/70 md:text-[13px]">Rechercher...</span>
          </div>
          <div className="ml-2 flex items-center gap-1.5 md:gap-4">
            <div className="relative p-1.5 text-slate-400 transition-colors hover:text-slate-600 md:p-2">
              <Bell className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full border border-white bg-red-500 md:h-2 md:w-2" />
            </div>
            <div className="hidden p-1.5 text-slate-400 transition-colors hover:text-slate-600 md:block md:p-2">
              <Settings className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </div>
            <div className="flex h-7 items-center rounded-full bg-[#3B82F6] px-2.5 text-[10px] text-white shadow-[0_4px_12px_rgba(59,130,246,0.25)] md:h-9 md:px-5 md:text-[11px]">
              Nouveau
            </div>
          </div>
        </header>

        <div className="md:hidden flex-1 p-2.5 overflow-hidden">
          <div className="h-full rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
            <div className="mb-3 grid grid-cols-3 gap-2">
              {sidebarItems.slice(0, 3).map((item) => (
                <div key={item.label} className={cn(
                  "flex items-center justify-center gap-1.5 rounded-xl border px-2 py-1.5",
                  item.active ? "border-blue-100 bg-blue-50 text-blue-600" : "border-slate-100 bg-slate-50 text-slate-500"
                )}>
                  {item.icon}
                  <span className="text-[12px]">{item.label.split(" ")[0]}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {mobileMetrics.map((m) => (
                <div key={m.label} className="relative overflow-hidden rounded-xl border border-slate-100 bg-[#fbfcff] p-3">
                  <div className={cn("absolute -right-5 -top-5 h-14 w-14 rounded-full blur-2xl opacity-25", m.bg)} />
                  <p className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{m.label}</p>
                  <p className="mt-1 text-[24px] leading-none text-slate-900">{m.value}</p>
                  <p className={cn("mt-2 text-[12px]", m.color)}>{m.trend}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[12px] text-slate-600">Pipeline</p>
                <span className="text-[12px] text-emerald-600">En progression</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-blue-100 bg-blue-50/70 p-2 text-center">
                  <p className="text-[11px] text-slate-500">Entrée</p>
                  <p className="mt-1 text-[16px] text-slate-900">18</p>
                </div>
                <div className="rounded-lg border border-amber-100 bg-amber-50/70 p-2 text-center">
                  <p className="text-[11px] text-slate-500">Tri</p>
                  <p className="mt-1 text-[16px] text-slate-900">9</p>
                </div>
                <div className="rounded-lg border border-emerald-100 bg-emerald-50/70 p-2 text-center">
                  <p className="text-[11px] text-slate-500">Envoi</p>
                  <p className="mt-1 text-[16px] text-slate-900">4</p>
                </div>
              </div>
            </div>

            <div className="mt-3 overflow-hidden rounded-xl border border-slate-100 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 bg-[#F8FAFC]/70 px-2.5 py-2">
                <p className="text-[12px] text-slate-600">Meilleur dossier</p>
                <Filter className="h-3.5 w-3.5 text-slate-300" />
              </div>
              {mobileCandidates.map((c, i) => (
                <div key={i} className="flex items-center justify-between px-2.5 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                      <img src={c.img} alt={c.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[13px] leading-none text-slate-900">{c.name}</p>
                      <p className="mt-1 text-[11px] leading-none text-slate-400">{c.property}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={cn("inline-block rounded-full border px-2.5 py-0.5 text-[11px]", c.statusColor)}>{c.status}</span>
                    <p className="mt-1 text-[12px] text-emerald-600">Score {c.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:block flex-1 space-y-8 overflow-auto p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-headline text-[#0F172A] tracking-tight">Pipeline locatif</h2>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <p className="text-[12px] text-slate-400">Demandes en cours de traitement.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-100/50 bg-emerald-50/50 px-4 py-2 text-[11px] text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              Bureau actif
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {metrics.map((m, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className={cn("absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl opacity-20", m.bg)} />
                <p className="mb-4 text-[11px] uppercase tracking-wider text-slate-400">{m.label}</p>
                <p className="mb-4 text-3xl text-[#0F172A]">{m.value}</p>
                <div className={cn("flex items-center gap-2 text-[11px]", m.color)}>
                  {m.icon || <ArrowUpRight className="h-3.5 w-3.5" />}
                  <span>{m.trend}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 bg-[#F8FAFC]/50 px-8 py-4">
              <h3 className="flex items-center gap-2 text-[12px] text-[#0F172A]">
                <Users className="h-4 w-4 text-slate-300" />
                Demandes récentes
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Filter className="h-3.5 w-3.5" /> Filtrer
              </div>
            </div>

            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-8 py-4 text-[11px] uppercase tracking-wider text-slate-400">Candidat</th>
                  <th className="px-8 py-4 text-[11px] uppercase tracking-wider text-slate-400">Propriété</th>
                  <th className="px-8 py-4 text-[11px] uppercase tracking-wider text-slate-400">Revenu</th>
                  <th className="px-8 py-4 text-[11px] uppercase tracking-wider text-slate-400">Statut</th>
                  <th className="px-8 py-4 text-right text-[11px] uppercase tracking-wider text-slate-400">Score</th>
                  <th className="px-8 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {candidates.map((c, i) => (
                  <tr key={i} className="group transition-all duration-200 hover:bg-slate-50/50">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-slate-100 shadow-sm">
                          <img src={c.img} alt={c.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="text-[13px] text-[#0F172A]">{c.name}</p>
                          <p className="text-[10px] text-slate-400">Dossier structuré</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-[13px] text-slate-500">{c.property}</td>
                    <td className="px-8 py-4 text-[13px] text-slate-600">{c.income}</td>
                    <td className="px-8 py-4">
                      <span className={cn("rounded-full border px-2.5 py-1 text-[10px]", c.statusColor)}>{c.status}</span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${c.score}%` }} />
                        </div>
                        <span className="text-[12px] text-slate-700">{c.score}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button className="rounded-lg p-1.5 text-slate-300 transition-all hover:bg-slate-100 hover:text-slate-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
