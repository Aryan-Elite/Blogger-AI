import { BlogCard } from "../blog-card";
import { Blog } from "@/types/blog";

export default function BlogCardExample() {
  const sampleBlog: Blog = {
    id: "1",
    title: "Getting Started with AI Content Creation",
    topic: "AI Content",
    content: "Artificial Intelligence is revolutionizing content creation in ways we never imagined. From automated blog posts to personalized marketing content, AI tools are helping creators work faster and smarter...",
    status: "published",
    scheduledFor: null,
    createdAt: new Date("2024-12-15"),
    updatedAt: new Date("2024-12-15"),
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-md mx-auto">
        <BlogCard
          blog={sampleBlog}
          onEdit={(blog) => console.log("Edit:", blog)}
          onDelete={(id) => console.log("Delete:", id)}
        />
      </div>
    </div>
  );
}
