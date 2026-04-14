'use client';

import { useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Plus, X, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCalendarEventKindLabel } from '@/lib/sales/format';
import { createCalendarEventAction } from '@/lib/sales/actions';
import type { SalesCalendarEvent } from '@/lib/sales/types';

type CalendarView = 'month' | 'week' | 'list';
type EnrichedEvent = SalesCalendarEvent & { leadName?: string };

// ─── Date helpers ─────────────────────────────────────────────────────────────

function toLocalDateKey(isoString: string) {
  return isoString.slice(0, 10);
}

function dateKey(date: Date) {
  return date.toLocaleDateString('en-CA'); // YYYY-MM-DD
}

function getMondayOf(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekDays(monday: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function getMonthGrid(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  const totalDays = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;
  const grid: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) grid.push(null);
  for (let d = 1; d <= totalDays; d++) grid.push(new Date(year, month, d));
  while (grid.length % 7 !== 0) grid.push(null);
  return grid;
}

function formatDayFull(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

function formatTime(isoString: string) {
  const [h, m] = isoString.slice(11, 16).split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`;
}

function entityHref(event: EnrichedEvent) {
  if (event.entityType === 'lead' && event.entityId) return `/sales/leads/${event.entityId}`;
  if (event.entityType === 'customer' && event.entityId) return `/sales/customers/${event.entityId}`;
  if (event.entityType === 'deal' && event.entityId) return `/sales/deals/${event.entityId}`;
  return null;
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_ABBR = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

// ─── Kind colors ──────────────────────────────────────────────────────────────

const KIND_DOT: Record<string, string> = {
  discovery_call: 'bg-sky-500',
  demo:           'bg-indigo-500',
  follow_up:      'bg-amber-400',
  task_reminder:  'bg-emerald-500',
};

const KIND_PILL: Record<string, string> = {
  discovery_call: 'bg-sky-50 text-sky-700 border-sky-200',
  demo:           'bg-indigo-50 text-indigo-700 border-indigo-200',
  follow_up:      'bg-amber-50 text-amber-700 border-amber-200',
  task_reminder:  'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const KIND_CARD: Record<string, string> = {
  discovery_call: 'border-l-sky-400',
  demo:           'border-l-indigo-400',
  follow_up:      'border-l-amber-400',
  task_reminder:  'border-l-emerald-400',
};

// ─── New event form (shown inside the day panel) ───────────────────────────────

function NewEventForm({
  defaultDate,
  onSuccess,
  onCancel,
  isConnected,
}: {
  defaultDate: string;
  onSuccess: (result: { gcalHref?: string; autoSynced?: boolean }) => void;
  onCancel: () => void;
  isConnected?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await createCalendarEventAction(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        formRef.current?.reset();
        onSuccess({ gcalHref: result.gcalHref, autoSynced: result.autoSynced });
      }
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="mt-4 space-y-3 rounded-[18px] border border-slate-200 bg-slate-50/60 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">New event</p>

      {/* Title */}
      <input
        name="title"
        required
        placeholder="Event title"
        className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
      />

      {/* Date + time */}
      <div className="grid grid-cols-3 gap-2">
        <input
          name="date"
          type="date"
          defaultValue={defaultDate}
          required
          className="col-span-1 h-9 rounded-xl border border-slate-200 bg-white px-3 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
        <input
          name="startTime"
          type="time"
          defaultValue="09:00"
          className="col-span-1 h-9 rounded-xl border border-slate-200 bg-white px-3 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
        <select
          name="duration"
          className="col-span-1 h-9 rounded-xl border border-slate-200 bg-white px-3 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="30">30 min</option>
          <option value="45" selected>45 min</option>
          <option value="60">1 hour</option>
          <option value="90">1.5 hours</option>
        </select>
      </div>

      {/* Kind + attendee */}
      <div className="grid grid-cols-2 gap-2">
        <select
          name="kind"
          className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="discovery_call">Discovery call</option>
          <option value="demo">Demo</option>
          <option value="follow_up">Follow-up</option>
          <option value="task_reminder">Reminder</option>
        </select>
        <input
          name="attendeeEmail"
          type="email"
          placeholder="Attendee email"
          className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      {/* Description */}
      <textarea
        name="description"
        placeholder="Notes (optional)"
        rows={2}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
      />

      {error && <p className="text-[12px] text-rose-600">{error}</p>}

      <p className="text-[11px] text-slate-400">
        {isConnected
          ? <>Saved to CRM and <span className="font-medium text-emerald-600">auto-synced</span> to <span className="font-medium text-slate-600">anthony@fluxlocatif.com</span></>
          : <>Saved to CRM — <Link href="/sales/calendar/setup" className="font-medium text-amber-600 hover:underline">connect Google Calendar</Link> to auto-sync</>
        }
      </p>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-[12px] font-medium text-white hover:bg-slate-700 transition-colors disabled:opacity-50"
        >
          {isConnected ? null : <ExternalLink className="h-3 w-3" />}
          {isPending ? 'Saving…' : isConnected ? 'Save event' : 'Save & open in Google Calendar'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-slate-200 px-4 py-1.5 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ─── Day detail slide panel ────────────────────────────────────────────────────

function DayPanel({
  dateKey: key,
  events,
  onClose,
  isConnected,
}: {
  dateKey: string;
  events: EnrichedEvent[];
  onClose: () => void;
  isConnected?: boolean;
}) {
  const [showForm, setShowForm] = useState(false);

  function handleSuccess({ gcalHref, autoSynced }: { gcalHref?: string; autoSynced?: boolean }) {
    setShowForm(false);
    // If not auto-synced, open fallback link so the event gets into Google Calendar
    if (!autoSynced && gcalHref) window.open(gcalHref, '_blank', 'noopener');
  }

  const sorted = [...events].sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.08)] overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Schedule</p>
          <p className="mt-0.5 text-[15px] font-semibold text-slate-900">{formatDayFull(key)}</p>
        </div>
        <div className="flex items-center gap-2">
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-[12px] font-medium text-white hover:bg-slate-700 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add event
            </button>
          )}
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Events */}
      <div className="px-5 pb-5 pt-4">
        {sorted.length === 0 && !showForm && (
          <p className="text-[13px] text-slate-400">No events — add one below.</p>
        )}
        {sorted.length > 0 && (
          <div className="space-y-2">
            {sorted.map((event) => {
              const href = entityHref(event);
              const cardColor = KIND_CARD[event.kind] ?? 'border-l-slate-300';
              const pillColor = KIND_PILL[event.kind] ?? 'bg-slate-100 text-slate-600 border-slate-200';
              return (
                <div key={event.id} className={cn('rounded-[16px] border border-slate-200 border-l-2 px-4 py-3', cardColor)}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[13px] font-semibold text-slate-900 leading-snug">{event.title}</p>
                    <span className={cn('shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]', pillColor)}>
                      {getCalendarEventKindLabel(event.kind)}
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[12px] text-slate-400">
                    <span>{formatTime(event.startsAt)} – {formatTime(event.endsAt)}</span>
                    {event.location && <span>· {event.location}</span>}
                    {event.meetingUrl && (
                      <a href={event.meetingUrl} target="_blank" rel="noopener" className="flex items-center gap-1 text-sky-600 hover:underline">
                        <ExternalLink className="h-3 w-3" />Join
                      </a>
                    )}
                  </div>
                  {event.leadName && (
                    <p className="mt-1 text-[12px] text-slate-500">
                      {href ? (
                        <Link href={href} className="font-medium text-slate-700 underline-offset-4 hover:underline">
                          {event.leadName}
                        </Link>
                      ) : event.leadName}
                    </p>
                  )}
                  {event.attendees?.filter(a => a !== 'anthony@fluxlocatif.com').length ? (
                    <p className="mt-1 text-[11px] text-slate-400">{event.attendees.filter(a => a !== 'anthony@fluxlocatif.com').join(', ')}</p>
                  ) : null}
                  {event.status === 'pending_integration' && (
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-600">Pending Google Calendar sync</p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {showForm && (
          <NewEventForm
            defaultDate={key}
            onSuccess={handleSuccess}
            onCancel={() => setShowForm(false)}
            isConnected={isConnected}
          />
        )}

        {!showForm && sorted.length > 0 && (
          <button
            onClick={() => setShowForm(true)}
            className="mt-3 flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Add another event
          </button>
        )}
      </div>
    </div>
  );
}

// ─── EventCard — compact card for week list ───────────────────────────────────

function EventCard({ event }: { event: EnrichedEvent }) {
  const href = entityHref(event);
  const cardColor = KIND_CARD[event.kind] ?? 'border-l-slate-300';
  const pillColor = KIND_PILL[event.kind] ?? 'bg-slate-100 text-slate-600 border-slate-200';

  return (
    <div className={cn('rounded-[14px] border border-slate-200 border-l-2 px-3 py-2.5', cardColor)}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] font-semibold text-slate-900 leading-snug">{event.title}</p>
        <span className={cn('shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]', pillColor)}>
          {getCalendarEventKindLabel(event.kind)}
        </span>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
        <span>{formatTime(event.startsAt)} – {formatTime(event.endsAt)}</span>
        {event.location ? <span>· {event.location}</span> : null}
      </div>
      {event.leadName && (
        <p className="mt-1 text-[11px] text-slate-500">
          {href ? (
            <Link href={href} className="font-medium text-slate-600 underline-offset-4 hover:underline">
              {event.leadName}
            </Link>
          ) : event.leadName}
        </p>
      )}
    </div>
  );
}

// ─── Month view ───────────────────────────────────────────────────────────────

function MonthView({
  events,
  todayKey,
  onDaySelect,
  selectedKey,
}: {
  events: EnrichedEvent[];
  todayKey: string;
  onDaySelect: (key: string) => void;
  selectedKey: string | null;
}) {
  const todayDate = new Date(todayKey + 'T12:00:00');
  const [year, setYear] = useState(todayDate.getFullYear());
  const [month, setMonth] = useState(todayDate.getMonth());

  const grid = getMonthGrid(year, month);

  const byDay = new Map<string, EnrichedEvent[]>();
  for (const e of events) {
    const k = toLocalDateKey(e.startsAt);
    if (!byDay.has(k)) byDay.set(k, []);
    byDay.get(k)!.push(e);
  }

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  }
  function goToday() {
    setYear(todayDate.getFullYear());
    setMonth(todayDate.getMonth());
    onDaySelect(todayKey);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={goToday} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">Today</button>
        <button onClick={prevMonth} className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"><ChevronLeft className="h-4 w-4" /></button>
        <button onClick={nextMonth} className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"><ChevronRight className="h-4 w-4" /></button>
        <p className="text-[13px] font-semibold text-slate-700">{MONTH_NAMES[month]} {year}</p>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        {/* Weekday header */}
        <div className="grid grid-cols-7 border-b border-slate-100">
          {DAY_ABBR.map((d) => (
            <div key={d} className="py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {grid.map((day, i) => {
            const key = day ? dateKey(day) : `empty-${i}`;
            const isToday = day ? key === todayKey : false;
            const isSelected = day ? key === selectedKey : false;
            const dayEvents = day ? (byDay.get(key) ?? []) : [];
            const visible = dayEvents.slice(0, 2);
            const overflow = dayEvents.length - visible.length;

            return (
              <div
                key={key}
                onClick={() => day && onDaySelect(isSelected ? '' : key)}
                className={cn(
                  'group relative min-h-[88px] border-b border-r border-slate-100 p-2 transition-colors',
                  '[&:nth-child(7n)]:border-r-0',
                  day ? 'cursor-pointer' : 'bg-slate-50/30 pointer-events-none',
                  day && !isToday && !isSelected && 'hover:bg-slate-50',
                  isToday && !isSelected && 'bg-amber-50/50',
                  isSelected && 'bg-slate-900 text-white',
                )}
              >
                {day && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-semibold',
                        isSelected ? 'bg-white text-slate-900' : isToday ? 'bg-slate-900 text-white' : 'text-slate-700'
                      )}>
                        {day.getDate()}
                      </span>
                      {/* + on hover */}
                      <span className={cn(
                        'hidden h-5 w-5 items-center justify-center rounded-full text-slate-400 transition-colors group-hover:flex',
                        isSelected ? 'text-white/60' : 'hover:bg-slate-100 hover:text-slate-700'
                      )}>
                        <Plus className="h-3 w-3" />
                      </span>
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {visible.map((event) => {
                        const dot = KIND_DOT[event.kind] ?? 'bg-slate-400';
                        const pill = isSelected
                          ? 'bg-white/20 text-white border-white/30'
                          : KIND_PILL[event.kind] ?? 'bg-slate-100 text-slate-600 border-slate-200';
                        return (
                          <div key={event.id} className={cn('flex items-center gap-1 rounded-md border px-1 py-0.5 text-[10px] font-medium leading-tight', pill)}>
                            <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', isSelected ? 'bg-white' : dot)} />
                            <span className="truncate">{event.title}</span>
                          </div>
                        );
                      })}
                      {overflow > 0 && (
                        <p className={cn('pl-1 text-[10px] font-medium', isSelected ? 'text-white/60' : 'text-slate-400')}>+{overflow} more</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Week view ────────────────────────────────────────────────────────────────

function WeekView({
  events,
  todayKey,
  onDaySelect,
}: {
  events: EnrichedEvent[];
  todayKey: string;
  onDaySelect: (key: string) => void;
}) {
  const today = new Date(todayKey + 'T12:00:00');
  const [monday, setMonday] = useState(() => getMondayOf(today));

  const weekDays = getWeekDays(monday);
  const sunday = weekDays[6];

  const label = monday.getMonth() === sunday.getMonth()
    ? `${MONTH_NAMES[monday.getMonth()]} ${monday.getDate()}–${sunday.getDate()}, ${monday.getFullYear()}`
    : `${MONTH_NAMES[monday.getMonth()]} ${monday.getDate()} – ${MONTH_NAMES[sunday.getMonth()]} ${sunday.getDate()}, ${monday.getFullYear()}`;

  const byDay = new Map<string, EnrichedEvent[]>();
  for (const e of events) {
    const k = toLocalDateKey(e.startsAt);
    if (!byDay.has(k)) byDay.set(k, []);
    byDay.get(k)!.push(e);
  }

  function prevWeek() { const d = new Date(monday); d.setDate(d.getDate() - 7); setMonday(d); }
  function nextWeek() { const d = new Date(monday); d.setDate(d.getDate() + 7); setMonday(d); }
  function goToday()  { setMonday(getMondayOf(today)); }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={goToday} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">Today</button>
        <button onClick={prevWeek} className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"><ChevronLeft className="h-4 w-4" /></button>
        <button onClick={nextWeek} className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors"><ChevronRight className="h-4 w-4" /></button>
        <p className="text-[13px] font-semibold text-slate-700">{label}</p>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => {
          const key = dateKey(day);
          const isToday = key === todayKey;
          const dayEvents = (byDay.get(key) ?? []).sort((a, b) => a.startsAt.localeCompare(b.startsAt));
          const dayLabel = DAY_ABBR[(day.getDay() + 6) % 7];

          return (
            <div
              key={key}
              className={cn(
                'group min-h-[160px] cursor-pointer rounded-[18px] border p-3 transition-colors hover:border-slate-300',
                isToday ? 'border-slate-900 bg-slate-50/60' : 'border-slate-200 bg-white'
              )}
              onClick={() => onDaySelect(key)}
            >
              <div className="mb-2 flex flex-col items-center gap-0.5">
                <span className={cn('text-[10px] font-semibold uppercase tracking-[0.16em]', isToday ? 'text-slate-500' : 'text-slate-400')}>{dayLabel}</span>
                <span className={cn('flex h-7 w-7 items-center justify-center rounded-full text-[14px] font-semibold', isToday ? 'bg-slate-900 text-white' : 'text-slate-700')}>
                  {day.getDate()}
                </span>
              </div>

              {dayEvents.length === 0 ? (
                <div className="flex flex-col items-center gap-1 pt-4">
                  <p className="text-center text-[10px] text-slate-300">—</p>
                  <span className="hidden text-[10px] text-slate-400 group-hover:block">+ Add</span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {dayEvents.map((event) => {
                    const pill = KIND_PILL[event.kind] ?? 'bg-slate-100 text-slate-600 border-slate-200';
                    const dot  = KIND_DOT[event.kind] ?? 'bg-slate-400';
                    return (
                      <div key={event.id} className={cn('rounded-[10px] border px-2 py-1.5', pill)}>
                        <p className="text-[10px] font-semibold leading-snug line-clamp-2">{event.title}</p>
                        <p className="mt-0.5 text-[10px] opacity-70">{formatTime(event.startsAt)}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── List view ────────────────────────────────────────────────────────────────

function ListView({ events, onDaySelect }: { events: EnrichedEvent[]; onDaySelect: (key: string) => void }) {
  const grouped = new Map<string, EnrichedEvent[]>();
  for (const e of [...events].sort((a, b) => a.startsAt.localeCompare(b.startsAt))) {
    const k = toLocalDateKey(e.startsAt);
    if (!grouped.has(k)) grouped.set(k, []);
    grouped.get(k)!.push(e);
  }

  if (grouped.size === 0) {
    return (
      <div className="rounded-[24px] border border-slate-200 bg-white px-6 py-14 text-center">
        <p className="text-[13px] text-slate-400">No events yet. Click any date to add one.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {[...grouped.entries()].map(([dateStr, dayEvents]) => {
        const d = new Date(dateStr + 'T12:00:00');
        const label = `${DAY_ABBR[(d.getDay() + 6) % 7]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
        return (
          <div key={dateStr}>
            <div className="mb-3 flex items-center gap-3">
              <button
                onClick={() => onDaySelect(dateStr)}
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 hover:text-slate-700 transition-colors"
              >
                {label}
              </button>
              <div className="h-px flex-1 bg-slate-100" />
              <span className="text-[11px] text-slate-400">{dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="space-y-2">
              {dayEvents.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

interface SalesCalendarClientProps {
  events: EnrichedEvent[];
  todayKey: string;
  statusMessage: string;
  isConnected?: boolean;
}

export function SalesCalendarClient({ events, todayKey, statusMessage, isConnected }: SalesCalendarClientProps) {
  const [view, setView] = useState<CalendarView>('week');
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const byDay = new Map<string, EnrichedEvent[]>();
  for (const e of events) {
    const k = toLocalDateKey(e.startsAt);
    if (!byDay.has(k)) byDay.set(k, []);
    byDay.get(k)!.push(e);
  }

  function handleDaySelect(key: string) {
    setSelectedKey(prev => (prev === key || !key) ? null : key);
  }

  const tabs: { key: CalendarView; label: string }[] = [
    { key: 'month', label: 'Month' },
    { key: 'week',  label: 'Week' },
    { key: 'list',  label: 'List' },
  ];

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-xl bg-slate-100/80 p-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => { setView(t.key); setSelectedKey(null); }}
                className={cn(
                  'rounded-[10px] px-4 py-1.5 text-[13px] font-medium transition-colors',
                  view === t.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-[12px] text-slate-400">{statusMessage}</p>
          <button
            onClick={() => { setSelectedKey('__new__'); }}
            className="flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-[12px] font-medium text-white hover:bg-slate-700 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            New event
          </button>
        </div>
      </div>

      {/* Quick new event from toolbar button */}
      {selectedKey === '__new__' && (
        <div className="rounded-[24px] border border-slate-200 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.08)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <p className="text-[15px] font-semibold text-slate-900">New event</p>
            <button onClick={() => setSelectedKey(null)} className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="px-5 pb-5 pt-0">
            <NewEventForm
              defaultDate={todayKey}
              onSuccess={({ gcalHref, autoSynced }) => { setSelectedKey(null); if (!autoSynced && gcalHref) window.open(gcalHref, '_blank', 'noopener'); }}
              onCancel={() => setSelectedKey(null)}
              isConnected={isConnected}
            />
          </div>
        </div>
      )}

      {/* View */}
      {view === 'month' && (
        <MonthView
          events={events}
          todayKey={todayKey}
          onDaySelect={handleDaySelect}
          selectedKey={selectedKey !== '__new__' ? selectedKey : null}
        />
      )}
      {view === 'week' && (
        <WeekView events={events} todayKey={todayKey} onDaySelect={handleDaySelect} />
      )}
      {view === 'list' && (
        <ListView events={events} onDaySelect={handleDaySelect} />
      )}

      {/* Day detail panel — shown below grid for all views */}
      {selectedKey && selectedKey !== '__new__' && (
        <DayPanel
          dateKey={selectedKey}
          events={byDay.get(selectedKey) ?? []}
          onClose={() => setSelectedKey(null)}
          isConnected={isConnected}
        />
      )}
    </div>
  );
}
