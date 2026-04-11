"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("Services", "Services"), href: "/services" },
    { name: t("À propos", "About"), href: "/about" },
    { name: t("Tarifs", "Pricing"), href: "/pricing" },
    { name: t("Réserver un appel", "Book a call"), href: "/contact" },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-3.5 md:px-6 md:pt-4">
      <div
        className={cn(
          "relative mx-auto max-w-[1240px] overflow-hidden rounded-full border border-white/85 bg-white/72 backdrop-blur-3xl transition-all duration-500",
          scrolled
            ? "shadow-[0_22px_55px_-30px_rgba(15,23,42,0.24)]"
            : "shadow-[0_14px_34px_-28px_rgba(15,23,42,0.12)]"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,255,255,0.58))]" />
        <div className="relative flex h-[60px] items-center justify-between px-5 md:h-[66px] md:px-8 lg:px-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(59,130,246,0.22)] transition-transform duration-300 group-hover:scale-[1.03] font-body">
              FL
            </div>
            <span className="text-[18px] font-semibold tracking-[-0.03em] text-slate-900 font-body">
              FluxLocatif
            </span>
          </Link>

          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-[13px] font-medium tracking-[0.02em] text-slate-500 transition-colors duration-300 hover:text-slate-900 font-body after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-slate-700 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="hidden md:inline-flex items-center justify-center h-10 px-3 rounded-full border border-slate-200/80 bg-white/80 text-[12px] font-semibold text-slate-600 tracking-wide hover:bg-white transition-colors font-body"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <Link
              href="/contact"
              className="hidden h-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-6 text-[13px] font-semibold text-white shadow-[0_12px_28px_rgba(59,130,246,0.2)] transition duration-300 hover:scale-[1.01] hover:shadow-[0_18px_34px_rgba(59,130,246,0.24)] md:inline-flex font-body"
            >
              {t("Démarrer", "Get started")}
            </Link>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/90 bg-white/90 text-slate-600 shadow-sm transition-colors hover:text-slate-900 md:hidden"
              onClick={() => setIsOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto mt-3 w-full max-w-full overflow-hidden rounded-[28px] border border-white/85 bg-white/95 backdrop-blur-xl shadow-[0_20px_40px_-28px_rgba(15,23,42,0.24)] transition-all duration-300 md:hidden md:max-w-[1240px]",
          isOpen ? "max-h-[420px] py-5 opacity-100" : "pointer-events-none max-h-0 border-transparent py-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-5 px-6">
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200/80 bg-white text-[13px] font-semibold text-slate-600 tracking-wide transition-colors hover:bg-slate-50 font-body"
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="truncate text-lg font-medium tracking-tight text-slate-900 hover:text-primary font-body"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-7 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(59,130,246,0.22)] transition hover:scale-[1.01] font-body"
            onClick={() => setIsOpen(false)}
          >
            {t("Démarrer le service", "Get started")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
