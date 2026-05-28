import { useEffect, useState } from "react";
import { API } from "../services/api";

export default function Bookings() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/bookings").then(res => setData(res.data));
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>My Bookings</h1>

      {data.map(b => (
        <div key={b._id} style={{
          border: "1px solid #ddd",
          borderRadius: 10,
          padding: 15,
          marginBottom: 10
        }}>
          <h3>{b.title}</h3>
          <p>{b.city}</p>
          <p>{b.from} → {b.to}</p>
          <strong>Total: ₹ {b.total}</strong>
        </div>
      ))}
    </div>
  );
}
