import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Feather, Users, BookOpen, Heart, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50 px-4 py-12 flex justify-center">
      <Card className="w-full max-w-3xl bg-white/90 border-warm-200 dark:bg-amber-900/25 dark:border-amber-700">
        <CardHeader className="flex flex-col items-center">
          <Feather className="h-10 w-10 text-warm-700 mb-2 animate-pulse" />
          <CardTitle className="text-4xl font-bold text-warm-900 dark:text-warm-100 mb-2">About Inkwell</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-warm-800 mb-2">Our Mission</h2>
            <p className="text-warm-700 text-lg">
              Inkwell is dedicated to providing a warm, welcoming space for writers of all backgrounds to create, share, and grow. We believe every story matters and every writer deserves a supportive community.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-warm-800 mb-2">Features</h2>
            <ul className="list-disc pl-6 text-warm-700 space-y-2">
              <li className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-warm-600" />Organize and store your writings in a beautiful, distraction-free environment.</li>
              <li className="flex items-center gap-2"><Users className="h-5 w-5 text-sage-600" />Connect with fellow writers, follow your favorites, and build your audience.</li>
              <li className="flex items-center gap-2"><Heart className="h-5 w-5 text-pink-500" />Receive feedback, encouragement, and support from a caring community.</li>
              <li className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-yellow-500" />Enjoy a cozy, modern design that inspires creativity and focus.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-warm-800 mb-2">Our Values</h2>
            <p className="text-warm-700 text-lg">
              We value inclusivity, kindness, and creativity. Inkwell is a safe space for writers to express themselves, learn from each other, and celebrate the art of storytelling.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-warm-800 mb-2">Meet the Team</h2>
            <p className="text-warm-700 text-lg mb-2">Inkwell is built by a passionate team of writers, designers, and developers who love stories as much as you do.</p>
            <ul className="list-disc pl-6 text-warm-700 space-y-1">
              <li>Eddie Casti – Founder & Lead Developer</li>
              <li>Creative Contributors – Our amazing community of writers</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
} 