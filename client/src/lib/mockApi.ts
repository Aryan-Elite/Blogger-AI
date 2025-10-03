import { Blog } from "@/types/blog";
import { auth } from "@/lib/utils";

const BASE_URL = "http://localhost:3000/api/blogs"; // backend base URL

export const api = {
  // Auth APIs
  login: async (email: string, password: string) => {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || 'Login failed');
    return data as { token: string; user: { id: string; email: string; name: string } };
  },

  // Google handled by redirect; keep placeholder for compatibility if needed
  loginWithGoogle: async () => ({ success: true }),

  logout: async () => {
    await new Promise((r) => setTimeout(r, 150));
    return { success: true };
  },

  // Blog APIs
  getAllBlogs: async (): Promise<Blog[]> => {
    const token = auth.getToken();
    const res = await fetch(BASE_URL, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    if (!res.ok) throw new Error("Failed to fetch blogs");
    return res.json();
  },

  getBlog: async (id: string): Promise<Blog> => {
    const token = auth.getToken();
    const res = await fetch(`${BASE_URL}/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: "Failed to fetch blog" }));
      throw new Error(error.message || "Failed to fetch blog");
    }
    return res.json();
  },

  createBlog: async (topic: string): Promise<Blog> => {
    const token = auth.getToken();
    const res = await fetch(`${BASE_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ topic }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: "Failed to create blog" }));
      throw new Error(error.message || "Failed to create blog");
    }
    return res.json();
  },

  updateBlog: async (id: string, updates: Partial<Blog>): Promise<Blog> => {
    const token = auth.getToken();
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: "Failed to update blog" }));
      throw new Error(error.message || "Failed to update blog");
    }
    return res.json();
  },

  deleteBlog: async (id: string): Promise<{ success: boolean }> => {
    const token = auth.getToken();
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: "Failed to delete blog" }));
      throw new Error(error.message || "Failed to delete blog");
    }
    return res.json();
  },

  publishBlog: async (id: string): Promise<Blog> => {
    const token = auth.getToken();
    const res = await fetch(`${BASE_URL}/${id}/publish`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: "Failed to publish blog" }));
      throw new Error(error.message || "Failed to publish blog");
    }
    return res.json();
  },

  scheduleBlog: async (id: string, scheduledFor: Date): Promise<Blog> => {
    const token = auth.getToken();
    const res = await fetch(`${BASE_URL}/${id}/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ scheduledFor }),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: "Failed to schedule blog" }));
      throw new Error(error.message || "Failed to schedule blog");
    }
    return res.json();
  },
};
