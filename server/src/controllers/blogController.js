import Blog, { BLOG_STATUS } from '../models/Blog.js';
import { AIService } from '../services/aiService.js';
import { CustomError } from '../middleware/errorHandler.js';

export class BlogController {
  constructor() {
    this.aiService = new AIService();
  }

  // GET /api/blogs
  getAllBlogs = async (req, res) => {
    try {
      const { status } = req.query;


      const query = status ? { status } : {};
      const blogs = await Blog.find(query).sort({ createdAt: -1 });

      res.json(blogs);
    } catch (error) {
      throw error;
    }
  };

  // GET /api/blogs/:id
  getBlogById = async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id);

      if (!blog) {
        throw new CustomError('Blog not found', 404);
      }

      res.json(blog);
    } catch (error) {
      throw error;
    }
  };

  // POST /api/blogs/generate
  generateBlog = async (req, res) => {
    try {
      const { topic } = req.body;

      // Generate AI content
      const { title, content, imageUrl } = await this.aiService.generateBlogWithImage(topic);

      // Create blog with AI-generated content and image URL
      const blog = await Blog.create({ topic, title, content, imageUrl });

      res.status(201).json(blog);
    } catch (error) {
      throw error;
    }
  };

  // PATCH /api/blogs/:id
  updateBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedBlog = await Blog.findByIdAndUpdate(id, updates, { new: true });

      if (!updatedBlog) {
        throw new CustomError('Blog not found', 404);
      }

      res.json(updatedBlog);
    } catch (error) {
      throw error;
    }
  };

  // DELETE /api/blogs/:id
  deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBlog = await Blog.findByIdAndDelete(id);

      if (!deletedBlog) {
        throw new CustomError('Blog not found', 404);
      }

      res.json({ success: true });
    } catch (error) {
      throw error;
    }
  };

  // POST /api/blogs/:id/publish
  publishBlog = async (req, res) => {
    try {
      const { id } = req.params;

      const publishedBlog = await Blog.findByIdAndUpdate(
        id,
        { status: BLOG_STATUS.PUBLISHED, scheduledFor: null },
        { new: true }
      );

      if (!publishedBlog) {
        throw new CustomError('Blog not found', 404);
      }

      res.json(publishedBlog);
    } catch (error) {
      throw error;
    }
  };

  // POST /api/blogs/:id/schedule
  scheduleBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const { scheduledFor } = req.body;

      if (!scheduledFor || new Date(scheduledFor) <= new Date()) {
        throw new CustomError('Scheduled date must be in the future', 400);
      }

      const scheduledBlog = await Blog.findByIdAndUpdate(
        id,
        { status: BLOG_STATUS.SCHEDULED, scheduledFor },
        { new: true }
      );

      if (!scheduledBlog) {
        throw new CustomError('Blog not found', 404);
      }

      res.json(scheduledBlog);
    } catch (error) {
      throw error;
    }
  };
}
