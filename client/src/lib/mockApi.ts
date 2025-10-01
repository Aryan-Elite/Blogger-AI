import { Blog } from "@shared/schema";

// TODO: Replace with actual API calls to backend

// Mock blog data for development
const mockBlogs: Blog[] = [
  {
    id: "1",
    title: "Getting Started with AI Content Creation",
    topic: "AI Content",
    content: "Artificial Intelligence is revolutionizing content creation...",
    status: "published",
    scheduledFor: null,
    createdAt: new Date("2024-12-15"),
    updatedAt: new Date("2024-12-15"),
  },
  {
    id: "2",
    title: "10 Tips for Better Blog Writing",
    topic: "Writing Tips",
    content: "Writing compelling blog posts requires skill and practice...",
    status: "published",
    scheduledFor: null,
    createdAt: new Date("2024-12-20"),
    updatedAt: new Date("2024-12-20"),
  },
  {
    id: "3",
    title: "How to A/B Test Your AI Agents",
    topic: "AI Testing",
    content: "A/B testing is crucial for optimizing AI performance...",
    status: "scheduled",
    scheduledFor: new Date("2025-01-15T10:00:00"),
    createdAt: new Date("2024-12-28"),
    updatedAt: new Date("2024-12-28"),
  },
  {
    id: "4",
    title: "The Future of Content Marketing",
    topic: "Marketing Trends",
    content: "Content marketing is evolving rapidly with new technologies...",
    status: "draft",
    scheduledFor: null,
    createdAt: new Date("2024-12-30"),
    updatedAt: new Date("2024-12-30"),
  },
  {
    id: "5",
    title: "SEO Best Practices for 2025",
    topic: "SEO",
    content: "Search engine optimization continues to be essential...",
    status: "draft",
    scheduledFor: null,
    createdAt: new Date("2025-01-02"),
    updatedAt: new Date("2025-01-02"),
  },
];

let blogs = [...mockBlogs];

// Mock API functions - Replace these with actual fetch calls to your backend
export const mockApi = {
  // Auth APIs
  login: async (email: string, password: string) => {
    // TODO: Replace with actual API call: POST /api/auth/login
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, user: { id: "1", email } };
  },

  loginWithGoogle: async () => {
    // TODO: Replace with actual Google OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, user: { id: "1", email: "user@gmail.com" } };
  },

  logout: async () => {
    // TODO: Replace with actual API call: POST /api/auth/logout
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true };
  },

  // Blog APIs
  getAllBlogs: async (): Promise<Blog[]> => {
    // TODO: Replace with actual API call: GET /api/blogs
    await new Promise((resolve) => setTimeout(resolve, 500));
    return blogs;
  },

  getBlog: async (id: string): Promise<Blog | undefined> => {
    // TODO: Replace with actual API call: GET /api/blogs/:id
    await new Promise((resolve) => setTimeout(resolve, 300));
    return blogs.find((b) => b.id === id);
  },

  createBlog: async (topic: string): Promise<Blog> => {
    // TODO: Replace with actual API call: POST /api/blogs/generate
    // This should trigger AI generation on the backend
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    const newBlog: Blog = {
      id: Date.now().toString(),
      title: `Blog about ${topic}`,
      topic,
      content: `This is AI-generated content about ${topic}...`,
      status: "draft",
      scheduledFor: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    blogs.push(newBlog);
    return newBlog;
  },

  updateBlog: async (id: string, updates: Partial<Blog>): Promise<Blog | undefined> => {
    // TODO: Replace with actual API call: PATCH /api/blogs/:id
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    const index = blogs.findIndex((b) => b.id === id);
    if (index === -1) return undefined;
    
    blogs[index] = { ...blogs[index], ...updates, updatedAt: new Date() };
    return blogs[index];
  },

  deleteBlog: async (id: string): Promise<boolean> => {
    // TODO: Replace with actual API call: DELETE /api/blogs/:id
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const index = blogs.findIndex((b) => b.id === id);
    if (index === -1) return false;
    
    blogs.splice(index, 1);
    return true;
  },

  publishBlog: async (id: string): Promise<Blog | undefined> => {
    // TODO: Replace with actual API call: POST /api/blogs/:id/publish
    return mockApi.updateBlog(id, { status: "published" });
  },

  scheduleBlog: async (id: string, scheduledFor: Date): Promise<Blog | undefined> => {
    // TODO: Replace with actual API call: POST /api/blogs/:id/schedule
    return mockApi.updateBlog(id, { status: "scheduled", scheduledFor });
  },
};

/* Example JSON structures for backend API endpoints:

POST /api/auth/login
Request: { "email": "user@example.com", "password": "password123" }
Response: { "success": true, "user": { "id": "user-id", "email": "user@example.com" } }

POST /api/blogs/generate
Request: { "topic": "AI Content Creation" }
Response: {
  "id": "blog-id",
  "title": "Getting Started with AI Content Creation",
  "topic": "AI Content Creation",
  "content": "Full blog content here...",
  "status": "draft",
  "createdAt": "2025-01-01T00:00:00Z"
}

GET /api/blogs
Response: [
  {
    "id": "blog-id",
    "title": "Blog Title",
    "topic": "Topic Name",
    "content": "Content...",
    "status": "published",
    "scheduledFor": null,
    "createdAt": "2025-01-01T00:00:00Z"
  }
]

PATCH /api/blogs/:id
Request: { "title": "Updated Title", "content": "Updated content..." }
Response: { "id": "blog-id", ... updated fields ... }

POST /api/blogs/:id/schedule
Request: { "scheduledFor": "2025-01-15T10:00:00Z" }
Response: { "id": "blog-id", "status": "scheduled", "scheduledFor": "2025-01-15T10:00:00Z" }

*/
