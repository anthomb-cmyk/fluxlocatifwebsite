import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { FAQPreview } from "@/components/sections/FAQPreview";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-medium mb-6">Investissez dans votre tranquillité</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-body">
              Des forfaits fixes, transparents et sans engagement à long terme. Le prix de l&apos;efficacité locative.
            </p>
          </div>
        </section>

        <PricingPreview />

        <section className="py-20 bg-background border-t border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-medium mb-12 text-center">Inclus dans tous nos forfaits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Zéro Commission", desc: "Pas de frais de mise en location ou de frais d&apos;agence." },
                { title: "Filtrage Expert", desc: "Préqualification rigoureuse selon vos critères spécifiques." },
                { title: "Support Continu", desc: "Une équipe à vos côtés jusqu&apos;à la signature du bail." },
                { title: "Flexibilité", desc: "Ajustez ou annulez votre forfait selon vos besoins locatifs." }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl border bg-muted/20">
                  <h3 className="font-medium font-body mb-2 text-primary">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-body font-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQPreview />

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-headline font-medium mb-6">Besoin d'un plan sur mesure ?</h2>
            <p className="text-lg text-muted-foreground mb-8 font-body">
              Pour les portefeuilles de plus de 6 unités ou les besoins spécifiques à grande échelle, contactez-nous pour une proposition personnalisée.
            </p>
            <Button asChild variant="outline" size="lg" className="font-body">
              <Link href="/contact">Réserver un appel conseil</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}