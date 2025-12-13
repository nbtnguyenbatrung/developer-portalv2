// src/lib/db.ts
import mongoose from "mongoose";
import "@/app/model/User";
import "@/app/model/Plan";
import "@/app/model/Application"

// Add type declaration for the global scope
declare global {
  // Changed the type definition to better match mongoose connection
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/developer-portal";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

export default connectDB;
