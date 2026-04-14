'use server';

import { revalidatePath } from 'next/cache';
import { SALES_REFERENCE_DATE } from '@/lib/sales/mock-data';
import { salesRepository } from '@/lib/sales/repository';
import { buildSalesCalendarCreateLink } from '@/lib/sales/calendar/service';
import { salesCalendarProvider } from '@/lib/sales/calendar/provider';
import type {
  SalesCalendarEventKind,
  SalesLeadSource,
  SalesNoteCategory,
  SalesOwnerType,
  SalesPipelineStage,
  SalesPropertyType,
  SalesTaskCategory,
  SalesTaskPriority,
} from '@/lib/sales/types';

function inferTaskCategory(title: string, raw: string | null): SalesTaskCategory {
  if (raw && ['follow_up', 'meeting_prep', 'onboarding', 'admin'].includes(raw)) {
    return raw as SalesTaskCategory;
  }
  const t = title.toLowerCase();
  if (/onboard|kickoff|handoff|welcome|setup|orient/.test(t)) return 'onboarding';
  if (/prep|proposal|deck|present|demo|draft|build|review|negotiat/.test(t)) return 'meeting_prep';
  if (/admin|log|record|update crm|document|note|status/.test(t)) return 'admin';
  return 'follow_up';
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function nowISO() {
  // Use reference date in test context, real date otherwise
  const ref = process.env.NODE_ENV === 'test' ? SALES_REFERENCE_DATE : new Date().toISOString();
  return ref;
}

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Format note content — sanitize and lightly clean the raw input.
 * This function is the hook point for a real LLM/formatting API later:
 * replace the body with a fetch() to your formatting endpoint.
 */
async function formatNoteContent(raw: string): Promise<string> {
  // TODO(notes-api): swap this local formatter for a real API call when ready.
  const trimmed = raw.trim();
  if (!trimmed) return '';

  // Capitalize first character of each sentence
  const formatted = trimmed
    .replace(/^(.)/, (_, c: string) => c.toUpperCase())
    .replace(/([.!?]\s+)(.)/g, (_, punct: string, c: string) => punct + c.toUpperCase());

  return formatted;
}

// ─── Create Lead ─────────────────────────────────────────────────────────────

export async function createLeadAction(formData: FormData) {
  const companyName = String(formData.get('companyName') ?? '').trim();
  const contactPerson = String(formData.get('contactPerson') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const city = String(formData.get('city') ?? '').trim();
  const unitCount = Number(formData.get('unitCount') ?? 0);
  const source = (formData.get('source') as SalesLeadSource) ?? 'website';
  const ownerType = (formData.get('ownerType') as SalesOwnerType) ?? 'landlord';
  const propertyType = (formData.get('propertyType') as SalesPropertyType) ?? 'small_multifamily';
  const estimatedFit = (formData.get('estimatedFit') as 'low' | 'medium' | 'high') ?? 'medium';
  const notes = String(formData.get('notes') ?? '').trim();
  const nextFollowUpDate = String(formData.get('nextFollowUpDate') ?? '').trim() || SALES_REFERENCE_DATE.slice(0, 10);

  if (!companyName || !contactPerson || !email) {
    return { error: 'Company name, contact person, and email are required.' };
  }

  const now = nowISO();

  await salesRepository.createLead({
    id: uid('lead'),
    companyName,
    contactPerson,
    email,
    phone,
    city,
    unitCount,
    source,
    ownerType,
    propertyType,
    estimatedFit,
    notes,
    assignedRep: 'Anthony',
    status: 'new_lead' as SalesPipelineStage,
    lastContactDate: now.slice(0, 10),
    nextFollowUpDate,
    createdAt: now,
  });

  await salesRepository.createActivity({
    id: uid('act'),
    type: 'status_change',
    title: `New lead added: ${companyName}`,
    description: `${contactPerson} from ${city} added as a new lead.`,
    occurredAt: now,
    actor: 'Anthony',
  });

  revalidatePath('/sales/leads');
  revalidatePath('/sales/dashboard');
  revalidatePath('/sales/pipeline');
  return { success: true };
}

// ─── Create Customer ──────────────────────────────────────────────────────────

export async function createCustomerAction(formData: FormData) {
  const companyName = String(formData.get('companyName') ?? '').trim();
  const primaryContact = String(formData.get('primaryContact') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const city = String(formData.get('city') ?? '').trim();
  const unitCount = Number(formData.get('unitCount') ?? 0);
  const ownerType = (formData.get('ownerType') as SalesOwnerType) ?? 'landlord';
  const propertyType = (formData.get('propertyType') as SalesPropertyType) ?? 'small_multifamily';
  const plan = (formData.get('plan') as 'Starter' | 'Growth' | 'Portfolio') ?? 'Starter';
  const monthlyRevenue = Number(formData.get('monthlyRevenue') ?? 0);
  const notes = String(formData.get('notes') ?? '').trim();

  if (!companyName || !primaryContact || !email) {
    return { error: 'Company name, contact, and email are required.' };
  }

  const now = nowISO();

  await salesRepository.createCustomer({
    id: uid('cust'),
    companyName,
    primaryContact,
    email,
    phone,
    city,
    unitCount,
    ownerType,
    propertyType,
    plan,
    monthlyRevenue,
    notes,
    signedDate: now.slice(0, 10),
    health: 'healthy',
    linkedLeadId: '',
    linkedDealId: '',
  });

  await salesRepository.createActivity({
    id: uid('act'),
    type: 'status_change',
    title: `New customer signed: ${companyName}`,
    description: `${primaryContact} onboarded on ${plan} plan.`,
    occurredAt: now,
    actor: 'Anthony',
  });

  revalidatePath('/sales/customers');
  revalidatePath('/sales/dashboard');
  return { success: true };
}

// ─── Create Task ──────────────────────────────────────────────────────────────

export async function createTaskAction(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const dueAt = String(formData.get('dueAt') ?? '').trim();
  const priority = (formData.get('priority') as SalesTaskPriority) ?? 'medium';
  const rawCategory = formData.get('category') as string | null;
  const category = inferTaskCategory(title, rawCategory);
  const leadId = String(formData.get('leadId') ?? '').trim() || undefined;
  const customerId = String(formData.get('customerId') ?? '').trim() || undefined;

  if (!title || !dueAt) {
    return { error: 'Title and due date are required.' };
  }

  await salesRepository.createTask({
    id: uid('task'),
    title,
    description,
    dueAt: `${dueAt}T09:00:00-04:00`,
    status: 'open',
    priority,
    category,
    assignedTo: 'Anthony',
    leadId,
    customerId,
  });

  revalidatePath('/sales/tasks');
  revalidatePath('/sales/dashboard');
  if (leadId) revalidatePath(`/sales/leads/${leadId}`);
  if (customerId) revalidatePath(`/sales/customers/${customerId}`);
  return { success: true };
}

// ─── Create Note ──────────────────────────────────────────────────────────────

export async function createNoteAction(formData: FormData) {
  const entityType = String(formData.get('entityType') ?? '') as 'lead' | 'deal' | 'customer';
  const entityId = String(formData.get('entityId') ?? '').trim();
  const category = (formData.get('category') as SalesNoteCategory) ?? 'lead_note';
  const title = String(formData.get('title') ?? '').trim();
  const rawContent = String(formData.get('content') ?? '').trim();

  if (!title || !rawContent || !entityId) {
    return { error: 'Title and content are required.' };
  }

  // Format the content through the provider abstraction
  const content = await formatNoteContent(rawContent);
  const now = nowISO();

  await salesRepository.createNote({
    id: uid('note'),
    entityType,
    entityId,
    category,
    title,
    content,
    author: 'Anthony',
    createdAt: now,
    tags: [],
  });

  await salesRepository.createActivity({
    id: uid('act'),
    type: 'note',
    title: `Note added: ${title}`,
    description: content.slice(0, 120),
    occurredAt: now,
    actor: 'Anthony',
    leadId: entityType === 'lead' ? entityId : undefined,
    dealId: entityType === 'deal' ? entityId : undefined,
    customerId: entityType === 'customer' ? entityId : undefined,
  });

  revalidatePath('/sales/leads');
  revalidatePath(`/sales/leads/${entityId}`);
  revalidatePath(`/sales/customers/${entityId}`);
  revalidatePath(`/sales/deals/${entityId}`);
  return { success: true };
}

// ─── Mark Task Done ───────────────────────────────────────────────────────────

export async function markTaskDoneAction(taskId: string) {
  await salesRepository.updateTask(taskId, { status: 'done' });
  revalidatePath('/sales/tasks');
  revalidatePath('/sales/dashboard');
  return { success: true };
}

// ─── Create Calendar Event ────────────────────────────────────────────────────

export async function createCalendarEventAction(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const date = String(formData.get('date') ?? '').trim();          // YYYY-MM-DD
  const startTime = String(formData.get('startTime') ?? '09:00');  // HH:MM
  const durationMin = Number(formData.get('duration') ?? 45);
  const kind = (formData.get('kind') as SalesCalendarEventKind) ?? 'follow_up';
  const attendeeEmail = String(formData.get('attendeeEmail') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();

  if (!title || !date) return { error: 'Title and date are required.' };

  const startsAt = `${date}T${startTime}:00-04:00`;
  const endDate = new Date(`${date}T${startTime}:00`);
  endDate.setMinutes(endDate.getMinutes() + durationMin);
  const endsAt = `${date}T${endDate.toTimeString().slice(0, 5)}:00-04:00`;

  const eventId = uid('calendar');
  const attendees = attendeeEmail
    ? ['anthony@fluxlocatif.com', attendeeEmail]
    : ['anthony@fluxlocatif.com'];

  const input = {
    title,
    description,
    startsAt,
    endsAt,
    attendees,
    entityType: 'lead' as const,
    entityId: eventId,
  };

  // Try to push directly to Google Calendar
  let status: 'scheduled' | 'pending_integration' = 'pending_integration';
  let gcalHref: string | undefined;

  if (salesCalendarProvider.isConfigured()) {
    try {
      await salesCalendarProvider.createEvent!(input);
      status = 'scheduled';
    } catch (err) {
      console.error('[GCal] Failed to create event:', err);
      // Fall through — save to CRM and return link fallback
      const link = await buildSalesCalendarCreateLink(input);
      gcalHref = link.href;
    }
  } else {
    // Not connected yet — return fallback link
    const link = await buildSalesCalendarCreateLink(input);
    gcalHref = link.href;
  }

  await salesRepository.createCalendarEvent({
    id: eventId,
    provider: 'google_calendar',
    title,
    description,
    startsAt,
    endsAt,
    kind,
    status,
    entityType: 'lead',
    entityId: '',
    attendees,
  });

  revalidatePath('/sales/calendar');
  revalidatePath('/sales/dashboard');
  return { success: true, gcalHref, autoSynced: status === 'scheduled' };
}
