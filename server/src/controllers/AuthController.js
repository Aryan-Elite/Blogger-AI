import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export class AuthController {
  async login(req, res) {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const allowedDomain = 'forecloseai.com';
    const domain = String(email).split('@')[1]?.toLowerCase();
    if (domain !== allowedDomain) {
      return res.status(403).json({ message: `Only ${allowedDomain} accounts can login` });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'Account not found. Please use your company account or contact admin.' });
    }
    // Allow manual login even if Google is linked, as long as a password exists
    if (user.googleId && !user.password) {
      return res.status(400).json({ message: 'Use Google login for this account' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  }

  async googleCallback(req, res) {
    try {
      if (!req.user) {
        return res.redirect(`${process.env.FRONTEND_URL}/login-failed`);
      }
      const token = jwt.sign(
        { id: req.user._id, email: req.user.email, name: req.user.name },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
    } catch (error) {
      console.error('❌ Auth callback error:', error);
      return res.redirect(`${process.env.FRONTEND_URL}/login-failed`);
    }
  }

  async logout(req, res) {
    return res.json({ message: 'Logged out successfully' });
  }

  async me(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ error: 'No token provided' });
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (!user) return res.status(404).json({ error: 'User not found' });
      return res.json(user);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
}


