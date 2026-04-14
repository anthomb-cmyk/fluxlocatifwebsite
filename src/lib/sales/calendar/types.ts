import type { SalesCalendarEvent, SalesEntityType } from '@/lib/sales/types';

export interface CreateSalesCalendarEventInput {
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  attendees?: string[];
  entityType: SalesEntityType;
  entityId: string;
}

export interface SalesCalendarDraftLink {
  label: string;
  href: string;
}

export interface SalesCalendarProviderStatus {
  providerName: string;
  configured: boolean;
  mode: 'google_oauth' | 'google_template_link';
  message: string;
}

export interface SalesCalendarProvider {
  getStatus(): Promise<SalesCalendarProviderStatus>;
  listEvents(): Promise<SalesCalendarEvent[]>;
  buildCreateEventLink(input: CreateSalesCalendarEventInput): Promise<SalesCalendarDraftLink>;
  createEvent?(input: CreateSalesCalendarEventInput): Promise<{ gcalEventId?: string }>;
}

