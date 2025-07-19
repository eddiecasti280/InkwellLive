import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageTransitionWrapper } from "./components/PageTransitionWrapper";
import { AuthProvider } from "./components/auth/AuthProvider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import Stories from "./pages/Stories";
import ReadingView from "./pages/ReadingView";
import NewWriting from "./pages/NewWriting";
import EditWriting from "./pages/EditWriting";
import Profile from "./pages/Profile";
import BookCoverDemo from "./pages/BookCoverDemo";
import ReactQuill from "react-quill";
import Settings from "./pages/Settings";
import Inbox from "./pages/Inbox";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <PageTransitionWrapper>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/stories/:id" element={<ReadingView />} />
              <Route path="/new-writing" element={<NewWriting />} />
              <Route path="/edit/:id" element={<EditWriting />} />
              <Route path="/book-cover-demo" element={<BookCoverDemo />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/inbox" element={<Inbox />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </PageTransitionWrapper>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
