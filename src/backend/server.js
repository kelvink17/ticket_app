import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB, getTicketsCollection } from './db.js'
import { ObjectId } from 'mongodb'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3005

app.use(cors())
app.use(express.json())


connectDB().catch(error => {
  console.error('MongoDB connection failed', error)
  process.exit(1)
})
async function getSequenceOfTickets() {
  const ticketsCollection = getTicketsCollection().database.collection('counters')
  const sequenceDocument = await ticketsCollection.findOneAndUpdate(
    { _id: 'ticketId' },
    { $inc: { sequence_value: -1 } },
    { returnDocument: 'after', upsert: true }
  )
  return sequenceDocument.value.sequence_value
}

app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await getTicketsCollection().find().sort({ createdAt: -1 }).toArray()
    const serialized = tickets.map(t => ({ ...t, _id: String(t._id) }))
    return res.json(serialized)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: 'Failed to load tickets' })
  }
})
app.patch('/api/tickets/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { status, title, description, category, priority } = req.body

    const updateFields = {}
    if (status !== undefined) updateFields.status = status
    if (title !== undefined) updateFields.title = String(title).trim()
    if (description !== undefined) updateFields.description = String(description).trim()
    if (category !== undefined) updateFields.category = category
    if (priority !== undefined) updateFields.priority = priority

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ success: false, message: 'No fields to update' })
    }

    updateFields.updatedAt = new Date()

    console.log('PATCH /api/tickets/:id', { id, updateFields })
    if (!ObjectId.isValid(id)) {
      console.warn('Invalid ObjectId', id)
      return res.status(400).json({ success: false, message: 'Invalid id' })
    }
    const _id = new ObjectId(id)

    const result = await getTicketsCollection().findOneAndUpdate(
      { _id },
      { $set: updateFields },
      { returnDocument: 'after' }
    )

    if (!result.value) {
      return res.status(404).json({ success: false, message: 'Ticket not found' })
    }

    const ticket = { ...result.value, _id: String(result.value._id) }
    return res.json({ success: true, ticket })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: 'Failed to update ticket status' })
  }
})
app.delete('/api/tickets/:id', async (req, res) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid id' })
    }
    const _id = new ObjectId(id)
    const result = await getTicketsCollection().deleteOne({ _id })

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Ticket not found' })
    }

    return res.json({ success: true, message: 'Ticket deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: 'Failed to delete ticket' })
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
    return res.status(201).json({ success: true, ticket: { ...ticket, _id: String(result.insertedId) } })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: 'Failed to save ticket' })
  }
})

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
