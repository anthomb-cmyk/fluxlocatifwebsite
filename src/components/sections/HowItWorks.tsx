"use client";

import { cn } from "@/lib/utils";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Mise en place",
      description: "Nous structurons le dossier locatif et définissons vos critères spécifiques.",
    },
    {
      number: "02",
      title: "Traitement actif",
      description: "Notre équipe traite les demandes et organise votre pipeline en temps réel.",
    },
    {
      number: "03",
      title: "Matching intelligent",
      description: "Notre algorithme de matching évalue les candidats selon vos critères de revenus, de solvabilité et de compatibilité globale.",
    },
    {
      number: "04",
      title: "Sélection",
      description: "Vous recevez les dossiers validés pour prendre votre décision finale.",
    },
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] -z-10 rounded-full"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-8 md:mb-24 reveal-animation reveal-title">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-4 md:mb-6 font-body">
            <span>Processus opérationnel</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-headline font-medium mb-3 md:mb-8 tracking-tighter leading-tight text-foreground text-balance">
            Déléguez le tri, <br className="hidden sm:block" />
            <span className="text-primary">gardez le contrôle.</span>
          </h2>
          <p className="text-muted-foreground text-[15px] md:text-xl font-normal max-w-2xl leading-snug md:leading-relaxed font-body">
            Nous assurons le travail opérationnel de préqualification pour vous aider à décider plus vite.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-8 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={cn(
                "group relative p-5 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] bg-white border border-border/40 shadow-sm hover:border-primary/20 transition-all duration-700 reveal-animation reveal-card",
                idx === 1 && "delay-75",
                idx === 2 && "delay-150",
                idx === 3 && "delay-225"
              )}
            >
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-muted text-foreground rounded-lg md:rounded-2xl flex items-center justify-center font-medium font-headline text-lg md:text-2xl shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {step.number}
                </div>
                
                <div className="space-y-1.5 md:space-y-4">
                  <h3 className="text-sm md:text-3xl font-medium font-headline tracking-tighter text-foreground group-hover:text-primary transition-colors leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-normal text-[10px] md:text-lg font-body line-clamp-3 md:line-clamp-none">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
