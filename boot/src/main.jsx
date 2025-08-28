import React from "react";
import { createRoot } from "react-dom/client";

function Desktop() {
  return (
    <div style={{
      position:"relative", zIndex:1, minHeight:"100vh",
      display:"grid", placeItems:"center", color:"#eafaff"
    }}>
      <div style={{
        padding:"20px 28px", borderRadius:16,
        background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.18)",
        backdropFilter:"blur(10px)"
      }}>
        <h1 style={{margin:0, fontSize:28, letterSpacing:2}}>Yatrz System Desktop</h1>
        <p style={{opacity:.8, marginTop:8}}>Boot completo. Agora é o React que manda 🎉</p>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Desktop />);
