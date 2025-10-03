import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      // Required only if not using Google login
      required: function () {
        return !this.googleId;
      },
      minlength: 6,
    },
    googleId: {
      type: String,
      default: null, // Will exist only for Google OAuth users
    },
    isVerified: {
      type: Boolean,
      default: false, // email verified or not
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hash password before saving (only if modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Create and export model
const User = mongoose.model("User", userSchema);
export default User;
