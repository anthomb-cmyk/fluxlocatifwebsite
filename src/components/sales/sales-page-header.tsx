import type { ReactNode } from 'react';

interface SalesPageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  stats?: Array<{
    label: string;
    value: string;
    hint?: string;
  }>;
}

export function SalesPageHeader({
  eyebrow,
  title,
  description,
  actions,
  stats,
}: SalesPageHeaderProps) {
  return (
    <div className="border-b border-slate-200/80 pb-5">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 space-y-1">
          {eyebrow ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-[1.35rem] font-semibold leading-snug tracking-[-0.03em] text-slate-950">
            {title}
          </h2>
          {description ? <p className="text-[13px] leading-5 text-slate-500">{description}</p> : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
        ) : null}
      </div>

      {stats?.length ? (
        <div className="mt-4 flex flex-wrap items-stretch gap-0 divide-x divide-slate-200/80">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5 px-5 first:pl-0 last:pr-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </p>
              <p className="text-lg font-semibold tracking-[-0.04em] text-slate-950">{stat.value}</p>
              {stat.hint ? (
                <p className="text-[11px] text-slate-400">{stat.hint}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
