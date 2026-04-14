import type { ClientStatus, PropertyStatus, CandidateStatus, PipelineStage, TaskPriority } from './data';

// Status color mappings for badges/pills
export function getClientStatusColor(status: ClientStatus): string {
  const map: Record<ClientStatus, string> = {
    lead: 'bg-slate-100 text-slate-700',
    contacted: 'bg-blue-50 text-blue-700',
    call_scheduled: 'bg-blue-50 text-blue-700',
    onboarding: 'bg-amber-50 text-amber-700',
    active: 'bg-emerald-50 text-emerald-700',
    paused: 'bg-slate-100 text-slate-500',
    closed: 'bg-slate-100 text-slate-400',
  };
  return map[status];
}

export function getPropertyStatusColor(status: PropertyStatus): string {
  const map: Record<PropertyStatus, string> = {
    to_launch: 'bg-slate-100 text-slate-700',
    active: 'bg-emerald-50 text-emerald-700',
    low_demand: 'bg-amber-50 text-amber-700',
    qualifying: 'bg-blue-50 text-blue-700',
    visits_in_progress: 'bg-blue-50 text-blue-700',
    waiting_on_client: 'bg-amber-50 text-amber-700',
    rented: 'bg-emerald-50 text-emerald-700',
    closed: 'bg-slate-100 text-slate-400',
  };
  return map[status];
}

export function getCandidateStatusColor(status: CandidateStatus): string {
  const map: Record<CandidateStatus, string> = {
    new: 'bg-slate-100 text-slate-700',
    to_qualify: 'bg-slate-100 text-slate-700',
    qualifying: 'bg-blue-50 text-blue-700',
    prequalified: 'bg-emerald-50 text-emerald-700',
    to_present: 'bg-blue-50 text-blue-700',
    presented: 'bg-amber-50 text-amber-700',
    rejected: 'bg-red-50 text-red-600',
    selected: 'bg-emerald-50 text-emerald-700',
    visit_to_schedule: 'bg-blue-50 text-blue-700',
  };
  return map[status];
}

export function getPipelineStageColor(stage: PipelineStage): string {
  const map: Record<PipelineStage, string> = {
    new_message: 'bg-slate-100 text-slate-700',
    initial_triage: 'bg-slate-100 text-slate-700',
    missing_info: 'bg-amber-50 text-amber-700',
    prequalified: 'bg-emerald-50 text-emerald-700',
    to_review: 'bg-blue-50 text-blue-700',
    presented_to_client: 'bg-blue-50 text-blue-700',
    visit: 'bg-blue-50 text-blue-700',
    decision: 'bg-amber-50 text-amber-700',
    signed: 'bg-emerald-50 text-emerald-700',
    rejected: 'bg-red-50 text-red-600',
  };
  return map[stage];
}

export function getTaskPriorityColor(priority: TaskPriority): string {
  const map: Record<TaskPriority, string> = {
    low: 'text-slate-400',
    medium: 'text-slate-600',
    high: 'text-amber-500',
    urgent: 'text-red-500',
  };
  return map[priority];
}

export function getDaysColor(days: number): string {
  if (days >= 8) return 'text-red-500';
  if (days >= 4) return 'text-amber-500';
  return 'text-slate-400';
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 }).format(amount);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-CA', { day: 'numeric', month: 'short' });
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-CA', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export function timeAgo(dateStr: string): string {
  const now = new Date('2026-04-13T12:00:00');
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'À l\'instant';
  if (diffHours < 24) return `il y a ${diffHours}h`;
  if (diffDays === 1) return 'Hier';
  return `il y a ${diffDays}j`;
}

export function renderStars(level: number): string {
  return '★'.repeat(level) + '☆'.repeat(3 - level);
}
