import { useState } from "react";
import api from "../api/client";
import type { NotaFiscal } from "../entities/NotaFiscal";

type SearchField = "id" | "nome";

interface FormSearchProps {
    onResults: (data: NotaFiscal[]) => void;
}


function FormSearch({ onResults }: FormSearchProps) {
    const [field, setField] = useState<SearchField>("id");
    const [value, setValue] = useState<string>("");

    const handleSearch = async () => {
        if (!value.trim()) {
            alert("Digite um valor para pesquisar.");
            return;
        }

        try {
            const response = await api.post("/api/crud/read", {
                filters: {
                    [field]: value
                }
            });

            console.log("RESPONSE DATA:", response.data);
            onResults(response.data.rows);

        } catch (err) {
            console.error("Erro ao buscar:", err);
            alert("Erro ao buscar no servidor.");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
            <select
                value={field}
                onChange={(e) => setField(e.target.value as SearchField)}
                style={{ padding: "5px" }}
            >
                <option value="id">ID</option>
                <option value="nome">Nome</option>
            </select>

            <input
                type="text"
                placeholder={`Pesquisar por ${field}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            <button
                onClick={handleSearch}
                style={{
                    width: 120,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                Buscar
            </button>
        </div>
    );
}

export default FormSearch;