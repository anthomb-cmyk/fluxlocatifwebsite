'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, Search } from 'lucide-react';
import { clients, clientStatusLabels, type ClientStatus } from '@/lib/crm/data';
import { StatusBadge } from '@/components/crm/status-badge';
import { formatDate } from '@/lib/crm/utils';

const statusOptions: ClientStatus[] = ['lead', 'contacted', 'call_scheduled', 'onboarding', 'active', 'paused', 'closed'];

export default function ClientsPage() {
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = clients.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase()) && !c.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-headline font-semibold text-slate-900">Clients</h1>
          <p className="text-sm text-slate-500 mt-0.5">{clients.length} clients au total</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium">
          <Users className="w-4 h-4" />
          Nouveau client
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou entreprise..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-colors"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as ClientStatus | 'all')}
        >
          <option value="all">Tous les statuts</option>
          {statusOptions.map(s => (
            <option key={s} value={s}>{clientStatusLabels[s]}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Nom</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Entreprise</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Type</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Unités</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Statut</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Prochaine action</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Dernière activité</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map(client => (
              <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-5 py-3.5">
                  <Link href={`/clients/${client.id}`} className="text-sm font-medium text-slate-900 group-hover:text-blue-700 transition-colors">
                    {client.name}
                  </Link>
                  <p className="text-xs text-slate-400">{client.email}</p>
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-600">{client.company || '—'}</td>
                <td className="px-5 py-3.5 text-sm text-slate-600">{client.clientType}</td>
                <td className="px-5 py-3.5 text-sm font-medium text-slate-900">{client.unitCount}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge type="client" status={client.status} />
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-600 max-w-[200px] truncate">{client.nextAction}</td>
                <td className="px-5 py-3.5 text-sm text-slate-500">{formatDate(client.lastActivity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
