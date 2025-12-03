import { useState } from 'react';
import FormSearch from '../../components/FormSearch';
import DisplaySearch from '../../components/DisplaySearch';
import type { NotaFiscal } from '../../entities/NotaFiscal';
import FormUpdate from '../../components/FormUpdate';

const Update: React.FC = () => {
  const [results, setResults] = useState<NotaFiscal[]>([]);

  return (
    <div>
      <h2>Update</h2>

      <FormSearch onResults={setResults} />

      <div style={{ marginTop: "20px" }}>
        <DisplaySearch results={results} />
      </div>

      <FormUpdate ids={results.map(r => r.id)} />
    </div>
  );
};

export default Update;