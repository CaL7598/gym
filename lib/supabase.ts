import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Log connection status (without exposing the key)
if (supabaseUrl && supabaseAnonKey) {
  console.log('✅ Supabase configured:', {
    url: supabaseUrl,
    keyPresent: supabaseAnonKey ? 'Yes' : 'No',
    keyLength: supabaseAnonKey.length
  });
} else {
  console.warn('⚠️ Supabase not configured:', {
    url: supabaseUrl ? 'Present' : 'Missing',
    key: supabaseAnonKey ? 'Present' : 'Missing'
  });
  console.warn('Please check your .env file and restart the dev server.');
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Database types (will be generated from Supabase schema)
export type Database = {
  public: {
    Tables: {
      members: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          address?: string;
          emergency_contact?: string;
          plan: string;
          start_date: string;
          expiry_date: string;
          status: 'active' | 'expiring' | 'expired';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone: string;
          address?: string;
          emergency_contact?: string;
          plan: string;
          start_date: string;
          expiry_date: string;
          status?: 'active' | 'expiring' | 'expired';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          address?: string;
          emergency_contact?: string;
          plan?: string;
          start_date?: string;
          expiry_date?: string;
          status?: 'active' | 'expiring' | 'expired';
          updated_at?: string;
        };
      };
      staff: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          role: string;
          position: string;
          phone: string;
          avatar?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          role: string;
          position: string;
          phone: string;
          avatar?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          role?: string;
          position?: string;
          phone?: string;
          avatar?: string;
          updated_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          member_id: string;
          member_name: string;
          amount: number;
          date: string;
          method: string;
          status: string;
          confirmed_by?: string;
          transaction_id?: string;
          momo_phone?: string;
          network?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          member_id: string;
          member_name: string;
          amount: number;
          date: string;
          method: string;
          status: string;
          confirmed_by?: string;
          transaction_id?: string;
          momo_phone?: string;
          network?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          member_id?: string;
          member_name?: string;
          amount?: number;
          date?: string;
          method?: string;
          status?: string;
          confirmed_by?: string;
          transaction_id?: string;
          momo_phone?: string;
          network?: string;
          updated_at?: string;
        };
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          content: string;
          date: string;
          priority: 'low' | 'medium' | 'high';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          date: string;
          priority?: 'low' | 'medium' | 'high';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          date?: string;
          priority?: 'low' | 'medium' | 'high';
          updated_at?: string;
        };
      };
      gallery: {
        Row: {
          id: string;
          url: string;
          caption: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          url: string;
          caption: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          url?: string;
          caption?: string;
        };
      };
      activity_logs: {
        Row: {
          id: string;
          user_role: string;
          user_email: string;
          action: string;
          details: string;
          timestamp: string;
          category: 'access' | 'admin' | 'financial';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_role: string;
          user_email: string;
          action: string;
          details: string;
          timestamp: string;
          category: 'access' | 'admin' | 'financial';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_role?: string;
          user_email?: string;
          action?: string;
          details?: string;
          timestamp?: string;
          category?: 'access' | 'admin' | 'financial';
        };
      };
      attendance_records: {
        Row: {
          id: string;
          staff_email: string;
          staff_role: string;
          date: string;
          sign_in_time: string;
          sign_out_time?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          staff_email: string;
          staff_role: string;
          date: string;
          sign_in_time: string;
          sign_out_time?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          staff_email?: string;
          staff_role?: string;
          date?: string;
          sign_in_time?: string;
          sign_out_time?: string;
        };
      };
    };
  };
};

