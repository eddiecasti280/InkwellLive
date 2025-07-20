import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { ThemeToggle } from "../components/ui/theme-toggle";
import { UserMenu } from "../components/auth/UserMenu";
import {
  Feather,
  Plus,
  Search,
  BookOpen,
  Edit3,
  Calendar,
  Clock,
  Tags,
  Heart,
  Eye,
  Mail,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../components/auth/AuthProvider";
import { BookCover } from "../components/BookCover";
import { FollowSuggestions } from "../components/FollowSuggestions";
import { getFollowingFeed } from "../lib/following";

// Function to strip HTML tags and get clean text
function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export default function Dashboard() {
  const { user } = useAuth();
  const [writings, setWritings] = useState([]);
  const [followingFeed, setFollowingFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedLoading, setFeedLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'writings' | 'following'>('writings');

  useEffect(() => {
    document.title = "Inkwell | Dashboard";
  }, []);

  useEffect(() => {
    async function fetchWritings() {
      if (!user) {
        console.log("No user found, skipping fetch");
        return;
      }
      
      console.log("Fetching writings for user:", user.id);
      console.log("User object:", user);
      setLoading(true);
      
      // Test the exact query
      const query = supabase
        .from("writings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      console.log("Supabase query:", query);
      
      const { data, error } = await query;
      
      console.log("Raw fetch result:", { data, error });
      console.log("Data length:", data?.length);
      console.log("First item:", data?.[0]);
      
      if (!error) setWritings(data || []);
      setLoading(false);
    }
    fetchWritings();
  }, [user]);

  useEffect(() => {
    async function fetchFollowingFeed() {
      if (!user || activeTab !== 'following') return;
      
      setFeedLoading(true);
      try {
        const { data, error } = await getFollowingFeed();
        if (error) {
          console.error('Error loading following feed:', error);
        } else {
          setFollowingFeed(data || []);
        }
      } catch (error) {
        console.error('Error loading following feed:', error);
      } finally {
        setFeedLoading(false);
      }
    }
    
    fetchFollowingFeed();
  }, [user, activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-warm-200 bg-white/50 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2">
          <Feather className="h-8 w-8 text-warm-700" />
          <span className="text-2xl font-bold text-warm-800">Inkwell</span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/stories">
            <Button
              variant="outline"
              className="border-warm-300 text-warm-700 hover:bg-warm-100 dark:border-warm-600 dark:text-warm-300 dark:hover:bg-warm-800"
            >
              <Eye className="mr-2 h-4 w-4" />
              Browse Community
            </Button>
          </Link>
          <Link to="/book-cover-demo">
            <Button
              variant="outline"
              className="border-sage-300 text-sage-700 hover:bg-sage-100"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Book Covers Demo
            </Button>
          </Link>
          <Link to="/new-writing">
            <Button className="bg-warm-600 hover:bg-warm-700 text-white dark:bg-warm-500 dark:hover:bg-warm-600">
              <Plus className="mr-2 h-4 w-4" />
              New Writing
            </Button>
          </Link>
          <Link to="/inbox">
            <Button
              variant="outline"
              className="border-sage-300 text-sage-700 hover:bg-sage-100"
            >
              <Mail className="mr-2 h-4 w-4" />
              Inbox
            </Button>
          </Link>
          <UserMenu />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-warm-900 mb-2">
            Welcome back, Writer
          </h1>
          <p className="text-warm-700 text-lg">
            Ready to continue your creative journey?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 justify-center">
          <Card className="bg-white/70 border-warm-200">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-warm-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-warm-800">12</div>
              <div className="text-warm-600 text-sm">Total Writings</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 border-sage-200">
            <CardContent className="p-6 text-center">
              <Edit3 className="h-8 w-8 text-sage-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-warm-800">28,540</div>
              <div className="text-warm-600 text-sm">Words Written</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 border-warm-200">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-warm-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-warm-800">89</div>
              <div className="text-warm-600 text-sm">Likes Received</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-warm-500" />
              <Input
                placeholder="Search your writings..."
                className="pl-10 bg-white/70 border-warm-200 focus:border-warm-400"
              />
            </div>
            <Button
              variant="outline"
              className="border-warm-300 text-warm-700 hover:bg-warm-100"
            >
              <Tags className="mr-2 h-4 w-4" />
              Filter by Tags
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/70 rounded-lg p-1 border border-warm-200">
            <button
              onClick={() => setActiveTab('writings')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'writings'
                  ? 'bg-warm-600 text-white shadow-sm'
                  : 'text-warm-700 hover:text-warm-900 hover:bg-warm-50'
              }`}
            >
              Your Writings
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'following'
                  ? 'bg-warm-600 text-white shadow-sm'
                  : 'text-warm-700 hover:text-warm-900 hover:bg-warm-50'
              }`}
            >
              Following Feed
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6">
          {activeTab === 'writings' && (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-warm-900">Your Writings</h2>
                <Button
                  variant="outline"
                  className="border-warm-300 text-warm-700 hover:bg-warm-100"
                >
                  Sort by Recent
                </Button>
              </div>
            </>
          )}
          
          {activeTab === 'following' && (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-warm-900">Following Feed</h2>
                <Button
                  variant="outline"
                  className="border-warm-300 text-warm-700 hover:bg-warm-100"
                >
                  Sort by Recent
                </Button>
              </div>
            </>
          )}

          <div className="grid gap-6">
            {activeTab === 'writings' && (
              <>
                {loading ? (
                  <div className="text-center text-warm-600">Loading your writings...</div>
                ) : writings.length === 0 ? (
                  <div className="text-center py-20">
                    <Feather className="h-20 w-20 text-warm-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-warm-800 mb-3">
                      Your writing journey begins here
                    </h3>
                    <p className="text-warm-600 mb-6 max-w-md mx-auto">
                      Start by creating your first piece. Whether it's a story, poem, or
                      journal entry, every great writer started with a single word.
                    </p>
                    <Link to="/new-writing">
                      <Button className="bg-warm-600 hover:bg-warm-700 text-white">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Writing
                      </Button>
                    </Link>
                  </div>
                ) : (
                  writings.map((writing) => (
                    <Card
                      key={writing.id}
                      className="bg-white/80 border-warm-200 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer dark:bg-amber-900/25 dark:border-amber-700 overflow-hidden"
                    >
                      <div className="relative">
                        <BookCover
                          title={writing.title}
                          content={writing.content}
                          size="lg"
                          className="w-full h-48 rounded-t-lg"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-warm-600 text-white text-xs">
                            <Edit3 className="h-3 w-3 mr-1" />
                            Your Story
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-warm-900 dark:text-warm-100 text-lg mb-2 line-clamp-2">
                          {writing.title}
                        </CardTitle>
                        <p className="text-warm-600 dark:text-warm-300 text-sm line-clamp-3">
                          {stripHtml(writing.content || '').substring(0, 120)}...
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-xs text-warm-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {writing.created_at ? new Date(writing.created_at).toLocaleDateString() : ''}
                            </span>
                            <span>{writing.content ? stripHtml(writing.content).split(' ').filter(word => word.length > 0).length : 0} words</span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-warm-300 text-warm-700 hover:bg-warm-100 text-xs px-2 py-1"
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Link to={`/stories/${writing.id}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-sage-300 text-sage-700 hover:bg-sage-100 text-xs px-2 py-1"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </>
            )}

            {activeTab === 'following' && (
              <>
                {feedLoading ? (
                  <div className="text-center text-warm-600">Loading following feed...</div>
                ) : followingFeed.length === 0 ? (
                  <div className="text-center py-20">
                    <Feather className="h-20 w-20 text-warm-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-warm-800 mb-3">
                      Start following writers
                    </h3>
                    <p className="text-warm-600 mb-6 max-w-md mx-auto">
                      Follow other writers to see their latest stories in your feed.
                    </p>
                    <Link to="/stories">
                      <Button className="bg-warm-600 hover:bg-warm-700 text-white">
                        <Eye className="mr-2 h-4 w-4" />
                        Browse Community
                      </Button>
                    </Link>
                  </div>
                ) : (
                  followingFeed.map((writing) => (
                    <Card
                      key={writing.id}
                      className="bg-white/80 border-warm-200 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer dark:bg-amber-900/25 dark:border-amber-700 overflow-hidden"
                    >
                      <div className="relative">
                        <BookCover
                          title={writing.title}
                          content={writing.content}
                          size="lg"
                          className="w-full h-48 rounded-t-lg"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-sage-600 text-white text-xs">
                            <User className="h-3 w-3 mr-1" />
                            Anonymous
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-warm-900 dark:text-warm-100 text-lg mb-2 line-clamp-2">
                          {writing.title}
                        </CardTitle>
                        <p className="text-warm-600 dark:text-warm-300 text-sm line-clamp-3">
                          {stripHtml(writing.content || '').substring(0, 120)}...
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-xs text-warm-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {writing.created_at ? new Date(writing.created_at).toLocaleDateString() : ''}
                            </span>
                            <span>{writing.content ? stripHtml(writing.content).split(' ').filter(word => word.length > 0).length : 0} words</span>
                          </div>
                          <div className="flex gap-2">
                            <Link to={`/stories/${writing.id}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-sage-300 text-sage-700 hover:bg-sage-100 text-xs px-2 py-1"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </>
            )}
          </div>
        </div>

        {/* Follow Suggestions */}
        {activeTab === 'writings' && (
          <div className="mt-8">
            <FollowSuggestions limit={3} />
          </div>
        )}
      </div>
    </div>
  );
}
