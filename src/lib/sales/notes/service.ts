import type { SalesEntityType } from '@/lib/sales/types';
import { salesNotesProvider } from '@/lib/sales/notes/provider';

export async function getSalesNotesStatus() {
  return salesNotesProvider.getStatus();
}

export async function listSalesNotes(entityType?: SalesEntityType, entityId?: string) {
  return salesNotesProvider.listNotes(entityType, entityId);
}

