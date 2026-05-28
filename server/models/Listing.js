import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: String,
    city: String,
    state: String,

    price: Number,
    guests: Number,
    bedrooms: Number,
    bathrooms: Number,

    description: String,
    images: [String],

    featured: {
      type: Boolean,
      default: false
    },

    propertyType: String,
    tags: [String],
    amenities: [String],

    location: {
      type: {
        type: String,
        default: "Point"
      },
      coordinates: [Number]
    }
  },
  { timestamps: true } // ✅ important
);

export default mongoose.model("Listing", listingSchema);
