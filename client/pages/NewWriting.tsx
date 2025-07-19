import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Feather, X } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { supabase } from "../lib/supabaseClient";
import { toast } from "../hooks/use-toast";
import { useAuth } from "../components/auth/AuthProvider";

export default function NewWriting() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Inkwell | New Writing";
  }, []);

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
    setLoading(true);
    const { error } = await supabase.from("writings").insert([{ 
      title, 
      content,
      user_id: user.id 
    }]);
    if (error) {
      toast({
        title: "Error Saving Writing",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Writing Saved!",
        description: "Your writing has been saved successfully.",
      });
      setTitle("");
      setContent("");
      setTags([]);
    }
    setLoading(false);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

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
            <CardTitle className="text-3xl text-warm-900 dark:text-warm-100 mb-2">New Writing</CardTitle>
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
                  disabled={loading}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="tags" className="text-warm-800">Tags (optional)</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleAddTag(e)}
                    className="flex-1 bg-white/70 border-warm-200 focus:border-warm-400"
                    disabled={loading || tags.length >= 5}
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    disabled={loading || !tagInput.trim() || tags.length >= 5}
                    variant="outline"
                    className="border-warm-300 text-warm-700 hover:bg-warm-100"
                  >
                    Add
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-warm-300 text-warm-600">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-red-600"
                          disabled={loading}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="text-xs text-warm-500">Add up to 5 tags to help others discover your story</div>
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
                    readOnly={loading}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="bg-warm-600 hover:bg-warm-700 text-white w-full rounded-md px-8 py-3 mt-2"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 