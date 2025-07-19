import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Feather, ArrowLeft, Edit3, Trash2 } from "lucide-react";
import { useAuth } from '../components/auth/AuthProvider';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../hooks/use-toast';
import { Heart } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ReadingView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    async function fetchStory() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('writings')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        setError(error.message);
        setStory(null);
      } else {
        setStory(data);
      }
      setLoading(false);
    }
    if (id) fetchStory();
  }, [id]);

  useEffect(() => {
    document.title = "Inkwell | Story";
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50">
        <Card className="p-8 text-center">
          <CardTitle className="mb-4">Loading...</CardTitle>
        </Card>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50">
        <Card className="p-8 text-center">
          <CardTitle className="mb-4">Story Not Found</CardTitle>
          <div className="mb-2 text-warm-600">{error}</div>
          <Link to="/stories" className="text-warm-600 hover:underline">Back to Stories</Link>
        </Card>
      </div>
    );
  }

  const handleLike = () => {
    if (!user) {
      toast({ title: 'Sign in required', description: 'Sign in to like stories.' });
      return;
    }
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  const handleDelete = async () => {
    if (!user || !story || story.user_id !== user.id) {
      toast({ title: 'Permission denied', description: 'You can only delete your own stories.' });
      return;
    }

    if (!confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
      return;
    }

    const { error } = await supabase
      .from('writings')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      toast({ title: 'Error deleting story', description: error.message });
    } else {
      toast({ title: 'Story deleted', description: 'Your story has been deleted successfully.' });
      navigate('/dashboard');
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!user) {
      toast({ title: 'Sign in required', description: 'Sign in to reply.' });
      return;
    }
    if (!commentText.trim()) return;
    setComments([
      {
        id: Date.now(),
        user: user.user_metadata?.pen_name || user.user_metadata?.full_name || user.email,
        text: commentText,
        timestamp: new Date().toISOString(),
      },
      ...comments,
    ]);
    setCommentText('');
    toast({ title: 'Reply added', description: 'Your reply was posted.' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-warm-200 bg-white/50 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2">
          <Feather className="h-8 w-8 text-warm-700" />
          <span className="text-2xl font-bold text-warm-800">Inkwell</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/stories">
            <Badge className="bg-warm-600 text-white px-4 py-2 cursor-pointer">All Stories</Badge>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto p-6">
        <Link to="/stories" className="flex items-center gap-2 text-warm-600 hover:underline mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Stories
        </Link>
        <Card className="bg-white/90 border-warm-200 dark:bg-amber-900/25 dark:border-amber-700">
          <CardHeader>
            <CardTitle className="text-3xl text-warm-900 dark:text-warm-100 mb-2">{story.title}</CardTitle>
            {story.author && <div className="text-warm-700 dark:text-warm-300 text-sm mb-2">By {story.author}</div>}
            {/* Tags display removed - tags column doesn't exist in database */}
            <div className="flex items-center gap-4 mt-4">
              <Button onClick={handleLike} variant={liked ? 'default' : 'outline'} className={liked ? 'bg-pink-600 text-white' : ''}>
                <Heart className={liked ? 'fill-pink-600 text-white' : 'text-pink-600'} />
                {likes} Like{likes !== 1 ? 's' : ''}
              </Button>
              {user && story.user_id === user.id && (
                <>
                  <Link to={`/edit/${story.id}`}>
                    <Button variant="outline" className="border-warm-300 text-warm-700 hover:bg-warm-100">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="border-red-300 text-red-700 hover:bg-red-100"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-warm max-w-none text-warm-900 dark:text-warm-100 whitespace-pre-line mb-8">
              {story.content}
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-2">Replies</h3>
              {user ? (
                <form onSubmit={handleComment} className="flex gap-2 mb-4">
                  <Input
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1"
                  />
                  <Button type="submit" disabled={!commentText.trim()}>Reply</Button>
                </form>
              ) : (
                <div className="mb-4 text-warm-600">Sign in to reply.</div>
              )}
              <div className="space-y-4">
                {comments.length === 0 && <div className="text-warm-500">No replies yet.</div>}
                {comments.map((c) => (
                  <div key={c.id} className="p-3 bg-warm-50 border border-warm-200 rounded-lg">
                    <div className="font-semibold text-warm-800">{c.user}</div>
                    <div className="text-sm text-warm-700 mb-1">{new Date(c.timestamp).toLocaleString()}</div>
                    <div className="text-warm-900">{c.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 