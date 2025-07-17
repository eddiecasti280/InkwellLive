import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Feather, BookOpen, Eye } from "lucide-react";

const stories = [
  {
    id: 1,
    title: "The Lantern in the Attic",
    excerpt: "A mysterious light appears in the old house, drawing the curiosity of a young girl...",
    tags: ["mystery", "adventure"],
    author: "A. Writer",
  },
  {
    id: 2,
    title: "Beneath the Willow Tree",
    excerpt: "Two friends discover a secret world hidden beneath the roots of an ancient willow...",
    tags: ["fantasy", "friendship"],
    author: "B. Storyteller",
  },
  {
    id: 3,
    title: "The Clockmaker's Promise",
    excerpt: "In a town where time stands still, a clockmaker holds the key to everyone's fate...",
    tags: ["drama", "magical realism"],
    author: "C. Novelist",
  },
];

export default function Stories() {
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
        <div className="grid gap-8 md:grid-cols-2">
          {stories.map((story) => (
            <Link to={`/stories/${story.id}`} key={story.id} className="block">
              <Card className="bg-white/80 border-warm-200 hover:shadow-lg transition-shadow cursor-pointer dark:bg-amber-900/25 dark:border-amber-700">
                <CardHeader>
                  <CardTitle className="text-warm-900 dark:text-warm-100 text-xl mb-2 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-warm-600" />
                    {story.title}
                  </CardTitle>
                  <p className="text-warm-600 dark:text-warm-300 line-clamp-2 mb-2">{story.excerpt}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {story.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-warm-300 text-warm-600 dark:border-warm-600 dark:text-warm-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm text-warm-600 dark:text-warm-300">
                    <span>By {story.author}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      Read
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 