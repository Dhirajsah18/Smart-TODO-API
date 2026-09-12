import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smarttodo";

  try {
    // Try connecting to primary URI with a 3s timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ MongoDB connected successfully to: ${uri}`);
  } catch (error) {
    console.warn(`⚠️ Could not connect to primary MongoDB (${error.message}).`);
    console.log(`🚀 Starting in-memory MongoDB development server...`);

    try {
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      const mongod = await MongoMemoryServer.create();
      const memUri = mongod.getUri();
      await mongoose.connect(memUri);
      console.log(`✅ Connected to in-memory MongoDB at: ${memUri}`);
    } catch (memError) {
      console.error("❌ Failed to start MongoDB:", memError.message);
    }
  }
};

export default connectDB;
