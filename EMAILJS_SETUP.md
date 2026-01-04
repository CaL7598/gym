# EmailJS Setup Guide

This guide will help you set up EmailJS to send automatic email notifications to members when they register or make payments.

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account (free tier allows 200 emails/month)
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email account
5. Copy the **Service ID** (you'll need this later)

## Step 3: Create Email Templates

You need to create two templates:

### Template 1: Welcome Email (for new members)

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Name it: "Welcome Email" or "Member Welcome"
4. Use this template structure:

```
Subject: Welcome to Goodlife Fitness!

Hello {{to_name}},

Welcome to Goodlife Fitness! We're thrilled to have you as a member.

Your Membership Details:
- Plan: {{plan}}
- Start Date: {{start_date}}
- Expiry Date: {{expiry_date}}

We're here to help you achieve your fitness goals. If you have any questions, feel free to reach out to us.

Contact Us:
- Email: {{gym_email}}
- Phone: {{gym_phone}}

See you at the gym!

Best regards,
The Goodlife Fitness Team
```

5. Copy the **Template ID**

### Template 2: Payment Confirmation Email

1. Create another template named "Payment Confirmation"
2. Use this template structure:

```
Subject: Payment Confirmation - Goodlife Fitness

Hello {{to_name}},

Thank you for your payment!

Payment Details:
- Amount: {{amount}}
- Payment Method: {{payment_method}}
- Date: {{payment_date}}
- Transaction ID: {{transaction_id}}

Your membership is now active. We appreciate your continued support!

If you have any questions about this payment, please contact us at {{gym_email}}.

Best regards,
The Goodlife Fitness Team
```

3. Copy the **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in EmailJS dashboard
2. Find your **Public Key** (also called API Key)
3. Copy it

## Step 5: Add Credentials to .env File

Add these to your `.env` file:

**Option 1: Separate Templates (Recommended)**
```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_WELCOME_TEMPLATE_ID=your_welcome_template_id_here
VITE_EMAILJS_PAYMENT_TEMPLATE_ID=your_payment_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Option 2: Single Template (Use same template for both)**
```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Note:** If you use separate templates (Option 1), you'll have more control over the email content. If you use a single template (Option 2), the system will use the same template for both welcome and payment emails.

## Step 6: Restart Your Dev Server

After adding the EmailJS credentials, restart your development server:

```bash
npm run dev
```

## How It Works

### Automatic Email Notifications

1. **New Member Registration:**
   - When a staff member registers a new member in the system
   - A welcome email is automatically sent to the member's email address
   - Includes membership details (plan, start date, expiry date)

2. **Payment Confirmation:**
   - When a payment is recorded and confirmed (Cash payments are auto-confirmed)
   - When a Mobile Money payment is verified and confirmed
   - A payment confirmation email is automatically sent
   - Includes payment details (amount, method, date, transaction ID)

## Testing

1. Register a new member with a valid email address
2. Check the member's email inbox for the welcome email
3. Record a payment for that member
4. Check the email inbox for the payment confirmation

## Troubleshooting

### Emails Not Sending

- **Check browser console:** Look for error messages
- **Verify credentials:** Make sure all three EmailJS values are correct in `.env`
- **Check EmailJS dashboard:** Look at the "Logs" section to see if emails are being sent
- **Verify email service:** Make sure your email service is connected and active
- **Check template variables:** Ensure template variable names match ({{to_name}}, {{to_email}}, etc.)

### Common Issues

- **"EmailJS not configured" warning:** Your `.env` file is missing EmailJS credentials
- **"Failed to send email":** Check your EmailJS service connection or template ID
- **Emails going to spam:** This is normal for automated emails. Consider setting up SPF/DKIM records

## EmailJS Free Tier Limits

- 200 emails per month (free tier)
- Upgrade to paid plans for more emails
- Check your usage in the EmailJS dashboard

## Security Note

⚠️ **Never commit your `.env` file!** The EmailJS Public Key is safe to expose (it's meant to be public), but keep your Service ID and Template ID private.

