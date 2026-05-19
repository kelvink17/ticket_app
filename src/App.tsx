import { useEffect, useState } from 'react'
import './App.css'
import TicketFilters from './components/TicketFilters'
import TicketForm from './components/TicketForm'
import TicketList from './components/TicketList'
import TicketSummary from './components/TicketSummary'

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
  updatedAt: string
}

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

  const handleCreateTicket = async (formData: any) => {
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

  const handleUpdateStatus = (ticketId: string, newStatus: string) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket._id === ticketId ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString() } : ticket
      )
    )
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
            <section className="tictets-display-section">
              <TicketFilters onFilterChange={handleFilterChange} currentFilters={filters} />
              <TicketList tickets={filteredTickets} onUpdateStatus={handleUpdateStatus} />
            </section>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
