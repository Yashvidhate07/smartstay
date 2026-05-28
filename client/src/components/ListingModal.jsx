import { useEffect, useState } from "react";

export default function ListingModal({ item, onClose, onWishlist, onRecommend }) {
  if (!item) return null;

  const images = item.images?.length
    ? item.images
    : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"];

  const [index, setIndex] = useState(0);

  /* ===== Voice command listeners ===== */
  useEffect(() => {
    const addWish = () => onWishlist(item);
    const close = () => onClose();
    const next = () => setIndex((i) => (i + 1) % images.length);
    const book = () => alert("🏨 Booking confirmed for " + item.title);

    window.addEventListener("voice-add-wishlist", addWish);
    window.addEventListener("voice-close-popup", close);
    window.addEventListener("voice-next-image", next);
    window.addEventListener("voice-book-property", book);

    return () => {
      window.removeEventListener("voice-add-wishlist", addWish);
      window.removeEventListener("voice-close-popup", close);
      window.removeEventListener("voice-next-image", next);
      window.removeEventListener("voice-book-property", book);
    };
  }, [item, images.length, onClose, onWishlist]);

  return (
    <div style={overlay}>
      <div style={modal}>

        {/* ===== IMAGE SLIDER ===== */}
        <div style={imgBox}>
          <img
            src={images[index]}
            alt={item.title}
            style={image}
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200";
            }}
          />

          {images.length > 1 && (
            <>
              <button style={leftBtn} onClick={() =>
                setIndex((index - 1 + images.length) % images.length)
              }>‹</button>

              <button style={rightBtn} onClick={() =>
                setIndex((index + 1) % images.length)
              }>›</button>
            </>
          )}
        </div>

        {/* ===== DETAILS ===== */}
        <div style={{ padding: 22 }}>
          <h2 style={{ marginBottom: 6 }}>{item.title}</h2>
          <p style={{ color: "#777", marginBottom: 10 }}>{item.city}</p>
          <h3 style={{ marginBottom: 18 }}>
            ₹ {Number(item.price).toLocaleString()} + GST
          </h3>

          <div style={btnRow}>
            <button style={wishBtn} onClick={() => onWishlist(item)}>
              ❤️ Add to Wishlist
            </button>

            <button style={recBtn} onClick={() => onRecommend(item)}>
              ⭐ Recommend
            </button>

            <button style={bookBtn} onClick={() => alert("🏨 Booking confirmed!")}>
              🏨 Book this property
            </button>

            <button style={closeBtn} onClick={onClose}>
              ✖ Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000
};

const modal = {
  background: "white",
  borderRadius: 22,
  width: "92%",
  maxWidth: 760,
  overflow: "hidden",
  boxShadow: "0 25px 70px rgba(0,0,0,0.45)"
};

const imgBox = {
  position: "relative",
  width: "100%",
  height: 380,
  overflow: "hidden"
};

const image = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block"
};

const leftBtn = {
  position: "absolute",
  top: "50%",
  left: 12,
  transform: "translateY(-50%)",
  fontSize: 30,
  background: "rgba(0,0,0,0.5)",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: 42,
  height: 42,
  cursor: "pointer"
};

const rightBtn = {
  ...leftBtn,
  left: "auto",
  right: 12
};

const btnRow = {
  display: "flex",
  gap: 14,
  marginTop: 20,
  flexWrap: "wrap"
};

const wishBtn = {
  background: "#ff385c",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: 999,
  cursor: "pointer",
  fontWeight: 600
};

const recBtn = {
  background: "#222",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: 999,
  cursor: "pointer",
  fontWeight: 600
};

const bookBtn = {
  background: "#008489",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: 999,
  cursor: "pointer",
  fontWeight: 600
};

const closeBtn = {
  background: "#eee",
  border: "none",
  padding: "12px 20px",
  borderRadius: 999,
  cursor: "pointer",
  fontWeight: 600
};
