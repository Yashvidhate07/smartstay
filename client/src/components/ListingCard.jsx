export default function ListingCard({ item, open }) {
  if (!item) return null;

  return (
    <div
      className="listing-card"
      onClick={() => open?.(item)}
      title="Click to view details"
      style={card}
    >
      {/* IMAGE */}
      <div style={imgBox}>
        <img
          src={item.images?.[0] || "https://picsum.photos/600/400"}
          alt={item.title || "Stay image"}
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://picsum.photos/600/400";
          }}
          style={img}
        />

        {/* PRICE BADGE */}
        <div style={priceBadge}>
          ₹ {Number(item.price || 0).toLocaleString()}
        </div>
      </div>

      {/* CONTENT */}
      <div style={content}>
        <h3 style={title}>{item.title || "Beautiful Stay"}</h3>
        <p style={city}>{item.city || "Maharashtra"}</p>

        {item.propertyType && (
          <p style={type}>{item.propertyType}</p>
        )}

        <span style={tapText}>Tap to view details</span>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const card = {
  borderRadius: 18,
  background: "#fff",
  boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
  cursor: "pointer",
  transition: "0.3s ease",
  overflow: "hidden"
};

const imgBox = {
  width: "100%",
  height: 230,
  overflow: "hidden",
  borderTopLeftRadius: 18,
  borderTopRightRadius: 18,
  position: "relative"
};

const img = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "0.5s ease"
};

const priceBadge = {
  position: "absolute",
  bottom: 10,
  right: 10,
  background: "#FF385C",
  color: "white",
  padding: "7px 14px",
  borderRadius: "999px",
  fontWeight: 600,
  fontSize: 13,
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
};

const content = {
  padding: 14
};

const title = {
  margin: "6px 0",
  fontSize: 16,
  fontWeight: 600
};

const city = {
  color: "#717171",
  margin: "4px 0",
  fontSize: 14
};

const type = {
  fontSize: 12,
  color: "#444",
  marginBottom: 4,
  fontWeight: 500
};

const tapText = {
  fontSize: 12,
  color: "#999"
};
