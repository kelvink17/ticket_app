import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB, getTicketsCollection } from './db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3005

app.use(cors())
app.use(express.json())

connectDB().catch(error => {
  console.error('MongoDB connection failed', error)
  process.exit(1)
})

app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await getTicketsCollection().find().sort({ createdAt: -1 }).toArray()
    return res.json(tickets)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: 'Failed to load tickets' })
  }
})

app.post('/api/tickets', async (req, res) => {
  const { title, description = '', category = 'General', priority = 'Low', createdBy } = req.body || {}
  if (!title || !createdBy) {
    return res.status(400).json({ success: false, message: 'title and createdBy are required' })
  }

  try {
    const now = new Date()
    const ticket = {
      ticketId: `TCK-${Date.now()}`,
      title: String(title).trim(),
      description: String(description).trim(),
      category,
      priority,
      status: 'Open',
      createdBy: String(createdBy).trim(),
      createdAt: now,
      updatedAt: now
    }

    const result = await getTicketsCollection().insertOne(ticket)
    return res.status(201).json({ success: true, ticket: { ...ticket, _id: result.insertedId } })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: 'Failed to save ticket' })
  }
})

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
