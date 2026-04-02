
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { Phone, Mail, Clock, Sparkles } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <section className="py-24 bg-background relative overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-1/3 h-[800px] bg-primary/5 blur-[120px] -z-10 rounded-full opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-[600px] bg-primary/5 blur-[100px] -z-10 rounded-full opacity-40"></div>
          
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              {/* Left Column: Info */}
              <div className="lg:col-span-4 space-y-12 reveal-animation">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm text-primary font-medium text-[10px] uppercase tracking-[0.2em] font-body">
                    <Sparkles className="h-3 w-3" />
                    <span>Support dédié</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-headline font-medium tracking-tighter leading-none text-foreground">
                    Parlons de votre <span className="text-primary">croissance</span>.
                  </h1>
                  <p className="text-xl text-muted-foreground font-normal leading-relaxed font-body">
                    Prêt à déléguer le stress de la location ? Notre équipe analyse votre demande immédiatement pour structurer votre succès.
                  </p>
                </div>
                
                <div className="space-y-8 pt-4">
                  {[
                    { 
                      icon: <Phone className="h-6 w-6" />, 
                      title: "Réserver un appel", 
                      desc: "Démonstration de 15 min avec un expert." 
                    },
                    { 
                      icon: <Mail className="h-6 w-6" />, 
                      title: "Support Client", 
                      desc: "À votre disposition pour toute question." 
                    },
                    { 
                      icon: <Clock className="h-6 w-6" />, 
                      title: "Réponse rapide", 
                      desc: "Traitement des demandes en moins de 24h." 
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-6 group">
                      <div className="w-14 h-14 bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm text-primary rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        {item.icon}
                      </div>
                      <div className="pt-1">
                        <h4 className="font-medium font-headline text-lg mb-1 tracking-tight">{item.title}</h4>
                        <p className="text-muted-foreground font-normal text-sm leading-relaxed font-body">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-8 reveal-animation delay-150">
                <ContactForm />
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
