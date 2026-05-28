import mongoose from "mongoose";
import dotenv from "dotenv";
import Listing from "../models/Listing.js";

dotenv.config();

/* ================= PROPERTY TYPES ================= */

const properties = [
  "1 BHK Flat",
  "2 BHK Apartment",
  "3 BHK Apartment",
  "Luxury Villa",
  "Premium Bungalow",
  "Hill View Cottage",
  "Beach House",
  "Farmhouse",
  "Resort Stay",
  "Studio Apartment",
  "Open Plot"
];

const cities = [
  "Pune","Mumbai","Nagpur","Nashik","Aurangabad","Kolhapur",
  "Satara","Solapur","Amravati","Nanded","Latur","Jalgaon",
  "Ratnagiri","Sindhudurg","Alibaug","Mahabaleshwar","Lonavala",
  "Karad","Beed","Akola","Palghar","Raigad","Chandrapur"
];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ================= IMAGE GENERATOR (NO UNSPLASH) ================= */

const getImages = (i) => {
  return [
    `https://picsum.photos/seed/maha_${i}_1/900/700`,
    `https://picsum.photos/seed/maha_${i}_2/900/700`,
    `https://picsum.photos/seed/maha_${i}_3/900/700`,
    `https://picsum.photos/seed/maha_${i}_4/900/700`
  ];
};

/* ================= LISTING GENERATOR ================= */

const generateListings = (count = 100) => {
  const listings = [];

  for (let i = 0; i < count; i++) {
    const property = random(properties);
    const city = random(cities);

    listings.push({
      title: `${property} in ${city}`,
      city,
      state: "Maharashtra",

      price: Math.floor(Math.random() * 9000) + 1500,
      guests: Math.floor(Math.random() * 6) + 1,
      bedrooms: Math.floor(Math.random() * 4) + 1,
      bathrooms: Math.floor(Math.random() * 3) + 1,

      featured: i % 6 === 0,

      description: `Beautiful ${property.toLowerCase()} located in ${city}, Maharashtra. Ideal for family stays, vacations and weekend getaways.`,

      images: getImages(i),

      location: {
        type: "Point",
        coordinates: [
          72 + Math.random() * 6,
          18 + Math.random() * 5
        ]
      }
    });
  }

  return listings;
};

/* ================= SEED DATABASE ================= */

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📦 MongoDB connected");

    await Listing.deleteMany();
    console.log("🗑 Old listings removed");

    const data = generateListings(100);
    await Listing.insertMany(data);

    console.log("✅ 100 Maharashtra listings added");
    console.log("🖼️ All listings now have DIFFERENT images");

    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
