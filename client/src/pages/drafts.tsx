import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/mockApi";
import { Blog } from "@/types/blog";
import { BlogCard } from "@/components/blog-card";
import { EditBlogDialog } from "@/components/edit-blog-dialog";
import { useToast } from "@/hooks/use-toast";
import { FilePlus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DraftsPage() {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      const data = await api.getAllBlogs();
      setBlogs(data.filter((b) => b.status === "draft"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBlog = async (id: string, updates: Partial<Blog>) => {
    await api.updateBlog(id, updates);
    await loadBlogs();
    toast({
      title: "Blog updated",
      description: "Your changes have been saved.",
    });
  };

  const handleDeleteBlog = async (id: string) => {
    await api.deleteBlog(id);
    await loadBlogs();
    toast({
      title: "Blog deleted",
      description: "The blog has been removed.",
    });
  };

  const handlePublish = async (id: string) => {
    await api.publishBlog(id);
    await loadBlogs();
    toast({
      title: "Blog published",
      description: "Your blog is now live!",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-24 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Drafts</h1>
        <p className="text-muted-foreground">
          Manage your draft blogs before publishing
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <FilePlus className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No drafts</h3>
          <p className="text-muted-foreground">
            All your draft blogs will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog.id} className="space-y-2">
              <BlogCard
                blog={blog}
                onEdit={setEditingBlog}
                onDelete={handleDeleteBlog}
              />
              <Button
                className="w-full"
                onClick={() => handlePublish(blog.id)}
                data-testid={`button-publish-${blog.id}`}
              >
                Publish Now
              </Button>
            </div>
          ))}
        </div>
      )}

      <EditBlogDialog
        blog={editingBlog}
        open={!!editingBlog}
        onClose={() => setEditingBlog(null)}
        onSave={handleEditBlog}
      />
    </div>
  );
}
