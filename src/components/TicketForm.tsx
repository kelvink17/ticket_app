import { useState } from 'react'
import type { TicketFormData } from '../types'

interface TicketFormProps {
  onSubmit: (data: TicketFormData) => void
}

export default function TicketForm({ onSubmit }: TicketFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'IT',
    priority: 'Medium',
    createdBy: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.description.trim() || !formData.createdBy.trim()) {
      alert('Please fill in all fields')
      return
    }
    onSubmit(formData)
    setFormData({
      title: '',
      description: '',
      category: 'IT',
      priority: 'Medium',
      createdBy: ''
    })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      {submitted && <div className="success-message">Ticket created successfully!</div>}
      
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Brief issue title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Detailed description"
          rows={4}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>IT</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Facilities</option>
            <option>General</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority *</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="createdBy">Your Name *</label>
        <input
          id="createdBy"
          type="text"
          name="createdBy"
          value={formData.createdBy}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
      </div>

      <button type="submit" className="btn-primary">Create Ticket</button>
    </form>
  )
}
