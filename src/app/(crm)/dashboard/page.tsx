'use client';

import Link from 'next/link';
import { AlertTriangle, TrendingDown } from 'lucide-react';
import { properties, candidates, tasks, activities } from '@/lib/crm/data';
import { timeAgo, getDaysColor } from '@/lib/crm/utils';
import { CrmPageHeader } from '@/components/crm/crm-page-header';
import {
  CrmPanel,
  CrmPanelBody,
  CrmPanelEyebrow,
  CrmPanelHeader,
  CrmPanelTitle,
} from '@/components/crm/crm-panel';
import { cn } from '@/lib/utils';

const activeUnits = properties.filter(p => !['rented', 'closed', 'to_launch'].includes(p.status)).length;
const newCandidates = candidates.filter(c => c.status === 'new' || c.status === 'to_qualify').length;
const dossiersToReview = candidates.filter(c => c.status === 'to_present' || c.pipelineStage === 'to_review').length;
const waitingOnClient = properties.filter(p => p.status === 'waiting_on_client').length;
const visitsToSchedule = candidates.filter(c => c.status === 'visit_to_schedule' || c.status === 'prequalified').length;
const lowDemandUnits = properties.filter(p => p.status === 'low_demand').length;
const overdueTasks = tasks.filter(t => !t.completed && t.daysOverdue > 0);
const todayTasks = tasks.filter(t => !t.completed && t.dueDate === '2026-04-14');

interface AttentionItem {
  id: string;
  severity: 'red' | 'amber' | 'green';
  title: string;
  description: string;
  href: string;
}

const attentionItems: AttentionItem[] = [
  ...properties.filter(p => p.status === 'waiting_on_client').map(p => ({
    id: `wc-${p.id}`,
    severity: 'red' as const,
    title: p.address,
    description: `Bloqué — en attente de décision client`,
    href: `/properties/${p.id}`,
  })),
  ...properties.filter(p => p.status === 'low_demand').map(p => ({
    id: `ld-${p.id}`,
    severity: 'amber' as const,
    title: p.address,
    description: `Faible demande — ${p.demandVolume} candidats · ${p.daysOnMarket}j sur le marché`,
    href: `/properties/${p.id}`,
  })),
  ...overdueTasks.filter(t => t.priority === 'urgent').map(t => ({
    id: `tk-${t.id}`,
    severity: 'red' as const,
    title: t.title,
    description: `Tâche urgente en retard de ${t.daysOverdue}j`,
    href: '/tasks',
  })),
  ...candidates.filter(c => c.pipelineStage === 'to_review').slice(0, 2).map(c => {
    const prop = properties.find(p => p.id === c.targetPropertyId);
    return {
      id: `pr-${c.id}`,
      severity: 'green' as const,
      title: c.name,
      description: `Dossier ${c.qualificationLevel === 3 ? 'excellent' : 'prêt'} — à présenter · ${prop?.address || ''}`,
      href: `/candidates/${c.id}`,
    };
  }),
];

const severityDot: Record<string, string> = {
  red: 'bg-rose-500',
  amber: 'bg-amber-400',
  green: 'bg-emerald-500',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <CrmPageHeader
        eyebrow="13 avril 2026"
        title="Tableau de bord"
        stats={[
          { label: 'Unités actives', value: String(activeUnits), hint: 'En cours' },
          { label: 'Nouveaux candidats', value: String(newCandidates), hint: 'À qualifier' },
          { label: 'Dossiers à réviser', value: String(dossiersToReview), hint: 'Pipeline' },
          { label: 'Attente client', value: String(waitingOnClient), hint: 'Bloqués' },
          { label: 'Visites à planifier', value: String(visitsToSchedule), hint: 'Action requise' },
        ]}
      />

      {/* Requires attention */}
      {attentionItems.length > 0 && (
        <CrmPanel>
          <CrmPanelHeader className="flex items-center gap-2 pb-3">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <div className="flex-1 space-y-0.5">
              <CrmPanelEyebrow>Requiert attention</CrmPanelEyebrow>
              <CrmPanelTitle>Actions prioritaires maintenant</CrmPanelTitle>
            </div>
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600">
              {attentionItems.length}
            </span>
          </CrmPanelHeader>
          <CrmPanelBody className="space-y-0 pt-0">
            {attentionItems.map(item => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-start gap-3 border-t border-slate-100 py-3 first:border-t-0 hover:bg-slate-50/50 -mx-6 px-6 transition-colors"
              >
                <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', severityDot[item.severity])} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-0.5 text-[12px] text-slate-500">{item.description}</p>
                </div>
              </Link>
            ))}
          </CrmPanelBody>
        </CrmPanel>
      )}

      {/* Low demand alert */}
      {lowDemandUnits > 0 && (
        <div className="flex items-center gap-3 rounded-[18px] border border-amber-100 bg-amber-50/60 px-5 py-4">
          <TrendingDown className="h-4 w-4 shrink-0 text-amber-500" />
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-amber-800">
              {lowDemandUnits} unité{lowDemandUnits > 1 ? 's' : ''} avec faible demande
            </p>
            <p className="text-[12px] text-amber-600">
              Considérer un ajustement de prix ou de stratégie.
            </p>
          </div>
          <Link href="/properties" className="text-[12px] font-semibold text-amber-700 underline-offset-4 hover:underline">
            Voir les propriétés
          </Link>
        </div>
      )}

      {/* Two columns */}
      <div className="grid gap-5 xl:grid-cols-2">
        {/* Today's tasks */}
        <CrmPanel>
          <CrmPanelHeader className="flex items-center justify-between space-y-0">
            <div className="space-y-1">
              <CrmPanelEyebrow>Tâches</CrmPanelEyebrow>
              <CrmPanelTitle>À faire aujourd&apos;hui</CrmPanelTitle>
            </div>
            <Link href="/tasks" className="text-[12px] font-semibold text-slate-500 underline-offset-4 hover:underline">
              Voir tout
            </Link>
          </CrmPanelHeader>
          <CrmPanelBody className="space-y-0 pt-0">
            {[...overdueTasks.slice(0, 3), ...todayTasks.slice(0, 3)].length ? (
              [...overdueTasks.slice(0, 3), ...todayTasks.slice(0, 3)].map(task => (
                <div
                  key={task.id}
                  className={cn(
                    'flex items-center gap-3 border-l-2 border-t border-slate-100 py-3 pl-4 first:border-t-0',
                    task.daysOverdue > 0 ? 'border-l-rose-400' : 'border-l-emerald-400'
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] text-slate-800">{task.title}</p>
                  </div>
                  <span className={cn(
                    'shrink-0 text-[11px] font-semibold',
                    task.daysOverdue > 0 ? 'text-rose-500' : 'text-emerald-600'
                  )}>
                    {task.daysOverdue > 0 ? `${task.daysOverdue}j retard` : "Aujourd'hui"}
                  </span>
                </div>
              ))
            ) : (
              <p className="py-6 text-center text-[13px] text-slate-400">Aucune tâche pour aujourd&apos;hui.</p>
            )}
          </CrmPanelBody>
        </CrmPanel>

        {/* Recent activity */}
        <CrmPanel>
          <CrmPanelHeader className="space-y-1">
            <CrmPanelEyebrow>Journal</CrmPanelEyebrow>
            <CrmPanelTitle>Activité récente</CrmPanelTitle>
          </CrmPanelHeader>
          <CrmPanelBody className="space-y-0 pt-0">
            {activities.slice(0, 6).map(activity => (
              <div key={activity.id} className="flex items-start gap-3 border-t border-slate-100 py-3 first:border-t-0">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] text-slate-700">{activity.description}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{timeAgo(activity.date)}</p>
                </div>
              </div>
            ))}
          </CrmPanelBody>
        </CrmPanel>
      </div>
    </div>
  );
}
