import {
  differenceInCalendarDays,
  format,
  formatDistanceStrict,
  isSameDay,
  parseISO,
} from 'date-fns';
import { SALES_REFERENCE_DATE, salesStageLabels } from '@/lib/sales/mock-data';
import type {
  SalesCalendarEvent,
  SalesCustomerHealth,
  SalesFit,
  SalesLeadSource,
  SalesOwnerType,
  SalesPipelineStage,
  SalesPropertyType,
  SalesTaskPriority,
} from '@/lib/sales/types';

export function getSalesReferenceDate() {
  return parseISO(SALES_REFERENCE_DATE);
}

export function formatSalesDate(date: string) {
  return format(parseISO(date), 'MMM d');
}

export function formatSalesDateTime(date: string) {
  return format(parseISO(date), 'MMM d, HH:mm');
}

export function formatSalesCurrency(value: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatSalesPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function formatSalesRelative(date: string) {
  return formatDistanceStrict(parseISO(date), getSalesReferenceDate(), {
    addSuffix: true,
  });
}

export function getDaysUntil(date: string) {
  return differenceInCalendarDays(parseISO(date), getSalesReferenceDate());
}

export function isDueToday(date: string) {
  return isSameDay(parseISO(date), getSalesReferenceDate());
}

export function getStageLabel(stage: SalesPipelineStage) {
  return salesStageLabels[stage];
}

export function getStageClasses(stage: SalesPipelineStage) {
  const map: Record<SalesPipelineStage, string> = {
    new_lead: 'border-slate-200 bg-slate-100 text-slate-700',
    contacted: 'border-sky-200 bg-sky-100 text-sky-700',
    replied: 'border-cyan-200 bg-cyan-100 text-cyan-700',
    discovery_scheduled: 'border-indigo-200 bg-indigo-100 text-indigo-700',
    discovery_completed: 'border-violet-200 bg-violet-100 text-violet-700',
    qualified: 'border-emerald-200 bg-emerald-100 text-emerald-700',
    demo_scheduled: 'border-amber-200 bg-amber-100 text-amber-700',
    demo_completed: 'border-orange-200 bg-orange-100 text-orange-700',
    proposal_sent: 'border-blue-200 bg-blue-100 text-blue-700',
    negotiation: 'border-fuchsia-200 bg-fuchsia-100 text-fuchsia-700',
    won: 'border-emerald-300 bg-emerald-100 text-emerald-800',
    lost: 'border-rose-200 bg-rose-100 text-rose-700',
    nurture: 'border-stone-200 bg-stone-100 text-stone-700',
  };

  return map[stage];
}

export function getFitClasses(fit: SalesFit) {
  const map: Record<SalesFit, string> = {
    low: 'border-rose-200 bg-rose-50 text-rose-700',
    medium: 'border-amber-200 bg-amber-50 text-amber-700',
    high: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  };

  return map[fit];
}

export function getPriorityClasses(priority: SalesTaskPriority) {
  const map: Record<SalesTaskPriority, string> = {
    low: 'border-slate-200 bg-slate-50 text-slate-700',
    medium: 'border-sky-200 bg-sky-50 text-sky-700',
    high: 'border-amber-200 bg-amber-50 text-amber-700',
    urgent: 'border-rose-200 bg-rose-50 text-rose-700',
  };

  return map[priority];
}

export function getHealthClasses(health: SalesCustomerHealth) {
  const map: Record<SalesCustomerHealth, string> = {
    healthy: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    watch: 'border-amber-200 bg-amber-50 text-amber-700',
    at_risk: 'border-rose-200 bg-rose-50 text-rose-700',
  };

  return map[health];
}

export function getSourceLabel(source: SalesLeadSource) {
  const map: Record<SalesLeadSource, string> = {
    website: 'Website',
    referral: 'Referral',
    linkedin: 'LinkedIn',
    cold_outreach: 'Cold outreach',
    partner: 'Partner',
    event: 'Event',
    google_ads: 'Google Ads',
  };

  return map[source];
}

export function getOwnerTypeLabel(ownerType: SalesOwnerType) {
  const map: Record<SalesOwnerType, string> = {
    landlord: 'Landlord',
    investor: 'Investor',
    property_manager: 'Property Manager',
    portfolio_owner: 'Portfolio Owner',
  };

  return map[ownerType];
}

export function getPropertyTypeLabel(propertyType: SalesPropertyType) {
  const map: Record<SalesPropertyType, string> = {
    triplex: 'Triplex / small rental',
    small_multifamily: 'Small multifamily',
    large_multifamily: 'Large multifamily',
    mixed_use: 'Mixed-use portfolio',
    condo_portfolio: 'Condo portfolio',
  };

  return map[propertyType];
}

export function getCalendarEventKindLabel(kind: SalesCalendarEvent['kind']) {
  const map: Record<SalesCalendarEvent['kind'], string> = {
    discovery_call: 'Discovery',
    demo: 'Demo',
    follow_up: 'Follow-up',
    task_reminder: 'Reminder',
  };

  return map[kind];
}
