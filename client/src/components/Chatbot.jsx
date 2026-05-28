import { useState } from "react";
import { startVoiceInput, speak } from "../utils/voice";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = (text) => {
    let reply = "I can help you find properties.";

    if (text.toLowerCase().includes("pune")) reply = "Showing properties in Pune.";
    if (text.toLowerCase().includes("cheap")) reply = "Here are some budget homes.";

    setMessages(m => [...m,
      { role: "You", text },
      { role: "Bot", text: reply }
    ]);

    speak(reply);
  };

  return (
    <div style={{
      position:"fixed", bottom:20, right:20, width:300,
      background:"#fff", border:"1px solid #ccc", borderRadius:10, padding:10
    }}>
      <h4>🤖 Assistant</h4>

      <div style={{height:200, overflowY:"auto"}}>
        {messages.map((m,i)=>(
          <p key={i}><b>{m.role}:</b> {m.text}</p>
        ))}
      </div>

      <input value={input} onChange={e=>setInput(e.target.value)} />
      <button onClick={()=>{handleSend(input); setInput("");}}>Send</button>
      <button onClick={()=>startVoiceInput(v=>handleSend(v))}>🎤</button>
    </div>
  );
}
