import { useEffect, useState } from "react";
import { API } from "../services/api";

export default function Admin() {
  const [stats, setStats] = useState({
    listings: 0,
    bookings: 0,
    users: 1
  });

  const [form, setForm] = useState({
    title: "",
    city: "",
    price: "",
    image: ""
  });

  useEffect(() => {
    API.get("/listings").then(res => {
      setStats({
        listings: res.data.length,
        bookings: 0,
        users: 1
      });
    });
  }, []);

  const addListing = async () => {
    if (!form.title || !form.city || !form.price || !form.image) {
      alert("Fill all fields");
      return;
    }

    await API.post("/listings", {
      title: form.title,
      city: form.city,
      price: Number(form.price),
      images: [form.image]
    });

    alert("Listing added successfully ✅");

    setForm({ title: "", city: "", price: "", image: "" });
  };

  return (
    <div style={page}>

      <h1 style={heading}>Admin Dashboard</h1>

      {/* ===== STATS ===== */}
      <div style={statsGrid}>
        <StatCard title="Total Listings" value={stats.listings} color="linear-gradient(135deg,#ff416c,#ff4b2b)" />
        <StatCard title="Total Bookings" value={stats.bookings} color="linear-gradient(135deg,#36d1dc,#5b86e5)" />
        <StatCard title="Active Users" value={stats.users} color="linear-gradient(135deg,#11998e,#38ef7d)" />
      </div>

      {/* ===== ADD LISTING ===== */}
      <div style={card}>
        <h2 style={{ marginBottom: 20 }}>➕ Add New Stay</h2>

        <div style={formGrid}>
          <input style={input} placeholder="Stay title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input style={input} placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />

          <input style={input} placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input style={input} placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        </div>

        <button style={addBtn} onClick={addListing}>
          🚀 Add Listing
        </button>
      </div>

      {/* ===== ANALYTICS ===== */}
      <div style={card}>
        <h2>📊 Platform Analytics</h2>
        <p>Total stays: {stats.listings}</p>
        <p>Total bookings: {stats.bookings}</p>
        <p>Active users: {stats.users}</p>
      </div>

    </div>
  );
}

/* ===== COMPONENT ===== */

function StatCard({ title, value, color }) {
  return (
    <div style={{ ...statCard, background: color }}>
      <h3 style={{ opacity: 0.9 }}>{title}</h3>
      <h1 style={{ fontSize: 42 }}>{value}</h1>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: "40px 60px",
  background: "#fafafa",
  minHeight: "100vh"
};

const heading = {
  fontSize: 34,
  fontWeight: 800,
  marginBottom: 30
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 20,
  marginBottom: 40
};

const statCard = {
  color: "white",
  padding: "28px",
  borderRadius: 20,
  boxShadow: "0 12px 30px rgba(0,0,0,0.25)"
};

const card = {
  background: "white",
  padding: 30,
  borderRadius: 22,
  marginBottom: 30,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 16,
  marginBottom: 20
};

const input = {
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid #ddd",
  fontSize: 15,
  outline: "none"
};

const addBtn = {
  background: "linear-gradient(135deg,#ff385c,#ff2f92)",
  border: "none",
  padding: "14px 26px",
  borderRadius: 999,
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(255,56,92,0.4)"
};
