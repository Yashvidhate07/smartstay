import { useEffect, useState } from "react";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

import { API } from "../services/api";

import ListingCard from "../components/ListingCard";

import ListingModal from "../components/ListingModal";

export default function Home() {

  const [allListings, setAllListings] =
    useState([]);

  const [listings, setListings] =
    useState([]);

  const [selected, setSelected] =
    useState(null);

  const [activeCategory, setActiveCategory] =
    useState("All");

  /* 🔍 SEARCH STATES */

  const [location, setLocation] =
    useState("");

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  /* ===================================================
     🚀 FETCH LISTINGS
  =================================================== */

  useEffect(() => {

    API.get("/listings")

      .then((res) => {

        setAllListings(
          res.data || []
        );

        setListings(
          res.data || []
        );
      })

      .catch((err) =>

        console.error(
          "Listings fetch error:",
          err
        )
      );

  }, []);

  /* ===================================================
     ❤️ WISHLIST
  =================================================== */

  const addToWishlist = (item) => {

    const old =
      JSON.parse(
        localStorage.getItem(
          "wishlist"
        )
      ) || [];

    if (
      old.find(
        (i) => i._id === item._id
      )
    ) {

      alert(
        "Already in wishlist ❤️"
      );

      return;
    }

    localStorage.setItem(

      "wishlist",

      JSON.stringify([
        ...old,
        item,
      ])
    );

    alert(
      "Added to wishlist ❤️"
    );
  };

  /* ===================================================
     ⭐ RECOMMEND
  =================================================== */

  const recommend = (item) => {

    alert(
      "You recommended: " +
      item.title
    );
  };

  /* ===================================================
     🔍 SEARCH FUNCTION
  =================================================== */

  const handleSearch = () => {

    let filtered =
      allListings;

    if (
      location.trim() !== ""
    ) {

      filtered =
        filtered.filter((item) =>

          item.city
            ?.toLowerCase()
            .includes(
              location.toLowerCase()
            ) ||

          item.title
            ?.toLowerCase()
            .includes(
              location.toLowerCase()
            )
        );
    }

    setActiveCategory("All");

    setListings(filtered);
  };

  /* ===================================================
     🏷 CATEGORY FILTER
  =================================================== */

  const filterCategory = (cat) => {

    setActiveCategory(cat);

    if (
      cat === "All" ||
      cat === "Trending"
    ) {

      setListings(allListings);

      return;
    }

    const filtered =
      allListings.filter((item) =>

        item.title
          ?.toLowerCase()
          .includes(
            cat.toLowerCase()
          ) ||

        item.city
          ?.toLowerCase()
          .includes(
            cat.toLowerCase()
          )
      );

    setListings(filtered);
  };

  return (

    <div>

      {/* ===================================================
          HERO SECTION
      =================================================== */}

      <section style={hero}>

        <div style={overlay}></div>

        <div style={heroContent}>

          <h1 style={heroTitle}>
            Find your next stay
          </h1>

          <p style={heroSubtitle}>
            Automation powered Airbnb experience
          </p>

          {/* ===================================================
              🔍 SEARCH PANEL
          =================================================== */}

          <div style={searchWrapper}>

            {/* LOCATION */}

            <div style={searchItem}>

              <div style={iconWrap}>
                <FaMapMarkerAlt />
              </div>

              <div>

                <p style={searchLabel}>
                  Where
                </p>

                <input

                  type="text"

                  placeholder="Search destination"

                  value={location}

                  onChange={(e) =>
                    setLocation(
                      e.target.value
                    )
                  }

                  style={searchInput}
                />

              </div>

            </div>

            {/* CHECK IN */}

            <div style={searchItem}>

              <div style={iconWrap}>
                <FaCalendarAlt />
              </div>

              <div>

                <p style={searchLabel}>
                  Check In
                </p>

                <input

                  type="date"

                  value={checkIn}

                  onChange={(e) =>
                    setCheckIn(
                      e.target.value
                    )
                  }

                  style={dateInput}
                />

              </div>

            </div>

            {/* CHECK OUT */}

            <div style={searchItem}>

              <div style={iconWrap}>
                <FaCalendarAlt />
              </div>

              <div>

                <p style={searchLabel}>
                  Check Out
                </p>

                <input

                  type="date"

                  value={checkOut}

                  onChange={(e) =>
                    setCheckOut(
                      e.target.value
                    )
                  }

                  style={dateInput}
                />

              </div>

            </div>

            {/* BUTTON */}

            <button

              style={searchBtn}

              onClick={handleSearch}
            >

              <FaSearch />

              Search

            </button>

          </div>

        </div>

      </section>

      {/* ===================================================
          CATEGORIES
      =================================================== */}

      <section style={section}>

        <h2 style={sectionTitle}>
          Explore by category
        </h2>

        <div style={categoryWrap}>

          {[
            "All",
            "Beach",
            "Mountain",
            "Luxury",
            "Budget",
            "Villa",
            "Trending",
          ].map((c) => (

            <div

              key={c}

              onClick={() =>
                filterCategory(c)
              }

              style={{
                ...categoryPill,

                background:
                  activeCategory === c
                    ? "#ff385c"
                    : "white",

                color:
                  activeCategory === c
                    ? "white"
                    : "#222",
              }}
            >

              {c}

            </div>

          ))}

        </div>

      </section>

      {/* ===================================================
          LISTINGS
      =================================================== */}

      <section style={section}>

        <h2 style={sectionTitle}>
          Featured stays
        </h2>

        <div style={grid}>

          {listings.map((item) => (

            <ListingCard

              key={item._id}

              item={item}

              open={setSelected}
            />

          ))}

        </div>

      </section>

      {/* ===================================================
          MODAL
      =================================================== */}

      <ListingModal

        item={selected}

        onClose={() =>
          setSelected(null)
        }

        onWishlist={
          addToWishlist
        }

        onRecommend={
          recommend
        }
      />

    </div>
  );
}

/* ===================================================
   STYLES
=================================================== */

const hero = {

  height: "90vh",

  backgroundImage:
    "url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80')",

  backgroundSize: "cover",

  backgroundPosition: "center",

  position: "relative",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",
};

const overlay = {

  position: "absolute",

  inset: 0,

  background:
    "rgba(0,0,0,0.45)",
};

const heroContent = {

  position: "relative",

  zIndex: 2,

  textAlign: "center",

  color: "white",

  width: "100%",

  padding: "20px",
};

const heroTitle = {

  fontSize: "72px",

  fontWeight: 800,
};

const heroSubtitle = {

  fontSize: "22px",

  marginTop: 20,

  opacity: 0.95,

  marginBottom: 50,
};

const searchWrapper = {

  maxWidth: 1100,

  margin: "0 auto",

  background: "white",

  borderRadius: 999,

  padding: 12,

  display: "grid",

  gridTemplateColumns:
    "1.4fr 1fr 1fr auto",

  gap: 10,

  alignItems: "center",

  boxShadow:
    "0 20px 60px rgba(0,0,0,0.35)",
};

const searchItem = {

  display: "flex",

  alignItems: "center",

  gap: 14,

  padding: "12px 18px",

  borderRight:
    "1px solid #eee",
};

const iconWrap = {

  width: 42,

  height: 42,

  borderRadius: "50%",

  background: "#fff1f3",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  color: "#ff385c",
};

const searchLabel = {

  margin: 0,

  fontSize: 12,

  fontWeight: 700,

  color: "#222",
};

const searchInput = {

  border: "none",

  outline: "none",

  fontSize: 15,

  marginTop: 4,
};

const dateInput = {

  border: "none",

  outline: "none",

  fontSize: 15,

  marginTop: 4,
};

const searchBtn = {

  height: 64,

  border: "none",

  borderRadius: 999,

  background: "#ff385c",

  color: "white",

  padding: "0 32px",

  fontWeight: 700,

  cursor: "pointer",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  gap: 10,

  fontSize: 16,
};

const section = {

  padding: "40px 30px",
};

const sectionTitle = {

  fontSize: "32px",

  marginBottom: 24,
};

const categoryWrap = {

  display: "flex",

  flexWrap: "wrap",

  gap: 14,
};

const categoryPill = {

  padding: "10px 18px",

  borderRadius: 999,

  border: "1px solid #ddd",

  cursor: "pointer",

  fontWeight: 600,
};

const grid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fill,minmax(260px,1fr))",

  gap: 22,

  marginTop: 20,
};