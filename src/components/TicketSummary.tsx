interface Ticket {
  status: string
  priority: string
}

interface TicketSummaryProps {
  tickets: Ticket[]
}

export default function TicketSummary({ tickets }: TicketSummaryProps) {
  const totalTickets = tickets.length
  const openTickets = tickets.filter(t => t.status === 'Open').length
  const inProgressTickets = tickets.filter(t => t.status === 'In Progress').length
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length
  const highPriorityTickets = tickets.filter(t => t.priority === 'High' || t.priority === 'Critical').length

  return (
    <div className="summary-container">
      <div className="summary-card">
        <h3>Total Tickets</h3>
        <p className="summary-value">{totalTickets}</p>
      </div>
      <div className="summary-card">
        <h3>Open</h3>
        <p className="summary-value">{openTickets}</p>
      </div>
      <div className="summary-card">
        <h3>In Progress</h3>
        <p className="summary-value">{inProgressTickets}</p>
      </div>
      <div className="summary-card">
        <h3>Resolved</h3>
        <p className="summary-value">{resolvedTickets}</p>
      </div>
      <div className="summary-card">
        <h3>High Priority</h3>
        <p className="summary-value">{highPriorityTickets}</p>
      </div>
    </div>
  )
}
