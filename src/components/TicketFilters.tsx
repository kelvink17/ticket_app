
interface Filters {
  status: string
  priority: string
  category: string
}

interface TicketFiltersProps {
  onFilterChange: (filters: Filters) => void
  currentFilters: Filters
}

export default function TicketFilters({ onFilterChange, currentFilters }: TicketFiltersProps) {
  const handleChange = (field: string, value: string) => {
    onFilterChange({ ...currentFilters, [field]: value })
  }

  return (
    <div className="filters-container">
      <div className="filter-group">
        <label htmlFor="filter-status">Status:</label>
        <select
          id="filter-status"
          value={currentFilters.status}
          onChange={(e) => handleChange('status', e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-priority">Priority:</label>
        <select
          id="filter-priority"
          value={currentFilters.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-category">Category:</label>
        <select
          id="filter-category"
          value={currentFilters.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Facilities">Facilities</option>
          <option value="General">General</option>
        </select>
      </div>
    </div>
  )
}
 