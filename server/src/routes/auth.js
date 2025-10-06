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
  (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user, info) => {
      if (err) {
        return res.redirect(`${process.env.FRONTEND_URL}/login-failed?error=server_error`);
      }
      if (!user) {
        const message = info && info.message ? String(info.message).toLowerCase() : '';
        const isUnauthorizedDomain = message.includes('only') && message.includes('forecloseai');
        const errorParam = isUnauthorizedDomain ? 'unauthorized' : 'auth_failed';
        return res.redirect(`${process.env.FRONTEND_URL}/login-failed?error=${errorParam}`);
      }
      req.user = user;
      return authController.googleCallback(req, res);
    })(req, res, next);
  }
);

// Traditional email/password login with forecloseai.com domain restriction
router.post('/login', asyncHandler((req, res) => authController.login(req, res)));

// Optional: Logout route
router.post('/logout', asyncHandler((req, res) => authController.logout(req, res)));

// Optional: Get current user
router.get('/me', asyncHandler((req, res) => authController.me(req, res)));

export default router;