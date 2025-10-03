import { z } from 'zod';

// Validation schemas
export const createBlogSchema = z.object({
  topic: z.string().min(1, 'Topic is required').max(100, 'Topic too long'),
});

export const updateBlogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long').optional(),
  topic: z.string().min(1, 'Topic is required').max(100, 'Topic too long').optional(),
  content: z.string().min(1, 'Content is required').optional(),
  status: z.enum(['draft', 'published', 'scheduled']).optional(),
  scheduledFor: z.string().datetime().optional().transform((val) => val ? new Date(val) : null),
});

export const scheduleBlogSchema = z.object({
  scheduledFor: z.string().datetime('Invalid date format').transform((val) => new Date(val)),
});

export const blogIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid blog ID format'),
});

// Validation middleware factory
export function validateBody(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Validation error',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
}

// Validation middleware for URL parameters
export function validateParams(schema) {
  return (req, res, next) => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Invalid parameters',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
}

// Validation middleware for query parameters
export function validateQuery(schema) {
  return (req, res, next) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Invalid query parameters',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
}
