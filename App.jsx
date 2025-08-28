import { useEffect, useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // tempo da tela de boot
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="boot-screen">
        <div className="loader"></div>
        <p>Carregando Yatrz System...</p>
      </div>
    );
  }

  return (
    <div className="desktop">
      <h1 className="title">✨ Bem-vindo ao Yatrz System</h1>
      <p className="subtitle">Seu sistema operacional web</p>
    </div>
  );
}
