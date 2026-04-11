"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-slate-800 bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-medium text-lg font-body">
                FL
              </div>
              <span className="text-xl font-medium font-body tracking-tight text-slate-100">
                FluxLocatif
              </span>
            </Link>
            <p className="max-w-sm mb-6 text-sm leading-relaxed font-body font-normal text-slate-400">
              {t(
                "Optimisation locative premium pour propriétaires actifs, investisseurs et compagnies de gestion. Louez plus vite avec des candidats déjà qualifiés.",
                "Premium leasing optimization for active owners, investors, and property management companies. Rent faster with already qualified candidates."
              )}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-body font-medium uppercase tracking-widest text-slate-100">{t("Navigation", "Navigation")}</h4>
            <ul className="space-y-2 text-sm font-body font-normal text-slate-400">
              <li><Link href="/pricing" className="transition-colors hover:text-white">Tarifs</Link></li>
              <li><Link href="/services" className="transition-colors hover:text-white">Services</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-white">À propos</Link></li>
              <li><Link href="/faq" className="transition-colors hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-body font-medium uppercase tracking-widest text-slate-100">{t("Contact", "Contact")}</h4>
            <ul className="space-y-2 text-sm font-body font-normal text-slate-400">
              <li><Link href="/contact" className="transition-colors hover:text-white">Remplir le formulaire</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-white">Réserver un appel</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <div className="scroll-line-draw h-px w-full bg-slate-800" />
          <div className="flex flex-col items-center justify-between gap-4 pt-8 text-[12px] font-body font-normal text-slate-400 md:flex-row">
            <p>© {new Date().getFullYear()} FluxLocatif. {t("Tous droits réservés.", "All rights reserved.")}</p>
            <div className="flex gap-6">
              <Link href="/mentions-legales" className="transition-colors hover:text-white">{t("Mentions légales", "Legal notice")}</Link>
              <Link href="/politique-confidentialite" className="transition-colors hover:text-white">{t("Confidentialité", "Privacy")}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
