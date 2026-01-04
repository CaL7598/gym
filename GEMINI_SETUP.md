# Gemini AI Setup Guide

This guide will help you set up the Gemini AI API for AI Insights and Auto-Draft features in the Communication Center.

## Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click on "Get API Key" in the left sidebar
4. Click "Create API Key" 
5. Choose to create a new Google Cloud project or use an existing one
6. Copy your API key (it will look like: `AIzaSy...`)

## Step 2: Add API Key to Your .env File

1. Open your `.env` file in the project root
2. Add or uncomment the `GEMINI_API_KEY` line:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
3. Replace `your_api_key_here` with the API key you copied

Your `.env` file should now look like:
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Gemini API Key (for AI features)
GEMINI_API_KEY=AIzaSyYourActualAPIKeyHere
```

## Step 3: Restart Your Dev Server

After adding the API key, restart your development server:

```bash
npm run dev
```

## Step 4: Test the AI Features

1. **AI Insights (Dashboard)**:
   - Go to the Admin Dashboard
   - Click the "AI Insights" button
   - You should see AI-generated business insights based on your gym statistics

2. **AI Auto-Draft (Communication Center)**:
   - Go to Communication Center
   - Select a member or use broadcast mode
   - Click "AI Auto-Draft" button
   - The AI will generate a personalized message

## Troubleshooting

### "AI service is not configured" Error

- Make sure your `.env` file contains `GEMINI_API_KEY=your_key`
- Restart your dev server after adding the key
- Check the browser console for any error messages

### "Error generating message" or API Errors

- Verify your API key is correct
- Check that you have API access enabled in Google AI Studio
- Make sure you haven't exceeded your API quota
- Check the browser console for detailed error messages

### API Key Not Loading

- Ensure the `.env` file is in the project root (same level as `package.json`)
- Make sure there are no spaces around the `=` sign: `GEMINI_API_KEY=key` (not `GEMINI_API_KEY = key`)
- Restart the dev server completely (stop and start again)

## Features Using Gemini AI

- **AI Insights**: Business analytics and recommendations on the Admin Dashboard
- **AI Auto-Draft**: Automatic message generation in Communication Center
- Both features work for Super Admin and Staff roles

## Security Note

⚠️ **Never commit your `.env` file to version control!** The `.env` file is already in `.gitignore` to protect your API keys.

