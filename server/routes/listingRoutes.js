import express from "express";
import {
  getListings,
  getFeaturedListings,
  getSingleListing,
  addListing,
  deleteListing
} from "../controllers/listingController.js";

const router = express.Router();

/* =========================
   📦 LISTINGS ROUTES
========================= */

// Get all listings
router.get("/", getListings);

// ⭐ Get featured listings
router.get("/featured", getFeaturedListings);

// Get single listing by ID
router.get("/:id", getSingleListing);

// Add new listing (admin)
router.post("/", addListing);

// Delete listing
router.delete("/:id", deleteListing);

export default router;
