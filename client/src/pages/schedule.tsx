import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { ScheduleBlogDialog } from "@/components/schedule-blog-dialog";
import { api } from "@/lib/mockApi";
import { Blog } from "@/types/blog";
import { useToast } from "@/hooks/use-toast";
import { BlogCard } from "@/components/blog-card";
import { EditBlogDialog } from "@/components/edit-blog-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { addMinutes } from "date-fns";

export default function SchedulePage() {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      const data = await api.getAllBlogs();
      setBlogs(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSchedule = async (blogId: string, scheduledFor: Date) => {
    // Optimistic schedule: update the one blog to scheduled
    setBlogs((prev) => prev.map((b) => b.id === blogId ? { ...b, status: "scheduled", scheduledFor: scheduledFor.toISOString() } as Blog : b));
    try {
      await api.scheduleBlog(blogId, scheduledFor);
    } catch (error) {
      // Re-fetch to revert if failed
      await loadBlogs();
      toast({ title: "Schedule failed", description: error instanceof Error ? error.message : "Could not schedule blog.", variant: "destructive" });
      return;
    }
    toast({
      title: "Blog scheduled",
      description: "Your blog has been scheduled for publishing.",
    });
  };

  const handleEditBlog = async (id: string, updates: Partial<Blog>) => {
    // Optimistic update
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
    try {
      await api.updateBlog(id, updates);
    } catch (error) {
      await loadBlogs();
      toast({ title: "Update failed", description: error instanceof Error ? error.message : "Could not save changes.", variant: "destructive" });
      return;
    }
    toast({
      title: "Blog updated",
      description: "Your changes have been saved.",
    });
  };

  const handleDeleteBlog = async (id: string) => {
    // Optimistic remove
    const prev = blogs;
    setBlogs((cur) => cur.filter((b) => b.id !== id));
    try {
      await api.deleteBlog(id);
    } catch (error) {
      setBlogs(prev);
      toast({ title: "Delete failed", description: error instanceof Error ? error.message : "Could not delete blog.", variant: "destructive" });
      return;
    }
    toast({
      title: "Blog deleted",
      description: "The blog has been removed.",
    });
  };

  const scheduledBlogs = blogs.filter((b) => b.status === "scheduled");

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-44" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Schedule</h1>
          <p className="text-muted-foreground">Schedule your blogs for publishing</p>
        </div>
        <Button onClick={() => setScheduleDialogOpen(true)} data-testid="button-open-schedule">
          <CalendarIcon className="w-4 h-4 mr-2" />
          Schedule Blog
        </Button>
      </div>

      {scheduledBlogs.length === 0 ? (
        <div className="text-center py-12">
          <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No scheduled blogs</h3>
          <p className="text-muted-foreground mb-4">
            Schedule your draft blogs to publish them automatically.
          </p>
          <Button onClick={() => setScheduleDialogOpen(true)} data-testid="button-schedule-first">
            Schedule Your First Blog
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {scheduledBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onEdit={setEditingBlog}
              onDelete={handleDeleteBlog}
            />
          ))}
        </div>
      )}

      <ScheduleBlogDialog
        blogs={blogs}
        open={scheduleDialogOpen}
        onClose={() => setScheduleDialogOpen(false)}
        onSchedule={handleSchedule}
      />

      <EditBlogDialog
        blog={editingBlog}
        open={!!editingBlog}
        onClose={() => setEditingBlog(null)}
        onSave={handleEditBlog}
      />
    </div>
  );
}
