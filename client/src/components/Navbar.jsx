import { Link, useNavigate } from "react-router-dom";
import { startVoice } from "../automation/useVoiceControl";
import { useState, useRef } from "react";
import "./navbar.css";

/* ===== LOGO ===== */
function AirbnbLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{
        fontWeight: 800,
        fontSize: "24px",
        color: "#FF385C",
        letterSpacing: "0.5px"
      }}>
        Airbnb
      </span>
    </div>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const speak = (text) => {
  window.speechSynthesis.cancel();   
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 1.2;                   
  window.speechSynthesis.speak(msg);
};


  const start = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      speak("Voice automation stopped");
      return;
    }

    const rec = startVoice(navigate, speak);
    recognitionRef.current = rec;
    setListening(true);
  };

  return (
    <nav style={nav}>

      {/* LOGO */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <AirbnbLogo />
      </Link>

      {/* NAV BUTTONS */}
      <div style={links}>
        <Link to="/" className="pill-btn">Home</Link>
        <Link to="/listings" className="pill-btn">Stays</Link>
        <Link to="/recommended" className="pill-btn">Recommended</Link>
        <Link to="/wishlist" className="pill-btn">Wishlist</Link>
        <Link to="/admin" className="pill-btn">Admin</Link>
      </div>

      {/* ACTIONS */}
      <div style={{ display: "flex", gap: 14 }}>
        
             <button className="pill-btn" onClick={start}>
                {listening ? "🤖 AI is listening..." : "🤖 AI Voice Bot"}
            </button>


        <Link to="/login" className="pill-btn-red">Login</Link>
      </div>

    </nav>
  );
}

/* ================= STYLES ================= */

const nav = {
  height: 80,
  padding: "0 60px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #eee",
  position: "sticky",
  top: 0,
  background: "white",
  zIndex: 1000
};

const links = {
  display: "flex",
  gap: 14,
  alignItems: "center"
};  