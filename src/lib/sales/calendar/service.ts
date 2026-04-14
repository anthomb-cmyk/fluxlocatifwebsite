import { salesCalendarProvider } from '@/lib/sales/calendar/provider';
import type { CreateSalesCalendarEventInput } from '@/lib/sales/calendar/types';

export async function getSalesCalendarStatus() {
  return salesCalendarProvider.getStatus();
}

export async function listSalesCalendarEvents() {
  return salesCalendarProvider.listEvents();
}

export async function listSalesCalendarEventsForEntity(entityType: string, entityId: string) {
  const events = await salesCalendarProvider.listEvents();
  return events.filter((event) => event.entityType === entityType && event.entityId === entityId);
}

export async function buildSalesCalendarCreateLink(input: CreateSalesCalendarEventInput) {
  return salesCalendarProvider.buildCreateEventLink(input);
}

