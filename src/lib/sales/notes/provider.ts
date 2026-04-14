import { salesRepository } from '@/lib/sales/repository';
import type {
  CreateSalesNoteInput,
  SalesNotesProvider,
  SalesNotesProviderStatus,
} from '@/lib/sales/notes/types';

class PlaceholderSalesNotesProvider implements SalesNotesProvider {
  async getStatus(): Promise<SalesNotesProviderStatus> {
    const configured = Boolean(process.env.NOTES_API_BASE_URL && process.env.NOTES_API_KEY);

    return {
      providerName: 'External Notes API',
      configured,
      message: configured
        ? 'Env placeholders are present. Claude can replace this placeholder adapter with the real notes API client.'
        : 'Using the placeholder notes adapter until the real notes API credentials and endpoints are added.',
    };
  }

  async listNotes(entityType?: string, entityId?: string) {
    const notes = await salesRepository.getNotes();
    return notes.filter((note) => {
      if (entityType && note.entityType !== entityType) {
        return false;
      }

      if (entityId && note.entityId !== entityId) {
        return false;
      }

      return true;
    });
  }

  async createNoteDraft(input: CreateSalesNoteInput) {
    void input;

    // TODO(notes-api): replace this placeholder response with a real POST call
    // once NOTES_API_BASE_URL, auth, and collection semantics are finalized.
    return {
      queued: false,
      message: 'Notes draft action is scaffolded through the provider interface and ready for real API wiring.',
    };
  }
}

export const salesNotesProvider: SalesNotesProvider = new PlaceholderSalesNotesProvider();

