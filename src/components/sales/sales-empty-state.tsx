import type { ReactNode } from 'react';

interface SalesEmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function SalesEmptyState({ title, description, action }: SalesEmptyStateProps) {
  return (
    <div className="rounded-[22px] border border-dashed border-slate-300 bg-slate-50/80 p-5">
      <p className="text-sm font-semibold text-slate-950">{title}</p>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
