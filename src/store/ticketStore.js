import { reactive } from "vue";

const STORAGE_KEY = 'ticketapp_tickets';

function loadFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export const ticketStore = reactive({
  tickets: loadFromStorage(),

  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tickets));
    } catch (e) {
      console.error('Failed to save tickets', e);
    }
  },

  add(ticket) {
    const newTicket = {
      id: Date.now().toString(),
      title: ticket.title,
      description: ticket.description || '',
      status: ticket.status,
      priority: ticket.priority || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.tickets.push(newTicket);
    this._save();
    return newTicket;
  },

  update(updated) {
    const i = this.tickets.findIndex(t => t.id === updated.id);
    if (i !== -1) {
      this.tickets[i] = { ...this.tickets[i], ...updated, updatedAt: new Date().toISOString() };
      this._save();
      return true;
    }
    return false;
  },

  remove(id) {
    const originalLength = this.tickets.length;
    this.tickets = this.tickets.filter(t => t.id !== id);
    this._save();
    return this.tickets.length < originalLength;
  },

  refresh() {
    this.tickets = loadFromStorage();
  },
});
