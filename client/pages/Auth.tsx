import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInForm } from '../components/auth/SignInForm';
import { SignUpForm } from '../components/auth/SignUpForm';
import { MagicLinkForm } from '../components/auth/MagicLinkForm';
import { Feather } from 'lucide-react';

type AuthMode = 'signin' | 'signup' | 'magiclink';

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('signin');

  useEffect(() => {
    document.title = "Inkwell | Sign In";
  }, []);

  const renderForm = () => {
    switch (mode) {
      case 'signin':
        return (
          <SignInForm
            onSwitchToSignUp={() => setMode('signup')}
            onSwitchToMagicLink={() => setMode('magiclink')}
          />
        );
      case 'signup':
        return <SignUpForm onSwitchToSignIn={() => setMode('signin')} />;
      case 'magiclink':
        return <MagicLinkForm onSwitchToSignIn={() => setMode('signin')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50 flex flex-col">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <Feather className="h-8 w-8 text-warm-700" />
          <span className="text-2xl font-bold text-warm-800">Inkwell</span>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderForm()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8">
        <p className="text-sm text-warm-600 dark:text-warm-400">
          By continuing, you agree to our{' '}
          <Link to="/terms" className="underline hover:text-warm-800 dark:hover:text-warm-200">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="underline hover:text-warm-800 dark:hover:text-warm-200">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
} 