
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FAQPreview } from "@/components/sections/FAQPreview";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-medium mb-6">Questions Fréquentes</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body font-normal">
              Tout ce que vous devez savoir sur notre service d&apos;optimisation locative.
            </p>
          </div>
        </section>

        <FAQPreview />

        <section className="py-20 bg-muted/30 border-t">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-2xl font-headline font-medium mb-4">Vous avez d'autres questions ?</h2>
            <p className="text-muted-foreground mb-8 font-body font-normal">
              Notre équipe est là pour vous aider à comprendre comment FluxLocatif peut transformer votre gestion.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="default">
                <Link href="/contact">Nous contacter</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Réserver un appel</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
