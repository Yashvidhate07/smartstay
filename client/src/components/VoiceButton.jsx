import { useNavigate } from "react-router-dom";
import { startVoice } from "../automation/useVoiceControl";
import { speak } from "../automation/speaker";

export default function VoiceButton({ setSearch, setAutoBook }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        speak("Voice assistant activated");
        startVoice(navigate, setSearch, setAutoBook, speak);
      }}
      style={{
        background: "#ff385c",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: 25,
        cursor: "pointer"
      }}
    >
      🎤 Smart Assistant
    </button>
  );
}
