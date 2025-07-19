import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Feather, Loader2 } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { supabase } from "../lib/supabaseClient";
import { toast } from "../hooks/use-toast";
import { useAuth } from "../components/auth/AuthProvider";

export default function EditWriting() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Inkwell | Edit Writing";
  }, []);

  useEffect(() => {
    async function fetchWriting() {
      if (!user) {
        setError("Authentication required");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('writings')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) {
        setError(error.message);
        setLoading(false);
      } else if (!data) {
        setError("Writing not found or you don't have permission to edit it");
        setLoading(false);
      } else {
        setTitle(data.title || "");
        setContent(data.content || "");
        setLoading(false);
      }
    }

    if (id) fetchWriting();
  }, [id, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your writing.",
        variant: "destructive",
      });
      return;
    }
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing Fields",
        description: "Please enter both a title and content.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from("writings")
      .update({ 
        title, 
        content
      })
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: "Error Updating Writing",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Writing Updated!",
        description: "Your writing has been updated successfully.",
      });
      navigate(`/stories/${id}`);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50">
        <Card className="p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-warm-600 mx-auto mb-4" />
          <CardTitle className="mb-4">Loading...</CardTitle>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50">
        <Card className="p-8 text-center">
          <CardTitle className="mb-4">Error</CardTitle>
          <div className="mb-4 text-warm-600">{error}</div>
          <Link to="/dashboard" className="text-warm-600 hover:underline">Back to Dashboard</Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-warm-200 bg-white/50 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2">
          <Feather className="h-8 w-8 text-warm-700" />
          <span className="text-2xl font-bold text-warm-800">Inkwell</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" className="border-warm-300 text-warm-700 hover:bg-warm-100">Dashboard</Button>
          </Link>
        </div>
      </nav>
      
      <div className="flex justify-center items-start px-4 py-12 min-h-[calc(100vh-88px)]">
        <Card className="w-full max-w-2xl bg-white/90 border-warm-200 dark:bg-amber-900/25 dark:border-amber-700 rounded-xl shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl text-warm-900 dark:text-warm-100 mb-2">Edit Writing</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title" className="text-warm-800">Title</Label>
                <Input
                  id="title"
                  placeholder="Title"
                  className="bg-white/70 border-warm-200 focus:border-warm-400"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  disabled={saving}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="content" className="text-warm-800">Content</Label>
                <div className="min-h-[200px]">
                  <ReactQuill
                    id="content"
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    className="min-h-[200px]"
                    readOnly={saving}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-warm-600 hover:bg-warm-700 text-white flex-1 rounded-md px-8 py-3"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Link to={`/stories/${id}`}>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-warm-300 text-warm-700 hover:bg-warm-100 px-8 py-3"
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 