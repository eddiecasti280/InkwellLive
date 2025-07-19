// Script to add dummy stories to the current user's account
// Run this with: node scripts/add-stories-to-current-user.js

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

async function addStoriesToCurrentUser() {
  console.log('This script will add dummy stories to your current user account.');
  console.log('Please provide your user ID (you can find this in your browser console when logged in):');
  
  // For now, let's use a placeholder approach
  console.log('\nTo get your user ID:');
  console.log('1. Open your browser and go to your Inkwell app');
  console.log('2. Sign in to your account');
  console.log('3. Open Developer Tools (F12)');
  console.log('4. In the Console, type: console.log(supabase.auth.getUser())');
  console.log('5. Copy your user ID from the response');
  console.log('\nThen update this script with your user ID and run it again.');
  
  // You can replace this with your actual user ID
  const YOUR_USER_ID = "YOUR_USER_ID_HERE";
  
  if (YOUR_USER_ID === "YOUR_USER_ID_HERE") {
    console.log('\n❌ Please replace YOUR_USER_ID_HERE with your actual user ID above');
    return;
  }
  
  console.log('\nAdding stories to your account...');
  
  for (const story of dummyStories) {
    try {
      const { data, error } = await supabase
        .from('writings')
        .insert([{
          ...story,
          user_id: YOUR_USER_ID
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
  
  console.log('\n🎉 Success! Stories added to your account.');
  console.log('You can now see these stories in your Dashboard and in Browse Community!');
}

// Run the script
addStoriesToCurrentUser().catch(console.error); 