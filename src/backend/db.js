import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'
const DATABASE_NAME = process.env.DATABASE_NAME || 'ticket_board'

let client = null
let db = null

export async function connectDB() {
  try {
    client = new MongoClient(MONGODB_URI)
    await client.connect()
    db = client.db(DATABASE_NAME)
    console.log('Connected already')
    return db
  } catch (error) {
    console.error('MongoDB error do sumn!', error)
    throw error
  }
}

export function getDB() {
  if (!db) {
    throw new Error('Database not connected')
  }
  return db
}

export function getTicketsCollection() {
  const db = getDB()
  return db.collection('tickets')
}

export async function closeDB() {
  if (client) {
    await client.close()
    console.log('Closed MongoDB connection')
  }
}
