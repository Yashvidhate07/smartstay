import User from "../models/User.js";

export const addToWishlist = async (req, res) => {
  const { userId, listingId } = req.body;

  const user = await User.findById(userId);
  if (!user.wishlist.includes(listingId)) {
    user.wishlist.push(listingId);
    await user.save();
  }

  res.json(user);
};

export const getWishlist = async (req, res) => {
  const user = await User.findById(req.params.id).populate("wishlist");
  res.json(user.wishlist);
};
