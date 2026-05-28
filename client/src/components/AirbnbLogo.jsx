export default function AirbnbLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* SVG Logo */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5A5F" />
            <stop offset="100%" stopColor="#FF385C" />
          </linearGradient>
        </defs>

        <path
          d="M100 20 
             C70 20, 45 60, 45 95 
             C45 135, 75 165, 100 180 
             C125 165, 155 135, 155 95 
             C155 60, 130 20, 100 20 Z"
          stroke="url(#grad)"
          strokeWidth="12"
          fill="none"
        />

        <circle cx="100" cy="95" r="22" fill="url(#grad)" />
      </svg>

      <h1 style={{
        fontWeight: "700",
        fontSize: "28px",
        fontFamily: "Poppins, sans-serif",
        color: "#FF385C"
      }}>
        
      </h1>
    </div>
  );
}
