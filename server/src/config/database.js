import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export async function connectDatabase() {
  try {
    // Use the full MongoDB URL from .env
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit if cannot connect
  }
}

export async function disconnectDatabase() {
  try {
    await mongoose.disconnect();
    console.log("🛑 MongoDB Disconnected");
  } catch (error) {
    console.error("❌ Error disconnecting MongoDB:", error.message);
  }
}
