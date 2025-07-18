import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Feather, ArrowLeft } from "lucide-react";
import { useAuth } from '../components/auth/AuthProvider';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../hooks/use-toast';
import { Heart } from 'lucide-react';
import React, { useState } from 'react';

const stories = [
  {
    id: 1,
    title: "The Lantern in the Attic",
    content: `A mysterious light appears in the old house, drawing the curiosity of a young girl. She embarks on a journey through dust and memories, discovering secrets hidden for generations...`,
    tags: ["mystery", "adventure"],
    author: "A. Writer",
  },
  {
    id: 2,
    title: "Beneath the Willow Tree",
    content: `Two friends discover a secret world hidden beneath the roots of an ancient willow. Their friendship is tested as they navigate the wonders and dangers of this magical realm...`,
    tags: ["fantasy", "friendship"],
    author: "B. Storyteller",
  },
  {
    id: 3,
    title: "The Clockmaker's Promise",
    content: `In a town where time stands still, a clockmaker holds the key to everyone's fate. As the townsfolk gather, the clockmaker reveals a promise that will change everything...`,
    tags: ["drama", "magical realism"],
    author: "C. Novelist",
  },
];

export default function ReadingView() {
  const { id } = useParams();
  const story = stories.find((s) => s.id === Number(id));
  const { user } = useAuth();
  const { toast } = useToast();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50">
        <Card className="p-8 text-center">
          <CardTitle className="mb-4">Story Not Found</CardTitle>
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
            <div className="flex flex-wrap gap-2 mb-2">
              {story.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs border-warm-300 text-warm-600 dark:border-warm-600 dark:text-warm-300">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="text-warm-700 dark:text-warm-300 text-sm mb-2">By {story.author}</div>
            <div className="flex items-center gap-4 mt-4">
              <Button onClick={handleLike} variant={liked ? 'default' : 'outline'} className={liked ? 'bg-pink-600 text-white' : ''}>
                <Heart className={liked ? 'fill-pink-600 text-white' : 'text-pink-600'} />
                {likes} Like{likes !== 1 ? 's' : ''}
              </Button>
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