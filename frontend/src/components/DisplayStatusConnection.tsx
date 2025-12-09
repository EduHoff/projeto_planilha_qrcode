import React, { useEffect, useState } from 'react';
import api from "../api/client";

const DisplayStatusConnection: React.FC = () => {
  const [message, setMessage] = useState<string>("Carregando...");
  const [apiError, setApiError] = useState<boolean>(false);

  const userPath = localStorage.getItem("UserPath");

    function isStringEmptyOrNull(txt:string) {
        return !txt || txt.length === 0;
    }

  useEffect(() => {
  api.get("/api/hello")
    .then(response => {

      const msg = response.data.message;
      setMessage(msg);

      if (isStringEmptyOrNull(msg)) {
        setApiError(true);
      } else {
        setApiError(false);
      }

    })
    .catch(error => {
      console.error("Erro ao buscar dados:", error);
      setMessage("Erro ao conectar com o servidor");
      setApiError(true);
    });
}, []);

  return (
    <div>


      {/* LOCALSTORAGE */}
      {userPath ? (
        <p><strong style={{color:'lightblue'}}>Frontend: </strong> {userPath}</p>
      ) : (
        <p style={{ color: "red" }}><strong style={{color:'lightblue'}}>Frontend: </strong>Nenhum caminho encontrado no LocalStorage!</p>
      )}

      {/* API */}
      {!apiError ? (
        <p><strong style={{color:'yellow'}}>Backend: </strong> {message}</p>
      ) : (
        <p style={{ color: "red" }}><strong style={{color:'yellow'}}>Backend: </strong>Falha ao conectar com o servidor Python!</p>
      )}

      {/* Mobile */}
      <p><strong>Mobile: </strong>Ainda não existe!</p>

      
    </div>
  );
};

export default DisplayStatusConnection;