import { Router } from 'express';
import passport from 'passport';
import { asyncHandler } from '../middleware/errorHandler.js';
import { AuthController } from '../controllers/AuthController.js';
import { env } from '../config/env.js';

const router = Router();

const authController = new AuthController();

function getFrontendUrl(req) {
  const configured = env.FRONTEND_URL;
  if (configured) return configured;
  const proto = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${proto}://${host}`;
}

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
      const frontendBase = getFrontendUrl(req);
      if (err) {
        return res.redirect(`${frontendBase}/login-failed?error=server_error`);
      }
      if (!user) {
        const message = info && info.message ? String(info.message).toLowerCase() : '';
        const isUnauthorizedDomain = message.includes('only') && message.includes('forecloseai');
        if (isUnauthorizedDomain) {
          return res.redirect(`${frontendBase}/login-failed`);
        }
        return res.redirect(`${frontendBase}/login-failed?error=auth_failed`);
      }
      req.user = user;
      return authController.googleCallback(req, res, frontendBase);
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