import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité | FluxLocatif",
  description: "Politique de confidentialité de FluxLocatif.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <section className="container mx-auto px-6 py-16">
          <h1 className="text-4xl font-headline font-medium tracking-tight text-foreground">
            Politique de confidentialité
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground font-body">
            Les données soumises via le formulaire de contact sont utilisées uniquement pour répondre à vos demandes et ne sont jamais partagées avec des tiers.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
