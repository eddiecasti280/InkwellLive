import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { RefreshCw, Users, Loader2 } from 'lucide-react';
import { getFollowSuggestions, UserProfile } from '../lib/following';
import { FollowButton } from './FollowButton';
import { useAuth } from './auth/AuthProvider';

interface FollowSuggestionsProps {
  limit?: number;
  className?: string;
}

export function FollowSuggestions({ limit = 5, className = '' }: FollowSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadSuggestions();
    }
  }, [user, limit]);

  const loadSuggestions = async () => {
    setLoading(true);
    try {
      const { data, error } = await getFollowSuggestions(limit);
      if (error) {
        console.error('Error loading suggestions:', error);
      } else {
        setSuggestions(data);
      }
    } catch (error) {
      console.error('Error loading suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowChange = (userId: string, isFollowing: boolean) => {
    // Remove from suggestions if followed
    if (isFollowing) {
      setSuggestions(prev => prev.filter(user => user.id !== userId));
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" />
            Suggested Writers
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadSuggestions}
            disabled={loading}
            className="h-8 w-8 p-0"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-warm-600" />
          </div>
        ) : suggestions.length === 0 ? (
          <div className="text-center py-4 text-warm-600 text-sm">
            No suggestions available
          </div>
        ) : (
          suggestions.map((suggestion) => (
            <div key={suggestion.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-warm-50">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={suggestion.avatar_url} alt={suggestion.full_name || suggestion.username || 'User'} />
                  <AvatarFallback className="bg-warm-100 text-warm-700 text-xs">
                    {(suggestion.full_name || suggestion.username || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm text-warm-900">
                    {suggestion.full_name || suggestion.username || 'Anonymous User'}
                  </div>
                  <div className="text-xs text-warm-600">
                    {suggestion.followers_count} follower{suggestion.followers_count !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
              
              <FollowButton
                userId={suggestion.id}
                size="sm"
                showText={false}
                onFollowChange={(isFollowing) => handleFollowChange(suggestion.id, isFollowing)}
              />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
} 