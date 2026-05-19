import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const DATABASE_NAME = process.env.DATABASE_NAME || 'ticket_board'

const sampleTickets = [
  {
    _id: 'TCK-0001',
    ticketId: 'TCK-0001',
    title: 'Laptop not charging',
    description: 'The laptop battery does not charge even when plugged in. Tried multiple chargers.',
    category: 'IT',
    priority: 'High',
    status: 'Open',
    createdBy: 'Jane Smith',
    createdAt: new Date('2026-05-19T08:00:00Z'),
    updatedAt: new Date('2026-05-19T08:00:00Z')
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
    createdAt: new Date('2026-05-18T10:30:00Z'),
    updatedAt: new Date('2026-05-19T09:00:00Z')
  },
  {
    _id: 'TCK-0003',
    ticketId: 'TCK-0003',
    title: 'Monthly budget report missing',
    description: 'The May budget report was not submitted. Please check the finance folder.',
    category: 'Finance',
    priority: 'Critical',
    status: 'Open',
    createdBy: 'Alice Johnson',
    createdAt: new Date('2026-05-19T11:15:00Z'),
    updatedAt: new Date('2026-05-19T11:15:00Z')
  },
  {
    _id: 'TCK-0004',
    ticketId: 'TCK-0004',
    title: 'Office kitchen refrigerator broken',
    description: 'The refrigerator in the kitchen is not cooling. Food is getting spoiled.',
    category: 'Facilities',
    priority: 'High',
    status: 'In Progress',
    createdBy: 'Bob Wilson',
    createdAt: new Date('2026-05-18T14:00:00Z'),
    updatedAt: new Date('2026-05-19T08:30:00Z')
  },
  {
    _id: 'TCK-0005',
    ticketId: 'TCK-0005',
    title: 'Need office supplies',
    description: 'Running low on pens, notepads, and printer paper.',
    category: 'General',
    priority: 'Low',
    status: 'Open',
    createdBy: 'Carol White',
    createdAt: new Date('2026-05-17T09:45:00Z'),
    updatedAt: new Date('2026-05-17T09:45:00Z')
  },
  {
    _id: 'TCK-0006',
    ticketId: 'TCK-0006',
    title: 'VPN connection issues',
    description: 'VPN keeps dropping when working from home. Connection unstable.',
    category: 'IT',
    priority: 'High',
    status: 'Resolved',
    createdBy: 'David Lee',
    createdAt: new Date('2026-05-16T13:20:00Z'),
    updatedAt: new Date('2026-05-19T07:00:00Z')
  },
  {
    _id: 'TCK-0007',
    ticketId: 'TCK-0007',
    title: 'Salary advance request',
    description: 'Requesting salary advance for emergency medical expenses.',
    category: 'HR',
    priority: 'Medium',
    status: 'Open',
    createdBy: 'Emma Davis',
    createdAt: new Date('2026-05-19T15:30:00Z'),
    updatedAt: new Date('2026-05-19T15:30:00Z')
  },
  {
    _id: 'TCK-0008',
    ticketId: 'TCK-0008',
    title: 'Invoice processing delay',
    description: 'Vendor invoice stuck in approval. Need expedited review.',
    category: 'Finance',
    priority: 'Medium',
    status: 'In Progress',
    createdBy: 'Frank Brown',
    createdAt: new Date('2026-05-18T11:00:00Z'),
    updatedAt: new Date('2026-05-19T09:30:00Z')
  }
]

async function seedDatabase() {
  let client
  try {
    client = new MongoClient(MONGODB_URI)
    await client.connect()
    const db = client.db(DATABASE_NAME)
    const collection = db.collection('tickets')

    // Clear existing tickets
    await collection.deleteMany({})
    console.log('Cleared existing tickets')

    // Insert sample tickets
    const result = await collection.insertMany(sampleTickets)
    console.log(`Inserted ${result.insertedCount} sample tickets`)

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  } finally {
    if (client) {
      await client.close()
    }
  }
}

seedDatabase()
