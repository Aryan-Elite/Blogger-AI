import { Router } from 'express';
import passport from 'passport';
import { asyncHandler } from '../middleware/errorHandler.js';
import { AuthController } from '../controllers/AuthController.js';

const router = Router();

const authController = new AuthController();

// Start Google login
router.get(
  '/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
  })
);

// Callback route
router.get(
  '/google/callback',
  passport.authenticate('google', { 
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login-failed?error=auth_failed`
  }),
  asyncHandler((req, res) => authController.googleCallback(req, res))
);

// Traditional email/password login with forecloseai.com domain restriction
router.post('/login', asyncHandler((req, res) => authController.login(req, res)));

// Optional: Logout route
router.post('/logout', asyncHandler((req, res) => authController.logout(req, res)));

// Optional: Get current user
router.get('/me', asyncHandler((req, res) => authController.me(req, res)));

export default router;