'use client';

import { use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  AlertTriangle,
  Circle,
  BedDouble,
  PawPrint,
  Car,
  Zap,
} from 'lucide-react';
import {
  getProperty,
  getClient,
  getCandidatesForProperty,
  getTasksForProperty,
  activities,
  propertyStatusLabels,
  type Candidate,
} from '@/lib/crm/data';
import { StatusBadge } from '@/components/crm/status-badge';
import { formatCurrency, formatDate, timeAgo, getDaysColor, renderStars } from '@/lib/crm/utils';
import { CrmPanel, CrmPanelBody, CrmPanelEyebrow, CrmPanelHeader, CrmPanelTitle } from '@/components/crm/crm-panel';
import { cn } from '@/lib/utils';

function groupCandidatesByStage(candidates: Candidate[]) {
  const groups: Record<string, Candidate[]> = {
    'À qualifier': [],
    'En qualification': [],
    'Préqualifié': [],
    'À présenter': [],
    'Présenté': [],
    'Visite': [],
    'Sélectionné': [],
  };
  for (const c of candidates) {
    if (c.status === 'new' || c.status === 'to_qualify') groups['À qualifier'].push(c);
    else if (c.status === 'qualifying') groups['En qualification'].push(c);
    else if (c.status === 'prequalified') groups['Préqualifié'].push(c);
    else if (c.status === 'to_present') groups['À présenter'].push(c);
    else if (c.status === 'presented') groups['Présenté'].push(c);
    else if (c.status === 'visit_to_schedule') groups['Visite'].push(c);
    else if (c.status === 'selected') groups['Sélectionné'].push(c);
  }
  return Object.entries(groups).filter(([, cs]) => cs.length > 0);
}

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = getProperty(id);

  if (!property) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-slate-500">Propriété introuvable.</p>
      </div>
    );
  }

  const client = getClient(property.clientId);
  const candidates = getCandidatesForProperty(property.id);
  const propertyTasks = getTasksForProperty(property.id);
  const groupedCandidates = groupCandidatesByStage(candidates);
  const propertyActivities = activities.filter(a =>
    a.entityId === property.id || candidates.some(c => c.id === a.entityId)
  );
  const blockers = [
    ...(property.status === 'waiting_on_client' ? ['En attente de décision client'] : []),
    ...(property.status === 'low_demand' ? ['Faible demande — revoir la stratégie'] : []),
    ...propertyTasks.filter(t => !t.completed && t.daysOverdue >= 5).map(t => `Tâche en retard: ${t.title}`),
  ];
  const demandPercent = Math.min(100, (property.demandVolume / 25) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/properties"
          className="mb-3 inline-flex items-center gap-1.5 text-[12px] text-slate-400 hover:text-slate-600"
        >
          <ArrowLeft className="h-3 w-3" />
          Toutes les propriétés
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Fiche propriété</p>
            <h1 className="mt-1 text-[1.35rem] font-semibold tracking-[-0.03em] text-slate-900">{property.address}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <StatusBadge type="property" status={property.status} />
              <span className="text-[13px] text-slate-500">{property.city} · {property.unitType} · {formatCurrency(property.rent)}/mois</span>
              {client && (
                <Link href={`/clients/${client.id}`} className="text-[13px] font-medium text-slate-600 underline-offset-4 hover:underline">
                  {client.name}
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end gap-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Demande</p>
              <p className="text-[1.15rem] font-semibold tracking-[-0.03em] text-slate-900">{property.demandVolume}</p>
              <p className="text-[11px] text-slate-400">{property.daysOnMarket}j sur le marché</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blockers */}
      {blockers.length > 0 && (
        <div className="flex items-start gap-3 rounded-[18px] border border-rose-100 bg-rose-50/60 px-5 py-4">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
          <div className="space-y-1">
            {blockers.map((b, i) => (
              <p key={i} className="text-[13px] font-medium text-rose-800">{b}</p>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-[280px_1fr_300px]">
        {/* LEFT: Property info */}
        <div className="space-y-4">
          <CrmPanel>
            <CrmPanelHeader className="space-y-1">
              <CrmPanelEyebrow>Informations</CrmPanelEyebrow>
              <CrmPanelTitle>Détails de l&apos;unité</CrmPanelTitle>
            </CrmPanelHeader>
            <CrmPanelBody className="pt-0">
              <div className="grid gap-px overflow-hidden rounded-[14px] border border-slate-200 bg-slate-200">
                {[
                  { label: 'Loyer', value: `${formatCurrency(property.rent)}/mois` },
                  { label: 'Disponible', value: formatDate(property.availabilityDate) },
                  { label: 'Chambres', value: String(property.bedrooms) },
                  { label: 'Animaux', value: property.pets ? 'Acceptés' : 'Non' },
                  { label: 'Stationnement', value: property.parking ? `${property.parking} place(s)` : 'Non' },
                  { label: 'Électros', value: property.appliances ? 'Inclus' : 'Non' },
                ].map(row => (
                  <div key={row.label} className="grid grid-cols-[100px_1fr] bg-white">
                    <div className="border-r border-slate-200 px-3 py-2.5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{row.label}</p>
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="text-[13px] font-medium text-slate-900">{row.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              {property.inclusions.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Inclusions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {property.inclusions.map(inc => (
                      <span key={inc} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] text-slate-600">{inc}</span>
                    ))}
                  </div>
                </div>
              )}
            </CrmPanelBody>
          </CrmPanel>

          {/* Demand bar */}
          <CrmPanel>
            <CrmPanelHeader className="space-y-1">
              <CrmPanelEyebrow>Demande</CrmPanelEyebrow>
              <CrmPanelTitle>{property.demandVolume} candidatures</CrmPanelTitle>
            </CrmPanelHeader>
            <CrmPanelBody className="pt-0">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${demandPercent}%` }} />
              </div>
              <div className="mt-2 flex items-center justify-between text-[12px] text-slate-500">
                <span>{property.qualifiedCount} qualifiés</span>
                <span>{property.daysOnMarket}j sur le marché</span>
              </div>
            </CrmPanelBody>
          </CrmPanel>

          {/* Client */}
          {client && (
            <CrmPanel>
              <CrmPanelHeader className="space-y-1">
                <CrmPanelEyebrow>Client propriétaire</CrmPanelEyebrow>
                <CrmPanelTitle>{client.name}</CrmPanelTitle>
              </CrmPanelHeader>
              <CrmPanelBody className="pt-0">
                <Link
                  href={`/clients/${client.id}`}
                  className="block rounded-[14px] border border-slate-200 bg-slate-50/60 px-4 py-3 transition-colors hover:bg-slate-100/80"
                >
                  {client.company && <p className="text-[12px] text-slate-500">{client.company}</p>}
                  <p className="text-[12px] text-slate-500">{client.phone}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-600">Voir le profil →</p>
                </Link>
              </CrmPanelBody>
            </CrmPanel>
          )}
        </div>

        {/* CENTER: Candidate pipeline */}
        <CrmPanel>
          <CrmPanelHeader className="flex items-center justify-between space-y-0">
            <div className="space-y-1">
              <CrmPanelEyebrow>Pipeline</CrmPanelEyebrow>
              <CrmPanelTitle>Candidats — {candidates.length} au total</CrmPanelTitle>
            </div>
            <button className="rounded-full border border-dashed border-slate-300 px-3 py-1 text-[12px] text-slate-400 transition-colors hover:border-slate-400 hover:text-slate-600">
              + Ajouter
            </button>
          </CrmPanelHeader>
          <CrmPanelBody className="pt-0">
            {candidates.length === 0 ? (
              <p className="py-10 text-center text-[13px] text-slate-400">Aucun candidat pour cette propriété.</p>
            ) : (
              <div className="space-y-5">
                {groupedCandidates.map(([stage, stageCandidates]) => (
                  <div key={stage}>
                    <div className="mb-2 flex items-center gap-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{stage}</p>
                      <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold text-slate-500">
                        {stageCandidates.length}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {stageCandidates.map(candidate => (
                        <Link
                          key={candidate.id}
                          href={`/candidates/${candidate.id}`}
                          className="flex items-center gap-3 rounded-[14px] border border-slate-100 px-3 py-2.5 transition-all hover:border-slate-200 hover:bg-slate-50/60"
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100">
                            <span className="text-[10px] font-semibold text-slate-500">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-semibold text-slate-900">{candidate.name}</p>
                            <p className="truncate text-[11px] text-slate-500">{candidate.employment} · {formatCurrency(candidate.income)}/an</p>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <span className="text-[12px] text-amber-500">{renderStars(candidate.qualificationLevel)}</span>
                            {candidate.daysInStage >= 4 && (
                              <span className={cn('text-[11px] font-medium', getDaysColor(candidate.daysInStage))}>
                                {candidate.daysInStage}j
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CrmPanelBody>
        </CrmPanel>

        {/* RIGHT: Tasks, notes, activity */}
        <div className="space-y-4">
          {/* Next steps */}
          {property.nextSteps && (
            <CrmPanel>
              <CrmPanelHeader className="space-y-1">
                <CrmPanelEyebrow>Prochaine étape</CrmPanelEyebrow>
              </CrmPanelHeader>
              <CrmPanelBody className="pt-0">
                <p className="text-[13px] leading-5 text-slate-700">{property.nextSteps}</p>
              </CrmPanelBody>
            </CrmPanel>
          )}

          {/* Tasks */}
          <CrmPanel>
            <CrmPanelHeader className="space-y-1">
              <CrmPanelEyebrow>Tâches</CrmPanelEyebrow>
              <CrmPanelTitle>{propertyTasks.filter(t => !t.completed).length} en cours</CrmPanelTitle>
            </CrmPanelHeader>
            <CrmPanelBody className="space-y-0 pt-0">
              {propertyTasks.filter(t => !t.completed).map(task => (
                <div
                  key={task.id}
                  className={cn(
                    'flex items-center gap-2.5 border-l-2 border-t border-slate-100 py-2.5 pl-3 first:border-t-0',
                    task.daysOverdue > 0 ? 'border-l-rose-400' : 'border-l-slate-200'
                  )}
                >
                  <Circle className="h-4 w-4 shrink-0 cursor-pointer text-slate-300 hover:text-emerald-500 transition-colors" />
                  <p className="flex-1 text-[13px] text-slate-700">{task.title}</p>
                  {task.daysOverdue > 0 && (
                    <span className={cn('shrink-0 text-[11px] font-semibold', getDaysColor(task.daysOverdue))}>
                      {task.daysOverdue}j
                    </span>
                  )}
                </div>
              ))}
              <button className="mt-3 w-full rounded-[12px] border border-dashed border-slate-200 py-2 text-[12px] text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-500">
                + Ajouter une tâche
              </button>
            </CrmPanelBody>
          </CrmPanel>

          {/* Notes */}
          <CrmPanel>
            <CrmPanelHeader className="space-y-1">
              <CrmPanelEyebrow>Notes</CrmPanelEyebrow>
            </CrmPanelHeader>
            <CrmPanelBody className="pt-0">
              <div className="min-h-[60px] rounded-[14px] border border-slate-200 bg-slate-50/60 px-4 py-3">
                <p className="text-[13px] leading-5 text-slate-700 whitespace-pre-wrap">{property.notes || 'Aucune note.'}</p>
              </div>
            </CrmPanelBody>
          </CrmPanel>

          {/* Activity */}
          <CrmPanel>
            <CrmPanelHeader className="space-y-1">
              <CrmPanelEyebrow>Activité</CrmPanelEyebrow>
              <CrmPanelTitle>Récente</CrmPanelTitle>
            </CrmPanelHeader>
            <CrmPanelBody className="space-y-0 pt-0">
              {propertyActivities.slice(0, 5).map(activity => (
                <div key={activity.id} className="flex items-start gap-2.5 border-t border-slate-100 py-3 first:border-t-0">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                  <div>
                    <p className="text-[13px] text-slate-700">{activity.description}</p>
                    <p className="text-[11px] text-slate-400">{timeAgo(activity.date)}</p>
                  </div>
                </div>
              ))}
              {propertyActivities.length === 0 && (
                <p className="py-4 text-center text-[13px] text-slate-400">Aucune activité récente.</p>
              )}
            </CrmPanelBody>
          </CrmPanel>
        </div>
      </div>
    </div>
  );
}
