'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Filter, LayoutDashboard, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      icon: <LayoutDashboard className="h-6 w-6" />,
      title: "Bureau de Location Externalisé",
      description: "Notre équipe agit comme votre leasing desk : nous répondons à 100% des sollicitations et organisons votre pipeline pour que vous ne manquiez aucun candidat.",
      features: [
        "Réponse instantanée aux prospects",
        "Gestion complète des appels & emails",
        "Centralisation des flux de demandes"
      ],
      imageSrc: "/interface-v3.png",
      imageAlt: "Interface Bureau de location externalisé FluxLocatif"
    },
    {
      icon: <Filter className="h-6 w-6" />,
      title: "Préqualification & Vetting",
      description: "Une analyse exhaustive de chaque demande selon vos critères. Nous vérifions les revenus, la solvabilité et les références pour ne livrer que des dossiers premium.",
      features: [
        "Vérification des antécédents",
        "Analyse de solvabilité rigoureuse",
        "Contrôle systématique des références"
      ],
      imageSrc: "/interface-v4.png",
      imageAlt: "Interface Préqualification et vetting FluxLocatif"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <main className="flex-grow">
        <section className="pt-36 pb-20 bg-white relative overflow-hidden border-b">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 -z-10 blur-[120px] rounded-full opacity-60"></div>
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-[70px] font-headline font-medium mb-10 tracking-tighter text-slate-900 leading-[1.02] reveal-animation delay-150">
              Support Locatif <span className="text-slate-400">Structuré.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-normal leading-[1.5] reveal-animation delay-300 font-body">
              Optimisez votre processus avec notre bureau de location externalisé spécialisé dans le tri et la préqualification de haut niveau.
            </p>
          </div>
        </section>

        {services.map((service, idx) => (
          <section key={idx} className={cn(
            "pt-16 pb-32 md:pt-24 md:pb-40 relative overflow-hidden flex items-center min-h-[60vh]",
            idx % 2 === 1 ? "bg-white" : "bg-[#FAFAFA]"
          )}>
            <div className="container mx-auto px-6 max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                
                <div className={cn(
                  "lg:col-span-5 reveal-animation",
                  idx % 2 === 1 ? "lg:order-last" : ""
                )}>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-primary mb-8 shadow-sm">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-headline font-medium mb-6 tracking-tighter text-slate-900 leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-slate-500 text-lg leading-relaxed mb-10 font-normal font-body">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-4 mb-10">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-slate-700 font-medium text-base font-body">
                        <div className="h-5 w-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild size="lg" className="rounded-full h-12 px-8 bg-slate-900 text-white hover:bg-slate-800 font-medium text-[16px] leading-[27px] gap-2 group transition-all font-body">
                    <Link href="/contact">
                      Démarrer ce service 
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>

                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/10] w-full">
                    <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                      <Image
                        src={service.imageSrc}
                        alt={service.imageAlt}
                        fill
                        unoptimized
                        className="object-cover object-center"
                        priority={idx === 0}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        ))}

        <section className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
          <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
            <h2 className="text-4xl md:text-5xl font-headline font-medium text-white mb-6 tracking-tighter">
              Prêt à structurer votre location ?
            </h2>
            <p className="text-slate-400 text-xl mb-10 font-normal font-body">
              Rejoignez les propriétaires qui ont choisi l&apos;excellence opérationnelle.
            </p>
            <Button asChild size="lg" className="h-14 px-12 bg-primary text-white hover:bg-primary/90 rounded-full font-medium text-[16px] leading-[27px] shadow-2xl shadow-primary/20 font-body">
              <Link href="/contact">Démarrer maintenant</Link>
            </Button>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/10 blur-[150px] rounded-full opacity-30"></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
