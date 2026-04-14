'use client';

import { useRef, useState, useTransition } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createTaskAction } from '@/lib/sales/actions';

interface SalesNewTaskDialogProps {
  /** Pre-link the task to a lead */
  defaultLeadId?: string;
  /** Pre-link the task to a customer */
  defaultCustomerId?: string;
  /** Label shown on the trigger button */
  label?: string;
}

export function SalesNewTaskDialog({
  defaultLeadId,
  defaultCustomerId,
  label = 'New task',
}: SalesNewTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await createTaskAction(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setOpen(false);
        formRef.current?.reset();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-8 rounded-full bg-slate-950 px-3 text-xs text-white hover:bg-slate-800">
          <Plus className="h-3.5 w-3.5" />
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="text-[1.1rem] font-semibold tracking-[-0.02em]">Add task</DialogTitle>
        </DialogHeader>
        <form ref={formRef} action={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Task title *</Label>
            <Input id="title" name="title" placeholder="Follow up with Gestion Martel" required className="rounded-xl" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Description</Label>
            <Textarea id="description" name="description" placeholder="What exactly needs to happen?" rows={2} className="resize-none rounded-xl" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="dueAt" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Due date *</Label>
              <Input id="dueAt" name="dueAt" type="date" required className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="priority" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Priority</Label>
              <select id="priority" name="priority" className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950">
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="category" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Category</Label>
            <select id="category" name="category" className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950">
              <option value="follow_up">Sales Follow-Up</option>
              <option value="meeting_prep">Meeting Prep</option>
              <option value="onboarding">Onboarding</option>
              <option value="admin">Admin / CRM Update</option>
            </select>
          </div>

          {/* Hidden pre-linked IDs */}
          {defaultLeadId ? <input type="hidden" name="leadId" value={defaultLeadId} /> : null}
          {defaultCustomerId ? <input type="hidden" name="customerId" value={defaultCustomerId} /> : null}

          {error ? <p className="text-[12px] text-rose-600">{error}</p> : null}

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" className="h-8 rounded-full px-4 text-xs" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="h-8 rounded-full bg-slate-950 px-4 text-xs text-white hover:bg-slate-800">
              {isPending ? 'Adding…' : 'Add task'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
