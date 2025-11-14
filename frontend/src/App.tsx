import { useEffect, useState } from "react";
import api from "./api/client";
import UserPath from "./components/UserPath"

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
    <div style={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
      <h1>{message}</h1>
      <UserPath></UserPath>
    </div>
  );
}

export default App;
