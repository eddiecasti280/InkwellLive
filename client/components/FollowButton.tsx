import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { UserPlus, UserMinus, Loader2 } from 'lucide-react';
import { followUser, unfollowUser, isFollowing } from '../lib/following';
import { useToast } from '../hooks/use-toast';

interface FollowButtonProps {
  userId: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showText?: boolean;
  onFollowChange?: (isFollowing: boolean) => void;
}

export function FollowButton({ 
  userId, 
  className = '', 
  variant = 'outline',
  size = 'default',
  showText = true,
  onFollowChange 
}: FollowButtonProps) {
  const [following, setFollowing] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkFollowStatus();
  }, [userId]);

  const checkFollowStatus = async () => {
    try {
      const isFollowingUser = await isFollowing(userId);
      setFollowing(isFollowingUser);
    } catch (error) {
      console.error('Error checking follow status:', error);
      setFollowing(false);
    }
  };

  const handleFollowToggle = async () => {
    if (loading) return;
    
    setLoading(true);
    const wasFollowing = following;
    
    try {
      let result;
      if (following) {
        result = await unfollowUser(userId);
      } else {
        result = await followUser(userId);
      }

      if (result.success) {
        setFollowing(!following);
        onFollowChange?.(!following);
        
        toast({
          title: following ? 'Unfollowed' : 'Following',
          description: following 
            ? 'You are no longer following this user' 
            : 'You are now following this user',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Something went wrong',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update follow status',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Don't render if we haven't checked the follow status yet
  if (following === null) {
    return (
      <Button 
        variant={variant} 
        size={size} 
        className={className}
        disabled
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        {showText && <span className="ml-2">Loading...</span>}
      </Button>
    );
  }

  return (
    <Button
      variant={following ? 'default' : variant}
      size={size}
      className={className}
      onClick={handleFollowToggle}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : following ? (
        <UserMinus className="h-4 w-4" />
      ) : (
        <UserPlus className="h-4 w-4" />
      )}
      {showText && (
        <span className="ml-2">
          {loading 
            ? (following ? 'Unfollowing...' : 'Following...') 
            : (following ? 'Unfollow' : 'Follow')
          }
        </span>
      )}
    </Button>
  );
} 