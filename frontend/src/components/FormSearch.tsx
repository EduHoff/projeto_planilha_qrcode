import { useState } from "react";
import api from "../api/client";
import type { NotaFiscal } from "../entities/NotaFiscal";

type SearchField = "tudo" | "id" | "nome";

interface FormSearchProps {
    onResults: (data: NotaFiscal[]) => void;
}

function FormSearch({ onResults }: FormSearchProps) {
    const [field, setField] = useState<SearchField>("tudo");
    const [value, setValue] = useState("");

    const handleSearch = async () => {
        if (field !== "tudo" && !value.trim()) {
            alert("Digite um valor para pesquisar.");
            return;
        }

        const payload =
            field === "tudo"
                ? { filters: "tudo" }
                : { filters: { [field]: value } };

        try {
            const response = await api.post("/api/crud/read", payload);

            console.log("RESPONSE DATA:", response.data);
            onResults(response.data.rows);

        } catch (err) {
            console.error("Erro ao buscar:", err);
            alert("Erro ao buscar no servidor.");
        }
    };


    function handleOption(){

        switch (field) {
            case "tudo":
                return
            case "id":
                return (<input
                    type="number"
                    step={1}
                    min={1}
                    placeholder={`Pesquisar por ${field}`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />)
            case "nome":
                return (<input
                    type="text"
                    placeholder={`Pesquisar por ${field}`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />)
            default:
                return (<p>Opção inválida</p>)
            }
    }


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px"
        }}>
            
            <select
                value={field}
                onChange={(e) => setField(e.target.value as SearchField)}
                style={{ padding: "5px" }}
            >
                <option value="tudo">Tudo</option>
                <option value="id">ID</option>
                <option value="nome">Nome</option>
            </select>

            {handleOption()}

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