'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone, Mail, Building2, MapPin } from 'lucide-react';
import { getClient, getPropertiesForClient, getTasksForClient, activities, clientStatusLabels } from '@/lib/crm/data';
import { StatusBadge } from '@/components/crm/status-badge';
import { formatCurrency, formatDate, timeAgo } from '@/lib/crm/utils';

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const client = getClient(id);

  if (!client) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-slate-500">Client introuvable.</p>
      </div>
    );
  }

  const clientProperties = getPropertiesForClient(client.id);
  const clientTasks = getTasksForClient(client.id).filter(t => !t.completed);
  const clientActivities = activities.filter(a => a.entityId === client.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/clients" className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-headline font-semibold text-slate-900">{client.name}</h1>
            {client.company && <p className="text-sm text-slate-500">{client.company}</p>}
          </div>
        </div>
        <StatusBadge type="client" status={client.status} className="text-sm px-3 py-1" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {/* Info */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Informations</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-sm">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-slate-900">{client.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-slate-900">{client.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">Type:</span>
                <span className="text-slate-900 ml-auto">{client.clientType}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">Unités:</span>
                <span className="font-semibold text-slate-900 ml-auto">{client.unitCount}</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-500 mb-1">Source</p>
              <span className="text-sm bg-slate-50 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-100">{client.source}</span>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Notes</h3>
            <div className="bg-slate-50 rounded-lg p-3 min-h-[60px]">
              <p className="text-sm text-slate-700 whitespace-pre-wrap">{client.notes || 'Aucune note.'}</p>
            </div>
          </div>
        </div>

        {/* Properties */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Propriétés liées</h3>
              <span className="text-xs text-slate-400">{clientProperties.length}</span>
            </div>
            {clientProperties.length > 0 ? (
              <div className="space-y-2">
                {clientProperties.map(prop => (
                  <Link
                    key={prop.id}
                    href={`/properties/${prop.id}`}
                    className="block px-3 py-2.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all group"
                  >
                    <p className="text-sm font-medium text-slate-900 group-hover:text-blue-700 transition-colors">{prop.address}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <StatusBadge type="property" status={prop.status} />
                      <span className="text-xs text-slate-400">{formatCurrency(prop.rent)}/mois</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 text-center py-4">Aucune propriété liée.</p>
            )}
          </div>

          {/* Next action */}
          {client.nextAction && (
            <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-5">
              <h3 className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">Prochaine action</h3>
              <p className="text-sm text-blue-800">{client.nextAction}</p>
            </div>
          )}
        </div>

        {/* Activity + Tasks */}
        <div className="space-y-4">
          {clientTasks.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Tâches en cours</h3>
              <div className="space-y-2">
                {clientTasks.map(task => (
                  <div key={task.id} className="flex items-center gap-2.5 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span className="text-slate-700">{task.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Historique</h3>
            {clientActivities.length > 0 ? (
              <div className="space-y-3">
                {clientActivities.map(activity => (
                  <div key={activity.id} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-700">{activity.description}</p>
                      <p className="text-xs text-slate-400">{timeAgo(activity.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">Aucune activité récente.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
