-- Verify Migration: Check if pending member columns exist
-- Run this in Supabase SQL Editor to verify the columns were added

SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns
WHERE table_name = 'payments'
AND column_name IN (
  'is_pending_member',
  'member_email',
  'member_phone',
  'member_address',
  'member_plan',
  'member_start_date',
  'member_expiry_date'
)
ORDER BY column_name;

-- If the query returns 7 rows, the migration was successful
-- If it returns fewer rows or no rows, run MIGRATION_ADD_PENDING_MEMBER_FIELDS.sql again

