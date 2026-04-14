import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SalesNewLeadDialog } from '@/components/sales/sales-new-lead-dialog';
import {
  SalesPanel,
  SalesPanelBody,
  SalesPanelEyebrow,
  SalesPanelHeader,
  SalesPanelTitle,
} from '@/components/sales/sales-panel';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SalesPageHeader } from '@/components/sales/sales-page-header';
import { SalesFitBadge, SalesStageBadge } from '@/components/sales/sales-stage-badge';
import { formatSalesDate, getOwnerTypeLabel, getPropertyTypeLabel, getSourceLabel } from '@/lib/sales/format';
import { getSalesLeadsIndex } from '@/lib/sales/service';
import { salesPipelineStages, salesStageLabels } from '@/lib/sales/mock-data';

export default async function SalesLeadsPage() {
  const leads = await getSalesLeadsIndex();
  const highFit = leads.filter((lead) => lead.estimatedFit === 'high').length;
  const repliedOrBetter = leads.filter((lead) => ['replied', 'discovery_scheduled', 'discovery_completed', 'qualified', 'demo_scheduled', 'demo_completed', 'proposal_sent', 'negotiation', 'won'].includes(lead.status)).length;
  const nextToTouch = [...leads].sort((a, b) => a.nextFollowUpDate.localeCompare(b.nextFollowUpDate)).slice(0, 4);

  return (
    <div className="space-y-6">
      <SalesPageHeader
        eyebrow="Lead management"
        title="Prospect ledger"
        stats={[
          { label: 'Total leads', value: String(leads.length), hint: 'Sales coverage' },
          { label: 'High fit', value: String(highFit), hint: 'Best targets' },
          { label: 'Responded', value: String(repliedOrBetter), hint: 'Past first contact' },
          { label: 'Next to touch', value: String(nextToTouch.length), hint: 'Immediate queue' },
        ]}
        actions={(
          <>
            <Button asChild variant="outline" className="h-8 rounded-full border-slate-200 bg-white px-3 text-xs">
              <Link href="/sales/pipeline">Board view</Link>
            </Button>
            <SalesNewLeadDialog />
          </>
        )}
      />

      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.72fr]">
        <SalesPanel>
          <SalesPanelHeader className="space-y-1">
            <SalesPanelEyebrow>Lead ledger</SalesPanelEyebrow>
            <SalesPanelTitle>All active prospect records</SalesPanelTitle>
          </SalesPanelHeader>
          <SalesPanelBody className="pt-0">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100">
                  <TableHead className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Lead</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Portfolio</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Status</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Fit</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Touch</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="border-slate-100 hover:bg-slate-50/60">
                    <TableCell className="py-3">
                      <p className="whitespace-nowrap text-[13px] font-semibold text-slate-950">{lead.companyName}</p>
                      <p className="mt-0.5 whitespace-nowrap text-[11px] text-slate-400">{lead.contactPerson}</p>
                    </TableCell>
                    <TableCell>
                      <p className="whitespace-nowrap text-[12px] text-slate-600">{lead.unitCount}u · {getOwnerTypeLabel(lead.ownerType)}</p>
                      <p className="mt-0.5 whitespace-nowrap text-[11px] text-slate-400">{getSourceLabel(lead.source)}</p>
                    </TableCell>
                    <TableCell><SalesStageBadge stage={lead.status} /></TableCell>
                    <TableCell><SalesFitBadge fit={lead.estimatedFit} /></TableCell>
                    <TableCell className="whitespace-nowrap text-[12px] text-slate-500">{formatSalesDate(lead.nextFollowUpDate)}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="ghost" className="h-7 rounded-full px-3 text-xs">
                        <Link href={`/sales/leads/${lead.id}`}>Open</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SalesPanelBody>
        </SalesPanel>

        <div className="space-y-5">
          <SalesPanel>
            <SalesPanelHeader className="space-y-1">
              <SalesPanelEyebrow>Immediate queue</SalesPanelEyebrow>
              <SalesPanelTitle>Next to touch</SalesPanelTitle>
            </SalesPanelHeader>
            <SalesPanelBody className="space-y-3 pt-0">
              {nextToTouch.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/sales/leads/${lead.id}`}
                  className="flex items-center justify-between gap-3 rounded-[16px] border border-slate-200 bg-slate-50/60 px-4 py-3 transition-colors hover:bg-slate-100/80"
                >
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-slate-950">{lead.companyName}</p>
                    <p className="mt-0.5 text-[11px] text-slate-500">Touch {formatSalesDate(lead.nextFollowUpDate)}</p>
                  </div>
                  <SalesStageBadge stage={lead.status} />
                </Link>
              ))}
            </SalesPanelBody>
          </SalesPanel>

          <SalesPanel>
            <SalesPanelHeader className="space-y-1">
              <SalesPanelEyebrow>Distribution</SalesPanelEyebrow>
              <SalesPanelTitle>Where coverage sits</SalesPanelTitle>
            </SalesPanelHeader>
            <SalesPanelBody className="space-y-0 pt-0">
              {salesPipelineStages.map((stage) => {
                const count = leads.filter((lead) => lead.status === stage).length;
                if (count === 0) return null;

                return (
                  <div key={stage} className="flex items-center justify-between border-b border-slate-100 py-3 last:border-b-0">
                    <SalesStageBadge stage={stage} />
                    <div className="text-right">
                      <span className="text-[13px] font-semibold text-slate-950">{count}</span>
                    </div>
                  </div>
                );
              })}
            </SalesPanelBody>
          </SalesPanel>
        </div>
      </section>
    </div>
  );
}
