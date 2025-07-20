import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Users, Loader2 } from 'lucide-react';
import { getFollowers, UserProfile } from '../lib/following';
import { FollowButton } from './FollowButton';
import { useAuth } from './auth/AuthProvider';

interface FollowersModalProps {
  userId: string;
  followersCount: number;
  trigger?: React.ReactNode;
}

export function FollowersModal({ userId, followersCount, trigger }: FollowersModalProps) {
  const [followers, setFollowers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (open && followersCount > 0) {
      loadFollowers();
    }
  }, [open, userId]);

  const loadFollowers = async () => {
    setLoading(true);
    try {
      const { data, error } = await getFollowers(userId);
      if (error) {
        console.error('Error loading followers:', error);
      } else {
        setFollowers(data);
      }
    } catch (error) {
      console.error('Error loading followers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowChange = (followerId: string, isFollowing: boolean) => {
    // Update the followers list if needed
    // This could be used to show real-time updates
  };

  const defaultTrigger = (
    <Button variant="ghost" size="sm" className="text-warm-600 hover:text-warm-800">
      <Users className="h-4 w-4 mr-1" />
      {followersCount} follower{followersCount !== 1 ? 's' : ''}
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
            Followers ({followersCount})
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-warm-600" />
            </div>
          ) : followers.length === 0 ? (
            <div className="text-center py-8 text-warm-600">
              No followers yet
            </div>
          ) : (
            <div className="space-y-3">
              {followers.map((follower) => (
                <div key={follower.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-warm-50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={follower.avatar_url} alt={follower.full_name || follower.username || 'User'} />
                      <AvatarFallback className="bg-warm-100 text-warm-700">
                        {(follower.full_name || follower.username || 'U').charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-warm-900">
                        {follower.full_name || follower.username || 'Anonymous User'}
                      </div>
                      <div className="text-sm text-warm-600">
                        {follower.followers_count} follower{follower.followers_count !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  
                  {user && user.id !== follower.id && (
                    <FollowButton
                      userId={follower.id}
                      size="sm"
                      showText={false}
                      onFollowChange={(isFollowing) => handleFollowChange(follower.id, isFollowing)}
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