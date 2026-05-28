import { useEffect, useRef, useState } from "react";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(""); // email | password | done

  const navigate = useNavigate();
  const emailRef = useRef();
  const passRef = useRef();

  const speak = (text) => {
  window.speechSynthesis.cancel();  
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 1.2;                   
  window.speechSynthesis.speak(msg);
};


  /* ================= VOICE SYSTEM ================= */

  useEffect(() => {

    // 🎤 Start voice login flow
    const startLogin = () => {
      setStep("email");
      speak("Please tell me your email address");
      setTimeout(() => emailRef.current?.focus(), 500);
    };

    // 🗣 Receive spoken input
    const onVoiceInput = (e) => {
      const text = e.detail.replace(/\s/g, "");

      if (step === "email") {
        setEmail(text);
        speak("Email received. Now tell me your password");
        setStep("password");
        setTimeout(() => passRef.current?.focus(), 500);
      }

      else if (step === "password") {
        setPassword(text);
        speak("Password received. Say login to continue");
        setStep("done");
      }
    };

    // ✅ Submit from voice
    const submitByVoice = () => {
      if (!email || !password) {
        speak("Please complete email and password first");
        return;
      }
      speak("Logging you in");
      submit();
    };

    window.addEventListener("voice-login-start", startLogin);
    window.addEventListener("voice-input", onVoiceInput);
    window.addEventListener("voice-login-submit", submitByVoice);

    return () => {
      window.removeEventListener("voice-login-start", startLogin);
      window.removeEventListener("voice-input", onVoiceInput);
      window.removeEventListener("voice-login-submit", submitByVoice);
    };
  }, [step, email, password]);

  /* ================= NORMAL LOGIN ================= */

  const submit = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful 🎉");
      navigate("/");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div style={wrapper}>
      <div style={card}>
        <h1 style={{ color: "#ff385c" }}>AI Voice Login</h1>
        <p style={{ color: "#717171" }}>
          You can login by typing or speaking 🎙
        </p>

        <div style={inputBox}>
          <label>Email</label>
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={inputBox}>
          <label>Password</label>
          <input
            ref={passRef}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" style={{ width: "100%" }} onClick={submit}>
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: 12, color: "#717171", fontSize: 13 }}>
          Voice flow: “open login” → email → password → “login”
        </p>

        <p style={{ textAlign: "center", marginTop: 15, color: "#717171" }}>
          Don’t have an account? <span style={link}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const wrapper = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(120deg, #ff385c, #ff7a18)"
};

const card = {
  background: "white",
  padding: "40px 35px",
  borderRadius: 18,
  width: 380,
  display: "flex",
  flexDirection: "column",
  gap: 14,
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
};

const inputBox = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  marginTop: 10
};

const link = {
  color: "#ff385c",
  cursor: "pointer",
  fontWeight: 600
};
