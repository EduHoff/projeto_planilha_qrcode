import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/HomeTESTE";
import About from "./pages/AboutTESTE"; 

//RECADO PARA MIM MESMO NO FUTURO: ainda preciso criar uma lógica que quando o projeto inicia pela primeira vez ou quando o local.storage com o caminho é atualizado (não tenho certeza se isso é relevante já que o file_check.py já cobre isso) o react vai lá e mande o novo caminho para o python e inclusive evite fazer isso caso o caminho enviado seja o mesmo que já está armazenado (o que seria bom adicionar essa validação extra) mas PRINCIPALEMENTE o que leia o local.storage da primeira vez que é iniciado com alguma função que o React deve ter com certeza

const App: React.FC = () => {
  return (
    //Minha ideia é ter isso mais c omo uma base para saber como o router funciona (não vai ficar assim a versão final, é claro)
    <BrowserRouter>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
        <Link to="/about" style={{ margin: "0 10px" }}>Sobre</Link>
      </nav>

      <div style={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center", padding: "20px"}}>
        
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h1>404: Página não encontrada</h1>} />
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;