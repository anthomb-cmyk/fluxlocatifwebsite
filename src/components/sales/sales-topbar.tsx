'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarPlus2, ChevronRight, ListChecks, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SalesTopbar() {
  const pathname = usePathname();
  const pageMeta = getPageMeta(pathname);

  return (
    <header className="sales-topbar">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          FluxLocatif Sales
        </span>
        <ChevronRight className="h-3 w-3 text-slate-300" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600">
          {pageMeta.eyebrow}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button asChild variant="outline" className="h-8 rounded-full border-slate-200 bg-white px-3 text-xs text-slate-700 hover:bg-slate-50">
          <Link href="/crm/tasks">
            <ListChecks className="h-3.5 w-3.5" />
            Tasks
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-8 rounded-full border-slate-200 bg-white px-3 text-xs text-slate-700 hover:bg-slate-50">
          <Link href="/crm/pipeline">
            <CalendarPlus2 className="h-3.5 w-3.5" />
            Pipeline
          </Link>
        </Button>
        <Button asChild className="h-8 rounded-full bg-slate-950 px-3 text-xs text-white hover:bg-slate-800">
          <Link href="/crm/leads">
            <Plus className="h-3.5 w-3.5" />
            Leads
          </Link>
        </Button>
      </div>
    </header>
  );
}

function getPageMeta(pathname: string) {
  if (pathname.startsWith('/crm/leads/')) {
    return { eyebrow: 'Lead detail' };
  }
  if (pathname.startsWith('/crm/leads')) {
    return { eyebrow: 'Leads' };
  }
  if (pathname.startsWith('/crm/deals/')) {
    return { eyebrow: 'Deal detail' };
  }
  if (pathname.startsWith('/crm/pipeline')) {
    return { eyebrow: 'Pipeline' };
  }
  if (pathname.startsWith('/crm/tasks')) {
    return { eyebrow: 'Tasks' };
  }
  if (pathname.startsWith('/crm/customers/')) {
    return { eyebrow: 'Customer detail' };
  }
  if (pathname.startsWith('/crm/customers')) {
    return { eyebrow: 'Customers' };
  }
  if (pathname.startsWith('/crm/calendar')) {
    return { eyebrow: 'Calendar' };
  }
  return { eyebrow: 'Dashboard' };
}
