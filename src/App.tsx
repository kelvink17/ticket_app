import { useEffect, useState } from 'react'
import TicketFilters from './components/TicketFilters'
import TicketForm from './components/TicketForm'
import TicketList from './components/TicketList'
import TicketSummary from './components/TicketSummary'
import type { Ticket, TicketFormData } from './types'

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: ''
  })

  useEffect(() => {
    fetch('/api/tickets')
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(data => setTickets(data))
      .catch(error => {
        console.error('Failed to load tickets from backend', error)
      })
  }, [])

  const filteredTickets = tickets.filter(ticket => {
    if (filters.status && ticket.status !== filters.status) return false
    if (filters.priority && ticket.priority !== filters.priority) return false
    if (filters.category && ticket.category !== filters.category) return false
    return true
  })

  const handleCreateTicket = async (formData: TicketFormData) => {
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'Unable to save ticket')
      }

      const result = await response.json()
      setTickets(prev => [result.ticket, ...prev])
    } catch (error) {
      console.error(error)
      alert('Could not save ticket to the database.')
    }
  }

  const handleUpdateTicket = async (ticketId: string, updatedFields: Partial<Ticket>) => {
    try {
      console.log('Updating ticket', ticketId, updatedFields)
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      })
      console.log('Update response status', response.status)
      if (!response.ok) {
        throw new Error('Failed to update ticket')
      }

      const result = await response.json()
      const updatedTicket = result.ticket

      setTickets(prev => prev.map(ticket => {
        const matchId = ticket._id || ticket.ticketId
        return matchId === ticketId ? { ...ticket, ...updatedTicket } : ticket
      }))
    } catch (error) {
      console.error(error)
      alert('Could not update ticket.')
    }
  }

  const handleDelete = async (ticketId: string) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) return
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, { method: 'DELETE' })
      if (!response.ok) {
        const err = await response.json().catch(() => null)
        throw new Error(err?.message || 'Failed to delete ticket')
      }
      setTickets(prev => prev.filter(ticket => {
        const matchId = ticket._id || ticket.ticketId
        return matchId !== ticketId
      }))
    } catch (error) {
      console.error(error)
      alert('Could not delete ticket.')
    }
  }

  const handleFilterChange = (newFilters: { status: string; priority: string; category: string }) => {
    setFilters(newFilters)
  }
  
  return (
    <>
      <section id="center">
        <div className="hero">
          <header>
            <h1>Mini Internal Support Ticket Board</h1>
          </header>
        </div>
      </section>

      <div className="app-container">
        <TicketSummary tickets={filteredTickets} />
        <main className="app-main">
          <div className="content-grid">
            <section className="tickets-section">
              <h2>Create New Ticket</h2>
              <TicketForm onSubmit={handleCreateTicket} />
              
            </section>
            <section className="tickets-display-section">
              <TicketFilters onFilterChange={handleFilterChange} currentFilters={filters} />
              <TicketList tickets={filteredTickets} onUpdateTicket={handleUpdateTicket} onDelete={handleDelete} />
            </section>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
