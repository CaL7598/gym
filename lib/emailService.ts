import emailjs from '@emailjs/browser';

// Initialize EmailJS (you'll need to set these in your .env file)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_WELCOME_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_WELCOME_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PAYMENT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_PAYMENT_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export interface WelcomeEmailParams {
  memberName: string;
  memberEmail: string;
  plan: string;
  startDate: string;
  expiryDate: string;
}

export interface PaymentEmailParams {
  memberName: string;
  memberEmail: string;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
  transactionId?: string;
}

/**
 * Send welcome email to new member
 */
export const sendWelcomeEmail = async (params: WelcomeEmailParams): Promise<boolean> => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_WELCOME_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.warn('EmailJS not configured. Email will not be sent.');
    return false;
  }

  try {
    const templateParams = {
      to_name: params.memberName,
      to_email: params.memberEmail,
      plan: params.plan,
      start_date: params.startDate,
      expiry_date: params.expiryDate,
      gym_name: 'Goodlife Fitness',
      gym_email: 'info@goodlife.com',
      gym_phone: '+233 24 400 0111',
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_WELCOME_TEMPLATE_ID,
      templateParams
    );

    console.log('Welcome email sent successfully to', params.memberEmail);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

/**
 * Send payment confirmation email
 */
export const sendPaymentEmail = async (params: PaymentEmailParams): Promise<boolean> => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_PAYMENT_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.warn('EmailJS not configured. Email will not be sent.');
    return false;
  }

  try {
    const templateParams = {
      to_name: params.memberName,
      to_email: params.memberEmail,
      amount: `₵${params.amount.toLocaleString()}`,
      payment_method: params.paymentMethod,
      payment_date: params.paymentDate,
      transaction_id: params.transactionId || 'N/A',
      gym_name: 'Goodlife Fitness',
      gym_email: 'info@goodlife.com',
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_PAYMENT_TEMPLATE_ID,
      templateParams
    );

    console.log('Payment confirmation email sent successfully to', params.memberEmail);
    return true;
  } catch (error) {
    console.error('Error sending payment email:', error);
    return false;
  }
};

