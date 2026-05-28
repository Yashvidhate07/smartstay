import express from "express";
import { addToWishlist, getWishlist } from "../controllers/userController.js";

const router = express.Router();

router.post("/wishlist", addToWishlist);
router.get("/wishlist/:id", getWishlist);

export default router;
