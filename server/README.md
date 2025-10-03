# Server Directory Structure

## Overview
This directory contains the backend API server for the Blogger AI application.

## Directory Structure

### `/src` - Source Code
- **`controllers/`** - Request handlers that process HTTP requests and responses
- **`middleware/`** - Express middleware for authentication, validation, error handling
- **`models/`** - Database models and schemas (if using ORM)
- **`routes/`** - API route definitions and route handlers
- **`services/`** - Business logic layer (AI generation, data processing)
- **`utils/`** - Helper functions and utilities
- **`config/`** - Configuration files (database, environment variables)

### `/tests` - Test Files
- Unit tests, integration tests, and test utilities

## Key Files to Create

### Entry Point
- `server/index.js` - Main server entry point

### Configuration
- `server/src/config/database.js` - Database connection configuration
- `server/src/config/env.js` - Environment variable validation

### Routes
- `server/src/routes/blogs.js` - Blog-related API routes
- `server/src/routes/auth.js` - Authentication routes (future)

### Controllers
- `server/src/controllers/blogController.js` - Blog CRUD operations
- `server/src/controllers/aiController.js` - AI generation logic

### Services
- `server/src/services/aiService.js` - AI integration service

### Middleware
- `server/src/middleware/validation.js` - Request validation
- `server/src/middleware/errorHandler.js` - Error handling
- `server/src/middleware/cors.js` - CORS configuration

### Models
- `server/src/models/Blog.js` - Blog data model
- `server/src/models/User.js` - User data model (future)

## API Endpoints to Implement

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blogs/generate` - Generate new blog
- `PATCH /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `POST /api/blogs/:id/publish` - Publish blog
- `POST /api/blogs/:id/schedule` - Schedule blog

### Authentication (Future)
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables in `.env`
3. Configure database connection
4. Start development server: `npm run dev`
5. Start production server: `npm start`
