import Link from 'next/link';
import { SalesEmptyState } from '@/components/crm/sales-empty-state';
import {
  SalesPanel,
  SalesPanelBody,
  SalesPanelEyebrow,
  SalesPanelHeader,
  SalesPanelTitle,
} from '@/components/crm/sales-panel';
import { Button } from '@/components/ui/button';
import { formatSalesDateTime, getCalendarEventKindLabel } from '@/lib/sales/format';
import { getSalesCalendarStatus } from '@/lib/sales/calendar/service';
import type { SalesCalendarEvent } from '@/lib/sales/types';

interface SalesCalendarPanelProps {
  events: SalesCalendarEvent[];
  actionLink?: {
    href: string;
    label: string;
  };
}

export async function SalesCalendarPanel({ events, actionLink }: SalesCalendarPanelProps) {
  const status = await getSalesCalendarStatus();

  return (
    <SalesPanel>
      <SalesPanelHeader className="flex flex-row items-center justify-between gap-3 pb-3">
        <div className="space-y-1">
          <SalesPanelEyebrow>Calendar</SalesPanelEyebrow>
          <SalesPanelTitle>Scheduled events</SalesPanelTitle>
        </div>
        {actionLink ? (
          <Button asChild size="sm" className="h-7 rounded-full bg-slate-950 px-3 text-xs text-white hover:bg-slate-800">
            <Link href={actionLink.href} target="_blank">
              {actionLink.label}
            </Link>
          </Button>
        ) : null}
      </SalesPanelHeader>

      {/* Calendar provider status — keep abstraction intact, just smaller */}
      <div className="mx-6 mb-3 rounded-[14px] border border-slate-200/80 bg-slate-50/60 px-3 py-2">
        <p className="text-[11px] text-slate-400">{status.message}</p>
      </div>

      <SalesPanelBody className="space-y-2 pt-0">
        {events.length ? (
          events.map((event) => (
            <div
              key={event.id}
              className="rounded-[16px] border border-slate-200 bg-slate-50/60 px-4 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] font-semibold text-slate-950 leading-snug">{event.title}</p>
                <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {getCalendarEventKindLabel(event.kind)}
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                <span className={`font-medium ${event.status === 'pending_integration' ? 'text-amber-600' : 'text-slate-500'}`}>
                  {event.status.replace('_', ' ')}
                </span>
                <span>·</span>
                <span>{formatSalesDateTime(event.startsAt)}</span>
                {event.location ? (
                  <>
                    <span>·</span>
                    <span className="uppercase tracking-[0.14em]">{event.location}</span>
                  </>
                ) : null}
              </div>
            </div>
          ))
        ) : (
          <SalesEmptyState
            title="No linked calendar items"
            description="Use the scheduling action to draft the next discovery call, demo, or follow-up."
          />
        )}
      </SalesPanelBody>
    </SalesPanel>
  );
}
