// Script to test story insertion and see what's happening
// Run this with: node scripts/test-insert.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gsvrkioetizbiyqcqssw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzdnJraW9ldGl6Yml5cWNxc3N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NTI3OTYsImV4cCI6MjA2ODIyODc5Nn0.vv2TbnNY-mNilD9ONlvPjZ-xasncd4M192asSiZedWs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  console.log('Testing story insertion...');
  
  const testStory = {
    title: 'Test Story - Insert Debug',
    content: '<p>This is a test story to debug insertion issues.</p>',
    user_id: '57a81547-3e18-41e4-9b78-568010f7a183'
  };
  
  try {
    console.log('\n1. Attempting to insert test story...');
    console.log('Story data:', JSON.stringify(testStory, null, 2));
    
    const { data, error } = await supabase
      .from('writings')
      .insert([testStory])
      .select();
    
    if (error) {
      console.error('❌ Insert error:', error.message);
      console.error('Error details:', error);
      
      // Check if it's a foreign key constraint issue
      if (error.message.includes('foreign key')) {
        console.log('\n🔍 This looks like a foreign key constraint issue.');
        console.log('The user_id might not exist in the auth.users table.');
      }
      
      // Check if it's a RLS policy issue
      if (error.message.includes('policy')) {
        console.log('\n🔍 This looks like a RLS policy issue.');
        console.log('The insert policy might be blocking the insertion.');
      }
      
      return;
    }
    
    if (data) {
      console.log('✅ Insert successful!');
      console.log('Inserted data:', JSON.stringify(data, null, 2));
      
      // Now try to fetch the story we just inserted
      console.log('\n2. Trying to fetch the story we just inserted...');
      const { data: fetchedStory, error: fetchError } = await supabase
        .from('writings')
        .select('*')
        .eq('id', data[0].id)
        .single();
      
      if (fetchError) {
        console.error('❌ Error fetching inserted story:', fetchError.message);
      } else {
        console.log('✅ Successfully fetched inserted story:', fetchedStory.title);
      }
    } else {
      console.log('❌ No data returned from insert');
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Run the script
testInsert().catch(console.error); 