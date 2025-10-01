import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

interface CreateBlogDialogProps {
  onCreateBlog: (topic: string) => void;
}

export function CreateBlogDialog({ onCreateBlog }: CreateBlogDialogProps) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");

  const handleSubmit = () => {
    if (topic.trim()) {
      onCreateBlog(topic);
      setTopic("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="button-create-blog">
          <PlusCircle className="w-4 h-4 mr-2" />
          Create New Blog
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Blog</DialogTitle>
          <DialogDescription>
            Enter a topic and let AI generate a professional blog post for you.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Blog Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., AI in Content Marketing"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              data-testid="input-blog-topic"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} data-testid="button-cancel">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!topic.trim()} data-testid="button-generate">
            Generate Blog
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
