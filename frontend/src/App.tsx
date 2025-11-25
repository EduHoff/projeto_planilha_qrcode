import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import api from "./api/client"

import Home from "./pages/Home";
import Spreadsheet from "./pages/Spreadsheet";
import Mobile from "./pages/Mobile";





const App: React.FC = () => {

  //Verifica se tem um caminho salvo no localStorage (e se ele é valido) e manda para o Python. Roda apenas na primeira vez que o projeto é iniciado
  useEffect(() => {
    const UserPath = localStorage.getItem("UserPath");

    if (UserPath) {
      
      const path_check = async () => {
        try {
          const response = await api.post("/api/check-file", {
              file_path: UserPath
          });

          const fileExists = response.data.exists; 

          if (!fileExists) {
              alert("Atenção: O arquivo salvo (" + UserPath + ") não foi encontrado no servidor. Por favor, revalide o caminho.");
              localStorage.removeItem("UserPath");
          }

        } catch (error) {
            console.error("Erro na comunicação com a API:", error);
        }
      };

      path_check();
    }
  }, []);

  return (

    <BrowserRouter>

      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
        <Link to="/spreadsheet" style={{ margin: "0 10px" }}>Planilha</Link>
        <Link to="/mobile" style={{ margin: "0 10px" }}>Mobile</Link>
      </nav>

      <div style={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center", padding: "20px"}}>
        
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/spreadsheet/*" element={<Spreadsheet />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="*" element={<h1>404: Página não encontrada</h1>} />
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;