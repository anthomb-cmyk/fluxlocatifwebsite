"use client";

type TrustTickerProps = {
  items: string[];
};

export function TrustTicker({ items }: TrustTickerProps) {
  return (
    <div id="proof-strip" className="reveal-animation reveal-title mx-auto mt-8 w-full max-w-5xl">
      <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 font-body">
        Repères FluxLocatif
      </p>
      <div className="rounded-[26px] border border-slate-200/80 bg-white/90 p-3 shadow-[0_16px_42px_rgba(15,23,42,0.06)] backdrop-blur-md md:p-4">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-2xl border border-slate-200/70 bg-white px-3.5 py-2.5 text-[13px] font-medium tracking-[0.01em] text-slate-600 transition duration-300 hover:border-slate-300 hover:text-slate-800"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span className="font-body">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
