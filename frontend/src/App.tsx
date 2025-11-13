import { useEffect, useState } from "react";
import api from "./api/client";

function App() {
  const [message, setMessage] = useState<string>("Carregando...");

  useEffect(() => {
    api.get("/api/hello")
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error);
        setMessage("Erro ao conectar com o servidor");
      });
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
