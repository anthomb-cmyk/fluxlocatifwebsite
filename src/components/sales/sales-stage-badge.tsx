import { Badge } from '@/components/ui/badge';
import { getFitClasses, getHealthClasses, getPriorityClasses, getStageClasses, getStageLabel } from '@/lib/sales/format';
import type {
  SalesCustomerHealth,
  SalesFit,
  SalesPipelineStage,
  SalesTaskPriority,
} from '@/lib/sales/types';

export function SalesStageBadge({ stage }: { stage: SalesPipelineStage }) {
  return <Badge className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${getStageClasses(stage)}`}>{getStageLabel(stage)}</Badge>;
}

export function SalesFitBadge({ fit }: { fit: SalesFit }) {
  return <Badge className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${getFitClasses(fit)}`}>{fit} fit</Badge>;
}

export function SalesPriorityBadge({ priority }: { priority: SalesTaskPriority }) {
  return <Badge className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${getPriorityClasses(priority)}`}>{priority}</Badge>;
}

export function SalesHealthBadge({ health }: { health: SalesCustomerHealth }) {
  return <Badge className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${getHealthClasses(health)}`}>{health.replace('_', ' ')}</Badge>;
}
