# Quick Fix for 500 Errors

If you're getting 500 Internal Server Errors when sending emails, follow these steps:

## Step 1: Make Sure the Backend Server is Running

The backend server MUST be running on port 3001. You have two options:

### Option A: Run Both Servers Together (Recommended)

```bash
npm run dev:all
```

This runs both the backend (port 3001) and frontend (port 3000) servers simultaneously.

### Option B: Run Servers Separately

**Terminal 1 - Start Backend Server:**
```bash
npm run dev:server
```

You should see:
```
🚀 Email API server running on http://localhost:3001
📧 Resend API configured: Yes
```

**Terminal 2 - Start Frontend Server:**
```bash
npm run dev
```

## Step 2: Verify Backend is Running

Open your browser and go to: `http://localhost:3001/api/health`

You should see:
```json
{"status":"ok","message":"Email API server is running"}
```

If you get a connection error, the backend server is not running!

## Step 3: Check Server Console for Errors

When you try to send an email, check the terminal where the backend server is running. You should see error messages there that will help diagnose the issue.

## Common Issues:

1. **Backend server not running** - Make sure to start it with `npm run dev:server` or `npm run dev:all`
2. **Port 3001 already in use** - Stop any other process using port 3001
3. **Resend API key missing** - Check your `.env` file has `RESEND_API_KEY`
4. **Invalid Resend API key** - Verify your API key is correct in Resend dashboard

## Testing the Setup:

1. Make sure backend server is running (check `http://localhost:3001/api/health`)
2. Make sure frontend is running on `http://localhost:3000`
3. Try registering a new member
4. Check the backend server console for any error messages
5. Check the browser console for any errors

