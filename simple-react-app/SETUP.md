# Quick Start Guide

Follow these steps to get the Support Ticket Board running on your machine.

## Prerequisites Checklist

- [ ] Node.js 16+ installed (download from https://nodejs.org)
- [ ] MongoDB installed and running OR MongoDB Atlas account
- [ ] Code editor (VS Code recommended)

## Step 1: Verify Node.js Installation

Open PowerShell and run:
```powershell
node --version
npm --version
```

You should see version numbers (e.g., v18.0.0).

## Step 2: MongoDB Setup (Choose One)

### Option A: Local MongoDB (Recommended for quick testing)
1. Download MongoDB Community from https://www.mongodb.com/try/download/community
2. Run installer with default settings
3. MongoDB starts as a service automatically
4. Verify: Open PowerShell and run `mongosh`

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and sign up
3. Create a cluster (free tier available)
4. Click "Connect" and copy connection string
5. Replace in `.env` file: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/`

### Option C: Azure Cosmos DB
Follow Azure documentation to create MongoDB API account and get connection string.

## Step 3: Install Backend Dependencies

Open PowerShell in the project folder:

```powershell
# Navigate to project folder
cd "C:\Users\locad\OneDrive\Desktop\new_project\simple-react-app"

# Go to backend folder
cd backend

# Install dependencies
npm install
```

This may take 1-2 minutes. You should see a `node_modules` folder created.

## Step 4: Configure Backend Environment

```powershell
# Copy the .env.example to .env
Copy-Item .env.example .env

# Edit .env if needed (for local MongoDB, defaults should work)
# The file should have:
# MONGODB_URI=mongodb://localhost:27017
# DATABASE_NAME=ticket_board
# PORT=3001
```

## Step 5: Seed Database with Sample Data

Still in the `backend` folder:

```powershell
npm run seed
```

You should see output like:
```
Connected to MongoDB
Cleared existing tickets
Inserted 8 sample tickets
Database seeded successfully!
```

## Step 6: Start Backend Server

In the same PowerShell window:

```powershell
npm start
```

You should see:
```
Connected to MongoDB
Server running on http://localhost:3001
```

✅ **Backend is running!** Keep this window open.

## Step 7: Install Frontend Dependencies

Open a **NEW PowerShell window** and navigate to project root:

```powershell
cd "C:\Users\locad\OneDrive\Desktop\new_project\simple-react-app"

# Install dependencies
npm install
```

Again, this takes 1-2 minutes.

## Step 8: Start Frontend Development Server

```powershell
npm run dev
```

You should see:
```
VITE v... ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

## Step 9: Open in Browser

Open your web browser and go to:
```
http://localhost:5173
```

🎉 **You should see the Support Ticket Board!**

## Testing the Application

1. **View Tickets**: Should show 8 sample tickets on the right side
2. **Create Ticket**: Fill in the form on the left and click "Create Ticket"
3. **Filter**: Use the dropdowns to filter by Status, Priority, or Category
4. **Update Status**: Click the status dropdown on any ticket to change it
5. **Summary**: Check the statistics at the top update in real-time

## Troubleshooting

### "Cannot connect to MongoDB"
- Verify MongoDB is running: open PowerShell and run `mongosh`
- If using Atlas, check your connection string and IP whitelist
- Check `MONGODB_URI` in `backend/.env`

### "Port already in use"
- Another process is using port 3001 or 5173
- Run: `netstat -ano | findstr :3001` to find the process
- Change PORT in `backend/.env` to 3002

### "npm: command not found"
- Node.js not installed or not in PATH
- Restart PowerShell after installing Node.js
- Verify with: `npm --version`

### "Module not found" error
- Run `npm install` again in the folder where error occurred
- Delete `node_modules` folder and run `npm install` fresh
- Make sure you're in the right directory

### Frontend not connecting to backend
- Ensure backend is running (check PowerShell window 1)
- Check `http://localhost:3001/health` in browser - should show `{"status":"ok"}`
- Check browser console for errors (F12)

## Development Notes

- **Frontend changes**: Auto-reload when you save files
- **Backend changes**: Stop the server (Ctrl+C) and run `npm start` again
- **Database issues**: Run `npm run seed` again to reset sample data

## Next Steps

- Customize CSS styling in `src/App.css`
- Add more validation rules in `backend/validation.js`
- Modify sample data in `backend/seed.js`
- Deploy to Azure (see README.md)

## Stopping the Application

When done:
1. Press `Ctrl+C` in both PowerShell windows to stop servers
2. Servers will gracefully shut down

---

**Need help?** All code files have inline comments. Check the README.md for API documentation.
