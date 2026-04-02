import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FAQPreview } from "@/components/sections/FAQPreview";
import { Benefits } from "@/components/sections/Benefits";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, TrendingUp, Sparkles, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <section className="py-16 md:py-36 bg-[#FAFAFA] relative overflow-hidden border-t border-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.4]"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mb-12 md:mb-20 reveal-animation reveal-title">
              <div className="inline-flex items-center gap-2.5 py-1.5 px-4 rounded-full bg-white border border-slate-200 shadow-sm text-primary font-medium text-[10px] uppercase tracking-[0.25em] mb-6 md:mb-8 font-body">
                <Sparkles className="h-3 w-3" />
                <span>Clientèle cible</span>
              </div>
              <h2 className="text-3xl md:text-6xl font-headline font-medium mb-6 md:mb-8 tracking-tighter leading-tight text-slate-900 text-balance">
                Un support adapté <br className="hidden md:block" />
                à vos opérations locatives.
              </h2>
              <p className="text-base md:text-xl text-slate-500 font-normal max-w-2xl leading-relaxed font-body text-pretty">
                FluxLocatif prend en charge le suivi des demandes et utilise un algorithme de matching intelligent pour vous présenter les meilleurs candidats. Une solution performante, jusqu&apos;à 50 % moins chère qu&apos;une compagnie de location traditionnelle.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {[
                { 
                  title: "Propriétaires", 
                  desc: "Déléguez le tri initial et recevez uniquement des dossiers complets et vérifiés.",
                  icon: <ShieldCheck className="h-5 w-5 md:h-6" />,
                  tag: "Prequalification",
                  highlight: "Dossiers 100% vérifiés"
                },
                { 
                  title: "Investisseurs", 
                  desc: "Optimisez votre processus locatif avec un suivi rigoureux pour limiter la vacance.",
                  icon: <TrendingUp className="h-5 w-5 md:h-6" />,
                  tag: "Performance",
                  highlight: "Optimisation rendement"
                },
                { 
                  title: "Gestionnaires", 
                  desc: "Libérez vos équipes du traitement fastidieux des messages entrants.",
                  icon: <LayoutDashboard className="h-5 w-5 md:h-6" />,
                  tag: "Opérations",
                  highlight: "Pipeline automatisé",
                  className: "col-span-2 lg:col-span-1"
                }
              ].map((item, i) => (
                <div key={i} className={`group relative p-5 md:p-10 rounded-[1.5rem] md:rounded-[3rem] bg-white border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-700 reveal-animation reveal-card ${item.className || ""}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="flex justify-between items-start mb-4 md:mb-8">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      {item.icon}
                    </div>
                    <div className="hidden xs:block px-2 py-1 rounded-full bg-slate-50 border border-slate-100 group-hover:bg-primary/5 transition-colors">
                      <span className="text-[8px] font-medium uppercase tracking-widest text-slate-400 font-body group-hover:text-primary">{item.tag}</span>
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-4">
                    <h4 className="text-lg md:text-2xl font-medium font-headline tracking-tight text-slate-900 group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-slate-500 font-normal text-[12px] md:text-base leading-relaxed font-body line-clamp-3 md:line-clamp-none">{item.desc}</p>
                  </div>
                  
                  <div className="mt-4 md:mt-8 pt-4 md:pt-8 border-t border-slate-50 flex flex-col gap-3 md:gap-6">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-emerald-500"></div>
                      <span className="text-[8px] md:text-[10px] font-medium text-slate-900 font-body uppercase tracking-wider">{item.highlight}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Link href="/contact" className="flex items-center gap-2 text-[9px] md:text-[10px] font-medium text-slate-400 group-hover:text-primary transition-colors font-body">
                        <span>Détails</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Benefits />
        <HowItWorks />
        <FAQPreview />

        <section className="py-24 md:py-40 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/[0.03] -z-10 blur-[150px] opacity-70"></div>
          
          <div className="container mx-auto px-6 text-center max-w-6xl reveal-animation reveal-title">
            <h2 className="text-3xl md:text-7xl font-headline font-medium mb-6 md:mb-10 tracking-tighter leading-tight text-gradient text-balance">
              Structurez votre location.
            </h2>
            <p className="text-base md:text-xl text-slate-500 font-normal mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed font-body text-pretty">
              Nous assurons le suivi des demandes et le filtrage pour vous aider à signer avec les meilleurs candidats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Button asChild className="w-full sm:w-auto h-16 px-12 bg-primary text-white rounded-full text-lg font-medium shadow-2xl transition-all font-body">
                <Link href="/contact">Démarrer le service</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full sm:w-auto h-16 px-12 rounded-full text-lg font-medium font-body text-slate-500">
                <Link href="/contact">Parler à l&apos;équipe</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
