import Listing from "../models/Listing.js";

// GET ALL
export const getListings = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ⭐ GET FEATURED
export const getFeaturedListings = async (req, res) => {
  try {
    const featured = await Listing.find({ featured: true }).limit(12);
    res.json(featured);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
export const getSingleListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.json(listing);
  } catch (err) {
    res.status(404).json({ message: "Listing not found" });
  }
};

// ADD
export const addListing = async (req, res) => {
  try {
    const newListing = await Listing.create(req.body);
    res.status(201).json(newListing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
export const deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(404).json({ message: "Listing not found" });
  }
};
