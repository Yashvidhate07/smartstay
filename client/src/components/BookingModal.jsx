import { useState } from "react";
import { API } from "../services/api";

export default function BookingModal({ stay, close }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [total, setTotal] = useState(0);
  const [days, setDays] = useState(0);

  const calculate = (f, t) => {
    if (!f || !t) return;

    const d1 = new Date(f);
    const d2 = new Date(t);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));

    if (diff > 0) {
      setDays(diff);
      setTotal(diff * stay.price);
    }
  };

  const bookNow = async () => {
    if (!from || !to || days <= 0) {
      alert("Please select valid dates");
      return;
    }

    await API.post("/bookings", {
      title: stay.title,
      city: stay.city,
      price: stay.price,
      from,
      to,
      days,
      total
    });

    alert("🎉 Booking Confirmed!");
    close();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        {/* HEADER */}
        <div style={header}>
          <h2>{stay.title}</h2>
          <button onClick={close} style={xBtn}>✕</button>
        </div>

        <p style={{ color: "#717171" }}>{stay.city}</p>

        <img
          src={stay.image || "https://source.unsplash.com/800x600/?airbnb,home"}
          alt={stay.title}
          style={image}
        />

        {/* DATE PICKERS */}
        <div style={dateBox}>
          <div>
            <label>Check-in</label>
            <input
              type="date"
              onChange={(e) => {
                setFrom(e.target.value);
                calculate(e.target.value, to);
              }}
            />
          </div>

          <div>
            <label>Check-out</label>
            <input
              type="date"
              onChange={(e) => {
                setTo(e.target.value);
                calculate(from, e.target.value);
              }}
            />
          </div>
        </div>

        {/* PRICE DETAILS */}
        <div style={priceBox}>
          <div style={row}>
            <span>₹ {stay.price} × {days || 0} nights</span>
            <span>₹ {stay.price * (days || 0)}</span>
          </div>

          <div style={row}>
            <span>Service fee</span>
            <span>₹ {days ? 299 : 0}</span>
          </div>

          <hr />

          <div style={{ ...row, fontWeight: 600 }}>
            <span>Total</span>
            <span>₹ {days ? total + 299 : 0}</span>
          </div>
        </div>

        {/* VOICE-READY BUTTON */}
        <button
          id="confirmBooking"
          className="btn-primary"
          onClick={bookNow}
        >
          Reserve
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

const modal = {
  background: "white",
  padding: 22,
  borderRadius: 18,
  width: 380,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const xBtn = {
  border: "none",
  background: "#f7f7f7",
  borderRadius: "50%",
  width: 32,
  height: 32,
  cursor: "pointer"
};

const image = {
  width: "100%",
  borderRadius: 14,
  margin: "10px 0",
  objectFit: "cover"
};

const dateBox = {
  display: "flex",
  gap: 10,
  marginTop: 10
};

const priceBox = {
  border: "1px solid #eee",
  borderRadius: 14,
  padding: 12,
  marginTop: 10
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 6
};
