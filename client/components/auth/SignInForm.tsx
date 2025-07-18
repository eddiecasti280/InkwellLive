import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { useAuth } from './AuthProvider';
import { toast } from '../../hooks/use-toast';
import { Mail, Lock, Eye, EyeOff, Chrome } from 'lucide-react';

interface SignInFormProps {
  onSwitchToSignUp: () => void;
  onSwitchToMagicLink: () => void;
}

export function SignInForm({ onSwitchToSignUp, onSwitchToMagicLink }: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Missing Information',
        description: 'Please enter both email and password.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: 'Sign In Failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Welcome Back!',
        description: 'You have successfully signed in.',
      });
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    
    if (error) {
      toast({
        title: 'Google Sign In Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/90 border-warm-200 dark:bg-amber-900/25 dark:border-amber-700">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-warm-900 dark:text-warm-100">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center text-warm-600 dark:text-warm-300">
          Sign in to continue your writing journey
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
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-warm-700 dark:text-warm-300">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-warm-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 border-warm-200 focus:border-warm-400 dark:border-amber-700 dark:focus:border-amber-500"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-warm-400" />
                ) : (
                  <Eye className="h-4 w-4 text-warm-400" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-warm-600 hover:bg-warm-700 text-white dark:bg-warm-500 dark:hover:bg-warm-600"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-amber-900/25 px-2 text-warm-500 dark:text-warm-400">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full border-warm-200 text-warm-700 hover:bg-warm-50 dark:border-amber-700 dark:text-warm-300 dark:hover:bg-amber-900/50"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>

        <div className="text-center space-y-2">
          <button
            type="button"
            onClick={onSwitchToMagicLink}
            className="text-sm text-warm-600 hover:text-warm-800 dark:text-warm-400 dark:hover:text-warm-200 underline"
          >
            Sign in with magic link
          </button>
          
          <div className="text-sm text-warm-600 dark:text-warm-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="text-warm-700 hover:text-warm-900 dark:text-warm-300 dark:hover:text-warm-100 underline font-medium"
            >
              Sign up
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 