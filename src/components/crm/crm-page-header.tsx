import type { ReactNode } from 'react';

interface CrmStat {
  label: string;
  value: string;
  hint?: string;
}

interface CrmPageHeaderProps {
  eyebrow: string;
  title: string;
  stats?: CrmStat[];
  actions?: ReactNode;
}

export function CrmPageHeader({ eyebrow, title, stats, actions }: CrmPageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">{eyebrow}</p>
        <h1 className="mt-1 text-[1.35rem] font-semibold tracking-[-0.03em] text-slate-900">{title}</h1>
        {stats && stats.length > 0 && (
          <div className="mt-3 flex flex-wrap items-stretch gap-0 divide-x divide-slate-200">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5 px-4 first:pl-0 last:pr-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                <p className="text-base font-semibold tracking-[-0.03em] text-slate-900">{stat.value}</p>
                {stat.hint ? <p className="text-[11px] text-slate-400">{stat.hint}</p> : null}
              </div>
            ))}
          </div>
        )}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}
