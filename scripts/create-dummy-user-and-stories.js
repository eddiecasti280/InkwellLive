// Script to create a dummy user and add dummy stories
// Run this with: node scripts/create-dummy-user-and-stories.js

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
  },
  {
    title: "The Last Bookstore",
    content: `<p>In a world where everything had gone digital, the old bookstore on Oak Street was a relic of a bygone era. Its shelves were lined with real books—books you could hold, smell, and feel the weight of in your hands. The owner, Mrs. Eleanor Whitmore, had been running the store for forty years, and she refused to give up on the magic of printed words.</p>
    
    <p>But times were hard, and the store was struggling. Eleanor knew that if she couldn't pay the rent by the end of the month, she would have to close the doors forever. She had tried everything: book clubs, author readings, even a small café in the back. But the customers just weren't coming anymore.</p>
    
    <p>Then, one rainy afternoon, a young girl named Lily walked into the store. She was soaked from the rain, but her eyes lit up when she saw the shelves of books. "Are these all real?" she asked, running her fingers along the spines.</p>
    
    <p>"Every single one," Eleanor replied with a smile. "Would you like me to read you a story?"</p>
    
    <p>As Eleanor read to Lily that afternoon, she remembered why she had opened the bookstore in the first place. It wasn't about making money—it was about sharing the magic of stories, about creating a place where people could escape into other worlds, even if just for a little while.</p>`
  },
  {
    title: "The Garden of Memories",
    content: `<p>Maria had inherited her grandmother's house, but it was the garden that captured her heart. It was a wild, overgrown space that seemed to have a life of its own. Flowers bloomed in impossible colors, and the air was thick with the scent of roses, lavender, and something else—something that reminded her of her childhood.</p>
    
    <p>As she walked through the garden, memories began to surface. She remembered sitting on her grandmother's lap while she told stories about the flowers. Each plant had a story, her grandmother would say, and each story was a memory waiting to be discovered.</p>
    
    <p>Maria found herself drawn to a particular rose bush in the corner of the garden. Its flowers were a deep, velvety red, and as she reached out to touch one, she was suddenly transported back to her tenth birthday. She could see her grandmother standing in the same spot, tending to the roses, and she could hear the sound of her own laughter as she played in the garden.</p>
    
    <p>The garden wasn't just a collection of plants—it was a living memory book, each flower a page in the story of her family. And as Maria began to tend to the garden, she realized that she wasn't just caring for the plants; she was preserving the memories of those who had loved this place before her.</p>`
  }
];

async function createDummyUserAndStories() {
  console.log('Creating dummy user and stories...');
  
  try {
    // Create a dummy user account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'dummy.writer@inkwell.com',
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
      return;
    }

    if (authData.user) {
      console.log('✅ Created dummy user:', authData.user.email);
      console.log('User ID:', authData.user.id);
      
      // Add stories to the dummy user
      console.log('\nAdding stories...');
      
      for (const story of dummyStories) {
        try {
          const { data, error } = await supabase
            .from('writings')
            .insert([{
              ...story,
              user_id: authData.user.id
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
      
    } else {
      console.log('❌ Failed to create user');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the script
createDummyUserAndStories().catch(console.error); 