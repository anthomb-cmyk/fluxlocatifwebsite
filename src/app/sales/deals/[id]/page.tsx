import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { SalesActivityFeed } from '@/components/sales/sales-activity-feed';
import { SalesCalendarPanel } from '@/components/sales/sales-calendar-panel';
import { SalesEmptyState } from '@/components/sales/sales-empty-state';
import { SalesNotesPanel } from '@/components/sales/sales-notes-panel';
import {
  SalesPanel,
  SalesPanelBody,
  SalesPanelDescription,
  SalesPanelEyebrow,
  SalesPanelHeader,
  SalesPanelTitle,
} from '@/components/sales/sales-panel';
import { SalesPageHeader } from '@/components/sales/sales-page-header';
import { SalesStageBadge } from '@/components/sales/sales-stage-badge';
import { Button } from '@/components/ui/button';
import { formatSalesCurrency, formatSalesDate, formatSalesPercent } from '@/lib/sales/format';
import { getSalesDealDetail } from '@/lib/sales/service';

export default async function SalesDealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = await getSalesDealDetail(id);

  if (!detail) {
    notFound();
  }

  const { deal, linkedLead, activities, tasks, notes, calendarItems, negotiationAction } = detail;

  return (
    <div className="space-y-6">
      <SalesPageHeader
        eyebrow="Deal detail"
        title={deal.dealName}
        description={deal.notes}
        stats={[
          { label: 'Value', value: formatSalesCurrency(deal.expectedMonthlyValue), hint: 'Expected monthly' },
          { label: 'Probability', value: formatSalesPercent(deal.closeProbability), hint: 'Close confidence' },
          { label: 'Close date', value: formatSalesDate(deal.estimatedCloseDate), hint: 'Planned timing' },
          { label: 'Plan', value: deal.selectedPlan, hint: 'Current package' },
        ]}
        actions={linkedLead ? (
          <Button asChild variant="outline" className="h-8 rounded-full border-slate-200 bg-white px-3 text-xs">
            <Link href={`/sales/leads/${linkedLead.id}`}>
              Open lead
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        ) : undefined}
      />

      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          {/* Commercial brief — dark panel */}
          <SalesPanel tone="dark">
            <SalesPanelHeader className="space-y-3">
              <SalesPanelEyebrow className="text-slate-500">Commercial brief</SalesPanelEyebrow>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Stage</p>
                  <div className="mt-2">
                    <SalesStageBadge stage={deal.dealStage} />
                  </div>
                  <p className="mt-2 text-[12px] text-slate-400">{deal.selectedPlan} plan</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Linked lead</p>
                  {linkedLead ? (
                    <>
                      <p className="mt-2 text-[13px] font-semibold text-white">{linkedLead.companyName}</p>
                      <p className="mt-0.5 text-[12px] text-slate-400">{linkedLead.contactPerson}</p>
                    </>
                  ) : (
                    <p className="mt-2 text-[12px] text-slate-400">No linked lead.</p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Revenue</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                    {formatSalesCurrency(deal.expectedMonthlyValue)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Probability</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                    {formatSalesPercent(deal.closeProbability)}
                  </p>
                  <p className="mt-0.5 text-[12px] text-slate-400">Close {formatSalesDate(deal.estimatedCloseDate)}</p>
                </div>
              </div>
            </SalesPanelHeader>
          </SalesPanel>

          {/* Objections */}
          <SalesPanel>
            <SalesPanelHeader className="space-y-1">
              <SalesPanelEyebrow>Objections</SalesPanelEyebrow>
              <SalesPanelTitle>Commercial resistance to address</SalesPanelTitle>
              <SalesPanelDescription>These are the reasons this deal could stall unless the next touch handles them directly.</SalesPanelDescription>
            </SalesPanelHeader>
            <SalesPanelBody className="space-y-2 pt-0">
              {deal.objections.map((objection) => (
                <div
                  key={objection}
                  className="rounded-[16px] border border-slate-200 bg-slate-50/60 px-4 py-3 text-[13px] leading-5 text-slate-700"
                >
                  {objection}
                </div>
              ))}
            </SalesPanelBody>
          </SalesPanel>

          <SalesNotesPanel notes={notes} />
        </div>

        <div className="space-y-5">
          {/* Open actions */}
          <SalesPanel>
            <SalesPanelHeader className="space-y-1">
              <SalesPanelEyebrow>Open actions</SalesPanelEyebrow>
              <SalesPanelTitle>Next execution items</SalesPanelTitle>
            </SalesPanelHeader>
            <SalesPanelBody className="space-y-3 pt-0">
              {tasks.length ? tasks.map((task) => (
                <div key={task.id} className="rounded-[16px] border border-slate-200 bg-slate-50/60 px-4 py-3">
                  <p className="text-[13px] font-semibold text-slate-950">{task.title}</p>
                  <p className="mt-0.5 text-[12px] leading-5 text-slate-500">{task.description}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">Due {formatSalesDate(task.dueAt)}</p>
                </div>
              )) : (
                <SalesEmptyState
                  title="No open actions"
                  description="No tasks linked to this deal yet."
                />
              )}
            </SalesPanelBody>
          </SalesPanel>

          <SalesCalendarPanel events={calendarItems} actionLink={negotiationAction} />

          <SalesPanel>
            <SalesPanelHeader className="space-y-1">
              <SalesPanelEyebrow>Activity</SalesPanelEyebrow>
              <SalesPanelTitle>Deal timeline</SalesPanelTitle>
            </SalesPanelHeader>
            <SalesPanelBody>
              <SalesActivityFeed activities={activities} />
            </SalesPanelBody>
          </SalesPanel>
        </div>
      </section>
    </div>
  );
}
