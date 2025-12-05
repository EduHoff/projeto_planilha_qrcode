//import React, { useEffect, useState } from 'react';
import DisplayStatusConnection from '../components/DisplayStatusConnection';
import UserPath from '../components/UserPath';


const Home: React.FC = () => {


  return (
    <div>
      <h1>Página Inicial</h1>
      <h2>Aqui é feito a conexão com a planilha local</h2>
      <DisplayStatusConnection/>
      <UserPath/>
    </div>
  );
};

export default Home;