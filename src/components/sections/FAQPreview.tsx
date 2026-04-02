import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQPreview() {
  const faqs = [
    {
      question: "Quelle est la différence avec une agence immobilière ?",
      answer: "FluxLocatif n'est pas une agence et ne perçoit pas de commissions sur la location. En agissant comme votre bureau de location externalisé facturé au forfait fixe, notre service est jusqu'à 50 % moins cher qu'une compagnie de location traditionnelle. Notre rôle est d'assurer l'aspect opérationnel du suivi des demandes et d'appliquer notre algorithme de matching pour vous livrer des dossiers validés et hautement compatibles.",
    },
    {
      question: "Le service convient-il aux gestionnaires immobiliers ?",
      answer: "Oui. Nous travaillons avec des gestionnaires qui souhaitent externaliser le tri initial et la préqualification des candidats pour permettre à leurs équipes de se concentrer sur la gestion stratégique et technique des immeubles.",
    },
    {
      question: "Comment fonctionne la préqualification ?",
      answer: "Nous analysons les demandes entrantes selon vos critères de revenus, de solvabilité et d'historique locatif. Seuls les candidats répondant à vos exigences sont organisés dans votre pipeline pour la sélection finale.",
    },
    {
      question: "Le forfait Démarrage est-il récurrent ?",
      answer: "Le forfait Démarrage est un frais unique d'activation pour un logement actif. Pour un support mensuel continu sur plusieurs unités, les forfaits Croissance et Échelle sont des abonnements mensuels flexibles.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-headline font-medium mb-12 text-center">Questions fréquentes</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left font-medium py-6 font-headline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6 font-body text-base font-normal">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}