import { useState } from 'react';
import FormSearch from '../../components/FormSearch';
import type { NotaFiscal } from '../../entities/NotaFiscal';
import FormDelete from '../../components/FormDelete';
import DisplaySearch from '../../components/DisplaySearch';

const Delete: React.FC = () => {
  const [results, setResults] = useState<NotaFiscal[]>([]);
  return (
    <div>
      <h2>Delete</h2>

      <FormSearch onResults={setResults} />

      <div style={{ marginTop: "20px" }}>
        <DisplaySearch results={results} />
      </div>

      <FormDelete ids={results.map(r => r.id)} />

    </div>
  );
};

export default Delete;