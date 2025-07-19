import { Link } from "react-router-dom";
import { Mail, Feather, Plus, BookOpen, Eye } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ThemeToggle } from "../components/ui/theme-toggle";
import { UserMenu } from "../components/auth/UserMenu";

export default function Inbox() {
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
          <Button
            variant="outline"
            className="border-sage-300 text-sage-700 bg-sage-100 cursor-default"
            disabled
          >
            <Mail className="mr-2 h-4 w-4" />
            Inbox
          </Button>
          <UserMenu />
        </div>
      </nav>
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center py-24">
        <Card className="bg-white/90 border-warm-200 shadow-lg p-8 flex flex-col items-center">
          <Mail className="h-16 w-16 text-sage-500 mb-4" />
          <h1 className="text-2xl font-bold text-warm-900 mb-2">Inbox</h1>
          <p className="text-warm-600 text-lg mb-2">Your inbox is empty.</p>
          <p className="text-warm-400 text-sm">Direct messages will appear here when you receive them.</p>
        </Card>
      </div>
    </div>
  );
} 