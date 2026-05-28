import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Admin from "./pages/Admin";
import Recommended from "./pages/Recommended";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/recommended" element={<Recommended />} />

        {/* Optional: 404 Page */}
        {/* <Route path="*" element={<h1 style={{ padding: 40 }}>Page not found</h1>} /> */}
      </Routes>
    </>
  );
}
