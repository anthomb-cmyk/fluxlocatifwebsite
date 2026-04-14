import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { SalesActivityFeed } from '@/components/sales/sales-activity-feed';
import { SalesAddNoteForm } from '@/components/sales/sales-add-note-form';
import { SalesCalendarPanel } from '@/components/sales/sales-calendar-panel';
import { SalesEmptyState } from '@/components/sales/sales-empty-state';
import { SalesNewTaskDialog } from '@/components/sales/sales-new-task-dialog';
import { SalesNotesPanel } from '@/components/sales/sales-notes-panel';
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
import {
  formatSalesDate,
  getOwnerTypeLabel,
  getPropertyTypeLabel,
  getSourceLabel,
} from '@/lib/sales/format';
import { getSalesLeadDetail } from '@/lib/sales/service';

export default async function SalesLeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = await getSalesLeadDetail(id);

  if (!detail) {
    notFound();
  }

  const { lead, linkedDeal, tasks, activities, notes, calendarItems, scheduleAction } = detail;
  const nextTask = tasks[0];

  return (
    <div className="space-y-6">
      <SalesPageHeader
        eyebrow="Lead detail"
        title={lead.companyName}
        description={lead.notes}
        stats={[
          { label: 'Stage', value: lead.status.replaceAll('_', ' '), hint: 'Pipeline position' },
          { label: 'Fit', value: `${lead.estimatedFit} fit`, hint: 'Commercial quality' },
          { label: 'Next follow-up', value: formatSalesDate(lead.nextFollowUpDate), hint: 'Planned touch' },
          { label: 'Units', value: String(lead.unitCount), hint: `${lead.city} portfolio` },
        ]}
        actions={(
          <>
            <Button asChild variant="outline" className="h-8 rounded-full border-slate-200 bg-white px-3 text-xs">
              <Link href={`mailto:${lead.email}`}>
                <Mail className="h-3.5 w-3.5" />
                Email
              </Link>
            </Button>
            {linkedDeal ? (
              <Button asChild className="h-8 rounded-full bg-slate-950 px-3 text-xs text-white hover:bg-slate-800">
                <Link href={`/crm/deals/${linkedDeal.id}`}>
                  Open deal
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            ) : null}
          </>
        )}
      />

      <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-5">
          {/* Account brief — horizontal info strip */}
          <SalesPanel>
            <SalesPanelHeader className="space-y-1">
              <SalesPanelEyebrow>Account brief</SalesPanelEyebrow>
              <SalesPanelTitle>Contact and commercial context</SalesPanelTitle>
            </SalesPanelHeader>
            <SalesPanelBody className="pt-0">
              <div className="grid gap-px overflow-hidden rounded-[18px] border border-slate-200 bg-slate-200">
                {/* Contact row */}
                <div className="grid grid-cols-[140px_1fr] bg-white">
                  <div className="border-r border-slate-200 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Contact</p>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-[13px] font-semibold text-slate-950">{lead.contactPerson}</p>
                    <div className="mt-1 flex flex-wrap gap-3 text-[12px] text-slate-500">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{lead.email}</span>
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{lead.phone}</span>
                    </div>
                  </div>
                </div>
                {/* Commercial fit row */}
                <div className="grid grid-cols-[140px_1fr] bg-white">
                  <div className="border-r border-slate-200 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Fit</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 px-4 py-3">
                    <SalesStageBadge stage={lead.status} />
                    <SalesFitBadge fit={lead.estimatedFit} />
                    <span className="text-[12px] text-slate-500">{getSourceLabel(lead.source)}</span>
                  </div>
                </div>
                {/* Portfolio row */}
                <div className="grid grid-cols-[140px_1fr] bg-white">
                  <div className="border-r border-slate-200 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Portfolio</p>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-[13px] text-slate-950">
                      <span className="font-semibold">{lead.unitCount} units</span>
                      {' '}· {getOwnerTypeLabel(lead.ownerType)} · {getPropertyTypeLabel(lead.propertyType)} · {lead.city}
                    </p>
                  </div>
                </div>
                {/* Timing row */}
                <div className="grid grid-cols-[140px_1fr] bg-white">
                  <div className="border-r border-slate-200 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Timing</p>
                  </div>
                  <div className="flex flex-wrap gap-4 px-4 py-3 text-[12px] text-slate-500">
                    <span>Last contact {formatSalesDate(lead.lastContactDate)}</span>
                    <span>Next follow-up {formatSalesDate(lead.nextFollowUpDate)}</span>
                    <span>Rep: {lead.assignedRep}</span>
                  </div>
                </div>
              </div>
            </SalesPanelBody>
          </SalesPanel>

          <SalesNotesPanel notes={notes} />

          <SalesAddNoteForm entityType="lead" entityId={id} />

          <SalesPanel>
            <SalesPanelHeader className="space-y-1">
              <SalesPanelEyebrow>Activity</SalesPanelEyebrow>
              <SalesPanelTitle>Lead timeline</SalesPanelTitle>
            </SalesPanelHeader>
            <SalesPanelBody>
              <SalesActivityFeed activities={activities} />
            </SalesPanelBody>
          </SalesPanel>
        </div>

        <div className="space-y-5">
          {/* Next move */}
          <SalesPanel tone="dark">
            <SalesPanelHeader className="space-y-2">
              <SalesPanelEyebrow className="text-slate-500">Next move</SalesPanelEyebrow>
              <SalesPanelTitle className="text-white">What to do next</SalesPanelTitle>
            </SalesPanelHeader>
            <SalesPanelBody className="space-y-4 pt-0">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Recommended action</p>
                <p className="mt-2 text-[15px] font-semibold tracking-[-0.02em] text-white">
                  {nextTask?.title ?? `Prepare next touch for ${formatSalesDate(lead.nextFollowUpDate)}`}
                </p>
                <p className="mt-1.5 text-[12px] leading-5 text-slate-300">
                  {nextTask?.description ?? 'Use the calendar action below to book the next discovery or follow-up.'}
                </p>
              </div>
              {linkedDeal ? (
                <div className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Linked deal</p>
                  <p className="mt-1.5 text-[13px] font-semibold text-white">{linkedDeal.dealName}</p>
                  <p className="mt-0.5 text-[12px] text-slate-400">{linkedDeal.selectedPlan} · {linkedDeal.closeProbability}% confidence</p>
                </div>
              ) : null}
            </SalesPanelBody>
          </SalesPanel>

          {/* Open tasks */}
          <SalesPanel>
            <SalesPanelHeader className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <SalesPanelEyebrow>Open tasks</SalesPanelEyebrow>
                <SalesPanelTitle>Lead-specific items</SalesPanelTitle>
              </div>
              <SalesNewTaskDialog defaultLeadId={id} label="Add task" />
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
                  title="No lead-specific tasks"
                  description="No execution items yet."
                />
              )}
            </SalesPanelBody>
          </SalesPanel>

          <SalesCalendarPanel events={calendarItems} actionLink={scheduleAction} />
        </div>
      </section>
    </div>
  );
}
