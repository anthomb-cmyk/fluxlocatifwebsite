'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, Plus } from 'lucide-react';
import { tasks, getProperty } from '@/lib/crm/data';
import { CrmPageHeader } from '@/components/crm/crm-page-header';
import { CrmPanel, CrmPanelBody, CrmPanelEyebrow, CrmPanelHeader, CrmPanelTitle } from '@/components/crm/crm-panel';
import { cn } from '@/lib/utils';

type TabFilter = 'today' | 'overdue' | 'week';

export default function TasksPage() {
  const [tab, setTab] = useState<TabFilter>('today');
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    new Set(tasks.filter(t => t.completed).map(t => t.id))
  );

  const toggleComplete = (id: string) => {
    setCompletedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const activeTasks = tasks.filter(t => !completedIds.has(t.id));
  const overdue = activeTasks.filter(t => t.daysOverdue > 0);
  const today = activeTasks.filter(t => t.dueDate === '2026-04-14');
  const urgent = activeTasks.filter(t => t.priority === 'urgent').length;

  const filteredTasks = activeTasks.filter(t => {
    if (tab === 'overdue') return t.daysOverdue > 0;
    if (tab === 'today') return t.dueDate === '2026-04-14';
    return true;
  });

  // Group by property
  const grouped: Record<string, typeof filteredTasks> = {};
  for (const task of filteredTasks) {
    const key = task.propertyId || 'general';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(task);
  }

  const tabs = [
    { key: 'today' as const, label: "Aujourd'hui", count: today.length },
    { key: 'overdue' as const, label: 'En retard', count: overdue.length, alert: true },
    { key: 'week' as const, label: 'Cette semaine', count: activeTasks.length },
  ];

  return (
    <div className="space-y-6">
      <CrmPageHeader
        eyebrow="Suivi"
        title="Tâches"
        stats={[
          { label: 'En cours', value: String(activeTasks.length), hint: 'Total actif' },
          { label: "Aujourd'hui", value: String(today.length), hint: 'À compléter' },
          { label: 'En retard', value: String(overdue.length), hint: 'Prioritaires' },
          { label: 'Urgentes', value: String(urgent), hint: 'Haute priorité' },
        ]}
        actions={(
          <button className="flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-[13px] font-medium text-white hover:bg-slate-700 transition-colors">
            <Plus className="h-3.5 w-3.5" />
            Nouvelle tâche
          </button>
        )}
      />

      {/* Tab switcher */}
      <div className="flex items-center gap-1 w-fit rounded-xl bg-slate-100/80 p-1">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              'flex items-center gap-1.5 rounded-[10px] px-4 py-1.5 text-[13px] font-medium transition-colors',
              tab === t.key
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            )}
          >
            {t.label}
            {t.count > 0 && (
              <span className={cn(
                'rounded-full px-1.5 py-0.5 text-[11px] font-semibold',
                tab === t.key
                  ? t.alert ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'
                  : t.alert ? 'bg-rose-100 text-rose-600' : 'bg-slate-200 text-slate-500'
              )}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Task groups */}
      <div className="space-y-4">
        {Object.entries(grouped).map(([propertyId, groupTasks]) => {
          const property = propertyId !== 'general' ? getProperty(propertyId) : null;
          return (
            <CrmPanel key={propertyId}>
              <CrmPanelHeader className="space-y-0.5 pb-3">
                <CrmPanelEyebrow>{property ? 'Propriété' : 'Général'}</CrmPanelEyebrow>
                <CrmPanelTitle>{property ? property.address : 'Tâches générales'}</CrmPanelTitle>
              </CrmPanelHeader>
              <CrmPanelBody className="space-y-0 pt-0">
                {groupTasks.sort((a, b) => b.daysOverdue - a.daysOverdue).map(task => (
                  <div
                    key={task.id}
                    className={cn(
                      'flex items-center gap-3 border-l-2 border-t border-slate-100 py-3 pl-4 first:border-t-0 hover:bg-slate-50/60 transition-colors',
                      task.daysOverdue > 0 ? 'border-l-rose-400' :
                      task.dueDate === '2026-04-14' ? 'border-l-emerald-400' :
                      'border-l-slate-200'
                    )}
                  >
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className="shrink-0 text-slate-300 hover:text-emerald-500 transition-colors"
                    >
                      <Circle className="h-[18px] w-[18px]" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] text-slate-800">{task.title}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {task.priority === 'urgent' && (
                        <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-600">Urgent</span>
                      )}
                      {task.priority === 'high' && (
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600">Haute</span>
                      )}
                      <span className={cn(
                        'text-[12px] font-medium',
                        task.daysOverdue > 0 ? 'text-rose-500' : 'text-slate-400'
                      )}>
                        {task.daysOverdue > 0 ? `${task.daysOverdue}j retard` : task.dueDate === '2026-04-14' ? "Aujourd'hui" : task.dueDate.slice(5)}
                      </span>
                    </div>
                  </div>
                ))}
              </CrmPanelBody>
            </CrmPanel>
          );
        })}
        {filteredTasks.length === 0 && (
          <CrmPanel>
            <CrmPanelBody className="flex flex-col items-center py-14">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              <p className="mt-3 text-[13px] text-slate-400">Aucune tâche dans cette vue.</p>
            </CrmPanelBody>
          </CrmPanel>
        )}
      </div>
    </div>
  );
}
