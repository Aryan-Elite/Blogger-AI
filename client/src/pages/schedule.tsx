import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { ScheduleBlogDialog } from "@/components/schedule-blog-dialog";
import { mockApi } from "@/lib/mockApi";
import { Blog } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { BlogCard } from "@/components/blog-card";
import { EditBlogDialog } from "@/components/edit-blog-dialog";

export default function SchedulePage() {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    const data = await mockApi.getAllBlogs();
    setBlogs(data);
  };

  const handleSchedule = async (blogId: string, scheduledFor: Date) => {
    await mockApi.scheduleBlog(blogId, scheduledFor);
    await loadBlogs();
    toast({
      title: "Blog scheduled",
      description: "Your blog has been scheduled for publishing.",
    });
  };

  const handleEditBlog = async (id: string, updates: Partial<Blog>) => {
    await mockApi.updateBlog(id, updates);
    await loadBlogs();
    toast({
      title: "Blog updated",
      description: "Your changes have been saved.",
    });
  };

  const handleDeleteBlog = async (id: string) => {
    await mockApi.deleteBlog(id);
    await loadBlogs();
    toast({
      title: "Blog deleted",
      description: "The blog has been removed.",
    });
  };

  const scheduledBlogs = blogs.filter((b) => b.status === "scheduled");

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
