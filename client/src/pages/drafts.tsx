import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { mockApi } from "@/lib/mockApi";
import { Blog } from "@shared/schema";
import { BlogCard } from "@/components/blog-card";
import { EditBlogDialog } from "@/components/edit-blog-dialog";
import { useToast } from "@/hooks/use-toast";
import { FilePlus } from "lucide-react";

export default function DraftsPage() {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    const data = await mockApi.getAllBlogs();
    setBlogs(data.filter((b) => b.status === "draft"));
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

  const handlePublish = async (id: string) => {
    await mockApi.publishBlog(id);
    await loadBlogs();
    toast({
      title: "Blog published",
      description: "Your blog is now live!",
    });
  };

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
