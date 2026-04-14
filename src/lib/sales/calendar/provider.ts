import { google } from 'googleapis';
import { salesRepository } from '@/lib/sales/repository';
import type {
  CreateSalesCalendarEventInput,
  SalesCalendarDraftLink,
  SalesCalendarProvider,
  SalesCalendarProviderStatus,
} from '@/lib/sales/calendar/types';
import type { SalesCalendarEvent } from '@/lib/sales/types';

const CALENDAR_ACCOUNT = 'anthony@fluxlocatif.com';

// ─── OAuth2 client factory ────────────────────────────────────────────────────

function makeOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CALENDAR_CLIENT_ID,
    process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
    process.env.GOOGLE_CALENDAR_REDIRECT_URI,
  );
}

function isConfigured() {
  return Boolean(
    process.env.GOOGLE_CALENDAR_CLIENT_ID &&
    process.env.GOOGLE_CALENDAR_CLIENT_SECRET &&
    process.env.GOOGLE_CALENDAR_REFRESH_TOKEN,
  );
}

function getAuthenticatedClient() {
  const auth = makeOAuth2Client();
  auth.setCredentials({ refresh_token: process.env.GOOGLE_CALENDAR_REFRESH_TOKEN });
  return auth;
}

// ─── Google Calendar template link (fallback) ─────────────────────────────────

function buildTemplateLink(input: CreateSalesCalendarEventInput): string {
  const details = [
    input.description,
    '',
    `CRM record: ${input.entityType}:${input.entityId}`,
  ].join('\n');

  const all = input.attendees?.length
    ? [CALENDAR_ACCOUNT, ...input.attendees.filter((a) => a !== CALENDAR_ACCOUNT)]
    : [CALENDAR_ACCOUNT];

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    authuser: CALENDAR_ACCOUNT,
    text: input.title,
    details,
    dates: `${toGoogleDate(input.startsAt)}/${toGoogleDate(input.endsAt)}`,
    add: all.join(','),
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function toGoogleDate(value: string) {
  return new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

// ─── Provider ─────────────────────────────────────────────────────────────────

class GoogleCalendarProvider implements SalesCalendarProvider {
  async getStatus(): Promise<SalesCalendarProviderStatus> {
    const configured = isConfigured();
    if (!configured) {
      return {
        providerName: 'Google Calendar',
        configured: false,
        mode: 'google_template_link',
        message: 'Not connected — set up Google Calendar to auto-sync events.',
      };
    }

    return {
      providerName: 'Google Calendar',
      configured: true,
      mode: 'google_oauth',
      message: `Auto-syncing to ${CALENDAR_ACCOUNT}`,
    };
  }

  async listEvents(): Promise<SalesCalendarEvent[]> {
    return salesRepository.getCalendarEvents();
  }

  async createEvent(input: CreateSalesCalendarEventInput): Promise<{ gcalEventId?: string }> {
    if (!isConfigured()) return {};

    const auth = getAuthenticatedClient();
    const cal = google.calendar({ version: 'v3', auth });

    const calendarId = process.env.GOOGLE_CALENDAR_CALENDAR_ID ?? 'primary';
    const all = input.attendees?.length
      ? [CALENDAR_ACCOUNT, ...input.attendees.filter((a) => a !== CALENDAR_ACCOUNT)]
      : [CALENDAR_ACCOUNT];

    const res = await cal.events.insert({
      calendarId,
      sendNotifications: true,
      requestBody: {
        summary: input.title,
        description: [
          input.description,
          '',
          `FluxLocatif CRM — ${input.entityType}: ${input.entityId}`,
        ].join('\n'),
        start: { dateTime: input.startsAt, timeZone: 'America/Toronto' },
        end:   { dateTime: input.endsAt,   timeZone: 'America/Toronto' },
        attendees: all.map((email) => ({ email })),
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email',  minutes: 60 },
            { method: 'popup',  minutes: 15 },
          ],
        },
      },
    });

    return { gcalEventId: res.data.id ?? undefined };
  }

  async buildCreateEventLink(input: CreateSalesCalendarEventInput): Promise<SalesCalendarDraftLink> {
    return {
      label: 'Open in Google Calendar',
      href: buildTemplateLink(input),
    };
  }
}

// ─── Singleton ────────────────────────────────────────────────────────────────

export const salesCalendarProvider: SalesCalendarProvider & {
  createEvent(input: CreateSalesCalendarEventInput): Promise<{ gcalEventId?: string }>;
  isConfigured(): boolean;
  makeOAuth2Client(): InstanceType<typeof google.auth.OAuth2>;
} = Object.assign(new GoogleCalendarProvider(), { isConfigured, makeOAuth2Client });
