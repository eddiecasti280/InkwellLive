-- RLS Policy Fix for Inkwell Stories
-- Copy and paste this entire file into your Supabase SQL Editor

-- 1. First, let's see what policies currently exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'writings';

-- 2. Drop existing policies (if they exist)
DROP POLICY IF EXISTS "Users can insert their own stories" ON public.writings;
DROP POLICY IF EXISTS "Users can read all stories" ON public.writings;
DROP POLICY IF EXISTS "Users can update their own stories" ON public.writings;
DROP POLICY IF EXISTS "Users can delete their own stories" ON public.writings;

-- 3. Create new policies for community browsing
-- Allow reading all stories (for community browsing)
CREATE POLICY "Allow reading all stories" ON public.writings
    FOR SELECT USING (true);

-- Allow authenticated users to insert their own stories
CREATE POLICY "Allow inserting own stories" ON public.writings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own stories
CREATE POLICY "Allow updating own stories" ON public.writings
    FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete their own stories
CREATE POLICY "Allow deleting own stories" ON public.writings
    FOR DELETE USING (auth.uid() = user_id);

-- 4. Verify the policies were created
SELECT policyname, cmd, permissive
FROM pg_policies
WHERE tablename = 'writings'; 