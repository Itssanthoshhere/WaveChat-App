import mongoose from "mongoose";
import { User } from "../models/User";

const SEED_USERS = [
  {
    clerkId: "seed_user_1",
    name: "Aarav Sharma",
    email: "aarav@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    clerkId: "seed_user_2",
    name: "Ishita Verma",
    email: "ishita@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    clerkId: "seed_user_3",
    name: "Rohan Mehta",
    email: "rohan@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    clerkId: "seed_user_4",
    name: "Ananya Gupta",
    email: "ananya@example.com",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    clerkId: "seed_user_5",
    name: "Vivaan Kapoor",
    email: "vivaan@example.com",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    clerkId: "seed_user_6",
    name: "Diya Nair",
    email: "diya@example.com",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    clerkId: "seed_user_7",
    name: "Arjun Reddy",
    email: "arjun@example.com",
    avatar: "https://i.pravatar.cc/150?img=16",
  },
  {
    clerkId: "seed_user_8",
    name: "Kavya Iyer",
    email: "kavya@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    clerkId: "seed_user_9",
    name: "Aditya Singh",
    email: "aditya@example.com",
    avatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    clerkId: "seed_user_10",
    name: "Sneha Patil",
    email: "sneha@example.com",
    avatar: "https://i.pravatar.cc/150?img=14",
  },
];

async function seed() {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/chat-app";
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    // Insert seed users
    const users = await User.insertMany(SEED_USERS);
    console.log(`🌱 Seeded ${users.length} users:`);
    users.forEach((user) => {
      console.log(`   - ${user.name} (${user.email})`);
    });

    await mongoose.disconnect();
    console.log("✅ Done!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
}

seed();
