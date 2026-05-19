import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = process.env.DATABASE_NAME || 'ticket_board';
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
    title: 'Monitor flickering',
    description: 'The monitor screen flickers intermittently, making it difficult to use.',
    category: 'IT',
    priority: 'Medium',
    status: 'Open',
    createdBy: 'John Doe',
    createdAt: new Date('2026-05-20T10:00:00Z'),
    updatedAt: new Date('2026-05-20T10:00:00Z')
  },
    { 
    _id: 'TCK-0003',
    ticketId: 'TCK-0003',
    title: 'Email not syncing',     
    description: 'Emails are not syncing across devices. Missing important communications.',
    category: 'IT',
    priority: 'High',
    status: 'In Progress',  
    createdBy: 'Alice Johnson',
    createdAt: new Date('2026-05-21T09:30:00Z'),
    updatedAt: new Date('2026-05-21T11:00:00Z')
  }
];

async function seedDatabase() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const ticketsCollection = db.collection('tickets');
        await ticketsCollection.deleteMany({});
        await ticketsCollection.insertMany(sampleTickets);
        console.log('database seeded');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await client.close();
    }
}

seedDatabase();