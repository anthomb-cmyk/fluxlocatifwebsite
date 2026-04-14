import { cn } from '@/lib/utils';
import {
  clientStatusLabels,
  propertyStatusLabels,
  candidateStatusLabels,
  pipelineStageLabels,
  type ClientStatus,
  type PropertyStatus,
  type CandidateStatus,
  type PipelineStage,
} from '@/lib/crm/data';
import {
  getClientStatusColor,
  getPropertyStatusColor,
  getCandidateStatusColor,
  getPipelineStageColor,
} from '@/lib/crm/utils';

type StatusType = 'client' | 'property' | 'candidate' | 'pipeline';

interface StatusBadgeProps {
  type: StatusType;
  status: string;
  className?: string;
}

export function StatusBadge({ type, status, className }: StatusBadgeProps) {
  let label = status;
  let color = 'bg-slate-100 text-slate-600';

  switch (type) {
    case 'client':
      label = clientStatusLabels[status as ClientStatus] || status;
      color = getClientStatusColor(status as ClientStatus);
      break;
    case 'property':
      label = propertyStatusLabels[status as PropertyStatus] || status;
      color = getPropertyStatusColor(status as PropertyStatus);
      break;
    case 'candidate':
      label = candidateStatusLabels[status as CandidateStatus] || status;
      color = getCandidateStatusColor(status as CandidateStatus);
      break;
    case 'pipeline':
      label = pipelineStageLabels[status as PipelineStage] || status;
      color = getPipelineStageColor(status as PipelineStage);
      break;
  }

  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold', color, className)}>
      {label}
    </span>
  );
}
