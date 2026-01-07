-- Migration: Delete Test Staff Members (Kojo Trainer and Amara Staff)
-- Run this in your Supabase SQL Editor

-- Delete Kojo Trainer
DELETE FROM staff 
WHERE email = 'kojo@goodlife.com';

-- Delete Amara Staff
DELETE FROM staff 
WHERE email = 'staff@goodlife.com';

-- Verify deletion
SELECT full_name, email, role, position 
FROM staff 
WHERE email IN ('kojo@goodlife.com', 'staff@goodlife.com');

-- Should return 0 rows if deletion was successful

