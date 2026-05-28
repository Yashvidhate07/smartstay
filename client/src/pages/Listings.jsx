import { useEffect, useState } from "react";
import { API } from "../services/api";
import ListingCard from "../components/ListingCard";
import BookingModal from "../components/BookingModal";
import VoiceButton from "../components/VoiceButton";
import { getUserLocation } from "../automation/locationService";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [autoBook, setAutoBook] = useState(false);
  const [loading, setLoading] = useState(true);

  /* =========================
     📦 FETCH LISTINGS
  ========================== */
  useEffect(() => {
    const loadListings = async () => {
      try {
        const res = await API.get("/listings");
        console.log("🔥 FRONTEND LISTINGS:", res.data); // debug
        setListings(res.data || []);
      } catch (err) {
        console.error("❌ Failed to fetch listings:", err);
        alert("Server not responding. Check backend.");
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, []);

  /* =========================
     🤖 AUTO BOOK
  ========================== */
  useEffect(() => {
    if (autoBook && listings.length > 0) {
      setSelected(listings[0]);
      setAutoBook(false);
    }
  }, [autoBook, listings]);

  /* =========================
     🌍 LOCATION SEARCH
  ========================== */
  const detectLocation = async () => {
    try {
      const city = await getUserLocation();
      alert("Detected city: " + city);
      setSearch(city || "");
    } catch (err) {
      alert("Location detection failed");
    }
  };

  /* =========================
     🔎 FILTER
  ========================== */
  const filtered = listings.filter(l =>
    l?.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 30 }}>
      <h1>🏠 Available stays</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <VoiceButton setSearch={setSearch} setAutoBook={setAutoBook} />
        <button onClick={detectLocation}>📍 Find stays near me</button>
      </div>

      {loading && <p>Loading stays...</p>}

      {!loading && filtered.length === 0 && (
        <p>No stays found. Try another city.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
          gap: 20,
          marginTop: 20
        }}
      >
        {filtered.map(item => (
          <ListingCard
            key={item._id}
            item={item}
            open={setSelected}
          />
        ))}
      </div>

      {selected && (
        <BookingModal
          stay={selected}
          close={() => setSelected(null)}
        />
      )}
    </div>
  );
}
