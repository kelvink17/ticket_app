interface Ticket {
  _id: string
  ticketId: string
  title: string
  description: string
  category: string
  priority: string
  status: string
  createdBy: string
  createdAt: string
}

interface TicketListProps {
  tickets: Ticket[]
  onUpdateStatus: (ticketId: string, status: string) => void
}

export default function TicketList({ tickets, onUpdateStatus }: TicketListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getPriorityClass = (priority: string) => {
    return `priority-${priority.toLowerCase()}`
  }

  if (tickets.length === 0) {
    return <p className="no-tickets">No tickets found</p>
  }

  return (
    <div className="ticket-list">
      <table className="tickets-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td className="ticket-id">{ticket.ticketId}</td>
              <td className="ticket-title" title={ticket.description}>
                {ticket.title}
              </td>
              <td>{ticket.category}</td>
              <td>
                <span className={`priority-badge ${getPriorityClass(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </td>
              <td>
                <span className={`status-badge status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                  {ticket.status}
                </span>
              </td>
              <td>{ticket.createdBy}</td>
              <td>{formatDate(ticket.createdAt)}</td>
              <td>
                <select
                  value={ticket.status}
                  onChange={(e) => onUpdateStatus(ticket._id, e.target.value)}
                  className="status-select"
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
