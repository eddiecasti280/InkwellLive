import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Feather, BookOpen, Eye, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStories() {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('writings')
        .select(`
          id,
          title,
          content,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
        setStories([]);
      } else {
        setStories(data || []);
      }
      setLoading(false);
    }

    fetchStories();
  }, []);

  // Function to strip HTML tags and get clean text
  function stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  // Function to get excerpt from content
  function getExcerpt(content: string, maxLength: number = 150): string {
    const cleanText = stripHtml(content);
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength) + '...';
  }

  // Function to get author name
  function getAuthorName(story: any): string {
    // For now, show anonymous since we don't have profile data
    return 'Anonymous';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-warm-200 bg-white/50 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2">
          <Feather className="h-8 w-8 text-warm-700" />
          <span className="text-2xl font-bold text-warm-800">Inkwell</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Badge className="bg-warm-600 text-white px-4 py-2 cursor-pointer">Dashboard</Badge>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-warm-900 mb-2 text-center">Stories</h1>
        <p className="text-warm-700 text-lg mb-8 text-center">Browse and enjoy stories from our community. Click a story to read more!</p>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-warm-600" />
            <span className="ml-2 text-warm-600">Loading stories...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-warm-600 mb-4">Error loading stories: {error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="text-warm-600 hover:underline"
            >
              Try again
            </button>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-20 w-20 text-warm-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-warm-800 mb-3">No stories yet</h3>
            <p className="text-warm-600 mb-6">Be the first to share a story with the community!</p>
            <Link to="/new-writing">
              <Badge className="bg-warm-600 text-white px-4 py-2 cursor-pointer">Write Your First Story</Badge>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {stories.map((story) => (
              <Link to={`/stories/${story.id}`} key={story.id} className="block">
                <Card className="bg-white/80 border-warm-200 hover:shadow-lg transition-shadow cursor-pointer dark:bg-amber-900/25 dark:border-amber-700">
                  <CardHeader>
                    <CardTitle className="text-warm-900 dark:text-warm-100 text-xl mb-2 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-warm-600" />
                      {story.title}
                    </CardTitle>
                    <p className="text-warm-600 dark:text-warm-300 line-clamp-2 mb-2">
                      {getExcerpt(story.content)}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-warm-600 dark:text-warm-300">
                      <span>By {getAuthorName(story)}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        Read
                      </span>
                    </div>
                    <div className="text-xs text-warm-500 mt-2">
                      {new Date(story.created_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 