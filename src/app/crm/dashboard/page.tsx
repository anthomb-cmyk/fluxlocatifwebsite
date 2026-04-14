import Link from 'next/link';
import { ArrowRight, CalendarDays, MoveRight } from 'lucide-react';
import { SalesActivityFeed } from '@/components/sales/sales-activity-feed';
import { SalesCalendarPanel } from '@/components/sales/sales-calendar-panel';
import { SalesEmptyState } from '@/components/sales/sales-empty-state';
import {
  SalesPanel,
  SalesPanelBody,
  SalesPanelEyebrow,
  SalesPanelHeader,
  SalesPanelTitle,
} from '@/components/sales/sales-panel';
import { SalesPageHeader } from '@/components/sales/sales-page-header';
import { SalesFitBadge, SalesStageBadge } from '@/components/sales/sales-stage-badge';
import { Button } from '@/components/ui/button';
import { formatSalesCurrency, formatSalesDate, getStageLabel } from '@/lib/sales/format';
import { getSalesDashboardView } from '@/lib/sales/service';

export default async function SalesDashboardPage() {
  const view = await getSalesDashboardView();
  const metricById = Object.fromEntries(view.metrics.map((metric) => [metric.id, metric]));

  return (
    <div className="space-y-6">
      <SalesPageHeader
        eyebrow="Founder dashboard"
        title="Sales command"
        stats={[
          {
            label: 'Pipeline value',
            value: metricById.pipeline?.value ?? '—',
            hint: 'Open monthly value',
          },
          {
            label: 'Reply rate',
            value: metricById['reply-rate']?.value ?? '—',
            hint: 'Lead responsiveness',
          },
          {
            label: 'Tasks due today',
            value: metricById.today?.value ?? '—',
            hint: 'Immediate follow-ups',
          },
          {
            label: 'Close rate',
            value: metricById['close-rate']?.value ?? '—',
            hint: 'Won vs viable deals',
          },
        ]}
        actions={(
          <Button asChild className="h-8 rounded-xl bg-slate-950 px-3 text-xs text-white hover:bg-slate-800">
            <Link href="/crm/pipeline">
              Live pipeline
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
      />

      {/* Priority leads + command sidebar */}
      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.85fr]">
        <SalesPanel>
          <SalesPanelHeader className="flex flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <SalesPanelEyebrow>Immediate attention</SalesPanelEyebrow>
              <SalesPanelTitle>Priority leads to work</SalesPanelTitle>
            </div>
            <Button asChild variant="outline" className="h-8 shrink-0 rounded-xl border-slate-200 bg-white px-3 text-xs">
              <Link href="/crm/leads">All leads</Link>
            </Button>
          </SalesPanelHeader>
          <SalesPanelBody className="space-y-0 pt-0">
            {view.priorityLeads.length ? view.priorityLeads.map((lead) => (
              <div key={lead.id} className="flex items-center gap-4 border-t border-slate-100 py-4 first:border-t-0">
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <p className="text-[13px] font-semibold text-slate-950">{lead.companyName}</p>
                    <SalesStageBadge stage={lead.status} />
                    <SalesFitBadge fit={lead.estimatedFit} />
                  </div>
                  <p className="text-[12px] text-slate-500">
                    {lead.contactPerson} · {lead.city} · {lead.unitCount} units · touch {formatSalesDate(lead.nextFollowUpDate)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {lead.linkedDealId ? (
                    <Button asChild variant="outline" className="h-7 rounded-full border-slate-200 bg-white px-3 text-xs">
                      <Link href={`/crm/deals/${lead.linkedDealId}`}>Deal</Link>
                    </Button>
                  ) : null}
                  <Button asChild className="h-7 rounded-full bg-slate-950 px-3 text-xs text-white hover:bg-slate-800">
                    <Link href={`/crm/leads/${lead.id}`}>
                      Open
                      <MoveRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            )) : (
              <SalesEmptyState
                title="No priority leads right now"
                description="When new high-fit or late-stage leads appear, this lane becomes your first stop."
              />
            )}
          </SalesPanelBody>
        </SalesPanel>

        <div className="space-y-5">
          {/* Founder snapshot */}
          <SalesPanel tone="dark">
            <SalesPanelHeader className="space-y-3">
              <SalesPanelEyebrow className="text-slate-500">Founder snapshot</SalesPanelEyebrow>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Revenue in motion</p>
                  <p className="mt-1.5 text-2xl font-semibold tracking-[-0.05em] text-white">{metricById.pipeline?.value}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Closed MRR</p>
                  <p className="mt-1.5 text-2xl font-semibold tracking-[-0.05em] text-white">{metricById.mrr?.value}</p>
                </div>
              </div>
            </SalesPanelHeader>
            <SalesPanelBody className="pt-0">
              <div className="grid gap-1.5 rounded-[18px] border border-white/8 bg-white/5 px-4 py-3">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-slate-400">Proposals sent</span>
                  <span className="font-semibold text-white">{metricById.proposals?.value}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-slate-400">Demos completed</span>
                  <span className="font-semibold text-white">{metricById.demos?.value}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-slate-400">Won deals</span>
                  <span className="font-semibold text-white">{metricById.won?.value}</span>
                </div>
              </div>
            </SalesPanelBody>
          </SalesPanel>

          {/* Follow-up pressure */}
          <SalesPanel>
            <SalesPanelHeader className="flex flex-row items-center justify-between gap-3 pb-3">
              <div className="space-y-1">
                <SalesPanelEyebrow>Pressure</SalesPanelEyebrow>
                <SalesPanelTitle>Follow-up pressure</SalesPanelTitle>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                <CalendarDays className="h-3 w-3" />
                Tasks
              </div>
            </SalesPanelHeader>
            <SalesPanelBody className="grid gap-3 pt-0">
              <div className="rounded-[18px] border border-emerald-200/70 bg-emerald-50/60 px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">Due today</p>
                <div className="mt-2 space-y-2">
                  {view.dueToday.length ? view.dueToday.map((task) => (
                    <div key={task.id}>
                      <p className="text-[13px] font-semibold text-slate-950">{task.title}</p>
                    </div>
                  )) : (
                    <p className="text-[12px] text-slate-500">No tasks due today.</p>
                  )}
                </div>
              </div>
              <div className="rounded-[18px] border border-rose-200/70 bg-rose-50/60 px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-700">Overdue</p>
                <div className="mt-2 space-y-2">
                  {view.overdue.length ? view.overdue.map((task) => (
                    <div key={task.id}>
                      <p className="text-[13px] font-semibold text-slate-950">{task.title}</p>
                    </div>
                  )) : (
                    <p className="text-[12px] text-slate-500">No overdue follow-ups.</p>
                  )}
                </div>
              </div>
            </SalesPanelBody>
          </SalesPanel>

          <SalesCalendarPanel events={view.upcomingCalendarItems} />
        </div>
      </section>

      {/* Deals + customers */}
      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <SalesPanel>
          <SalesPanelHeader className="space-y-1">
            <SalesPanelEyebrow>Pipeline</SalesPanelEyebrow>
            <SalesPanelTitle>Open opportunities</SalesPanelTitle>
          </SalesPanelHeader>
          <SalesPanelBody className="space-y-0 pt-0">
            {view.activeDeals.map((deal) => (
              <div key={deal.id} className="flex items-center gap-4 border-t border-slate-100 py-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Link
                      href={`/crm/deals/${deal.id}`}
                      className="text-[13px] font-semibold text-slate-950 underline-offset-4 hover:underline"
                    >
                      {deal.dealName}
                    </Link>
                    <SalesStageBadge stage={deal.dealStage} />
                  </div>
                  <p className="mt-0.5 text-[12px] text-slate-500">
                    {getStageLabel(deal.dealStage)} · {deal.closeProbability}% · closes {formatSalesDate(deal.estimatedCloseDate)}
                  </p>
                </div>
                <div className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12px] font-semibold text-slate-950">
                  {formatSalesCurrency(deal.expectedMonthlyValue)}
                </div>
              </div>
            ))}
          </SalesPanelBody>
        </SalesPanel>

        <SalesPanel>
          <SalesPanelHeader className="space-y-1">
            <SalesPanelEyebrow>Customers</SalesPanelEyebrow>
            <SalesPanelTitle>Signed accounts</SalesPanelTitle>
          </SalesPanelHeader>
          <SalesPanelBody className="space-y-3 pt-0">
            {view.customers.map((customer) => (
              <div key={customer.id} className="rounded-[18px] border border-slate-200 bg-slate-50/60 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-slate-950">{customer.companyName}</p>
                    <p className="mt-0.5 text-[12px] text-slate-500">{customer.primaryContact} · {customer.plan}</p>
                  </div>
                  <p className="shrink-0 text-[13px] font-semibold text-slate-950">
                    {formatSalesCurrency(customer.monthlyRevenue)}
                  </p>
                </div>
              </div>
            ))}
          </SalesPanelBody>
        </SalesPanel>
      </section>

      {/* Activity */}
      <section>
        <SalesPanel>
          <SalesPanelHeader className="space-y-1">
            <SalesPanelEyebrow>Activity</SalesPanelEyebrow>
            <SalesPanelTitle>Recent sales movement</SalesPanelTitle>
          </SalesPanelHeader>
          <SalesPanelBody>
            <SalesActivityFeed activities={view.recentActivities} />
          </SalesPanelBody>
        </SalesPanel>
      </section>
    </div>
  );
}
