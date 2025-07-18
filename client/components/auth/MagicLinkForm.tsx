import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useAuth } from './AuthProvider';
import { toast } from '../../hooks/use-toast';
import { Mail, ArrowLeft, Sparkles } from 'lucide-react';

interface MagicLinkFormProps {
  onSwitchToSignIn: () => void;
}

export function MagicLinkForm({ onSwitchToSignIn }: MagicLinkFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { signInWithMagicLink } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    const { error } = await signInWithMagicLink(email);
    
    if (error) {
      toast({
        title: 'Magic Link Failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setSent(true);
      toast({
        title: 'Magic Link Sent!',
        description: 'Check your email for the sign-in link.',
      });
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white/90 border-warm-200 dark:bg-amber-900/25 dark:border-amber-700">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-warm-100 dark:bg-amber-900/50 rounded-full">
              <Sparkles className="h-8 w-8 text-warm-600 dark:text-warm-300" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-warm-900 dark:text-warm-100">
            Check Your Email
          </CardTitle>
          <CardDescription className="text-center text-warm-600 dark:text-warm-300">
            We've sent a magic link to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-4">
            <p className="text-sm text-warm-600 dark:text-warm-400">
              Click the link in your email to sign in instantly. The link will expire in 1 hour.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSent(false);
                setEmail('');
              }}
              className="border-warm-200 text-warm-700 hover:bg-warm-50 dark:border-amber-700 dark:text-warm-300 dark:hover:bg-amber-900/50"
            >
              Send Another Link
            </Button>
            <div className="pt-4">
              <button
                type="button"
                onClick={onSwitchToSignIn}
                className="text-sm text-warm-600 hover:text-warm-800 dark:text-warm-400 dark:hover:text-warm-200 underline"
              >
                ← Back to sign in
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/90 border-warm-200 dark:bg-amber-900/25 dark:border-amber-700">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-warm-100 dark:bg-amber-900/50 rounded-full">
            <Sparkles className="h-8 w-8 text-warm-600 dark:text-warm-300" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center text-warm-900 dark:text-warm-100">
          Magic Link Sign In
        </CardTitle>
        <CardDescription className="text-center text-warm-600 dark:text-warm-300">
          No password needed - just enter your email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-warm-700 dark:text-warm-300">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-warm-400" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-warm-200 focus:border-warm-400 dark:border-amber-700 dark:focus:border-amber-500"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-warm-600 hover:bg-warm-700 text-white dark:bg-warm-500 dark:hover:bg-warm-600"
            disabled={loading}
          >
            {loading ? 'Sending Magic Link...' : 'Send Magic Link'}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="text-sm text-warm-600 hover:text-warm-800 dark:text-warm-400 dark:hover:text-warm-200 underline flex items-center justify-center gap-1"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to sign in
          </button>
        </div>
      </CardContent>
    </Card>
  );
} 