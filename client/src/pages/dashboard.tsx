import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateBlogDialog } from "@/components/create-blog-dialog";
import { BlogGenerationLoader } from "@/components/blog-generation-loader";
import { api } from '@/lib/mockApi';
import { Blog } from "@/types/blog";
import { FileText, Calendar, Edit, TrendingUp } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { EditBlogDialog } from "@/components/edit-blog-dialog";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
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

  const handleCreateBlog = async (topic: string) => {
    setIsGenerating(true);
    try {
      await api.createBlog(topic);
      await loadBlogs();
      toast({
        title: "Blog created!",
        description: "Your blog has been generated successfully.",
      });
    } finally {
      setIsGenerating(false);
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

  const stats = {
    total: blogs.length,
    published: blogs.filter((b) => b.status === "published").length,
    scheduled: blogs.filter((b) => b.status === "scheduled").length,
    drafts: blogs.filter((b) => b.status === "draft").length,
  };

  const recentBlogs = blogs.slice(0, 3);

  if (isGenerating) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <BlogGenerationLoader />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-40 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-6 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Overview</h1>
          <p className="text-muted-foreground">Welcome to your blog dashboard</p>
        </div>
        <CreateBlogDialog onCreateBlog={handleCreateBlog} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-total">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2" data-testid="stat-published">{stats.published}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3" data-testid="stat-scheduled">{stats.scheduled}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-drafts">{stats.drafts}</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Blogs</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onEdit={setEditingBlog}
              onDelete={handleDeleteBlog}
            />
          ))}
        </div>
      </div>

      <EditBlogDialog
        blog={editingBlog}
        open={!!editingBlog}
        onClose={() => setEditingBlog(null)}
        onSave={handleEditBlog}
      />
    </div>
  );
}
