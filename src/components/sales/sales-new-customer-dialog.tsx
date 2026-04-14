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
import { createCustomerAction } from '@/lib/sales/actions';

export function SalesNewCustomerDialog() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await createCustomerAction(formData);
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
          New customer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="text-[1.1rem] font-semibold tracking-[-0.02em]">Sign new customer</DialogTitle>
        </DialogHeader>
        <form ref={formRef} action={handleSubmit} className="space-y-4 pt-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="companyName" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Company name *</Label>
              <Input id="companyName" name="companyName" placeholder="Rive Nord Rentals" required className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="primaryContact" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Primary contact *</Label>
              <Input id="primaryContact" name="primaryContact" placeholder="Jean Tremblay" required className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Email *</Label>
              <Input id="email" name="email" type="email" placeholder="jean@example.ca" required className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Phone</Label>
              <Input id="phone" name="phone" placeholder="450-555-0000" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="city" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">City</Label>
              <Input id="city" name="city" placeholder="Laval" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="unitCount" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Unit count</Label>
              <Input id="unitCount" name="unitCount" type="number" min={1} placeholder="24" className="rounded-xl" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="plan" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Plan</Label>
              <select id="plan" name="plan" className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950">
                <option value="Starter">Starter</option>
                <option value="Growth">Growth</option>
                <option value="Portfolio">Portfolio</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="monthlyRevenue" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Monthly revenue ($)</Label>
              <Input id="monthlyRevenue" name="monthlyRevenue" type="number" min={0} placeholder="1200" className="rounded-xl" />
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
            <Label htmlFor="notes" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-500">Onboarding notes</Label>
            <Textarea id="notes" name="notes" placeholder="Key context about this account, onboarding status, or special requirements." rows={3} className="resize-none rounded-xl" />
          </div>

          {error ? <p className="text-[12px] text-rose-600">{error}</p> : null}

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" className="h-8 rounded-full px-4 text-xs" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="h-8 rounded-full bg-slate-950 px-4 text-xs text-white hover:bg-slate-800">
              {isPending ? 'Signing…' : 'Sign customer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
