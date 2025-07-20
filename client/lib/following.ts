import { supabase } from './supabaseClient';

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  followers_count: number;
  following_count: number;
}

// Follow a user
export async function followUser(followingId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    const { error } = await supabase
      .from('follows')
      .insert({
        follower_id: user.id,
        following_id: followingId
      });

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return { success: false, error: 'Already following this user' };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to follow user' };
  }
}

// Unfollow a user
export async function unfollowUser(followingId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', user.id)
      .eq('following_id', followingId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to unfollow user' };
  }
}

// Check if current user is following another user
export async function isFollowing(followingId: string): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', user.id)
      .eq('following_id', followingId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking follow status:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking follow status:', error);
    return false;
  }
}

// Get followers list
export async function getFollowers(userId: string, page: number = 1, limit: number = 20): Promise<{ data: UserProfile[]; error?: string }> {
  try {
    const offset = (page - 1) * limit;

    const { data, error } = await supabase
      .from('follows')
      .select(`
        follower_id,
        profiles!follows_follower_id_fkey (
          id,
          full_name,
          username,
          avatar_url,
          followers_count,
          following_count
        )
      `)
      .eq('following_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return { data: [], error: error.message };
    }

    const followers = (data?.map(item => item.profiles).filter(Boolean) || []) as unknown as UserProfile[];
    return { data: followers };
  } catch (error) {
    return { data: [], error: 'Failed to fetch followers' };
  }
}

// Get following list
export async function getFollowing(userId: string, page: number = 1, limit: number = 20): Promise<{ data: UserProfile[]; error?: string }> {
  try {
    const offset = (page - 1) * limit;

    const { data, error } = await supabase
      .from('follows')
      .select(`
        following_id,
        profiles!follows_following_id_fkey (
          id,
          full_name,
          username,
          avatar_url,
          followers_count,
          following_count
        )
      `)
      .eq('follower_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return { data: [], error: error.message };
    }

    const following = (data?.map(item => item.profiles).filter(Boolean) || []) as unknown as UserProfile[];
    return { data: following };
  } catch (error) {
    return { data: [], error: 'Failed to fetch following' };
  }
}

// Get feed of followed users' writings
export async function getFollowingFeed(page: number = 1, limit: number = 20): Promise<{ data: any[]; error?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { data: [], error: 'User not authenticated' };
    }

    const offset = (page - 1) * limit;

    // First get the users that the current user is following
    const { data: followingData, error: followingError } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', user.id);

    if (followingError) {
      return { data: [], error: followingError.message };
    }

    const followingIds = followingData?.map(f => f.following_id) || [];
    
    if (followingIds.length === 0) {
      return { data: [] }; // No following, return empty feed
    }

    // Get writings from followed users
    const { data, error } = await supabase
      .from('writings')
      .select(`
        *,
        profiles!writings_user_id_fkey (
          id,
          full_name,
          username,
          avatar_url
        )
      `)
      .in('user_id', followingIds)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return { data: [], error: error.message };
    }

    return { data: data || [] };
  } catch (error) {
    return { data: [], error: 'Failed to fetch following feed' };
  }
}

// Get follow suggestions (users not being followed)
export async function getFollowSuggestions(limit: number = 10): Promise<{ data: UserProfile[]; error?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { data: [], error: 'User not authenticated' };
    }

    let query = supabase
      .from('profiles')
      .select('id, full_name, username, avatar_url, followers_count, following_count')
      .neq('id', user.id)
      .order('followers_count', { ascending: false })
      .limit(limit);
    const { data, error } = await query;

    if (error) {
      return { data: [], error: error.message };
    }

    return { data: data || [] };
  } catch (error) {
    return { data: [], error: 'Failed to fetch follow suggestions' };
  }
} 