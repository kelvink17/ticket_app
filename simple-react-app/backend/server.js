import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB, getTicketsCollection, closeDB } from './db.js'
import { validateTicketCreate, validateStatus, validatePriority, VALID_STATUSES } from './validation.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3005

app.use(cors())
app.use(express.json())

let ticketCounter = 0


async function initializeCounter() {
  const collection = getTicketsCollection()
  const count = await collection.countDocuments()
  if (count === 0) {
    console.log('Database empty, seeding sample tickets...')
    await collection.insertMany([
      {
        _id: 'TCK-0001',
        ticketId: 'TCK-0001',
        title: 'Laptop not charging',
        description: 'The laptop battery does not charge even when plugged in. Tried multiple chargers.',
        category: 'IT',
        priority: 'High',
        status: 'Open',
        createdBy: 'Jane Smith',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 'TCK-0002',
        ticketId: 'TCK-0002',
        title: 'Update vacation policy',
        description: 'Need to add 2 extra days for summer break in the vacation policy.',
        category: 'HR',
        priority: 'Medium',
        status: 'In Progress',
        createdBy: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  }

  const lastTicket = await collection.findOne({}, { sort: { _id: -1 } })
  if (lastTicket && lastTicket.ticketId) {
    const num = parseInt(lastTicket.ticketId.replace('TCK-', '')) || 0
    ticketCounter = num
  }
}

function generateTicketId() {
  ticketCounter++
  return `TCK-${String(ticketCounter).padStart(4, '0')}`
}


app.get('/api/tickets', async (req, res) => {
  try {
    const collection = getTicketsCollection()
    const filters = {}

    if (req.query.status) {
      filters.status = req.query.status
    }
    if (req.query.priority) {
      filters.priority = req.query.priority
    }
    if (req.query.category) {
      filters.category = req.query.category
    }

    const tickets = await collection.find(filters).sort({ createdAt: -1 }).toArray()
    res.json(tickets)
  } catch (error) {
    console.error('Error fetching tickets:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch tickets' })
  }
})


app.post('/api/tickets', async (req, res) => {
  try {
    const validation = validateTicketCreate(req.body)
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.errors.join(', ')
      })
    }

    const ticketId = generateTicketId()
    const now = new Date()

    const ticket = {
      _id: ticketId,
      ticketId,
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      category: req.body.category,
      priority: req.body.priority,
      status: 'Open',
      createdBy: req.body.createdBy.trim(),
      createdAt: now,
      updatedAt: now
    }

    const collection = getTicketsCollection()
    await collection.insertOne(ticket)

    res.status(201).json({
      success: true,
      ticketId: ticket.ticketId,
      ticket
    })
  } catch (error) {
    console.error('Error creating ticket:', error)
    res.status(500).json({ success: false, message: 'Failed to create ticket' })
  }
})


app.patch('/api/tickets/:ticketId/status', async (req, res) => {
  try {
    const { ticketId } = req.params
    const { status } = req.body

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      })
    }

    const validation = validateStatus(status)
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      })
    }

    const collection = getTicketsCollection()
    const result = await collection.updateOne(
      { _id: ticketId },
      {
        $set: {
          status,
          updatedAt: new Date()
        }
      }
    )

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      })
    }

    res.json({
      success: true,
      ticketId,
      status
    })
  } catch (error) {
    console.error('Error updating ticket status:', error)
    res.status(500).json({ success: false, message: 'Failed to update ticket' })
  }
})


app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})


async function startServer() {
  try {
    await connectDB()
    await initializeCounter()

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

process.on('SIGINT', async () => {
  console.log('Shutting down...')
  await closeDB()
  process.exit(0)
})

startServer()
