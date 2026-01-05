# Backend Server Setup Guide

This project now includes a backend Express server to handle email sending via Resend API. This solves the CORS issue that occurs when trying to call Resend directly from the browser.

## Why a Backend Server?

Resend API doesn't allow direct client-side API calls due to CORS (Cross-Origin Resource Sharing) restrictions. The backend server acts as a proxy, handling email requests securely on the server-side.

## Setup Instructions

### 1. Environment Variables

Make sure your `.env` file contains the Resend API key (it should already be there):

```env
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=Goodlife Fitness <onboarding@resend.dev>
```

The server will also check `VITE_RESEND_API_KEY` if `RESEND_API_KEY` is not found.

### 2. Running the Application

You have two options for running the application:

#### Option 1: Run Both Servers Together (Recommended)

This runs both the backend API server and the frontend Vite dev server simultaneously:

```bash
npm run dev:all
```

This uses `concurrently` to run both servers at the same time:
- Backend API server: `http://localhost:3001`
- Frontend Vite server: `http://localhost:3000`

#### Option 2: Run Servers Separately

**Terminal 1 - Backend Server:**
```bash
npm run dev:server
```

**Terminal 2 - Frontend Server:**
```bash
npm run dev
```

### 3. How It Works

1. **Frontend** (Vite dev server on port 3000)
   - React application runs here
   - Email service functions call `/api/*` endpoints
   - Vite proxy forwards `/api/*` requests to the backend

2. **Backend** (Express server on port 3001)
   - Receives email requests from the frontend
   - Uses Resend SDK to send emails
   - Returns success/failure responses

3. **Vite Proxy Configuration**
   - All `/api/*` requests are automatically proxied to `http://localhost:3001`
   - This is configured in `vite.config.ts`

## API Endpoints

The backend server provides the following endpoints:

- `GET /api/health` - Health check endpoint
- `POST /api/send-welcome-email` - Send welcome email to new members
- `POST /api/send-payment-email` - Send payment confirmation emails
- `POST /api/send-message-email` - Send general message emails

## Troubleshooting

### "Failed to fetch" or CORS errors

- Make sure the backend server is running on port 3001
- Check that both servers are running (use `npm run dev:all`)
- Verify the Vite proxy is configured correctly in `vite.config.ts`

### "Resend API key not configured" error

- Make sure `RESEND_API_KEY` or `VITE_RESEND_API_KEY` is in your `.env` file
- Restart the backend server after updating `.env`

### Backend server won't start

- Check if port 3001 is already in use
- Make sure all dependencies are installed: `npm install`
- Check the console for error messages

### Emails not sending

- Verify your Resend API key is correct
- Check the backend server console for error messages
- Ensure the "from" email address is valid (use `onboarding@resend.dev` for testing)

## Production Deployment

For production, you'll need to:

1. Deploy the backend server separately (e.g., on Heroku, Railway, Render, etc.)
2. Update `VITE_API_URL` in your production `.env` to point to your deployed backend
3. Or use a serverless function (Vercel, Netlify Functions, etc.) instead of a standalone server

## Security Notes

- ✅ API key is now stored on the server-side (more secure)
- ✅ No CORS issues since backend handles all Resend API calls
- ✅ Frontend only communicates with your backend API
- ⚠️ Keep your `.env` file secure and never commit it to version control

