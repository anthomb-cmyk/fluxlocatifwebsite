import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Mail, Phone, ArrowLeft } from 'lucide-react';
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
import { SalesHealthBadge } from '@/components/sales/sales-stage-badge';
import { Button } from '@/components/ui/button';
import {
  formatSalesCurrency,
  formatSalesDate,
  getOwnerTypeLabel,
  getPropertyTypeLabel,
} from '@/lib/sales/format';
import { getSalesCustomerDetail } from '@/lib/sales/service';

export default async function SalesCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = await getSalesCustomerDetail(id);

  if (!detail) notFound();

  const { customer, linkedLead, tasks, activities, notes, calendarItems } = detail;

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/sales/customers"
          className="mb-3 inline-flex items-center gap-1.5 text-[12px] text-slate-400 hover:text-slate-600"
        >
          <ArrowLeft className="h-3 w-3" />
          All customers
        </Link>
        <SalesPageHeader
          eyebrow="Customer profile"
          title={customer.companyName}
          description={customer.notes || undefined}
          stats={[
            { label: 'Plan', value: customer.plan, hint: 'Active package' },
            { label: 'Monthly revenue', value: formatSalesCurrency(customer.monthlyRevenue), hint: 'Recurring value' },
            { label: 'Units', value: String(customer.unitCount), hint: `${customer.city} portfolio` },
            { label: 'Signed', value: formatSalesDate(customer.signedDate), hint: 'Contract date' },
          ]}
          actions={(
            <Button asChild variant="outline" className="h-8 rounded-full border-slate-200 bg-white px-3 text-xs">
              <Link href={`mailto:${customer.email}`}>
                <Mail className="h-3.5 w-3.5" />
                Email
              </Link>
            </Button>
          )}
        />
      </div>

      <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-5">
          {/* Contact + profile */}
          <SalesPanel>
            <SalesPanelHeader className="space-y-1">
              <SalesPanelEyebrow>Account profile</SalesPanelEyebrow>
              <SalesPanelTitle>Contact and portfolio details</SalesPanelTitle>
            </SalesPanelHeader>
            <SalesPanelBody className="pt-0">
              <div className="grid gap-px overflow-hidden rounded-[18px] border border-slate-200 bg-slate-200">
                <div className="grid grid-cols-[140px_1fr] bg-white">
                  <div className="border-r border-slate-200 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Contact</p>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-[13px] font-semibold text-slate-950">{customer.primaryContact}</p>
                    <div className="mt-1 flex flex-wrap gap-3 text-[12px] text-slate-500">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{customer.email}</span>
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{customer.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[140px_1fr] bg-white">
                  <div className="border-r border-slate-200 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Portfolio</p>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-[13px] text-slate-950">
                      <span className="font-semibold">{customer.unitCount} units</span>
                      {' '}· {getOwnerTypeLabel(customer.ownerType)} · {getPropertyTypeLabel(customer.propertyType)} · {customer.city}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-[140px_1fr] bg-white">
                  <div className="border-r border-slate-200 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Contract</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 px-4 py-3">
                    <span className="text-[13px] text-slate-950">{customer.plan} plan · {formatSalesCurrency(customer.monthlyRevenue)}/mo</span>
                    <span className="text-[12px] text-slate-500">Signed {formatSalesDate(customer.signedDate)}</span>
                  </div>
                </div>
                <div className="grid grid-cols-[140px_1fr] bg-white">
                  <div className="border-r border-slate-200 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Health</p>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <SalesHealthBadge health={customer.health} />
                    {linkedLead ? (
                      <Link
                        href={`/sales/leads/${linkedLead.id}`}
                        className="text-[12px] text-slate-500 underline-offset-4 hover:underline"
                      >
                        View original lead →
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </SalesPanelBody>
          </SalesPanel>

          {/* Notes */}
          <SalesNotesPanel notes={notes} />

          {/* Add note form */}
          <SalesAddNoteForm entityType="customer" entityId={id} />

          {/* Activity */}
          <SalesPanel>
            <SalesPanelHeader className="space-y-1">
              <SalesPanelEyebrow>Activity</SalesPanelEyebrow>
              <SalesPanelTitle>Customer timeline</SalesPanelTitle>
            </SalesPanelHeader>
            <SalesPanelBody>
              {activities.length ? (
                <SalesActivityFeed activities={activities} />
              ) : (
                <SalesEmptyState
                  title="No activity yet"
                  description="Activity linked to this customer will appear here."
                />
              )}
            </SalesPanelBody>
          </SalesPanel>
        </div>

        <div className="space-y-5">
          {/* Open tasks */}
          <SalesPanel>
            <SalesPanelHeader className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <SalesPanelEyebrow>Open tasks</SalesPanelEyebrow>
                <SalesPanelTitle>Customer execution items</SalesPanelTitle>
              </div>
              <SalesNewTaskDialog defaultCustomerId={id} label="Add task" />
            </SalesPanelHeader>
            <SalesPanelBody className="space-y-3 pt-0">
              {tasks.filter((t) => t.status === 'open').length ? (
                tasks
                  .filter((t) => t.status === 'open')
                  .map((task) => (
                    <div key={task.id} className="rounded-[16px] border border-slate-200 bg-slate-50/60 px-4 py-3">
                      <p className="text-[13px] font-semibold text-slate-950">{task.title}</p>
                      <p className="mt-0.5 text-[12px] leading-5 text-slate-500">{task.description}</p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                        Due {formatSalesDate(task.dueAt)}
                      </p>
                    </div>
                  ))
              ) : (
                <SalesEmptyState
                  title="No open tasks"
                  description="No execution items linked to this customer."
                />
              )}
            </SalesPanelBody>
          </SalesPanel>

          <SalesCalendarPanel events={calendarItems} />
        </div>
      </section>
    </div>
  );
}
