// Script to check RLS policies on the writings table
// Run this with: node scripts/check-policies.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gsvrkioetizbiyqcqssw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzdnJraW9ldGl6Yml5cWNxc3N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NTI3OTYsImV4cCI6MjA2ODIyODc5Nn0.vv2TbnNY-mNilD9ONlvPjZ-xasncd4M192asSiZedWs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkPolicies() {
  console.log('Checking RLS policies and table structure...');
  
  try {
    // First, let's check if we can query the table at all
    console.log('\n1. Testing basic table access...');
    const { data: testData, error: testError } = await supabase
      .from('writings')
      .select('count')
      .limit(1);

    if (testError) {
      console.error('❌ Cannot access writings table:', testError.message);
      return;
    } else {
      console.log('✅ Can access writings table');
    }

    // Try to get the count of all stories
    console.log('\n2. Getting total count of stories...');
    const { count, error: countError } = await supabase
      .from('writings')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Error getting count:', countError.message);
    } else {
      console.log(`📊 Total stories in database: ${count}`);
    }

    // Try to get all stories with a simple query
    console.log('\n3. Fetching all stories...');
    const { data: allStories, error: allError } = await supabase
      .from('writings')
      .select('id, title, user_id, created_at')
      .order('created_at', { ascending: false });

    if (allError) {
      console.error('❌ Error fetching all stories:', allError.message);
    } else {
      console.log(`✅ Successfully fetched ${allStories.length} stories:`);
      allStories.forEach((story, index) => {
        console.log(`   ${index + 1}. "${story.title}" (ID: ${story.id}, User: ${story.user_id})`);
      });
    }

    // Check specific dummy user stories
    console.log('\n4. Checking dummy user stories...');
    const dummyUserId = '57a81547-3e18-41e4-9b78-568010f7a183';
    const { data: dummyStories, error: dummyError } = await supabase
      .from('writings')
      .select('*')
      .eq('user_id', dummyUserId);

    if (dummyError) {
      console.error('❌ Error fetching dummy stories:', dummyError.message);
    } else {
      console.log(`✅ Found ${dummyStories.length} stories by dummy user:`);
      dummyStories.forEach(story => {
        console.log(`   - "${story.title}"`);
      });
    }

    // Check if there are any stories at all
    console.log('\n5. Checking for any stories...');
    const { data: anyStories, error: anyError } = await supabase
      .from('writings')
      .select('*')
      .limit(5);

    if (anyError) {
      console.error('❌ Error fetching any stories:', anyError.message);
    } else {
      console.log(`✅ Found ${anyStories.length} total stories in database`);
      if (anyStories.length > 0) {
        console.log('Sample stories:');
        anyStories.forEach(story => {
          console.log(`   - "${story.title}" by ${story.user_id}`);
        });
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the script
checkPolicies().catch(console.error); 