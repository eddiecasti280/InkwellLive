import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Feather, BookOpen } from 'lucide-react';
import { BookCover, BookCoverGrid, BookCoverWithTitle } from '../components/BookCover';
import { AVAILABLE_THEMES } from '../lib/bookCovers';

// Sample stories for demo
const sampleStories = [
  {
    id: '1',
    title: 'The Lantern in the Attic',
    content: 'A mysterious story about an old house and its secrets...',
    theme: 'mystery',
    authorName: 'Storyteller'
  },
  {
    id: '2',
    title: 'Beneath the Willow Tree',
    content: 'A magical adventure about friendship and discovery...',
    theme: 'fantasy',
    authorName: 'Community Writer'
  },
  {
    id: '3',
    title: 'The Clockmaker\'s Promise',
    content: 'A tale of time, love, and the wisdom of age...',
    theme: 'romance',
    authorName: 'Anonymous Writer'
  },
  {
    id: '4',
    title: 'Stars Beyond the Horizon',
    content: 'A science fiction journey through space and time...',
    theme: 'scifi',
    authorName: 'Space Explorer'
  },
  {
    id: '5',
    title: 'The Garden of Memories',
    content: 'A heartwarming story about family and tradition...',
    theme: 'default',
    authorName: 'Memory Keeper'
  }
];

export default function BookCoverDemo() {
  React.useEffect(() => {
    document.title = "Inkwell | Book Covers";
  }, []);

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

      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-warm-900 mb-4">Book Cover Demo</h1>
          <p className="text-warm-700 text-lg">Beautiful book covers generated for your stories</p>
        </div>

        {/* Different Sizes */}
        <Card className="mb-12 bg-white/80 border-warm-200">
          <CardHeader>
            <CardTitle className="text-warm-900">Different Sizes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 justify-center">
              <div className="text-center">
                <BookCover title="Small Story" size="sm" />
                <p className="text-xs text-warm-600 mt-2">Small</p>
              </div>
              <div className="text-center">
                <BookCover title="Medium Story" size="md" />
                <p className="text-xs text-warm-600 mt-2">Medium</p>
              </div>
              <div className="text-center">
                <BookCover title="Large Story" size="lg" />
                <p className="text-xs text-warm-600 mt-2">Large</p>
              </div>
              <div className="text-center">
                <BookCover title="Extra Large Story" size="xl" />
                <p className="text-xs text-warm-600 mt-2">Extra Large</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Different Themes */}
        <Card className="mb-12 bg-white/80 border-warm-200">
          <CardHeader>
            <CardTitle className="text-warm-900">Different Themes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {AVAILABLE_THEMES.map((theme) => (
                <div key={theme} className="text-center">
                  <BookCover 
                    title={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Story`} 
                    theme={theme}
                    size="md"
                  />
                  <p className="text-xs text-warm-600 mt-2 capitalize">{theme}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* With Title Overlay */}
        <Card className="mb-12 bg-white/80 border-warm-200">
          <CardHeader>
            <CardTitle className="text-warm-900">With Title Overlay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {sampleStories.slice(0, 5).map((story) => (
                <div key={story.id} className="text-center">
                  <BookCoverWithTitle
                    title={story.title}
                    authorName={story.authorName}
                    theme={story.theme}
                    size="md"
                  />
                  <p className="text-xs text-warm-600 mt-2">{story.theme}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Book Cover Grid */}
        <Card className="mb-12 bg-white/80 border-warm-200">
          <CardHeader>
            <CardTitle className="text-warm-900">Book Cover Grid</CardTitle>
          </CardHeader>
          <CardContent>
            <BookCoverGrid
              stories={sampleStories}
              size="md"
              showTitles={true}
            />
          </CardContent>
        </Card>

        {/* Sample Stories with Covers */}
        <Card className="mb-12 bg-white/80 border-warm-200">
          <CardHeader>
            <CardTitle className="text-warm-900">Sample Stories with Covers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sampleStories.map((story) => (
                <Card key={story.id} className="bg-white/90 border-warm-200 hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden">
                  <div className="relative">
                    <BookCover
                      title={story.title}
                      content={story.content}
                      theme={story.theme}
                      size="lg"
                      className="w-full h-48 rounded-t-lg"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-warm-600 text-white text-xs">
                        {story.theme}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-warm-900 text-lg mb-2 line-clamp-2">
                      {story.title}
                    </CardTitle>
                    <p className="text-warm-600 text-sm line-clamp-3">
                      {story.content}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-warm-500">
                      <span>by {story.authorName}</span>
                      <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                        <BookOpen className="h-3 w-3 mr-1" />
                        Read
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Back to Dashboard */}
        <div className="text-center">
          <Link to="/dashboard">
            <Button className="bg-warm-600 hover:bg-warm-700 text-white">
              <Feather className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 