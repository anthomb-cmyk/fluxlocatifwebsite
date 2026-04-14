interface SalesMetricCardProps {
  label: string;
  value: string;
  helper: string;
}

export function SalesMetricCard({ label, value, helper }: SalesMetricCardProps) {
  return (
    <div className="rounded-[20px] border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">{label}</p>
      <p className="mt-1.5 text-2xl font-semibold tracking-[-0.05em] text-slate-950">{value}</p>
      <p className="mt-1 text-[12px] leading-5 text-slate-500">{helper}</p>
    </div>
  );
}
