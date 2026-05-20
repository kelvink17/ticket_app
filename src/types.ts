export interface Ticket {
  _id: string
  ticketId: string
  title: string
  description: string
  category: string
  priority: string
  status: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface TicketFormData {
  title: string
  description: string
  category: string
  priority: string
  createdBy: string
}

