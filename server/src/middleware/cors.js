import { env } from '../config/env.js';

// CORS configuration
export function corsMiddleware(req, res, next) {
  // Allow frontend origin
  const origin = req.headers.origin;
  const allowedOrigins = [
    env.FRONTEND_URL,
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Alternative dev port
  ];

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Allow credentials
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Allow methods
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );

  // Allow headers
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  next();
}

// Alternative: Use cors package
/*
import cors from 'cors';
import { env } from '../config/env.js';

export const corsMiddleware = cors({
  origin: [
    env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
});
*/
