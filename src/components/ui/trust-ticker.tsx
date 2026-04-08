"use client";

const items = [
  "Bureau locatif externalisé",
  "Préqualification avant présentation",
  "Matching selon vos critères",
  "Suivi plus léger pour vos équipes",
];

export function TrustTicker() {
  return (
    <div id="proof-strip" className="reveal-animation reveal-title mx-auto mt-3 w-full max-w-5xl py-2 sm:mt-5 sm:py-4">
      <p className="mb-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 font-body sm:mb-3 sm:text-[11px] sm:tracking-[0.2em]">
        Ce que FluxLocatif prend en charge
      </p>
      <div className="rounded-[26px] border border-slate-200/80 bg-white/90 p-2.5 shadow-[0_16px_42px_rgba(15,23,42,0.06)] backdrop-blur-md md:p-3">
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item} className="rounded-[16px] border border-slate-100 bg-white px-3 py-2.5 shadow-sm">
              <p className="mt-1 text-[12px] font-medium leading-5 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
