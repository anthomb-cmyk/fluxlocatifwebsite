import {
  addDays,
  compareAsc,
  isAfter,
  isBefore,
  parseISO,
  startOfDay,
} from 'date-fns';
import { buildSalesCalendarCreateLink, listSalesCalendarEvents, listSalesCalendarEventsForEntity } from '@/lib/sales/calendar/service';
import {
  formatSalesCurrency,
  formatSalesPercent,
  getDaysUntil,
  getSalesReferenceDate,
  isDueToday,
} from '@/lib/sales/format';
import { listSalesNotes } from '@/lib/sales/notes/service';
import { salesPipelineStages } from '@/lib/sales/mock-data';
import { salesRepository } from '@/lib/sales/repository';

export async function getSalesNavigationSnapshot() {
  const [leads, tasks] = await Promise.all([
    salesRepository.getLeads(),
    salesRepository.getTasks(),
  ]);

  return {
    leadCount: leads.length,
    openTaskCount: tasks.filter((task) => task.status === 'open').length,
  };
}

export async function getSalesDashboardView() {
  const [leads, deals, tasks, activities, customers, calendarItems] = await Promise.all([
    salesRepository.getLeads(),
    salesRepository.getDeals(),
    salesRepository.getTasks(),
    salesRepository.getActivities(),
    salesRepository.getCustomers(),
    listSalesCalendarEvents(),
  ]);

  const referenceDate = getSalesReferenceDate();
  const start = startOfDay(referenceDate);
  const sevenDaysAgo = addDays(start, -7);

  const recentLeads = leads.filter((lead) => {
    const createdAt = parseISO(lead.createdAt);
    return isAfter(createdAt, sevenDaysAgo) || createdAt.getTime() === sevenDaysAgo.getTime();
  });

  const outreachSent = activities.filter((activity) => activity.type === 'email').length + 8;
  const repliedCount = leads.filter((lead) =>
    ['replied', 'discovery_scheduled', 'discovery_completed', 'qualified', 'demo_scheduled', 'demo_completed', 'proposal_sent', 'negotiation', 'won'].includes(lead.status)
  ).length;
  const callsBooked = calendarItems.filter((event) => event.kind === 'discovery_call').length;
  const demosCompleted = leads.filter((lead) => lead.status === 'demo_completed' || lead.status === 'proposal_sent' || lead.status === 'negotiation' || lead.status === 'won').length;
  const proposalsSent = deals.filter((deal) =>
    ['proposal_sent', 'negotiation', 'won'].includes(deal.dealStage)
  ).length;
  const wonDeals = deals.filter((deal) => deal.dealStage === 'won');
  const lostDeals = deals.filter((deal) => deal.dealStage === 'lost');
  const closableDeals = deals.filter((deal) => !['lost'].includes(deal.dealStage));
  const closeRate = closableDeals.length ? (wonDeals.length / closableDeals.length) * 100 : 0;
  const monthlyRevenueClosed = wonDeals.reduce((total, deal) => total + deal.expectedMonthlyValue, 0);
  const pipelineValue = deals
    .filter((deal) => !['won', 'lost'].includes(deal.dealStage))
    .reduce((total, deal) => total + deal.expectedMonthlyValue, 0);
  const dueToday = tasks.filter((task) => task.status === 'open' && isDueToday(task.dueAt));
  const overdue = tasks.filter((task) => task.status === 'open' && getDaysUntil(task.dueAt) < 0);
  const upcomingCalendarItems = calendarItems
    .filter((item) => isBefore(referenceDate, parseISO(item.startsAt)))
    .sort((left, right) => compareAsc(parseISO(left.startsAt), parseISO(right.startsAt)))
    .slice(0, 4);
  const activeDeals = deals
    .filter((deal) => !['won', 'lost'].includes(deal.dealStage))
    .sort((left, right) => right.closeProbability - left.closeProbability)
    .slice(0, 4);
  const priorityLeads = leads
    .filter((lead) => lead.estimatedFit === 'high' && !['won', 'lost'].includes(lead.status))
    .slice(0, 4);

  return {
    metrics: [
      { id: 'leads', label: 'Leads added', value: String(recentLeads.length), helper: 'Last 7 days' },
      { id: 'outreach', label: 'Outreach sent', value: String(outreachSent), helper: 'Email + outbound touches' },
      { id: 'reply-rate', label: 'Reply rate', value: formatSalesPercent((repliedCount / leads.length) * 100), helper: 'Across active leads' },
      { id: 'calls', label: 'Calls booked', value: String(callsBooked), helper: 'Discovery calls' },
      { id: 'demos', label: 'Demos completed', value: String(demosCompleted), helper: 'Qualified walkthroughs' },
      { id: 'proposals', label: 'Proposals sent', value: String(proposalsSent), helper: 'Live opportunities' },
      { id: 'close-rate', label: 'Close rate', value: formatSalesPercent(closeRate), helper: 'Won vs non-lost deals' },
      { id: 'won', label: 'Won deals', value: String(wonDeals.length), helper: 'Closed this cycle' },
      { id: 'lost', label: 'Lost deals', value: String(lostDeals.length), helper: 'Review reasons weekly' },
      { id: 'mrr', label: 'Monthly revenue closed', value: formatSalesCurrency(monthlyRevenueClosed), helper: 'Committed recurring value' },
      { id: 'pipeline', label: 'Pipeline value', value: formatSalesCurrency(pipelineValue), helper: 'Open opportunity value' },
      { id: 'today', label: 'Tasks due today', value: String(dueToday.length), helper: 'Priority follow-ups' },
      { id: 'overdue', label: 'Overdue follow-ups', value: String(overdue.length), helper: 'Needs attention now' },
      { id: 'calendar', label: 'Upcoming calendar items', value: String(upcomingCalendarItems.length), helper: 'Next meetings + reminders' },
    ],
    activeDeals,
    priorityLeads,
    recentActivities: activities.slice().sort((left, right) => compareAsc(parseISO(right.occurredAt), parseISO(left.occurredAt))).slice(0, 6),
    upcomingCalendarItems,
    dueToday,
    overdue,
    customers,
  };
}

export async function getSalesLeadsIndex() {
  const [leads, deals] = await Promise.all([
    salesRepository.getLeads(),
    salesRepository.getDeals(),
  ]);

  return leads.map((lead) => ({
    ...lead,
    linkedDeal: deals.find((deal) => deal.id === lead.linkedDealId),
  }));
}

export async function getSalesLeadDetail(id: string) {
  const [lead, deals, tasks, activities, notes, calendarItems] = await Promise.all([
    salesRepository.getLead(id),
    salesRepository.getDeals(),
    salesRepository.getTasks(),
    salesRepository.getActivities(),
    listSalesNotes('lead', id),
    listSalesCalendarEventsForEntity('lead', id),
  ]);

  if (!lead) {
    return undefined;
  }

  return {
    lead,
    linkedDeal: deals.find((deal) => deal.id === lead.linkedDealId),
    tasks: tasks.filter((task) => task.leadId === id),
    activities: activities.filter((activity) => activity.leadId === id),
    notes,
    calendarItems,
    scheduleAction: await buildSalesCalendarCreateLink({
      title: `Discovery call - ${lead.companyName}`,
      description: `Discovery call for ${lead.companyName} about leasing pipeline pain points, applicant quality, and response-time gaps.`,
      startsAt: `${lead.nextFollowUpDate}T10:00:00-04:00`,
      endsAt: `${lead.nextFollowUpDate}T10:45:00-04:00`,
      attendees: [lead.email],
      entityType: 'lead',
      entityId: lead.id,
    }),
  };
}

export async function getSalesPipelineBoard() {
  const leads = await salesRepository.getLeads();

  return salesPipelineStages.map((stage) => ({
    id: stage,
    label: stage,
    items: leads.filter((lead) => lead.status === stage),
  }));
}

const TASK_CATEGORY_ORDER = ['follow_up', 'meeting_prep', 'onboarding', 'admin'] as const;

export const salesTaskCategoryLabels: Record<string, string> = {
  follow_up: 'Sales Follow-Up',
  meeting_prep: 'Meeting Prep',
  onboarding: 'Onboarding',
  admin: 'Admin / CRM Updates',
};

function sortByUrgency<T extends { dueAt: string; status: string }>(tasks: T[]): T[] {
  return tasks.slice().sort((a, b) => {
    const aOverdue = getDaysUntil(a.dueAt) < 0;
    const bOverdue = getDaysUntil(b.dueAt) < 0;
    const aToday = isDueToday(a.dueAt);
    const bToday = isDueToday(b.dueAt);

    // Overdue first, then today, then upcoming sorted by date
    const aScore = aOverdue ? 0 : aToday ? 1 : 2;
    const bScore = bOverdue ? 0 : bToday ? 1 : 2;
    if (aScore !== bScore) return aScore - bScore;
    return compareAsc(parseISO(a.dueAt), parseISO(b.dueAt));
  });
}

export async function getSalesTasksView() {
  const [tasks, leads, customers, deals] = await Promise.all([
    salesRepository.getTasks(),
    salesRepository.getLeads(),
    salesRepository.getCustomers(),
    salesRepository.getDeals(),
  ]);

  const enriched = tasks
    .map((task) => ({
      ...task,
      lead: leads.find((lead) => lead.id === task.leadId),
      deal: deals.find((deal) => deal.id === task.dealId),
      customer: customers.find((customer) => customer.id === task.customerId),
    }));

  const open = enriched.filter((task) => task.status === 'open');

  // Group by category, overdue first within each group
  const byCategory = TASK_CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: salesTaskCategoryLabels[cat],
    tasks: sortByUrgency(open.filter((t) => (t.category ?? 'follow_up') === cat)),
  })).filter((g) => g.tasks.length > 0);

  return {
    tasks: enriched,
    open,
    byCategory,
    dueToday: open.filter((task) => isDueToday(task.dueAt)),
    overdue: open.filter((task) => getDaysUntil(task.dueAt) < 0),
  };
}

export async function getSalesCustomersView() {
  const [customers, calendarItems] = await Promise.all([
    salesRepository.getCustomers(),
    listSalesCalendarEvents(),
  ]);

  return customers.map((customer) => ({
    ...customer,
    upcomingItems: calendarItems.filter((item) => item.entityType === 'customer' && item.entityId === customer.id),
  }));
}

export async function getSalesCustomerDetail(id: string) {
  const [customer, leads, tasks, activities, calendarItems] = await Promise.all([
    salesRepository.getCustomer(id),
    salesRepository.getLeads(),
    salesRepository.getTasks(),
    salesRepository.getActivities(),
    listSalesCalendarEvents(),
  ]);

  if (!customer) return undefined;

  const notes = await listSalesNotes('customer', id);

  return {
    customer,
    linkedLead: leads.find((l) => l.id === customer.linkedLeadId),
    tasks: tasks.filter((t) => t.customerId === id),
    activities: activities.filter((a) => a.customerId === id),
    notes,
    calendarItems: calendarItems.filter((e) => e.entityType === 'customer' && e.entityId === id),
  };
}

export async function getSalesCalendarView() {
  const calendarItems = await listSalesCalendarEvents();
  const leads = await salesRepository.getLeads();
  const customers = await salesRepository.getCustomers();

  return calendarItems
    .map((event) => ({
      ...event,
      leadName: event.entityType === 'lead'
        ? leads.find((l) => l.id === event.entityId)?.companyName
        : event.entityType === 'customer'
          ? customers.find((c) => c.id === event.entityId)?.companyName
          : undefined,
    }))
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export async function getSalesDealDetail(id: string) {
  const [deal, leads, tasks, activities, notes, calendarItems] = await Promise.all([
    salesRepository.getDeal(id),
    salesRepository.getLeads(),
    salesRepository.getTasks(),
    salesRepository.getActivities(),
    listSalesNotes('deal', id),
    listSalesCalendarEventsForEntity('deal', id),
  ]);

  if (!deal) {
    return undefined;
  }

  const linkedLead = leads.find((lead) => lead.id === deal.leadId);

  return {
    deal,
    linkedLead,
    tasks: tasks.filter((task) => task.dealId === id),
    activities: activities.filter((activity) => activity.dealId === id),
    notes,
    calendarItems,
    negotiationAction: await buildSalesCalendarCreateLink({
      title: `Proposal review - ${deal.dealName}`,
      description: `Review objections and proposal scope for ${deal.dealName}.`,
      startsAt: `${deal.estimatedCloseDate}T14:00:00-04:00`,
      endsAt: `${deal.estimatedCloseDate}T14:30:00-04:00`,
      attendees: linkedLead ? [linkedLead.email] : [],
      entityType: 'deal',
      entityId: deal.id,
    }),
  };
}

