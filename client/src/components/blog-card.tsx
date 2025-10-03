import { Blog } from "@/types/blog";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";

interface BlogCardProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
}

export function BlogCard({ blog, onEdit, onDelete }: BlogCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-chart-2 text-white";
      case "scheduled":
        return "bg-chart-3 text-white";
      case "draft":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="hover-elevate transition-all duration-200" data-testid={`card-blog-${blog.id}`}>
      {/* Image Section */}
      {blog.imageUrl ? (
        <div className="w-full h-48 overflow-hidden rounded-t-md">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover"
            data-testid={`img-blog-${blog.id}`}
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-muted flex items-center justify-center rounded-t-md" data-testid={`placeholder-blog-${blog.id}`}>
          <ImageIcon className="w-12 h-12 text-muted-foreground/50" />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight" data-testid={`text-blog-title-${blog.id}`}>
            {blog.title}
          </h3>
          <Badge className={getStatusColor(blog.status)} data-testid={`badge-status-${blog.id}`}>
            {blog.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground mb-3" data-testid={`text-blog-content-${blog.id}`}>
          {blog.content.substring(0, 120)}...
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span data-testid={`text-blog-date-${blog.id}`}>
            {blog.scheduledFor
              ? `Scheduled: ${format(new Date(blog.scheduledFor), "MMM d, yyyy 'at' h:mm a")}`
              : blog.createdAt ? `Created: ${format(new Date(blog.createdAt), "MMM d, yyyy")}` : 'Created recently'}
          </span>
        </div>
      </CardContent>

      <CardFooter className="gap-2 pt-3">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onEdit(blog)}
          data-testid={`button-edit-${blog.id}`}
        >
          <Edit className="w-3 h-3 mr-1" />
          Edit
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onDelete(blog.id)}
          data-testid={`button-delete-${blog.id}`}
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
