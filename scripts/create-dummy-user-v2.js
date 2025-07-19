// Script to create a dummy user with a different email format
// Run this with: node scripts/create-dummy-user-v2.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gsvrkioetizbiyqcqssw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzdnJraW9ldGl6Yml5cWNxc3N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NTI3OTYsImV4cCI6MjA2ODIyODc5Nn0.vv2TbnNY-mNilD9ONlvPjZ-xasncd4M192asSiZedWs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const dummyStories = [
  {
    title: "The Lantern in the Attic",
    content: `<p>Emma's grandmother always told her that the old house had secrets, but she never expected to find one in the attic. The dusty wooden floorboards creaked beneath her feet as she climbed the narrow staircase, her flashlight casting long shadows against the slanted walls.</p>
    
    <p>There, in the far corner, sat an antique lantern. Its brass surface gleamed despite the layers of dust that covered everything else in the room. As Emma reached out to touch it, a soft glow began to emanate from within, and she heard the faint sound of children's laughter echoing through the empty space.</p>
    
    <p>The lantern seemed to pulse with a warm, inviting light, and Emma felt an overwhelming sense of curiosity. What secrets did this old house hold? And why had the lantern been left here, waiting for someone to discover it?</p>`
  },
  {
    title: "Beneath the Willow Tree",
    content: `<p>Sarah and Michael had been best friends since they were five years old. Every summer, they would spend hours beneath the ancient willow tree in Sarah's backyard, creating elaborate stories about magical kingdoms and brave knights.</p>
    
    <p>One particularly hot afternoon, as they lay in the cool shade of the willow's drooping branches, Michael noticed something strange. The ground beneath them seemed to shimmer, and when he reached down to touch it, his hand passed right through the earth as if it were made of water.</p>
    
    <p>"Sarah, look!" he whispered, his eyes wide with wonder. "I think we found a portal to another world."</p>
    
    <p>Sarah sat up and stared at the shimmering ground. She had always believed in magic, but seeing it with her own eyes was something else entirely. "Should we go through?" she asked, her voice barely above a whisper.</p>
    
    <p>Michael grinned. "What do you think? We've been waiting for an adventure like this our whole lives."</p>`
  },
  {
    title: "The Clockmaker's Promise",
    content: `<p>In the small town of Millbrook, time moved differently. The residents had grown accustomed to the way clocks would occasionally stop, or how some days seemed to last forever while others passed in the blink of an eye. They all knew it had something to do with the old clockmaker who lived in the house at the end of Main Street.</p>
    
    <p>Mr. Harrison had been the town's clockmaker for as long as anyone could remember. His shop was filled with ticking, whirring, and chiming timepieces of every shape and size. But what the townspeople didn't know was that Mr. Harrison wasn't just repairing clocks—he was repairing time itself.</p>
    
    <p>Every night, when the town was asleep, he would work on his masterpiece: a clock that could control the flow of time. He had made a promise to his dying wife that he would find a way to give her more time, and he had spent the last thirty years trying to fulfill that promise.</p>
    
    <p>But time, as he had learned, was a stubborn thing. It couldn't be forced or manipulated without consequences. And as he worked on his final attempt, he began to understand that sometimes the greatest gift we can give someone is not more time, but the wisdom to use the time we have wisely.</p>`
  }
];

async function createDummyUserV2() {
  console.log('Creating dummy user with different email format...');
  
  try {
    // Try with a different email format
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'dummywriter@gmail.com',
      password: 'dummy123456',
      options: {
        data: {
          full_name: 'Dummy Writer',
          pen_name: 'Storyteller'
        }
      }
    });

    if (authError) {
      console.error('Error creating user:', authError.message);
      
      // If email already exists, try to sign in
      console.log('\nTrying to sign in with existing account...');
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'dummywriter@gmail.com',
        password: 'dummy123456'
      });
      
      if (signInError) {
        console.error('Error signing in:', signInError.message);
        return;
      }
      
      if (signInData.user) {
        console.log('✅ Signed in to existing dummy user:', signInData.user.email);
        console.log('User ID:', signInData.user.id);
        
        // Add stories to the dummy user
        await addStoriesToUser(signInData.user.id);
      }
      
      return;
    }

    if (authData.user) {
      console.log('✅ Created dummy user:', authData.user.email);
      console.log('User ID:', authData.user.id);
      
      // Add stories to the dummy user
      await addStoriesToUser(authData.user.id);
      
    } else {
      console.log('❌ Failed to create user');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function addStoriesToUser(userId) {
  console.log('\nAdding stories...');
  
  for (const story of dummyStories) {
    try {
      const { data, error } = await supabase
        .from('writings')
        .insert([{
          ...story,
          user_id: userId
        }]);
      
      if (error) {
        console.error(`Error adding story "${story.title}":`, error.message);
      } else {
        console.log(`✅ Added story: "${story.title}"`);
      }
    } catch (err) {
      console.error(`Error adding story "${story.title}":`, err.message);
    }
  }
  
  console.log('\n🎉 Success! Dummy user and stories created.');
  console.log('You can now browse the community and see these stories!');
}

// Run the script
createDummyUserV2().catch(console.error); 