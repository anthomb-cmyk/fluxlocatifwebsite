'use client';

import { useTransition } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { markTaskDoneAction } from '@/lib/sales/actions';

export function SalesMarkTaskDoneButton({ taskId }: { taskId: string }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await markTaskDoneAction(taskId);
    });
  }

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={handleClick}
      className="h-7 rounded-full border-slate-200 px-2.5 text-[11px] text-slate-500 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
    >
      <Check className="h-3 w-3" />
      {isPending ? '…' : 'Done'}
    </Button>
  );
}
