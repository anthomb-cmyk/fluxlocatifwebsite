'use client';

import { useRef, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  SalesPanel,
  SalesPanelBody,
  SalesPanelEyebrow,
  SalesPanelHeader,
  SalesPanelTitle,
} from '@/components/sales/sales-panel';
import { createNoteAction } from '@/lib/sales/actions';

const NOTE_CATEGORIES = [
  { value: 'lead_note', label: 'Lead note' },
  { value: 'call_summary', label: 'Call summary' },
  { value: 'meeting_summary', label: 'Meeting summary' },
  { value: 'proposal_note', label: 'Proposal note' },
  { value: 'objection', label: 'Objection' },
  { value: 'win_loss_note', label: 'Win/loss' },
  { value: 'general', label: 'General' },
] as const;

interface SalesAddNoteFormProps {
  entityType: 'lead' | 'deal' | 'customer';
  entityId: string;
}

export function SalesAddNoteForm({ entityType, entityId }: SalesAddNoteFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      const result = await createNoteAction(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        formRef.current?.reset();
        setTimeout(() => setSuccess(false), 3000);
      }
    });
  }

  return (
    <SalesPanel>
      <SalesPanelHeader className="space-y-1">
        <SalesPanelEyebrow>Add note</SalesPanelEyebrow>
        <SalesPanelTitle>Log a call, meeting, or observation</SalesPanelTitle>
      </SalesPanelHeader>
      <SalesPanelBody className="pt-0">
        <form ref={formRef} action={handleSubmit} className="space-y-4">
          <input type="hidden" name="entityType" value={entityType} />
          <input type="hidden" name="entityId" value={entityId} />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="note-title" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Title *
              </Label>
              <Input
                id="note-title"
                name="title"
                placeholder="Discovery call recap"
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="note-category" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Category
              </Label>
              <select
                id="note-category"
                name="category"
                className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
              >
                {NOTE_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note-content" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              Content *
            </Label>
            <Textarea
              id="note-content"
              name="content"
              placeholder="What happened? Key objections, next steps, tone of the conversation..."
              rows={4}
              required
              className="resize-none rounded-xl"
            />
            <p className="text-[11px] text-slate-400">Notes are auto-formatted before saving.</p>
          </div>

          {error ? <p className="text-[12px] text-rose-600">{error}</p> : null}
          {success ? (
            <p className="text-[12px] text-emerald-600">Note saved successfully.</p>
          ) : null}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="h-8 rounded-full bg-slate-950 px-4 text-xs text-white hover:bg-slate-800"
            >
              {isPending ? 'Saving…' : 'Save note'}
            </Button>
          </div>
        </form>
      </SalesPanelBody>
    </SalesPanel>
  );
}
