import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Feather, Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    document.title = "Inkwell | Sign In";
  }, []);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          setError(error.message);
          setStatus('error');
          return;
        }

        if (data.session) {
          // Successfully authenticated
          setStatus('success');
          
          // Redirect to dashboard after a brief delay
          setTimeout(() => {
            navigate('/dashboard', { replace: true });
          }, 2000);
        } else {
          // No session found, redirect to auth page
          navigate('/auth', { replace: true });
        }
      } catch (err) {
        console.error('Unexpected error during auth callback:', err);
        setError('An unexpected error occurred');
        setStatus('error');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 text-warm-600 animate-spin mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-warm-900 dark:text-warm-100">
                Completing Sign In...
              </h3>
              <p className="text-warm-600 dark:text-warm-400">
                Please wait while we complete your authentication.
              </p>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-warm-900 dark:text-warm-100">
                Sign In Successful!
              </h3>
              <p className="text-warm-600 dark:text-warm-400">
                Redirecting you to your dashboard...
              </p>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="text-center space-y-4">
            <XCircle className="h-12 w-12 text-red-600 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-warm-900 dark:text-warm-100">
                Sign In Failed
              </h3>
              <p className="text-warm-600 dark:text-warm-400 mb-4">
                {error || 'There was an error completing your sign in.'}
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => navigate('/auth')}
                  className="bg-warm-600 hover:bg-warm-700 text-white"
                >
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="border-warm-200 text-warm-700 hover:bg-warm-50"
                >
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white/90 border-warm-200 dark:bg-amber-900/25 dark:border-amber-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Feather className="h-12 w-12 text-warm-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-warm-900 dark:text-warm-100">
            Inkwell
          </CardTitle>
          <CardDescription className="text-warm-600 dark:text-warm-300">
            Authentication
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
} 