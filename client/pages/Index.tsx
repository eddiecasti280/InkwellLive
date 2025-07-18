import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ThemeToggle } from "../components/ui/theme-toggle";
import { BookOpen, PenTool, Users, Heart, Feather, Coffee } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Feather className="h-8 w-8 text-warm-700" />
          <span className="text-2xl font-bold text-warm-800">Inkwell</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="text-warm-700 hover:text-warm-800 transition-colors dark:text-warm-300 dark:hover:text-warm-200"
          >
            Dashboard
          </Link>
          <ThemeToggle />
          <Link to="/auth">
            <Button
              variant="outline"
              className="border-warm-300 text-warm-700 hover:bg-warm-100 dark:border-warm-600 dark:text-warm-300 dark:hover:bg-warm-800"
            >
              Sign In
            </Button>
          </Link>
          <Button className="bg-warm-600 hover:bg-warm-700 text-white dark:bg-warm-500 dark:hover:bg-warm-600">
            Start Writing
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <Coffee className="h-16 w-16 text-warm-600 opacity-80" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-warm-900 mb-6 leading-tight">
          Your cozy corner of the
          <span className="text-warm-600 block">writing world</span>
        </h1>
        <p className="text-xl text-warm-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Store, organize, and share your stories in a warm, welcoming space
          designed by writers, for writers. Join our community of passionate
          storytellers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <Button
              size="lg"
              className="bg-warm-600 hover:bg-warm-700 text-white px-8 py-4 text-lg"
            >
              <PenTool className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
          </Link>
          <Link to="/stories">
            <Button
              size="lg"
              variant="outline"
              className="border-warm-300 text-warm-700 hover:bg-warm-100 px-8 py-4 text-lg"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Browse Stories
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-warm-900 mb-12">
          Everything you need to nurture your craft
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-cream-100 border-warm-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-warm-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-warm-700" />
              </div>
              <h3 className="text-xl font-semibold text-warm-800 mb-3">
                Organize Your Stories
              </h3>
              <p className="text-warm-600 leading-relaxed">
                Keep all your writings in one beautiful, organized space. Tag,
                categorize, and find your stories with ease.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-sage-100 border-sage-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-sage-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-sage-600" />
              </div>
              <h3 className="text-xl font-semibold text-warm-800 mb-3">
                Connect with Writers
              </h3>
              <p className="text-warm-600 leading-relaxed">
                Share your work, get feedback, and connect with a supportive
                community of fellow writers.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-warm-100 border-warm-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-warm-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-warm-700" />
              </div>
              <h3 className="text-xl font-semibold text-warm-800 mb-3">
                Gentle Encouragement
              </h3>
              <p className="text-warm-600 leading-relaxed">
                Built with love for the writing process. Track your progress,
                celebrate milestones, and stay motivated.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-warm-600 to-warm-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to begin your writing journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of writers who have found their home at Inkwell
          </p>
          <Link to="/dashboard">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-warm-700 hover:bg-white hover:text-black px-8 py-4 text-lg"
            >
              <Feather className="mr-2 h-5 w-5" />
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-warm-100 border-t border-warm-200">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Feather className="h-6 w-6 text-warm-700" />
            <span className="text-xl font-bold text-warm-800">Inkwell</span>
          </div>
          <p className="text-warm-600">
            A warm space for writers to grow, create, and connect.
          </p>
        </div>
      </footer>
    </div>
  );
}
