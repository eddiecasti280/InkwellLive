import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { useAuth } from './AuthProvider';
import { toast } from '../../hooks/use-toast';
import { Mail, Lock, Eye, EyeOff, Chrome, User, PenTool } from 'lucide-react';

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

export function SignUpForm({ onSwitchToSignIn }: SignUpFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [penName, setPenName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword || !penName) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Password Too Short',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, {
      pen_name: penName,
      full_name: penName,
    });
    
    if (error) {
      toast({
        title: 'Sign Up Failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Account Created!',
        description: 'Please check your email to verify your account.',
      });
    }
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    
    if (error) {
      toast({
        title: 'Google Sign Up Failed',
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
          Join Inkwell
        </CardTitle>
        <CardDescription className="text-center text-warm-600 dark:text-warm-300">
          Start your writing journey today
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="penName" className="text-warm-700 dark:text-warm-300">
              Pen Name
            </Label>
            <div className="relative">
              <PenTool className="absolute left-3 top-3 h-4 w-4 text-warm-400" />
              <Input
                id="penName"
                type="text"
                placeholder="Your writer name"
                value={penName}
                onChange={(e) => setPenName(e.target.value)}
                className="pl-10 border-warm-200 focus:border-warm-400 dark:border-amber-700 dark:focus:border-amber-500"
                required
              />
            </div>
          </div>

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
                placeholder="Create a password"
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-warm-700 dark:text-warm-300">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-warm-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10 border-warm-200 focus:border-warm-400 dark:border-amber-700 dark:focus:border-amber-500"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
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
            {loading ? 'Creating Account...' : 'Create Account'}
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
          onClick={handleGoogleSignUp}
          disabled={loading}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>

        <div className="text-center">
          <div className="text-sm text-warm-600 dark:text-warm-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="text-warm-700 hover:text-warm-900 dark:text-warm-300 dark:hover:text-warm-100 underline font-medium"
            >
              Sign in
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 