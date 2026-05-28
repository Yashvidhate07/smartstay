import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Listing from "../models/Listing.js";

export const getRecommendations = async (req, res) => {
  const { userId } = req.params;

  let preferredCities = [];
  let preferredPrice = 0;

  // 1. From bookings
  const bookings = await Booking.find();
  if (bookings.length > 0) {
    preferredCities = bookings.map(b => b.city.toLowerCase());
    preferredPrice =
      bookings.reduce((a, b) => a + b.price, 0) / bookings.length;
  }

  // 2. From wishlist
  const user = await User.findById(userId).populate("wishlist");
  if (user?.wishlist?.length) {
    preferredCities.push(...user.wishlist.map(w => w.city.toLowerCase()));
  }

  // 3. Recommend similar stays
  let recommendations = await Listing.find({
    city: { $in: preferredCities }
  }).limit(6);

  // fallback if nothing found
  if (recommendations.length === 0) {
    recommendations = await Listing.find().limit(6);
  }

  res.json(recommendations);
};
