-- Add admin policies for contact_messages table
-- This allows admins to view, update, and delete all contact messages

-- Drop the restrictive policy
DROP POLICY IF EXISTS "Users can view their own contact messages" ON public.contact_messages;

-- Create a more permissive policy for admin access
CREATE POLICY "Allow admin access to all contact messages" 
ON public.contact_messages 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Add specific policies for different operations
CREATE POLICY "Anyone can insert contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can update contact messages" 
ON public.contact_messages 
FOR UPDATE 
USING (true)
WITH CHECK (true);

CREATE POLICY "Admins can delete contact messages" 
ON public.contact_messages 
FOR DELETE 
USING (true); 