import { ArrowRight, ClipboardCheck, Inbox, Route, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Cadrage des critères",
    description: "Vos filtres locatifs sont posés clairement dès le départ.",
    icon: <ClipboardCheck className="h-5 w-5" />,
    illustration: (
      <div className="relative h-28 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-32 sm:rounded-[20px] sm:p-3.5 md:h-36 md:rounded-[22px] md:p-4">
        <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-blue-100/60 blur-2xl" />
        <div className="relative h-full rounded-[16px] border border-white bg-white/95 p-2.5 shadow-sm sm:hidden">
          <div className="flex items-center justify-between">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400 font-body">
              Critères
            </div>
            <div className="h-4 w-4 rounded-full border border-blue-100 bg-blue-50" />
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            {["Revenu", "Crédit"].map((label, index) => (
              <div key={label} className="rounded-lg border border-slate-100 bg-slate-50/70 px-1.5 py-1.5">
                <div className="text-[8px] font-medium text-slate-500 font-body">{label}</div>
                <div className="mt-1 h-1.5 rounded-full bg-slate-200">
                  <div className={`h-1.5 rounded-full ${index === 0 ? "w-[82%] bg-blue-400" : "w-[72%] bg-emerald-400"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative hidden h-full rounded-[18px] border border-white bg-white/95 p-3 shadow-sm sm:block md:p-3.5">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 font-body">
              Critères propriétaires
            </div>
            <div className="h-5 rounded-full border border-blue-100 bg-blue-50 px-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-blue-600 font-body">
              Actif
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["Revenu", "Crédit", "Historique", "Délai"].map((label, index) => (
              <div key={label} className="rounded-xl border border-slate-100 bg-slate-50/70 px-2 py-2">
                <div className="text-[9px] font-medium text-slate-500 font-body">{label}</div>
                <div className="mt-1.5 h-1.5 rounded-full bg-slate-200">
                  <div
                    className={`h-1.5 rounded-full ${
                      index === 0
                        ? "w-[88%] bg-blue-400"
                        : index === 1
                          ? "w-[76%] bg-emerald-400"
                          : index === 2
                            ? "w-[64%] bg-indigo-300"
                            : "w-[82%] bg-blue-300"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Gestion des demandes",
    description: "Les demandes entrantes sont reçues, triées et suivies.",
    icon: <Inbox className="h-5 w-5" />,
    illustration: (
      <div className="relative h-28 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-32 sm:rounded-[20px] sm:p-3.5 md:h-36 md:rounded-[22px] md:p-4">
        <div className="space-y-2 sm:space-y-3">
          {[1, 2, 3].map((row) => (
            <div key={row} className={`flex items-center gap-2 rounded-[14px] border border-slate-100 bg-white px-2 py-1.5 shadow-sm sm:gap-3 sm:rounded-[18px] sm:px-3 sm:py-2 ${row === 3 ? "hidden sm:flex" : ""}`}>
              <div className="h-6 w-6 rounded-full bg-slate-100 sm:h-8 sm:w-8" />
              <div className="flex-1">
                <div className="h-2 w-24 rounded-full bg-slate-300/70" />
                <div className="mt-1 h-2 w-16 rounded-full bg-slate-200/80 sm:mt-1.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Préqualification et matching",
    description: "Les profils qui correspondent à vos critères remontent en priorité.",
    icon: <ShieldCheck className="h-5 w-5" />,
    illustration: (
      <div className="relative h-28 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-32 sm:rounded-[20px] sm:p-3.5 md:h-36 md:rounded-[22px] md:p-4">
        <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/70 blur-2xl" />
        <div className="relative flex h-full items-center justify-center">
          <div className="rounded-[18px] border border-white bg-white px-3.5 py-3 shadow-sm sm:rounded-[22px] sm:px-5 sm:py-4">
            <div className="text-[9px] uppercase tracking-[0.14em] text-slate-400 font-body sm:text-[11px] sm:tracking-[0.18em]">Compatibilité</div>
            <div className="mt-1.5 flex items-end gap-1.5 sm:mt-2 sm:gap-2">
              <span className="text-[2rem] font-medium text-slate-900 font-headline sm:text-3xl">94%</span>
              <span className="pb-1 text-[11px] text-emerald-600 font-body sm:text-sm">élevée</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "04",
    title: "Décision mieux préparée",
    description: "Vous recevez des dossiers qualifiés, plus simples à comparer.",
    icon: <Route className="h-5 w-5" />,
    illustration: (
      <div className="relative h-28 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-32 sm:rounded-[20px] sm:p-3.5 md:h-36 md:rounded-[22px] md:p-4">
        <div className="grid h-full grid-cols-2 gap-2 sm:gap-3">
          <div className="rounded-[14px] border border-emerald-100 bg-emerald-50/80 p-2.5 shadow-sm sm:rounded-[18px] sm:p-3">
            <div className="text-[9px] uppercase tracking-[0.12em] text-emerald-600 font-body sm:text-[10px] sm:tracking-[0.18em]">Validé</div>
            <div className="mt-3 h-2.5 w-16 rounded-full bg-emerald-200" />
            <div className="mt-2 h-2.5 w-12 rounded-full bg-emerald-200" />
          </div>
          <div className="rounded-[14px] border border-slate-100 bg-white p-2.5 shadow-sm sm:rounded-[18px] sm:p-3">
            <div className="text-[9px] uppercase tracking-[0.12em] text-slate-400 font-body sm:text-[10px] sm:tracking-[0.18em]">À revoir</div>
            <div className="mt-3 h-2.5 w-14 rounded-full bg-slate-200" />
            <div className="mt-2 h-2.5 w-10 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="services" className="relative overflow-hidden bg-white py-24 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.05),transparent_34%)]" />
      <div className="container mx-auto px-6">
        <div className="reveal-animation reveal-title mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-[0_12px_30px_rgba(15,23,42,0.04)] font-body">
            <ArrowRight className="h-3.5 w-3.5 text-primary" />
            Comment FluxLocatif fonctionne
          </div>
          <h2 className="mt-6 text-balance text-3xl font-medium leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl font-headline">
            Un cadre opérationnel clair, du premier message au dossier prêt.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-7 text-slate-500 font-body">
            Vous gardez le contrôle final. FluxLocatif gère les étapes répétitives, le tri et la préqualification.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3.5 md:mt-14 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="reveal-animation reveal-card group flex h-full flex-col rounded-[24px] border border-white/85 bg-[#fbfcff]/92 p-3.5 shadow-[0_20px_54px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.07)] sm:rounded-[28px] sm:p-4 md:rounded-[32px] md:p-6"
            >
              {step.illustration}
              <div className="mt-3.5 flex items-center justify-between sm:mt-4 md:mt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-white text-primary shadow-sm sm:h-10 sm:w-10 md:h-11 md:w-11 md:rounded-2xl">
                  {step.icon}
                </div>
                <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-300 font-body sm:text-xs sm:tracking-[0.2em] md:text-sm md:tracking-[0.24em]">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-3 text-[1.15rem] leading-[1.1] font-medium tracking-tight text-slate-950 font-headline sm:text-[1.25rem] md:mt-4 md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 text-[13px] leading-5 text-slate-500 font-body sm:text-[14px] sm:leading-6 md:mt-3 md:text-[15px] md:leading-7">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
