import { Mail } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

export default function Inbox() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50 flex flex-col items-center justify-center">
      <Card className="bg-white/90 border-warm-200 shadow-lg p-8 flex flex-col items-center">
        <Mail className="h-16 w-16 text-sage-500 mb-4" />
        <h1 className="text-2xl font-bold text-warm-900 mb-2">Inbox</h1>
        <p className="text-warm-600 text-lg mb-2">Your inbox is empty.</p>
        <p className="text-warm-400 text-sm">Direct messages will appear here when you receive them.</p>
      </Card>
    </div>
  );
} 