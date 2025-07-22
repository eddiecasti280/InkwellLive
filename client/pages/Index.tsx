import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ThemeToggle } from "../components/ui/theme-toggle";
import { BookOpen, PenTool, Users, Heart, Feather, Coffee, Star, Quote, Sparkles, TrendingUp, ExternalLink } from "lucide-react";
import { useAuth } from "../components/auth/AuthProvider";
import { useEffect } from "react";

export default function Index() {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Inkwell | Landing";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sparse, faded sparkles - now more visible and well-placed */}
        <div className="absolute top-24 left-16 opacity-15">
          <Sparkles className="h-7 w-7 text-warm-400" />
        </div>
        <div className="absolute top-1/2 right-24 opacity-10">
          <Sparkles className="h-10 w-10 text-warm-300" />
        </div>
        <div className="absolute bottom-32 left-1/3 opacity-10">
          <Sparkles className="h-6 w-6 text-warm-200" />
        </div>
        <div className="absolute bottom-10 right-1/4 opacity-10">
          <Sparkles className="h-8 w-8 text-warm-300" />
        </div>
        {/* Optionally, keep the feather for a touch of charm */}
        <div className="absolute bottom-20 right-10 animate-pulse opacity-20">
          <Feather className="h-7 w-7 text-sage-500" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-2">
          <Feather className="h-8 w-8 text-warm-700 animate-pulse" />
          <span className="text-2xl font-bold text-warm-800">Inkwell</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/auth">
            <Button
              variant="outline"
              className="border-warm-300 text-warm-700 hover:bg-warm-100 dark:border-warm-600 dark:text-warm-300 dark:hover:bg-warm-800 transition-all duration-300 hover:scale-105"
            >
              Sign In
            </Button>
          </Link>
          {user ? (
            <Link to="/dashboard">
              <Button className="bg-warm-600 hover:bg-warm-700 text-white dark:bg-warm-500 dark:hover:bg-warm-600 transition-all duration-300 hover:scale-105 shadow-lg flex items-center">
                Dashboard
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button className="bg-warm-600 hover:bg-warm-700 text-white dark:bg-warm-500 dark:hover:bg-warm-600 transition-all duration-300 hover:scale-105 shadow-lg">
                Start Writing
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto relative z-10">
        <div className="relative flex justify-center mb-6">
          <div className="relative">
            {/* Coffee with even slower bounce */}
            <Coffee className="h-16 w-16 text-warm-600 opacity-80 animate-bounce-slow" />
            {/* Removed sparkle on mug */}
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-warm-900 mb-6 leading-tight">
          Your cozy corner of the
          <span className="text-warm-600 block bg-gradient-to-r from-warm-600 to-warm-700 bg-clip-text text-transparent leading-snug md:leading-tight" style={{paddingTop: '0.1em', paddingBottom: '0.1em', lineHeight: 1.1}}>
            writing world
          </span>
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
              className="bg-warm-600 hover:bg-warm-700 text-white px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <PenTool className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
          </Link>
          <Link to="/stories">
            <Button
              size="lg"
              variant="outline"
              className="border-warm-300 text-warm-700 hover:bg-warm-100 px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Browse Stories
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-warm-700">1,247</div>
            <div className="text-sm text-warm-600">Stories Shared</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-warm-700">892</div>
            <div className="text-sm text-warm-600">Active Writers</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-warm-700">15,420</div>
            <div className="text-sm text-warm-600">Words Written</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-warm-700">4.9</div>
            <div className="text-sm text-warm-600 flex items-center justify-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              Rating
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 px-6 max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-center text-warm-900 mb-12">
          Everything you need to nurture your craft
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-cream-100 border-warm-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-warm-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-warm-300 transition-colors duration-300">
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

          <Card className="bg-sage-100 border-sage-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-sage-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sage-300 transition-colors duration-300">
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

          <Card className="bg-warm-100 border-warm-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-warm-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-warm-300 transition-colors duration-300">
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

      {/* Testimonials Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-center text-warm-900 mb-12">
          What writers are saying
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm border-warm-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="h-8 w-8 text-warm-400 mb-4" />
              <p className="text-warm-700 mb-4 italic">
                "Inkwell has transformed how I organize my writing. The warm design makes me feel at home, and the community is incredibly supportive."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warm-200 rounded-full flex items-center justify-center">
                  <span className="text-warm-700 font-semibold">S</span>
                </div>
                <div>
                  <div className="font-semibold text-warm-800">Sarah Chen</div>
                  <div className="text-sm text-warm-600">Fantasy Writer</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-warm-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="h-8 w-8 text-warm-400 mb-4" />
              <p className="text-warm-700 mb-4 italic">
                "Finally, a writing platform that feels personal and inspiring. The abstract book covers are beautiful, and the interface is so intuitive."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sage-200 rounded-full flex items-center justify-center">
                  <span className="text-sage-700 font-semibold">M</span>
                </div>
                <div>
                  <div className="font-semibold text-warm-800">Marcus Rodriguez</div>
                  <div className="text-sm text-warm-600">Mystery Author</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-warm-600 to-warm-700 text-white relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <TrendingUp className="h-12 w-12 text-white/80 animate-pulse" />
          </div>
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
              className="border-white text-warm-700 hover:bg-white hover:text-black px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Feather className="mr-2 h-5 w-5" />
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-warm-100 border-t border-warm-200 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Feather className="h-6 w-6 text-warm-700 animate-pulse" />
            <span className="text-xl font-bold text-warm-800">Inkwell</span>
          </div>
          <p className="text-warm-600">
            A warm space for writers to grow, create, and connect.
          </p>
          <div className="mt-6 flex flex-col items-center gap-2">
            <a href="mailto:contact@inkwell.com" className="text-warm-700 hover:underline mb-2">Contact</a>
            <div className="flex gap-4 justify-center">
              <a href="https://x.com/inkwell" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" className="hover:text-warm-800 text-warm-600">
                {/* X (formerly Twitter) modern logo */}
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 3H21.5l-7.19 8.21L23 21h-7.5l-5.2-6.6L4.47 21H0.5l7.61-8.7L1 3h7.5l4.7 6 4.33-6zm-2.13 15.5h2.13l-5.98-7.6-2.13-2.7H7.5l5.98 7.6 2.13 2.7z"/></svg>
              </a>
              <a href="https://facebook.com/inkwell" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-warm-800 text-warm-600">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.408 24 22.674V1.326C24 .592 23.405 0 22.675 0"/></svg>
              </a>
              <a href="https://linkedin.com/company/inkwell" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-warm-800 text-warm-600">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom even slower bounce animation for coffee */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 5s infinite cubic-bezier(0.4,0,0.6,1);
        }
      `}</style>
    </div>
  );
}
