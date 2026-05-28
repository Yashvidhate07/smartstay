import mongoose from "mongoose";
import dotenv from "dotenv";
import Listing from "./models/Listing.js";

dotenv.config();

/* ================== LISTINGS DATA ================== */

const data = [
  {
    title: "Luxury Villa in Pune",
    city: "Pune",
    price: 25000000,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800"
    ]
  },
  {
    title: "Cozy Apartment in Mumbai",
    city: "Mumbai",
    price: 18000000,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02d7?q=80&w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800"
    ]
  },
  {
    title: "Beachfront Villa in Alibaug",
    city: "Alibaug",
    price: 30000000,
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3b7b6b?q=80&w=800",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800"
    ]
  },

  {
    title: "Modern Villa in Lonavala",
    city: "Lonavala",
    price: 28000000,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800"
    ]
  },

  {
    title: "Hillview Villa in Mahabaleshwar",
    city: "Mahabaleshwar",
    price: 29000000,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800",
      "https://images.unsplash.com/photo-1572120360610-d971b9b78825?q=80&w=800",
      "https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=800"
    ]
  }
];

/* ================== SEED FUNCTION ================== */

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Listing.deleteMany();
    await Listing.insertMany(data);

    console.log("✅ Listings inserted successfully with multiple images!");
    process.exit();
  } catch (error) {
    console.log("❌ Seeding error:", error);
    process.exit(1);
  }
}

seedDB();
