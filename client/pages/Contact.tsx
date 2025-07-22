import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50 px-4 py-12">
      <Card className="w-full max-w-lg bg-white/90 border-warm-200 dark:bg-amber-900/25 dark:border-amber-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-warm-900 dark:text-warm-100 text-center">Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-2xl text-warm-700 font-semibold mb-2">Thank you!</div>
              <div className="text-warm-600">Your message has been sent. We'll get back to you soon.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-warm-700 dark:text-warm-300">Name</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email" className="text-warm-700 dark:text-warm-300">Email</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="message" className="text-warm-700 dark:text-warm-300">Message</Label>
                <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5} className="w-full mt-1 border border-warm-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-warm-400 dark:bg-amber-900/25 dark:border-amber-700 dark:text-warm-100" />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <Button type="submit" className="w-full bg-warm-600 hover:bg-warm-700 text-white dark:bg-warm-500 dark:hover:bg-warm-600">Send Message</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 