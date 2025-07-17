import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Feather } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function NewWriting() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

      <div className="max-w-3xl mx-auto p-6">
        <Card className="bg-white/90 border-warm-200 dark:bg-amber-900/25 dark:border-amber-700">
          <CardHeader>
            <CardTitle className="text-3xl text-warm-900 dark:text-warm-100 mb-2">New Writing</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Title"
              className="mb-4 bg-white/70 border-warm-200 focus:border-warm-400"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div className="mb-4">
              <ReactQuill theme="snow" value={content} onChange={setContent} />
            </div>
            <Button className="bg-warm-600 hover:bg-warm-700 text-white">Save</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 