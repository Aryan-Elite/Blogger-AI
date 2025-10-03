import { Router } from 'express';
import blogRoutes from './blogs.js';
import authRoutes from './auth.js';

const router = Router();

// Blog routes
router.use('/blogs', blogRoutes);

// Auth routes
router.use('/auth', authRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

export default router;
