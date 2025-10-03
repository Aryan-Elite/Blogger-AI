export type BlogStatus = "draft" | "published" | "scheduled";

export interface Blog {
  id: string;
  title: string;
  content: string;
  status: "draft" | "published" | "scheduled";
  createdAt: string;
  scheduledFor?: string;
  imageUrl?: string; // ✅ new field for AI-generated image
}



