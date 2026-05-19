const VALID_STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed']
const VALID_PRIORITIES = ['Low', 'Medium', 'High', 'Critical']
const VALID_CATEGORIES = ['IT', 'HR', 'Finance', 'Facilities', 'General']

export function validateTicketCreate(data) {
  const errors = []

  if (!data.title || !data.title.trim()) {
    errors.push('Title is required')
  }
  if (!data.description || !data.description.trim()) {
    errors.push('Description is required')
  }
  if (!data.category || !VALID_CATEGORIES.includes(data.category)) {
    errors.push('Invalid category')
  }
  if (!data.priority || !VALID_PRIORITIES.includes(data.priority)) {
    errors.push('Invalid priority')
  }
  if (!data.createdBy || !data.createdBy.trim()) {
    errors.push('Created by is required')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateStatus(status) {
  if (!VALID_STATUSES.includes(status)) {
    return {
      isValid: false,
      message: 'Invalid ticket status.'
    }
  }
  return { isValid: true }
}

export function validatePriority(priority) {
  if (!VALID_PRIORITIES.includes(priority)) {
    return {
      isValid: false,
      message: 'Invalid ticket priority.'
    }
  }
  return { isValid: true }
}

export { VALID_STATUSES, VALID_PRIORITIES, VALID_CATEGORIES }
