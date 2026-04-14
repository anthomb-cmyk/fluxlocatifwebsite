import Link from 'next/link';
import { SalesEmptyState } from '@/components/crm/sales-empty-state';
import { SalesNewCustomerDialog } from '@/components/crm/sales-new-customer-dialog';
import {
  SalesPanel,
  SalesPanelBody,
  SalesPanelEyebrow,
  SalesPanelHeader,
  SalesPanelTitle,
} from '@/components/crm/sales-panel';
import { SalesPageHeader } from '@/components/crm/sales-page-header';
import { SalesHealthBadge } from '@/components/crm/sales-stage-badge';
import { formatSalesCurrency, formatSalesDate, getOwnerTypeLabel, getPropertyTypeLabel } from '@/lib/sales/format';
import { getSalesCustomersView } from '@/lib/sales/service';

export default async function SalesCustomersPage() {
  const customers = await getSalesCustomersView();
  const monthlyRevenue = customers.reduce((total, customer) => total + customer.monthlyRevenue, 0);
  const watchCount = customers.filter((customer) => customer.health !== 'healthy').length;
  const upcomingTouchpoints = customers.filter((customer) => customer.upcomingItems.length > 0).length;

  return (
    <div className="space-y-6">
      <SalesPageHeader
        eyebrow="Customer records"
        title="Signed accounts"
        stats={[
          { label: 'Customers', value: String(customers.length), hint: 'Signed records' },
          { label: 'Monthly revenue', value: formatSalesCurrency(monthlyRevenue), hint: 'Current recurring value' },
          { label: 'Watch accounts', value: String(watchCount), hint: 'Need attention' },
          { label: 'Touchpoints', value: String(upcomingTouchpoints), hint: 'Calendar-linked' },
        ]}
        actions={<SalesNewCustomerDialog />}
      />

      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.72fr]">
        <SalesPanel>
          <SalesPanelHeader className="space-y-1">
            <SalesPanelEyebrow>Customer ledger</SalesPanelEyebrow>
            <SalesPanelTitle>Signed accounts</SalesPanelTitle>
          </SalesPanelHeader>
          <SalesPanelBody className="space-y-0 pt-0">
            {customers.length ? customers.map((customer) => (
              <Link
                key={customer.id}
                href={`/crm/customers/${customer.id}`}
                className="flex gap-5 border-b border-slate-100 py-4 transition-colors hover:bg-slate-50/60 last:border-b-0"
              >
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <p className="text-[13px] font-semibold text-slate-950">{customer.companyName}</p>
                    <SalesHealthBadge health={customer.health} />
                  </div>
                  <p className="text-[12px] text-slate-500">
                    {customer.primaryContact} · {customer.city} · {customer.plan}
                  </p>
                  <div className="flex flex-wrap gap-3 text-[12px] text-slate-400">
                    <span>{getOwnerTypeLabel(customer.ownerType)}</span>
                    <span>{getPropertyTypeLabel(customer.propertyType)} · {customer.unitCount} units</span>
                    <span>Signed {formatSalesDate(customer.signedDate)}</span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end justify-start gap-1.5">
                  <p className="text-[15px] font-semibold tracking-[-0.03em] text-slate-950">
                    {formatSalesCurrency(customer.monthlyRevenue)}
                  </p>
                  <p className="text-[12px] text-slate-500">{customer.email}</p>
                  {customer.upcomingItems[0] ? (
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {formatSalesDate(customer.upcomingItems[0].startsAt)} · touch
                    </span>
                  ) : null}
                </div>
              </Link>
            )) : (
              <SalesEmptyState
                title="No customers yet"
                description="Sign your first customer to get started."
              />
            )}
          </SalesPanelBody>
        </SalesPanel>

        <div className="space-y-5">
          <SalesPanel>
            <SalesPanelHeader className="space-y-1">
              <SalesPanelEyebrow>Watchlist</SalesPanelEyebrow>
              <SalesPanelTitle>Accounts needing attention</SalesPanelTitle>
            </SalesPanelHeader>
            <SalesPanelBody className="space-y-3 pt-0">
              {customers.filter((c) => c.health !== 'healthy').length ? customers
                .filter((c) => c.health !== 'healthy')
                .map((customer) => (
                  <Link key={customer.id} href={`/crm/customers/${customer.id}`} className="block rounded-[16px] border border-slate-200 bg-slate-50/60 px-4 py-3 transition-colors hover:bg-slate-100/80">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[13px] font-semibold text-slate-950">{customer.companyName}</p>
                        <p className="mt-0.5 text-[12px] text-slate-500">{customer.primaryContact}</p>
                      </div>
                      <SalesHealthBadge health={customer.health} />
                    </div>
                    <p className="mt-2 text-[12px] leading-5 text-slate-500">{customer.notes}</p>
                  </Link>
                )) : (
                <SalesEmptyState
                  title="No watch accounts"
                  description="All signed customers are currently marked healthy."
                />
              )}
            </SalesPanelBody>
          </SalesPanel>

          <SalesPanel>
            <SalesPanelHeader className="space-y-1">
              <SalesPanelEyebrow>Upcoming touchpoints</SalesPanelEyebrow>
              <SalesPanelTitle>Calendar-linked moments</SalesPanelTitle>
            </SalesPanelHeader>
            <SalesPanelBody className="space-y-3 pt-0">
              {customers.filter((c) => c.upcomingItems.length > 0).length ? customers
                .filter((c) => c.upcomingItems.length > 0)
                .map((customer) => (
                  <Link
                    key={customer.id}
                    href="/crm/dashboard"
                    className="block rounded-[16px] border border-slate-200 bg-slate-50/60 px-4 py-3 transition-colors hover:bg-slate-100/80"
                  >
                    <p className="text-[13px] font-semibold text-slate-950">{customer.companyName}</p>
                    <p className="mt-0.5 text-[12px] text-slate-500">{customer.upcomingItems[0].title}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                      {formatSalesDate(customer.upcomingItems[0].startsAt)}
                    </p>
                  </Link>
                )) : (
                <SalesEmptyState
                  title="No touchpoints scheduled"
                  description="Customer follow-up events will show here once linked to the sales calendar."
                />
              )}
            </SalesPanelBody>
          </SalesPanel>
        </div>
      </section>
    </div>
  );
}
