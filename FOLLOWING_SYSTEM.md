# Following System Implementation

## Overview

The following system allows users to follow other writers and see their content in a personalized feed. This creates a social aspect to the writing platform where users can discover and engage with content from writers they follow.

## Features Implemented

### 1. Core Following Functionality
- **Follow/Unfollow Users**: Users can follow and unfollow other writers
- **Follow Status**: Real-time checking of follow status
- **Follower Counts**: Automatic tracking of follower and following counts
- **Self-Follow Prevention**: Users cannot follow themselves

### 2. Social Components
- **FollowButton**: Reusable component for follow/unfollow actions
- **FollowersModal**: Modal showing list of users following a specific user
- **FollowingModal**: Modal showing list of users a specific user is following
- **FollowSuggestions**: Component suggesting users to follow

### 3. Enhanced Pages
- **Profile Page**: Shows follower/following counts with modals
- **Dashboard**: Added "Following Feed" tab alongside "Your Writings"
- **Stories Page**: Follow buttons on story cards
- **Reading View**: Author info with follow button and follower count

### 4. Database Schema
- **follows table**: Stores follow relationships
- **profiles table**: Enhanced with follower/following counts
- **RLS Policies**: Secure access control
- **Triggers**: Automatic count updates

## Database Setup

### 1. Run the SQL Script
Copy and paste the contents of `scripts/setup-following.sql` into your Supabase SQL Editor and run it.

### 2. Verify Setup
Check that the following were created:
- `follows` table with proper indexes
- RLS policies on the `follows` table
- `followers_count` and `following_count` columns in `profiles` table
- Triggers for automatic count updates

## API Functions

### Core Functions (`client/lib/following.ts`)

```typescript
// Follow a user
followUser(followingId: string): Promise<{ success: boolean; error?: string }>

// Unfollow a user
unfollowUser(followingId: string): Promise<{ success: boolean; error?: string }>

// Check if following
isFollowing(followingId: string): Promise<boolean>

// Get followers list
getFollowers(userId: string, page?: number): Promise<{ data: UserProfile[]; error?: string }>

// Get following list
getFollowing(userId: string, page?: number): Promise<{ data: UserProfile[]; error?: string }>

// Get following feed
getFollowingFeed(page?: number): Promise<{ data: any[]; error?: string }>

// Get follow suggestions
getFollowSuggestions(limit?: number): Promise<{ data: UserProfile[]; error?: string }>
```

## Components

### FollowButton
A reusable button component that handles follow/unfollow functionality with loading states and optimistic updates.

**Props:**
- `userId`: ID of the user to follow/unfollow
- `className`: Custom CSS classes
- `variant`: Button variant ('default', 'outline', 'ghost')
- `size`: Button size ('default', 'sm', 'lg', 'icon')
- `showText`: Whether to show follow/unfollow text
- `onFollowChange`: Callback when follow status changes

### FollowersModal & FollowingModal
Modal components that display lists of followers or following users with follow buttons.

**Props:**
- `userId`: ID of the user whose followers/following to show
- `followersCount`/`followingCount`: Count for display
- `trigger`: Custom trigger element

### FollowSuggestions
Component that suggests users to follow based on popularity and current follow status.

**Props:**
- `limit`: Number of suggestions to show
- `className`: Custom CSS classes

## Usage Examples

### Basic Follow Button
```tsx
<FollowButton userId="user-id-here" />
```

### Follow Button with Custom Styling
```tsx
<FollowButton 
  userId="user-id-here"
  variant="outline"
  size="sm"
  showText={false}
  className="ml-2"
/>
```

### Followers Modal
```tsx
<FollowersModal 
  userId="user-id-here" 
  followersCount={42}
/>
```

### Follow Suggestions
```tsx
<FollowSuggestions limit={5} />
```

## User Experience Flow

### 1. Discovery
- Users see follow suggestions on Dashboard and Stories pages
- Can follow from story cards, profiles, or suggestions
- Followed content appears in their feed

### 2. Interaction
- Click follow → immediate UI update + API call
- See follower count updates in real-time
- Get toast notifications for follow/unfollow actions

### 3. Content Consumption
- "Following" tab shows only followed users' content
- Can still browse all stories in "All Stories" tab
- Personalized feed based on follows

## Security Features

### Row Level Security (RLS)
- Users can only create follows for themselves
- Users can only delete their own follows
- All follows are publicly viewable (for profile displays)

### Data Validation
- Self-following prevention via database trigger
- Unique constraint prevents duplicate follows
- Proper foreign key relationships

## Performance Considerations

### Database Indexes
- Indexes on `follower_id` and `following_id` for fast queries
- Efficient joins with profiles table

### Pagination
- Followers/following lists support pagination
- Feed queries are paginated for performance

### Optimistic Updates
- UI updates immediately for better UX
- API calls happen in background
- Error handling with rollback

## Future Enhancements

### Potential Features
- **Follow categories**: Friends, family, favorite authors
- **Follow lists**: Public/private follow lists
- **Follow analytics**: Engagement rates, mutual follows
- **Follow recommendations**: Based on reading history
- **Follow challenges**: "Follow 10 new writers this week"

### Technical Improvements
- Real-time updates with Supabase subscriptions
- Advanced recommendation algorithms
- Follow activity notifications
- Follow export/import functionality

## Troubleshooting

### Common Issues

1. **Follow button not working**
   - Check if user is authenticated
   - Verify RLS policies are set up correctly
   - Check browser console for errors

2. **Follower counts not updating**
   - Ensure triggers are created properly
   - Check if `update_follower_counts` function exists
   - Verify `followers_count` and `following_count` columns exist

3. **Follow suggestions empty**
   - Check if there are other users in the system
   - Verify the query excludes current user and already followed users
   - Check for any SQL errors in the console

### Debug Queries

```sql
-- Check if follows table exists
SELECT * FROM follows LIMIT 5;

-- Check follower counts
SELECT id, full_name, followers_count, following_count FROM profiles;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'follows';

-- Check triggers
SELECT * FROM pg_trigger WHERE tgname LIKE '%follow%';
```

## Testing

### Manual Testing Checklist
- [ ] Follow button works on story cards
- [ ] Follow button works on profile pages
- [ ] Follow button works in reading view
- [ ] Followers modal shows correct users
- [ ] Following modal shows correct users
- [ ] Follow suggestions appear
- [ ] Following feed shows followed users' content
- [ ] Follower counts update correctly
- [ ] Cannot follow self
- [ ] Cannot follow same user twice
- [ ] Unfollow removes from lists correctly

### Test Data
Create test users and follow relationships to verify functionality:
```sql
-- Create test follows (replace with actual user IDs)
INSERT INTO follows (follower_id, following_id) VALUES 
('user1-id', 'user2-id'),
('user1-id', 'user3-id'),
('user2-id', 'user1-id');
```

## Deployment Notes

1. **Database Migration**: Run the SQL script in Supabase before deploying
2. **Environment Variables**: No additional environment variables needed
3. **Build Process**: No special build steps required
4. **Testing**: Test follow functionality with multiple user accounts

## Support

For issues or questions about the following system:
1. Check the troubleshooting section above
2. Review the database setup
3. Check browser console for errors
4. Verify RLS policies are correctly configured 