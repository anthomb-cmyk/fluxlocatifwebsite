'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserCheck, Search } from 'lucide-react';
import { candidates, getProperty, candidateStatusLabels, type CandidateStatus } from '@/lib/crm/data';
import { StatusBadge } from '@/components/crm/status-badge';
import { formatCurrency, renderStars } from '@/lib/crm/utils';
import { CrmPageHeader } from '@/components/crm/crm-page-header';
import { CrmPanel, CrmPanelBody, CrmPanelEyebrow, CrmPanelHeader, CrmPanelTitle } from '@/components/crm/crm-panel';

const statusOptions: CandidateStatus[] = ['new', 'to_qualify', 'qualifying', 'prequalified', 'to_present', 'presented', 'rejected', 'selected', 'visit_to_schedule'];

const toQualify = candidates.filter(c => c.status === 'new' || c.status === 'to_qualify').length;
const qualified = candidates.filter(c => c.qualificationLevel >= 2).length;
const toPresent = candidates.filter(c => c.status === 'to_present').length;
const selected = candidates.filter(c => c.status === 'selected').length;

export default function CandidatesPage() {
  const [statusFilter, setStatusFilter] = useState<CandidateStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = candidates.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase()) && !c.email.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <CrmPageHeader
        eyebrow="Qualification"
        title="Candidats"
        stats={[
          { label: 'Total', value: String(candidates.length), hint: 'Tous les candidats' },
          { label: 'À qualifier', value: String(toQualify), hint: 'Nouveaux' },
          { label: 'Qualifiés', value: String(qualified), hint: '2+ étoiles' },
          { label: 'À présenter', value: String(toPresent), hint: 'Prêts au client' },
          { label: 'Sélectionnés', value: String(selected), hint: 'Retenus' },
        ]}
        actions={(
          <button className="flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-slate-700 transition-colors">
            <UserCheck className="h-3.5 w-3.5" />
            Nouveau candidat
          </button>
        )}
      />

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Nom ou courriel…"
            className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-[13px] text-slate-900 outline-none focus:border-slate-400 placeholder:text-slate-400"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-[13px] text-slate-700 outline-none focus:border-slate-400"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as CandidateStatus | 'all')}
        >
          <option value="all">Tous les statuts</option>
          {statusOptions.map(s => (
            <option key={s} value={s}>{candidateStatusLabels[s]}</option>
          ))}
        </select>
      </div>

      <CrmPanel>
        <CrmPanelHeader className="space-y-1 pb-3">
          <CrmPanelEyebrow>Liste des candidats</CrmPanelEyebrow>
          <CrmPanelTitle>{filtered.length} résultat{filtered.length !== 1 ? 's' : ''}</CrmPanelTitle>
        </CrmPanelHeader>
        <CrmPanelBody className="overflow-x-auto pt-0">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Candidat</th>
                <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Propriété ciblée</th>
                <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Statut</th>
                <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Score</th>
                <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Revenu</th>
                <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Crédit</th>
                <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Emménagement</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(candidate => {
                const property = getProperty(candidate.targetPropertyId);
                return (
                  <tr key={candidate.id} className="group border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 pr-4">
                      <Link href={`/candidates/${candidate.id}`} className="text-[13px] font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {candidate.name}
                      </Link>
                      <p className="mt-0.5 text-[11px] text-slate-400">{candidate.email}</p>
                    </td>
                    <td className="py-3.5 pr-4">
                      {property ? (
                        <Link href={`/properties/${property.id}`} className="text-[12px] text-slate-600 hover:text-blue-600 transition-colors">
                          {property.address.split(',')[0]}
                        </Link>
                      ) : <span className="text-[12px] text-slate-400">—</span>}
                    </td>
                    <td className="py-3.5 pr-4">
                      <StatusBadge type="candidate" status={candidate.status} />
                    </td>
                    <td className="py-3.5 pr-4 text-amber-500 text-[13px]">{renderStars(candidate.qualificationLevel)}</td>
                    <td className="whitespace-nowrap py-3.5 pr-4 font-mono text-[12px] text-slate-700">
                      {formatCurrency(candidate.income)}
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        candidate.credit === 'excellent' ? 'bg-emerald-50 text-emerald-700' :
                        candidate.credit === 'good' ? 'bg-blue-50 text-blue-700' :
                        candidate.credit === 'fair' ? 'bg-amber-50 text-amber-700' :
                        'bg-rose-50 text-rose-600'
                      }`}>
                        {candidate.credit === 'excellent' ? 'Excellent' : candidate.credit === 'good' ? 'Bon' : candidate.credit === 'fair' ? 'Moyen' : 'Faible'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap py-3.5 text-[12px] text-slate-600">
                      {candidate.moveInDate.split('-').reverse().join('/')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CrmPanelBody>
      </CrmPanel>
    </div>
  );
}
