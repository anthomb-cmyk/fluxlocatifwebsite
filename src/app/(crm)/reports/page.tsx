'use client';

import {
  BarChart3,
  Clock,
  CheckCircle2,
  FileCheck,
  TrendingUp,
  TrendingDown,
  Users,
} from 'lucide-react';
import { properties, candidates } from '@/lib/crm/data';

// Computed KPIs
const avgResponseTime = '2.4h';
const prequalRate = Math.round((candidates.filter(c => ['prequalified', 'to_present', 'presented', 'selected'].includes(c.status)).length / candidates.length) * 100);
const presentationRate = Math.round((candidates.filter(c => ['presented', 'selected'].includes(c.status)).length / candidates.length) * 100);
const avgTimeToRent = '18j';
const totalInquiries = properties.reduce((sum, p) => sum + p.demandVolume, 0);

const kpis = [
  { label: 'Temps rép. moyen', value: avgResponseTime, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', trend: '-12%', trendUp: false },
  { label: 'Taux préqualification', value: `${prequalRate}%`, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+5%', trendUp: true },
  { label: 'Taux présentation', value: `${presentationRate}%`, icon: FileCheck, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+3%', trendUp: true },
  { label: 'Délai moyen location', value: avgTimeToRent, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50', trend: '-2j', trendUp: false },
];

// Demand by property
const demandByProperty = properties
  .filter(p => !['rented', 'closed'].includes(p.status))
  .sort((a, b) => b.demandVolume - a.demandVolume);

// Source performance
const sourceCounts: Record<string, number> = {};
for (const c of candidates) {
  sourceCounts[c.source] = (sourceCounts[c.source] || 0) + 1;
}
const sourceData = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1]);

// Low traction
const lowTraction = properties.filter(p => p.status === 'low_demand' || (p.demandVolume < 5 && !['rented', 'closed', 'to_launch'].includes(p.status)));

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-headline font-semibold text-slate-900">Rapports</h1>
        <p className="text-sm text-slate-500 mt-0.5">Indicateurs clés de performance</p>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`${kpi.bg} p-2 rounded-lg`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${kpi.trendUp ? 'text-emerald-600' : 'text-blue-600'}`}>
                {kpi.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.trend}
              </span>
            </div>
            <p className="text-2xl font-headline font-semibold text-slate-900">{kpi.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Demand by property */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Demandes par propriété</h3>
          <div className="space-y-3">
            {demandByProperty.map(prop => {
              const maxDemand = Math.max(...demandByProperty.map(p => p.demandVolume), 1);
              return (
                <div key={prop.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700 truncate max-w-[200px]">{prop.address.split(',')[0]}</span>
                    <span className="text-sm font-medium text-slate-900 font-mono">{prop.demandVolume}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${prop.demandVolume < 5 ? 'bg-amber-400' : 'bg-blue-500'}`}
                      style={{ width: `${(prop.demandVolume / maxDemand) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Source performance */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Performance par source</h3>
          <div className="space-y-3">
            {sourceData.map(([source, count]) => {
              const maxCount = Math.max(...sourceData.map(([_, c]) => c), 1);
              return (
                <div key={source} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">{source}</span>
                    <span className="text-sm font-medium text-slate-900 font-mono">{count} candidats</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Low traction */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-semibold text-slate-900">Propriétés à faible traction</h3>
        </div>
        {lowTraction.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-2">Adresse</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-2">Loyer</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-2">Demandes</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-2">Jours sur marché</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {lowTraction.map(prop => (
                <tr key={prop.id}>
                  <td className="py-2.5 text-sm text-slate-700">{prop.address}</td>
                  <td className="py-2.5 text-sm text-slate-700 font-mono">{prop.rent}$</td>
                  <td className="py-2.5 text-sm text-amber-600 font-medium">{prop.demandVolume}</td>
                  <td className="py-2.5 text-sm text-slate-500">{prop.daysOnMarket}j</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-slate-400">Toutes les propriétés ont une bonne traction.</p>
        )}
      </div>

      {/* Summary stats */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-600">Total des demandes ce mois:</span>
          <span className="text-sm font-semibold text-slate-900 font-mono">{totalInquiries}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span>Candidats actifs: {candidates.filter(c => !['rejected', 'selected'].includes(c.status)).length}</span>
          <span>Propriétés actives: {properties.filter(p => !['rented', 'closed', 'to_launch'].includes(p.status)).length}</span>
        </div>
      </div>
    </div>
  );
}
