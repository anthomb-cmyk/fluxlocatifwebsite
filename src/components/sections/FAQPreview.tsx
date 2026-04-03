import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "FluxLocatif est-il une agence immobilière ou une compagnie de gestion ?",
    answer:
      "Non. FluxLocatif agit comme un bureau de location externalisé spécialisé dans le traitement des demandes, la préqualification et l'organisation du pipeline locatif. Nous ne remplaçons pas une compagnie de gestion et nous ne nous présentons pas comme une agence traditionnelle.",
  },
  {
    question: "Qu'est-ce que vous prenez réellement en charge ?",
    answer:
      "Nous prenons en charge la gestion des demandes entrantes, le tri initial, la préqualification rigoureuse, le matching selon vos critères et la structuration du suivi locatif jusqu'à la remise de dossiers mieux préparés.",
  },
  {
    question: "À qui s'adresse le service ?",
    answer:
      "Le service est conçu pour les investisseurs immobiliers, propriétaires actifs, portefeuilles multi-unités et compagnies de gestion qui veulent réduire le travail locatif manuel sans perdre le contrôle sur la sélection finale.",
  },
  {
    question: "Comment le matching intelligent est-il utilisé ?",
    answer:
      "Le matching sert à mieux aligner les candidatures avec vos critères réels: revenus, solvabilité, compatibilité du dossier et niveau de priorité. L'objectif est de vous faire gagner du temps et d'améliorer la qualité des dossiers transmis.",
  },
  {
    question: "Pourquoi dites-vous que le service peut coûter jusqu'à 50 % moins cher ?",
    answer:
      "Parce que FluxLocatif est structuré pour prendre en charge une partie très précise et répétitive du travail locatif, avec une approche plus légère qu'une compagnie de location traditionnelle. Vous obtenez plus de structure et de cadence sans payer pour un modèle plus lourd que nécessaire.",
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
            Des réponses claires pour comprendre où FluxLocatif s'insère dans vos opérations locatives et ce que le service vous aide réellement à simplifier.
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
