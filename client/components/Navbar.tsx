import { Link } from 'react-router-dom';
import { Feather } from 'lucide-react';

export function Navbar({ children }: { children?: React.ReactNode }) {
  return (
    <nav className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 group">
          <Feather className="h-8 w-8 text-warm-700" />
          <span className="text-2xl font-bold text-warm-800">Inkwell</span>
        </Link>
        <div className="flex items-center gap-4">{children}</div>
      </div>
    </nav>
  );
} 