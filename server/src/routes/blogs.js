import { Router } from 'express';
import { BlogController } from '../controllers/blogController.js';
import { 
  validateBody, 
  validateParams, 
  createBlogSchema, 
  updateBlogSchema, 
  scheduleBlogSchema, 
  blogIdSchema 
} from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const blogController = new BlogController();

// GET /api/blogs - Get all blogs
router.get('/', requireAuth, asyncHandler(blogController.getAllBlogs));

// GET /api/blogs/:id - Get blog by ID
router.get(
  '/:id',
  validateParams(blogIdSchema),
  requireAuth,
  asyncHandler(blogController.getBlogById)
);

// POST /api/blogs/generate - Generate new blog with AI
router.post(
  '/generate',
  requireAuth,
  validateBody(createBlogSchema),
  asyncHandler(blogController.generateBlog)
);

// PATCH /api/blogs/:id - Update blog
router.patch(
  '/:id',
  validateParams(blogIdSchema),
  requireAuth,
  validateBody(updateBlogSchema),
  asyncHandler(blogController.updateBlog)
);

// DELETE /api/blogs/:id - Delete blog
router.delete(
  '/:id',
  requireAuth,
  validateParams(blogIdSchema),
  asyncHandler(blogController.deleteBlog)
);

// POST /api/blogs/:id/publish - Publish blog
router.post(
  '/:id/publish',
  requireAuth,
  validateParams(blogIdSchema),
  asyncHandler(blogController.publishBlog)
);

// POST /api/blogs/:id/schedule - Schedule blog
router.post(
  '/:id/schedule',
  requireAuth,
  validateParams(blogIdSchema),
  validateBody(scheduleBlogSchema),
  asyncHandler(blogController.scheduleBlog)
);

export default router;
