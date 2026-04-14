'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRightLeft,
  BadgeDollarSign,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ContactRound,
  KanbanSquare,
  LayoutDashboard,
  ListChecks,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { href: '/crm/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/crm/leads', label: 'Leads', icon: ContactRound },
  { href: '/crm/pipeline', label: 'Pipeline', icon: KanbanSquare },
  { href: '/crm/tasks', label: 'Tasks', icon: ListChecks },
  { href: '/crm/customers', label: 'Customers', icon: BadgeDollarSign },
  { href: '/crm/calendar', label: 'Calendar', icon: CalendarDays },
];

interface SalesSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function SalesSidebar({ collapsed, onToggle }: SalesSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn('sales-sidebar', collapsed && 'collapsed')}>
      <div className="border-b border-white/8 px-4 py-4">
        <Link href="/crm/dashboard" className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] bg-emerald-400/10 text-emerald-300 ring-1 ring-white/10">
            <ArrowRightLeft className="h-4 w-4" />
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Revenue workspace
              </p>
              <p className="truncate text-sm font-semibold tracking-[-0.02em] text-white">
                FluxLocatif Sales
              </p>
            </div>
          ) : null}
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-2 py-3">
        {!collapsed ? (
          <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-600">
            Navigation
          </p>
        ) : null}
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 rounded-[14px] px-2.5 py-2.5 text-sm transition-colors',
                active
                  ? 'bg-white text-slate-950 shadow-[0_6px_20px_rgba(15,23,42,0.15)]'
                  : 'text-slate-400 hover:bg-white/6 hover:text-white'
              )}
            >
              <div
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px]',
                  active ? 'bg-slate-950 text-white' : 'bg-white/5 text-slate-400'
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
              </div>
              {!collapsed ? (
                <span className="truncate text-[13px] font-medium">{item.label}</span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/8 p-2">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center gap-2.5 rounded-[14px] px-2.5 py-2.5 text-sm text-slate-500 transition-colors hover:bg-white/6 hover:text-white"
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
          {!collapsed ? <span className="text-[13px]">Collapse</span> : null}
        </button>
      </div>
    </aside>
  );
}
