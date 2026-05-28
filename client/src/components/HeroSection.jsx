export default function HeroSection() {
  return (
    <section style={hero}>
      {/* Dark overlay */}
      <div style={overlay}></div>

      {/* Content */}
      <div style={content}>
        <h1 style={title}>Find your next stay</h1>
        <p style={subtitle}>Automation powered Airbnb experience</p>

        {/* Your search bar goes here */}
        <div style={searchBox}>
          <input placeholder="Location" style={input} />
          <input type="date" style={input} />
          <input type="date" style={input} />
          <button style={searchBtn}>Search</button>
        </div>
      </div>
    </section>
  );
}

/* ================= STYLES ================= */

const hero = {
  height: "88vh",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const overlay = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.7))"
};

const content = {
  position: "relative",
  textAlign: "center",
  color: "white",
  maxWidth: "900px",
  padding: "20px"
};

const title = {
  fontSize: "54px",
  fontWeight: 800,
  marginBottom: "12px"
};

const subtitle = {
  fontSize: "20px",
  opacity: 0.9,
  marginBottom: "40px"
};

const searchBox = {
  background: "white",
  borderRadius: "999px",
  padding: "10px",
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
  flexWrap: "wrap"
};

const input = {
  border: "none",
  outline: "none",
  padding: "12px 16px",
  borderRadius: "999px",
  fontSize: "14px",
  minWidth: "160px"
};

const searchBtn = {
  background: "#FF385C",
  color: "white",
  border: "none",
  padding: "12px 26px",
  borderRadius: "999px",
  fontWeight: 600,
  cursor: "pointer"
};
