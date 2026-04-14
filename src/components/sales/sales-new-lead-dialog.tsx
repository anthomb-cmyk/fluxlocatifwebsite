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
import { createLeadAction } from '@/lib/sales/actions';

export function SalesNewLeadDialog() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await createLeadAction(formData);
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
          New lead
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="text-[1.1rem] font-semibold tracking-[-0.02em]">Add new lead</DialogTitle>
        </DialogHeader>
        <form ref={formRef} action={handleSubmit} className="space-y-4 pt-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="companyName" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Company name *</Label>
              <Input id="companyName" name="companyName" placeholder="Gestion Martel" required className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contactPerson" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Contact person *</Label>
              <Input id="contactPerson" name="contactPerson" placeholder="Mylene Martel" required className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Email *</Label>
              <Input id="email" name="email" type="email" placeholder="mylene@example.ca" required className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Phone</Label>
              <Input id="phone" name="phone" placeholder="514-555-0000" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="city" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">City</Label>
              <Input id="city" name="city" placeholder="Montreal" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="unitCount" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Unit count</Label>
              <Input id="unitCount" name="unitCount" type="number" min={1} placeholder="12" className="rounded-xl" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="source" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Source</Label>
              <select id="source" name="source" className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950">
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="linkedin">LinkedIn</option>
                <option value="cold_outreach">Cold outreach</option>
                <option value="partner">Partner</option>
                <option value="event">Event</option>
                <option value="google_ads">Google Ads</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="estimatedFit" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Estimated fit</Label>
              <select id="estimatedFit" name="estimatedFit" className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ownerType" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Owner type</Label>
              <select id="ownerType" name="ownerType" className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950">
                <option value="landlord">Landlord</option>
                <option value="investor">Investor</option>
                <option value="property_manager">Property Manager</option>
                <option value="portfolio_owner">Portfolio Owner</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="propertyType" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Property type</Label>
              <select id="propertyType" name="propertyType" className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950">
                <option value="small_multifamily">Small multifamily</option>
                <option value="large_multifamily">Large multifamily</option>
                <option value="triplex">Triplex</option>
                <option value="mixed_use">Mixed-use</option>
                <option value="condo_portfolio">Condo portfolio</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="nextFollowUpDate" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Next follow-up date</Label>
            <Input id="nextFollowUpDate" name="nextFollowUpDate" type="date" className="rounded-xl" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Context notes</Label>
            <Textarea id="notes" name="notes" placeholder="What pain point brought this lead in? What's the portfolio situation?" rows={3} className="rounded-xl resize-none" />
          </div>

          {error ? <p className="text-[12px] text-rose-600">{error}</p> : null}

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" className="h-8 rounded-full px-4 text-xs" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="h-8 rounded-full bg-slate-950 px-4 text-xs text-white hover:bg-slate-800">
              {isPending ? 'Adding…' : 'Add lead'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
