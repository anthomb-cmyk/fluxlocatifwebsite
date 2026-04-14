'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building2, Search } from 'lucide-react';
import { properties, getClient, getCandidatesForProperty, propertyStatusLabels, type PropertyStatus } from '@/lib/crm/data';
import { StatusBadge } from '@/components/crm/status-badge';
import { formatCurrency } from '@/lib/crm/utils';
import { CrmPageHeader } from '@/components/crm/crm-page-header';
import { CrmPanel, CrmPanelBody, CrmPanelEyebrow, CrmPanelHeader, CrmPanelTitle } from '@/components/crm/crm-panel';

const statusOptions: PropertyStatus[] = ['to_launch', 'active', 'low_demand', 'qualifying', 'visits_in_progress', 'waiting_on_client', 'rented', 'closed'];

const activeCount = properties.filter(p => p.status === 'active' || p.status === 'qualifying' || p.status === 'visits_in_progress').length;
const waitingCount = properties.filter(p => p.status === 'waiting_on_client').length;
const lowDemandCount = properties.filter(p => p.status === 'low_demand').length;
const rentedCount = properties.filter(p => p.status === 'rented').length;

export default function PropertiesPage() {
  const [statusFilter, setStatusFilter] = useState<PropertyStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = properties.filter(p => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (searchQuery && !p.address.toLowerCase().includes(searchQuery.toLowerCase()) && !p.city.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <CrmPageHeader
        eyebrow="Portefeuille"
        title="Propriétés"
        stats={[
          { label: 'Total', value: String(properties.length), hint: 'Toutes unités' },
          { label: 'Actives', value: String(activeCount), hint: 'En location' },
          { label: 'Attente client', value: String(waitingCount), hint: 'Bloquées' },
          { label: 'Faible demande', value: String(lowDemandCount), hint: 'À corriger' },
          { label: 'Louées', value: String(rentedCount), hint: 'Complétées' },
        ]}
        actions={(
          <button className="flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-slate-700 transition-colors">
            <Building2 className="h-3.5 w-3.5" />
            Nouvelle propriété
          </button>
        )}
      />

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Adresse ou ville…"
            className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-[13px] text-slate-900 outline-none focus:border-slate-400 focus:ring-0 placeholder:text-slate-400"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-[13px] text-slate-700 outline-none focus:border-slate-400"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as PropertyStatus | 'all')}
        >
          <option value="all">Tous les statuts</option>
          {statusOptions.map(s => (
            <option key={s} value={s}>{propertyStatusLabels[s]}</option>
          ))}
        </select>
      </div>

      <CrmPanel>
        <CrmPanelHeader className="space-y-1 pb-3">
          <CrmPanelEyebrow>Liste des propriétés</CrmPanelEyebrow>
          <CrmPanelTitle>{filtered.length} résultat{filtered.length !== 1 ? 's' : ''}</CrmPanelTitle>
        </CrmPanelHeader>
        <CrmPanelBody className="overflow-x-auto pt-0">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Adresse</th>
                <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Loyer</th>
                <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Type</th>
                <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Statut</th>
                <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Demande</th>
                <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Client</th>
                <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Jours</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(property => {
                const client = getClient(property.clientId);
                return (
                  <tr key={property.id} className="group border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 pr-4">
                      <Link href={`/properties/${property.id}`} className="text-[13px] font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {property.address}
                      </Link>
                      <p className="mt-0.5 text-[11px] text-slate-400">{property.city}</p>
                    </td>
                    <td className="whitespace-nowrap py-3.5 pr-4 font-mono text-[13px] font-semibold text-slate-900">
                      {formatCurrency(property.rent)}
                    </td>
                    <td className="py-3.5 pr-4 text-[12px] text-slate-600">{property.unitType}</td>
                    <td className="py-3.5 pr-4">
                      <StatusBadge type="property" status={property.status} />
                    </td>
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-14 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{ width: `${Math.min(100, (property.demandVolume / 25) * 100)}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-500">{property.demandVolume}</span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 text-[12px] text-slate-600">{client?.name || '—'}</td>
                    <td className="whitespace-nowrap py-3.5 font-mono text-[12px] text-slate-500">{property.daysOnMarket}j</td>
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
