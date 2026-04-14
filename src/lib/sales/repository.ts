import type {
  SalesActivity,
  SalesCalendarEvent,
  SalesCustomer,
  SalesDeal,
  SalesLead,
  SalesNote,
  SalesTask,
} from '@/lib/sales/types';
import { salesStore } from '@/lib/sales/store';

export interface SalesRepository {
  // Reads
  getLeads(): Promise<SalesLead[]>;
  getLead(id: string): Promise<SalesLead | undefined>;
  getDeals(): Promise<SalesDeal[]>;
  getDeal(id: string): Promise<SalesDeal | undefined>;
  getTasks(): Promise<SalesTask[]>;
  getCustomers(): Promise<SalesCustomer[]>;
  getCustomer(id: string): Promise<SalesCustomer | undefined>;
  getActivities(): Promise<SalesActivity[]>;
  getNotes(): Promise<SalesNote[]>;
  getCalendarEvents(): Promise<SalesCalendarEvent[]>;
  // Writes
  createLead(lead: SalesLead): Promise<SalesLead>;
  createCustomer(customer: SalesCustomer): Promise<SalesCustomer>;
  createTask(task: SalesTask): Promise<SalesTask>;
  createNote(note: SalesNote): Promise<SalesNote>;
  createActivity(activity: SalesActivity): Promise<SalesActivity>;
  createCalendarEvent(event: SalesCalendarEvent): Promise<SalesCalendarEvent>;
  updateTask(id: string, patch: Partial<SalesTask>): Promise<SalesTask | undefined>;
  updateLead(id: string, patch: Partial<SalesLead>): Promise<SalesLead | undefined>;
}

class MockSalesRepository implements SalesRepository {
  async getLeads() { return salesStore.leads; }
  async getLead(id: string) { return salesStore.leads.find((l) => l.id === id); }
  async getDeals() { return salesStore.deals; }
  async getDeal(id: string) { return salesStore.deals.find((d) => d.id === id); }
  async getTasks() { return salesStore.tasks; }
  async getCustomers() { return salesStore.customers; }
  async getCustomer(id: string) { return salesStore.customers.find((c) => c.id === id); }
  async getActivities() { return salesStore.activities; }
  async getNotes() { return salesStore.notes; }
  async getCalendarEvents() { return salesStore.calendarEvents; }

  async createLead(lead: SalesLead) {
    salesStore.leads.unshift(lead);
    return lead;
  }

  async createCustomer(customer: SalesCustomer) {
    salesStore.customers.unshift(customer);
    return customer;
  }

  async createTask(task: SalesTask) {
    salesStore.tasks.unshift(task);
    return task;
  }

  async createNote(note: SalesNote) {
    salesStore.notes.unshift(note);
    return note;
  }

  async createActivity(activity: SalesActivity) {
    salesStore.activities.unshift(activity);
    return activity;
  }

  async createCalendarEvent(event: SalesCalendarEvent) {
    salesStore.calendarEvents.push(event);
    return event;
  }

  async updateTask(id: string, patch: Partial<SalesTask>) {
    const idx = salesStore.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    salesStore.tasks[idx] = { ...salesStore.tasks[idx], ...patch };
    return salesStore.tasks[idx];
  }

  async updateLead(id: string, patch: Partial<SalesLead>) {
    const idx = salesStore.leads.findIndex((l) => l.id === id);
    if (idx === -1) return undefined;
    salesStore.leads[idx] = { ...salesStore.leads[idx], ...patch };
    return salesStore.leads[idx];
  }
}

export const salesRepository: SalesRepository = new MockSalesRepository();
