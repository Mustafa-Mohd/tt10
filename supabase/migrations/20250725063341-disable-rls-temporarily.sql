-- Temporarily disable RLS for contact_messages to test functionality
-- This will allow all operations without authentication requirements

-- Disable Row Level Security on contact_messages table
ALTER TABLE public.contact_messages DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow admin access to all contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can view all contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can update contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can delete contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON public.contact_messages;

-- This will allow all operations without any restrictions
-- WARNING: This is for testing only. In production, you should enable RLS with proper policies. 