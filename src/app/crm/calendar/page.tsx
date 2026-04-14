import Link from 'next/link';
import { Settings } from 'lucide-react';
import { getSalesCalendarView } from '@/lib/sales/service';
import { getSalesCalendarStatus } from '@/lib/sales/calendar/service';
import { SalesPageHeader } from '@/components/sales/sales-page-header';
import { SalesCalendarClient } from '@/components/sales/sales-calendar-client';

const TODAY_KEY = '2026-04-14';

export default async function SalesCalendarPage() {
  const [events, status] = await Promise.all([
    getSalesCalendarView(),
    getSalesCalendarStatus(),
  ]);

  const upcomingCount = events.filter((e) => e.status !== 'pending_integration').length;
  const discoveryCount = events.filter((e) => e.kind === 'discovery_call').length;
  const demoCount = events.filter((e) => e.kind === 'demo').length;
  const pendingCount = events.filter((e) => e.status === 'pending_integration').length;

  return (
    <div className="space-y-6">
      <SalesPageHeader
        eyebrow="Schedule"
        title="Sales calendar"
        stats={[
          { label: 'Upcoming', value: String(upcomingCount), hint: 'Scheduled events' },
          { label: 'Discovery calls', value: String(discoveryCount), hint: 'Pipeline opens' },
          { label: 'Demos', value: String(demoCount), hint: 'Qualified walkthroughs' },
          { label: 'Pending sync', value: String(pendingCount), hint: 'Integration queue' },
        ]}
        actions={
          <Link
            href="/crm/calendar/setup"
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <span className={`h-2 w-2 rounded-full ${status.configured ? 'bg-emerald-500' : 'bg-amber-400'}`} />
            {status.configured ? 'anthony@fluxlocatif.com' : 'Connect Google Calendar'}
            <Settings className="h-3.5 w-3.5 text-slate-400" />
          </Link>
        }
      />

      {/* Connection banner if not configured */}
      {!status.configured && (
        <div className="flex items-center justify-between gap-4 rounded-[18px] border border-amber-200 bg-amber-50/60 px-5 py-3">
          <p className="text-[13px] text-amber-800">
            <span className="font-semibold">Google Calendar not connected.</span>{' '}
            Events are saved to the CRM but won&apos;t auto-sync until you connect anthony@fluxlocatif.com.
          </p>
          <Link
            href="/crm/calendar/setup"
            className="shrink-0 rounded-full bg-amber-600 px-4 py-1.5 text-[12px] font-medium text-white hover:bg-amber-700 transition-colors"
          >
            Set up →
          </Link>
        </div>
      )}

      <SalesCalendarClient
        events={events}
        todayKey={TODAY_KEY}
        statusMessage={status.message}
        isConnected={status.configured}
      />
    </div>
  );
}
