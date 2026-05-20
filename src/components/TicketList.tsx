import React, { useState } from 'react'
import type { Ticket } from '../types'

interface TicketListProps {
  tickets: Ticket[]
  onUpdateTicket: (ticketId: string, updatedFields: Partial<Ticket>) => Promise<void> | void
  onDelete: (ticketId: string) => Promise<void>
}

export default function TicketList({ tickets, onUpdateTicket, onDelete }: TicketListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<{
    title: string
    description: string
    category: string
    priority: string
    status: string
  } | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getPriorityClass = (priority: string) => {
    return `priority-${priority.toLowerCase()}`
  }

  if (tickets.length === 0) {
    return <p className="no-tickets">No tickets found</p>
  }

  const handleStartEdit = (ticket: Ticket) => {
    const targetId = ticket._id || ticket.ticketId
    setEditingId(targetId)
    setEditForm({
      title: ticket.title,
      description: ticket.description,
      category: ticket.category,
      priority: ticket.priority,
      status: ticket.status
    })
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editForm) return
    const { name, value } = e.target
    setEditForm(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleSave = async (ticketId: string) => {
    if (!editForm) return
    if (!editForm.title.trim() || !editForm.description.trim()) {
      alert('Title and description are required.')
      return
    }
    try {
      await onUpdateTicket(ticketId, editForm)
      setEditingId(null)
      setEditForm(null)
    } catch (error) {
      console.error('Error saving updates:', error)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleDelete = async (ticketId: string) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) {
      return
    }
    try {
      await onDelete(ticketId)
    } catch (error) {
      console.error('Error deleting ticket:', error)
    }
  }

  return (
    <div className="ticket-list">
      <table className="tickets-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => {
            const targetId = ticket._id || ticket.ticketId
            const isEditing = editingId === targetId

            return (
              <tr key={targetId}>
                <td className="ticket-id">{ticket.ticketId}</td>
                
                {isEditing && editForm ? (
                  <>
                    <td className="ticket-edit-cell">
                      <input
                        type="text"
                        name="title"
                        value={editForm.title}
                        onChange={handleFormChange}
                        className="edit-input"
                        required
                      />
                    </td>
                    <td className="ticket-edit-cell">
                      <textarea
                        name="description"
                        value={editForm.description}
                        onChange={handleFormChange}
                        className="edit-textarea"
                        rows={2}
                        required
                      />
                    </td>
                    <td className="ticket-edit-cell">
                      <select
                        name="category"
                        value={editForm.category}
                        onChange={handleFormChange}
                        className="edit-select"
                      >
                        <option>IT</option>
                        <option>HR</option>
                        <option>Finance</option>
                        <option>Facilities</option>
                        <option>General</option>
                      </select>
                    </td>
                    <td className="ticket-edit-cell">
                      <select
                        name="priority"
                        value={editForm.priority}
                        onChange={handleFormChange}
                        className="edit-select"
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                      </select>
                    </td>
                    <td className="ticket-edit-cell">
                      <select
                        name="status"
                        value={editForm.status}
                        onChange={handleFormChange}
                        className="edit-select"
                      >
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                        <option>Closed</option>
                      </select>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="ticket-title">{ticket.title}</td>
                    <td className="ticket-description">{ticket.description}</td>
                    <td className="ticket-category">{ticket.category}</td>
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
                  </>
                )}

                <td className="ticket-createdby">{ticket.createdBy}</td>
                <td className="ticket-date">{formatDate(ticket.createdAt)}</td>
                <td className="ticket-actions">
                  {isEditing ? (
                    <div className="action-buttons-group">
                      <button
                        type="button"
                        onClick={() => handleSave(targetId)}
                        className="save-button"
                      >
                        save
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="cancel-button"
                      >
                        cancel
                      </button>
                    </div>
                  ) : (
                    <div className="action-buttons-group">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(ticket)}
                        className="edit-button"
                      >
                        edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(targetId)}
                        className="delete-button"
                      >
                        delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
