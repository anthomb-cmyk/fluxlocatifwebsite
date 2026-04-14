/**
 * Mutable in-memory store for the sales CRM.
 * Initialized from mock-data on first import. Persists for the lifetime of the
 * Node process (dev server session). Swap for a real DB adapter in repository.ts
 * when ready — the interface stays the same.
 */
import type {
  SalesActivity,
  SalesCalendarEvent,
  SalesCustomer,
  SalesDeal,
  SalesLead,
  SalesNote,
  SalesTask,
} from '@/lib/sales/types';
import {
  salesActivities,
  salesCalendarEvents,
  salesCustomers,
  salesDeals,
  salesLeads,
  salesNotes,
  salesTasks,
} from '@/lib/sales/mock-data';

// Use global to survive Next.js hot reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var __salesStore: SalesStore | undefined;
}

interface SalesStore {
  leads: SalesLead[];
  deals: SalesDeal[];
  tasks: SalesTask[];
  customers: SalesCustomer[];
  activities: SalesActivity[];
  notes: SalesNote[];
  calendarEvents: SalesCalendarEvent[];
}

function createStore(): SalesStore {
  return {
    leads: [...salesLeads],
    deals: [...salesDeals],
    tasks: [...salesTasks],
    customers: [...salesCustomers],
    activities: [...salesActivities],
    notes: [...salesNotes],
    calendarEvents: [...salesCalendarEvents],
  };
}

export const salesStore: SalesStore =
  globalThis.__salesStore ?? (globalThis.__salesStore = createStore());
