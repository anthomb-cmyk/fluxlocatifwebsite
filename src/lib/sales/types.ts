export type SalesPipelineStage =
  | 'new_lead'
  | 'contacted'
  | 'replied'
  | 'discovery_scheduled'
  | 'discovery_completed'
  | 'qualified'
  | 'demo_scheduled'
  | 'demo_completed'
  | 'proposal_sent'
  | 'negotiation'
  | 'won'
  | 'lost'
  | 'nurture';

export type SalesFit = 'low' | 'medium' | 'high';
export type SalesTaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type SalesTaskStatus = 'open' | 'done';
export type SalesTaskCategory = 'follow_up' | 'meeting_prep' | 'onboarding' | 'admin';
export type SalesOwnerType =
  | 'landlord'
  | 'investor'
  | 'property_manager'
  | 'portfolio_owner';
export type SalesPropertyType =
  | 'triplex'
  | 'small_multifamily'
  | 'large_multifamily'
  | 'mixed_use'
  | 'condo_portfolio';
export type SalesLeadSource =
  | 'website'
  | 'referral'
  | 'linkedin'
  | 'cold_outreach'
  | 'partner'
  | 'event'
  | 'google_ads';
export type SalesActivityType =
  | 'email'
  | 'call'
  | 'meeting'
  | 'task'
  | 'proposal'
  | 'note'
  | 'status_change';
export type SalesEntityType = 'lead' | 'deal' | 'customer';
export type SalesNoteCategory =
  | 'lead_note'
  | 'call_note'
  | 'objection'
  | 'meeting_note'
  | 'follow_up_note'
  | 'customer_note';
export type SalesCalendarEventKind =
  | 'discovery_call'
  | 'demo'
  | 'follow_up'
  | 'task_reminder';
export type SalesCalendarEventStatus = 'scheduled' | 'draft' | 'pending_integration';
export type SalesCustomerHealth = 'healthy' | 'watch' | 'at_risk';

export interface SalesLead {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  source: SalesLeadSource;
  propertyType: SalesPropertyType;
  unitCount: number;
  city: string;
  ownerType: SalesOwnerType;
  notes: string;
  assignedRep: string;
  status: SalesPipelineStage;
  lastContactDate: string;
  nextFollowUpDate: string;
  estimatedFit: SalesFit;
  linkedDealId?: string;
  createdAt: string;
}

export interface SalesTask {
  id: string;
  title: string;
  description: string;
  dueAt: string;
  status: SalesTaskStatus;
  priority: SalesTaskPriority;
  category: SalesTaskCategory;
  assignedTo: string;
  leadId?: string;
  dealId?: string;
  customerId?: string;
}

export interface SalesDeal {
  id: string;
  dealName: string;
  leadId: string;
  expectedMonthlyValue: number;
  estimatedCloseDate: string;
  selectedPlan: 'Starter' | 'Growth' | 'Portfolio';
  closeProbability: number;
  dealStage: SalesPipelineStage;
  objections: string[];
  notes: string;
}

export interface SalesCustomer {
  id: string;
  companyName: string;
  primaryContact: string;
  phone: string;
  email: string;
  city: string;
  ownerType: SalesOwnerType;
  propertyType: SalesPropertyType;
  unitCount: number;
  plan: 'Starter' | 'Growth' | 'Portfolio';
  signedDate: string;
  monthlyRevenue: number;
  linkedLeadId: string;
  linkedDealId: string;
  notes: string;
  health: SalesCustomerHealth;
}

export interface SalesActivity {
  id: string;
  type: SalesActivityType;
  title: string;
  description: string;
  occurredAt: string;
  actor: string;
  leadId?: string;
  dealId?: string;
  customerId?: string;
}

export interface SalesNote {
  id: string;
  entityType: SalesEntityType;
  entityId: string;
  category: SalesNoteCategory;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags: string[];
}

export interface SalesCalendarEvent {
  id: string;
  provider: 'google_calendar';
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  kind: SalesCalendarEventKind;
  status: SalesCalendarEventStatus;
  entityType: SalesEntityType;
  entityId: string;
  attendees: string[];
  location?: string;
  meetingUrl?: string;
}

export interface SalesDashboardMetric {
  id: string;
  label: string;
  value: string;
  helper: string;
}

