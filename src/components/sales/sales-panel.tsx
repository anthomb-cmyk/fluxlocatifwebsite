import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type SalesPanelTone = 'default' | 'subtle' | 'dark';

const toneClasses: Record<SalesPanelTone, string> = {
  default: 'border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_48px_rgba(15,23,42,0.05)]',
  subtle: 'border border-slate-200/70 bg-slate-100/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]',
  dark: 'border border-slate-900 bg-slate-950 text-white shadow-[0_24px_64px_rgba(15,23,42,0.28)]',
};

interface SalesPanelProps extends HTMLAttributes<HTMLDivElement> {
  tone?: SalesPanelTone;
}

export function SalesPanel({
  className,
  tone = 'default',
  ...props
}: SalesPanelProps) {
  return (
    <section
      className={cn(
        'rounded-[26px]',
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}

export function SalesPanelHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-6 py-5 md:px-7 md:py-6', className)} {...props} />;
}

export function SalesPanelBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-6 pb-6 md:px-7 md:pb-7', className)} {...props} />;
}

export function SalesPanelEyebrow({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500',
        className
      )}
      {...props}
    />
  );
}

export function SalesPanelTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-[1.15rem] font-semibold tracking-[-0.03em] text-slate-950',
        className
      )}
      {...props}
    />
  );
}

export function SalesPanelDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-sm leading-6 text-slate-600',
        className
      )}
      {...props}
    />
  );
}

