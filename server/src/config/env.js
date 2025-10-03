import { z } from 'zod';

// Environment variable validation schema
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  
  // Database
  DATABASE_URL: z.string().optional(),
  
  // AI Service (for future use)
  OPENAI_API_KEY: z.string().optional(),
  
  // CORS
  FRONTEND_URL: z.string().default('http://localhost:5173'),
});

// Validate and export environment variables
export const env = envSchema.parse(process.env);

// Helper to check if we're in development
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
