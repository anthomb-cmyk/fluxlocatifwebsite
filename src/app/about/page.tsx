import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LayoutDashboard, Target, Users, Sparkles, Filter, CheckCircle2 } from "lucide-react";
import { DashboardMockup } from "@/components/ui/dashboard-mockup";

export const metadata: Metadata = {
  title: "À propos | FluxLocatif",
  description:
    "Découvrez la mission de FluxLocatif et notre approche du support locatif externalisé pour propriétaires et équipes de gestion.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 -z-10 blur-[120px] rounded-full opacity-60"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[80px]"></div>

          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-24 md:mb-32">
              <div className="inline-flex items-center gap-2.5 py-2 px-5 rounded-full bg-white/60 backdrop-blur-2xl border border-white/80 shadow-sm text-primary font-medium text-[10px] uppercase tracking-[0.2em] mb-10 reveal-animation font-body">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Notre Identité</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-medium mb-10 tracking-tighter leading-[1.1] text-gradient reveal-animation delay-150 pb-2">
                Un barrière radicale contre le bruit locatif
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-normal reveal-animation delay-300 leading-relaxed font-body">
                FluxLocatif aide les propriétaires à ne plus jamais perdre de temps avec des candidats non qualifiés. Nous filtrons, vous louez.
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="relative aspect-[4/5] md:aspect-[16/10] w-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden mb-32 md:mb-40 shadow-2xl border-[8px] md:border-[16px] border-white bg-white reveal-animation delay-450">
                <DashboardMockup />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 mb-40">
                <div className="space-y-8 reveal-animation">
                  <h2 className="text-3xl md:text-5xl font-headline font-medium tracking-tighter text-foreground">Notre Mission</h2>
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-normal font-body">
                      FluxLocatif est né d’un constat simple : la location devient un fardeau quand on doit trier des centaines de messages inintéressants. 
                    </p>
                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-normal font-body">
                      Notre mission est d&apos;agir comme un filtre impénétrable pour que seuls les dossiers premium arrivent sur votre bureau.
                    </p>
                  </div>
                </div>
                <div className="space-y-8 reveal-animation delay-150">
                  <h2 className="text-3xl md:text-5xl font-headline font-medium tracking-tighter text-foreground">Notre Engagement</h2>
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-normal font-body">
                      Nous ne sommes pas là pour &quot;gérer&quot; vos immeubles. Nous sommes là pour optimiser votre tunnel de location.
                    </p>
                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-normal font-body">
                      Chaque candidat que nous vous envoyons est passé par un processus de préqualification rigoureux. Si ce n&apos;est pas parfait, vous ne le voyez pas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-12 md:p-24 rounded-[3rem] md:rounded-[5rem] reveal-animation delay-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 opacity-50"></div>
                <h2 className="text-4xl md:text-6xl font-headline font-medium mb-20 text-center tracking-tighter text-gradient">Ce qui nous distingue</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  {[
                    { icon: <Filter className="h-10 w-10" />, text: "Zéro candidat non qualifié envoyé à nos clients." },
                    { icon: <CheckCircle2 className="h-10 w-10" />, text: "On ne livre que des dossiers complets et vérifiés." },
                    { icon: <Users className="h-10 w-10" />, text: "Un support humain qui comprend vos critères de sélection." }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center space-y-8 group reveal-animation" style={{ animationDelay: `${450 + (i * 150)}ms` }}>
                      <div className="w-20 h-20 rounded-[2rem] bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700">
                        {item.icon}
                      </div>
                      <p className="font-medium text-foreground text-xl md:text-2xl leading-snug max-w-[260px] tracking-tighter font-body">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-24 pt-16 border-t border-border/50 text-center reveal-animation delay-750">
                  <p className="text-2xl text-muted-foreground font-normal max-w-4xl mx-auto italic leading-relaxed tracking-tighter font-body">
                    FluxLocatif n&apos;envoie pas de demandes. Nous envoyons des futurs locataires déjà validés.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
