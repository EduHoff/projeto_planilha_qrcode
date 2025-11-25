import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

import Create from './Spreadsheet/Create';
import Read from './Spreadsheet/Read';
import Update from './Spreadsheet/Update';
import Delete from './Spreadsheet/Delete';

const Spreadsheet: React.FC = () => {
  return (
    <div>
      <Routes>

        <Route index element={
            <div>
              <h1>Gerenciar Planilha</h1>

              <Link to="create" style={{ margin: "0 10px" }}>Create</Link>
              <Link to="read" style={{ margin: "0 10px" }}>Read</Link>
              <Link to="update" style={{ margin: "0 10px" }}>Update</Link>
              <Link to="delete" style={{ margin: "0 10px" }}>Delete</Link>
            </div>
          }
        />

        <Route path="create" element={<Create />} />
        <Route path="read" element={<Read />} />
        <Route path="update" element={<Update />} />
        <Route path="delete" element={<Delete />} />

        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />

      </Routes>
    </div>
  );
};

export default Spreadsheet;