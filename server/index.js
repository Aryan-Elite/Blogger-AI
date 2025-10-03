import express from 'express';
import { env } from './src/config/env.js';
import { connectDatabase } from './src/config/database.js';
import { corsMiddleware } from './src/middleware/cors.js';
import { errorHandler, notFoundHandler } from './src/middleware/errorHandler.js';
import routes from './src/routes/index.js';
import { startBlogScheduler } from './src/jobs/blogScheduler.js';
import passport from "passport";
import "./src/config/passport.js"; 


const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

// Request logging (development only)
if (env.isDevelopment) {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
    next();
  });
}

app.use(passport.initialize());

// API routes
app.use('/api', routes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    // Connect to database
    await connectDatabase();

    // Start cron jobs 
    startBlogScheduler();


    // Start HTTP server
    const server = app.listen(env.PORT, () => {
      console.log(`🚀 Server running on port ${env.PORT}`);
      console.log(`📱 Environment: ${env.NODE_ENV}`);
      console.log(`🌐 API: http://localhost:${env.PORT}/api`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Process terminated');
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
