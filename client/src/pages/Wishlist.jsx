import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  const removeItem = (id) => {
    const updated = wishlist.filter(item => item._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Your Wishlist ❤️</h1>

      {wishlist.length === 0 && (
        <p style={{ marginTop: 20, color: "#777" }}>
          No properties added to wishlist yet.
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
          gap: 20,
          marginTop: 20
        }}
      >
        {wishlist.map((item) => (
          <div key={item._id} style={{ position: "relative" }}>
            <ListingCard item={item} />

            <button
              onClick={() => removeItem(item._id)}
              style={removeBtn}
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const removeBtn = {
  position: "absolute",
  top: 12,
  right: 12,
  background: "#ff385c",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: 34,
  height: 34,
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 6px 16px rgba(0,0,0,0.25)"
};
