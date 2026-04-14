'use client';

import { useState } from 'react';
import { CrmSidebar } from '@/components/crm/crm-sidebar';
import { CrmTopbar } from '@/components/crm/crm-topbar';

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="crm-shell flex">
      <CrmSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div
        className="crm-main flex min-w-0 flex-1 flex-col overflow-hidden"
        style={{ marginLeft: collapsed ? 68 : 248 }}
      >
        <CrmTopbar />
        <main className="crm-content">
          {children}
        </main>
      </div>
    </div>
  );
}
