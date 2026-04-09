import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Mentions légales | FluxLocatif",
  description: "Informations légales de FluxLocatif.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <section className="container mx-auto px-6 py-16">
          <h1 className="text-4xl font-headline font-medium tracking-tight text-foreground">
            Mentions légales
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground font-body">
            Ce site est édité par FluxLocatif. Pour toute question, contactez-nous via le formulaire de contact.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
