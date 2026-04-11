"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Layers3,
  MessageSquareMore,
  ShieldCheck,
  Sparkles,
  Users2,
} from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Benefits } from "@/components/sections/Benefits";
import { FAQPreview } from "@/components/sections/FAQPreview";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { useLang } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function Home() {
  const { t } = useLang();

  const painPoints = [
    {
      icon: <MessageSquareMore className="h-5 w-5" />,
      title: t("Trop de demandes à traiter", "Too many requests to handle"),
      description: t(
        "Les mêmes questions reviennent, les messages s’accumulent et le tri prend rapidement trop de place.",
        "The same questions keep coming, messages pile up, and sorting quickly takes over too much space."
      ),
      illustration: (
        <div className="card-illustration relative h-24 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-28 sm:rounded-[20px] sm:p-3.5 md:h-44 md:rounded-[24px] md:p-4">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-300" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </div>
          <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5 md:mt-5 md:space-y-3">
            <div className="ml-auto flex w-[82%] items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/80 px-2 py-1.5 shadow-sm sm:w-[74%] sm:px-2.5 sm:py-2 md:w-[68%] md:px-3">
              <div className="h-6 w-6 rounded-full bg-blue-500/15" />
              <div className="flex-1">
                <div className="h-2 w-16 rounded-full bg-blue-300/60" />
                <div className="mt-1.5 h-2 w-24 rounded-full bg-blue-200/60" />
              </div>
            </div>
            <div className="flex w-[88%] items-center gap-2 rounded-2xl border border-slate-100 bg-white px-2 py-1.5 shadow-sm sm:w-[80%] sm:px-2.5 sm:py-2 md:w-[74%] md:px-3">
              <div className="h-6 w-6 rounded-full bg-slate-100" />
              <div className="flex-1">
                <div className="h-2 w-20 rounded-full bg-slate-300/70" />
                <div className="mt-1.5 h-2 w-28 rounded-full bg-slate-200/80" />
              </div>
            </div>
            <div className="ml-auto hidden w-[62%] items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/80 px-3 py-2 shadow-sm sm:flex">
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
      title: t("Un suivi difficile à garder clair", "A pipeline that's hard to keep clear"),
      description: t(
        "Quand plusieurs candidats avancent en même temps, le pipeline devient vite plus lourd à suivre.",
        "When multiple candidates move forward at the same time, the pipeline quickly becomes heavier to track."
      ),
      illustration: (
        <div className="card-illustration relative h-24 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-28 sm:rounded-[20px] sm:p-3.5 md:h-44 md:rounded-[24px] md:p-4">
          <div className="grid h-full grid-cols-3 gap-3">
            {[
              { mobile: "Entrée", desktop: "Entrantes", value: "18" },
              { mobile: "Préq.", desktop: "Préqualif.", value: "9" },
              { mobile: "Validé", desktop: "Validées", value: "4" },
            ].map((item, index) => (
              <div
                key={item.desktop}
                className="flex flex-col justify-between rounded-[16px] border border-white bg-white/95 p-2 shadow-[0_10px_24px_rgba(15,23,42,0.05)] sm:rounded-[18px] sm:p-2.5 md:rounded-[20px] md:p-3"
              >
                <div className={`h-1.5 w-8 rounded-full ${index === 0 ? "bg-blue-300" : index === 1 ? "bg-amber-300" : "bg-emerald-300"}`} />
                <div>
                  <div className="text-[9px] font-medium text-slate-500 font-body sm:text-[10px] md:text-xs">
                    <span className="sm:hidden">{item.mobile}</span>
                    <span className="hidden sm:inline">{item.desktop}</span>
                  </div>
                  <div className="mt-1 text-[1.7rem] font-medium text-slate-900 font-headline sm:text-[1.9rem] md:mt-2 md:text-2xl">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: <Users2 className="h-5 w-5" />,
      title: t("Des dossiers difficiles à prioriser", "Files that are hard to prioritize"),
      description: t(
        "Sans cadre clair, il devient plus difficile de faire ressortir rapidement les dossiers les plus pertinents.",
        "Without a clear framework, it becomes harder to quickly surface the most relevant files."
      ),
      illustration: (
        <div className="card-illustration relative h-24 overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-3 shadow-inner sm:h-28 sm:rounded-[20px] sm:p-3.5 md:h-44 md:rounded-[24px] md:p-4">
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/70 blur-2xl" />
          <div className="relative flex h-full items-center justify-center gap-2.5 sm:gap-3 md:gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm sm:h-14 sm:w-14 md:h-16 md:w-16">
              <Users2 className="h-4 w-4 text-slate-400 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </div>
            <div className="flex flex-col items-center gap-1.5 sm:gap-2">
              <div className="h-px w-10 border-t border-dashed border-blue-300 sm:w-12 md:w-14" />
              <div className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-600 font-body sm:px-2.5 sm:text-[10px] md:px-3 md:text-[11px] md:tracking-[0.18em]">
                94 % match
              </div>
              <div className="h-px w-10 border-t border-dashed border-blue-300 sm:w-12 md:w-14" />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50 shadow-sm sm:h-14 sm:w-14 md:h-16 md:w-16">
              <Building2 className="h-4 w-4 text-primary sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const serviceBlocks = [
    {
      icon: <Building2 className="h-5 w-5" />,
      title: t("Bureau de location externalisé", "Outsourced Leasing Office"),
      description: t(
        "Nous prenons en charge les demandes entrantes, les échanges de premier niveau et le suivi quotidien du flux locatif.",
        "We handle incoming requests, first-level exchanges, and the day-to-day follow-up of the leasing flow."
      ),
      points: [
        t("Centralisation des demandes", "Request centralization"),
        t("Réponses et suivi des échanges", "Responses and follow-up"),
        t("Organisation continue du pipeline", "Continuous pipeline organization"),
      ],
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: t("Préqualification & vetting", "Pre-qualification & vetting"),
      description: t(
        "Nous appliquons vos critères pour filtrer, qualifier et prioriser les profils avant leur présentation.",
        "We apply your criteria to filter, qualify, and prioritize profiles before they are presented."
      ),
      points: [
        t("Vérification des informations clés", "Key information verification"),
        t("Préqualification structurée", "Structured pre-qualification"),
        t("Priorisation des dossiers les plus pertinents", "Prioritization of the most relevant files"),
      ],
    },
  ];

  const whyFluxLocatif = [
    {
      title: t("Une couche humaine d’exécution", "A human execution layer"),
      description: t(
        "Une équipe prend en charge les tâches locatives en continu, avec un niveau de rigueur défini.",
        "A team handles leasing tasks continuously, with a clearly defined level of rigor."
      ),
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      title: t("Matching structuré", "Structured matching"),
      description: t(
        "Les profils sont priorisés selon vos critères de décision, pas selon le simple ordre d’arrivée.",
        "Profiles are prioritized according to your decision criteria, not simply by order of arrival."
      ),
      icon: <BadgeCheck className="h-5 w-5" />,
    },
    {
      title: t("Contrôle client préservé", "Client control preserved"),
      description: t(
        "Vous conservez l’arbitrage final sur les candidatures et la stratégie de location.",
        "You retain the final say on applications and leasing strategy."
      ),
      icon: <Layers3 className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-950">
      <Navbar />
      <main className="flex-grow">
        <Hero />

        <section className="relative overflow-hidden bg-[#fbfcff] py-24 md:py-36">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.06),transparent_38%)]" />
          <div className="section-grid section-fade absolute inset-0 opacity-60" />
          <div className="container relative mx-auto px-6">
            <div className="reveal-animation reveal-title mb-12">
              <div className="mb-6 inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span className="font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-blue-500">
                  {t("LES FRICTIONS QUE NOUS ENLEVONS", "FRICTION POINTS WE REMOVE")}
                </span>
              </div>
              <div className="grid items-end gap-6 md:grid-cols-2">
                <h2 className="scroll-blur-in text-balance font-headline text-3xl font-medium leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl">
                  {t("Ce qui alourdit le plus les locations.", "What makes rentals harder than they need to be.")}
                </h2>
                <p className="font-body text-[15px] leading-7 text-slate-500 md:pb-1">
                  {t(
                    "Quand le volume augmente, le vrai problème n'est pas seulement le nombre de demandes. C'est le temps perdu, le manque de structure et la difficulté à faire ressortir les bons dossiers.",
                    "When volume increases, the real problem is not just the number of requests. It is lost time, lack of structure, and the difficulty of surfacing the right files."
                  )}
                </p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-2.5 sm:mt-14 sm:gap-3.5 lg:grid-cols-3 lg:gap-5">
              {painPoints.map((item, idx) => (
                <article
                  key={item.title}
                  className={cn(
                    "group hover-tilt rounded-[24px] border border-white/85 bg-white/94 p-3.5 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_85px_rgba(15,23,42,0.08)] sm:rounded-[28px] sm:p-4 md:rounded-[32px] md:p-8",
                    idx === 0 && "scroll-fade-up",
                    idx === 1 && "scroll-from-left scroll-delay-1",
                    idx === 2 && "col-span-2 sm:col-span-1 scroll-from-right scroll-delay-2"
                  )}
                >
                  {item.illustration}
                  <div className="mt-3.5 flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-primary shadow-sm sm:mt-4 sm:h-10 sm:w-10 sm:rounded-2xl md:mt-5 md:h-11 md:w-11">
                    {item.icon}
                  </div>
                  <h3 className="mt-3 text-[1.12rem] leading-[1.1] font-medium tracking-tight text-slate-950 font-headline sm:text-[1.22rem] md:mt-5 md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-5 text-slate-500 font-body sm:text-[14px] sm:leading-6 md:mt-3 md:text-[15px] md:leading-6">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="relative overflow-hidden bg-white py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.05),transparent_34%)]" />
          <div className="container relative mx-auto px-6">
            <div className="reveal-animation reveal-title mb-12">
              <div className="mb-6 inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span className="font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-blue-500">
                  {t("CE QUE NOUS PRENONS EN CHARGE", "WHAT WE HANDLE FOR YOU")}
                </span>
              </div>
              <div className="grid items-end gap-6 md:grid-cols-2">
                <h2 className="text-balance font-headline text-3xl font-medium leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl">
                  {t("Deux blocs de service pour structurer vos locations.", "Two service blocks to structure your rentals.")}
                </h2>
                <p className="font-body text-[15px] leading-7 text-slate-500 md:pb-1">
                  {t(
                    "FluxLocatif agit comme une extension opérationnelle de votre équipe sur les tâches locatives qui demandent le plus de constance.",
                    "FluxLocatif acts as an operational extension of your team for the leasing tasks that require the most consistency."
                  )}
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {serviceBlocks.map((service, idx) => (
                <article
                  key={service.title}
                  className={cn(
                    "rounded-[32px] border border-white/90 bg-[#fbfcff] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.04)] md:p-8",
                    idx === 0 && "scroll-from-left",
                    idx === 1 && "scroll-from-right scroll-delay-1"
                  )}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-white text-primary shadow-sm">
                    {service.icon}
                  </div>
                  <h3 className="mt-5 text-2xl font-medium tracking-tight text-slate-950 font-headline">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-7 text-slate-500 font-body">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-[15px] leading-7 text-slate-700 font-body">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <HowItWorks />
        <Benefits />

        <section className="bg-white py-24 md:py-36">
          <div className="container mx-auto px-6">
            <div className="reveal-animation reveal-title mb-12">
              <div className="mb-6 inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span className="font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-blue-500">
                  {t("POURQUOI FLUXLOCATIF", "WHY FLUXLOCATIF")}
                </span>
              </div>
              <div className="grid items-end gap-6 md:grid-cols-2">
                <h2 className="text-balance font-headline text-3xl font-medium leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl">
                  {t(
                    "Un modèle pensé pour alléger la location sans vous retirer le contrôle.",
                    "A model designed to lighten the rental process without removing your control."
                  )}
                </h2>
                <p className="font-body text-[15px] leading-7 text-slate-500 md:pb-1">
                  {t(
                    "FluxLocatif n’est ni une compagnie de gestion complète, ni un outil à piloter seul.",
                    "FluxLocatif is neither a full property management company nor a tool you have to operate alone."
                  )}
                </p>
              </div>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {whyFluxLocatif.map((item, index) => (
                <div
                  key={item.title}
                  className={cn(
                    "hover-tilt rounded-[28px] border border-slate-200/70 bg-[#fbfcff] p-6 shadow-[0_18px_46px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_rgba(15,23,42,0.08)]",
                    index === 0 && "scroll-from-left",
                    index === 1 && "scroll-fade-up scroll-delay-1",
                    index === 2 && "scroll-from-right scroll-delay-2"
                  )}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-white text-primary">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-medium tracking-tight text-slate-950 font-headline">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-slate-500 font-body">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQPreview />

        <section className="relative overflow-hidden bg-slate-950 py-24 md:py-32">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 translate-y-8 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="container relative mx-auto max-w-4xl px-6 text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-400">
              <Sparkles className="h-3.5 w-3.5" />
              {t("Commencer dès aujourd'hui", "Get started today")}
            </div>

            <h2 className="scroll-blur-in mb-6 font-headline text-3xl font-medium leading-tight tracking-[-0.04em] text-white md:text-5xl">
              {t("Prêt à structurer vos locations ?", "Ready to structure your rentals?")}
            </h2>

            <p className="mx-auto mb-10 max-w-2xl font-body text-lg leading-8 text-slate-400">
              {t(
                "Parlons de votre volume, de vos critères et de la façon la plus simple d'intégrer le service à vos locations.",
                "Let's talk about your volume, your criteria, and the simplest way to integrate the service into your rentals."
              )}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-full bg-blue-500 px-8 font-body text-base font-semibold text-white shadow-[0_16px_40px_rgba(59,130,246,0.3)] transition-colors hover:bg-blue-400"
              >
                {t("Démarrer le service", "Get started")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 font-body text-base font-medium text-white transition-colors hover:bg-white/10"
              >
                {t("Réserver un appel", "Book a call")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
