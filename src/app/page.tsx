import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CircleCheck,
  Clock3,
  Layers3,
  MessageSquareMore,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Users2,
} from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Benefits } from "@/components/sections/Benefits";
import { FAQPreview } from "@/components/sections/FAQPreview";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const trustItems = [
  "Bureau de location externalisé pour propriétaires et opérateurs actifs",
  "Matching intelligent selon vos critères de location",
  "Préqualification rigoureuse avant présentation au propriétaire",
  "Jusqu'à 50 % moins cher qu'une compagnie de location traditionnelle",
];

const painPoints = [
  {
    icon: <MessageSquareMore className="h-5 w-5" />,
    title: "Trop de temps perdu sur les messages entrants",
    description:
      "FluxLocatif absorbe le volume initial pour éviter que votre équipe répète les mêmes réponses toute la journée.",
    illustration: (
      <div className="relative h-48 overflow-hidden rounded-[24px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-inner">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-300" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </div>
        <div className="mt-5 space-y-3">
          <div className="ml-auto flex w-[68%] items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/80 px-3 py-2 shadow-sm">
            <div className="h-6 w-6 rounded-full bg-blue-500/15" />
            <div className="flex-1">
              <div className="h-2 w-16 rounded-full bg-blue-300/60" />
              <div className="mt-1.5 h-2 w-24 rounded-full bg-blue-200/60" />
            </div>
          </div>
          <div className="flex w-[74%] items-center gap-2 rounded-2xl border border-slate-100 bg-white px-3 py-2 shadow-sm">
            <div className="h-6 w-6 rounded-full bg-slate-100" />
            <div className="flex-1">
              <div className="h-2 w-20 rounded-full bg-slate-300/70" />
              <div className="mt-1.5 h-2 w-28 rounded-full bg-slate-200/80" />
            </div>
          </div>
          <div className="ml-auto flex w-[62%] items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/80 px-3 py-2 shadow-sm">
            <div className="h-6 w-6 rounded-full bg-emerald-500/15" />
            <div className="flex-1">
              <div className="h-2 w-14 rounded-full bg-emerald-300/70" />
              <div className="mt-1.5 h-2 w-20 rounded-full bg-emerald-200/80" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <Layers3 className="h-5 w-5" />,
    title: "Un pipeline locatif difficile à suivre",
    description:
      "Toutes les étapes sont regroupées dans un cadre clair pour suivre qui avance, qui bloque et quoi relancer.",
    illustration: (
      <div className="relative h-40 overflow-hidden rounded-[24px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-inner">
        <div className="grid h-full grid-cols-3 gap-3">
          {[
            ["Entrantes", "18"],
            ["Préqualif.", "9"],
            ["Validées", "4"],
          ].map(([label, value], index) => (
            <div
              key={label}
              className="flex flex-col justify-between rounded-[20px] border border-white bg-white/95 p-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
            >
              <div className={`h-1.5 w-8 rounded-full ${index === 0 ? "bg-blue-300" : index === 1 ? "bg-amber-300" : "bg-emerald-300"}`} />
              <div>
                <div className="text-xs font-medium text-slate-500 font-body">{label}</div>
                <div className="mt-2 text-2xl font-medium text-slate-900 font-headline">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: <Users2 className="h-5 w-5" />,
    title: "Trop de candidats peu alignés avec vos critères",
    description:
      "Le matching intelligent aide à faire remonter plus vite les dossiers qui ressemblent réellement à vos critères.",
    illustration: (
      <div className="relative h-40 overflow-hidden rounded-[24px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-inner">
        <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/70 blur-2xl" />
        <div className="relative flex h-full items-center justify-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
            <Users2 className="h-6 w-6 text-slate-400" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-px w-14 border-t border-dashed border-blue-300" />
            <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600 font-body">
              94 % match
            </div>
            <div className="h-px w-14 border-t border-dashed border-blue-300" />
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-100 bg-blue-50 shadow-sm">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
    ),
  },
];

const whyFluxLocatif = [
  {
    title: "Un service opérationnel, pas un outil à piloter seul",
    description:
      "Une extension structurée de vos opérations, sans vous laisser seul devant un logiciel.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Une approche rigoureuse centrée sur la qualité des dossiers",
    description:
      "Les dossiers avancent selon vos critères, pas selon le volume de messages reçus.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Une structure plus légère que les modèles traditionnels",
    description:
      "Une structure premium, jusqu'à 50 % plus légère qu'un modèle locatif traditionnel.",
    icon: <TrendingDown className="h-5 w-5" />,
  },
];

const operatorProfiles = [
  "Investisseurs immobiliers qui veulent accélérer le traitement des demandes sans perdre le contrôle",
  "Propriétaires multi-unités qui veulent plus de structure et moins de charge manuelle",
  "Compagnies de gestion qui veulent délester leurs équipes du tri initial et de la préqualification",
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-950">
      <Navbar />
      <main className="flex-grow">
        <Hero />

        <section className="reveal-animation reveal-title border-y border-slate-100/80 bg-[#fcfdff]">
          <div className="container mx-auto px-6 py-7 md:py-9">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="premium-surface flex items-start gap-3 rounded-[24px] px-5 py-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
                >
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <p className="text-sm leading-6 text-slate-600 font-body">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#fbfcff] py-24 md:py-36">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.06),transparent_38%)]" />
          <div className="section-grid section-fade absolute inset-0 opacity-60" />
          <div className="container relative mx-auto px-6">
            <div className="reveal-animation reveal-title mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-sm font-body">
                <Sparkles className="h-3.5 w-3.5" />
                Les frictions que nous enlevons
              </div>
              <h2 className="mx-auto mt-6 max-w-3xl text-balance text-3xl font-medium leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl font-headline">
                Moins de dispersion, plus de structure dans vos locations.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-7 text-slate-500 font-body">
                Nous prenons en charge les demandes entrantes, la préqualification et le suivi pour que vous passiez plus vite aux dossiers solides.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3.5 md:grid-cols-4 md:gap-5">
              {painPoints.map((item, idx) => (
                <article
                  key={item.title}
                  className={cn(
                    "reveal-animation reveal-card group rounded-[30px] border border-white/85 bg-white/94 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_85px_rgba(15,23,42,0.08)] md:rounded-[32px] md:p-8",
                    idx === 0 && "col-span-2 md:col-span-2",
                    idx === 1 && "col-span-1 md:col-span-1 md:-mt-6",
                    idx === 2 && "col-span-1 mt-7 md:col-span-1 md:mt-4"
                  )}
                >
                  {item.illustration}
                  <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-primary shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="mt-5 text-[1.95rem] leading-[1.05] font-medium tracking-tight text-slate-950 font-headline md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-500 font-body md:text-[15px]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <HowItWorks />
        <Benefits />

        <section className="bg-white py-24 md:py-36">
          <div className="container mx-auto px-6">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-[0_12px_30px_rgba(15,23,42,0.04)] font-body">
                  <Building2 className="h-3.5 w-3.5 text-primary" />
                  Pourquoi FluxLocatif
                </div>
                <h2 className="mt-6 max-w-2xl text-balance text-3xl font-medium leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl font-headline">
                  Une approche premium pour alléger la location sans diluer vos standards.
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-7 text-slate-500 font-body">
                  FluxLocatif structure l'opérationnel en amont pour vous laisser les vraies décisions.
                </p>

                <div className="mt-8 space-y-4">
                  {whyFluxLocatif.map((item) => (
                    <div
                      key={item.title}
                      className="reveal-animation reveal-card rounded-[28px] border border-slate-200/70 bg-[#fbfcff] p-6 shadow-[0_18px_46px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_rgba(15,23,42,0.08)]"
                    >
                      <div className="flex items-center gap-3 text-slate-950">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-white text-primary">
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-medium tracking-tight font-headline">{item.title}</h3>
                      </div>
                      <p className="mt-4 pl-[3.25rem] text-[15px] leading-7 text-slate-500 font-body">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[36px] border border-white/90 bg-[linear-gradient(180deg,rgba(248,251,255,0.96),rgba(255,255,255,0.98))] p-7 shadow-[0_28px_90px_rgba(15,23,42,0.07)] md:p-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_10px_24px_rgba(15,23,42,0.04)] font-body">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  Clientèle cible
                </div>
                <h3 className="mt-6 text-2xl font-medium tracking-tight text-slate-950 font-headline">
                  Pensé pour les propriétaires et opérateurs qui veulent plus d'efficacité locative.
                </h3>
                <div className="mt-8 space-y-4">
                  {operatorProfiles.map((profile) => (
                    <div
                      key={profile}
                      className="reveal-animation reveal-card rounded-[24px] border border-white bg-white/92 p-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(15,23,42,0.08)]"
                    >
                      <div className="flex gap-3">
                        <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />
                        <p className="text-sm leading-7 text-slate-600 font-body">{profile}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-[26px] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-inner">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500 font-body">Point clé</p>
                  <p className="mt-3 text-lg leading-8 text-slate-700 font-body">
                    Vous gardez le contrôle des décisions finales. Nous faisons le travail préparatoire qui permet d'aller plus vite vers les candidats les plus qualifiés.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FAQPreview />

        <section className="relative overflow-hidden bg-[#f8fbff] py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_42%)]" />
          <div className="section-grid section-fade absolute inset-0 opacity-40" />
          <div className="container relative mx-auto px-6">
            <div className="reveal-animation reveal-title mx-auto max-w-4xl rounded-[40px] border border-white/90 bg-white/94 px-6 py-10 text-center shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-sm md:px-10 md:py-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_12px_30px_rgba(15,23,42,0.05)] font-body">
                <Sparkles className="h-3.5 w-3.5" />
                Prêt à structurer vos locations
              </div>
              <h2 className="mx-auto mt-6 max-w-3xl text-balance text-3xl font-medium leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl font-headline">
                Réduisez le travail locatif manuel sans perdre la maîtrise de votre sélection.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500 font-body">
                Confiez à FluxLocatif le traitement structuré des demandes, la préqualification et le pilotage du pipeline pour consacrer votre temps aux meilleurs dossiers.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild className="h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-8 text-base font-semibold text-white shadow-[0_16px_40px_rgba(59,130,246,0.26)] font-body">
                  <Link href="/contact">Démarrer le service</Link>
                </Button>
                <Button asChild variant="outline" className="h-14 rounded-full border-slate-200 bg-white px-8 text-base font-medium text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.04)] font-body">
                  <Link href="/contact">Réserver un appel</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
