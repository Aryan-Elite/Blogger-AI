import mongoose from 'mongoose';

// Blog status enum - matches your frontend types
export const BLOG_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  SCHEDULED: 'scheduled'
};

// MongoDB Schema for Blog
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  topic: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,  // New field to store AI-generated image URL
    default: null
  },
  status: {
    type: String,
    enum: [BLOG_STATUS.DRAFT, BLOG_STATUS.PUBLISHED, BLOG_STATUS.SCHEDULED],
    default: BLOG_STATUS.DRAFT,
    required: true
  },
  scheduledFor: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true, // Automatically manages createdAt and updatedAt
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: { 
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Create and export model
const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
