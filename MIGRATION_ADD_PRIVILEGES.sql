-- Migration: Add privileges column to staff table
-- Run this in your Supabase SQL Editor

-- Add privileges column to store JSON array of privileges
ALTER TABLE staff 
ADD COLUMN IF NOT EXISTS privileges TEXT;

-- Add a comment to explain the column
COMMENT ON COLUMN staff.privileges IS 'JSON array of privilege enums assigned to this staff member. Example: ["MANAGE_MEMBERS", "CONFIRM_PAYMENTS"]';

-- Verify the column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'staff'
AND column_name = 'privileges';

