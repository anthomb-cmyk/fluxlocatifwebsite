'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import { getCandidate, getProperty } from '@/lib/crm/data';
import { StatusBadge } from '@/components/crm/status-badge';
import { formatCurrency, renderStars } from '@/lib/crm/utils';
import { CrmPanel, CrmPanelBody, CrmPanelEyebrow, CrmPanelHeader, CrmPanelTitle } from '@/components/crm/crm-panel';

const creditLabel: Record<string, string> = {
  excellent: 'Excellent',
  good: 'Bon',
  fair: 'Moyen',
  poor: 'Faible',
};
const creditColor: Record<string, string> = {
  excellent: 'bg-emerald-50 text-emerald-700',
  good: 'bg-blue-50 text-blue-700',
  fair: 'bg-amber-50 text-amber-700',
  poor: 'bg-rose-50 text-rose-600',
};
const qualLabel: Record<number, string> = {
  3: 'Dossier fort — prioritaire',
  2: 'Dossier acceptable — à compléter',
  1: 'Dossier faible — évaluer la compatibilité',
};

export default function CandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const candidate = getCandidate(id);

  if (!candidate) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-slate-500">Candidat introuvable.</p>
      </div>
    );
  }

  const property = getProperty(candidate.targetPropertyId);
  const docsReceived = candidate.documents.filter(d => d.received).length;
  const docsTotal = candidate.documents.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/candidates"
          className="mb-3 inline-flex items-center gap-1.5 text-[12px] text-slate-400 hover:text-slate-600"
        >
          <ArrowLeft className="h-3 w-3" />
          Tous les candidats
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Fiche candidat</p>
            <h1 className="mt-1 text-[1.35rem] font-semibold tracking-[-0.03em] text-slate-900">{candidate.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <StatusBadge type="candidate" status={candidate.status} />
              <span className="text-[13px] text-slate-500">{candidate.employment} · {candidate.employer}</span>
              <span className="text-[14px] text-amber-500">{renderStars(candidate.qualificationLevel)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {/* LEFT: Profile + docs */}
        <div className="space-y-4">
          {/* Contact & profile */}
          <CrmPanel>
            <CrmPanelHeader className="space-y-1">
              <CrmPanelEyebrow>Profil</CrmPanelEyebrow>
              <CrmPanelTitle>Informations personnelles</CrmPanelTitle>
            </CrmPanelHeader>
            <CrmPanelBody className="pt-0">
              <div className="grid gap-px overflow-hidden rounded-[14px] border border-slate-200 bg-slate-200">
                {[
                  { label: 'Téléphone', value: candidate.phone },
                  { label: 'Courriel', value: candidate.email },
                  { label: 'Emménagement', value: candidate.moveInDate.split('-').reverse().join('/') },
                  { label: 'Occupants', value: String(candidate.occupants) },
                  { label: 'Animaux', value: candidate.pets ? 'Oui' : 'Non' },
                  { label: 'Source', value: candidate.source },
                ].map(row => (
                  <div key={row.label} className="grid grid-cols-[110px_1fr] bg-white">
                    <div className="border-r border-slate-200 px-3 py-2.5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{row.label}</p>
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="text-[13px] text-slate-900">{row.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {property && (
                <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50/60 px-4 py-3">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Propriété ciblée</p>
                  <Link href={`/properties/${property.id}`} className="text-[13px] font-semibold text-blue-600 underline-offset-4 hover:underline">
                    {property.address}
                  </Link>
                  <p className="mt-0.5 text-[12px] text-slate-500">{property.unitType} · {formatCurrency(property.rent)}/mois</p>
                </div>
              )}
            </CrmPanelBody>
          </CrmPanel>

          {/* Documents */}
          <CrmPanel>
            <CrmPanelHeader className="flex items-center justify-between space-y-0">
              <div className="space-y-1">
                <CrmPanelEyebrow>Dossier</CrmPanelEyebrow>
                <CrmPanelTitle>Documents requis</CrmPanelTitle>
              </div>
              <span className="text-[13px] font-semibold text-slate-500">{docsReceived}/{docsTotal}</span>
            </CrmPanelHeader>
            <CrmPanelBody className="pt-0">
              <div className="space-y-2">
                {candidate.documents.map(doc => (
                  <div key={doc.name} className="flex items-center gap-2.5">
                    {doc.received ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    ) : (
                      <Circle className="h-4 w-4 shrink-0 text-slate-300" />
                    )}
                    <span className={`text-[13px] ${doc.received ? 'text-slate-700' : 'text-slate-400'}`}>{doc.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${docsTotal > 0 ? (docsReceived / docsTotal) * 100 : 0}%` }}
                />
              </div>
            </CrmPanelBody>
          </CrmPanel>
        </div>

        {/* RIGHT: Qualification + notes */}
        <div className="space-y-4">
          {/* Qualification */}
          <CrmPanel>
            <CrmPanelHeader className="space-y-1">
              <CrmPanelEyebrow>Qualification</CrmPanelEyebrow>
              <CrmPanelTitle>Analyse financière</CrmPanelTitle>
            </CrmPanelHeader>
            <CrmPanelBody className="pt-0">
              <div className="grid gap-px overflow-hidden rounded-[14px] border border-slate-200 bg-slate-200">
                <div className="grid grid-cols-[110px_1fr] bg-white">
                  <div className="border-r border-slate-200 px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Emploi</p>
                  </div>
                  <div className="px-3 py-2.5">
                    <p className="text-[13px] text-slate-900">{candidate.employment} · {candidate.employer}</p>
                  </div>
                </div>
                <div className="grid grid-cols-[110px_1fr] bg-white">
                  <div className="border-r border-slate-200 px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Revenu</p>
                  </div>
                  <div className="px-3 py-2.5">
                    <p className="font-mono text-[13px] font-semibold text-slate-900">{formatCurrency(candidate.income)}/an</p>
                  </div>
                </div>
                <div className="grid grid-cols-[110px_1fr] bg-white">
                  <div className="border-r border-slate-200 px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Crédit</p>
                  </div>
                  <div className="flex items-center px-3 py-2.5">
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${creditColor[candidate.credit]}`}>
                      {creditLabel[candidate.credit]}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-[110px_1fr] bg-white">
                  <div className="border-r border-slate-200 px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Historique TAL</p>
                  </div>
                  <div className="px-3 py-2.5">
                    <p className="text-[13px] text-slate-900">{candidate.talHistory}</p>
                  </div>
                </div>
              </div>

              {/* Score */}
              <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50/60 px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Score global</p>
                  <span className="text-[16px] text-amber-500">{renderStars(candidate.qualificationLevel)}</span>
                </div>
                <p className="mt-1 text-[12px] text-slate-500">{qualLabel[candidate.qualificationLevel]}</p>
              </div>
            </CrmPanelBody>
          </CrmPanel>

          {/* Notes */}
          <CrmPanel>
            <CrmPanelHeader className="space-y-1">
              <CrmPanelEyebrow>Notes</CrmPanelEyebrow>
            </CrmPanelHeader>
            <CrmPanelBody className="pt-0">
              <div className="min-h-[80px] rounded-[14px] border border-slate-200 bg-slate-50/60 px-4 py-3">
                <p className="text-[13px] leading-5 text-slate-700 whitespace-pre-wrap">{candidate.notes || 'Aucune note.'}</p>
              </div>
            </CrmPanelBody>
          </CrmPanel>
        </div>
      </div>
    </div>
  );
}
