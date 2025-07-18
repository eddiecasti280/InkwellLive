import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { useAuth } from './AuthProvider';
import { Chrome, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export function GoogleOAuthTest() {
  const { signInWithGoogle, user } = useAuth();
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const testGoogleOAuth = async () => {
    setTesting(true);
    setTestResult('idle');
    setErrorMessage('');

    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        console.error('Google OAuth test failed:', error);
        setErrorMessage(error.message);
        setTestResult('error');
      } else {
        setTestResult('success');
      }
    } catch (err) {
      console.error('Unexpected error during Google OAuth test:', err);
      setErrorMessage('An unexpected error occurred');
      setTestResult('error');
    } finally {
      setTesting(false);
    }
  };

  const getStatusIcon = () => {
    switch (testResult) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusText = () => {
    switch (testResult) {
      case 'success':
        return 'OAuth flow initiated successfully';
      case 'error':
        return 'OAuth test failed';
      default:
        return 'Ready to test';
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/90 border-warm-200 dark:bg-amber-900/25 dark:border-amber-700">
      <CardHeader>
        <CardTitle className="text-xl text-warm-900 dark:text-warm-100">
          Google OAuth Test
        </CardTitle>
        <CardDescription className="text-warm-600 dark:text-warm-300">
          Test your Google OAuth configuration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-sm font-medium text-warm-700 dark:text-warm-300">
              {getStatusText()}
            </span>
          </div>
          
          {testResult === 'error' && errorMessage && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-700 dark:text-red-300">
                {errorMessage}
              </p>
            </div>
          )}

          {user && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
              <p className="text-sm text-green-700 dark:text-green-300">
                Currently signed in as: {user.email}
              </p>
              {user.user_metadata?.full_name && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Name: {user.user_metadata.full_name}
                </p>
              )}
            </div>
          )}
        </div>

        <Button
          onClick={testGoogleOAuth}
          disabled={testing}
          className="w-full bg-warm-600 hover:bg-warm-700 text-white dark:bg-warm-500 dark:hover:bg-warm-600"
        >
          <Chrome className="mr-2 h-4 w-4" />
          {testing ? 'Testing...' : 'Test Google OAuth'}
        </Button>

        <div className="text-xs text-warm-500 dark:text-warm-400 space-y-1">
          <p>This will:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Open Google OAuth consent screen</li>
            <li>Redirect to your app after authentication</li>
            <li>Create or sign in a user account</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 