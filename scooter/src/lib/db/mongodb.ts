import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!; // Get from .env

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 */
// Extend global type to include mongoose property
type GlobalWithMongoose = typeof globalThis & {
  mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
};

let cached = (global as GlobalWithMongoose).mongoose as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;

if (!cached) {
  (global as GlobalWithMongoose).mongoose = { conn: null, promise: null };
  cached = (global as GlobalWithMongoose).mongoose;
}

export async function connectDB() {
  if (!cached) {
    throw new Error("Cached mongoose connection is not initialized.");
  }
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "ecommerce", // change to your DB name
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
