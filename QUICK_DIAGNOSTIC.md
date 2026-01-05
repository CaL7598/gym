# Quick Diagnostic Guide

## What's Not Working?

Please check which of these applies:

### 1. Emails Not Sending

**Check if backend server is running:**
```bash
npm run dev:server
```

You should see:
```
🚀 Email API server running on http://localhost:3001
📧 Resend API configured: Yes
```

**Test the backend:**
Open browser: `http://localhost:3001/api/health`
Should show: `{"status":"ok","message":"Email API server is running"}`

**If backend is not running:**
- Start it: `npm run dev:server`
- Or run both: `npm run dev:all`

### 2. Members Not Saving to Database

**Check browser console (F12):**
- Look for errors when adding a member
- Check for "Error saving member to Supabase" messages

**Check if Supabase is configured:**
- Verify `.env` has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Check browser console for "✅ Supabase configured" message

### 3. Backend Server Won't Start

**Common issues:**
- Port 3001 already in use
- Missing dependencies: Run `npm install`
- Syntax error in server.js

**Solution:**
```bash
npm install
npm run dev:server
```

### 4. Getting 500 Errors

**Check backend server console** - you'll see the actual error there:
- Resend API key invalid
- Missing environment variables
- Server code errors

## Most Common Issue: Backend Not Running

**Solution:**
```bash
npm run dev:all
```

This runs both frontend and backend together.

## Need More Help?

Please share:
1. What you're trying to do (add member, send email, etc.)
2. Error message from browser console
3. Error message from backend server terminal

