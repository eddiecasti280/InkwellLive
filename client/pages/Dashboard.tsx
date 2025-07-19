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
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../components/auth/AuthProvider";

// Function to strip HTML tags and get clean text
function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export default function Dashboard() {
  const { user } = useAuth();
  const [writings, setWritings] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <Button
            variant="outline"
            className="border-warm-300 text-warm-700 hover:bg-warm-100 dark:border-warm-600 dark:text-warm-300 dark:hover:bg-warm-800"
          >
            <Eye className="mr-2 h-4 w-4" />
            Browse Community
          </Button>
          <Link to="/new-writing">
            <Button className="bg-warm-600 hover:bg-warm-700 text-white dark:bg-warm-500 dark:hover:bg-warm-600">
              <Plus className="mr-2 h-4 w-4" />
              New Writing
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

        {/* Writings Grid */}
        <div className="grid gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-warm-900">Your Writings</h2>
            <Button
              variant="outline"
              className="border-warm-300 text-warm-700 hover:bg-warm-100"
            >
              Sort by Recent
            </Button>
          </div>

          <div className="grid gap-6">
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
                  className="bg-white/80 border-warm-200 hover:shadow-lg transition-shadow cursor-pointer dark:bg-amber-900/25 dark:border-amber-700"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-warm-900 dark:text-warm-100 text-xl mb-2">
                          {writing.title}
                        </CardTitle>
                        <p className="text-warm-600 dark:text-warm-300 line-clamp-2 mb-3">
                          {stripHtml(writing.content || '')}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-warm-600 dark:text-warm-300">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {writing.created_at ? new Date(writing.created_at).toLocaleString() : ''}
                        </span>
                        <span>{writing.content ? stripHtml(writing.content).split(' ').filter(word => word.length > 0).length : 0} words</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-warm-300 text-warm-700 hover:bg-warm-100"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Link to={`/stories/${writing.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-sage-300 text-sage-700 hover:bg-sage-100"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
