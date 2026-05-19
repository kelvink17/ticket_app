import { useState, useEffect } from 'react'
import './App.css'
import TicketSummary from './components/TicketSummary'
import TicketForm from './components/TicketForm'
import TicketList from './components/TicketList'
import TicketFilters from './components/TicketFilters'

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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: ''
  })

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3005'

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams()
      if (filters.status) params.append('status', filters.status)
      if (filters.priority) params.append('priority', filters.priority)
      if (filters.category) params.append('category', filters.category)

      const response = await fetch(`${API_URL}/api/tickets?${params}`)
      if (!response.ok) throw new Error('Failed to fetch tickets')
      const data = await response.json()
      setTickets(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tickets')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTicket = async (formData: any) => {
    try {
      const response = await fetch(`${API_URL}/api/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create ticket')
      }
      fetchTickets()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create ticket')
    }
  }

  const handleUpdateStatus = async (ticketId: string, newStatus: string) => {
    try {
      const response = await fetch(`${API_URL}/api/tickets/${ticketId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update status')
      }
      fetchTickets()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update ticket')
    }
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  useEffect(() => {
    if (filters.status || filters.priority || filters.category) {
      fetchTickets()
    }
  }, [filters])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Support Ticket Board</h1>
      </header>

      <main className="app-main">
        {error && <div className="error-message">{error}</div>}

        <TicketSummary tickets={tickets} />

        <div className="content-grid">
          <section className="form-section">
            <h2>Create New Ticket</h2>
            <TicketForm onSubmit={handleCreateTicket} />
          </section>

          <section className="tickets-section">
            <h2>Tickets</h2>
            <TicketFilters onFilterChange={handleFilterChange} currentFilters={filters} />
            {loading ? (
              <p className="loading">Loading tickets...</p>
            ) : (
              <TicketList 
                tickets={tickets} 
                onUpdateStatus={handleUpdateStatus}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
