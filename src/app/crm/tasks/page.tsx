import Link from 'next/link';
import { SalesMarkTaskDoneButton } from '@/components/crm/sales-mark-task-done-button';
import { SalesNewTaskDialog } from '@/components/crm/sales-new-task-dialog';
import {
  SalesPanel,
  SalesPanelBody,
} from '@/components/crm/sales-panel';
import { SalesPageHeader } from '@/components/crm/sales-page-header';
import { SalesPriorityBadge } from '@/components/crm/sales-stage-badge';
import { cn } from '@/lib/utils';
import { formatSalesDateTime, isDueToday, getDaysUntil } from '@/lib/sales/format';
import { getSalesTasksView } from '@/lib/sales/service';

const CATEGORY_ACCENT: Record<string, { dot: string; badge: string }> = {
  follow_up:    { dot: 'bg-sky-500',     badge: 'bg-sky-50 text-sky-700' },
  meeting_prep: { dot: 'bg-violet-500',  badge: 'bg-violet-50 text-violet-700' },
  onboarding:   { dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700' },
  admin:        { dot: 'bg-slate-400',   badge: 'bg-slate-100 text-slate-500' },
};

function getRowAccent(dueAt: string) {
  if (getDaysUntil(dueAt) < 0) return 'border-l-rose-400';
  if (isDueToday(dueAt)) return 'border-l-amber-400';
  return 'border-l-slate-200';
}

export default async function SalesTasksPage() {
  const view = await getSalesTasksView();
  const urgentCount = view.open.filter((t) => t.priority === 'urgent').length;

  // Admin tasks are collapsed by default — separate them out so we can render
  // them in a minimized section at the bottom without cluttering the main view.
  const actionGroups = view.byCategory.filter((g) => g.category !== 'admin');
  const adminGroup = view.byCategory.find((g) => g.category === 'admin');

  return (
    <div className="space-y-6">
      <SalesPageHeader
        eyebrow="Follow-ups"
        title="Execution queue"
        stats={[
          { label: 'Open work', value: String(view.open.length), hint: 'All active tasks' },
          { label: 'Due today', value: String(view.dueToday.length), hint: 'Needs action now' },
          { label: 'Overdue', value: String(view.overdue.length), hint: 'Slipping follow-ups' },
          { label: 'Urgent', value: String(urgentCount), hint: 'Highest-pressure items' },
        ]}
        actions={<SalesNewTaskDialog />}
      />

      {/* Overdue alert banner */}
      {view.overdue.length > 0 && (
        <div className="flex items-center gap-3 rounded-[18px] border border-rose-200/70 bg-rose-50/60 px-5 py-3">
          <span className="h-2 w-2 shrink-0 rounded-full bg-rose-500" />
          <p className="text-[13px] font-medium text-rose-700">
            {view.overdue.length} overdue {view.overdue.length === 1 ? 'task needs' : 'tasks need'} immediate attention
          </p>
        </div>
      )}

      {/* Category groups — action tasks */}
      {actionGroups.length === 0 ? (
        <SalesPanel>
          <SalesPanelBody className="py-14 text-center">
            <p className="text-[13px] text-slate-400">No open action tasks. Nice work.</p>
          </SalesPanelBody>
        </SalesPanel>
      ) : (
        <div className="space-y-4">
          {actionGroups.map(({ category, label, tasks }) => {
            const accent = CATEGORY_ACCENT[category] ?? CATEGORY_ACCENT.follow_up;
            return (
              <SalesPanel key={category}>
                {/* Category header */}
                <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
                  <span className={cn('h-2 w-2 shrink-0 rounded-full', accent.dot)} />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">{label}</p>
                  <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-semibold', accent.badge)}>
                    {tasks.length}
                  </span>
                </div>

                {/* Task rows */}
                <SalesPanelBody className="space-y-0 pt-0">
                  {tasks.map((task) => {
                    const isOverdue = getDaysUntil(task.dueAt) < 0;
                    const isTodayDue = isDueToday(task.dueAt);
                    const rowAccent = getRowAccent(task.dueAt);

                    return (
                      <div
                        key={task.id}
                        className={cn(
                          'flex gap-4 border-l-2 border-t border-slate-100 py-3.5 pl-4 first:border-t-0',
                          rowAccent
                        )}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <p className="text-[13px] font-semibold text-slate-950">{task.title}</p>
                            <SalesPriorityBadge priority={task.priority} />
                            {isOverdue && (
                              <span className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-700">
                                Overdue
                              </span>
                            )}
                            {!isOverdue && isTodayDue && (
                              <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-700">
                                Today
                              </span>
                            )}
                          </div>
                          {task.description ? (
                            <p className="mt-1 text-[12px] leading-5 text-slate-500">{task.description}</p>
                          ) : null}
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px] text-slate-400">
                            <span>{formatSalesDateTime(task.dueAt)}</span>
                            {task.lead ? (
                              <Link
                                href={`/crm/leads/${task.lead.id}`}
                                className="font-medium text-slate-600 underline-offset-4 hover:underline"
                              >
                                {task.lead.companyName}
                              </Link>
                            ) : null}
                            {task.customer ? (
                              <Link
                                href={`/crm/customers/${task.customer.id}`}
                                className="font-medium text-slate-600 underline-offset-4 hover:underline"
                              >
                                {task.customer.companyName}
                              </Link>
                            ) : null}
                          </div>
                        </div>
                        <div className="flex shrink-0 items-start gap-2 pt-0.5">
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                            {task.assignedTo}
                          </span>
                          <SalesMarkTaskDoneButton taskId={task.id} />
                        </div>
                      </div>
                    );
                  })}
                </SalesPanelBody>
              </SalesPanel>
            );
          })}
        </div>
      )}

      {/* Admin tasks — collapsed/minimized section */}
      {adminGroup && adminGroup.tasks.length > 0 && (
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-[18px] border border-slate-200 bg-white px-5 py-3 text-[12px] font-medium text-slate-500 hover:bg-slate-50/60 transition-colors">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Admin / CRM Updates
            <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
              {adminGroup.tasks.length}
            </span>
            <span className="ml-auto text-[11px] text-slate-400 group-open:hidden">Show</span>
            <span className="ml-auto hidden text-[11px] text-slate-400 group-open:inline">Hide</span>
          </summary>
          <div className="mt-2">
            <SalesPanel>
              <SalesPanelBody className="space-y-0 pt-0">
                {adminGroup.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex gap-4 border-l-2 border-l-slate-200 border-t border-slate-100 py-3 pl-4 first:border-t-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] text-slate-700">{task.title}</p>
                      <p className="mt-0.5 text-[12px] text-slate-400">{formatSalesDateTime(task.dueAt)}</p>
                    </div>
                    <SalesMarkTaskDoneButton taskId={task.id} />
                  </div>
                ))}
              </SalesPanelBody>
            </SalesPanel>
          </div>
        </details>
      )}
    </div>
  );
}
