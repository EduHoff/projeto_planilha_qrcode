import { useState } from 'react';
import FormSearch from '../../components/FormSearch';
import DisplaySearch from '../../components/DisplaySearch';
import type { NotaFiscal } from '../../entities/NotaFiscal';

const Read: React.FC = () => {
  const [results, setResults] = useState<NotaFiscal[]>([]);

  return (
    <div>
      <h2>Read</h2>

      <FormSearch onResults={setResults} />

      <div style={{ marginTop: "20px" }}>
        <DisplaySearch results={results} />
      </div>
    </div>
  );
};

export default Read;