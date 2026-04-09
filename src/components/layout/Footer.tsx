import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-medium text-lg font-body">
                FL
              </div>
              <span className="text-xl font-medium font-body tracking-tight text-foreground">
                FluxLocatif
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6 font-body text-sm leading-relaxed font-normal">
              Optimisation locative premium pour propriétaires actifs, investisseurs et compagnies de gestion. Louez plus vite avec des candidats déjà qualifiés.
            </p>
          </div>

          <div>
            <h4 className="font-body font-medium mb-4 text-foreground text-sm uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-body font-normal">
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Tarifs</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">À propos</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-body font-medium mb-4 text-foreground text-sm uppercase tracking-widest">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-body font-normal">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Remplir le formulaire</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Réserver un appel</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <div className="scroll-line-draw h-px w-full bg-border/80" />
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-muted-foreground font-body font-normal">
            <p>© {new Date().getFullYear()} FluxLocatif. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link href="/mentions-legales" className="hover:text-primary transition-colors">Mentions légales</Link>
              <Link href="/politique-confidentialite" className="hover:text-primary transition-colors">Confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
