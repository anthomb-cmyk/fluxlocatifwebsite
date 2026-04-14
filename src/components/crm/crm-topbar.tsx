'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, ChevronRight, X } from 'lucide-react';
import { properties, candidates, clients } from '@/lib/crm/data';

function getPageMeta(pathname: string) {
  if (pathname.startsWith('/properties/')) return 'Propriété';
  if (pathname.startsWith('/properties')) return 'Propriétés';
  if (pathname.startsWith('/candidates/')) return 'Candidat';
  if (pathname.startsWith('/candidates')) return 'Candidats';
  if (pathname.startsWith('/clients/')) return 'Client';
  if (pathname.startsWith('/clients')) return 'Clients';
  if (pathname.startsWith('/pipeline')) return 'Pipeline';
  if (pathname.startsWith('/tasks')) return 'Tâches';
  if (pathname.startsWith('/communications')) return 'Communications';
  if (pathname.startsWith('/reports')) return 'Rapports';
  if (pathname.startsWith('/settings')) return 'Paramètres';
  return 'Tableau de bord';
}

export function CrmTopbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = searchQuery.length >= 2 ? [
    ...properties
      .filter(p => p.address.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 3)
      .map(p => ({ type: 'Propriété' as const, label: p.address, href: `/properties/${p.id}` })),
    ...candidates
      .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 3)
      .map(c => ({ type: 'Candidat' as const, label: c.name, href: `/candidates/${c.id}` })),
    ...clients
      .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 3)
      .map(c => ({ type: 'Client' as const, label: c.name, href: `/clients/${c.id}` })),
  ] : [];

  return (
    <>
      <header className="crm-topbar">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">FluxLocatif</span>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600">{getPageMeta(pathname)}</span>
        </div>

        {/* Search trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-[13px] text-slate-400 transition-colors hover:bg-white hover:border-slate-300"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Rechercher…</span>
          <kbd className="ml-2 rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[11px] text-slate-400">⌘K</kbd>
        </button>
      </header>

      {/* Search modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
          />
          <div className="relative w-full max-w-lg rounded-[20px] border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.18)]">
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                autoFocus
                type="text"
                placeholder="Propriétés, candidats, clients…"
                className="flex-1 bg-transparent text-[14px] text-slate-900 outline-none placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {searchResults.length > 0 && (
              <div className="max-h-72 overflow-y-auto py-1">
                {searchResults.map((result, i) => (
                  <a
                    key={i}
                    href={result.href}
                    className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-slate-700 hover:bg-slate-50"
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  >
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      result.type === 'Propriété' ? 'bg-blue-50 text-blue-600' :
                      result.type === 'Candidat' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {result.type}
                    </span>
                    <span>{result.label}</span>
                  </a>
                ))}
              </div>
            )}
            {searchQuery.length >= 2 && searchResults.length === 0 && (
              <div className="px-4 py-8 text-center text-[13px] text-slate-400">
                Aucun résultat pour &ldquo;{searchQuery}&rdquo;
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
