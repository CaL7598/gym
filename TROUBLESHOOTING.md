# Email Troubleshooting Guide

If emails are not working, follow these steps to diagnose and fix the issue:

## Step 1: Check if Backend Server is Running

The backend server MUST be running for emails to work. Check if it's running:

1. Open a terminal and run:
   ```bash
   npm run dev:server
   ```

2. You should see:
   ```
   🚀 Email API server running on http://localhost:3001
   📧 Resend API configured: Yes
   ```

3. If you see errors, check:
   - Is port 3001 already in use?
   - Are all dependencies installed? (`npm install`)
   - Is the Resend API key in your `.env` file?

## Step 2: Test Backend Server

Open your browser and go to: `http://localhost:3001/api/health`

You should see:
```json
{"status":"ok","message":"Email API server is running"}
```

If you get a connection error, the backend server is NOT running!

## Step 3: Check Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Try to send an email (register a member or send a message)
4. Look for any error messages

Common errors:
- **"Failed to fetch"** - Backend server is not running
- **"500 Internal Server Error"** - Check backend server console for errors
- **"Network Error"** - Backend server is not accessible

## Step 4: Check Backend Server Console

When you try to send an email, check the terminal where the backend server is running. You'll see:
- Success messages: `Welcome email sent successfully to...`
- Error messages: `Resend error: ...` or `Server error: ...`

## Step 5: Verify Environment Variables

Check your `.env` file has:
```env
RESEND_API_KEY=re_U6bC3aKj_PBm1aYUVtQwYBKLe5QwvTBKn
RESEND_FROM_EMAIL=Goodlife Fitness <onboarding@resend.dev>
```

## Step 6: Restart Everything

1. Stop both servers (Ctrl+C in terminals)
2. Restart:
   ```bash
   npm run dev:all
   ```

## Common Issues and Solutions:

### Issue: "Failed to fetch" error
**Solution**: Backend server is not running. Start it with `npm run dev:server` or `npm run dev:all`

### Issue: "500 Internal Server Error"
**Solution**: 
- Check backend server console for the actual error
- Verify Resend API key is correct
- Check that Resend API key has proper permissions

### Issue: "Network Error" or CORS errors
**Solution**: 
- Make sure Vite proxy is configured in `vite.config.ts`
- Ensure backend is running on port 3001
- Check that frontend is using relative URLs (`/api/...` not `http://localhost:3001/api/...`)

### Issue: Emails not being received
**Solution**:
- Check Resend dashboard for email logs
- Verify recipient email address is correct
- Check spam folder
- Ensure Resend account is active and not over quota

### Issue: Backend server crashes on startup
**Solution**:
- Check if port 3001 is in use: `netstat -ano | findstr :3001`
- Kill the process if needed
- Verify all dependencies are installed: `npm install`
- Check `.env` file exists and has correct format

## Quick Test:

1. Start backend: `npm run dev:server`
2. In another terminal, start frontend: `npm run dev`
3. Open browser: `http://localhost:3000`
4. Register a new member
5. Check backend console for success/error messages
6. Check browser console for any errors

## Still Not Working?

Share the error messages from:
1. Browser console (F12 → Console tab)
2. Backend server terminal
3. Any error messages you see

This will help identify the exact issue.

