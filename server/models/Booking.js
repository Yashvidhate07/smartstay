import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  title: String,
  city: String,
  price: Number,
  from: String,
  to: String,
  days: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
