import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Users, Loader2 } from 'lucide-react';
import { getFollowing, UserProfile } from '../lib/following';
import { FollowButton } from './FollowButton';
import { useAuth } from './auth/AuthProvider';

interface FollowingModalProps {
  userId: string;
  followingCount: number;
  trigger?: React.ReactNode;
}

export function FollowingModal({ userId, followingCount, trigger }: FollowingModalProps) {
  const [following, setFollowing] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (open && followingCount > 0) {
      loadFollowing();
    }
  }, [open, userId]);

  const loadFollowing = async () => {
    setLoading(true);
    try {
      const { data, error } = await getFollowing(userId);
      if (error) {
        console.error('Error loading following:', error);
      } else {
        setFollowing(data);
      }
    } catch (error) {
      console.error('Error loading following:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowChange = (followingId: string, isFollowing: boolean) => {
    // Remove from following list if unfollowed
    if (!isFollowing) {
      setFollowing(prev => prev.filter(user => user.id !== followingId));
    }
  };

  const defaultTrigger = (
    <Button variant="ghost" size="sm" className="text-warm-600 hover:text-warm-800">
      <Users className="h-4 w-4 mr-1" />
      {followingCount} following
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Following ({followingCount})
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-warm-600" />
            </div>
          ) : following.length === 0 ? (
            <div className="text-center py-8 text-warm-600">
              Not following anyone yet
            </div>
          ) : (
            <div className="space-y-3">
              {following.map((followedUser) => (
                <div key={followedUser.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-warm-50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={followedUser.avatar_url} alt={followedUser.full_name || followedUser.username || 'User'} />
                      <AvatarFallback className="bg-warm-100 text-warm-700">
                        {(followedUser.full_name || followedUser.username || 'U').charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-warm-900">
                        {followedUser.full_name || followedUser.username || 'Anonymous User'}
                      </div>
                      <div className="text-sm text-warm-600">
                        {followedUser.followers_count} follower{followedUser.followers_count !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  
                  {user && user.id !== followedUser.id && (
                    <FollowButton
                      userId={followedUser.id}
                      size="sm"
                      showText={false}
                      onFollowChange={(isFollowing) => handleFollowChange(followedUser.id, isFollowing)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 