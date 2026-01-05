# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `goodlife-fitness-gym` (or your preferred name)
   - Database Password: (choose a strong password)
   - Region: (choose closest to you)
5. Wait for the project to be created (takes ~2 minutes)

## 2. Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

## 3. Create Environment File

Create a `.env` file in the root of your project with the following:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values you copied.

## 4. Set Up Database Tables

Run the following SQL in your Supabase SQL Editor (Dashboard → SQL Editor):

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Members table
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  address TEXT,
  emergency_contact TEXT,
  plan TEXT NOT NULL CHECK (plan IN ('Basic', 'Premium', 'VIP')),
  start_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expiring', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff table
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('PUBLIC', 'STAFF', 'SUPER_ADMIN')),
  position TEXT NOT NULL,
  phone TEXT NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES members(id) ON DELETE CASCADE, -- Can be NULL for pending member registrations
  member_name TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  method TEXT NOT NULL CHECK (method IN ('Cash', 'Mobile Money')),
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Rejected')),
  confirmed_by TEXT,
  transaction_id TEXT,
  momo_phone TEXT,
  network TEXT,
  -- Fields for pending member registrations (from checkout)
  is_pending_member BOOLEAN DEFAULT FALSE,
  member_email TEXT,
  member_phone TEXT,
  member_address TEXT,
  member_plan TEXT CHECK (member_plan IN ('Basic', 'Premium', 'VIP')),
  member_start_date DATE,
  member_expiry_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  priority TEXT NOT NULL DEFAULT 'low' CHECK (priority IN ('low', 'medium', 'high')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  caption TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_role TEXT NOT NULL,
  user_email TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('access', 'admin', 'financial')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance records table
CREATE TABLE IF NOT EXISTS attendance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_email TEXT NOT NULL,
  staff_role TEXT NOT NULL,
  date DATE NOT NULL,
  sign_in_time TIMESTAMP WITH TIME ZONE NOT NULL,
  sign_out_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_payments_member_id ON payments(member_id);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(date);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON activity_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_attendance_staff_email ON attendance_records(staff_email);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance_records(date);

-- Enable Row Level Security (RLS) - adjust policies as needed
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now - adjust based on your security needs)
CREATE POLICY "Allow all operations on members" ON members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on staff" ON staff FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on payments" ON payments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on announcements" ON announcements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on gallery" ON gallery FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on activity_logs" ON activity_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on attendance_records" ON attendance_records FOR ALL USING (true) WITH CHECK (true);
```

## 5. Seed Initial Data (Optional)

You can insert initial data using the Supabase dashboard or run this SQL:

```sql
-- Insert initial staff (using specific UUIDs for consistency)
INSERT INTO staff (id, full_name, email, role, position, phone) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Kwame Admin', 'admin@goodlife.com', 'SUPER_ADMIN', 'Owner / Manager', '0244000111'),
  ('00000000-0000-0000-0000-000000000002', 'Amara Staff', 'staff@goodlife.com', 'STAFF', 'Front Desk Officer', '0244222333'),
  ('00000000-0000-0000-0000-000000000003', 'Kojo Trainer', 'kojo@goodlife.com', 'STAFF', 'Head Fitness Coach', '0244333444')
ON CONFLICT (id) DO NOTHING;

-- Insert initial members (using specific UUIDs for consistency)
INSERT INTO members (id, full_name, email, phone, plan, start_date, expiry_date, status) VALUES
  ('00000000-0000-0000-0000-000000000101', 'John Doe', 'john@example.com', '0244123456', 'Premium', '2023-10-01', '2024-10-01', 'active'),
  ('00000000-0000-0000-0000-000000000102', 'Jane Smith', 'jane@example.com', '0200987654', 'Basic', '2024-01-15', '2024-05-15', 'expiring'),
  ('00000000-0000-0000-0000-000000000103', 'Kwame Mensah', 'kwame@example.com', '0555112233', 'VIP', '2023-05-01', '2024-05-01', 'expired')
ON CONFLICT (id) DO NOTHING;
```

**Alternative:** If you prefer to let the database auto-generate UUIDs, you can omit the `id` column:

```sql
-- Insert initial staff (auto-generate UUIDs)
INSERT INTO staff (full_name, email, role, position, phone) VALUES
  ('Kwame Admin', 'admin@goodlife.com', 'SUPER_ADMIN', 'Owner / Manager', '0244000111'),
  ('Amara Staff', 'staff@goodlife.com', 'STAFF', 'Front Desk Officer', '0244222333'),
  ('Kojo Trainer', 'kojo@goodlife.com', 'STAFF', 'Head Fitness Coach', '0244333444');

-- Insert initial members (auto-generate UUIDs)
INSERT INTO members (full_name, email, phone, plan, start_date, expiry_date, status) VALUES
  ('John Doe', 'john@example.com', '0244123456', 'Premium', '2023-10-01', '2024-10-01', 'active'),
  ('Jane Smith', 'jane@example.com', '0200987654', 'Basic', '2024-01-15', '2024-05-15', 'expiring'),
  ('Kwame Mensah', 'kwame@example.com', '0555112233', 'VIP', '2023-05-01', '2024-05-01', 'expired');
```

## 6. Restart Your Dev Server

After creating the `.env` file, restart your development server:

```bash
npm run dev
```

## Troubleshooting

- **"Supabase URL or Anon Key is missing"**: Make sure your `.env` file exists and contains the correct values
- **Connection errors**: Verify your Supabase project is active and the URL/key are correct
- **RLS errors**: Check that your Row Level Security policies allow the operations you're trying to perform

