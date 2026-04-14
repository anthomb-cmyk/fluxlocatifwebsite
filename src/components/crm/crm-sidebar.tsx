'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCheck,
  Kanban,
  CheckSquare,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ArrowRightLeft,
} from 'lucide-react';
import { tasks } from '@/lib/crm/data';
import { cn } from '@/lib/utils';

const overdueCount = tasks.filter(t => !t.completed && t.daysOverdue > 0).length;

const navItems = [
  { href: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/properties', label: 'Propriétés', icon: Building2, badge: '7' },
  { href: '/candidates', label: 'Candidats', icon: UserCheck, badge: '12' },
  { href: '/pipeline', label: 'Pipeline', icon: Kanban },
  { href: '/tasks', label: 'Tâches', icon: CheckSquare, badge: overdueCount > 0 ? String(overdueCount) : undefined, badgeAlert: true },
  { href: '/communications', label: 'Communications', icon: MessageSquare, badge: '2' },
  { href: '/reports', label: 'Rapports', icon: BarChart3 },
];

interface CrmSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function CrmSidebar({ collapsed, onToggle }: CrmSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn('crm-sidebar', collapsed && 'collapsed')}>
      {/* Branding */}
      <div className="flex h-14 shrink-0 items-center border-b border-slate-100 px-4">
        <Link href="/dashboard" className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-blue-600 text-white">
            <ArrowRightLeft className="h-3.5 w-3.5" />
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Gestion locative
              </p>
              <p className="truncate text-[13px] font-semibold tracking-[-0.02em] text-slate-900">
                FluxLocatif CRM
              </p>
            </div>
          ) : null}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3">
        {!collapsed ? (
          <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Navigation
          </p>
        ) : null}
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 rounded-[12px] px-2.5 py-2.5 text-sm transition-colors',
                active
                  ? 'bg-slate-900 text-white shadow-[0_4px_12px_rgba(15,23,42,0.15)]'
                  : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-900'
              )}
            >
              <div className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px]',
                active ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-400'
              )}>
                <Icon className="h-3.5 w-3.5 shrink-0" />
              </div>
              {!collapsed ? (
                <>
                  <span className="flex-1 truncate text-[13px] font-medium">{item.label}</span>
                  {item.badge ? (
                    <span className={cn(
                      'min-w-[20px] rounded-full px-1.5 py-0.5 text-center text-[11px] font-semibold',
                      active
                        ? 'bg-white/15 text-white'
                        : item.badgeAlert
                          ? 'bg-rose-100 text-rose-600'
                          : 'bg-slate-100 text-slate-500'
                    )}>
                      {item.badge}
                    </span>
                  ) : null}
                </>
              ) : null}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="shrink-0 space-y-0.5 border-t border-slate-100 px-2 py-3">
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-2.5 rounded-[12px] px-2.5 py-2.5 text-sm transition-colors',
            pathname === '/settings'
              ? 'bg-slate-900 text-white'
              : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-900'
          )}
        >
          <div className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px]',
            pathname === '/settings' ? 'bg-white/10' : 'bg-slate-100'
          )}>
            <Settings className="h-3.5 w-3.5" />
          </div>
          {!collapsed ? <span className="text-[13px] font-medium">Paramètres</span> : null}
        </Link>

        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center gap-2.5 rounded-[12px] px-2.5 py-2.5 text-slate-400 transition-colors hover:bg-slate-100/80 hover:text-slate-600"
        >
          {collapsed
            ? <ChevronRight className="h-3.5 w-3.5" />
            : <><ChevronLeft className="h-3.5 w-3.5" /><span className="text-[13px]">Réduire</span></>
          }
        </button>
      </div>

      {/* User */}
      {!collapsed ? (
        <div className="shrink-0 border-t border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200">
              <span className="text-[10px] font-semibold text-slate-500">AM</span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-slate-900">Anthony</p>
              <p className="text-[11px] text-slate-400">Administrateur</p>
            </div>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
