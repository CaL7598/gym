# Resend Email Setup Guide

This guide will help you set up Resend API to send automatic email notifications to members when they register or make payments.

## Step 1: Create Resend Account

1. Go to [Resend](https://resend.com/)
2. Sign up for a free account (or log in if you already have one)
3. Verify your email address

## Step 2: Get Your API Key

1. In your Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Give it a name (e.g., "Goodlife Fitness Gym")
4. Select the permissions you need (at minimum, "Sending access")
5. Copy your API key (it will look like: `re_...`)

⚠️ **Important**: Keep your API key secure and never commit it to version control!

## Step 3: Configure Sender Email Address

### Option 1: Use Resend's Test Domain (Quick Start - Limited)

⚠️ **IMPORTANT RESTRICTION**: When using Resend's test domain (`onboarding@resend.dev`), you can **ONLY send emails to your own Resend account email address**. This is a security restriction by Resend.

**For testing with the test domain:**
- You can only send emails to the email address you used to sign up for Resend
- To send to other email addresses, you **MUST** verify your own domain (see Option 2 below)

**To find your Resend account email:**
1. Log into your Resend dashboard
2. Go to Settings → Account
3. Your account email is displayed there
4. Add it to your `.env` file as `RESEND_ACCOUNT_EMAIL=your-email@example.com`

### Option 2: Add Your Own Domain (Recommended for Production)

1. In your Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `goodlife.com`)
4. Add the DNS records that Resend provides to your domain's DNS settings
5. Wait for verification (usually takes a few minutes)
6. Once verified, you can use emails like `noreply@goodlife.com` or `info@goodlife.com`

## Step 4: Add API Key to Your .env File

1. Open your `.env` file in the project root (create it if it doesn't exist)
2. Add the following lines:

```env
# Resend Email Configuration
VITE_RESEND_API_KEY=re_your_actual_api_key_here
VITE_RESEND_FROM_EMAIL=Goodlife Fitness <onboarding@resend.dev>
```

Replace:
- `re_your_actual_api_key_here` with your actual Resend API key
- `onboarding@resend.dev` with your verified domain email (if using your own domain)

Your complete `.env` file should look like:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Gemini API Key (for AI features)
GEMINI_API_KEY=your_gemini_api_key

# Resend Email Configuration
VITE_RESEND_API_KEY=re_your_actual_api_key_here
VITE_RESEND_FROM_EMAIL=Goodlife Fitness <onboarding@resend.dev>
```

## Step 5: Restart Your Dev Server

After adding the Resend credentials, restart your development server:

```bash
npm run dev
```

## Step 6: Test Email Functionality

1. **Welcome Emails (Member Registration)**:
   - Go to the Admin Dashboard → Members
   - Click "Register New Member"
   - Fill in the form with a valid email address
   - Submit the form
   - Check the member's email inbox for the welcome email

2. **Payment Confirmation Emails**:
   - Go to the Admin Dashboard → Payments
   - Record a new payment for a member with a valid email
   - Confirm the payment
   - Check the member's email inbox for the payment confirmation email

## Troubleshooting

### "Resend API key not configured" Warning

- Make sure your `.env` file contains `VITE_RESEND_API_KEY=your_key`
- Ensure there are no spaces around the `=` sign: `VITE_RESEND_API_KEY=key` (not `VITE_RESEND_API_KEY = key`)
- Restart your dev server completely (stop and start again)
- Check the browser console for any error messages

### "Failed to send email" or API Errors

- Verify your API key is correct
- Check that your API key has the correct permissions in Resend dashboard
- Ensure your "From" email address is verified/valid
- Check the Resend dashboard "Logs" section to see detailed error messages
- Make sure you haven't exceeded your API quota (check Resend dashboard)

### Emails Going to Spam

- Use a verified custom domain instead of `onboarding@resend.dev`
- Ensure your domain has proper SPF and DKIM records (Resend sets these up automatically)
- Test with different email providers
- Check Resend dashboard for delivery status

### CORS Errors

- Resend's API supports CORS, so this shouldn't be an issue
- If you encounter CORS errors, check that you're using the correct API endpoint: `https://api.resend.com/emails`

## Resend Free Tier Limits

- **3,000 emails per month** (free tier)
- **100 emails per day** (free tier)
- All features available on free tier

Upgrade to a paid plan if you need more sending capacity.

## Security Note

⚠️ **Never commit your `.env` file to version control!** 

The `.env` file is already in `.gitignore` to protect your API keys. However, note that when using Resend's API from the client-side (as this implementation does), your API key will be exposed in the browser. 

For production applications, consider:
- Creating a backend API endpoint to handle emails
- Using environment variables on the server-side only
- Implementing rate limiting and validation on the backend

## Features Using Resend

- **Welcome Emails**: Sent automatically when a new member is registered
- **Payment Confirmation Emails**: Sent automatically when payments are confirmed or recorded

Both features work for all admin roles (Super Admin, Admin, Staff).

