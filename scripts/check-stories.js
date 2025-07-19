// Script to check what stories are in the database
// Run this with: node scripts/check-stories.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gsvrkioetizbiyqcqssw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzdnJraW9ldGl6Yml5cWNxc3N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NTI3OTYsImV4cCI6MjA2ODIyODc5Nn0.vv2TbnNY-mNilD9ONlvPjZ-xasncd4M192asSiZedWs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkStories() {
  console.log('Checking stories in the database...');
  
  try {
    const { data, error } = await supabase
      .from('writings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching stories:', error.message);
      return;
    }

    console.log(`\n📊 Found ${data.length} stories in the database:`);
    console.log('=====================================');
    
    data.forEach((story, index) => {
      console.log(`\n${index + 1}. "${story.title}"`);
      console.log(`   ID: ${story.id}`);
      console.log(`   User ID: ${story.user_id}`);
      console.log(`   Created: ${new Date(story.created_at).toLocaleString()}`);
      console.log(`   Content length: ${story.content?.length || 0} characters`);
    });

    // Check for the dummy user specifically
    const dummyUserId = 'e1a14879-53df-4396-9ff7-d8b83fc6e6da';
    const dummyStories = data.filter(story => story.user_id === dummyUserId);
    
    console.log(`\n🎭 Dummy user stories (${dummyStories.length}):`);
    dummyStories.forEach(story => {
      console.log(`   - "${story.title}"`);
    });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the script
checkStories().catch(console.error); 