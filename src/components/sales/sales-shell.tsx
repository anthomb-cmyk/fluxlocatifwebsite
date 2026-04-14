'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { SalesSidebar } from '@/components/sales/sales-sidebar';
import { SalesTopbar } from '@/components/sales/sales-topbar';

export function SalesShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="sales-shell">
      <SalesSidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      <div
        className={cn('sales-main', collapsed && 'collapsed')}
        style={{ marginLeft: collapsed ? 92 : 280 }}
      >
        <SalesTopbar />
        <main className="sales-content">
          <div className="sales-workspace">{children}</div>
        </main>
      </div>
    </div>
  );
}
