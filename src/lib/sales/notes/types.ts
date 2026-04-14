import type { SalesEntityType, SalesNote, SalesNoteCategory } from '@/lib/sales/types';

export interface CreateSalesNoteInput {
  entityType: SalesEntityType;
  entityId: string;
  category: SalesNoteCategory;
  title: string;
  content: string;
}

export interface SalesNotesProviderStatus {
  providerName: string;
  configured: boolean;
  message: string;
}

export interface SalesNotesProvider {
  getStatus(): Promise<SalesNotesProviderStatus>;
  listNotes(entityType?: SalesEntityType, entityId?: string): Promise<SalesNote[]>;
  createNoteDraft(input: CreateSalesNoteInput): Promise<{ queued: boolean; message: string }>;
}

