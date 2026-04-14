import Link from 'next/link';
import {
  SalesPanel,
  SalesPanelBody,
} from '@/components/crm/sales-panel';
import { SalesPageHeader } from '@/components/crm/sales-page-header';
import { SalesFitBadge, SalesStageBadge } from '@/components/crm/sales-stage-badge';
import { formatSalesDate } from '@/lib/sales/format';
import { getSalesPipelineBoard } from '@/lib/sales/service';
import { salesPipelineStages, salesStageLabels } from '@/lib/sales/mock-data';
import type { SalesPipelineStage } from '@/lib/sales/types';
import { cn } from '@/lib/utils';

const STAGE_ACCENT: Partial<Record<SalesPipelineStage, string>> = {
  negotiation: 'border-l-violet-400',
  proposal_sent: 'border-l-indigo-400',
  demo_completed: 'border-l-blue-400',
  demo_scheduled: 'border-l-blue-300',
  qualified: 'border-l-sky-400',
  discovery_completed: 'border-l-amber-300',
  discovery_scheduled: 'border-l-amber-200',
  won: 'border-l-emerald-400',
  nurture: 'border-l-slate-200',
  lost: 'border-l-slate-200',
};

const STAGE_BADGE: Partial<Record<SalesPipelineStage, string>> = {
  negotiation: 'bg-violet-50 text-violet-700',
  proposal_sent: 'bg-indigo-50 text-indigo-700',
  qualified: 'bg-sky-50 text-sky-700',
  won: 'bg-emerald-50 text-emerald-700',
  lost: 'bg-slate-100 text-slate-500',
};

export default async function SalesPipelinePage() {
  const columns = await getSalesPipelineBoard();

  const qualified = columns.find(c => c.id === 'qualified')?.items.length ?? 0;
  const proposals = columns.find(c => c.id === 'proposal_sent')?.items.length ?? 0;
  const negotiation = columns.find(c => c.id === 'negotiation')?.items.length ?? 0;
  const won = columns.find(c => c.id === 'won')?.items.length ?? 0;

  // Only show stages that have leads, in pipeline order
  const activeGroups = salesPipelineStages
    .map(stage => ({
      stage,
      label: salesStageLabels[stage],
      items: columns.find(c => c.id === stage)?.items ?? [],
    }))
    .filter(g => g.items.length > 0);

  return (
    <div className="space-y-6">
      <SalesPageHeader
        eyebrow="Pipeline"
        title="Stage coverage"
        stats={[
          { label: 'Qualified', value: String(qualified), hint: 'Ready for selling' },
          { label: 'Proposal sent', value: String(proposals), hint: 'Pricing under review' },
          { label: 'Negotiation', value: String(negotiation), hint: 'Final stage' },
          { label: 'Won', value: String(won), hint: 'Closed' },
        ]}
        actions={(
          <Link
            href="/crm/leads"
            className="h-8 inline-flex items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            List view
          </Link>
        )}
      />

      {activeGroups.length === 0 ? (
        <SalesPanel>
          <SalesPanelBody className="py-14 text-center">
            <p className="text-[13px] text-slate-400">No active leads in the pipeline.</p>
          </SalesPanelBody>
        </SalesPanel>
      ) : (
        <div className="space-y-4">
          {activeGroups.map(({ stage, label, items }) => (
            <SalesPanel key={stage}>
              {/* Stage header */}
              <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">{label}</p>
                <span className={cn(
                  'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                  STAGE_BADGE[stage] ?? 'bg-slate-100 text-slate-500'
                )}>
                  {items.length}
                </span>
              </div>

              {/* Lead rows */}
              <SalesPanelBody className="space-y-0 pt-0">
                {items.map(lead => (
                  <Link
                    key={lead.id}
                    href={lead.linkedDealId ? `/crm/deals/${lead.linkedDealId}` : `/crm/leads/${lead.id}`}
                    className={cn(
                      'flex items-center gap-4 border-l-2 border-t border-slate-100 py-3 pl-4 first:border-t-0 transition-colors hover:bg-slate-50/60',
                      STAGE_ACCENT[stage] ?? 'border-l-slate-200'
                    )}
                  >
                    {/* Company + contact */}
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-slate-950">{lead.companyName}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {lead.contactPerson} · {lead.unitCount} units
                      </p>
                    </div>

                    {/* Fit */}
                    <SalesFitBadge fit={lead.estimatedFit} />

                    {/* Next touch */}
                    <p className="shrink-0 text-[12px] text-slate-400">
                      Touch {formatSalesDate(lead.nextFollowUpDate)}
                    </p>

                    {/* Stage badge */}
                    <SalesStageBadge stage={lead.status} />
                  </Link>
                ))}
              </SalesPanelBody>
            </SalesPanel>
          ))}
        </div>
      )}
    </div>
  );
}
