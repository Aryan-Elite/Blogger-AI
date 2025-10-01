import { useState } from "react";
import { Blog } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ScheduleBlogDialogProps {
  blogs: Blog[];
  open: boolean;
  onClose: () => void;
  onSchedule: (blogId: string, scheduledFor: Date) => void;
}

export function ScheduleBlogDialog({ blogs, open, onClose, onSchedule }: ScheduleBlogDialogProps) {
  const [selectedBlogId, setSelectedBlogId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const draftBlogs = blogs.filter((b) => b.status === "draft");

  const handleSchedule = () => {
    if (selectedBlogId && date && time) {
      const scheduledFor = new Date(`${date}T${time}`);
      onSchedule(selectedBlogId, scheduledFor);
      setSelectedBlogId("");
      setDate("");
      setTime("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Blog</DialogTitle>
          <DialogDescription>
            Choose a blog and set when it should be published.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="blog-select">Select Blog</Label>
            <Select value={selectedBlogId} onValueChange={setSelectedBlogId}>
              <SelectTrigger id="blog-select" data-testid="select-blog">
                <SelectValue placeholder="Choose a blog to schedule" />
              </SelectTrigger>
              <SelectContent>
                {draftBlogs.map((blog) => (
                  <SelectItem key={blog.id} value={blog.id}>
                    {blog.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="schedule-date">Date</Label>
            <Input
              id="schedule-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              data-testid="input-schedule-date"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="schedule-time">Time</Label>
            <Input
              id="schedule-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              data-testid="input-schedule-time"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} data-testid="button-cancel-schedule">
            Cancel
          </Button>
          <Button
            onClick={handleSchedule}
            disabled={!selectedBlogId || !date || !time}
            data-testid="button-confirm-schedule"
          >
            Schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
