import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!; // Get from .env

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 */
type GlobalWithMongoose = typeof globalThis & {
  mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

let cached = (global as GlobalWithMongoose).mongoose as
  | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
  | undefined;

if (!cached) {
  (global as GlobalWithMongoose).mongoose = { conn: null, promise: null };
  cached = (global as GlobalWithMongoose).mongoose;
}

export default async function connectDB() {
  if (!cached) {
    throw new Error("Cached mongoose connection is not initialized.");
  }

  // ✅ If already connected
  if (cached.conn) {
    console.log("🟢 MongoDB already connected");
    return cached.conn;
  }

  // ✅ If not connected, start connecting
  if (!cached.promise) {
    console.log("🔌 Connecting using URI:", MONGODB_URI);
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected successfully to database:", mongoose.connection.name);
  } catch (error) {
    cached.promise = null;
    console.error(" MongoDB connection failed:", error);
    throw error;
  }

  return cached.conn;
}
