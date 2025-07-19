// Script to debug RLS policies and database access
// Run this with: node scripts/debug-rls.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gsvrkioetizbiyqcqssw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzdnJraW9ldGl6Yml5cWNxc3N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NTI3OTYsImV4cCI6MjA2ODIyODc5Nn0.vv2TbnNY-mNilD9ONlvPjZ-xasncd4M192asSiZedWs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debugRLS() {
  console.log('Debugging RLS and database access...');
  
  try {
    // First, let's sign in as the dummy user
    console.log('\n1. Signing in as dummy user...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'dummywriter@gmail.com',
      password: 'dummy123456'
    });

    if (signInError) {
      console.error('Error signing in:', signInError.message);
      return;
    }

    if (signInData.user) {
      console.log('✅ Signed in as:', signInData.user.email);
      console.log('User ID:', signInData.user.id);
      
      // Now try to fetch stories as the authenticated user
      console.log('\n2. Fetching stories as authenticated user...');
      const { data: stories, error: storiesError } = await supabase
        .from('writings')
        .select('*')
        .order('created_at', { ascending: false });

      if (storiesError) {
        console.error('Error fetching stories:', storiesError.message);
      } else {
        console.log(`Found ${stories.length} stories:`);
        stories.forEach((story, index) => {
          console.log(`${index + 1}. "${story.title}" by user ${story.user_id}`);
        });
      }
      
      // Try to add a test story
      console.log('\n3. Adding a test story...');
      const { data: insertData, error: insertError } = await supabase
        .from('writings')
        .insert([{
          title: 'Test Story - RLS Debug',
          content: '<p>This is a test story to debug RLS policies.</p>',
          user_id: signInData.user.id
        }])
        .select();

      if (insertError) {
        console.error('Error inserting story:', insertError.message);
      } else {
        console.log('✅ Successfully inserted test story:', insertData);
      }
      
      // Check if we can see the test story
      console.log('\n4. Checking if we can see the test story...');
      const { data: testStories, error: testError } = await supabase
        .from('writings')
        .select('*')
        .eq('title', 'Test Story - RLS Debug');

      if (testError) {
        console.error('Error fetching test story:', testError.message);
      } else {
        console.log(`Found ${testStories.length} test stories`);
      }
      
    } else {
      console.log('❌ Failed to sign in');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the script
debugRLS().catch(console.error); 