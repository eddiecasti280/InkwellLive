import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Feather, Users, BookOpen, Heart, Sparkles } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <Navbar />
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
                <li>Eddie Castillo – Founder & Lead Developer</li>
                <li>Creative Contributors – Our amazing community of writers</li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
      <footer className="py-12 px-6 bg-warm-100 border-t border-warm-200 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4 justify-start">
            <Feather className="h-6 w-6 text-warm-700 animate-pulse" />
            <span className="text-xl font-bold text-warm-800">Inkwell</span>
          </div>
          <p className="text-warm-600 text-left">
            A warm space for writers to grow, create, and connect.
          </p>
          <div className="mt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            {/* Social Media Left */}
            <div className="flex gap-4 justify-center md:justify-start w-full md:w-auto order-2 md:order-1">
              <a href="https://x.com/inkwell" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" className="hover:text-warm-800 text-warm-600">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 3H21.5l-7.19 8.21L23 21h-7.5l-5.2-6.6L4.47 21H0.5l7.61-8.7L1 3h7.5l4.7 6 4.33-6zm-2.13 15.5h2.13l-5.98-7.6-2.13-2.7H7.5l5.98 7.6 2.13 2.7z"/></svg>
              </a>
              <a href="https://facebook.com/inkwell" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-warm-800 text-warm-600">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.408 24 22.674V1.326C24 .592 23.405 0 22.675 0"/></svg>
              </a>
              <a href="https://linkedin.com/company/inkwell" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-warm-800 text-warm-600">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z"/></svg>
              </a>
            </div>
            {/* Contact/About Right */}
            <div className="flex gap-6 justify-center md:justify-end w-full md:w-auto order-1 md:order-2">
              <Link to="/contact" className="text-warm-700 hover:underline">Contact</Link>
              <Link to="/about" className="text-warm-700 hover:underline">About</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
} 