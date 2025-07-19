import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Feather, BookOpen, Eye, Loader2, User } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../components/auth/AuthProvider";
import { BookCover } from "../components/BookCover";

export default function Stories() {
  const { user } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Inkwell | Stories";
  }, []);

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
    // Check if it's the current user's story
    if (user && story.user_id === user.id) {
      return 'You';
    }
    
    // Create different author names based on user_id to distinguish between authors
    const authorMap = {
      'e1a14879-53df-4396-9ff7-d8b83fc6e6da': 'Storyteller', // Old dummy user
      '57a81547-3e18-41e4-9b78-568010f7a183': 'Community Writer', // New dummy user
      // Add more mappings as needed
    };
    
    return authorMap[story.user_id] || 'Anonymous Writer';
  }

  // Function to check if story is by current user
  function isOwnStory(story: any): boolean {
    return user && story.user_id === user.id;
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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <Link to={`/stories/${story.id}`} key={story.id} className="block">
                <Card className="bg-white/80 border-warm-200 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer dark:bg-amber-900/25 dark:border-amber-700 overflow-hidden">
                  <div className="relative">
                    <BookCover
                      title={story.title}
                      content={story.content}
                      size="lg"
                      className="w-full h-48 rounded-t-lg"
                    />
                    <div className="absolute top-3 right-3">
                      {isOwnStory(story) && (
                        <Badge className="bg-warm-600 text-white text-xs">
                          <User className="h-3 w-3 mr-1" />
                          You
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-warm-900 dark:text-warm-100 text-lg mb-2 line-clamp-2">
                      {story.title}
                    </CardTitle>
                    <p className="text-warm-600 dark:text-warm-300 text-sm line-clamp-3">
                      {getExcerpt(story.content, 120)}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-warm-500">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{getAuthorName(story)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{new Date(story.created_at).toLocaleDateString()}</span>
                      </div>
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