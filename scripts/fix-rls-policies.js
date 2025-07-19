// Script to fix RLS policies for the writings table
// This script provides the SQL commands you need to run in Supabase

console.log('🔧 RLS Policy Fix for Inkwell Stories');
console.log('=====================================');
console.log('');
console.log('Copy and paste these SQL commands into your Supabase SQL Editor:');
console.log('');

console.log('-- 1. First, let\'s see what policies currently exist');
console.log('SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check');
console.log('FROM pg_policies');
console.log('WHERE tablename = \'writings\';');
console.log('');

console.log('-- 2. Drop existing policies (if they exist)');
console.log('DROP POLICY IF EXISTS "Users can insert their own stories" ON public.writings;');
console.log('DROP POLICY IF EXISTS "Users can read all stories" ON public.writings;');
console.log('DROP POLICY IF EXISTS "Users can update their own stories" ON public.writings;');
console.log('DROP POLICY IF EXISTS "Users can delete their own stories" ON public.writings;');
console.log('');

console.log('-- 3. Create new policies for community browsing');
console.log('-- Allow reading all stories (for community browsing)');
console.log('CREATE POLICY "Allow reading all stories" ON public.writings');
console.log('    FOR SELECT USING (true);');
console.log('');

console.log('-- Allow authenticated users to insert their own stories');
console.log('CREATE POLICY "Allow inserting own stories" ON public.writings');
console.log('    FOR INSERT WITH CHECK (auth.uid() = user_id);');
console.log('');

console.log('-- Allow users to update their own stories');
console.log('CREATE POLICY "Allow updating own stories" ON public.writings');
console.log('    FOR UPDATE USING (auth.uid() = user_id);');
console.log('');

console.log('-- Allow users to delete their own stories');
console.log('CREATE POLICY "Allow deleting own stories" ON public.writings');
console.log('    FOR DELETE USING (auth.uid() = user_id);');
console.log('');

console.log('-- 4. Verify the policies were created');
console.log('SELECT policyname, cmd, permissive');
console.log('FROM pg_policies');
console.log('WHERE tablename = \'writings\';');
console.log('');

console.log('🎯 After running these commands:');
console.log('1. You should be able to create stories through the app');
console.log('2. All stories should be visible in Browse Community');
console.log('3. Users can only edit/delete their own stories');
console.log('');

console.log('🚀 Then test by:');
console.log('1. Creating a story through your app');
console.log('2. Going to Browse Community to see it');
console.log('3. Running: node scripts/add-stories-direct.js');
console.log('');

console.log('📝 Note: If you want to allow inserting stories for any user_id (for testing),');
console.log('   replace the INSERT policy with:');
console.log('   CREATE POLICY "Allow inserting stories" ON public.writings');
console.log('       FOR INSERT WITH CHECK (true);'); 