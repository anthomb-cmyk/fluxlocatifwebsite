import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "FluxLocatif est-il une compagnie de gestion immobilière ?",
    answer:
      "Non. FluxLocatif est un service locatif externalisé centré sur la gestion des demandes, la préqualification et le suivi des dossiers.",
  },
  {
    question: "Qui prend la décision finale sur les candidatures ?",
    answer:
      "Le client garde la décision finale. FluxLocatif prépare, qualifie et priorise les dossiers en amont.",
  },
  {
    question: "Que prenez-vous en charge exactement ?",
    answer:
      "Le flux entrant, le tri initial, la préqualification, le suivi du pipeline et la présentation structurée des dossiers.",
  },
  {
    question: "À qui s’adresse le service ?",
    answer:
      "Aux investisseurs, propriétaires actifs, portefeuilles multi-unités et équipes de gestion qui veulent réduire la charge locative manuelle.",
  },
  {
    question: "Comment se compare le coût à une agence de location conventionnelle ?",
    answer:
      "Selon le volume et l’organisation recherchée, FluxLocatif peut coûter jusqu’à 50 % moins cher qu’une agence de location conventionnelle.",
  },
];

export function FAQPreview() {
  return (
    <section id="faq" className="relative overflow-hidden bg-[#fbfcff] py-24 md:py-36">
      <div className="section-grid section-fade absolute inset-0 opacity-40" />
      <div className="container mx-auto px-6">
        <div className="reveal-animation reveal-title mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-medium leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl font-headline">
            Questions fréquentes
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500 font-body">
            Les réponses aux points qui ralentissent le plus souvent la décision.
          </p>
        </div>

        <div className="reveal-animation reveal-card mx-auto mt-14 max-w-4xl rounded-[34px] border border-white/90 bg-white/94 p-4 shadow-[0_28px_90px_rgba(15,23,42,0.05)] backdrop-blur-sm md:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={faq.question} value={`item-${idx}`} className="border-slate-100 px-2 md:px-4">
                <AccordionTrigger className="py-6 text-left text-lg font-medium tracking-tight text-slate-950 font-headline hover:no-underline md:text-xl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 pr-2 text-base leading-7 text-slate-500 font-body md:pr-10">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
