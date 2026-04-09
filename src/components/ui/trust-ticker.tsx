"use client";

import { cn } from "@/lib/utils";

const items = [
  "Bureau locatif externalisé",
  "Préqualification avant présentation",
  "Suivi structuré du pipeline",
  "Décision finale conservée par le client",
];

export function TrustTicker({ className }: { className?: string }) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className={cn(
        "relative mt-16 sm:mt-20 md:mt-24 overflow-hidden w-full",
        className
      )}
    >
      <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />

      <div className="flex animate-ticker whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-4 text-[13px] font-medium text-slate-500 font-body shrink-0"
          >
            <span className="h-1 w-1 rounded-full bg-blue-400 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
