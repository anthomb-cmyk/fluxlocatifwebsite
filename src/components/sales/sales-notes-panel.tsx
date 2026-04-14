import { SalesEmptyState } from '@/components/sales/sales-empty-state';
import {
  SalesPanel,
  SalesPanelBody,
  SalesPanelEyebrow,
  SalesPanelHeader,
  SalesPanelTitle,
} from '@/components/sales/sales-panel';
import { getSalesNotesStatus } from '@/lib/sales/notes/service';
import { formatSalesDate } from '@/lib/sales/format';
import type { SalesNote } from '@/lib/sales/types';

// Notes provider abstraction — keep status message and provider badge intact for future wiring
export async function SalesNotesPanel({ notes }: { notes: SalesNote[] }) {
  const status = await getSalesNotesStatus();

  return (
    <SalesPanel>
      <SalesPanelHeader className="flex flex-row items-center justify-between gap-3 pb-3">
        <div className="space-y-1">
          <SalesPanelEyebrow>Notes</SalesPanelEyebrow>
          <SalesPanelTitle>Call notes and objections</SalesPanelTitle>
        </div>
        <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          {status.providerName}
        </span>
      </SalesPanelHeader>

      {/* Provider status message — abstraction layer, do not remove */}
      <div className="mx-6 mb-3 rounded-[14px] border border-slate-200/80 bg-slate-50/60 px-3 py-2">
        <p className="text-[11px] text-slate-400">{status.message}</p>
      </div>

      <SalesPanelBody className="space-y-2 pt-0">
        {notes.length ? (
          notes.map((note) => (
            <div key={note.id} className="rounded-[16px] border border-slate-200 bg-slate-50/60 px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {note.category.replace('_', ' ')}
                  </p>
                  <p className="mt-1 text-[13px] font-semibold text-slate-950">{note.title}</p>
                  <p className="mt-0.5 text-[12px] leading-5 text-slate-500">{note.content}</p>
                </div>
                <p className="shrink-0 text-[11px] text-slate-400">{formatSalesDate(note.createdAt)}</p>
              </div>
              <p className="mt-2 text-[11px] text-slate-400">{note.author}</p>
            </div>
          ))
        ) : (
          <SalesEmptyState
            title="No notes yet"
            description="Notes provider is wired and ready. Add real API credentials to activate."
          />
        )}
      </SalesPanelBody>
    </SalesPanel>
  );
}
