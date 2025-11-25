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
      <h1>Página Inicial</h1>
      <h2>Aqui é feito a conexão com a planilha local</h2>
      <p><strong style={{color:'lightblue'}}>React: </strong>{localStorage.getItem("UserPath")}</p>
      <p><strong style={{color:'yellow'}}>Python: </strong>{message}</p>
      <UserPath />
    </div>
  );
};

export default Home;