"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "À propos", href: "/about" },
    { name: "Tarifs", href: "/pricing" },
    { name: "Réserver un appel", href: "/contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300",
      scrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-100 py-3" : "bg-transparent py-4 md:py-6"
    )}>
      <div className="container mx-auto px-6 md:px-8 h-10 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-[#3B82F6] rounded-[8px] flex items-center justify-center text-white font-bold text-[11px] shadow-[0_4px_12px_rgba(59,130,246,0.25)] group-hover:scale-105 transition-transform">
              FL
            </div>
            <span className="text-[18px] font-medium tracking-tight text-[#0F172A] font-body">
              FluxLocatif
            </span>
          </Link>
        </div>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[16px] font-medium text-slate-500 hover:text-[#3B82F6] transition-colors font-body"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center">
            <Button asChild size="lg" className="rounded-full px-8 font-medium h-11 bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-all shadow-[0_8px_20px_rgba(59,130,246,0.2)] text-[16px] font-body border-none">
              <Link href="/contact">Démarrer</Link>
            </Button>
          </div>
          
          <button
            className="md:hidden p-1.5 text-slate-600"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-2xl border-b transition-all duration-300 ease-in-out overflow-hidden shadow-2xl",
          isOpen ? "max-h-[500px] py-6" : "max-h-0 py-0 border-none"
        )}
      >
        <div className="flex flex-col px-6 gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[18px] font-medium tracking-tight text-slate-900 hover:text-[#3B82F6] font-body"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-2">
            <Button asChild variant="outline" className="w-full rounded-full h-11 font-medium text-[16px] font-body">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Réserver un appel
              </Link>
            </Button>
            <Button asChild className="w-full rounded-full h-11 font-medium text-[16px] bg-[#3B82F6] font-body shadow-lg">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Démarrer le service
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}