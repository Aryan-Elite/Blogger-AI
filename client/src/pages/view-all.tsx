import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/mockApi";
import { Blog } from "@/types/blog";
import { BlogCard } from "@/components/blog-card";
import { EditBlogDialog } from "@/components/edit-blog-dialog";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

type FilterStatus = "all" | "published" | "scheduled" | "draft";

export default function ViewAllPage() {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>("all");
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

  const filteredBlogs =
    filter === "all" ? blogs : blogs.filter((blog) => blog.status === filter);

  const filterButtons: { label: string; value: FilterStatus }[] = [
    { label: "All", value: "all" },
    { label: "Published", value: "published" },
    { label: "Scheduled", value: "scheduled" },
    { label: "Draft", value: "draft" },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>

        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24" />
          ))}
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
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">View All Blogs</h1>
        <p className="text-muted-foreground">Browse and manage all your blog posts</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {filterButtons.map((btn) => (
          <Button
            key={btn.value}
            variant={filter === btn.value ? "default" : "outline"}
            onClick={() => setFilter(btn.value)}
            data-testid={`button-filter-${btn.value}`}
          >
            {btn.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onEdit={setEditingBlog}
            onDelete={handleDeleteBlog}
          />
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground" data-testid="text-no-blogs">
            No blogs found with status: {filter}
          </p>
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
