import { useState } from "react";
import axios from "axios";
import { startVoiceInput, speak } from "../utils/voice";

export default function VoiceSignup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    await axios.post("http://localhost:5000/api/auth/send-otp", form);
    speak("OTP has been sent to your email");
    setStep(2);
  };

  const verifyOtp = async () => {
    await axios.post("http://localhost:5000/api/auth/verify-otp", {
      email: form.email,
      otp
    });
    speak("Registration successful");
    alert("Signup completed!");
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>🎤 Voice Signup</h2>

      {step === 1 && (
        <>
          <input placeholder="Name" value={form.name}
            onChange={e=>setForm({...form, name:e.target.value})}/>
          <button onClick={()=>startVoiceInput(v=>setForm({...form, name:v}))}>🎤</button>

          <input placeholder="Email" value={form.email}
            onChange={e=>setForm({...form, email:e.target.value})}/>
          <button onClick={()=>startVoiceInput(v=>setForm({...form, email:v}))}>🎤</button>

          <input type="password" placeholder="Password" value={form.password} readOnly/>
          <button onClick={()=>startVoiceInput(v=>setForm({...form, password:v.replace(/\s/g,"")}))}>🎤 Speak Password</button>

          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input placeholder="Enter OTP" value={otp}
            onChange={e=>setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
}
