import React, { useEffect, useState } from 'react';
import api from "../api/client"; 
import UserPath from "../components/UserPath"; 


const Home: React.FC = () => {
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
      <h2>Página Inicial</h2>
      <h1>{message}</h1>
      <UserPath />
    </div>
  );
};

export default Home;