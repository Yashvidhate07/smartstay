import { useEffect, useState } from "react";
import { API } from "../services/api";
import ListingCard from "../components/ListingCard";

export default function Recommended() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    API.get(`/recommend/${user._id}`).then(res => setData(res.data));
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>✨ Recommended for you</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
        gap: 20,
        marginTop: 20
      }}>
        {data.map(item => (
          <ListingCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
