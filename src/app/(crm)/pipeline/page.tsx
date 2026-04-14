'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  candidates,
  properties,
  getProperty,
  pipelineStageLabels,
  pipelineStageOrder,
  type PipelineStage,
} from '@/lib/crm/data';
import { renderStars, getDaysColor, formatCurrency } from '@/lib/crm/utils';
import { CrmPageHeader } from '@/components/crm/crm-page-header';
import { CrmPanel, CrmPanelBody } from '@/components/crm/crm-panel';
import { StatusBadge } from '@/components/crm/status-badge';
import { cn } from '@/lib/utils';

const STAGE_ACCENT: Partial<Record<PipelineStage, string>> = {
  decision: 'border-l-violet-400',
  visit: 'border-l-blue-400',
  presented_to_client: 'border-l-indigo-400',
  to_review: 'border-l-amber-400',
  signed: 'border-l-emerald-400',
  rejected: 'border-l-slate-200',
};

const totalInPipeline = candidates.filter(c => !['signed', 'rejected'].includes(c.pipelineStage)).length;
const needsAction = candidates.filter(c => ['to_review', 'decision', 'missing_info'].includes(c.pipelineStage)).length;
const inVisit = candidates.filter(c => c.pipelineStage === 'visit').length;
const signed = candidates.filter(c => c.pipelineStage === 'signed').length;

export default function PipelinePage() {
  const [propertyFilter, setPropertyFilter] = useState<string>('all');

  const filtered = propertyFilter === 'all'
    ? candidates
    : candidates.filter(c => c.targetPropertyId === propertyFilter);

  const activeStages = pipelineStageOrder.filter(s => s !== 'rejected');
  const groups = activeStages
    .map(stage => ({
      stage,
      label: pipelineStageLabels[stage],
      items: filtered.filter(c => c.pipelineStage === stage),
    }))
    .filter(g => g.items.length > 0);

  return (
    <div className="space-y-6">
      <CrmPageHeader
        eyebrow="Qualification"
        title="Pipeline"
        stats={[
          { label: 'En cours', value: String(totalInPipeline), hint: 'Actifs' },
          { label: 'Action requise', value: String(needsAction), hint: 'À traiter' },
          { label: 'En visite', value: String(inVisit), hint: 'Planifiées' },
          { label: 'Signés', value: String(signed), hint: 'Complétés' },
        ]}
        actions={(
          <select
            className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-[13px] text-slate-700 outline-none focus:border-slate-400"
            value={propertyFilter}
            onChange={e => setPropertyFilter(e.target.value)}
          >
            <option value="all">Toutes les propriétés</option>
            {properties.filter(p => !['rented', 'closed'].includes(p.status)).map(p => (
              <option key={p.id} value={p.id}>{p.address.split(',')[0]}</option>
            ))}
          </select>
        )}
      />

      {groups.length === 0 ? (
        <CrmPanel>
          <CrmPanelBody className="py-14 text-center">
            <p className="text-[13px] text-slate-400">Aucun candidat dans le pipeline.</p>
          </CrmPanelBody>
        </CrmPanel>
      ) : (
        <div className="space-y-4">
          {groups.map(({ stage, label, items }) => (
            <CrmPanel key={stage}>
              {/* Stage header */}
              <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">{label}</p>
                <span className={cn(
                  'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                  stage === 'decision' ? 'bg-violet-50 text-violet-600' :
                  stage === 'visit' ? 'bg-blue-50 text-blue-600' :
                  stage === 'presented_to_client' ? 'bg-indigo-50 text-indigo-600' :
                  stage === 'to_review' ? 'bg-amber-50 text-amber-600' :
                  stage === 'signed' ? 'bg-emerald-50 text-emerald-700' :
                  'bg-slate-100 text-slate-500'
                )}>
                  {items.length}
                </span>
              </div>

              {/* Candidate rows */}
              <CrmPanelBody className="space-y-0 pt-0">
                {items.sort((a, b) => b.daysInStage - a.daysInStage).map(candidate => {
                  const property = getProperty(candidate.targetPropertyId);
                  return (
                    <Link
                      key={candidate.id}
                      href={`/candidates/${candidate.id}`}
                      className={cn(
                        'flex items-center gap-4 border-l-2 border-t border-slate-100 py-3 pl-4 first:border-t-0 transition-colors hover:bg-slate-50/60',
                        STAGE_ACCENT[stage] ?? 'border-l-slate-200'
                      )}
                    >
                      {/* Avatar */}
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100">
                        <span className="text-[10px] font-semibold text-slate-500">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>

                      {/* Name + property */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-semibold text-slate-900">{candidate.name}</p>
                        {property && (
                          <p className="mt-0.5 truncate text-[11px] text-slate-400">{property.address.split(',')[0]} · {formatCurrency(property.rent)}/mois</p>
                        )}
                      </div>

                      {/* Stars */}
                      <span className="shrink-0 text-[13px] text-amber-500">{renderStars(candidate.qualificationLevel)}</span>

                      {/* Credit */}
                      <StatusBadge type="candidate" status={candidate.status} />

                      {/* Days in stage */}
                      {candidate.daysInStage > 0 && (
                        <span className={cn('shrink-0 text-[12px] font-medium', getDaysColor(candidate.daysInStage))}>
                          {candidate.daysInStage}j
                        </span>
                      )}
                    </Link>
                  );
                })}
              </CrmPanelBody>
            </CrmPanel>
          ))}
        </div>
      )}
    </div>
  );
}
