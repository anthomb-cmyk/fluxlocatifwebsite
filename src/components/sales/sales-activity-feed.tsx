import { cn } from '@/lib/utils';
import { formatSalesDateTime } from '@/lib/sales/format';
import type { SalesActivity } from '@/lib/sales/types';

const activityDotClass: Record<SalesActivity['type'], string> = {
  email: 'bg-sky-500',
  call: 'bg-emerald-500',
  meeting: 'bg-indigo-500',
  task: 'bg-amber-500',
  proposal: 'bg-violet-500',
  note: 'bg-slate-400',
  status_change: 'bg-slate-300',
};

const activityTypeLabel: Record<SalesActivity['type'], string> = {
  email: 'Email',
  call: 'Call',
  meeting: 'Meeting',
  task: 'Task',
  proposal: 'Proposal',
  note: 'Note',
  status_change: 'Stage change',
};

export function SalesActivityFeed({ activities }: { activities: SalesActivity[] }) {
  return (
    <div className="space-y-0">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="grid grid-cols-[20px_minmax(0,1fr)] gap-3 border-b border-slate-100 py-4 last:border-b-0"
        >
          <div className="flex flex-col items-center pt-1">
            <div className={cn('h-2 w-2 rounded-full', activityDotClass[activity.type])} />
            <div className="mt-1 flex-1 w-px bg-slate-100" />
          </div>
          <div className="pb-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {activityTypeLabel[activity.type]}
                  </span>
                </div>
                <p className="mt-1 text-[13px] font-semibold text-slate-950">{activity.title}</p>
                <p className="mt-0.5 text-[13px] leading-5 text-slate-500">{activity.description}</p>
                <p className="mt-2 text-[11px] text-slate-400">{activity.actor}</p>
              </div>
              <p className="shrink-0 text-[11px] font-medium text-slate-400">
                {formatSalesDateTime(activity.occurredAt)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
