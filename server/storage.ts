import { type User, type InsertUser, type Blog, type InsertBlog } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getBlog(id: string): Promise<Blog | undefined>;
  getAllBlogs(): Promise<Blog[]>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  updateBlog(id: string, blog: Partial<InsertBlog>): Promise<Blog | undefined>;
  deleteBlog(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private blogs: Map<string, Blog>;

  constructor() {
    this.users = new Map();
    this.blogs = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBlog(id: string): Promise<Blog | undefined> {
    return this.blogs.get(id);
  }

  async getAllBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values());
  }

  async createBlog(insertBlog: InsertBlog): Promise<Blog> {
    const id = randomUUID();
    const now = new Date();
    const blog: Blog = {
      ...insertBlog,
      id,
      scheduledFor: insertBlog.scheduledFor ?? null,
      createdAt: now,
      updatedAt: now,
    };
    this.blogs.set(id, blog);
    return blog;
  }

  async updateBlog(id: string, updates: Partial<InsertBlog>): Promise<Blog | undefined> {
    const blog = this.blogs.get(id);
    if (!blog) return undefined;
    
    const updatedBlog: Blog = {
      ...blog,
      ...updates,
      updatedAt: new Date(),
    };
    this.blogs.set(id, updatedBlog);
    return updatedBlog;
  }

  async deleteBlog(id: string): Promise<boolean> {
    return this.blogs.delete(id);
  }
}

export const storage = new MemStorage();
